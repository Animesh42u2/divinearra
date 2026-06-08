const features = [
  { icon: '✦', title: 'Vedic Birth Chart Analysis', desc: 'Understand your birth chart, life patterns, and future possibilities.' },
  { icon: '💼', title: 'Career & Business Guidance', desc: 'Get clear direction for career growth and business decisions.' },
  { icon: '♡', title: 'Relationship & Marriage', desc: 'Understand compatibility, challenges, and the right timing.' },
  { icon: '🔥', title: 'Remedies & Solution', desc: 'Get practical remedies to balance planetary influences.' },
]

export default function OneCall() {
  return (
    <section style={{ padding: '72px 8%', background: '#fff9f2', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 700, margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
        One Call Can <span style={{ color: '#c47a1e' }}>Change Everything</span>
      </h2>
      <p style={{ color: '#9a7050', fontSize: 15, maxWidth: 560, margin: '0 auto 48px', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
        Connect directly with Acharya for a personal consultation that clears confusion, reveals the right direction, and helps you move forward with confidence.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 44 }}>
        {features.map(f => (
          <div key={f.title} style={{ maxWidth: 180, textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', border: '1.5px solid #e8d5b7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 14px', boxShadow: '0 2px 12px rgba(196,122,30,0.1)' }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#4a2006', marginBottom: 6, fontFamily: 'sans-serif' }}>{f.title}</div>
            <div style={{ fontSize: 12.5, color: '#9a7050', lineHeight: 1.5, fontFamily: 'sans-serif' }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <button style={{ background: '#c47a1e', color: '#fff', border: 'none', padding: '14px 36px', borderRadius: 30, fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(196,122,30,0.35)' }}>
        Schedule Your Call
      </button>
    </section>
  )
}