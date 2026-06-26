import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { reportsConfig } from '../data/reportsConfig'

// ─────────────────────────────────────────
// BorderBeam
// ─────────────────────────────────────────
interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: any
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
  borderThickness?: number
  opacity?: number
  glowIntensity?: number
  beamBorderRadius?: number
  speedMultiplier?: number
}

const BorderBeam = ({
  className = '',
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#7400ff',
  colorTo = '#9b41ff',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderThickness = 1,
  opacity = 1,
  glowIntensity = 0,
  beamBorderRadius,
  speedMultiplier = 1,
}: BorderBeamProps) => {
  const actualDuration = speedMultiplier ? duration / speedMultiplier : duration
  const glowEffect =
    glowIntensity > 0
      ? `0 0 ${glowIntensity * 5}px ${glowIntensity * 2}px var(--beam-color-from)`
      : undefined

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth: `${borderThickness}px` }}
    >
      <motion.div
        className={`absolute aspect-square bg-gradient-to-l from-[var(--beam-color-from)] via-[var(--beam-color-to)] to-transparent ${className}`}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${beamBorderRadius ?? size}px)`,
          '--beam-color-from': colorFrom,
          '--beam-color-to': colorTo,
          opacity,
          boxShadow: glowEffect,
          borderRadius: beamBorderRadius ? `${beamBorderRadius}px` : undefined,
          ...style,
        } as any}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: actualDuration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────
// Randomised ratings per report (stable — generated once)
// ─────────────────────────────────────────
function randomRating() {
  const ratings = ['4.8', '4.9', '5.0']
  return ratings[Math.floor(Math.random() * ratings.length)]
}

function randomReviews() {
  return Math.floor(1500 + Math.random() * 700)
}
// ─────────────────────────────────────────
// Data
// ─────────────────────────────────────────
const allReports = [
  { title: 'Premium Personalized Kundali', desc: 'Your complete cosmic blueprint — hand-crafted with deep planetary analysis, life-path predictions, and powerful Vedic remedies.', image: '/reports/Premium Personalized Kundali.png', originalPrice: '₹1,999', price: '₹999', tag: 'popular' },
  { title: 'Career Report', desc: 'Unlock your true professional destiny. Know the right field, the right timing, and the planetary forces shaping your success.', image: '/reports/Career Report.png', originalPrice: '₹1,199', price: '₹699', tag: 'popular' },
  { title: 'Finance Report', desc: "Decode the wealth signals hidden in your stars. Discover what's blocking prosperity and the exact remedies to attract abundance.", image: '/reports/Finance Report.png', originalPrice: '₹1,199', price: '₹699', tag: 'popular' },
  { title: 'Varshaphal Report', desc: 'Your personal annual forecast — see what the coming year holds for love, career, health, and every major life area.', image: '/reports/Varshaphal Report.png', originalPrice: '₹999', price: '₹599', tag: 'trending' },
  { title: 'Lal Kitab Report', desc: 'Rare ancient wisdom meets your birth chart. Get powerful Lal Kitab remedies tailored specifically to your planetary placements.', image: '/reports/Lal Kitab Report.png', originalPrice: '₹999', price: '₹599', tag: 'popular' },
  { title: 'Education Report', desc: 'Find your ideal field of study, best learning approach, and the most favourable periods for exams and academic breakthroughs.', image: '/reports/Education Report.png', originalPrice: '₹799', price: '₹499', tag: 'trending' },
  { title: 'Health Report', desc: "Know your body's planetary vulnerabilities before they become problems. Includes protective remedies for lifelong wellbeing.", image: '/reports/Health Report.png', originalPrice: '₹799', price: '₹499', tag: 'trending' },
  { title: 'Shani Sadesati Report', desc: "Navigate Saturn's most challenging transit with confidence. Understand its exact impact on your life and how to sail through it.", image: '/reports/Shani Sadesati Report.png', originalPrice: '₹799', price: '₹499', tag: 'popular' },
  { title: 'Fortune Report', desc: "Your personalised roadmap to life's big opportunities. Discover lucky windows, fortune activators, and the stars aligned for you.", image: '/reports/Fortune Report.png', originalPrice: '₹1,199', price: '₹699', tag: 'trending' },
  { title: 'Couple Matching Report', desc: 'Before you say yes, let the universe speak. An in-depth Kundali compatibility report for love, values, and a lifetime together.', image: '/reports/Couple Matching Report.png', originalPrice: '₹1,399', price: '₹799', tag: 'popular' },
].map(r => ({
  ...r,
  rating: randomRating(),
  reviews: randomReviews(),
}))

const heroBooks = allReports.map(r => r.image)
const TOTAL = heroBooks.length
const RADIUS = 320

type Tab = 'all' | 'popular' | 'trending'

const tagConfig: Record<string, { label: string; bg: string; color: string }> = {
  popular:  { label: '🔥 Popular',  bg: 'rgba(196,122,30,0.15)', color: '#c47a1e' },
  trending: { label: '✦ Trending', bg: 'rgba(120,60,180,0.12)',  color: '#9b41ff' },
}

const beamColors = [
  { from: '#f0a830', to: '#c47a1e' },
  { from: '#e8c97a', to: '#f0a830' },
  { from: '#c47a1e', to: '#ff9933' },
]

// ─────────────────────────────────────────
// Icons
// ─────────────────────────────────────────
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="11" height="11" viewBox="0 0 24 24"
    fill={filled ? '#f0a830' : 'none'}
    stroke={filled ? '#f0a830' : '#d4a850'}
    strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// Render 5 stars where the fractional one is half-filled via a clip trick
const StarRating = ({ rating }: { rating: string }) => {
  const num = parseFloat(rating)
  const full = Math.floor(num)
  const half = num - full >= 0.5
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <StarIcon key={s} filled={s <= full || (s === full + 1 && half)} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [angle, setAngle] = useState(0)
  const [active, setActive] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const step = 360 / TOTAL

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setAngle(a => a - step)
      setActive(i => (i + 1) % TOTAL)
    }, 2400)
  }

  useEffect(() => {
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const goTo = (idx: number) => {
    const delta = idx - active
    setAngle(a => a - delta * step)
    setActive(idx)
    startAuto()
  }

  const filtered = activeTab === 'all' ? allReports : allReports.filter(r => r.tag === activeTab)

  return (
    <>
      <style>{`
        .chakra-divider {
          position: absolute; top: 50%; right: -22px;
          transform: translateY(-50%);
          width: 44px; height: 44px; background: #fff;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .chakra-divider::before { content: '☸'; font-size: 26px; color: #c47a1e; line-height: 1; }
        .carousel-scene {
          width: 100%; height: 300px; perspective: 1100px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: visible;
        }
        .carousel-ring {
          width: 130px; height: 190px; position: relative;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .carousel-item {
          position: absolute; inset: 0; border-radius: 12px; overflow: hidden;
          cursor: pointer; backface-visibility: hidden;
          transition: filter 0.4s ease, transform 0.4s ease;
          filter: brightness(0.55) saturate(0.7); transform-origin: center center;
        }
        .carousel-item.is-active { filter: brightness(1) saturate(1.1); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
        .carousel-item img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 12px; }
        .car-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(26,10,0,0.6); backdrop-filter: blur(8px);
          border: 1px solid rgba(196,122,30,0.5); color: #e8c97a;
          width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
          font-size: 22px; display: flex; align-items: center; justify-content: center;
          z-index: 10; transition: all 0.2s; user-select: none;
        }
        .car-arrow:hover { background: rgba(196,122,30,0.35); border-color: #e8c97a; box-shadow: 0 0 16px rgba(196,122,30,0.4); }
        .car-dots { display: flex; gap: 6px; justify-content: center; margin-top: 18px; flex-wrap: wrap; }
        .car-dot { width: 7px; height: 7px; border-radius: 50%; border: none; cursor: pointer; padding: 0; background: rgba(255,255,255,0.35); transition: all 0.3s; }
        .car-dot.active { background: #e8c97a; transform: scale(1.4); box-shadow: 0 0 8px rgba(232,201,122,0.6); }
        .active-label {
          display: inline-block; background: rgba(26,10,0,0.45); backdrop-filter: blur(6px);
          border: 1px solid rgba(232,201,122,0.4); color: #e8c97a;
          font-family: 'Georgia', serif; font-size: 14px; font-weight: 700;
          padding: 6px 20px; border-radius: 20px; margin-top: 12px;
          letter-spacing: 0.03em; transition: opacity 0.3s;
        }
        @media (min-width: 1024px) {
          .hero-banner-inner { padding-top: clamp(56px, 7vw, 96px) !important; padding-bottom: 56px !important; }
          .carousel-scene { height: 380px !important; }
          .carousel-ring  { width: 160px !important; height: 230px !important; }
        }

        /* GRID — 3 col → 2 col → 1 col */
        .reports-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 960px) {
          .reports-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 560px) {
          .reports-grid { grid-template-columns: 1fr; gap: 16px; }
        }

        /* CARD */
        .report-card {
          position: relative;
          background: linear-gradient(160deg, #fffbf3 0%, #fdf0d8 100%);
          border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 32px rgba(196,122,30,0.10), 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid rgba(196,122,30,0.18);
          text-decoration: none; color: inherit;
        }
        .report-card:hover {
          transform: translateY(-10px) scale(1.012);
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 28px 56px rgba(196,122,30,0.22), 0 8px 16px rgba(0,0,0,0.08);
        }
        .card-img-zone {
          position: relative;
          background: linear-gradient(160deg, #f8e8c0 0%, #e8cc88 60%, #d4a850 100%);
          height: 240px; display: flex; align-items: flex-end; justify-content: center;
          padding: 24px 24px 0; overflow: hidden;
        }
        @media (max-width: 560px) {
          .card-img-zone { height: 200px; }
        }
        .card-img-zone::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,220,120,0.5) 0%, transparent 65%);
          pointer-events: none;
        }
        .card-img-zone::after {
          content: '✦'; position: absolute; top: 12px; right: 16px;
          font-size: 9px; color: rgba(196,122,30,0.35); letter-spacing: 6px; pointer-events: none;
        }
        .card-img-zone img {
          height: 100%; width: auto; max-width: 78%; object-fit: contain; display: block;
          filter: drop-shadow(0 16px 28px rgba(0,0,0,0.38));
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position: relative; z-index: 1;
        }
        .report-card:hover .card-img-zone img { transform: translateY(-12px) scale(1.05) rotate(-1deg); }
        .card-tag {
          position: absolute; top: 14px; left: 14px;
          font-family: sans-serif; font-size: 10.5px; font-weight: 700;
          padding: 4px 10px; border-radius: 20px; letter-spacing: 0.04em;
          backdrop-filter: blur(8px); z-index: 2;
        }
        .card-body { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        @media (max-width: 560px) {
          .card-body { padding: 16px 18px 20px; }
        }
        .card-title { font-family: 'Georgia', serif; font-size: 17px; font-weight: 700; color: #1a0a00; margin: 0; line-height: 1.3; }
        @media (max-width: 560px) {
          .card-title { font-size: 15px; }
        }
        .card-stars { display: flex; align-items: center; gap: 3px; }
        .card-stars span { font-family: sans-serif; font-size: 11px; color: #a08060; margin-left: 4px; }
        .card-desc {
          font-family: sans-serif; font-size: 12.5px; color: #7a5030; line-height: 1.7; margin: 0; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .buy-btn {
          margin-top: 14px; padding: 13px 20px; border-radius: 14px; border: none;
          background: linear-gradient(90deg, #f0a830 0%, #c47a1e 100%);
          color: #fff; font-weight: 700; font-size: 13px; cursor: pointer;
          font-family: sans-serif; letter-spacing: 0.06em; text-transform: uppercase;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          width: 100%; box-shadow: 0 4px 16px rgba(196,122,30,0.35);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .report-card:hover .buy-btn {
          background: linear-gradient(90deg, #f8b840 0%, #d4870e 100%);
          box-shadow: 0 8px 24px rgba(196,122,30,0.55);
        }
        .tabs-wrap { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
        .tab-btn {
          padding: 8px 24px; border-radius: 24px; border: 1.5px solid rgba(196,122,30,0.25);
          background: transparent; font-family: sans-serif; font-size: 13px; font-weight: 600;
          cursor: pointer; color: #7a5030; transition: all 0.2s; letter-spacing: 0.02em;
        }
        .tab-btn.active { border-color: #c47a1e; color: #fff; background: linear-gradient(90deg, #f0a830, #c47a1e); box-shadow: 0 4px 14px rgba(196,122,30,0.3); }
        .tab-btn:not(.active):hover { border-color: #c47a1e; color: #c47a1e; background: rgba(196,122,30,0.06); }
        .section-eyebrow { font-family: sans-serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #c47a1e; margin: 0 0 10px; opacity: 0.9; }
      `}</style>

      <Navbar />

      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #3a1800 40%, #c47a1e 100%)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-banner-inner" style={{ padding: 'clamp(40px,6vw,72px) clamp(16px,6%,80px) 40px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(196,122,30,0.25) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(232,166,58,0.15) 0%, transparent 50%)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#e8c97a', fontFamily: 'sans-serif', margin: '0 0 16px', opacity: 0.9, position: 'relative' }}>
            ॐ &nbsp; Ancient Wisdom · Modern Clarity &nbsp; ॐ
          </p>
          <h1 style={{ fontSize: 'clamp(22px,3.8vw,42px)', fontFamily: 'Georgia,serif', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.2, color: '#fff', position: 'relative' }}>
            The Stars Already Know. It's Time You Did Too.
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.4vw,15px)', color: 'rgba(255,255,255,0.82)', fontFamily: 'sans-serif', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, position: 'relative' }}>
            Every question you've been carrying — about love, career, wealth, purpose —<br />
            has a cosmic answer. Your report reveals it.
          </p>

          <div style={{ position: 'relative', userSelect: 'none' }}>
            <button className="car-arrow" style={{ left: 'clamp(8px,3%,56px)' }} onClick={() => goTo((active - 1 + TOTAL) % TOTAL)}>‹</button>
            <button className="car-arrow" style={{ right: 'clamp(8px,3%,56px)' }} onClick={() => goTo((active + 1) % TOTAL)}>›</button>
            <div className="carousel-scene">
              <div className="carousel-ring" style={{ transform: `rotateY(${angle}deg)` }}>
                {heroBooks.map((src, i) => {
                  const itemAngle = step * i
                  return (
                    <div
                      key={i}
                      className={`carousel-item${i === active ? ' is-active' : ''}`}
                      style={{ transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)` }}
                      onClick={() => goTo(i)}
                    >
                      <img src={src} alt={allReports[i].title} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div><span className="active-label">{allReports[active].title}</span></div>
            <div className="car-dots">
              {heroBooks.map((_, i) => (
                <button key={i} className={`car-dot${i === active ? ' active' : ''}`} onClick={() => goTo(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* REPORTS SECTION */}
      <div id="reports" style={{ background: 'linear-gradient(180deg, #fff9f0 0%, #fff 100%)', padding: 'clamp(48px,6vw,88px) clamp(16px,7%,88px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p className="section-eyebrow">☽ &nbsp; Thousands Guided · Countless Lives Transformed &nbsp; ☾</p>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3.2vw,34px)', fontWeight: 700, color: '#1a0a00', margin: '0 0 12px' }}>
            Your Destiny, Decoded.
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: 14, color: '#7a5030', margin: '0 auto', lineHeight: 1.7, maxWidth: 460 }}>
            Pick the report that speaks to where you are right now — every word written by our Vedic scholars, exclusively for your birth chart.
          </p>
        </div>

        <div className="tabs-wrap">
          {(['all', 'popular', 'trending'] as Tab[]).map(t => (
            <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'all' ? '✦ All Reports' : t === 'popular' ? '🔥 Popular' : '✦ Trending'}
            </button>
          ))}
        </div>

        <div className="reports-grid">
          {filtered.map((r, i) => {
            const tc = tagConfig[r.tag]
            const bc = beamColors[i % beamColors.length]
            const reportData = reportsConfig.find(rc => rc.title === r.title)
            const slug = reportData?.slug ?? ''

            return (
              <Link
                key={r.title}
                to={`/reports/${slug}`}
                className="report-card"
              >
                <BorderBeam
                  size={80}
                  duration={5}
                  delay={i * 0.4}
                  colorFrom={bc.from}
                  colorTo={bc.to}
                  borderThickness={1.5}
                  glowIntensity={1.5}
                  opacity={0.85}
                  speedMultiplier={1.2}
                  beamBorderRadius={24}
                />

                <div className="card-img-zone">
                  {tc && (
                    <div className="card-tag" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.color}40` }}>
                      {tc.label}
                    </div>
                  )}
                  <img src={r.image} alt={r.title} loading="lazy" />
                </div>

                <div className="card-body">
                  <h3 className="card-title">{r.title}</h3>
                  <div className="card-stars">
                    <StarRating rating={r.rating} />
                    <span>{r.rating} · {r.reviews}+ reviews</span>
                  </div>
                  <p className="card-desc">{r.desc}</p>
                  {/* No cart icon — plain text CTA */}
                  <div className="buy-btn">
                    View Report →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </>
  )
}