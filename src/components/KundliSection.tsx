import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, User, Phone, Mail, Calendar, Clock, MapPin, Users } from 'lucide-react'

const PROXY_BASE = '/prokerala'
const clientId = import.meta.env.VITE_PROKERALA_CLIENT_ID as string
const clientSecret = import.meta.env.VITE_PROKERALA_CLIENT_SECRET as string

async function getToken(): Promise<string> {
  const res = await fetch(`${PROXY_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  if (!res.ok) throw new Error('Token fetch failed — check your .env credentials')
  const data = await res.json()
  return data.access_token
}

interface FormState {
  name: string
  phone: string
  email: string
  dob: string
  time: string
  place: string
  gender: string
}

// REPLACE the fetchKundli function
async function fetchKundli(token: string, form: FormState) {
  const datetime = `${form.dob}T${form.time || '00:00'}:00+05:30`
  const params = new URLSearchParams({
    ayanamsa: '1',
    coordinates: '20.2961,85.8245',
    datetime,
    la: 'en',
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

  if (!birthRes.ok) {
    throw new Error(birthJson?.errors?.[0]?.detail || 'Birth details API error')
  }

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

export default function KundliSection() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', email: '', dob: '', time: '', place: '', gender: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  async function handleSubmit() {
    if (!form.name || !form.dob) {
      setError('Please fill in at least Name and Date of Birth.')
      return
    }
    setLoading(true)
    setError('')
try {
  const token = await getToken()
  const { birthJson, panchangJson, mangalJson } = await fetchKundli(token, form)

  const b = birthJson?.data
  const p = panchangJson?.data
  const m = mangalJson?.data

  navigate('/kundali', {
    state: {
      result: {
        // Birth — note: chandra_rasi = moon sign, soorya_rasi = sun sign
        nakshatra:     b?.nakshatra?.name          ?? null,
        nakshatraPada: b?.nakshatra?.pada          ?? null,
        rashi:         b?.chandra_rasi?.name       ?? null,   // ✅ was moon_sign
        sunSign:       b?.soorya_rasi?.name        ?? null,   // ✅ was sun_sign
        ascendant:     b?.zodiac?.name             ?? null,   // ✅ was ascendant/lagna

        // Panchang — all arrays, take first element [0]
        tithi:         p?.tithi?.[0]?.name         ?? null,
        tithiPaksha:   p?.tithi?.[0]?.paksha       ?? null,
        yoga:          p?.yoga?.[0]?.name          ?? null,
        karana:        p?.karana?.[0]?.name        ?? null,
        vara:          p?.vaara                    ?? null,   // ✅ "vaara" not "vara"
        nakshatra2:    p?.nakshatra?.[0]?.name     ?? null,

        // Mangal — "has_dosha" not "is_mars_dosha"
        mangalDosha:   m?.has_dosha                ?? null,   // ✅ was is_mars_dosha
        mangalDoshaDesc: m?.description            ?? null,
      },
      userInfo: {
        name: form.name, dob: form.dob,
        time: form.time, place: form.place, gender: form.gender,
      },
    },
  })
} catch (e: unknown) {
  setError((e as Error).message || 'Something went wrong. Please try again.')
} finally {
  setLoading(false)
}
  }

  const inputStyle = {
    width: '100%', padding: '9px 0',
    borderBottom: '1.5px solid #c47a1e',
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    background: 'transparent', fontSize: 14,
    fontFamily: 'sans-serif', outline: 'none',
    color: '#4a2006', boxSizing: 'border-box' as const,
  }

  return (
    <section style={{
      background: 'linear-gradient(135deg, #c47a1e 0%, #b8691a 100%)',
      padding: '72px 8%',
      display: 'flex', alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 40, flexWrap: 'wrap',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        .kundli-input::placeholder { color: #b08858; }
        .kundli-input:focus { border-bottom-color: #e8a135 !important; }
        .kundli-label { font-size: 12px; color: #7a5a3a; font-family: sans-serif; display: flex; align-items: center; gap: 5px; margin-bottom: 4px; }
        .kundli-label svg { color: #c47a1e; }
        @media (max-width: 768px) {
          .kundli-left { max-width: 100% !important; }
          .kundli-card { min-width: unset !important; max-width: 100% !important; }
          .kundli-form-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>

      {/* Zodiac watermark */}
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', fontSize: 320, opacity: 0.07, pointerEvents: 'none', lineHeight: 1 }}>♈</div>

      {/* Left: copy */}
      <div className="kundli-left" style={{ maxWidth: 400, flex: 1, color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, fontFamily: 'Georgia, serif', margin: '0 0 16px', lineHeight: 1.25 }}>
          Get Your <span style={{ textDecoration: 'underline' }}>Free Kundli</span>
        </h2>
        <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, fontFamily: 'sans-serif' }}>
          Ancient wisdom decoded for modern times. Get clear insights into your life, career,
          relationships, and future with your personalized kundli report.
        </p>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Nakshatra & Rashi', 'Ascendant (Lagna)', 'Mangal Dosha', 'Tithi, Yoga & Karana'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.9)', fontFamily: 'sans-serif', fontSize: 14 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right: form card */}
      <div className="kundli-card" style={{ background: '#fdf6ed', borderRadius: 20, padding: '32px 28px', minWidth: 300, maxWidth: 500, flex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h3 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 22, margin: '0 0 24px', color: '#4a2006' }}>
          Kundli Calculator
        </h3>

        <div className="kundli-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {fields.map(([label, key, type, ph, icon]) => (
            <div key={key} style={{ gridColumn: key === 'place' || key === 'email' ? 'span 2' : 'span 1' }}>
              <label className="kundli-label">{icon}{label}</label>
              <input
                className="kundli-input"
                type={type}
                placeholder={ph}
                value={form[key]}
                onChange={set(key)}
                style={inputStyle}
              />
            </div>
          ))}

          {/* Gender */}
          <div style={{ gridColumn: 'span 2' }}>
            <label className="kundli-label"><Users size={13} style={{ color: '#c47a1e' }} />Gender</label>
            <select value={form.gender} onChange={set('gender')} style={{ ...inputStyle, color: form.gender ? '#4a2006' : '#b08858' }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 14, padding: '10px 14px', background: '#fff0f0', border: '1px solid #e07070', borderRadius: 8, fontSize: 13, color: '#c03030', fontFamily: 'sans-serif' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#ddb87a' : 'linear-gradient(90deg, #c47a1e, #e8a135)',
            color: '#fff', border: 'none',
            padding: '14px', borderRadius: 10,
            fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 20, fontFamily: 'sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 0.2s',
          }}>
          {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Calculating...</> : 'Get My Kundli'}
        </button>
      </div>
    </section>
  )
}