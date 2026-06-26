import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Moon, Sun, Heart, Sunrise,
  Loader2, ArrowLeft, Calendar, Clock, MapPin, User, Users,
  ChevronRight, Sparkles,
} from 'lucide-react'

// ─── Design Tokens ────────────────────────────────────────────────────────────

const T = {
  amber:      '#c47a1e',
  amberLight: '#f0b445',
  amberDark:  '#4a2006',
  amberPale:  '#fff8ed',
  amberFaint: '#fdf6ed',
  brown:      '#9a7050',
  brownLight: '#c0965a',
  border:     '#e8d5b7',
  borderHov:  '#d4a96a',
  rose:       '#c0415a',
  blue:       '#6b8cba',
  white:      '#ffffff',
  cream:      '#fdf6ed',
  error:      '#c03030',
  errorBg:    '#fff0f0',
  errorBdr:   '#e07070',
  success:    '#2a7a40',
  successBg:  '#f0fff4',
  successBdr: '#6abf7a',
  text:       '#2a1a06',
}

// ─── Types ────────────────────────────────────────────────────────────────────

type CalcKey = 'moon-phase' | 'mangal-dosha' | 'kundli-matching' | 'lagna'
type FieldKey = 'name' | 'dob' | 'time' | 'place' | 'gender' |
                'name2' | 'dob2' | 'time2' | 'place2' | 'gender2'

interface CalcDef {
  key:        CalcKey
  title:      string
  short:      string
  subtitle:   string
  icon:       React.ElementType
  accentColor: string
  fields:     FieldKey[]
  fields2?:   FieldKey[]
  endpoint:   string
}

// ─── Calculator Definitions ───────────────────────────────────────────────────

const CALCS: Record<CalcKey, CalcDef> = {
  'moon-phase': {
    key:         'moon-phase',
    title:       'Moon Phase Calculator',
    short:       'Moon Phase',
    subtitle:    'Discover your emotional nature, instincts & life responses through your birth moon.',
    icon:        Moon,
    accentColor: T.amber,
    fields:      ['name', 'dob', 'time', 'place'],
    endpoint:    '/v2/astrology/panchang',
  },
  'mangal-dosha': {
    key:         'mangal-dosha',
    title:       'Mangal Dosha Calculator',
    short:       'Mangal Dosha',
    subtitle:    'Find out if you have Mangal Dosha and understand its effects on your life & marriage.',
    icon:        Sun,
    accentColor: T.amber,
    fields:      ['name', 'dob', 'time', 'place', 'gender'],
    endpoint:    '/v2/astrology/mangal-dosha',
  },
  'kundli-matching': {
    key:         'kundli-matching',
    title:       'Kundli Matching',
    short:       'Kundli Matching',
    subtitle:    'Check marriage compatibility with detailed Guna Milan and relationship insights.',
    icon:        Heart,
    accentColor: T.amber,
    fields:      ['name', 'dob', 'time', 'place', 'gender'],
    fields2:     ['name2', 'dob2', 'time2', 'place2', 'gender2'],
    endpoint:    '/v2/astrology/kundli-matching',
  },
  'lagna': {
    key:         'lagna',
    title:       'Lagna Calculator',
    short:       'Lagna',
    subtitle:    'Calculate your Ascendant (Lagna) and understand how it shapes your personality.',
    icon:        Sunrise,
    accentColor: T.amber,
    fields:      ['name', 'dob', 'time', 'place'],
    endpoint:    '/v2/astrology/birth-details',
  },
}

const CALC_LIST = Object.values(CALCS)

// ─── Field Metadata ───────────────────────────────────────────────────────────

const FIELDS: Record<FieldKey, { label: string; type: string; placeholder: string; icon: React.ElementType }> = {
  name:    { label: 'Full Name',          type: 'text',   placeholder: 'Your full name',    icon: User     },
  dob:     { label: 'Date of Birth',      type: 'date',   placeholder: '',                  icon: Calendar },
  time:    { label: 'Time of Birth',      type: 'time',   placeholder: '',                  icon: Clock    },
  place:   { label: 'Birth Place',        type: 'text',   placeholder: 'City, State',       icon: MapPin   },
  gender:  { label: 'Gender',             type: 'select', placeholder: 'Select gender',     icon: Users    },
  name2:   { label: "Partner's Name",     type: 'text',   placeholder: 'Partner full name', icon: User     },
  dob2:    { label: "Partner's DOB",      type: 'date',   placeholder: '',                  icon: Calendar },
  time2:   { label: "Partner's Time",     type: 'time',   placeholder: '',                  icon: Clock    },
  place2:  { label: "Partner's Place",    type: 'text',   placeholder: 'Partner city',      icon: MapPin   },
  gender2: { label: "Partner's Gender",   type: 'select', placeholder: 'Select gender',     icon: Users    },
}

