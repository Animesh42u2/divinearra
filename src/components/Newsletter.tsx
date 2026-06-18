import { useState } from 'react'
import { Send, Loader2, Check } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (status === 'loading') return

  setStatus('loading')
  setMessage('')

  try {
    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${import.meta.env.VITE_BUTTONDOWN_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email_address: email,  // ✅ correct field, no extra fields
  }),
})

    const data = await res.json().catch(() => ({}))
    console.log('Buttondown response:', res.status, JSON.stringify(data))

    if (res.status === 201) {
      setStatus('success')
      setMessage("You're subscribed! Check your inbox.")
      setEmail('')
      return
    }

    const dataStr = JSON.stringify(data).toLowerCase()

    if (dataStr.includes('already') || res.status === 409) {
      setStatus('error')
      setMessage("You're already subscribed!")
      return
    }

    // ✅ Fixed: always extract a plain string
    const apiError =
      typeof data?.detail === 'string'
        ? data.detail
        : Array.isArray(data?.detail)
        ? data.detail[0]?.detail ?? 'Something went wrong. Please try again.'
        : 'Something went wrong. Please try again.'

    setStatus('error')
    setMessage(apiError)

  } catch {
    setStatus('error')
    setMessage('Network error. Please check your connection and try again.')
  }
}

  return (
    <section style={{
      background: 'linear-gradient(90deg, #1a0a00 0%, #2d1200 40%, #3a1800 70%, #1a0a00 100%)',
      borderTop: '1px solid #c47a1e',
      borderBottom: '1px solid #c47a1e',
      padding: '56px 8%',
      textAlign: 'center',
    }}>
      <style>{`
        .newsletter-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px;
          font-family: 'Georgia', serif;
          color: #e8c97a;
          text-shadow: 0 0 18px rgba(232,201,122,0.3);
          letter-spacing: 0.04em;
        }
        .newsletter-sub {
          color: #b89060;
          margin-bottom: 32px;
          font-family: sans-serif;
          font-size: 14px;
          line-height: 1.7;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .newsletter-form {
          display: flex;
          justify-content: center;
          max-width: 460px;
          margin: 0 auto;
        }
        .newsletter-input {
          flex: 1;
          padding: 13px 20px;
          border-radius: 25px 0 0 25px;
          border: 1px solid #c47a1e;
          border-right: none;
          font-size: 14px;
          font-family: sans-serif;
          outline: none;
          background: rgba(196,122,30,0.1);
          color: #e8c97a;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .newsletter-input::placeholder { color: #8a6030; }
        .newsletter-input:focus {
          background: rgba(196,122,30,0.18);
          box-shadow: inset 0 0 0 1px #e8a135;
        }
        .newsletter-input:disabled { opacity: 0.6; }
        .newsletter-btn {
          background: linear-gradient(135deg, #c47a1e 0%, #e8a135 50%, #c47a1e 100%);
          color: #1a0a00;
          border: 1px solid #e8a135;
          padding: 13px 22px;
          border-radius: 0 25px 25px 0;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: sans-serif;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(196,122,30,0.35);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .newsletter-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #e8a135 0%, #ffd700 50%, #e8a135 100%);
          box-shadow: 0 6px 20px rgba(196,122,30,0.55);
        }
        .newsletter-btn:disabled {
          cursor: not-allowed;
          opacity: 0.75;
        }
        .newsletter-message {
          margin-top: 16px;
          font-family: sans-serif;
          font-size: 13px;
          min-height: 18px;
        }
        .newsletter-message.success { color: #7fd99a; }
        .newsletter-message.error { color: #f08a6c; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 520px) {
          .newsletter-title { font-size: 22px; }
          .newsletter-form {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .newsletter-input {
            border-radius: 25px;
            border-right: 1px solid #c47a1e;
            text-align: center;
          }
          .newsletter-btn {
            border-radius: 25px;
            justify-content: center;
            padding: 13px 24px;
          }
        }
      `}</style>

      <h2 className="newsletter-title">Subscribe to Newsletter</h2>
      <p className="newsletter-sub">
        Subscribe to receive personalized astrological insights and predictions directly in your inbox.
      </p>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          className="newsletter-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
          disabled={status === 'loading'}
        />
        <button className="newsletter-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <Loader2 size={15} className="spin" />
          ) : status === 'success' ? (
            <Check size={15} />
          ) : (
            <Send size={15} />
          )}
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p className={`newsletter-message ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>
          {message}
        </p>
      )}
    </section>
  )
}