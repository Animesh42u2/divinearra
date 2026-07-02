import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getReportBySlug } from '../data/reportsConfig'
import { getConsultationBySlug } from '../data/Consultationsconfig'
import { getCourseBySlug } from '../data/CoursesConfig'
import Navbar from './Navbar'

type CheckoutType = 'report' | 'consultation' | 'course'

interface CheckoutItem {
  title: string
  image: string
  pricingPlans: {
    name: string
    tagline: string
    originalPrice: string
    discountedPrice: string
    features: { label: string; included: boolean }[]
  }[]
}

// ── Razorpay types ───────────────────────────────────────────
interface RazorpayResponse {
  razorpay_payment_id: string
}

interface RazorpayFailureResponse {
  error: { description: string }
}

interface RazorpayWindow extends Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance
}

interface RazorpayInstance {
  open: () => void
  on: (event: string, handler: (resp: RazorpayFailureResponse) => void) => void
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
// ────────────────────────────────────────────────────────────

function resolveItem(type: CheckoutType, slug: string): CheckoutItem | undefined {
  if (type === 'report')       return getReportBySlug(slug)       as CheckoutItem | undefined
  if (type === 'consultation') return getConsultationBySlug(slug) as CheckoutItem | undefined
  if (type === 'course')       return getCourseBySlug(slug)       as CheckoutItem | undefined
}

const heroLabel: Record<CheckoutType, string> = {
  report:       'Order Your',
  consultation: 'Book Your',
  course:       'Enroll In',
}

const ctaLabel: Record<CheckoutType, string> = {
  report:       'Pay Securely',
  consultation: 'Book Now',
  course:       'Enroll Now',
}

const formSubtitle: Record<CheckoutType, string> = {
  report:       'Fill in your birth details accurately for the most precise report.',
  consultation: 'Fill in your details and we will schedule your session on WhatsApp.',
  course:       'Fill in your details to complete enrollment.',
}

const needsBirthDetails: Record<CheckoutType, boolean> = {
  report:       true,
  consultation: true,
  course:       true,
}

// ── Razorpay script loader ───────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if ((window as unknown as RazorpayWindow).Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ── Parse "₹349" or "349" → paise ───────────────────────────
function toPaise(priceStr: string): number {
  const digits = priceStr.replace(/[^\d]/g, '')
  return parseInt(digits, 10) * 100
}

export default function CheckoutPage({ type }: { type: CheckoutType }) {
  const { slug }  = useParams()
  const location  = useLocation()
  const navigate  = useNavigate()

  const item = resolveItem(type, slug ?? '')
  const isCouple = slug === 'couple' || slug === 'couple-matching-report'
  const planIndex: number = location.state?.planIndex ?? 0
  const plan = item?.pricingPlans[planIndex]

  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '',
    dob: '', time: '', place: '',
     partnerName: '', partnerDob: '', partnerTime: '', partnerPlace: '', partnerGender: '',
    gender: '', pincode: '', language: '',
  })
  const [paying, setPaying] = useState(false)
  const [placeSuggestions, setPlaceSuggestions] = useState<string[]>([])
