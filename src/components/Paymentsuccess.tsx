import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate  = useNavigate()

  const state = location.state as {
    paymentId: string
    planName:  string
    product:   string
    amount:    string
    name:      string
    whatsapp:  string
    type:      string
  } | null

  useEffect(() => {
    if (!state) navigate('/')
  }, [state, navigate])

  if (!state) return null

  // ── Generate & download PDF slip ─────────────────────────
  async function downloadSlip() {
    if (!state) return

    const { jsPDF } = await import('jspdf')

    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = 210
    const pad   = 20

    // Background
    doc.setFillColor(255, 251, 245)
    doc.rect(0, 0, pageW, 297, 'F')

    // Header band
    doc.setFillColor(196, 122, 30)
    doc.rect(0, 0, pageW, 40, 'F')

    // Brand name
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text('Divine Arra', pad, 18)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('Vedic Astrology & Spiritual Guidance', pad, 27)

    // Receipt label top right
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('PAYMENT RECEIPT', pageW - pad, 18, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(
      new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
      pageW - pad, 27, { align: 'right' }
    )

    // Green success badge
    doc.setFillColor(34, 197, 94)
    doc.roundedRect(pad, 50, 56, 10, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('PAYMENT SUCCESSFUL', pad + 28, 57, { align: 'center' })

    // Thank you
    doc.setTextColor(42, 18, 0)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(`Thank you, ${state.name}!`, pad, 76)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(107, 58, 16)
    doc.text('Your payment has been received. We will contact you on WhatsApp shortly.', pad, 85)

    // Divider
    doc.setDrawColor(196, 122, 30)
    doc.setLineWidth(0.4)
    doc.line(pad, 91, pageW - pad, 91)

    // Order details box
    doc.setFillColor(255, 248, 232)
    doc.roundedRect(pad, 96, pageW - pad * 2, 76, 4, 4, 'F')
    doc.setDrawColor(196, 122, 30)
    doc.setLineWidth(0.3)
    doc.roundedRect(pad, 96, pageW - pad * 2, 76, 4, 4, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(196, 122, 30)
    doc.text('ORDER DETAILS', pad + 6, 106)

    const rows: [string, string][] = [
      ['Payment ID',  state.paymentId],
      ['Product',     state.product],
      ['Plan',        state.planName],
      ['Amount Paid', `Rs. ${state.amount}/-`],
      ['Customer',    state.name],
      ['WhatsApp',    state.whatsapp],
    ]

    let y = 116
    rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(74, 42, 10)
      doc.text(label, pad + 6, y)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 58, 16)
      doc.text(value, pad + 58, y)
      y += 11
    })

    // Divider
    doc.setDrawColor(196, 122, 30)
    doc.setLineWidth(0.4)
    doc.line(pad, 182, pageW - pad, 182)

    // What happens next
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(42, 18, 0)
    doc.text('What Happens Next?', pad, 192)

    const steps = [
      '1.  Our astrologer will review your order details.',
      '2.  We will WhatsApp you within 24 hours.',
      '3.  Your report / session will be delivered as promised.',
    ]
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(107, 58, 16)
    let sy = 201
    steps.forEach(s => { doc.text(s, pad, sy); sy += 9 })

    // Footer band
    doc.setFillColor(42, 18, 0)
    doc.rect(0, 272, pageW, 25, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text('Divine Arra  |  divinearra.com  |  +91 8280 055593', pageW / 2, 282, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(200, 170, 120)
    doc.text('This is a computer-generated receipt and does not require a signature.', pageW / 2, 290, { align: 'center' })

    doc.save(`DivineArra_Receipt_${state.paymentId}.pdf`)
  }

  return (
    <>
      <style>{`
        .ps-page {
          background: #fffbf5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .ps-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(32px,6vw,80px) clamp(16px,5%,40px);
        }
        .ps-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(196,122,30,0.2);
          box-shadow: 0 8px 40px rgba(196,122,30,0.1);
          padding: clamp(32px,5vw,56px);
          max-width: 540px;
          width: 100%;
          text-align: center;
        }
        .ps-icon {
          width: 80px; height: 80px;
          background: linear-gradient(135deg, #f0a830, #c47a1e);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(196,122,30,0.3);
        }
        .ps-paid-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.35);
          color: #16a34a;
          border-radius: 100px;
          font-family: sans-serif; font-size: 11px; font-weight: 700;
          padding: 4px 14px; margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        .ps-title {
          font-family: 'Georgia', serif;
          font-size: clamp(22px,4vw,32px);
          font-weight: 700;
          color: #1a0a00;
          margin: 0 0 8px;
        }
        .ps-sub {
          font-family: sans-serif;
          font-size: 14px;
          color: #9a7050;
          margin: 0 0 24px;
          line-height: 1.6;
        }
        .ps-details {
          background: #fffbf2;
          border: 1px solid rgba(196,122,30,0.2);
          border-radius: 14px;
          padding: 18px 20px;
          margin-bottom: 20px;
          text-align: left;
        }
        .ps-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: sans-serif;
          font-size: 13px;
          color: #7a5030;
          padding: 7px 0;
          border-bottom: 1px solid rgba(196,122,30,0.08);
          gap: 12px;
        }
        .ps-row:last-child { border-bottom: none; }
        .ps-row span:first-child { font-weight: 600; color: #4a2a0a; flex-shrink: 0; }
        .ps-row span:last-child  { color: #9a7050; text-align: right; word-break: break-all; }

        .ps-btn-download {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%;
          background: linear-gradient(135deg, #f0a830, #c47a1e);
          color: #fff;
          font-family: sans-serif; font-size: 15px; font-weight: 700;
          padding: 14px 24px; border-radius: 12px;
          border: none; cursor: pointer;
          margin-bottom: 10px;
          transition: opacity 0.18s, transform 0.15s;
        }
        .ps-btn-download:hover { opacity: 0.92; transform: translateY(-2px); }

        .ps-btn-whatsapp {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%;
          background: #25d366; color: #fff;
          font-family: sans-serif; font-size: 15px; font-weight: 700;
          padding: 14px 24px; border-radius: 12px;
          border: none; cursor: pointer;
          margin-bottom: 10px;
          transition: opacity 0.18s;
          text-decoration: none;
        }
        .ps-btn-whatsapp:hover { opacity: 0.9; }

        .ps-home {
          display: block; font-family: sans-serif; font-size: 13px;
          color: #c47a1e; text-align: center; cursor: pointer;
          background: none; border: none;
          text-decoration: underline; text-underline-offset: 2px;
          margin-top: 4px;
        }
      `}</style>

      <Navbar />

      <div className="ps-page">
        <div className="ps-body">
          <div className="ps-card">

            <div className="ps-icon">✓</div>
            <div className="ps-paid-badge">● PAYMENT CONFIRMED</div>

            <h1 className="ps-title">Payment Successful!</h1>
            <p className="ps-sub">
              Thank you, <strong>{state.name}</strong>! Your payment has been received.<br />
              We'll reach out to you on WhatsApp shortly.
            </p>

            <div className="ps-details">
              <div className="ps-row">
                <span>Payment ID</span>
                <span>{state.paymentId}</span>
              </div>
              <div className="ps-row">
                <span>Product</span>
                <span>{state.product}</span>
              </div>
              <div className="ps-row">
                <span>Plan</span>
                <span>{state.planName}</span>
              </div>
              <div className="ps-row">
                <span>Amount Paid</span>
                <span>₹{state.amount}/-</span>
              </div>
              <div className="ps-row">
                <span>Date</span>
                <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Download PDF Receipt */}
            <button className="ps-btn-download" onClick={downloadSlip}>
              ⬇️ Download Payment Receipt (PDF)
            </button>

            {/* WhatsApp */}
            <a
              className="ps-btn-whatsapp"
              href={`https://wa.me/918280055593?text=Hi! I just paid for ${state.product} (${state.planName}). My Payment ID is ${state.paymentId}. Name: ${state.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📲 Message Us on WhatsApp
            </a>

            <button className="ps-home" onClick={() => navigate('/')}>
              ← Back to Home
            </button>

          </div>
        </div>
      </div>

    </>
  )
}
