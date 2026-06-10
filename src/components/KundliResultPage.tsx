import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function KundliResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'details' | 'panchang'>('details')

  if (!state?.result) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p>No kundli data found.</p>
        <button onClick={() => navigate('/')}>← Go Back</button>
      </div>
    )
  }

  const { result, userInfo } = state

  const tabStyle = (active: boolean) => ({
    padding: '10px 28px',
    borderRadius: 30,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    background: active ? '#c47a1e' : 'transparent',
    color: active ? '#fff' : '#7a5a3a',
  })

  // ✅ Safe extractor — handles string, object with .name, or null
  const str = (val: unknown): string | undefined => {
    if (!val && val !== false && val !== 0) return undefined
    if (typeof val === 'string') return val
    if (typeof val === 'boolean') return val ? 'Yes' : 'No'
    if (typeof val === 'number') return String(val)
    if (typeof val === 'object' && val !== null && 'name' in val) return String((val as Record<string, unknown>).name)
    return undefined
  }

  return (
    <div style={{ background: '#fdf6ed', minHeight: '100vh', padding: '40px 5%' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 8, justifyContent: 'center',
        background: '#4a2006', borderRadius: 40, padding: 6,
        maxWidth: 400, margin: '0 auto 32px',
      }}>
        <button style={tabStyle(tab === 'details')} onClick={() => setTab('details')}>Details</button>
        <button style={tabStyle(tab === 'panchang')} onClick={() => setTab('panchang')}>Panchang</button>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', maxWidth: 900, margin: '0 auto' }}>
        {tab === 'details' && (
          <Card title="Birth Details">
            <Row label="Name"             value={str(userInfo?.name)} />
            <Row label="Gender"           value={str(userInfo?.gender)} />
            <Row label="Birth Place"      value={str(userInfo?.place)} />
            <Row label="Date"             value={str(userInfo?.dob)} />
            <Row label="Time"             value={str(userInfo?.time)} />
            <hr style={{ border: 'none', borderTop: '1px solid #e8d5b7', margin: '12px 0' }} />
            <Row label="Rashi (Moon Sign)"  value={str(result.rashi)}      highlight />
            <Row label="Nakshatra"          value={str(result.nakshatra)}  highlight />
            <Row label="Nakshatra Pada"     value={str(result.nakshatraPada)} highlight />
            <Row label="Ascendant (Lagna)"  value={str(result.ascendant)}  highlight />
            <Row label="Sun Sign"           value={str(result.sunSign)}    highlight />
          </Card>
        )}

        {tab === 'panchang' && (
  <Card title="Panchang">
    <Row label="Vara (Day)"   value={str(result.vara)}         highlight />
    <Row label="Tithi"        value={str(result.tithi)}        highlight />
    <Row label="Paksha"       value={str(result.tithiPaksha)}  />
    <Row label="Yoga"         value={str(result.yoga)}         highlight />
    <Row label="Karana"       value={str(result.karana)}       highlight />
    <Row label="Nakshatra"    value={str(result.nakshatra2)}   />
    <Row label="Mangal Dosha" value={
      result.mangalDosha === true  ? '⚠️ Yes — Manglik' :
      result.mangalDosha === false ? '✓ No — Not Manglik' :
      str(result.mangalDosha)
    } highlight />
    {result.mangalDoshaDesc && (
      <Row label="" value={str(result.mangalDoshaDesc)} />
    )}
  </Card>
)}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#c47a1e', color: '#fff', border: 'none',
            padding: '12px 32px', borderRadius: 10,
            cursor: 'pointer', fontWeight: 600,
          }}>
          ← Calculate Again
        </button>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '20px 24px',
      flex: 1, minWidth: 280, boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      <h3 style={{ color: '#4a2006', fontFamily: 'Georgia, serif', margin: '0 0 16px', fontSize: 18 }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0e4d0' }}>
      <span style={{ color: '#7a5a3a', fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: highlight ? 700 : 500, color: highlight ? '#c47a1e' : '#4a2006', fontSize: 14 }}>
        {value}
      </span>
    </div>
  )
}