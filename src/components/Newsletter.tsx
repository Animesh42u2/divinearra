import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  return (
    <section style={{ background: '#8b0000', color: '#fff', padding: '56px 8%', textAlign: 'center' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 10px', fontFamily: 'Georgia, serif' }}>Subscribe to Newsletter</h2>
      <p style={{ opacity: 0.75, marginBottom: 28, fontFamily: 'sans-serif', fontSize: 14 }}>Subscribe to receive personalized astrological insights and predictions directly in your inbox.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 420, margin: '0 auto' }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
          style={{ flex: 1, padding: '13px 18px', borderRadius: '25px 0 0 25px', border: 'none', fontSize: 14, fontFamily: 'sans-serif', outline: 'none', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        <button style={{ background: '#c47a1e', color: '#fff', border: 'none', padding: '13px 22px', borderRadius: '0 25px 25px 0', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>→</button>
      </div>
    </section>
  )
}