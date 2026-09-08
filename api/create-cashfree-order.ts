// api/create-cashfree-order.ts
//
// Creates a Cashfree order and returns the payment_session_id the frontend
// needs to open checkout. This MUST run server-side — CASHFREE_SECRET_KEY
// is never exposed to the browser (unlike Razorpay's flow, which could
// create an "order" purely client-side with just a public key).
//
// Set these in the Vercel dashboard (Project → Settings → Environment
// Variables) — do NOT prefix them with VITE_, or Vite will bundle them
// into the client-side JS:
//   CASHFREE_APP_ID
//   CASHFREE_SECRET_KEY
//   CASHFREE_ENV   = "sandbox" | "production"

import type { VercelRequest, VercelResponse } from '@vercel/node'

const CASHFREE_ENV = process.env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox'
const ORDERS_URL =
  CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg/orders'
    : 'https://sandbox.cashfree.com/pg/orders'

interface CreateOrderBody {
  amount: number
  name: string
  email: string
  phone: string
  description?: string
  // Free-form note for your own reconciliation — Cashfree's order_note
  // field is capped at 200 chars, so keep this short (e.g. "report:
  // couple-matching, plan: premium"). For anything larger (full birth
  // details, partner details, etc.) log it to your own store (a sheet,
  // a database — the same Google Apps Script pattern you're already
  // using in CTA.tsx would work fine) keyed by the orderId this
  // function returns, rather than trying to cram it into Cashfree's
  // metadata.
  note?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { amount, name, email, phone, description, note } = (req.body ?? {}) as CreateOrderBody

  if (!amount || amount <= 0) {
    res.status(400).json({ error: 'Invalid amount' })
    return
  }
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    res.status(400).json({ error: 'Missing customer details' })
    return
  }

  const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  // Cashfree requires customer_id to be alphanumeric/underscore/hyphen —
  // no spaces or symbols — so this can't just be the raw phone number.
  const customerId = `cust_${phone.replace(/\D/g, '').slice(-10)}_${Date.now()}`

  // Cashfree requires order_meta.return_url to always be https — but in
// local dev, req.headers.origin is naturally http://localhost:PORT,
// which Cashfree's API rejects outright with a 400. Since checkout uses
// redirectTarget: '_modal', return_url is only actually visited for
// redirect-based methods (UPI/netbanking) that leave the page — not
// during modal-based card/test payments — so forcing the scheme to
// https here is safe even though localhost isn't really served over https.
const rawOrigin = (req.headers.origin as string) || `https://${req.headers.host}`
const origin = rawOrigin.replace(/^http:\/\//, 'https://')

  try {
    const cfRes = await fetch(ORDERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID as string,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY as string,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: customerId,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          // The {order_id} placeholder is required by Cashfree and gets
          // substituted automatically — mainly used for redirect-based
          // payment methods (netbanking, UPI intent) that leave the page.
          return_url: `${origin}/payment-success?order_id={order_id}`,
        },
        order_note: (description ?? note ?? '').slice(0, 200),
      }),
    })

    const data = await cfRes.json()

    if (!cfRes.ok) {
      console.error('Cashfree create order failed:', data)
      res.status(cfRes.status).json({ error: data.message || 'Failed to create order' })
      return
    }

    res.status(200).json({
      orderId: data.order_id as string,
      paymentSessionId: data.payment_session_id as string,
    })
  } catch (err) {
    console.error('Cashfree create order error:', err)
    res.status(500).json({ error: 'Failed to create order. Please try again.' })
  }
}