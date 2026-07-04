import * as LucideIcons from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getReportBySlug } from '../data/reportsConfig'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import Footer from './Footer'
import SEO from './SEO'
import { BorderBeam } from './BorderBeam'
import { motion} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'


// ─── THEME ───────────────────────────────────────────────────
const AMBER       = '#c8791a'
const AMBER_DARK  = '#8b4e0a'
const AMBER_LIGHT = '#e8a84b'
const CREAM       = '#fdf6e9'
const CREAM_DARK  = '#f5ead4'
const BROWN_TEXT  = '#2a1200'
const BROWN_MID   = '#6b3a10'

// ─── Reusable floral SVG ─────────────────────────────────────
function FloralCorner({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isBottomRight = position === 'bottom-right'
  return (
    <svg
      className="floral-svg"
      style={{
        position: 'absolute',
        ...(isBottomRight ? { bottom: 0, right: 0, transform: 'scale(-1)' } : { top: 0, left: 0 }),
        pointerEvents: 'none',
        opacity: 0.55,
      }}
      width="90" height="90" viewBox="0 0 100 100" fill="none"
    >
      <path d="M6 94 Q6 6 94 6" stroke={AMBER} strokeWidth="1.5" fill="none"/>
      <path d="M12 94 Q12 12 94 12" stroke={AMBER_DARK} strokeWidth="0.6" fill="none" opacity="0.5"/>
      <circle cx="18" cy="18" r="5" fill={AMBER} opacity="0.9"/>
      <circle cx="18" cy="18" r="8" stroke={AMBER} strokeWidth="0.8" fill="none" opacity="0.4"/>
      <circle cx="18" cy="18" r="2.5" fill="#fff" opacity="0.6"/>
      <ellipse cx="18" cy="10" rx="2.5" ry="4" fill={AMBER_LIGHT} opacity="0.7"/>
      <ellipse cx="18" cy="26" rx="2.5" ry="4" fill={AMBER_LIGHT} opacity="0.7"/>
      <ellipse cx="10" cy="18" rx="4" ry="2.5" fill={AMBER_LIGHT} opacity="0.7"/>
      <ellipse cx="26" cy="18" rx="4" ry="2.5" fill={AMBER_LIGHT} opacity="0.7"/>
      <ellipse cx="12" cy="12" rx="2" ry="3.5" fill={AMBER} opacity="0.5" transform="rotate(-45 12 12)"/>
      <ellipse cx="24" cy="12" rx="2" ry="3.5" fill={AMBER} opacity="0.5" transform="rotate(45 24 12)"/>
      <ellipse cx="12" cy="24" rx="2" ry="3.5" fill={AMBER} opacity="0.5" transform="rotate(45 12 24)"/>
      <path d="M26 18 Q40 14 52 10 Q64 6 76 8" stroke={AMBER_DARK} strokeWidth="1.2" fill="none"/>
      <path d="M18 26 Q14 40 10 52 Q6 64 8 76" stroke={AMBER_DARK} strokeWidth="1.2" fill="none"/>
      <circle cx="40" cy="13" r="3" fill={AMBER} opacity="0.6"/>
      <ellipse cx="40" cy="9" rx="2" ry="3" fill={AMBER_LIGHT} opacity="0.55"/>
      <ellipse cx="40" cy="17" rx="2" ry="3" fill={AMBER_LIGHT} opacity="0.45"/>
      <circle cx="62" cy="8" r="2.5" fill={AMBER} opacity="0.5"/>
      <ellipse cx="62" cy="4.5" rx="1.5" ry="2.5" fill={AMBER_LIGHT} opacity="0.45"/>
      <circle cx="13" cy="40" r="3" fill={AMBER} opacity="0.6"/>
      <ellipse cx="9" cy="40" rx="3" ry="2" fill={AMBER_LIGHT} opacity="0.55"/>
      <ellipse cx="17" cy="40" rx="3" ry="2" fill={AMBER_LIGHT} opacity="0.45"/>
      <circle cx="8" cy="62" r="2.5" fill={AMBER} opacity="0.5"/>
      <ellipse cx="4.5" cy="62" rx="2.5" ry="1.5" fill={AMBER_LIGHT} opacity="0.45"/>
      <path d="M35 14 Q32 10 30 13" stroke={AMBER} strokeWidth="0.7" fill={AMBER} opacity="0.35"/>
      <path d="M35 14 Q32 18 30 15" stroke={AMBER} strokeWidth="0.7" fill={AMBER} opacity="0.35"/>
      <path d="M14 35 Q10 32 13 30" stroke={AMBER} strokeWidth="0.7" fill={AMBER} opacity="0.35"/>
      <path d="M14 35 Q18 32 15 30" stroke={AMBER} strokeWidth="0.7" fill={AMBER} opacity="0.35"/>
      <circle cx="30" cy="7" r="1.2" fill={AMBER_LIGHT} opacity="0.5"/>
      <circle cx="7" cy="30" r="1.2" fill={AMBER_LIGHT} opacity="0.5"/>
    </svg>
  )
}

// ─── helpers ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
      {children}
    </p>
  )
}

