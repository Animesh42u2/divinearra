import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 100, suffix: 'K+', label: 'Consultations Delivered', duration: 2000 },
  { target: 7, suffix: '+', label: 'Years of Experience', duration: 1400 },
  { target: 59, suffix: '+', label: 'Years of Legacy', duration: 1600 },
  { target: 8, suffix: '+', label: 'Professional Awards', duration: 1200 },
  { target: 30, suffix: 'K+', label: 'Hours of Expert Guidance', duration: 1800 },
]

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function useCountUp(target: number, duration: number, decimals = 0, triggered: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      const current = parseFloat((eased * target).toFixed(decimals))
      setValue(current)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration, decimals, triggered])

  return decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()
}

const globalStyles = `
  @keyframes shimmerFlow {
    0%   { background-position: 0% -100%; }
    100% { background-position: 0% 200%; }
  }
  @keyframes dividerGrow {
    0%   { height: 0%; opacity: 0; }
    20%  { opacity: 1; }
    100% { height: 70%; opacity: 1; }
  }
  @keyframes glintSweep {
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes ringPulse {
    0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1.3);  opacity: 0; }
  }
  .diamond-card:hover .diamond-wrap {
    animation: floatUp 2.4s ease-in-out infinite;
  }
  .diamond-card:hover .stat-glint {
    animation: glintSweep 0.7s ease-out forwards;
  }
  .diamond-card:hover .stat-ring {
    animation: ringPulse 0.8s ease-out forwards;
    border-color: rgba(255,200,80,0.7);
  }

  .divider-track {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5%;
    width: 1px;
    height: 0%;
    overflow: hidden;
  }
  .divider-track.active {
    animation: dividerGrow 1.4s cubic-bezier(0.22,1,0.36,1) forwards;
    animation-delay: var(--delay, 0s);
  }
  .divider-shimmer {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 300%;
    background: linear-gradient(
      to bottom,
      transparent       0%,
      rgba(196,122,30,0.15) 10%,
      rgba(255,230,100,0.7) 30%,
      rgba(255,200,60,1)    45%,
      rgba(232,166,58,1)    50%,
      rgba(255,200,60,1)    55%,
      rgba(255,230,100,0.7) 70%,
      rgba(196,122,30,0.15) 90%,
      transparent       100%
    );
    opacity: 0;
  }
  .divider-track.active .divider-shimmer {
    opacity: 1;
    animation: shimmerFlow 2s ease-in-out infinite;
    animation-delay: var(--shimmer-delay, 1.4s);
  }

  .divider-wrapper {
    display: none;
  }

  @media (min-width: 480px) {
    .divider-wrapper {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
    }
  }

  @media (max-width: 640px) {
    .diamond-card {
      min-width: 140px !important;
    }
  }
`

function DiamondSVG({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 150 148" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`t-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe580" />
          <stop offset="45%" stopColor="#f5a623" />
          <stop offset="100%" stopColor="#b76a00" />
        </linearGradient>
        <linearGradient id={`b-${id}`} x1="0%" y1="0%" x2="15%" y2="100%">
          <stop offset="0%" stopColor="#ffd060" stopOpacity={0.95} />
          <stop offset="100%" stopColor="#8c4e00" stopOpacity={0.92} />
        </linearGradient>
      </defs>
      <polygon points="75,6 28,48 122,48" fill={`url(#t-${id})`} stroke="#9a5c08" strokeWidth="0.5" />
      <polygon points="75,6 50,48 75,28" fill="#fff4c0" opacity={0.7} />
      <polygon points="75,6 100,48 75,28" fill="#c47a1e" opacity={0.4} />
      <polygon points="28,48 50,48 75,28 75,6" fill="#ffd060" opacity={0.38} />
      <polygon points="122,48 100,48 75,28 75,6" fill="#a06010" opacity={0.28} />
      <polygon points="28,48 122,48 75,142" fill={`url(#b-${id})`} stroke="#9a5c08" strokeWidth="0.5" />
      <polygon points="28,48 75,48 75,142" fill="#ffd060" opacity={0.38} />
      <polygon points="75,48 122,48 75,142" fill="#6a3000" opacity={0.22} />
      <line x1="50" y1="48" x2="75" y2="142" stroke="#c47a1e" strokeWidth="0.5" opacity={0.45} />
      <line x1="100" y1="48" x2="75" y2="142" stroke="#c47a1e" strokeWidth="0.5" opacity={0.45} />
      <line x1="28" y1="48" x2="122" y2="48" stroke="#ffe580" strokeWidth="1" opacity={0.9} />
      <ellipse cx="60" cy="20" rx="7" ry="3.5" fill="white" opacity={0.4} transform="rotate(-22,60,20)" />
      <ellipse cx="88" cy="30" rx="3" ry="1.5" fill="white" opacity={0.25} transform="rotate(-10,88,30)" />
    </svg>
  )
}

function Divider({ active, delay }: { active: boolean; delay: number }) {
  return (
    <div className="divider-wrapper">
      <div
        className={`divider-track${active ? ' active' : ''}`}
        style={{
          '--delay': `${delay}s`,
          '--shimmer-delay': `${delay + 1.4}s`,
        } as React.CSSProperties}
      >
        <div className="divider-shimmer" />
      </div>
    </div>
  )
}

