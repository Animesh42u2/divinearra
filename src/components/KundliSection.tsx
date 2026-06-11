import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, User, Phone, Mail, Calendar, Clock, MapPin, Users } from 'lucide-react'

const PROXY_BASE = import.meta.env.PROD ? '/api/prokerala' : '/prokerala'
const isProd = import.meta.env.PROD

async function getToken(): Promise<string> {
  const url = isProd ? '/api/prokerala-token' : '/prokerala/token'
  const res = await fetch(url, {
    method: 'POST',
    headers: isProd ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: isProd ? undefined : new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_PROKERALA_CLIENT_ID ?? '',
      client_secret: import.meta.env.VITE_PROKERALA_CLIENT_SECRET ?? '',
    }),
  })
  if (!res.ok) throw new Error('Token fetch failed — check your .env credentials')
  const data = await res.json()
  return data.access_token
}

interface FormState {
  name: string; phone: string; email: string
  dob: string; time: string; place: string; gender: string
}

async function fetchKundli(token: string, form: FormState) {
  const datetime = `${form.dob}T${form.time || '00:00'}:00+05:30`
  const params = new URLSearchParams({
    ayanamsa: '1', coordinates: '20.2961,85.8245',
    datetime, la: 'en',
    gender: form.gender === 'female' ? 'female' : 'male',
  })
  const headers = { Authorization: `Bearer ${token}` }
  const [birthRes, panchangRes, mangalRes] = await Promise.all([
    fetch(`${PROXY_BASE}/v2/astrology/birth-details?${params}`, { headers }),
    fetch(`${PROXY_BASE}/v2/astrology/panchang?${params}`, { headers }),
    fetch(`${PROXY_BASE}/v2/astrology/mangal-dosha?${params}`, { headers }),
  ])
  const [birthJson, panchangJson, mangalJson] = await Promise.all([
    birthRes.json().catch(() => ({})),
    panchangRes.json().catch(() => ({})),
    mangalRes.json().catch(() => ({})),
  ])
  if (!birthRes.ok) throw new Error(birthJson?.errors?.[0]?.detail || 'Birth details API error')
  return { birthJson, panchangJson, mangalJson }
}

const fields: [string, keyof FormState, string, string, React.ReactNode][] = [
  ['Full Name', 'name', 'text', 'Enter your full name', <User size={13} />],
  ['Phone', 'phone', 'tel', 'Enter your phone number', <Phone size={13} />],
  ['Email', 'email', 'email', 'Enter your email', <Mail size={13} />],
  ['Date of Birth', 'dob', 'date', '', <Calendar size={13} />],
  ['Time of Birth', 'time', 'time', '', <Clock size={13} />],
  ['Birth Place', 'place', 'text', 'Enter your city', <MapPin size={13} />],
]

const features = ['Nakshatra & Rashi', 'Ascendant (Lagna)', 'Mangal Dosha', 'Tithi, Yoga & Karana']

