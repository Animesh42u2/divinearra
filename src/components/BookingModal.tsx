import { useState } from 'react'
import { X, Sparkles, Send } from 'lucide-react'

const AMBER = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const BROWN_TEXT = '#2a1200'
const BROWN_MID = '#6b3a10'

type Props = {
  service: string
  onClose: () => void
}

export default function BookingModal({ service, onClose }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: 'Morning (9–12 AM)', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const field = (key: keyof typeof form, val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) {
      alert('Please fill in name, phone, and email.')
      return
    }
    setSubmitted(true)
    setTimeout(onClose, 2500)
  }

  const inp: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.9rem',
    borderRadius: 10, border: `1.5px solid ${AMBER}44`, background: '#fff',
    fontSize: 13, color: BROWN_TEXT, outline: 'none', fontFamily: 'inherit',
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fdf6e9', borderRadius: 18, width: '100%',
        maxWidth: 440, overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif",
      }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${AMBER_DARK},${AMBER})`, padding: '1.5rem 1.75rem 1.25rem', position: 'relative' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 16,
            background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff',
            width: 28, height: 28, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={14} /></button>
          <div style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:20, padding:'3px 12px', fontSize:11, color:'#fff', fontWeight:600, letterSpacing:'0.08em', marginBottom:'0.6rem' }}>
            <Sparkles size={11} /> Book a session
          </div>
          <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{service}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>Fill in your details and we'll confirm your booking</div>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          {submitted && (
            <div style={{ background: `${AMBER}18`, border: `1px solid ${AMBER}44`, borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: 12, fontWeight: 600, color: AMBER_DARK }}>
              ✅ Booking request sent! We'll contact you shortly.
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full name *</label>
              <input style={inp} placeholder="Your name" value={form.name} onChange={e => field('name', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone *</label>
              <input style={inp} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => field('phone', e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email *</label>
            <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => field('email', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preferred date</label>
              <input style={inp} type="date" value={form.date} onChange={e => field('date', e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Time slot</label>
              <select style={{ ...inp, appearance: 'none' }} value={form.time} onChange={e => field('time', e.target.value)}>
                <option>Morning (9–12 AM)</option>
                <option>Afternoon (12–3 PM)</option>
                <option>Evening (3–7 PM)</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: BROWN_MID, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message (optional)</label>
            <input style={inp} placeholder="Anything you'd like us to know..." value={form.message} onChange={e => field('message', e.target.value)} />
          </div>
          <button onClick={handleSubmit} style={{
            width: '100%', padding: '0.85rem', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg,${AMBER_DARK},${AMBER})`,
            color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit',
          }}>
            <Send size={15} /> Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}