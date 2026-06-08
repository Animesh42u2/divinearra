import { useState } from 'react'

export default function Hero() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', time: '', place: '', gender: '' })

  return (
    <>
      {/* Ticker */}
      <div style={{ background: '#7a3e0a', color: '#fff', padding: '10px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 60, animation: 'ticker 20s linear infinite', whiteSpace: 'nowrap', fontFamily: 'sans-serif', fontSize: 13 }}>
          {Array(4).fill('Get Consultancy from India\'s best Astrologer.').map((t, i) => <span key={i}>{t} &nbsp;&nbsp;&nbsp; ✦ &nbsp;&nbsp;&nbsp;</span>)}
          <button style={{ background: '#c47a1e', color: '#fff', border: 'none', padding: '4px 16px', borderRadius: 20, cursor: 'pointer', fontWeight: 700, fontSize: 12, marginRight: 40 }}>Consult Now</button>
        </div>
      </div>

      {/* Hero Slider */}
      <section style={{
        background: 'linear-gradient(135deg, #c47a1e 0%, #b8691a 100%)',
        color: '#fff', padding: '80px 8%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 40, flexWrap: 'wrap', minHeight: 420, position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circle */}
        <div style={{ position: 'absolute', left: '38%', top: '50%', transform: 'translate(-50%,-50%)', width: 340, height: 340, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '38%', top: '50%', transform: 'translate(-50%,-50%)', width: 240, height: 240, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 520, flex: 1, zIndex: 1 }}>
          <span style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontFamily: 'sans-serif', marginBottom: 20, display: 'inline-block' }}>✦ Who we are</span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, lineHeight: 1.18, margin: '14px 0 18px', fontFamily: 'Georgia, serif' }}>
            Understand Your Life's Complete Blueprint & Make the Right Decisions at the Right Time
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, marginBottom: 32, fontFamily: 'sans-serif', lineHeight: 1.6 }}>
            Understand your favorable periods and avoid setbacks with Personalized Life Journey Report.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button style={{ background: '#c47a1e', color: '#fff', border: '2px solid #fff', padding: '13px 30px', borderRadius: 30, fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'sans-serif' }}>Fix My Luck</button>
            <button style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', padding: '13px 28px', borderRadius: 30, fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'sans-serif' }}>Book a Consultation</button>
          </div>
        </div>

        {/* Report Card */}
        <div style={{ background: '#1a2a4a', borderRadius: 16, overflow: 'hidden', width: 200, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', zIndex: 1, flexShrink: 0 }}>
          <div style={{ background: '#1a2a4a', padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#aaa', letterSpacing: 1, marginBottom: 6, fontFamily: 'sans-serif' }}>⭐ DIVINE ARRA</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'Georgia, serif', marginBottom: 4 }}>Life Journey Report</div>
            <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'sans-serif', marginBottom: 12 }}>Powered by</div>
            <div style={{ color: '#c47a1e', fontWeight: 800, fontSize: 16, letterSpacing: 2, fontFamily: 'sans-serif' }}>ASTROLOGY</div>
          </div>
          <div style={{ background: '#243550', padding: 12, textAlign: 'center', fontSize: 40 }}>🧙‍♂️</div>
        </div>

        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* Category Icons */}
      <section style={{ background: '#fff8ee', padding: '36px 8%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[
            { icon: '📋', label: 'Explore Reports' },
            { icon: '⭐', label: 'Life Changing Astro' },
            { icon: '🔥', label: 'Powerful Poojas' },
            { icon: '🌙', label: 'Ask Bandhu' },
            { icon: '🎓', label: 'Astro Gurukull' },
          ].map(c => (
            <div key={c.label} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: 72, height: 72, background: '#fff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 2px 12px rgba(196,122,30,0.12)', margin: '0 auto 10px', border: '1px solid #f0dfc0' }}>{c.icon}</div>
              <div style={{ fontSize: 13, color: '#5a3010', fontFamily: 'sans-serif', fontWeight: 500 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}