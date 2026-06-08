import { useState } from 'react'

const tabs = ['Consultations', 'Reports', 'Kundli', 'Online Puja']

const consultations = [
  { tag: '1-on-1', icon: '💬', title: 'Personalized Consultation', desc: 'Get personalized guidance directly from the leading expert for clear life decisions.' },
  { tag: 'Expert', icon: '💼', title: 'Career Astrology Consultation', desc: 'Get expert guidance for your career growth and professional success.' },
  { tag: 'Couple', icon: '💑', title: 'Couple Consultation', desc: 'Understand your relationship dynamics and get clarity for your future together.' },
  { tag: 'Special', icon: '💎', title: 'Gemstone & Rudraksha', desc: 'Get the right gemstone recommendations based on your birth chart analysis.' },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState('Consultations')

  return (
    <section style={{ padding: '72px 8%', background: '#fdf6ed' }}>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 8 }}>What We Offer</p>
      <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, margin: '0 0 10px', fontFamily: 'Georgia, serif' }}>
        Our <span style={{ color: '#c47a1e' }}>Services</span>
      </h2>
      <p style={{ textAlign: 'center', color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 32, fontSize: 15 }}>
        Choose the service that fits your needs and start your journey toward clarity
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '9px 22px', borderRadius: 25, border: '1.5px solid #e0c090',
            background: activeTab === tab ? '#c47a1e' : 'transparent',
            color: activeTab === tab ? '#fff' : '#7a3e0a',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'sans-serif',
            transition: 'all 0.2s'
          }}>{tab}</button>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
        {consultations.map(s => (
          <div key={s.title} style={{ background: '#fff5e6', borderRadius: 16, padding: '28px 22px', border: '1.5px solid #e8d5b7', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 14, right: 14, fontSize: 11, color: '#9a7050', fontFamily: 'sans-serif', background: '#fff', padding: '2px 10px', borderRadius: 10, border: '1px solid #e8d5b7' }}>{s.tag}</span>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16, border: '1.5px solid #e8d5b7' }}>{s.icon}</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 10px', color: '#4a2006', fontFamily: 'Georgia, serif' }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: '#9a7050', lineHeight: 1.6, fontFamily: 'sans-serif', marginBottom: 18 }}>{s.desc}</p>
            <button style={{ width: '100%', background: 'transparent', border: '1.5px solid #4a2006', color: '#4a2006', padding: '10px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'sans-serif', fontSize: 13 }}>Book Now</button>
          </div>
        ))}
      </div>
    </section>
  )
}