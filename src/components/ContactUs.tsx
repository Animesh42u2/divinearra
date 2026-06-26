import { useState } from 'react'
import {
  Mail, Phone, MapPin, Send, User, MessageSquare,
  FileText,
  ChevronDown, Clock, Sparkles,
} from 'lucide-react'
import Navbar from './Navbar'

// ── Spiritual Confetti — fast, no lag, built-in shapes only ──────────────────
const SPIRITUAL_COLORS = [
  '#FF9933', '#FFD700', '#FF6B35', '#C8791A',
  '#FFF176', '#FF5722', '#FFAB40', '#FFE082',
]

declare global {
  interface Window {
    confetti?: (opts: object) => void
  }
}

function launchOmConfetti() {
  const fire = () => {
    const cf = window.confetti
    if (!cf) return

    const base = {
      colors        : SPIRITUAL_COLORS,
      shapes        : ['circle', 'square'],
      gravity       : 1,
      decay         : 0.9,
      ticks         : 180,
      zIndex        : 9999,
      disableForReducedMotion: true,
    }

    // Left cannon
    cf({ ...base, particleCount: 60, angle: 60,  spread: 55, startVelocity: 50, origin: { x: 0, y: 0.65 } })
    // Right cannon
    cf({ ...base, particleCount: 60, angle: 120, spread: 55, startVelocity: 50, origin: { x: 1, y: 0.65 } })
    // Center pop
    setTimeout(() => cf({ ...base, particleCount: 80, spread: 90, startVelocity: 40, origin: { x: 0.5, y: 0.55 } }), 150)
  }

  if (window.confetti) {
    fire()
  } else {
    const script  = document.createElement('script')
    script.src    = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
    script.async  = true
    script.onload = fire
    document.body.appendChild(script)
  }
}

const AMBER      = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const CREAM      = '#fdf6e9'
const BROWN_TEXT = '#2a1200'
const BROWN_MID  = '#6b3a10'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyJnRHFyt6zG8uo89510GPk96C2ufuj2x6QvIuOkiRWUyc63UO0HvGMHXJVQyNOtdRpA/exec'

const contactInfo = [
  { icon: Mail,  label: 'Email',                   value: 'support@divinearra.com',          href: 'mailto:support@divinearra.com' },
  { icon: Phone, label: 'Reports related queries', value: '+91 8280055593',                  href: 'tel:+918280055593' },
  { icon: MapPin,label: 'Office',                  value: 'Laxmisagar, Bhubaneswar, Odisha', href: '#map' },
]

