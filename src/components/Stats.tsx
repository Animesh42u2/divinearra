const stats = [
  { num: '52M+', label: 'Monthly Views' },
  { num: '5.9M+', label: 'Social Followers' },
  { num: '8Lakh+', label: 'Reports Delivered' },
  { num: '53+', label: 'Years of Legacy' },
]

export default function Stats() {
  return (
    <section style={{ padding: '64px 8%', background: '#fff9f2', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 40px', fontFamily: 'Georgia, serif' }}>
        A Journey Built on <span style={{ color: '#c47a1e' }}>Trust & Proven Results</span>
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 800, color: '#4a2006', fontFamily: 'Georgia, serif' }}>{s.num}</div>
            <div style={{ fontSize: 11, color: '#9a7050', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'sans-serif', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}