const [showSuggestions, setShowSuggestions] = useState(false)

  if (!item || !plan) {
    return <div style={{ padding: 80, textAlign: 'center' }}>Item not found.</div>
  }

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }))

  const showBirth = needsBirthDetails[type]

  // ── Validation ───────────────────────────────────────────
  function validate(): string | null {
    if (!form.name.trim())      return 'Please enter your full name.'
    if (!form.email.trim())     return 'Please enter your email address.'
    if (!form.whatsapp.trim())  return 'Please enter your WhatsApp number.'
    if (!form.gender)           return 'Please select your gender.'
    if (showBirth) {
      if (!form.dob)            return 'Please enter your date of birth.'
      if (!form.time)           return 'Please enter your time of birth.'
      if (!form.place.trim())   return 'Please enter your birth place.'
      if (!form.pincode.trim()) return 'Please enter your pin code.'
      if (!form.language)       return 'Please select a report language.'
    }
     if (isCouple) {                                              // ← add this block
    if (!form.partnerName.trim())  return "Please enter your partner's full name."
    if (!form.partnerDob)          return "Please enter your partner's date of birth."
    if (!form.partnerTime)         return "Please enter your partner's time of birth."
    if (!form.partnerPlace.trim()) return "Please enter your partner's birth place."
    if (!form.partnerGender)       return "Please select your partner's gender."
  }
    return null
  }
  
  async function handlePlaceInput(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value
  setForm(p => ({ ...p, place: value }))
  if (value.length < 3) { setPlaceSuggestions([]); setShowSuggestions(false); return }
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&addressdetails=1`
  )
  const data = await res.json()
  setPlaceSuggestions(data.map((item: { display_name: string }) => item.display_name))
  setShowSuggestions(true)
}

  // ── Payment handler ──────────────────────────────────────
  async function handlePayment() {
    const err = validate()
    if (err) { alert(err); return }
    if (!item || !plan) return

    setPaying(true)

    const loaded = await loadRazorpayScript()
    if (!loaded) {
      alert('Failed to load payment gateway. Please check your internet connection.')
      setPaying(false)
      return
    }

    const options: RazorpayOptions = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      amount:      toPaise(plan.discountedPrice),
      currency:    'INR',
      name:        'Divine Arra',
      description: `${plan.name} — ${item.title}`,
      image:       '/logo.png',
      prefill: {
        name:    form.name,
        email:   form.email,
        contact: form.whatsapp,
      },
      notes: {
        plan:    plan.name,
        product: item.title,
        type,
        ...(showBirth && {
          dob:      form.dob,
          time:     form.time,
          place:    form.place,
          pincode:  form.pincode,
          language: form.language,
          gender:   form.gender,
        }),
          ...(isCouple && {                                            
    partnerName:   form.partnerName,
    partnerDob:    form.partnerDob,
    partnerTime:   form.partnerTime,
    partnerPlace:  form.partnerPlace,
    partnerGender: form.partnerGender,
  }),
      },
      theme: { color: '#c47a1e' },

      handler(response: RazorpayResponse) {
        setPaying(false)
        navigate('/payment-success', {
          state: {
            paymentId: response.razorpay_payment_id,
            planName:  plan.name,
            product:   item.title,
            amount:    plan.discountedPrice,
            name:      form.name,
            whatsapp:  form.whatsapp,
            type,
          },
        })
      },

      modal: {
        ondismiss() { setPaying(false) },
      },
    }

    const rzp = new (window as unknown as RazorpayWindow).Razorpay(options)

    rzp.on('payment.failed', (resp: RazorpayFailureResponse) => {
      setPaying(false)
      alert(`Payment failed: ${resp.error.description}. Please try again.`)
    })

    rzp.open()
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .co-page {
          background: #ffffff;
          min-height: 100vh;
          font-family: 'Playfair Display', Georgia, serif;
        }

        .co-hero {
  background: #ffffff;
          padding: clamp(32px, 5vw, 56px) clamp(20px, 6%, 80px);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .co-hero::before {
  display: none;
}
        .co-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #a06010;
          text-transform: uppercase;
          background: rgba(196,122,30,0.1);
          border: 1px solid rgba(196,122,30,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 16px;
        }
        .co-hero-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c47a1e;
          display: inline-block;
        }
        .co-hero h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 5.5vw, 52px);
  font-weight: 700;
  color: #1a0a00;
  margin: 0;
  line-height: 1.25;
  position: relative;
}
        .co-hero h1 span { color: #b86010; }

        .co-trust-bar {
  background: #fff;
  padding: 8px clamp(16px,5%,80px);
  display: flex;
  justify-content: center;
  gap: clamp(12px,3vw,32px);
  flex-wrap: wrap;
}
.co-trust-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: sans-serif;
  font-size: 13px;
  color: #7a5030;
  font-weight: 600;
}
        .co-inner {
          max-width: 1060px;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 56px) clamp(16px, 5%, 40px);
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 28px;
          align-items: start;
          background: #ffffff;
        }
        @media (max-width: 800px) { .co-inner { grid-template-columns: 1fr; } }

        .co-plan-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(196,122,30,0.2);
          box-shadow: 0 1px 0 rgba(196,122,30,0.1), 0 8px 32px rgba(196,122,30,0.08);
          overflow: hidden;
          position: sticky;
          top: 24px;
        }
        @media (max-width: 800px) { .co-plan-card { position: static; } }

        .co-plan-img {
          background: linear-gradient(160deg, #fff3d6 0%, #f5d990 100%);
          height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }
        .co-plan-img img {
          height: 100%; max-height: 170px; object-fit: contain;
          filter: drop-shadow(0 6px 20px rgba(100,50,0,0.2));
          position: relative; z-index: 1;
        }
        .co-plan-badge {
          position: absolute; top: 12px; right: 12px;
          background: #c47a1e; color: #fff;
          font-family: sans-serif; font-size: 10px; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 4px 10px; border-radius: 100px; z-index: 2;
        }
        .co-plan-body { padding: 22px 22px 24px; }
        .co-plan-name { font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; color: #1a0a00; margin: 0 0 5px; }
        .co-plan-tagline { font-family: sans-serif; font-size: 12.5px; color: #9a7050; margin: 0 0 16px; line-height: 1.55; }
        .co-price-box {
          background: linear-gradient(135deg, #fff8e8, #fdeabb);
          border: 1px solid rgba(196,122,30,0.25);
          border-radius: 12px; padding: 14px 16px; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .co-price-orig { font-family: sans-serif; font-size: 12px; color: #b09070; text-decoration: line-through; }
        .co-price-disc { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 700; color: #b86010; }
        .co-price-save {
          font-family: sans-serif; font-size: 10px; font-weight: 700;
          background: rgba(196,122,30,0.15); color: #a06010;
          padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px;
          border: 1px solid rgba(196,122,30,0.2);
        }
        .co-features-title { font-family: sans-serif; font-size: 10px; font-weight: 800; color: #c47a1e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; }
        .co-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .co-feature-item { font-family: sans-serif; font-size: 13px; color: #4a2a0a; display: flex; align-items: center; gap: 10px; line-height: 1.4; }
        .co-feature-item.off { color: #c0a080; text-decoration: line-through; }
        .co-feature-dot { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 10px; }
        .co-feature-dot.on  { background: rgba(196,122,30,0.12); color: #c47a1e; }
        .co-feature-dot.off { background: rgba(0,0,0,0.05); color: #c0a080; }
        .co-plan-divider { height: 1px; background: rgba(196,122,30,0.12); margin: 20px 0; }
        .co-secure-note { display: flex; align-items: center; gap: 7px; font-family: sans-serif; font-size: 11.5px; color: #9a7050; }

        .co-form-card {
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(196,122,30,0.15);
          box-shadow: 0 1px 0 rgba(196,122,30,0.08), 0 8px 32px rgba(196,122,30,0.06);
          padding: clamp(24px, 4vw, 40px);
        }
        .co-form-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 28px; }
        .co-form-title { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: #1a0a00; margin: 0 0 5px; }
        .co-form-sub { font-family: sans-serif; font-size: 13px; color: #9a7050; margin: 0; line-height: 1.55; }
        .co-step-badge {
          flex-shrink: 0; background: #fff8e8; color: #a06010;
          border: 1px solid rgba(196,122,30,0.3);
          font-family: sans-serif; font-size: 11px; font-weight: 700;
          padding: 6px 14px; border-radius: 100px; white-space: nowrap; letter-spacing: 0.5px;
        }
        .co-section-label {
          font-family: sans-serif; font-size: 10px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase; color: #c47a1e;
          margin: 0 0 16px; display: flex; align-items: center; gap: 8px;
        }
        .co-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(196,122,30,0.15); }
        .co-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 20px; margin-bottom: 24px; }
        @media (max-width: 540px) { .co-form-grid { grid-template-columns: 1fr; } }
        .co-field { display: flex; flex-direction: column; gap: 7px; }
        .co-field.span-2 { grid-column: span 2; }
        @media (max-width: 540px) { .co-field.span-2 { grid-column: span 1; } }
        .co-label { font-family: sans-serif; font-size: 11px; font-weight: 700; color: #8a6030; text-transform: uppercase; letter-spacing: 0.8px; }
        .co-label span { color: #c47a1e; margin-left: 1px; }
        .co-input {
          padding: 11px 14px; border: 1.5px solid #e4cfa8; border-radius: 10px;
          font-size: 14px; color: #1a0a00; background: #fffcf7; outline: none;
          font-family: sans-serif; transition: border-color 0.18s, box-shadow 0.18s; width: 100%;
        }
        .co-input::placeholder { color: #c0a07080; }
        .co-input:hover  { border-color: #d4a860; }
        .co-input:focus  { border-color: #c47a1e; box-shadow: 0 0 0 3px rgba(196,122,30,0.1); background: #fff; }

        .co-summary {
          background: #fffbf2; border: 1px solid rgba(196,122,30,0.2);
          border-radius: 14px; padding: 16px 18px; margin-bottom: 18px;
        }
        .co-summary-row { display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-size: 13px; color: #7a5030; padding: 5px 0; }
        .co-summary-row.total { border-top: 1px dashed rgba(196,122,30,0.25); margin-top: 8px; padding-top: 12px; }
        .co-summary-row.total span:first-child { font-weight: 700; font-size: 14px; color: #1a0a00; }
        .co-summary-row.total span:last-child  { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; color: #b86010; }

        .co-terms { font-family: sans-serif; font-size: 12px; color: #9a7050; margin-bottom: 18px; line-height: 1.65; text-align: center; }
        .co-terms a { color: #c47a1e; text-decoration: underline; text-underline-offset: 2px; }

        .co-pay-btn {
  width: 55%;
  margin: 0 auto;
  display: flex;
  padding: 17px 24px;
  background: linear-gradient(135deg, #f0a830, #c47a1e);
  color: #1e0d00; border: none; border-radius: 14px;
  font-family: 'Playfair Display', Georgia, serif; font-size: 21px; font-weight: 800;
  cursor: pointer; letter-spacing: 0.02em;
  transition: opacity 0.18s, transform 0.15s;
  align-items: center; justify-content: center; gap: 10px;
}
        .co-pay-btn:hover:not(:disabled)  { opacity: 0.92; transform: translateY(-2px); }
        .co-pay-btn:active:not(:disabled) { transform: translateY(0); }
        .co-pay-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        @keyframes co-spin { to { transform: rotate(360deg); } }
        .co-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: co-spin 0.7s linear infinite; flex-shrink: 0;
        }
        .co-form-divider { height: 1px; background: rgba(196,122,30,0.12); margin: 24px 0; }
      `}</style>

      <Navbar />

      <div className="co-page">

        <div className="co-hero">
          <div className="co-hero-eyebrow">Secure Checkout</div>
          <h1>{heroLabel[type]} <span>{item.title}</span></h1>
        </div>

        <div className="co-trust-bar">
          {[
            { icon: '🔒', label: '100% Secure Payment' },
            { icon: '📜', label: 'Vedic Astrology Experts' },
            { icon: '⚡', label: 'Fast Delivery' },
            { icon: '✅', label: 'Satisfaction Guaranteed' },
          ].map(t => (
            <div className="co-trust-item" key={t.label}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>

        <div className="co-inner">

          {/* ── LEFT: Plan Card ── */}
          <div className="co-plan-card">
            <div className="co-plan-img">
              <div className="co-plan-badge">Best Value</div>
              <img src={item.image} alt={item.title} />
            </div>
            <div className="co-plan-body">
              <h3 className="co-plan-name">{plan.name}</h3>
              <p className="co-plan-tagline">{plan.tagline}</p>
              <div className="co-price-box">
                <div>
                  <div className="co-price-orig">{plan.originalPrice}</div>
                  <div className="co-price-disc">{plan.discountedPrice}/-</div>
                </div>
                <div className="co-price-save">Save 60%</div>
              </div>
              <p className="co-features-title">What's Included</p>
              <ul className="co-features">
                {plan.features.map(f => (
                  <li key={f.label} className={`co-feature-item${f.included ? '' : ' off'}`}>
                    <span className={`co-feature-dot ${f.included ? 'on' : 'off'}`}>
                      {f.included ? '✓' : '✕'}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
              <div className="co-plan-divider" />
              <div className="co-secure-note">
                <span>🔒</span>
                <span>Payments are 100% secure & encrypted</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Form ── */}
          <div className="co-form-card">
            <div className="co-form-header">
              <div>
                <h2 className="co-form-title">Enter Your Details</h2>
                <p className="co-form-sub">{formSubtitle[type]}</p>
              </div>
              <div className="co-step-badge">Step 1 of 2</div>
            </div>

            <p className="co-section-label">Personal Information</p>
            <div className="co-form-grid">
              <div className="co-field">
                <label className="co-label">Full Name <span>*</span></label>
                <input className="co-input" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} />
              </div>
              <div className="co-field">
                <label className="co-label">Email Address <span>*</span></label>
                <input className="co-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="co-field">
                <label className="co-label">WhatsApp Number <span>*</span></label>
                <input className="co-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.whatsapp} onChange={set('whatsapp')} />
              </div>
              <div className="co-field">
                <label className="co-label">Gender <span>*</span></label>
                <select className="co-input" value={form.gender} onChange={set('gender')}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {showBirth && (
              <>
                <p className="co-section-label">Birth Details</p>
                <div className="co-form-grid">
                  <div className="co-field">
                    <label className="co-label">Date of Birth <span>*</span></label>
                    <input className="co-input" type="date" value={form.dob} onChange={set('dob')} />
                  </div>
                  <div className="co-field">
                    <label className="co-label">Time of Birth <span>*</span></label>
                    <input className="co-input" type="time" value={form.time} onChange={set('time')} />
                  </div>
                 <div className="co-field" style={{ position: 'relative' }}>
  <label className="co-label">Birth Place <span>*</span></label>
  <input
    className="co-input"
    type="text"
    placeholder="City, State"
    value={form.place}
    onChange={handlePlaceInput}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    autoComplete="off"
  />
  {showSuggestions && placeSuggestions.length > 0 && (
    <div style={{
      position: 'absolute', top: '100%', left: 0, right: 0,
      background: '#fff', border: '1.5px solid #e4cfa8',
      borderRadius: 10, zIndex: 100, marginTop: 4,
      boxShadow: '0 8px 24px rgba(196,122,30,0.15)',
      overflow: 'hidden',
    }}>
      {placeSuggestions.map((s, i) => (
        <div
          key={i}
          onMouseDown={() => {
            setForm(p => ({ ...p, place: s }))
            setShowSuggestions(false)
          }}
          style={{
            padding: '10px 14px', fontSize: 13, color: '#4a2a0a',
            cursor: 'pointer',
            borderBottom: i < placeSuggestions.length - 1 ? '1px solid #f0e0c8' : 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#fff8ee')}
          onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
        >
          {s}
        </div>
      ))}
    </div>
  )}
</div>
                  <div className="co-field">
                    <label className="co-label">Pin Code <span>*</span></label>
                    <input className="co-input" type="text" placeholder="Your pin code" value={form.pincode} onChange={set('pincode')} />
                  </div>
                  <div className="co-field span-2">
                    <label className="co-label">Report Language <span>*</span></label>
                    <select className="co-input" value={form.language} onChange={set('language')}>
                      <option value="">Select language</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            {isCouple && (
  <>
    <p className="co-section-label">Partner's Birth Details</p>
    <div className="co-form-grid">
      <div className="co-field span-2">
        <label className="co-label">Partner's Full Name <span>*</span></label>
        <input
          className="co-input" type="text" placeholder="Partner's full name"
          value={form.partnerName}
          onChange={set('partnerName')}
        />
      </div>
      <div className="co-field">
        <label className="co-label">Partner's Date of Birth <span>*</span></label>
        <input className="co-input" type="date" value={form.partnerDob} onChange={set('partnerDob')} />
      </div>
      <div className="co-field">
        <label className="co-label">Partner's Time of Birth <span>*</span></label>
        <input className="co-input" type="time" value={form.partnerTime} onChange={set('partnerTime')} />
      </div>
      <div className="co-field">
        <label className="co-label">Partner's Birth Place <span>*</span></label>
        <input
          className="co-input" type="text" placeholder="City, State"
          value={form.partnerPlace}
          onChange={set('partnerPlace')}
          autoComplete="off"
        />
      </div>
      <div className="co-field">
        <label className="co-label">Partner's Gender <span>*</span></label>
        <select className="co-input" value={form.partnerGender} onChange={set('partnerGender')}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  </>
)}

            <div className="co-form-divider" />

            <div className="co-summary">
              <div className="co-summary-row">
                <span>{plan.name}</span>
                <span>{plan.originalPrice}</span>
              </div>
              <div className="co-summary-row" style={{ color: '#4a8a4a' }}>
                <span>Discount Applied</span>
                <span>− Save 60%</span>
              </div>
              <div className="co-summary-row total">
                <span>Total (Incl. GST)</span>
                <span>{plan.discountedPrice}/-</span>
              </div>
            </div>

            <p className="co-terms">
              By proceeding, you agree to our{' '}
              <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
            </p>
            
            <button className="co-pay-btn" onClick={handlePayment} disabled={paying}>
              {paying ? (
                <><span className="co-spinner" /> Processing Payment…</>
              ) : (
                <>{ctaLabel[type]}</>
              )}
            </button>
          </div>

        </div>
      </div>

    </>
  )
}