// ─── Geocoding (OpenStreetMap Nominatim – no key needed) ──────────────────────

async function geocode(place: string): Promise<{ lat: string; lon: string }> {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } },
    )
    const d = await r.json()
    if (d?.[0]) return { lat: d[0].lat, lon: d[0].lon }
  } catch { /* fall through */ }
  return { lat: '20.5937', lon: '78.9629' } // India centre fallback
}

// ─── Token Helper ─────────────────────────────────────────────────────────────

const isProd    = import.meta.env.PROD
const PROXY     = isProd ? '/api/prokerala' : '/prokerala'
const TOKEN_URL = isProd ? '/api/prokerala-token' : '/prokerala/token'

let _cachedToken = ''
let _tokenExp    = 0

async function getToken(): Promise<string> {
  if (_cachedToken && Date.now() < _tokenExp) return _cachedToken
  const res = await fetch(TOKEN_URL, {
    method:  'POST',
    headers: isProd ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: isProd
      ? undefined
      : new URLSearchParams({
          grant_type:    'client_credentials',
          client_id:     import.meta.env.VITE_PROKERALA_CLIENT_ID    ?? '',
          client_secret: import.meta.env.VITE_PROKERALA_CLIENT_SECRET ?? '',
        }),
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Auth failed (${res.status}): ${errText}`)
  }
  const json = await res.json()
  _cachedToken = json.access_token
  _tokenExp    = Date.now() + (json.expires_in ?? 3600) * 1000 - 60_000
  return _cachedToken
}

// ─── API Call ─────────────────────────────────────────────────────────────────
async function callAPI(
  calc:  CalcDef,
  form:  Record<string, string>,
  token: string,
): Promise<Record<string, unknown>> {
  const makeParams = async (suffix = '') => {
    const dob    = form[`dob${suffix}`] || ''
    const time   = form[`time${suffix}`] || '12:00'
    const place  = form[`place${suffix}`] || ''
    const gender = form[`gender${suffix}`] || 'male'

    if (!dob) throw new Error(`Date of birth is required${suffix ? ' for partner' : ''}.`)

    const [p1, p2, p3] = dob.split(/[-/]/).map(s => s.padStart(2, '0'))
    const isoDate = p1.length === 4 ? `${p1}-${p2}-${p3}` : `${p3}-${p2}-${p1}`
    const isoTime = time.length === 5 ? time : '12:00'

    const { lat, lon } = await geocode(place || 'India')

    const localDate   = new Date(`${isoDate}T${isoTime}:00+05:30`)
    const utcDatetime = localDate.toISOString().replace('.000Z', 'Z')

    const queryString = [
      `ayanamsa=1`,
      `coordinates=${lat},${lon}`,
      `datetime=${utcDatetime}`,
      `la=en`,
      `gender=${gender === 'female' ? 'female' : 'male'}`,
    ].join('&')

    console.log('QUERY:', queryString)
    return queryString
  }

  const headers = { Authorization: `Bearer ${token}` }

  if (calc.key === 'kundli-matching') {
    const dob1    = form['dob']    || ''
    const time1   = form['time']   || '12:00'
    const place1  = form['place']  || ''
    const gender1 = form['gender'] || 'male'

    const dob2    = form['dob2']   || ''
    const time2   = form['time2']  || '12:00'
    const place2  = form['place2'] || ''

    const toUtc = (dob: string, time: string) => {
      const [p1, p2, p3] = dob.split(/[-/]/).map(s => s.padStart(2, '0'))
      const isoDate = p1.length === 4 ? `${p1}-${p2}-${p3}` : `${p3}-${p2}-${p1}`
      const isoTime = time.length === 5 ? time : '12:00'
      return new Date(`${isoDate}T${isoTime}:00+05:30`).toISOString().replace('.000Z', 'Z')
    }

    const [geo1, geo2] = await Promise.all([
      geocode(place1 || 'India'),
      geocode(place2 || 'India'),
    ])

    const boyDob   = gender1 === 'female' ? dob2   : dob1
    const boyTime  = gender1 === 'female' ? time2  : time1
    const boyGeo   = gender1 === 'female' ? geo2   : geo1
    const girlDob  = gender1 === 'female' ? dob1   : dob2
    const girlTime = gender1 === 'female' ? time1  : time2
    const girlGeo  = gender1 === 'female' ? geo1   : geo2

    const params = new URLSearchParams()
    params.set('ayanamsa', '1')
    params.set('boy_dob', toUtc(boyDob, boyTime))
    params.set('boy_coordinates', `${boyGeo.lat},${boyGeo.lon}`)
    params.set('girl_dob', toUtc(girlDob, girlTime))
    params.set('girl_coordinates', `${girlGeo.lat},${girlGeo.lon}`)
    params.set('la', 'en')

    const res  = await fetch(`${PROXY}/v2/astrology/kundli-matching?${params}`, { headers })
    const json = await res.json()
    console.log('KUNDLI RESPONSE:', JSON.stringify(json))
    if (!res.ok) throw new Error(json?.errors?.[0]?.detail ?? 'Kundli matching API error')
    return { primary: json, partner: {} }
  }

  const params = await makeParams()
  const res    = await fetch(`${PROXY}${calc.endpoint}?${params}`, { headers })
  const json   = await res.json()
  if (!res.ok) throw new Error(json?.errors?.[0]?.detail ?? 'Prokerala API error')
  return { primary: json }
}

// ─── Result Renderers ─────────────────────────────────────────────────────────

function InfoCard({ label, value }: { label: string; value?: string | number | null }) {
  if (value == null || value === '') return null
  return (
    <div style={{
      background: T.white, border: `1.5px solid ${T.border}`,
      borderRadius: 12, padding: '14px 18px',
    }}>
      <div style={{ fontSize: 10, color: T.brown, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: T.amberDark, fontFamily: 'Georgia,serif' }}>{value}</div>
    </div>
  )
}

function MoonPhaseResult({ data }: { data: Record<string, unknown> }) {
  const d         = (data.primary as { data?: Record<string, unknown> })?.data ?? {}
  const tithi     = (d.tithi     as { name?: string }[] | undefined)?.[0]?.name
  const nakshatra = (d.nakshatra as { name?: string }[] | undefined)?.[0]?.name
  const yoga      = (d.yoga      as { name?: string }[] | undefined)?.[0]?.name
  const vaara     = d.vaara   as string
  const sunrise   = formatTime(d.sunrise as string)  // ← wrap
  const sunset    = formatTime(d.sunset  as string)  // ← wrap

  return (
    <div className="result-grid">
      <InfoCard label="Tithi"       value={tithi} />
      <InfoCard label="Nakshatra"   value={nakshatra} />
      <InfoCard label="Yoga"        value={yoga} />
      <InfoCard label="Day (Vaara)" value={vaara} />
      <InfoCard label="Sunrise"     value={sunrise} />
      <InfoCard label="Sunset"      value={sunset} />
    </div>
  )
}

function MangalResult({ data }: { data: Record<string, unknown> }) {
  const d         = (data.primary as { data?: Record<string, unknown> })?.data ?? {}
  const hasDosha  = d.has_dosha          as boolean | undefined
  const mangalPos = d.mangal_position    as string  | undefined
  const dosha     = d.dosha_type         as string  | undefined
  const desc      = d.description        as string  | undefined
  const cancels   = d.is_dosha_cancelled as boolean | undefined

  return (
    <div>
      <div style={{
        textAlign: 'center', padding: 'clamp(18px,4vw,24px) clamp(14px,4vw,20px)', borderRadius: 14, marginBottom: 18,
        background: hasDosha && !cancels ? '#fff5f5' : T.successBg,
        border: `2px solid ${hasDosha && !cancels ? T.errorBdr : T.successBdr}`,
      }}>
        <div style={{ fontSize: 'clamp(32px,7vw,40px)' }}>{hasDosha && !cancels ? '⚠️' : '✅'}</div>
        <div style={{ fontSize: 'clamp(16px,3.5vw,20px)', fontWeight: 800, marginTop: 10, fontFamily: 'Georgia,serif',
          color: hasDosha && !cancels ? T.error : T.success }}>
          {hasDosha == null ? 'Unable to determine'
            : hasDosha && !cancels ? 'Mangal Dosha Present'
            : hasDosha && cancels  ? 'Dosha Cancelled'
            : 'No Mangal Dosha'}
        </div>
      </div>
      <div className="result-grid" style={{ marginBottom: 14 }}>
        <InfoCard label="Mars Position" value={mangalPos} />
        <InfoCard label="Dosha Type"    value={dosha} />
      </div>
      {desc && <p style={{ fontSize: 13, color: T.brown, lineHeight: 1.8, fontFamily: 'sans-serif', margin: 0 }}>{desc}</p>}
    </div>
  )
}

function KundliResult({ data }: { data: Record<string, unknown> }) {
  const d         = (data.primary as { data?: Record<string, unknown> })?.data ?? {}
  const gunaMilan = d.guna_milan as Record<string, unknown> | undefined

  const score  = gunaMilan?.total_points   as number | undefined
  const maxPts = gunaMilan?.maximum_points as number | undefined

  const gunas = (
    Array.isArray(gunaMilan?.guna) ? gunaMilan?.guna :
    Array.isArray(d.guna_milan_details) ? d.guna_milan_details :
    null
  ) as { name?: string; received_points?: number; total_points?: number }[] | null

  const pct = score != null && maxPts ? Math.round((score / maxPts) * 100) : null

  return (
    <div>
      {score != null && (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 'clamp(40px,10vw,56px)', fontWeight: 800, fontFamily: 'Georgia,serif', color: T.amber, lineHeight: 1 }}>
            {score}
            <span style={{ fontSize: 'clamp(16px,4vw,22px)', color: T.brown, fontWeight: 400 }}>/{maxPts ?? 36}</span>
          </div>
          <div style={{ fontSize: 12, color: T.brown, marginTop: 4, marginBottom: 12 }}>Guna Milan Score</div>
          <div style={{ height: 8, background: '#f0e0c8', borderRadius: 4, maxWidth: 260, margin: '0 auto' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              background: `linear-gradient(90deg,${T.amber},${T.amberLight})`,
              width: `${pct ?? 0}%`, transition: 'width 1s ease',
            }} />
          </div>
          {pct != null && (
            <div style={{ fontSize: 12, color: T.brown, marginTop: 6 }}>
              {pct >= 75 ? '🌟 Excellent match' : pct >= 50 ? '💛 Good match' : '⚠️ Needs consideration'}
            </div>
          )}
        </div>
      )}
      {gunas && (
        <div className="guna-grid">
          {gunas.map(g => (
            <div key={g.name} style={{
              background: T.white, border: `1.5px solid ${T.border}`,
              borderRadius: 10, padding: '10px 14px',
            }}>
              <div style={{ fontSize: 10, color: T.brown, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{g.name}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.amberDark }}>
                {g.received_points ?? '—'}<span style={{ fontSize: 11, color: T.brown, fontWeight: 400 }}>/{g.total_points}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LagnaResult({ data }: { data: Record<string, unknown> }) {
  const d         = (data.primary as { data?: Record<string, unknown> })?.data ?? {}
  const ascendant = (d.zodiac       as { name?: string })?.name
  const nakshatra = (d.nakshatra    as { name?: string })?.name
  const pada      = (d.nakshatra    as { pada?: number })?.pada
  const rashi     = (d.chandra_rasi as { name?: string })?.name
  const sunSign   = (d.soorya_rasi  as { name?: string })?.name
  const sunrise   = d.sunrise as string
  return (
    <div className="result-grid">
      <InfoCard label="Lagna (Ascendant)" value={ascendant} />
      <InfoCard label="Moon Sign (Rashi)" value={rashi} />
      <InfoCard label="Sun Sign"          value={sunSign} />
      <InfoCard label="Nakshatra"         value={nakshatra} />
      <InfoCard label="Nakshatra Pada"    value={pada != null ? `Pada ${pada}` : undefined} />
      <InfoCard label="Sunrise"           value={sunrise} />
    </div>
  )
}

// Add this helper near the top of the file (or just inside the component)
function formatTime(iso: string | undefined): string | undefined {
  if (!iso) return undefined
  try {
    return new Date(iso).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    })
  } catch {
    return iso
  }
}
function RenderResult({ calcKey, data }: { calcKey: CalcKey; data: Record<string, unknown> }) {
  switch (calcKey) {
    case 'moon-phase':      return <MoonPhaseResult data={data} />
    case 'mangal-dosha':    return <MangalResult    data={data} />
    case 'kundli-matching': return <KundliResult    data={data} />
    case 'lagna':           return <LagnaResult     data={data} />
  }
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const SHARED_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  .cp-input {
    width: 100%; padding: 11px 0 9px;
    border: none; border-bottom: 1.5px solid ${T.border};
    background: transparent; font-size: 14px; color: ${T.amberDark};
    outline: none; font-family: inherit; transition: border-color 0.2s;
    -webkit-appearance: none; appearance: none;
  }
  .cp-input::placeholder { color: ${T.brownLight}; }
  .cp-input:focus { border-bottom-color: ${T.amber}; }

  /* time picker row */
  .cp-time-row {
    display: flex; gap: 6px; align-items: center;
    padding-top: 4px;
  }
  .cp-time-row .cp-input {
    flex: 1; padding: 11px 4px 9px; min-width: 0;
    text-align: center;
  }
  .cp-time-sep {
    font-size: 16px; font-weight: 700; color: ${T.brown};
    flex-shrink: 0; line-height: 1; padding-bottom: 2px;
  }

  .cp-field { position: relative; grid-column: span 1; }
  .cp-field.span-2 { grid-column: span 2; }
  .cp-field::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg, ${T.amber}, ${T.amberLight});
    border-radius: 2px; transition: width 0.28s;
  }
  .cp-field:focus-within::after { width: 100%; }

  .cp-btn {
    width: 100%; padding: 15px;
    background: linear-gradient(105deg, #7a3a05, ${T.amber});
    color: #fff; border: none; border-radius: 12px;
    font-size: 15px; font-weight: 700; cursor: pointer;
    font-family: inherit; letter-spacing: 0.3px;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 22px rgba(196,122,30,0.32);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .cp-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-2px); }
  .cp-btn:active:not(:disabled) { transform: translateY(0); }
  .cp-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px 28px;
  }

  .result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px,1fr));
    gap: 12px;
  }

  .guna-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px,1fr));
    gap: 10px;
  }

  /* ── Listing grid – bigger cards ─── */
  .calc-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .calc-card {
    background: ${T.white};
    border-radius: 18px;
    padding: 28px 32px;
    border: 1.5px solid ${T.border};
    display: flex; align-items: center;
    gap: 20px; justify-content: space-between;
    cursor: pointer;
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.15s;
    min-height: 120px;
  }
  .calc-card:hover {
    box-shadow: 0 8px 32px rgba(196,122,30,0.16);
    border-color: ${T.amber};
    transform: translateY(-3px);
  }

  .calc-icon-wrap {
    width: 64px; height: 64px; border-radius: 50%;
    border: 1.5px solid ${T.border};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; background: ${T.amberPale};
    transition: background 0.2s, border-color 0.2s;
  }
  .calc-card:hover .calc-icon-wrap { background: #ffe8c0; border-color: ${T.amber}; }

  .calc-cta-btn {
    background: transparent; border: 1.5px solid ${T.amber};
    color: ${T.amber}; padding: 10px 22px; border-radius: 22px;
    font-size: 13px; font-weight: 700; cursor: pointer;
    white-space: nowrap; font-family: inherit; flex-shrink: 0;
    transition: background 0.2s, color 0.2s;
  }
  .calc-cta-btn:hover { background: ${T.amber}; color: #fff; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.9s linear infinite; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.4s ease both; }

  .cp-back-btn {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff; border-radius: 8px;
    padding: 6px 14px; cursor: pointer;
    font-size: 12px; font-family: inherit;
    display: inline-flex; align-items: center; gap: 6px;
    margin-bottom: 24px; transition: background 0.2s;
  }

  .cp-hero-title-row { display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }

  /* ── Responsive ─────────────────────────────────────────── */

  @media (max-width: 780px) {
    .calc-grid { grid-template-columns: 1fr !important; }
    .calc-card { min-height: unset; padding: 20px 22px; }
    .calc-cta-btn { width: 100%; margin-top: 6px; }
    .calc-card { flex-wrap: wrap; }
  }

  @media (max-width: 540px) {
    .form-grid { grid-template-columns: 1fr !important; }
    .cp-field.span-2 { grid-column: span 1 !important; }
    .cp-hero-title-row { gap: 12px; }
    .guna-grid { grid-template-columns: repeat(auto-fit, minmax(90px,1fr)); }
    .calc-icon-wrap { width: 52px; height: 52px; }
  }

  @media (max-width: 420px) {
    .calc-icon-wrap { width: 44px; height: 44px; }
    .cp-back-btn { font-size: 11px; padding: 5px 12px; }
  }
`

// ─── Custom 12h Time Picker ───────────────────────────────────────────────────

// After (complete implementation)
function TimePicker({
  fieldKey,
  form,
  setForm,
}: {
  fieldKey: string
  form: Record<string, string>
  setForm: React.Dispatch<React.SetStateAction<Record<string, string>>>
}): React.JSX.Element {
  const hKey    = `${fieldKey}_h`
  const mKey    = `${fieldKey}_m`
  const ampmKey = `${fieldKey}_ampm`

  const hours   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  const commit = (h: string, m: string, ampm: string) => {
    if (!h || !m || !ampm) return
    const h24 = ampm === 'PM'
      ? (h === '12' ? 12 : +h + 12)
      : (h === '12' ? 0  : +h)
    setForm(p => ({ ...p, [fieldKey]: `${String(h24).padStart(2, '0')}:${m}` }))
  }

  return (
    <div className="cp-time-row">
      <select
        className="cp-input"
        value={form[hKey] ?? ''}
        style={{ color: form[hKey] ? T.amberDark : T.brownLight }}
        onChange={e => {
          const h = e.target.value
          setForm(p => ({ ...p, [hKey]: h }))
          commit(h, form[mKey] ?? '', form[ampmKey] ?? '')
        }}
      >
        <option value="" disabled>HH</option>
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>

      <span className="cp-time-sep">:</span>

      <select
        className="cp-input"
        value={form[mKey] ?? ''}
        style={{ color: form[mKey] ? T.amberDark : T.brownLight }}
        onChange={e => {
          const m = e.target.value
          setForm(p => ({ ...p, [mKey]: m }))
          commit(form[hKey] ?? '', m, form[ampmKey] ?? '')
        }}
      >
        <option value="" disabled>MM</option>
        {minutes.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <select
        className="cp-input"
        value={form[ampmKey] ?? ''}
        style={{ color: form[ampmKey] ? T.amberDark : T.brownLight, flex: '0 0 auto', width: 'auto', minWidth: 62 }}
        onChange={e => {
          const ampm = e.target.value
          setForm(p => ({ ...p, [ampmKey]: ampm }))
          commit(form[hKey] ?? '', form[mKey] ?? '', ampm)
        }}
      >
        <option value="" disabled>AM/PM</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATOR LISTING PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Calculators() {
  const navigate = useNavigate()

  return (
    <section style={{ padding: 'clamp(40px,8vw,80px) clamp(16px,8%,80px)', background: T.cream }}>
      <style>{SHARED_CSS}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,6vw,56px)' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: T.amberPale, border: `1px solid ${T.border}`,
          borderRadius: 20, padding: '5px 14px', marginBottom: 16,
          fontSize: 12, fontWeight: 600, color: T.amber, fontFamily: 'sans-serif',
        }}>
          <Sparkles size={12} /> Free Vedic Tools
        </div>
        <h2 style={{
          margin: '0 0 14px', fontSize: 'clamp(28px,4vw,42px)',
          fontWeight: 800, fontFamily: 'Georgia,serif', color: T.amberDark,
        }}>
          Free <span style={{ color: T.amber }}>Calculators</span>
        </h2>
        <p style={{
          color: T.brown, fontFamily: 'sans-serif',
          fontSize: 'clamp(14px,2vw,16px)', maxWidth: 480, margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Understand your life better with our free Vedic astrology tools
        </p>
      </div>

      {/* Grid */}
      <div className="calc-grid" style={{ maxWidth: 1140, margin: '0 auto' }}>
        {CALC_LIST.map(calc => {
          const Icon = calc.icon
          return (
            <div
              key={calc.key}
              className="calc-card"
              onClick={() => navigate(`/calculators/${calc.key}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/calculators/${calc.key}`)}
            >
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', flex: 1, minWidth: 0 }}>
                <div className="calc-icon-wrap">
                  <Icon size={28} color={calc.accentColor} strokeWidth={1.5} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: T.amberDark, marginBottom: 6, fontFamily: 'Georgia,serif' }}>
                    {calc.title}
                  </div>
                  <div style={{ fontSize: 13, color: T.brown, lineHeight: 1.7, fontFamily: 'sans-serif' }}>
                    {calc.subtitle}
                  </div>
                </div>
              </div>
              <button className="calc-cta-btn" tabIndex={-1}>
                Calculate →
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC CALCULATOR DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export function CalculatorPage() {
  const { type }  = useParams<{ type: string }>()
  const navigate  = useNavigate()
  const calc      = CALCS[type as CalcKey]

  const [form,    setForm]    = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [result,  setResult]  = useState<Record<string, unknown> | null>(null)
  const resultRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  if (!calc) {
    return (
      <div style={{ textAlign: 'center', padding: 'clamp(48px,12vw,80px) 20px', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔭</div>
        <h2 style={{ color: T.amberDark, fontFamily: 'Georgia,serif' }}>Calculator not found</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 16, padding: '10px 28px',
            background: T.amber, color: '#fff',
            border: 'none', borderRadius: 10, cursor: 'pointer',
            fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
          }}
        >
          Go Back
        </button>
      </div>
    )
  }

  const Icon   = calc.icon
  const accent = calc.accentColor
  const set    = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async () => {
    const missing = calc.fields.filter(f => (f === 'name' || f === 'dob') && !form[f]?.trim())
    if (calc.fields2) {
      const missing2 = calc.fields2.filter(f => (f === 'name2' || f === 'dob2') && !form[f]?.trim())
      if (missing2.length) {
        setError("Please fill in at least your Partner's Name and Date of Birth.")
        return
      }
    }
    if (missing.length) {
      setError('Please fill in at least your Name and Date of Birth.')
      return
    }
    setLoading(true); setError(''); setResult(null)
    try {
      const token = await getToken()
      const data  = await callAPI(calc, form, token)
      setResult(data)
    } catch (e: unknown) {
      setError((e as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderFieldGroup = (fields: FieldKey[], accentCol = T.amber) =>
    fields.map(fk => {
      const meta  = FIELDS[fk]
      const MIcon = meta.icon
      const wide  = fk === 'place' || fk === 'place2'
      const isTime = meta.type === 'time'

      return (
        <div key={fk} className={`cp-field${wide ? ' span-2' : ''}`}>
          <label style={{
            fontSize: 10, color: T.brown, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.07em',
            display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5,
          }}>
            <MIcon size={11} color={accentCol} /> {meta.label}
          </label>

          {/* ── Custom 12h time picker ── */}
          {isTime ? (
            <TimePicker
  fieldKey={fk}
  form={form}
  setForm={setForm}
/>
          ) : meta.type === 'select' ? (
            <select
              className="cp-input"
              value={form[fk] ?? ''}
              onChange={set(fk)}
              style={{ color: form[fk] ? T.amberDark : T.brownLight }}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <input
              className="cp-input"
              type={meta.type}
              placeholder={meta.placeholder}
              value={form[fk] ?? ''}
              onChange={set(fk)}
            />
          )}
        </div>
      )
    })

  return (
    <div style={{ minHeight: '100vh', background: T.cream, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <style>{SHARED_CSS}</style>

      {/* ── Hero Banner ── */}
      <div style={{
        background: `linear-gradient(130deg, #6a2e04 0%, ${accent} 100%)`,
        padding: 'clamp(24px,5vw,52px) clamp(16px,8%,80px)',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: 'clamp(-40px,-10vw,-60px)', top: -60,
          width: 'clamp(160px,40vw,280px)', height: 'clamp(160px,40vw,280px)', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: -20, top: -20,
          width: 'clamp(100px,25vw,180px)', height: 'clamp(100px,25vw,180px)', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none',
        }} />

        <button className="cp-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={13} /> Back to Calculators
        </button>

        <div className="cp-hero-title-row">
          <div style={{
            width: 'clamp(42px,10vw,54px)', height: 'clamp(42px,10vw,54px)', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={26} color="#fff" strokeWidth={1.5} />
          </div>
          <h1 style={{
            margin: 0, fontSize: 'clamp(19px,4vw,32px)',
            fontWeight: 800, fontFamily: 'Georgia,serif',
            textShadow: '0 2px 12px rgba(0,0,0,0.18)', lineHeight: 1.25,
          }}>
            {calc.title}
          </h1>
        </div>
        <p style={{
          margin: 0, opacity: 0.85,
          fontSize: 'clamp(13px,1.8vw,15px)',
          maxWidth: 500, lineHeight: 1.75, fontFamily: 'sans-serif',
        }}>
          {calc.subtitle}
        </p>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(20px,4vw,48px) clamp(14px,4%,32px)' }}>

        {/* Form card */}
        <div style={{
          background: T.white, borderRadius: 18,
          padding: 'clamp(18px,4vw,36px)',
          border: `1px solid ${T.border}`,
          boxShadow: '0 4px 28px rgba(196,122,30,0.07)',
          marginBottom: 24,
        }}>

          {calc.key === 'kundli-matching' && (
            <div style={{
              fontSize: 13, color: T.brown, fontFamily: 'sans-serif',
              marginBottom: 24, padding: '10px 14px',
              background: T.amberPale, border: `1px solid ${T.border}`, borderRadius: 8,
            }}>
              ✦ Fill your details first, then your partner's details below.
            </div>
          )}

          {calc.fields2 && (
            <div style={{
              fontSize: 11, fontWeight: 700, color: T.amber,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <User size={12} color={T.amber} /> Your Details
            </div>
          )}

          <div className="form-grid" style={{ marginBottom: calc.fields2 ? 32 : 0 }}>
            {renderFieldGroup(calc.fields, accent)}
          </div>

          {calc.fields2 && (
            <>
              <div style={{ height: 1, background: T.border, margin: '4px 0 28px' }} />
              <div style={{
                fontSize: 11, fontWeight: 700, color: T.rose,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Heart size={12} color={T.rose} /> Partner's Details
              </div>
              <div className="form-grid">
                {renderFieldGroup(calc.fields2, T.rose)}
              </div>
            </>
          )}

          {error && (
            <div style={{
              marginTop: 18, padding: '10px 14px',
              background: T.errorBg, border: `1px solid ${T.errorBdr}`,
              borderRadius: 8, fontSize: 13, color: T.error, fontFamily: 'sans-serif',
            }}>
              ❌ {error}
            </div>
          )}

          <button className="cp-btn" style={{ marginTop: 28 }} onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><Loader2 size={17} className="spin" /> Calculating…</>
              : <><ChevronRight size={17} /> Calculate {calc.short}</>
            }
          </button>
        </div>

        {/* Result card */}
        {result && (
          <div
            ref={resultRef}
            className="fade-up"
            style={{
              background: T.white, borderRadius: 18,
              padding: 'clamp(18px,4vw,32px)',
              border: `1.5px solid ${accent}55`,
              boxShadow: `0 4px 28px ${accent}22`,
            }}
          >
            <h3 style={{
              margin: '0 0 20px', fontFamily: 'Georgia,serif',
              color: T.amberDark, fontSize: 'clamp(17px,3vw,20px)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon size={18} color={accent} /> Your Results
            </h3>

            <RenderResult calcKey={calc.key} data={result} />

            <p style={{
              marginTop: 20, fontSize: 12, color: T.brown, lineHeight: 1.7,
              fontFamily: 'sans-serif',
              borderTop: `1px solid ${T.border}`, paddingTop: 16,
            }}>
              ✦ These results are for guidance only. For a detailed personal reading, consider booking a consultation with Astro Aaditya Narayan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}