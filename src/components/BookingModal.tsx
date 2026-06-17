import { useState } from 'react'
import { X, Sparkles, Send, Loader2 } from 'lucide-react'

const AMBER = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const BROWN_TEXT = '#2a1200'
const BROWN_MID = '#6b3a10'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyJnRHFyt6zG8uo89510GPk96C2ufuj2x6QvIuOkiRWUyc63UO0HvGMHXJVQyNOtdRpA/exec'

type Props = {
  service: string
  onClose: () => void
}

export default function BookingModal({ service, onClose }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: 'Morning (9–12 AM)', message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const field = (key: keyof typeof form, val: string) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const fd = new FormData()
      fd.append('name',    form.name)
      fd.append('email',   form.email)
      fd.append('phone',   form.phone)
      fd.append('subject', service)          // service name as subject
      fd.append('date',    form.date)
      fd.append('time',    form.time)
      fd.append('message', form.message || 'No additional message')

      await fetch(APPS_SCRIPT_URL, { method: 'POST', body: fd })

      setSubmitted(true)
      setTimeout(onClose, 3000)
    } catch (err) {
      console.error(err)
      setSubmitError('Submission failed. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inp = (hasErr = false): React.CSSProperties => ({
    width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.9rem',
    borderRadius: 10,
    border: `1.5px solid ${hasErr ? '#d94040' : AMBER + '44'}`,
    background: hasErr ? '#fff5f5' : '#fff',
    fontSize: 13, color: BROWN_TEXT, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  })

  const label = (): React.CSSProperties => ({    display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID,
    marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em',
  })

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fdf6e9', borderRadius: 18, width: '100%',
        maxWidth: 440, overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif",
        maxHeight: '90vh', overflowY: 'auto',
      }}>

        {/* ── Header ── */}
        <div style={{ background: `linear-gradient(135deg,${AMBER_DARK},${AMBER})`, padding: '1.5rem 1.75rem 1.25rem', position: 'relative' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 16,
            background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff',
            width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={14} /></button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#fff', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
            <Sparkles size={11} /> Book a session
          </div>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{service}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>Fill in your details and we'll confirm your booking</div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '1.5rem 1.75rem' }}>

          {/* Success */}
          {submitted && (
            <div style={{ background: `${AMBER}18`, border: `1px solid ${AMBER}44`, borderRadius: 10, padding: '0.85rem 1rem', marginBottom: '1rem', fontSize: 13, fontWeight: 600, color: AMBER_DARK, display: 'flex', alignItems: 'center', gap: 8 }}>
              ✅ Booking request sent! We'll contact you shortly.
            </div>
          )}

          {/* Error */}
          {submitError && (
            <div style={{ background: '#fff5f5', border: '1px solid #d9404055', borderRadius: 10, padding: '0.85rem 1rem', marginBottom: '1rem', fontSize: 13, fontWeight: 600, color: '#d94040' }}>
              ❌ {submitError}
            </div>
          )}

          {/* Name + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={label()}>Full name *</label>
              <input style={inp(!!errors.name)} placeholder="Your name" value={form.name} onChange={e => field('name', e.target.value)} />
              {errors.name && <p style={{ color: '#d94040', fontSize: 11, margin: '0.25rem 0 0' }}>{errors.name}</p>}
            </div>
            <div>
              <label style={label()}>Phone *</label>
              <input style={inp(!!errors.phone)} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => field('phone', e.target.value)} />
              {errors.phone && <p style={{ color: '#d94040', fontSize: 11, margin: '0.25rem 0 0' }}>{errors.phone}</p>}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={label()}>Email *</label>
            <input style={inp(!!errors.email)} type="email" placeholder="your@email.com" value={form.email} onChange={e => field('email', e.target.value)} />
            {errors.email && <p style={{ color: '#d94040', fontSize: 11, margin: '0.25rem 0 0' }}>{errors.email}</p>}
          </div>

          {/* Date + Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={label()}>Preferred date</label>
              <input style={inp()} type="date" value={form.date} onChange={e => field('date', e.target.value)} />
            </div>
            <div>
              <label style={label()}>Time slot</label>
              <select style={{ ...inp(), appearance: 'none' }} value={form.time} onChange={e => field('time', e.target.value)}>
                <option>Morning (9–12 AM)</option>
                <option>Afternoon (12–3 PM)</option>
                <option>Evening (3–7 PM)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={label()}>Message (optional)</label>
            <input style={inp()} placeholder="Anything you'd like us to know..." value={form.message} onChange={e => field('message', e.target.value)} />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || submitted}
            style={{
              width: '100%', padding: '0.85rem', borderRadius: 12, border: 'none',
              background: submitted
                ? '#4caf50'
                : `linear-gradient(135deg,${AMBER_DARK},${AMBER})`,
              color: '#fff', fontWeight: 700, fontSize: 14, cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'inherit', opacity: isSubmitting ? 0.8 : 1,
              transition: 'background 0.3s',
            }}
          >
            {isSubmitting
              ? <><Loader2 size={15} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending...</>
              : submitted
              ? '✅ Booking Sent!'
              : <><Send size={15} /> Confirm Booking</>
            }
          </button>

          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      </div>
    </div>
  )
}
