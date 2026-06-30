import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 100, suffix: 'K+', label: 'Consultations\nDelivered',   duration: 2000 },
  { target: 7,   suffix: '+',  label: 'Years of\nExperience',       duration: 1400 },
  { target: 59,  suffix: '+',  label: 'Years of\nLegacy',           duration: 1600 },
  { target: 8,   suffix: '+',  label: 'Professional\nAwards',       duration: 1200 },
  { target: 30,  suffix: 'K+', label: 'Hours of Expert\nGuidance',  duration: 1800 },
]

// ── Floating astro symbols ──────────────────────────────────────────────────
const astroSymbols = [
  { sym: '☉', top: '8%',  left: '6%',  size: 38, dur: 9,  delay: 0,   rot: 8  },
  { sym: '☽', top: '72%', left: '4%',  size: 30, dur: 11, delay: 1.2, rot: -6 },
  { sym: '♃', top: '18%', left: '88%', size: 34, dur: 10, delay: 0.6, rot: 10 },
  { sym: '⛢', top: '78%', left: '90%', size: 26, dur: 8,  delay: 2,   rot: -8 },
  { sym: '♄', top: '50%', left: '94%', size: 28, dur: 12, delay: 0.4, rot: 6  },
  { sym: '✦', top: '30%', left: '14%', size: 16, dur: 6,  delay: 0.8, rot: 0  },
  { sym: '✦', top: '60%', left: '80%', size: 14, dur: 7,  delay: 1.6, rot: 0  },
  { sym: '✧', top: '12%', left: '50%', size: 18, dur: 8,  delay: 0,   rot: 0  },
  { sym: '☿', top: '85%', left: '50%', size: 24, dur: 10, delay: 1,   rot: -10 },
  { sym: '♀', top: '40%', left: '2%',  size: 22, dur: 9,  delay: 1.8, rot: 5  },
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

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 48px; opacity: 1; }
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
  @keyframes astroFloat {
    0%   { transform: translateY(0) rotate(0deg);   opacity: 0.55; }
    50%  { transform: translateY(-22px) rotate(var(--rot)); opacity: 0.9; }
    100% { transform: translateY(0) rotate(0deg);   opacity: 0.55; }
  }

  /* Premium static warm-gold gradient — no shifting animation */
  .st-section {
    background: radial-gradient(ellipse at 20% 20%, #fdf3df 0%, #f0d9a8 38%, #d8a13e 72%, #c8790a 100%);
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

  .st-astro {
    position: absolute;
    color: rgba(122, 58, 0, 0.45);
    font-family: 'Playfair Display', Georgia, serif;
    pointer-events: none;
    user-select: none;
    text-shadow: 0 0 14px rgba(255, 220, 140, 0.55);
    animation: astroFloat ease-in-out infinite;
    will-change: transform, opacity;
  }

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
    .st-astro { display: none; }
    .st-astro.st-astro--mobile-ok { display: block; font-size: 14px !important; opacity: 0.35 !important; }
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
          color: hovered ? '#2b1500' : '#4a2800',
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
        fontWeight: 700,
        color: hovered ? '#2b1500' : 'rgba(74, 40, 0, 0.85)',
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

      {/* Floating astrology symbols */}
      {astroSymbols.map((a, i) => (
        <span
          key={i}
          className={`st-astro${i % 3 === 0 ? ' st-astro--mobile-ok' : ''}`}
          style={{
            top: a.top,
            left: a.left,
            fontSize: a.size,
            animationDuration: `${a.dur}s`,
            animationDelay: `${a.delay}s`,
            ['--rot' as string]: `${a.rot}deg`,
          }}
        >
          {a.sym}
        </span>
      ))}

      <p
        className="st-eyebrow"
        style={{
          fontSize: 11,
          letterSpacing: '0.28em',
          color: '#2b1500',
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