const calcs = [
  { icon: '🌙', name: 'Moon Phase Calculator', desc: 'Understand your emotional nature, instincts, and how you truly respond to life situations.' },
  { icon: '☀️', name: 'Mangal Dosha Calculator', desc: 'Discover your core personality, identity, and the deeper forces that influence your everyday actions.' },
  { icon: '⭕', name: 'Kundli Matching', desc: 'Decode your life path, destiny, and hidden patterns through the power of numbers.' },
  { icon: '✚', name: 'Lagna Calculator', desc: 'Check marriage compatibility with detailed Guna Milan and deeper relationship insights.' },
]

export default function Calculators() {
  return (
    <section style={{ padding: '72px 8%', background: '#fdf6ed' }}>
      <h2 style={{ textAlign: 'center', fontSize: 34, fontWeight: 700, margin: '0 0 10px', fontFamily: 'Georgia, serif' }}>
        Free <span style={{ color: '#c47a1e' }}>Calculators</span>
      </h2>
      <p style={{ textAlign: 'center', color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 44, fontSize: 15 }}>
        Understand your life better with our free Vedic astrology tools
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
        {calcs.map(c => (
          <div key={c.name} style={{ background: '#fff', borderRadius: 14, padding: '20px 22px', border: '1.5px solid #e8d5b7', display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #e8d5b7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#4a2006', marginBottom: 4, fontFamily: 'Georgia, serif' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#9a7050', lineHeight: 1.5, fontFamily: 'sans-serif' }}>{c.desc}</div>
              </div>
            </div>
            <button style={{ background: 'transparent', border: '1.5px solid #c47a1e', color: '#c47a1e', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'sans-serif', flexShrink: 0 }}>Calculate for Free →</button>
          </div>
        ))}
      </div>
    </section>
  )
}