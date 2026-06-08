import { useState } from 'react'

export default function KundliSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', time: '', place: '', gender: '' })

  return (
    <section style={{
      background: 'linear-gradient(135deg, #c47a1e 0%, #b8691a 100%)',
      padding: '72px 8%', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden'
    }}>
      {/* Zodiac wheel decoration */}
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', fontSize: 320, opacity: 0.07, pointerEvents: 'none', lineHeight: 1 }}>♈</div>

      <div style={{ maxWidth: 400, flex: 1, color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, fontFamily: 'Georgia, serif', margin: '0 0 16px' }}>
          Get Your <span style={{ textDecoration: 'underline' }}>Free Kundli</span>
        </h2>
        <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, fontFamily: 'sans-serif' }}>
          Ancient wisdom decoded for modern times. Get clear insights into your life, career, relationships, and future with your personalized kundli report.
        </p>
      </div>

      <div style={{ background: '#fdf6ed', borderRadius: 20, padding: '32px 28px', minWidth: 300, maxWidth: 500, flex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <h3 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 22, margin: '0 0 24px', color: '#4a2006' }}>Kundli Calculator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[['Name:', 'name', 'text', 'Enter your full name'], ['Phone:', 'phone', 'tel', 'Enter your phone number'], ['Email:', 'email', 'email', 'Enter your email'], ['Date of Birth:', 'dob', 'date', ''], ['Time of Birth:', 'time', 'time', ''], ['Birth Place:', 'place', 'text', 'Enter your city or birth place']].map(([label, key, type, ph]) => (
            <div key={key as string} style={{ gridColumn: key === 'place' ? 'span 2' : 'span 1' }}>
              <label style={{ fontSize: 12, color: '#7a5a3a', fontFamily: 'sans-serif', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type={type as string} placeholder={ph as string} value={form[key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [key as string]: e.target.value }))}
                style={{ width: '100%', padding: '9px 0', borderBottom: '1.5px solid #c47a1e', border: 'none', borderBottom: '1.5px solid #ddc090', background: 'transparent', fontSize: 14, fontFamily: 'sans-serif', outline: 'none', color: '#4a2006', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: 12, color: '#7a5a3a', fontFamily: 'sans-serif', display: 'block', marginBottom: 4 }}>Gender:</label>
            <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}
              style={{ width: '100%', padding: '9px 0', borderBottom: '1.5px solid #ddc090', border: 'none', background: 'transparent', fontSize: 14, fontFamily: 'sans-serif', outline: 'none', color: form.gender ? '#4a2006' : '#aaa' }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button style={{ width: '100%', background: 'linear-gradient(90deg, #c47a1e, #e8a135)', color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 24, fontFamily: 'sans-serif' }}>
          Get My Kundli
        </button>
      </div>
    </section>
  )
}