function StatItem({
  target, suffix, label, duration, decimals = 0, triggered, index,
}: {
  target: number; suffix: string; label: string; duration: number;
  decimals?: number; triggered: boolean; index: number
}) {
  const display = useCountUp(target, duration, decimals, triggered)
  const [hovered, setHovered] = useState(false)

  const divDelay = 0.3 + (index - 1) * 0.18

  return (
    <div
      className="diamond-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 140px',
        minWidth: 140,
        maxWidth: 210,
        opacity: triggered ? 1 : 0,
        transform: triggered
          ? hovered ? 'translateY(-10px)' : 'translateY(0)'
          : 'translateY(24px)',
        transition: triggered
          ? `opacity 0.6s ease ${index * 0.12}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)`
          : `opacity 0.6s ease ${index * 0.12}s, transform 0.5s ease`,
        position: 'relative',
        cursor: 'default',
        textAlign: 'center',
        padding: '0 8px',
      }}
    >
      {/* Divider on left edge */}
      {index > 0 && <Divider active={triggered} delay={divDelay} />}

      {/* Diamond gem */}
      <div
        className="diamond-wrap"
        style={{
          position: 'relative',
          width: 'min(150px, 100%)',
          aspectRatio: '150 / 148',
          margin: '0 auto',
          filter: hovered
            ? 'drop-shadow(0 0 6px rgba(255,200,80,0.55)) drop-shadow(0 8px 28px rgba(196,122,30,0.65)) drop-shadow(0 2px 4px rgba(196,122,30,0.4))'
            : 'drop-shadow(0 4px 14px rgba(196,122,30,0.3))',
          transition: 'filter 0.4s ease',
        }}
      >
        <DiamondSVG id={String(index)} />

        {/* Number inside diamond */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -46%)',
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: 'clamp(18px, 2.4vw, 27px)',
          fontWeight: 900,
          color: hovered ? '#2a0e00' : '#3a1800',
          lineHeight: 1,
          letterSpacing: '-1px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitTextStroke: '0.4px #2a0e00',
          textShadow: hovered ? '0 0 12px rgba(255,180,40,0.45), 0 1px 2px rgba(255,255,255,0.6)' : 'none',
          transition: 'color 0.3s ease, text-shadow 0.3s ease',
        }}>
          {display}<span>{suffix}</span>
        </div>

        {/* Glint overlay */}
        <div
          className="stat-glint"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '100%', height: '100%',
            pointerEvents: 'none', opacity: 0,
            background: 'radial-gradient(ellipse at 38% 28%, rgba(255,255,255,0.55) 0%, transparent 55%)',
            transform: 'translate(-50%, -46%)',
          }}
        />

        {/* Ring pulse */}
        <div
          className="stat-ring"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 130, height: 128,
            clipPath: 'polygon(50% 4%, 19% 32%, 81% 32%, 50% 98%)',
            border: '1.5px solid rgba(255,200,80,0)',
            pointerEvents: 'none',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.85)',
          }}
        />
      </div>

      {/* Label */}
      <div style={{
        fontSize: 11,
        letterSpacing: hovered ? '0.22em' : '0.18em',
        textTransform: 'uppercase',
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
        color: hovered ? '#c47a1e' : '#9a6030',
        marginTop: 12,
        lineHeight: 1.5,
        transition: 'color 0.35s ease, letter-spacing 0.35s ease',
      }}>
        {label}
      </div>

      {/* Gold underline */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, #c47a1e, #e8a63a, #ffe066, #e8a63a, #c47a1e)',
        backgroundSize: '200% 100%',
        backgroundPosition: hovered ? '100% 0' : '0% 0',
        borderRadius: 2,
        width: hovered ? 64 : triggered ? 36 : 0,
        transition: 'width 0.4s cubic-bezier(0.34,1.56,0.64,1), background-position 0.4s',
        margin: '10px auto 0',
      }} />
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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff9f2',
        padding: 'clamp(40px, 8vw, 80px) clamp(12px, 5%, 80px)',
        textAlign: 'center',
      }}
    >
      <style>{globalStyles}</style>

      <p style={{
        fontSize: 11,
        letterSpacing: '0.2em',
        color: '#c47a1e',
        textTransform: 'uppercase',
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 600,
        marginBottom: 10,
      }}>
        Our Impact
      </p>

      <h2 style={{
        fontSize: 'clamp(20px, 3.5vw, 30px)',
        fontWeight: 700,
        margin: '0 0 clamp(28px, 5vw, 52px)',
        fontFamily: '"Georgia", "Times New Roman", serif',
        color: '#1a0800',
        lineHeight: 1.3,
        letterSpacing: '-0.3px',
      }}>
        Trusted By{' '}
        <span style={{ color: '#c47a1e' }}>Thousands</span>
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 'clamp(8px, 2vw, 28px)',
        flexWrap: 'wrap',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} triggered={triggered} index={i} />
        ))}
      </div>
    </section>
  )
}
