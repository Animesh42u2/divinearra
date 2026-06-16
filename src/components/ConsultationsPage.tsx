import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// ─────────────────────────────────────────
// InteractiveGridBackground (self-contained)
// ─────────────────────────────────────────
interface GridBgProps {
  gridSize?: number
  gridColor?: string
  effectColor?: string
  trailLength?: number
  idleSpeed?: number
  glow?: boolean
  glowRadius?: number
  idleRandomCount?: number
  showFade?: boolean
  fadeIntensity?: number
  children?: React.ReactNode
  style?: React.CSSProperties
}

function InteractiveGridBackground({
  gridSize = 50,
  gridColor = 'rgba(200,121,26,0.25)',
  effectColor = 'rgba(200,121,26,0.5)',
  trailLength = 4,
  idleSpeed = 0.18,
  glow = true,
  glowRadius = 24,
  idleRandomCount = 5,
  showFade = true,
  fadeIntensity = 18,
  children,
  style,
}: GridBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const idleTargetsRef = useRef<{ x: number; y: number }[]>([])
  const idlePositionsRef = useRef<{ x: number; y: number }[]>([])
  const lastMouseTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  useEffect(() => {
  lastMouseTimeRef.current = Date.now()
}, [])
  // Mouse tracking
  useEffect(() => {
    let rect: DOMRect | null = null
    const container = containerRef.current

    const updateRect = () => { if (container) rect = container.getBoundingClientRect() }
    updateRect()
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, { passive: true })

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      if (!rect) rect = container.getBoundingClientRect()
      const rawX = e.clientX - rect.left
      const rawY = e.clientY - rect.top
      if (rawX < 0 || rawY < 0 || rawX > rect.width || rawY > rect.height) return
      lastMouseTimeRef.current = Date.now()
      const snappedX = Math.floor(rawX / gridSize)
      const snappedY = Math.floor(rawY / gridSize)
      const last = trailRef.current[0]
      if (!last || last.x !== snappedX || last.y !== snappedY) {
        trailRef.current.unshift({ x: snappedX, y: snappedY })
        if (trailRef.current.length > trailLength) trailRef.current.pop()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gridSize, trailLength])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = () => Math.floor(canvas.width / gridSize)
    const rows = () => Math.floor(canvas.height / gridSize)

    idleTargetsRef.current = Array.from({ length: idleRandomCount }, () => ({
      x: Math.floor(Math.random() * cols()),
      y: Math.floor(Math.random() * rows()),
    }))
    idlePositionsRef.current = idleTargetsRef.current.map(p => ({ ...p }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Date.now() - lastMouseTimeRef.current > 2000) {
        idlePositionsRef.current.forEach((pos, i) => {
          const target = idleTargetsRef.current[i]
          const dx = target.x - pos.x
          const dy = target.y - pos.y
          if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            idleTargetsRef.current[i] = {
              x: Math.floor(Math.random() * cols()),
              y: Math.floor(Math.random() * rows()),
            }
          } else {
            pos.x += dx * idleSpeed
            pos.y += dy * idleSpeed
          }
          const rx = Math.round(pos.x)
          const ry = Math.round(pos.y)
          const last = trailRef.current[0]
          if (!last || last.x !== rx || last.y !== ry) {
            trailRef.current.unshift({ x: rx, y: ry })
            if (trailRef.current.length > trailLength * idleRandomCount) trailRef.current.pop()
          }
        })
      }

      trailRef.current.forEach((cell, idx) => {
        const alpha = 1 - idx * (1 / (trailLength + 1))
        const color = effectColor.replace(/[\d.]+\)$/, `${alpha})`)
        ctx.fillStyle = color
        if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glowRadius }
        else ctx.shadowBlur = 0
        ctx.fillRect(cell.x * gridSize, cell.y * gridSize, gridSize, gridSize)
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [gridSize, effectColor, trailLength, idleSpeed, glow, glowRadius, idleRandomCount])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Grid lines */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      {/* Radial fade overlay */}
      {showFade && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'transparent',
          maskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
          WebkitMaskImage: `radial-gradient(ellipse at center, transparent ${fadeIntensity}%, black)`,
          backgroundColor: 'rgba(14,6,0,0.72)',
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Data
// ─────────────────────────────────────────
const allConsultations = [
  {
    slug: 'personal',
    title: 'Personal Consultation',
    desc: 'Get real-time answers to your most pressing life questions in a live 1-on-1 session with Astro Aaditya Narayan.',
    image: '/personal.png',
    price: '₹499',
    originalPrice: '₹999',
    tag: 'popular',
    icon: '🔮',
    duration: '15–30 Min',
  },
  {
    slug: 'couple',
    title: 'Couple Consultation',
    desc: 'A joint live session for both partners to explore compatibility, understand each other better, and get guidance together.',
    image: '/love.webp',
    price: '₹799',
    originalPrice: '₹1,999',
    tag: 'popular',
    icon: '💑',
    duration: '30–60 Min',
  },
  {
    slug: 'tarot-card-reading',
    title: 'Tarot Card Reading',
    desc: 'An intuitive live tarot session for clarity on love, career, or any decision weighing on your mind.',
    image: '/taroot.png',
    price: '₹349',
    originalPrice: '₹799',
    tag: 'trending',
    icon: '🃏',
    duration: '15–45 Min',
  },
  {
    slug: 'gemstone-rudraksha',
    title: 'Gemstone & Rudraksha Consultation',
    desc: 'Personalized guidance on which gemstones and Rudraksha truly align with your birth chart — before you invest.',
    image: '/gemstonee.jpg',
    price: '₹599',
    originalPrice: '₹1,499',
    tag: 'trending',
    icon: '💎',
    duration: '20–40 Min',
  },
]

type Tab = 'all' | 'popular' | 'trending'

const tagConfig: Record<string, { label: string; bg: string; color: string }> = {
  popular:  { label: '🔥 Popular',  bg: 'rgba(196,122,30,0.15)', color: '#c47a1e' },
  trending: { label: '✦ Trending', bg: 'rgba(120,60,180,0.12)',  color: '#9b41ff' },
}

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f0a830" stroke="#f0a830" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

// ─────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────
export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const filtered = activeTab === 'all'
    ? allConsultations
    : allConsultations.filter(c => c.tag === activeTab)

  return (
    <>
      <style>{`
        .cons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        @media (max-width: 860px) { .cons-grid { grid-template-columns: 1fr; gap: 20px; } }

        .cons-card {
          position: relative;
          background: linear-gradient(160deg, #fffbf3 0%, #fdf0d8 100%);
          border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: row;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 32px rgba(196,122,30,0.10), 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid rgba(196,122,30,0.18);
          text-decoration: none; color: inherit;
          min-height: 220px;
        }
        .cons-card:hover {
          transform: translateY(-8px) scale(1.012);
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 28px 56px rgba(196,122,30,0.22), 0 8px 16px rgba(0,0,0,0.08);
        }
        .cons-card-img {
          flex-shrink: 0;
          width: clamp(130px, 28%, 200px);
          position: relative;
          background: linear-gradient(160deg, #f8e8c0 0%, #e8cc88 60%, #d4a850 100%);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .cons-card-img::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,220,120,0.5) 0%, transparent 65%);
          pointer-events: none;
        }
        .cons-card-img img {
          width: 75%; height: 80%; object-fit: contain;
          filter: drop-shadow(0 8px 20px rgba(0,0,0,0.35));
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position: relative; z-index: 1;
        }
        .cons-card:hover .cons-card-img img { transform: scale(1.08) translateY(-6px); }
        .cons-card-icon {
          position: absolute; bottom: 10px; right: 10px;
          font-size: 1.4rem; z-index: 2;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
        }
        .cons-card-body {
          flex: 1; padding: 20px 22px;
          display: flex; flex-direction: column; gap: 7px; min-width: 0;
        }
        .cons-card-tag {
          font-family: sans-serif; font-size: 10.5px; font-weight: 700;
          padding: 3px 9px; border-radius: 20px; letter-spacing: 0.04em;
          backdrop-filter: blur(8px); display: inline-block; align-self: flex-start;
        }
        .cons-card-title {
          font-family: 'Georgia', serif; font-size: clamp(15px,2vw,18px);
          font-weight: 700; color: #1a0a00; margin: 0; line-height: 1.3;
        }
        .cons-card-stars { display: flex; align-items: center; gap: 3px; }
        .cons-card-stars span { font-family: sans-serif; font-size: 11px; color: #a08060; margin-left: 4px; }
        .cons-card-desc {
          font-family: sans-serif; font-size: 12.5px; color: #7a5030;
          line-height: 1.7; margin: 0; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cons-card-meta { display: flex; align-items: center; gap: 6px; font-family: sans-serif; font-size: 11px; color: #a08060; }
        .cons-card-price-row { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
        .cons-card-price { font-family: Georgia, serif; font-size: clamp(18px,2.5vw,22px); font-weight: 700; color: #c47a1e; }
        .cons-card-original { font-family: sans-serif; font-size: 12px; color: #b09070; text-decoration: line-through; }
        .cons-card-btn {
          margin-top: 6px; padding: 10px 18px; border-radius: 12px; border: none;
          background: linear-gradient(90deg, #f0a830 0%, #c47a1e 100%);
          color: #fff; font-weight: 700; font-size: 12px; font-family: sans-serif;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          box-shadow: 0 4px 14px rgba(196,122,30,0.35);
          display: flex; align-items: center; justify-content: center;
          gap: 6px; transition: all 0.25s ease; width: 100%;
        }
        .cons-card:hover .cons-card-btn {
          background: linear-gradient(90deg, #f8b840 0%, #d4870e 100%);
          box-shadow: 0 6px 20px rgba(196,122,30,0.5);
        }

        /* hero responsive */
        .ch-hero-inner {
          padding: clamp(56px,8vw,100px) clamp(20px,6%,80px) clamp(48px,6vw,80px);
          text-align: center;
        }
        .ch-hero-eyebrow {
          font-size: clamp(9px,1.5vw,11px); letter-spacing: 4px; text-transform: uppercase;
          color: #e8c97a; font-family: sans-serif; margin: 0 0 18px; opacity: 0.9;
        }
        .ch-hero-h1 {
          font-size: clamp(22px,5vw,52px); font-family: Georgia, serif;
          font-weight: 800; margin: 0 0 16px; line-height: 1.2; color: #fff;
        }
        .ch-hero-sub {
          font-size: clamp(13px,1.8vw,16px); color: rgba(255,255,255,0.82);
          font-family: sans-serif; max-width: 520px; margin: 0 auto 40px;
          line-height: 1.75;
        }
        .ch-stats {
          display: flex; gap: clamp(8px,2vw,16px); justify-content: center; flex-wrap: wrap;
        }
        .ch-stat {
          background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px; padding: clamp(8px,1.5vw,12px) clamp(12px,2vw,20px);
          text-align: center; backdrop-filter: blur(6px);
        }
        .ch-stat-val {
          font-family: Georgia, serif; font-size: clamp(0.9rem,2vw,1.2rem);
          font-weight: 800; color: #fff;
        }
        .ch-stat-lbl {
          font-size: clamp(0.55rem,1vw,0.65rem); color: rgba(255,255,255,0.65);
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px;
        }

        .tabs-wrap { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
        .tab-btn {
          padding: 8px 24px; border-radius: 24px; border: 1.5px solid rgba(196,122,30,0.25);
          background: transparent; font-family: sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; color: #7a5030; transition: all 0.2s; letter-spacing: 0.02em;
        }
        .tab-btn.active {
          border-color: #c47a1e; color: #fff;
          background: linear-gradient(90deg, #f0a830, #c47a1e);
          box-shadow: 0 4px 14px rgba(196,122,30,0.3);
        }
        .tab-btn:not(.active):hover { border-color: #c47a1e; color: #c47a1e; background: rgba(196,122,30,0.06); }
        .section-eyebrow {
          font-family: sans-serif; font-size: 11px; letter-spacing: 4px;
          text-transform: uppercase; color: #c47a1e; margin: 0 0 10px; opacity: 0.9;
        }

        @media (max-width: 520px) {
          .cons-card { flex-direction: column; min-height: unset; }
          .cons-card-img { width: 100%; height: 180px; }
          .cons-card-img img { width: 50%; height: 85%; }
          .ch-stats { gap: 8px; }
          .ch-stat { padding: 8px 12px; }
        }
      `}</style>

      <Navbar />

      {/* ══ HERO with InteractiveGridBackground ══ */}
      <InteractiveGridBackground
        gridSize={48}
        gridColor="rgba(200,121,26,0.18)"
        effectColor="rgba(200,121,26,0.55)"
        trailLength={5}
        idleSpeed={0.15}
        glow={true}
        glowRadius={28}
        idleRandomCount={6}
        showFade={true}
        fadeIntensity={20}
        style={{
          background: 'linear-gradient(160deg, #3a1800 0%, #2d1200 35%, #1a0a00 70%, #120600 100%)',
          color: '#fff',
          minHeight: 'clamp(400px, 60vh, 700px)',
        }}
      >
        {/* Extra radial glow overlays */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `
            radial-gradient(ellipse at 70% 40%, rgba(196,122,30,0.2) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(232,166,58,0.12) 0%, transparent 50%)
          `,
        }} />

        <div className="ch-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <motion.p
            className="ch-hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ॐ &nbsp; Live Guidance · Real Clarity &nbsp; ॐ
          </motion.p>

          <motion.h1
            className="ch-hero-h1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Talk to the Stars,<br />
            <span style={{ color: '#e8a44a' }}>Through an Expert Who Reads Them.</span>
          </motion.h1>

          <motion.p
            className="ch-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            Every question deserves a real answer. Book a live session with Astro Aaditya Narayan
            and get personalized guidance — in real time, just for you.
          </motion.p>

          <motion.div
            className="ch-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            {[
              ['100K+', 'Consultations Done'],
              ['4.8/5 ★', 'Avg Rating'],
              ['7+', 'Years Experience'],
              ['4', 'Session Types'],
            ].map(([v, l]) => (
              <div key={l} className="ch-stat">
                <div className="ch-stat-val">{v}</div>
                <div className="ch-stat-lbl">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </InteractiveGridBackground>

      {/* ══ CONSULTATIONS SECTION ══ */}
      <div
        id="consultations"
        style={{
          background: 'linear-gradient(180deg, #fff9f0 0%, #fff 100%)',
          padding: 'clamp(48px,6vw,88px) clamp(16px,7%,88px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p className="section-eyebrow">☽ &nbsp; Choose Your Session &nbsp; ☾</p>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3.2vw,34px)', fontWeight: 700, color: '#1a0a00', margin: '0 0 12px' }}>
            Your Guidance, Your Way.
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: '#7a5030', margin: '0 auto', lineHeight: 1.7, maxWidth: 460 }}>
            From personal life questions to couple compatibility, tarot insights to gemstone guidance — pick the session that speaks to where you are right now.
          </p>
        </div>

        <div className="tabs-wrap">
          {(['all', 'popular', 'trending'] as Tab[]).map(t => (
            <button
              key={t}
              className={`tab-btn${activeTab === t ? ' active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'all' ? '✦ All Sessions' : t === 'popular' ? '🔥 Popular' : '✦ Trending'}
            </button>
          ))}
        </div>

        <div className="cons-grid">
          {filtered.map((c, i) => {
            const tc = tagConfig[c.tag]
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ display: 'contents' }}
              >
                <Link to={`/consultation/${c.slug}`} className="cons-card">
                  <div className="cons-card-img">
                    <img src={c.image} alt={c.title} loading="lazy" />
                    <span className="cons-card-icon">{c.icon}</span>
                  </div>
                  <div className="cons-card-body">
                    {tc && (
                      <span className="cons-card-tag" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.color}40` }}>
                        {tc.label}
                      </span>
                    )}
                    <h3 className="cons-card-title">{c.title}</h3>
                    <div className="cons-card-stars">
                      {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                      <span>5.0 · 200+ reviews</span>
                    </div>
                    <p className="cons-card-desc">{c.desc}</p>
                    <div className="cons-card-meta">
                      <CalendarIcon />
                      <span>{c.duration} Session</span>
                    </div>
                    <div className="cons-card-price-row">
                      <span className="cons-card-price">{c.price}</span>
                      <span className="cons-card-original">{c.originalPrice}</span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#a08060' }}>onwards</span>
                    </div>
                    <div className="cons-card-btn">Book Session →</div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Footer />
    </>
  )
}