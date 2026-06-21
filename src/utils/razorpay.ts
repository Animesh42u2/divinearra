/* eslint-disable @typescript-eslint/no-explicit-any */

// ── Razorpay window type ─────────────────────────────────────
interface RazorpayResponse {
  razorpay_payment_id: string
}

interface RazorpayFailureResponse {
  error: {
    code: string
    description: string
    reason: string
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  prefill?: { name: string; email: string; contact: string }
  notes?: Record<string, string>
  theme?: { color: string }
  handler: (response: RazorpayResponse) => void
  modal?: { ondismiss: () => void }
}

// ── Script loader ────────────────────────────────────────────
export function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if ((window as any).Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ── Open checkout ────────────────────────────────────────────
export async function openRazorpayCheckout({
  amount,
  name,
  email,
  contact,
  description,
  planName,
  onSuccess,
  onFailure,
}: {
  amount:      number
  name:        string
  email:       string
  contact:     string
  description: string
  planName:    string
  onSuccess:   (paymentId: string) => void
  onFailure:   (error: string) => void
}) {
  const loaded = await loadRazorpay()
  if (!loaded) {
    alert('Failed to load Razorpay. Check your internet connection.')
    return
  }

  const options: RazorpayOptions = {
    key:         import.meta.env.VITE_RAZORPAY_KEY_ID as string,
    amount,
    currency:    'INR',
    name:        'Divine Arra',
    description,
    image:       '/logo.png',
    prefill:     { name, email, contact },
    notes:       { plan: planName },
    theme:       { color: '#c47a1e' },
    handler(response: RazorpayResponse) {
      onSuccess(response.razorpay_payment_id)
    },
    modal: {
      ondismiss: () => onFailure('Payment cancelled by user'),
    },
  }

  const rzp = new (window as any).Razorpay(options)

  rzp.on('payment.failed', (response: RazorpayFailureResponse) =>
    onFailure(response.error.description)
  )

  rzp.open()
}