import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 52, suffix: 'M+', label: 'Monthly Views', duration: 2000 },
  { target: 5.9, suffix: 'M+', label: 'Social Followers', duration: 1800, decimals: 1 },
  { target: 8, suffix: 'Lakh+', label: 'Reports Delivered', duration: 1600 },
  { target: 53, suffix: '+', label: 'Years of Legacy', duration: 1400 },
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

function StatItem({
  target, suffix, label, duration, decimals = 0, triggered, index,
}: {
  target: number; suffix: string; label: string; duration: number;
  decimals?: number; triggered: boolean; index: number
}) {
  const display = useCountUp(target, duration, decimals, triggered)

  return (
    <div
      style={{
        flex: '1 1 140px',
        minWidth: 120,
        maxWidth: 200,
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        position: 'relative',
        padding: '0 12px',
      }}
    >
      {/* Divider between items */}
      {index > 0 && (
        <div style={{
          position: 'absolute', left: 0, top: '15%', height: '70%',
          width: 1, background: 'linear-gradient(to bottom, transparent, #d4a055, transparent)',
        }} />
      )}

      <div style={{
        fontSize: 'clamp(36px, 5vw, 54px)',
        fontWeight: 800,
        color: '#4a2006',
        fontFamily: 'Georgia, serif',
        lineHeight: 1,
        letterSpacing: '-1px',
      }}>
        {display}
        <span style={{ color: '#c47a1e' }}>{suffix}</span>
      </div>

      <div style={{
        fontSize: 11,
        color: '#9a7050',
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        marginTop: 10,
        lineHeight: 1.5,
      }}>
        {label}
      </div>

      {/* Animated underline accent */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, #c47a1e, #e8a63a)',
        borderRadius: 2,
        marginTop: 12,
        width: triggered ? '40px' : '0px',
        transition: `width 0.6s ease ${0.4 + index * 0.12}s`,
        margin: '12px auto 0',
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
      style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 8%, 80px)', background: '#fff9f2', textAlign: 'center' }}
    >
      <p style={{ fontSize: 11, letterSpacing: 3, color: '#c47a1e', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: 10 }}>
        Our Impact
      </p>
      <h2 style={{
        fontSize: 'clamp(20px, 3.5vw, 30px)',
        fontWeight: 700,
        margin: '0 0 clamp(32px, 5vw, 52px)',
        fontFamily: 'Georgia, serif',
        color: '#1a0a00',
        lineHeight: 1.3,
      }}>
        A Journey Built on <span style={{ color: '#c47a1e' }}>Trust & Proven Results</span>
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 'clamp(16px, 3vw, 32px)',
        flexWrap: 'wrap',
        maxWidth: 860,
        margin: '0 auto',
      }}>
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} triggered={triggered} index={i} />
        ))}
      </div>
    </section>
  )
}