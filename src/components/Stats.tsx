import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 100, suffix: 'K+', label: 'Consultations\nDelivered',   duration: 2000 },
  { target: 7,   suffix: '+',  label: 'Years of\nExperience',       duration: 1400 },
  { target: 59,  suffix: '+',  label: 'Years of\nLegacy',           duration: 1600 },
  { target: 8,   suffix: '+',  label: 'Professional\nAwards',       duration: 1200 },
  { target: 30,  suffix: 'K+', label: 'Hours of Expert\nGuidance',  duration: 1800 },
]

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function useCountUp(target: number, duration: number, triggered: boolean, delay: number) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return
    const timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setValue(Math.floor(easeOutQuart(t) * target))
        if (t < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, triggered, delay])

  return value
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 48px; opacity: 1; }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes accentPulse {
    0%, 100% { opacity: 0.4; transform: scaleX(0.6); }
    50%       { opacity: 1;   transform: scaleX(1); }
  }
  @keyframes glowBreath {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.38; }
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Light ghee — pale golden-yellow, warm cream */
  .st-section {
  background: linear-gradient(120deg, #f5ede0, #c8790a, #f5ede0, #d4920f, #f5ede0, #c8790a);
  background-size: 300% 300%;
  animation: gradientShift 8s ease infinite;
}

  .st-eyebrow {
    opacity: 0;
    animation: fadeUp 0.7s ease forwards 0.2s;
  }
  .st-heading {
    opacity: 0;
    animation: fadeUp 0.7s ease forwards 0.35s;
  }
  .st-rule {
    width: 0;
    animation: lineGrow 0.6s ease forwards 0.8s;
  }

  .st-orb-1 { animation: orbFloat 7s ease-in-out infinite; }
  .st-orb-2 { animation: orbFloat 9s ease-in-out infinite reverse; }
  .st-orb-3 { animation: orbFloat 6s ease-in-out infinite 2s; }

  .st-card-visible {
    animation: cardReveal 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  .st-card-glow {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(255,255,200,0.6) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(18px);
    animation: glowBreath 4s ease-in-out infinite;
  }

  .st-accent-bar {
    height: 2px;
    background: rgba(140, 85, 0, 0.4);
    border-radius: 2px;
    margin: 18px auto 0;
    width: 28px;
    transform-origin: center;
    animation: accentPulse 3s ease-in-out infinite;
  }

  @media (max-width: 600px) {
    .st-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .st-divider { display: none !important; }
  }
`

function StatCard({
  target, suffix, label, duration, triggered, index,
}: {
  target: number; suffix: string; label: string
  duration: number; triggered: boolean; index: number
}) {
  const delay = index * 110
  const value = useCountUp(target, duration, triggered, delay + 200)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!triggered) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [triggered, delay])

  const lines = label.split('\n')
  const glowDelay = `${index * 0.6}s`
  const barDelay  = `${index * 0.4}s`

  return (
    <div
      className={`st-card${visible ? ' st-card-visible' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px 20px 36px',
        position: 'relative',
        cursor: 'default',
        opacity: visible ? undefined : 0,
        overflow: 'hidden',
      }}
    >
      <div className="st-card-glow" style={{ animationDelay: glowDelay }} />

      {index > 0 && (
        <div
          className="st-divider"
          style={{
            position: 'absolute',
            left: 0, top: '15%', height: '70%',
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(140,85,0,0.2), transparent)',
          }}
        />
      )}

      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(40px, 5.5vw, 58px)',
          fontWeight: 800,
          color: hovered ? '#3d1f00' : '#7a4a00',
          lineHeight: 1,
          letterSpacing: '-2px',
          display: 'block',
          position: 'relative',
          transition: 'color 0.3s ease',
        }}
      >
        {value}{suffix}
      </span>

      <div style={{
        fontSize: 10.5,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: hovered ? '#4a2800' : 'rgba(110, 65, 0, 0.7)',
        lineHeight: 1.65,
        marginTop: 10,
        transition: 'color 0.3s ease',
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}>
        {lines.map((line, i) => (
          <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
        ))}
      </div>

      <div className="st-accent-bar" style={{ animationDelay: barDelay }} />
    </div>
  )
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="st-section"
      style={{
        padding: 'clamp(56px, 8vw, 80px) clamp(16px, 5%, 40px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{globalStyles}</style>

      {[
        { cls: 'st-orb-1', w: 320, h: 320, bg: 'rgba(255,245,150,0.35)', top: -80,   left: -60 },
        { cls: 'st-orb-2', w: 260, h: 260, bg: 'rgba(210,150,20,0.20)',  bottom: -60, right: -40 },
        { cls: 'st-orb-3', w: 180, h: 180, bg: 'rgba(255,255,180,0.25)', top: '40%', left: '55%' },
      ].map(({ cls, w, h, bg, ...pos }) => (
        <div
          key={cls}
          className={cls}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: w, height: h,
            background: bg,
            filter: 'blur(60px)',
            pointerEvents: 'none',
            ...pos,
          }}
        />
      ))}

      <p
        className="st-eyebrow"
        style={{
          fontSize: 11,
          letterSpacing: '0.28em',
          color: 'rgba(100, 58, 0, 0.75)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: 14,
          position: 'relative',
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        Our Impact
      </p>

      <h2
        className="st-heading"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(24px, 3.5vw, 36px)',
          fontWeight: 800,
          color: '#5a3200',
          margin: '0 0 10px',
          letterSpacing: '-0.5px',
          position: 'relative',
        }}
      >
        Trusted By{' '}
        <em style={{ fontStyle: 'italic', color: '#3d1f00' }}>Thousands</em>
      </h2>

      <div
        className="st-rule"
        style={{
          height: 2,
          background: 'rgba(120, 70, 0, 0.3)',
          margin: '0 auto 56px',
          borderRadius: 2,
          position: 'relative',
        }}
      />

      <div
        className="st-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          maxWidth: 980,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} triggered={triggered} index={i} />
        ))}
      </div>
    </section>
  )
}