const subjects = [
  'Select Service',
  'Premium Personalized Kundali',
  'Career Report',
  'Finance Report',
  'Varshaphal Report',
  'Lal Kitab Report',
  'Education Report',
  'Health Report',
  'Shani Sadesati Report',
  'Fortune Report',
  'Couple Matching Report',
  'Personal Consultation',
  'Couple Consultation',
  'Gemstone & Rudraksha Consultation',
  'Tarot Card Reading',
]

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: 'Select Service', message: '',
  })
  const [errors, setErrors]             = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const [submitError, setSubmitError]   = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    if (form.subject === 'Select Service') e.subject = 'Please select a service'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    setErrors({})
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, value]) => fd.append(key, value))

      await fetch(APPS_SCRIPT_URL, { method: 'POST', body: fd })

      setSubmitted(true)
      launchOmConfetti()
      setForm({ name: '', email: '', phone: '', subject: 'Select Service', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error(err)
      setSubmitError('Submission failed. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const field = (key: keyof typeof form, val: string) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    width: '100%', boxSizing: 'border-box',
    padding: '0.75rem 1rem', borderRadius: 10,
    border: `1.5px solid ${hasErr ? '#d94040' : AMBER + '44'}`,
    background: hasErr ? '#fff5f5' : '#fff',
    fontSize: '0.9rem', color: BROWN_TEXT,
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ background: CREAM, minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .cu-fade { animation: fadeUp 0.55s ease forwards; }
        .cu-info-row:hover .cu-info-val { color: ${AMBER} !important; }
        .cu-submit:hover:not(:disabled) { background: ${AMBER_DARK} !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139,78,10,0.4) !important; }
        .cu-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        input:focus, textarea:focus, select:focus { border-color: ${AMBER} !important; box-shadow: 0 0 0 3px ${AMBER}22; }

        .cu-hero {
          position: relative; overflow: hidden;
          padding: clamp(3rem,8vw,5rem) clamp(1rem,5vw,3rem) clamp(4rem,9vw,6.5rem);
          text-align: center; min-height: 340px;
          display: flex; align-items: center; justify-content: center;
        }
        .cu-hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; z-index: 0;
        }
        .cu-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(40,10,0,0.25) 0%, rgba(100,40,5,0.15) 50%, rgba(180,90,10,0.08) 100%);
          z-index: 1;
        }
        .cu-hero-content { position: relative; z-index: 2; }
        .cu-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 0.85rem;
          text-shadow: 0 2px 12px rgba(0,0,0,0.45);
        }
        .cu-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35);
          border-radius: 20px; padding: 5px 16px; font-size: 12px; color: #fff;
          font-weight: 600; letter-spacing: 0.1em; margin-bottom: 1.25rem;
        }
        .cu-hero-sub {
          color: rgba(255,255,255,0.9);
          font-size: clamp(0.85rem, 2vw, 1rem);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.75;
          text-shadow: 0 1px 6px rgba(0,0,0,0.35);
        }

        /* Main grid: two columns on desktop, one on mobile */
        .cu-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.75rem;
          align-items: start;
        }

        /* Phone + Subject row: two columns on desktop, one on mobile */
        .cu-phone-subject {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.1rem;
        }

        @media (max-width: 900px) {
          .cu-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 540px) {
          .cu-phone-subject {
            grid-template-columns: 1fr !important;
          }
          .cu-hero {
            min-height: 280px;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .cu-map-iframe {
            height: 260px !important;
          }
        }
      `}</style>

      {/* ════════════ HERO ════════════ */}
      <section className="cu-hero">
        <video
          className="cu-hero-video"
          src="https://res.cloudinary.com/dcse27hnb/video/upload/v1782254689/vidssave.com_Complete_Solar_system_copyright_free_video_Stock_video_stockfootage_istock_video_720p_wbv3le.mp4"
          autoPlay loop muted playsInline
        />
        <div className="cu-hero-overlay" />

        <div className="cu-hero-content cu-fade">
          <span className="cu-hero-badge">
            <MessageSquare size={13}/> Get In Touch
          </span>
          <h1 className="cu-hero-title">
            <span style={{ color: '#fff' }}>Contact </span>
            <span style={{ color: '#ffeaa0' }}>Divine Arra Team</span>
          </h1>
          <p className="cu-hero-sub">
            Have a question or want to book a consultation? Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:CREAM, clipPath:'ellipse(55% 100% at 50% 100%)', zIndex:3 }}/>
      </section>

      {/* ════════════ MAIN GRID ════════════ */}
      <section style={{ maxWidth:1050, margin:'0 auto', padding:'3rem clamp(1rem,4vw,2rem)' }}>
        <div className="cu-grid">

          {/* LEFT — FORM */}
          <div style={{ background:'#fff', borderRadius:18, padding:'clamp(1.25rem,4vw,2.25rem)', border:`1px solid ${AMBER}22`, boxShadow:`0 4px 24px rgba(200,121,26,0.1)` }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.1rem,2.5vw,1.45rem)', color:BROWN_TEXT, margin:'0 0 1.5rem', display:'flex', alignItems:'center', gap:8 }}>
              <Send size={18} color={AMBER}/> Send a Message
            </h2>

            {submitted && (
              <div style={{ background:`${AMBER}18`, border:`1px solid ${AMBER}55`, borderRadius:10, padding:'0.85rem 1.1rem', marginBottom:'1.25rem', color:AMBER_DARK, fontSize:'0.9rem', fontWeight:600, display:'flex', alignItems:'center', gap:8 }}>
                <Sparkles size={16}/> Message sent! We'll get back to you shortly. Check your email for confirmation.
              </div>
            )}

            {submitError && (
              <div style={{ background:'#fff5f5', border:'1px solid #d9404055', borderRadius:10, padding:'0.85rem 1.1rem', marginBottom:'1.25rem', color:'#d94040', fontSize:'0.9rem', fontWeight:600 }}>
                ❌ {submitError}
              </div>
            )}

            {/* Name */}
            <div style={{ marginBottom:'1.1rem' }}>
              <label style={{ display:'block', fontSize:'0.82rem', fontWeight:600, color:BROWN_MID, marginBottom:'0.4rem' }}>
                Name <span style={{ color:'#d94040' }}>*</span>
              </label>
              <div style={{ position:'relative' }}>
                <User size={15} color={AMBER} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input
                  value={form.name} onChange={e => field('name', e.target.value)}
                  placeholder="Your full name"
                  style={{ ...inputStyle(!!errors.name), paddingLeft:'2.2rem' }}
                />
              </div>
              {errors.name && <p style={{ color:'#d94040', fontSize:'0.78rem', margin:'0.3rem 0 0' }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom:'1.1rem' }}>
              <label style={{ display:'block', fontSize:'0.82rem', fontWeight:600, color:BROWN_MID, marginBottom:'0.4rem' }}>
                Email <span style={{ color:'#d94040' }}>*</span>
              </label>
              <div style={{ position:'relative' }}>
                <Mail size={15} color={AMBER} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input
                  type="email" value={form.email} onChange={e => field('email', e.target.value)}
                  placeholder="your.email@example.com"
                  style={{ ...inputStyle(!!errors.email), paddingLeft:'2.2rem' }}
                />
              </div>
              {errors.email && <p style={{ color:'#d94040', fontSize:'0.78rem', margin:'0.3rem 0 0' }}>{errors.email}</p>}
            </div>

            {/* Phone + Subject — stacks on small screens */}
            <div className="cu-phone-subject">
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:600, color:BROWN_MID, marginBottom:'0.4rem' }}>Phone</label>
                <div style={{ position:'relative' }}>
                  <Phone size={15} color={AMBER} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                  <input
                    value={form.phone} onChange={e => field('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    style={{ ...inputStyle(false), paddingLeft:'2.2rem' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:600, color:BROWN_MID, marginBottom:'0.4rem' }}>
                  Service <span style={{ color:'#d94040' }}>*</span>
                </label>
                <div style={{ position:'relative' }}>
                  <FileText size={15} color={AMBER} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', zIndex:1 }}/>
                  <ChevronDown size={15} color={AMBER} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                  <select
                    value={form.subject} onChange={e => field('subject', e.target.value)}
                    style={{ ...inputStyle(!!errors.subject), paddingLeft:'2.2rem', appearance:'none', cursor:'pointer' }}>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {errors.subject && <p style={{ color:'#d94040', fontSize:'0.78rem', margin:'0.3rem 0 0' }}>{errors.subject}</p>}
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.82rem', fontWeight:600, color:BROWN_MID, marginBottom:'0.4rem' }}>
                Message <span style={{ color:'#d94040' }}>*</span>
              </label>
              <textarea
                value={form.message} onChange={e => field('message', e.target.value)}
                placeholder="Tell us what you'd like guidance on..."
                rows={5}
                style={{ ...inputStyle(!!errors.message), resize:'vertical', minHeight:110, fontFamily:'inherit' }}
              />
              {errors.message && <p style={{ color:'#d94040', fontSize:'0.78rem', margin:'0.3rem 0 0' }}>{errors.message}</p>}
            </div>

            <button
              className="cu-submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width:'100%', padding:'0.9rem', borderRadius:10, border:'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`,
                color:'#fff', fontWeight:700, fontSize:'0.95rem',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                boxShadow:`0 4px 16px ${AMBER}44`,
                transition:'all 0.25s ease', fontFamily:'inherit',
                opacity: isSubmitting ? 0.75 : 1,
              }}>
              <Send size={16}/>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* RIGHT — INFO */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

            {/* Contact info card */}
            <div style={{ background:'#fff', borderRadius:18, padding:'clamp(1.25rem,3vw,1.75rem)', border:`1px solid ${AMBER}22`, boxShadow:`0 4px 24px rgba(200,121,26,0.1)` }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1rem,2.5vw,1.2rem)', color:BROWN_TEXT, margin:'0 0 1.25rem', display:'flex', alignItems:'center', gap:8 }}>
                <Phone size={17} color={AMBER}/> Contact Information
              </h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="cu-info-row"
                    style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', textDecoration:'none', transition:'all 0.2s' }}>
                    <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center', marginTop:1 }}>
                      <Icon size={16} color="#fff" strokeWidth={1.8}/>
                    </div>
                    <div>
                      <p style={{ fontSize:'0.7rem', color:BROWN_MID, margin:'0 0 1px', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</p>
                      <p className="cu-info-val" style={{ fontSize:'0.875rem', color:BROWN_TEXT, margin:0, fontWeight:500, lineHeight:1.5, transition:'color 0.2s' }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div style={{ background:'#fff', borderRadius:18, padding:'clamp(1.25rem,3vw,1.5rem)', border:`1px solid ${AMBER}22`, boxShadow:`0 4px 20px rgba(200,121,26,0.08)` }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1rem', color:BROWN_TEXT, margin:'0 0 1rem', display:'flex', alignItems:'center', gap:8 }}>
                <Clock size={16} color={AMBER}/> Business Hours
              </h3>
              {[['Mon – Sat','9:00 AM – 7:00 PM'],['Sunday','10:00 AM – 4:00 PM']].map(([day, time]) => (
                <div key={day} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.5rem 0', borderBottom:`1px solid ${AMBER}18` }}>
                  <span style={{ fontSize:'0.83rem', color:BROWN_MID, fontWeight:600 }}>{day}</span>
                  <span style={{ fontSize:'0.83rem', color:AMBER_DARK, fontWeight:700 }}>{time}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════ MAP ════════════ */}
      <section style={{ maxWidth:1050, margin:'0 auto', padding:'0 clamp(1rem,4vw,2rem) 5rem' }}>
        <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', border:`1px solid ${AMBER}22`, boxShadow:`0 4px 24px rgba(200,121,26,0.1)` }}>
          <div style={{ background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, padding:'0.85rem 1.5rem', display:'flex', alignItems:'center', gap:8 }}>
            <MapPin size={17} color="#fff"/>
            <span style={{ color:'#fff', fontWeight:700, fontSize:'0.95rem' }}>Location</span>
          </div>
          <iframe
            title="Divine Arra Location"
            className="cu-map-iframe"
            src="https://maps.google.com/maps?ll=20.267355,85.850611&z=13&t=m&hl=en-US&gl=US&mapclient=embed&q=Laxmisagar+Bhubaneswar+Odisha&output=embed"
            width="100%" height="400"
            style={{ display:'block', border:'none' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  )
}
