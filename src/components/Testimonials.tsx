import { useState } from 'react'

const reviews = [
  { text: 'Our collaboration with Divine Arra was smooth, professional, and highly impactful. His insights are accurate and delivered in a way that truly resonates with people. We saw a noticeable increase in audience trust and interaction.', name: 'Priya Sharma', role: 'Marketing Director, Wellness Brand' },
  { text: 'The consultation changed my perspective completely. I was able to make confident career decisions after understanding my birth chart. Highly recommend!', name: 'Rahul Mehta', role: 'Entrepreneur, Mumbai' },
  { text: 'Incredibly accurate and insightful reading. The remedies suggested actually worked within weeks. Divine Arra is truly gifted.', name: 'Sunita Verma', role: 'Teacher, Delhi' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const r = reviews[current]

  return (
    <section style={{ padding: '72px 8%', background: '#fff', textAlign: 'center' }}>
      <p style={{ fontSize: 12, letterSpacing: 3, color: '#c47a1e', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 10 }}>Testimonials</p>
      <h2 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
        What <span style={{ color: '#c47a1e' }}>Our Partners</span> Say About Us
      </h2>
      <p style={{ color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 44, fontSize: 14 }}>Real feedback from partners who have collaborated with Divine Arra</p>

      <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff9f2', borderRadius: 20, padding: '44px 40px', border: '1px solid #f0dfc0' }}>
        <div style={{ fontSize: 32, color: '#c47a1e', marginBottom: 20 }}>💬</div>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#4a2006', fontStyle: 'italic', fontFamily: 'Georgia, serif', marginBottom: 32 }}>"{r.text}"</p>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e8d5b7', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👤</div>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#4a2006', fontFamily: 'sans-serif' }}>{r.name}</div>
        <div style={{ fontSize: 13, color: '#c47a1e', fontFamily: 'sans-serif', marginTop: 4 }}>{r.role}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {reviews.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? '#c47a1e' : '#e8d5b7', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </section>
  )
}