export default function KundliSection() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', dob: '', time: '', place: '', gender: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  async function handleSubmit() {
    if (!form.name || !form.dob) { setError('Please fill in at least Name and Date of Birth.'); return }
    setLoading(true); setError('')
    try {
      const token = await getToken()
      const { birthJson, panchangJson, mangalJson } = await fetchKundli(token, form)
      const b = birthJson?.data; const p = panchangJson?.data; const m = mangalJson?.data
      navigate('/kundali', {
        state: {
          result: {
            nakshatra: b?.nakshatra?.name ?? null, nakshatraPada: b?.nakshatra?.pada ?? null,
            rashi: b?.chandra_rasi?.name ?? null, sunSign: b?.soorya_rasi?.name ?? null,
            ascendant: b?.zodiac?.name ?? null, tithi: p?.tithi?.[0]?.name ?? null,
            tithiPaksha: p?.tithi?.[0]?.paksha ?? null, yoga: p?.yoga?.[0]?.name ?? null,
            karana: p?.karana?.[0]?.name ?? null, vara: p?.vaara ?? null,
            nakshatra2: p?.nakshatra?.[0]?.name ?? null, mangalDosha: m?.has_dosha ?? null,
            mangalDoshaDesc: m?.description ?? null,
          },
          userInfo: { name: form.name, dob: form.dob, time: form.time, place: form.place, gender: form.gender },
        },
      })
    } catch (e: unknown) {
      setError((e as Error).message || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <section ref={sectionRef} className="kundli-section">
      <style>{`
        .kundli-section {
          background: linear-gradient(135deg, #c47a1e 0%, #a85c10 60%, #8b4a0a 100%);
          padding: 80px 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
          min-height: 580px;
        }

        /* Animated radial glow */
        .kundli-section::before {
          content: '';
          position: absolute;
          top: -40%;
          left: -10%;
          width: 70%;
          height: 180%;
          background: radial-gradient(ellipse, rgba(255,200,80,0.18) 0%, transparent 70%);
          animation: glowPulse 6s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes glowPulse {
          from { opacity: 0.5; transform: scale(1); }
          to   { opacity: 1;   transform: scale(1.08); }
        }

        /* Tala patra image card */
        .tala-img-card {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translateY(-50%);
          width: 42%;
          max-width: 500px;
          height: calc(100% - 120px);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 48px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,200,80,0.18);
          opacity: 0;
          transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
          pointer-events: none;
        }
        .tala-img-card.visible {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        .tala-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: sepia(0.6) brightness(0.75) contrast(1.25) saturate(0.9);
          mix-blend-mode: normal;
          display: block;
        }
        /* gold shimmer overlay on the card */
        .tala-img-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(196,122,30,0.45) 0%, rgba(139,74,10,0.55) 100%);
          border-radius: 24px;
        }

        /* Left content */
        .kundli-left {
          position: relative;
          z-index: 2;
          max-width: 420px;
          flex: 1;
          color: #fff;
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s;
        }
        .kundli-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .kundli-left h2 {
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          font-family: 'Georgia', serif;
          margin: 0 0 18px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.3);
        }
        .kundli-left h2 span {
          text-decoration: underline;
          text-decoration-color: rgba(255,220,100,0.7);
          text-underline-offset: 5px;
        }

        .kundli-left p {
          font-size: 15px;
          opacity: 0.88;
          line-height: 1.8;
          font-family: sans-serif;
          text-shadow: 0 1px 8px rgba(0,0,0,0.2);
        }

        .kundli-features {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .kundli-feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.95);
          font-family: sans-serif;
          font-size: 14px;
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .kundli-feature-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .kundli-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255,220,80,0.25);
          border: 1.5px solid rgba(255,220,80,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
          color: #ffe066;
          transition: background 0.3s, transform 0.3s;
        }
        .kundli-feature-item:hover .kundli-check {
          background: rgba(255,220,80,0.45);
          transform: scale(1.15);
        }

        /* Right: form card */
        .kundli-card {
          position: relative;
          z-index: 2;
          background: rgba(253, 246, 237, 0.97);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 36px 32px;
          min-width: 300px;
          max-width: 500px;
          flex: 1;
          box-shadow: 0 24px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,200,80,0.2);
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s;
        }
        .kundli-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .kundli-card h3 {
          text-align: center;
          font-family: 'Georgia', serif;
          font-size: 23px;
          margin: 0 0 8px;
          color: #4a2006;
          letter-spacing: 0.3px;
        }
        .kundli-card-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #c47a1e, #e8a135);
          border-radius: 2px;
          margin: 0 auto 24px;
        }

        .kundli-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .kundli-field {
          position: relative;
        }

        .kundli-label {
          font-size: 11px;
          color: #9a7040;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          font-weight: 600;
        }
        .kundli-label svg { color: #c47a1e; }

        .kundli-input {
          width: 100%;
          padding: 9px 0;
          border: none;
          border-bottom: 1.5px solid #d4a060;
          background: transparent;
          font-size: 14px;
          font-family: sans-serif;
          outline: none;
          color: #3a1800;
          box-sizing: border-box;
          transition: border-color 0.25s;
        }
        .kundli-input::placeholder { color: #c0965a; }
        .kundli-input:focus { border-bottom-color: #e8a135; }

        /* Animated underline on focus */
        .kundli-field::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #c47a1e, #f0b445);
          border-radius: 2px;
          transition: width 0.35s ease;
        }
        .kundli-field:focus-within::after { width: 100%; }

        .kundli-btn {
          width: 100%;
          background: linear-gradient(90deg, #c47a1e 0%, #e8a135 50%, #c47a1e 100%);
          background-size: 200% auto;
          color: #fff;
          border: none;
          padding: 15px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          margin-top: 22px;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.4px;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(196,122,30,0.4);
        }
        .kundli-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(196,122,30,0.55);
        }
        .kundli-btn:active:not(:disabled) { transform: translateY(0); }
        .kundli-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .kundli-error {
          margin-top: 14px;
          padding: 10px 14px;
          background: #fff0f0;
          border: 1px solid #e07070;
          border-radius: 8px;
          font-size: 13px;
          color: #c03030;
          font-family: sans-serif;
        }

        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes starFloat {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50%  { opacity: 1; }
          100% { transform: translateY(-60px) rotate(180deg); opacity: 0; }
        }

        .kundli-star {
          position: absolute;
          font-size: 14px;
          color: rgba(255,220,80,0.6);
          pointer-events: none;
          animation: starFloat linear infinite;
        }

        @media (max-width: 768px) {
          .kundli-section { padding: 56px 6%; flex-direction: column; }
          .kundli-left { max-width: 100% !important; text-align: center; }
          .kundli-features { 
  align-items: flex-start !important; 
  width: fit-content !important; 
  margin: 0 auto !important; 
  padding: 0 !important;
}
.kundli-feature-item { 
  justify-content: flex-start !important; 
  width: 100% !important; 
  margin: 0 !important;
  transform: none !important;
}
.kundli-feature-item.visible {
  transform: none !important;
}
          .kundli-card { min-width: unset !important; max-width: 100% !important; }
          .kundli-form-grid { grid-template-columns: 1fr !important; }
          .tala-img-card {
            display: none;
          }
        }
      `}</style>

      {/* Floating stars */}
      {[
        { left: '12%', top: '20%', delay: '0s',   dur: '5s'  },
        { left: '25%', top: '70%', delay: '1.5s', dur: '7s'  },
        { left: '6%',  top: '55%', delay: '3s',   dur: '6s'  },
        { left: '38%', top: '15%', delay: '0.8s', dur: '8s'  },
        { left: '18%', top: '40%', delay: '2.2s', dur: '5.5s'},
      ].map((s, i) => (
        <span key={i} className="kundli-star" style={{
          left: s.left, top: s.top,
          animationDelay: s.delay, animationDuration: s.dur,
        }}>✦</span>
      ))}

      {/* Tala patra image card */}
      <div className={`tala-img-card ${visible ? 'visible' : ''}`}>
        <img src="/tala-patra.webp" alt="Tala patra kundali" />
      </div>

      {/* Left content */}
      <div className={`kundli-left ${visible ? 'visible' : ''}`}>
        <h2>
          Get Your <span>Free Kundli</span>
        </h2>
        <p>
          Ancient wisdom decoded for modern times. Get clear insights into your life,
          career, relationships, and future with your personalized kundli report.
        </p>
        <div className="kundli-features">
          {features.map((f, i) => (
            <div
              key={f}
              className={`kundli-feature-item ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: visible ? `${0.7 + i * 0.12}s` : '0s' }}
            >
              <span className="kundli-check">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right: form card */}
      <div className={`kundli-card ${visible ? 'visible' : ''}`}>
        <h3>Kundli Calculator</h3>
        <div className="kundli-card-divider" />

        <div className="kundli-form-grid">
          {fields.map(([label, key, type, ph, icon]) => (
            <div
              key={key}
              className="kundli-field"
              style={{ gridColumn: key === 'place' || key === 'email' ? 'span 2' : 'span 1' }}
            >
              <label className="kundli-label">{icon}{label}</label>
              <input
                className="kundli-input"
                type={type}
                placeholder={ph}
                value={form[key]}
                onChange={set(key)}
              />
            </div>
          ))}

          <div className="kundli-field" style={{ gridColumn: 'span 2' }}>
            <label className="kundli-label">
              <Users size={13} style={{ color: '#c47a1e' }} />Gender
            </label>
            <select
              className="kundli-input"
              value={form.gender}
              onChange={set('gender')}
              style={{ color: form.gender ? '#3a1800' : '#c0965a' }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {error && <div className="kundli-error">{error}</div>}

        <button
          className="kundli-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Calculating...</>
            : '✦ Get My Kundli'}
        </button>
      </div>
    </section>
  )
}