// TO (replace everything until the closing }):
function HowItWorks({ steps }: { steps: { title: string; description: string }[] }) {
  const icons = ['🪔', '📜', '🔮', '✨', '🌙', '⭐']
  const sectionRef = useRef<HTMLDivElement>(null)
  const [spread, setSpread] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSpread(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1rem,4vw,1.5rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The Process</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', color: BROWN_TEXT }}>
          How It Works
        </h2>
      </div>

      {/* DESKTOP — spread cards */}
      <div style={{ display: 'none' }} className="hiw-desktop" ref={sectionRef}>
  <div style={{ position: 'relative', height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((step, i) => {
            const total = steps.length
            const mid = (total - 1) / 2
            const offset = (i - mid) * 320
            const rotate = (i - mid) * 6
            const yOffset = Math.abs(i - mid) * 30

            return (
              <motion.div
                key={i}
                animate={{
  opacity: spread ? 1 : 0,
  x: spread ? offset : 0,
  y: spread ? yOffset : 0,
  rotate: spread ? rotate : 0,
  scale: spread ? 1 : 0.8,
}}
transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
whileHover={{ y: yOffset - 12, rotate: 0, scale: 1.04, zIndex: 10 }}
style={{
  position: 'absolute',
  left: `calc(50% - 150px)`,
  width: 300,
                  background: '#fff',
                  borderRadius: 18,
                  border: `1.5px solid ${AMBER}44`,
                  boxShadow: `0 2px 0 ${AMBER}55, 0 8px 32px ${AMBER}18`,
                  overflow: 'hidden',
                  cursor: 'default',
                  zIndex: i === Math.floor(mid) ? 5 : 1,
                }}
              >
                {/* top wave */}
                <div style={{ height: 8, background: `linear-gradient(90deg, ${AMBER_DARK}, ${AMBER_LIGHT})` }} />

                <div style={{ padding: '1.25rem 1.5rem 0' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icons[i] ?? '✦'}</div>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '0.65rem', fontWeight: 700,
                    color: AMBER_DARK, letterSpacing: '0.15em', textTransform: 'uppercase',
                    background: `${AMBER}15`, border: `1px solid ${AMBER}44`,
                    borderRadius: 20, padding: '3px 12px', marginBottom: '0.75rem',
                  }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{
                    color: BROWN_TEXT, fontFamily: "'Playfair Display', serif",
                    fontSize: '1rem', fontWeight: 700,
                    marginBottom: '0.5rem', lineHeight: 1.35,
                  }}>
                    {step.title}
                  </h3>
                  <div style={{ width: 32, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${AMBER}, transparent)`, marginBottom: '0.6rem' }} />
                  <p style={{ color: BROWN_MID, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                    {step.description}
                  </p>
                </div>

                {/* bottom wave */}
                <div style={{ position: 'relative', height: 60, marginTop: '1.25rem', overflow: 'hidden' }}>
                  <svg viewBox="0 0 400 60" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
                    <path d="M0,35 C80,15 160,50 240,30 C300,15 360,40 400,25 L400,60 L0,60 Z" fill="#e8a84b" opacity="0.5"/>
                    <path d="M0,45 C60,28 140,55 200,40 C270,22 340,50 400,38 L400,60 L0,60 Z" fill="#c47a1e" opacity="0.9"/>
                  </svg>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* MOBILE — vertical stack */}
      <div className="hiw-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: '#fff', borderRadius: 16,
              border: `1.5px solid ${AMBER}44`,
              boxShadow: `0 4px 16px ${AMBER}18`,
              overflow: 'hidden',
            }}
          >
            <div style={{ height: 6, background: `linear-gradient(90deg, ${AMBER_DARK}, ${AMBER_LIGHT})` }} />
            <div style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{icons[i] ?? '✦'}</span>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: '0.6rem', fontWeight: 700,
                  color: AMBER_DARK, letterSpacing: '0.15em', textTransform: 'uppercase',
                  background: `${AMBER}15`, border: `1px solid ${AMBER}44`,
                  borderRadius: 20, padding: '2px 10px',
                }}>
                  Step {i + 1}
                </div>
              </div>
              <h3 style={{ color: BROWN_TEXT, fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                {step.title}
              </h3>
              <p style={{ color: BROWN_MID, fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (min-width: 601px) {
          .hiw-desktop { display: block !important; }
          .hiw-mobile  { display: none !important; }
        }
      `}</style>
    </section>
  )
}

function CheckIcon({ included }: { included: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 22, height: 22, borderRadius: '50%',
      background: included ? `${AMBER}22` : 'rgba(180,60,60,0.1)',
      color: included ? AMBER : '#cc3333',
      fontSize: '0.78rem', flexShrink: 0,
      border: `1px solid ${included ? AMBER + '66' : 'rgba(180,60,60,0.35)'}`,
      fontWeight: 700,
    }}>
      {included ? '✓' : '✗'}
    </span>
  )
}

function FaqItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: '#fff',
        border: `1.5px solid ${open ? AMBER + '66' : 'rgba(139,90,43,0.13)'}`,
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: open ? `0 8px 32px rgba(139,90,43,0.10)` : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'clamp(0.85rem,3vw,1.35rem) clamp(0.85rem,3vw,1.6rem)' }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', fontWeight: 700, color: AMBER, opacity: 0.75, minWidth: 24, flexShrink: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.88rem, 2vw, 1.15rem)', color: BROWN_TEXT, fontWeight: 700, lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <div style={{
          flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
          background: open ? `${AMBER}22` : 'rgba(139,90,43,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease, background 0.2s ease',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke={AMBER_DARK} strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke={AMBER_DARK} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ padding: '0 clamp(0.85rem,3vw,1.6rem) clamp(0.85rem,3vw,1.35rem)' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${AMBER}66, transparent)`, marginBottom: '0.9rem' }} />
          <p style={{ margin: 0, fontSize: 'clamp(0.82rem,2vw,1rem)', color: BROWN_MID, lineHeight: 1.85 }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

const ctaBtn: React.CSSProperties = {
  display: 'inline-block',
  background: `linear-gradient(135deg, ${AMBER}, ${AMBER_LIGHT})`,
  color: '#fff',
  padding: '0.95rem 2.5rem',
  borderRadius: 8, fontWeight: 700, fontSize: '1rem',
  textDecoration: 'none',
  boxShadow: `0 4px 18px ${AMBER}55`,
  letterSpacing: '0.03em', border: 'none', cursor: 'pointer',
}

// ─── PAGE ────────────────────────────────────────────────────
export default function ReportDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const report = getReportBySlug(slug ?? '')
  const [angle, setAngle] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setAngle(a => (a + 0.3) % 360), 16)
    return () => clearInterval(t)
  }, [])

  if (!report) {
    return (
      <div style={{ background: CREAM, minHeight: '100vh', color: BROWN_TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
        <SEO
          title="Report Not Found | Divine Arra"
          description="The astrology report you're looking for could not be found. Browse our full range of Vedic astrology reports at Divine Arra."
          url="/reports"
        />
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: BROWN_TEXT, marginBottom: '1rem' }}>Report Not Found</h1>
          <p style={{ color: BROWN_MID, marginBottom: '2rem' }}>We couldn't find a report matching <strong>"{slug}"</strong>.</p>
          <Link to="/reports" style={{ ...ctaBtn }}>View All Reports</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const allFeatureLabels: string[] = []
  report.pricingPlans.forEach(plan => {
    plan.features.forEach(f => {
      if (!allFeatureLabels.includes(f.label)) allFeatureLabels.push(f.label)
    })
  })

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: BROWN_TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <SEO
        title={`${report.title} | Vedic Astrology Report | Divine Arra`}
        description={report.tagline || report.whatIs?.description?.slice(0, 155) || `Get your personalized ${report.title} from Divine Arra's expert Vedic astrologers.`}
        image={report.image}
        url={`/reports/${slug}`}
      />
      <Navbar />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        img { max-width: 100%; height: auto; display: block; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .rp-hero-anim { animation: fadeSlideUp 0.45s ease forwards; }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .rp-hero {
  background: linear-gradient(135deg, #c47a1e 0%, #b8691a 100%);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;          /* was space-between — center reads better once content is capped in width */
  gap: clamp(24px, 4vw, 64px);
  padding: clamp(48px, 7vw, 110px) clamp(20px, 8%, 140px) clamp(64px, 8vw, 120px);
  min-height: clamp(420px, 46vw, 720px);   /* was missing entirely — this was the main reason it looked small */
  position: relative;
  overflow: hidden;
}
.rp-hero-left {
  flex: 1 1 0;
  min-width: 0;
  max-width: 640px;                 /* was 520px */
  z-index: 2;
}
.rp-hero-right {
  flex-shrink: 0;
  position: relative;
  width: clamp(200px, 32vw, 580px);   /* was capped at 480px */
  height: clamp(200px, 32vw, 580px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
        .rp-chakra {
          position: absolute;
          top: 50%; left: 50%;
          width: 100%; height: 100%;
          object-fit: contain;
          opacity: 0.42;
          pointer-events: none;
          z-index: 0;
        }
        .rp-slide-img {
          position: relative;
          z-index: 1;
          width: 55%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rp-slide-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
        .rp-hero-badge {
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 20px;
          padding: 4px 14px;
          font-size: 11px;
          margin-bottom: 16px;
          display: inline-block;
          letter-spacing: 0.12em;
          font-weight: 600;
          max-width: 100%;
          word-break: break-word;
        }
        .rp-hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .rp-hero-btns a {
          white-space: nowrap;
        }
          @media (min-width: 1440px) {
  .rp-hero { padding-left: 100px; padding-right: 100px; }
}
        .hero-stats {
          display: flex;
          gap: 0.75rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .hero-stat-box {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 10px;
          padding: 0.5rem 0.9rem;
          text-align: center;
          flex: 1 1 auto;
          min-width: 80px;
        }

        /* ── HERO: tablet ── */
        @media (max-width: 900px) and (min-width: 641px) {
          .rp-hero-right { width: 240px; height: 240px; }
          .rp-hero { padding: 48px 32px 64px; gap: 24px; }
        }

        /* ── HERO: mobile ── */
        @media (max-width: 640px) {
          .rp-hero {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 36px 20px 56px;
            gap: 24px;
          }
          .rp-hero-left  { max-width: 100%; order: 2; width: 100%; }
          .rp-hero-right { order: 1; width: 200px; height: 200px; flex-shrink: 0; }
          .rp-hero-btns  { justify-content: center; }
          .hero-stats    { justify-content: center; }
          .rp-hero-btns a { flex: 1 1 auto; text-align: center; min-width: 0; }
        }

        @media (max-width: 380px) {
          .rp-hero-right { width: 150px !important; height: 150px !important; }
          .rp-hero { padding: 28px 16px 44px; }
          .rp-hero-btns a { width: 100%; }
        }

        /* ══════════════════════════════
           FLORAL
        ══════════════════════════════ */
        .floral-svg { transition: opacity 0.2s; }
        @media (max-width: 480px) {
          .floral-svg { width: 60px !important; height: 60px !important; opacity: 0.35 !important; }
        }

        /* ══════════════════════════════
           WHAT IS  (image above text on mobile)
        ══════════════════════════════ */
        .what-is-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }
        @media (max-width: 640px) {
          .what-is-grid > *:first-child { order: 2; }
          .what-is-grid > *:last-child  { order: 1; }
        }

        /* ══════════════════════════════
           WHAT'S INSIDE
        ══════════════════════════════ */
        .whats-inside-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 480px) {
          .whats-inside-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ══════════════════════════════
           FOR WHOM
        ══════════════════════════════ */
        .for-whom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 480px) {
          .for-whom-grid { grid-template-columns: 1fr; }
        }

        /* ══════════════════════════════
           PRICING TABLE
        ══════════════════════════════ */
        .pricing-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          /* hint for mobile that there's scrollable content */
          border-radius: 16px;
          box-shadow: 0 8px 32px ${AMBER}1a;
          border: 1px solid ${AMBER}30;
        }
        .pricing-table {
          min-width: 480px;
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #fff;
        }
        @media (max-width: 560px) {
          .pricing-table th,
          .pricing-table td {
            padding: 0.6rem 0.5rem !important;
            font-size: 0.72rem !important;
          }
        }
        @media (max-width: 400px) {
          .pricing-table { min-width: 380px; }
          .pricing-table th,
          .pricing-table td {
            padding: 0.5rem 0.4rem !important;
            font-size: 0.65rem !important;
          }
        }

        /* ══════════════════════════════
           PRICING CARDS
        ══════════════════════════════ */
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
          gap: 1.25rem;
          margin-top: 2rem;
        }
        @media (max-width: 480px) {
          .pricing-cards-grid { grid-template-columns: 1fr; }
        }

        /* ══════════════════════════════
           ABOUT
        ══════════════════════════════ */
        .about-grid {
          max-width: 1050px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 4.5rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
          gap: 0.55rem;
        }
        @media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 340px 1fr;
    gap: 3rem;
  }
}
        @media (max-width: 700px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
            gap: 2rem;
          }
          .about-photo { max-width: 280px !important; width: 100% !important; }
          .about-stats-grid { justify-items: center; }
          blockquote { text-align: left !important; }
        }

        /* ══════════════════════════════
           CTA ANIMATIONS
        ══════════════════════════════ */
        @keyframes ctaPulseRing {
          0%   { transform: scale(0.85); opacity: 0.5; }
          70%  { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes ctaGlowBtn {
          0%, 100% { box-shadow: 0 4px 24px rgba(255,255,255,0.35), 0 0 0 0 rgba(255,255,255,0.2); }
          50%       { box-shadow: 0 8px 40px rgba(255,255,255,0.55), 0 0 0 10px rgba(255,255,255,0.0); }
        }
        @keyframes ctaShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ctaFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaOrbit {
          from { transform: rotate(0deg) translateX(220px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(220px) rotate(-360deg); }
        }
        @keyframes ctaOrbit2 {
          from { transform: rotate(180deg) translateX(160px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(160px) rotate(-540deg); }
        }
        @media (max-width: 480px) {
          @keyframes ctaOrbit {
            from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
          }
          @keyframes ctaOrbit2 {
            from { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
            to   { transform: rotate(540deg) translateX(80px) rotate(-540deg); }
          }
        }
        .cta-btn-wrap {
          position: relative;
          display: inline-block;
          max-width: 100%;
        }
        .cta-pulse-ring {
          position: absolute; inset: -8px; border-radius: 60px;
          border: 2px solid rgba(255,255,255,0.5);
          animation: ctaPulseRing 2s ease-out infinite;
        }
        .cta-btn {
          position: relative; z-index: 1; display: inline-block;
          background: #fff; color: ${AMBER_DARK};
          font-weight: 700; font-size: clamp(0.88rem, 2vw, 1.05rem);
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 2.4rem);
          border-radius: 50px; text-decoration: none; letter-spacing: 0.02em;
          background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,215,100,0.35) 50%, rgba(255,255,255,0) 60%, transparent 100%);
          background-size: 200% auto;
          animation: ctaGlowBtn 2.5s ease-in-out infinite, ctaShimmer 3.5s linear infinite;
          transition: transform 0.2s ease;
          border: none; cursor: pointer; white-space: nowrap;
          max-width: 100%;
        }
        .cta-btn:hover { transform: scale(1.05) translateY(-2px); }

        /* ══════════════════════════════
           REDUCED MOTION
        ══════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .rp-hero-anim { animation: none; }
          .cta-btn { animation: none; }
          .cta-pulse-ring { animation: none; }
        }

        /* ══════════════════════════════
           GLOBAL SMALL-SCREEN SAFETY
        ══════════════════════════════ */
        @media (max-width: 420px) {
          .rp-hero-badge { font-size: 9px; padding: 3px 10px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="rp-hero">
        <div className="rp-hero-anim rp-hero-left">
          <span className="rp-hero-badge">
            ✦ Exclusive Report by Astro Aaditya Narayan
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(18px, 3.4vw, 56px)', fontWeight: 800, lineHeight: 1.2, margin: '12px 0 14px' }}>
            {report.tagline}
          </h1>
          <p style={{ fontSize: 'clamp(12px, 1.4vw, 15px)', opacity: 0.88, marginBottom: 12, fontStyle: 'italic' }}>
            {report.subtitle}
          </p>
          <p style={{ fontSize: 'clamp(12px, 1.4vw, 15px)', opacity: 0.82, marginBottom: 28, lineHeight: 1.7 }}>
            {report.heroDescription}
          </p>
          <div className="rp-hero-btns">
            <a href="#pricing" style={{ background: '#fff', color: AMBER_DARK, border: '2px solid #fff', padding: '12px 26px', borderRadius: 30, fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
              Get Your {report.title} →
            </a>
          </div>
          <div className="hero-stats">
  {[['2 Lakh+', 'Kundlis Analyzed'], ['4.9/5 ★', 'Avg Rating'], ['100%', 'Personalized']].map(([v, l]) => (
    <div key={l} className="hero-stat-box">
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 800 }}>{v}</div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)', opacity: 0.85, marginTop: 3, fontWeight: 700 }}>{l}</div>
    </div>
  ))}
</div>
        </div>

        <div className="rp-hero-right">
          <img src="/chakra.png" alt="" className="rp-chakra" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }} />
          <div className="rp-hero-anim rp-slide-img">
            <img src={`/reports/${report.title}.png`} alt={report.title} />
          </div>
        </div>
      </section>

      {/* ── WHAT IS ── */}
<section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
  <div className="what-is-grid">
    <div>
      <SectionLabel>What is the {report.title}?</SectionLabel>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: BROWN_TEXT, marginBottom: '1.25rem', lineHeight: 1.35 }}>
        {report.whatIs.heading}
      </h2>
      <p style={{ color: BROWN_MID, lineHeight: 1.85, marginBottom: '2rem', fontSize: 'clamp(1rem, 1.8vw, 1.1rem)' }}>
        {report.whatIs.description}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {report.whatIs.bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: BROWN_TEXT, fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.65 }}>
            <span style={{ color: AMBER, marginTop: 3, flexShrink: 0, fontSize: '0.8rem' }}>◆</span>
            {b}
          </li>
        ))}
      </ul>
      <button
        onClick={() => document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ ...ctaBtn, width: '100%', maxWidth: 320, fontSize: '1.1rem' }}
      >
        Order Now
      </button>
    </div>

    <div style={{
      borderRadius: 20, overflow: 'hidden',
      boxShadow: `0 8px 32px ${AMBER}22`,
      border: `1px solid ${AMBER}33`,
      background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <img src={report.image} alt={report.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }} />
      <BorderBeam size={120} duration={6} colorFrom="#c8791a" colorTo="#e8a84b" glowIntensity={2} />
    </div>
  </div>
</section>

      {/* ── WHAT'S INSIDE ── */}
      <section id="whats-inside" style={{
        background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`,
        padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ✦ &nbsp; Inside Your Report &nbsp; ✦
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#fff', marginBottom: 0, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
              What's Included in Your {report.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.9rem' }}>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem' }}>✦</span>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </div>
          </div>

          <div className="whats-inside-grid">
            {report.whatsInside.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5, boxShadow: `0 16px 40px rgba(0,0,0,0.18)` }}
                style={{
                  position: 'relative',
                  background: CREAM,
                  borderRadius: 14,
                  padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  cursor: 'default',
                }}
              >
                <FloralCorner position="top-left" />
                <FloralCorner position="bottom-right" />

                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: `0 4px 14px ${AMBER}55`,
                  position: 'relative', zIndex: 1,
                }}>
                  {(() => {
                    const Icon = (LucideIcons as unknown as Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>>)[item.icon]
                    return Icon ? <Icon size={22} color="#fff" strokeWidth={1.8} /> : null
                  })()}
                </div>

                <h3 style={{ color: BROWN_TEXT, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', marginBottom: '0.5rem', fontWeight: 700, position: 'relative', zIndex: 1 }}>
                  {item.title}
                </h3>
                <div style={{ width: 28, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${AMBER}, transparent)`, marginBottom: '0.6rem' }} />
                <p style={{ color: BROWN_MID, fontSize: 'clamp(0.8rem, 1.4vw, 0.875rem)', lineHeight: 1.72, margin: 0, position: 'relative', zIndex: 1 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks steps={report.steps} />

      {/* ── FOR WHOM ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(3rem,6vw,6rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

  <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <span style={{
        display: 'inline-block', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 20, padding: '0.3rem 1rem', fontSize: '0.7rem', fontWeight: 700,
        color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
      }}>
        Who Is This For?
      </span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.3rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.25 }}>
        This Report Is Made for You If…
      </h2>
      <div style={{ width: 56, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.4)', margin: '0 auto' }} />
    </div>

    <div className="for-whom-grid">
      {report.forWhom.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -4, boxShadow: `0 12px 36px rgba(0,0,0,0.2)` }}
          style={{
            background: CREAM, borderRadius: 18,
            padding: 'clamp(1.25rem,3vw,1.75rem)',
            border: `1px solid ${AMBER}22`,
            boxShadow: `0 2px 12px ${AMBER}0f`,
            cursor: 'default', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${AMBER_DARK}, ${AMBER_LIGHT})`, borderRadius: '18px 18px 0 0' }} />
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
            border: 'none',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.95rem',
            fontFamily: "'Playfair Display', serif",
            boxShadow: `0 4px 14px ${AMBER}44`, marginBottom: '1.1rem',
          }}>
            {i + 1}
          </div>
          <div style={{ color: BROWN_TEXT, fontWeight: 700, fontSize: 'clamp(0.9rem,1.8vw,1rem)', marginBottom: '0.4rem', fontFamily: "'Playfair Display', serif" }}>
            {item.title}
          </div>
          <div style={{ color: BROWN_MID, fontSize: 'clamp(0.8rem,1.4vw,0.86rem)', lineHeight: 1.7 }}>
            {item.description}
          </div>
          <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${AMBER}0a`, pointerEvents: 'none' }} />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 3.4vw, 2.3rem)', color: BROWN_TEXT, margin: 0, lineHeight: 1.3 }}>
            Choose your perfect <span style={{ color: AMBER }}>Features Of {report.title}</span>
          </h2>
        </div>

        {/* Scroll hint label for mobile */}
        <p style={{ display: 'none', textAlign: 'center', fontSize: '0.72rem', color: BROWN_MID, marginBottom: '0.5rem' }} className="pricing-scroll-hint">
          ← Scroll to compare →
        </p>
        <style>{`
          @media (max-width: 560px) {
            .pricing-scroll-hint { display: block !important; }
          }
        `}</style>

        <div className="pricing-scroll">
          <table className="pricing-table">
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left', padding: '1.1rem 1.5rem',
                  background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                  color: '#fff', fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.8rem,1.8vw,1rem)', fontWeight: 700,
                  borderTopLeftRadius: 16, borderRight: '1px solid rgba(255,255,255,0.5)',
                }}>
                  Features
                </th>
                {report.pricingPlans.map((plan, i) => (
                  <th key={i} style={{
                    textAlign: 'center', padding: '1.1rem 1.25rem',
                    background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                    color: '#fff', fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.8rem,1.8vw,1rem)', fontWeight: 700, lineHeight: 1.35,
                    borderTopRightRadius: i === report.pricingPlans.length - 1 ? 16 : 0,
                    borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(255,255,255,0.5)' : 'none',
                    minWidth: 120,
                  }}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatureLabels.map((label, rowIdx) => (
                <tr key={label} style={{ background: rowIdx % 2 === 0 ? CREAM : '#fff' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: BROWN_TEXT, fontSize: 'clamp(0.78rem,1.5vw,0.92rem)', whiteSpace: 'nowrap', borderRight: '2px solid rgba(200,121,26,0.35)' }}>
                    {label}
                  </td>
                  {report.pricingPlans.map((plan, i) => {
                    const feature = plan.features.find(f => f.label === label)
                    return (
                      <td key={i} style={{ textAlign: 'center', padding: '1rem 1.25rem', borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none' }}>
                        <CheckIcon included={feature ? feature.included : false} />
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr style={{ background: CREAM_DARK }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: BROWN_TEXT, fontSize: 'clamp(0.82rem,1.5vw,0.95rem)', borderBottomLeftRadius: 16, borderRight: '2px solid rgba(200,121,26,0.35)' }}>
                  Price
                </td>
                {report.pricingPlans.map((plan, i) => (
                  <td key={i} style={{
                    textAlign: 'center', padding: '1.25rem 1.25rem',
                    borderBottomRightRadius: i === report.pricingPlans.length - 1 ? 16 : 0,
                    borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                      <span style={{ color: AMBER_DARK, fontSize: 'clamp(0.95rem,2.5vw,1.3rem)', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                        {plan.discountedPrice}/-
                      </span>
                      <span style={{ color: '#bbb', textDecoration: 'line-through', fontSize: '0.78rem' }}>
                        {plan.originalPrice}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── PRICING CARDS ── */}
        <div className="pricing-cards-grid" id="pricing-cards">
          {report.pricingPlans.map((plan, i) => {
            const colors = ['#c8791a', '#8b4e0a', '#8b4e0a']
            const color = colors[i] ?? colors[0]
            const liquidY = [78, 65, 50][i] ?? 70

            return (
              <div
                key={i}
                onClick={() => navigate(`/checkout/report/${slug}?plan=${i}`)}
                style={{
                  background: `
  radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.95) 0%, transparent 50%),
  radial-gradient(ellipse at 85% 85%, ${AMBER}33 0%, transparent 55%),
  radial-gradient(ellipse at 85% 15%, ${AMBER_LIGHT}22 0%, transparent 40%),
  radial-gradient(ellipse at 15% 85%, ${AMBER_DARK}15 0%, transparent 40%),
  linear-gradient(135deg, #fffdf8 0%, #fdf3e0 40%, #f5e0b8 100%)
`,

                  border: i === 1 ? `2px solid ${color}` : `1.5px solid ${color}44`,
                  borderRadius: 18,
                  padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.25rem)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: i === 1 ? `0 8px 32px ${color}33` : `0 4px 16px ${color}15`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${color}33`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = i === 1 ? `0 8px 32px ${color}33` : `0 4px 16px ${color}15`
                }}
              >
                <div style={{
  position: 'absolute', top: 12, left: 12,
  width: 70, height: 70, borderRadius: '50%',
  background: 'transparent',
  border: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflow: 'hidden',
}}>
  <img src="/logo.jpeg" alt="Brand" style={{ width: '72%', height: '72%', objectFit: 'contain' }} />
</div>
                {i === 1 && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: color, color: '#fff',
                    fontSize: '0.6rem', fontWeight: 800,
                    padding: '3px 10px', borderRadius: 100,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    Best Value
                  </div>
                )}

                {/* Animated liquid-fill circle */}
                <div style={{ width: 'min(160px, 80%)', aspectRatio: '1', margin: '0 auto 1rem', position: 'relative' }}>
                  <svg viewBox="0 0 160 160" width="100%" height="100%">
                    <defs>
                      <clipPath id={`liquidClip-${i}`}>
                        <circle cx="80" cy="80" r="70" />
                      </clipPath>
                    </defs>
                    <circle cx="80" cy="80" r="76" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
                    <circle cx="80" cy="80" r="70" fill="#fff" stroke={color} strokeWidth="2.5" />
                    <g clipPath={`url(#liquidClip-${i})`}>
                      {/* Back wave — slower, more transparent */}
                      <path
                        d={`M-160 ${liquidY} Q-140 ${liquidY - 11} -120 ${liquidY} Q-100 ${liquidY + 11} -80 ${liquidY} Q-60 ${liquidY - 11} -40 ${liquidY} Q-20 ${liquidY + 11} 0 ${liquidY} Q20 ${liquidY - 11} 40 ${liquidY} Q60 ${liquidY + 11} 80 ${liquidY} Q100 ${liquidY - 11} 120 ${liquidY} Q140 ${liquidY + 11} 160 ${liquidY} Q180 ${liquidY - 11} 200 ${liquidY} Q220 ${liquidY + 11} 240 ${liquidY} Q260 ${liquidY - 11} 280 ${liquidY} Q300 ${liquidY + 11} 320 ${liquidY} V160 H-160 Z`}
                        fill={color}
                        opacity="0.5"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          from="0 0"
                          to="160 0"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>
                      {/* Front wave — faster, more opaque */}
                      <path
                        d={`M-160 ${liquidY + 5} Q-130 ${liquidY - 7} -100 ${liquidY + 5} Q-70 ${liquidY + 17} -40 ${liquidY + 5} Q-10 ${liquidY - 7} 20 ${liquidY + 5} Q50 ${liquidY + 17} 80 ${liquidY + 5} Q110 ${liquidY - 7} 140 ${liquidY + 5} Q170 ${liquidY + 17} 200 ${liquidY + 5} Q230 ${liquidY - 7} 260 ${liquidY + 5} Q290 ${liquidY + 17} 320 ${liquidY + 5} V160 H-160 Z`}
                        fill={color}
                        opacity="0.92"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          from="0 0"
                          to="120 0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                    <image
                      href={`/reports/${report.title}.png`}
                      x="30" y="20" width="100" height="120"
                      preserveAspectRatio="xMidYMid meet"
                      style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))' }}
                    />
                  </svg>

                  {i === 1 && (
                    <div style={{
                      position: 'absolute', bottom: -4, right: -4,
                      width: 52, height: 52, borderRadius: '50%',
                      background: '#fff', border: `2.5px solid ${color}`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      <img src="/check.png" alt="Consultation" style={{ width: '78%', height: '78%', objectFit: 'contain' }} />
                    </div>
                  )}
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 700, color: BROWN_TEXT, margin: '0 0 0.3rem', lineHeight: 1.3 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: BROWN_MID, margin: '0 0 0.85rem', lineHeight: 1.5 }}>
                  {plan.tagline}
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
  color: '#494949ea', 
  fontSize: '0.95rem', 
  fontWeight: 700, 
  textDecoration: 'line-through', 
  display: 'block', 
  marginBottom: 2 
}}>
  {plan.originalPrice}
</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 800, color }}>
                    {plan.discountedPrice}/-
                  </span>
                  <span style={{ fontSize: '0.95rem', color: BROWN_MID, marginLeft: 4 }}>only</span>
                </div>

                <div style={{
                  background: color, color: '#fff', fontWeight: 800, fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  padding: '0.65rem 1rem', borderRadius: 50, letterSpacing: '0.04em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: `0 4px 14px ${color}44`,
                }}>
                  BUY NOW →
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,3rem)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="about-grid">
          <div className="about-photo" style={{ position: 'relative', width: '100%', maxWidth: 420}}>
            <img
              src="/Aaditya.png" alt="Astro Aaditya Narayan"
              style={{ width: '100%', height: 'auto', maxHeight: 560, objectFit: 'cover', objectPosition: 'top center', display: 'block', borderRadius: 18 }}
            />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.72rem', color: '#fff', fontWeight: 600 }}>
                📜 Know Your Astrologer
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: '0.9rem', lineHeight: 1.2 }}>
              Meet Astro Aaditya Narayan
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontSize: 'clamp(0.95rem,1.8vw,1.05rem)', marginBottom: '1.1rem' }}>
              Astro Aaditya Narayan is the guiding force behind Divine Arra — helping people understand their kundali, planetary influences, karmic patterns, and remedies through years of Vedic astrology practice. His consultations are clear, compassionate, and practical, bringing awareness and direction rather than fear.
            </p>
            <blockquote style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderLeft: '3px solid rgba(255,255,255,0.5)', borderRadius: 8,
              padding: '0.75rem 1rem', marginBottom: '1.4rem', marginLeft: 0, marginRight: 0,
              fontStyle: 'italic', color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(0.9rem,1.6vw,1rem)', lineHeight: 1.65,
            }}>
              "Astrology is not about fear — it is about awareness, alignment, and awakening your inner power."
            </blockquote>
            <div className="about-stats-grid">
              {[['100K+','Consultations Delivered'],['9+','Years of Experience'],['59+','Years of Legacy'],['8+','Professional Awards'],['30K+','Hours of Expert Guidance']].map(([v, l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '0.5rem 0.5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 800, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 'clamp(0.6rem,1vw,0.68rem)', color: 'rgba(255,255,255,0.65)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <section style={{ background: CREAM_DARK, padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: `${AMBER}18`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: `${AMBER_DARK}10`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2.8rem' }}>
            <span style={{
              display: 'inline-block', background: `${AMBER}22`, border: `1px solid ${AMBER}55`,
              borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.7rem', fontWeight: 700,
              color: AMBER_DARK, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.9rem',
            }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', color: BROWN_TEXT, lineHeight: 1.2, margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ marginTop: '0.75rem', width: 48, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})` }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {report.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(3rem,8vw,5.5rem) clamp(1rem,3vw,1.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', animation: 'ctaOrbit 9s linear infinite', transformOrigin: '0 0' }} />
          <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.13)', animation: 'ctaOrbit2 13s linear infinite', transformOrigin: '0 0' }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.1s', marginBottom: '1.2rem' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(8px)' }} />
              <span style={{ fontSize: 'clamp(2.4rem,5vw,3.2rem)', position: 'relative', zIndex: 1 }}>{report.icon}</span>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: '#fff', marginBottom: '0.8rem', lineHeight: 1.25, animation: 'ctaFadeUp 0.6s ease both 0.2s' }}>
            Ready to Unlock Your {report.title}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', marginBottom: '2.4rem', lineHeight: 1.8, fontSize: 'clamp(0.9rem,2vw,1.02rem)', animation: 'ctaFadeUp 0.6s ease both 0.35s' }}>
            {report.tagline}
          </p>
          <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.5s' }}>
  <div className="cta-btn-wrap">
    <div className="cta-pulse-ring" />
    <a
      href="#pricing"
      className="cta-btn"
      style={{
        background: '#fff',
        color: AMBER_DARK,
        border: '2px solid #fff',
        padding: '18px 26px',
        borderRadius: 30,
        fontWeight: 700,
        fontSize: 17,
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      Order Your Report →
    </a>
  </div>
</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.62rem,1.5vw,0.75rem)', marginTop: '1.2rem', letterSpacing: '0.04em', animation: 'ctaFadeUp 0.6s ease both 0.65s' }}>
            ✦ Delivered within 24 hours &nbsp;·&nbsp; 100% personalised &nbsp;·&nbsp; Secure checkout
          </p>
        </div>
      </section>

    </div>
  )
}
