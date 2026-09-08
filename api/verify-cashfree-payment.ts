// api/verify-cashfree-payment.ts
//
// Confirms an order's actual payment status server-side. Always call this
// after checkout completes instead of trusting the browser's callback —
// the client-side checkout result only tells you the payment UI finished,
// not that money actually moved.
//
// GET /api/verify-cashfree-payment?order_id=order_xxx

import type { VercelRequest, VercelResponse } from '@vercel/node'

const CASHFREE_ENV = process.env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox'
const ORDERS_URL =
  CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg/orders'
    : 'https://sandbox.cashfree.com/pg/orders'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const orderId = req.query.order_id as string | undefined

  if (!orderId) {
    res.status(400).json({ error: 'Missing order_id' })
    return
  }

  try {
    const cfRes = await fetch(`${ORDERS_URL}/${encodeURIComponent(orderId)}`, {
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID as string,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY as string,
      },
    })

    const data = await cfRes.json()

    if (!cfRes.ok) {
      console.error('Cashfree fetch order failed:', data)
      res.status(cfRes.status).json({ error: data.message || 'Failed to fetch order' })
      return
    }

    // order_status is one of: ACTIVE (not yet paid), PAID, EXPIRED
    res.status(200).json({
      orderId: data.order_id as string,
      status: data.order_status as string,
      amount: data.order_amount as number,
    })
  } catch (err) {
    console.error('Cashfree verify error:', err)
    res.status(500).json({ error: 'Failed to verify payment' })
  }
}