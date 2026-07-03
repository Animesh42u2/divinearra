import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getConsultationBySlug } from '../data/Consultationsconfig'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import Footer from './Footer'
import { BorderBeam } from './BorderBeam'
import { motion} from 'framer-motion'
import { useRef } from 'react'

// ─── THEME ───────────────────────────────────────────────────
const AMBER       = '#c8791a'
const AMBER_DARK  = '#8b4e0a'
const AMBER_LIGHT = '#e8a84b'
const CREAM       = '#fdf6e9'
const CREAM_DARK  = '#f5ead4'
const BROWN_TEXT  = '#2a1200'
const BROWN_MID   = '#6b3a10'

// ─── helpers ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
      {children}
    </p>
  )
}

function HowItWorks({ steps }: { steps: { title: string; description: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const icons = [
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="9" y="12" width="24" height="22" rx="3" fill={AMBER_DARK} />
      <rect x="9" y="12" width="24" height="6" rx="3" fill={AMBER_DARK} />
      <line x1="14" y1="9" x2="14" y2="15" stroke={AMBER_DARK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="9" x2="28" y2="15" stroke={AMBER_DARK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="13" y="22" width="4" height="4" rx="1" fill="#fff" />
      <rect x="19" y="22" width="4" height="4" rx="1" fill="#fff" />
      <rect x="13" y="28" width="4" height="4" rx="1" fill="#fff" />
      <circle cx="32" cy="33" r="9" fill={AMBER} stroke="#fff" strokeWidth="2" />
      <path d="M32 28v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M14 8h14l8 8v22a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill={AMBER_DARK} />
      <path d="M28 8v8h8" fill={AMBER_DARK} opacity="0.6" />
      <line x1="17" y1="23" x2="29" y2="23" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="28" x2="25" y2="28" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="33" r="9" fill={AMBER} stroke="#fff" strokeWidth="2" />
      <circle cx="32" cy="30" r="2.4" fill="#fff" />
      <path d="M27 37c0-3 2.5-5 5-5s5 2 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>,
    <svg viewBox="0 0 48 48" fill="none">
      <rect x="7" y="11" width="26" height="19" rx="3" fill={AMBER_DARK} />
      <rect x="11" y="15" width="18" height="11" rx="1.5" fill="#fff" opacity="0.18" />
      <line x1="20" y1="30" x2="20" y2="34" stroke={AMBER_DARK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="13" y1="36" x2="27" y2="36" stroke={AMBER_DARK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="33" r="9" fill={AMBER} stroke="#fff" strokeWidth="2" />
      <path d="M28 30h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2l-2 2v-2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" fill="#fff" />
    </svg>,
  ]

  return (
    <section ref={sectionRef} style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'clamp(2.5rem,6vw,5rem) clamp(1rem,4vw,1.5rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The Process</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2.1rem)', color: BROWN_TEXT }}>
          How It Works
        </h2>
      </div>

      <style>{`
        html, body { max-width: 100vw; }

        .hiw-track-wrap { position: relative; }

        .hiw-row3 {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: clamp(1.5rem, 4vw, 3rem);
          position: relative;
        }

        .hiw-step {
          flex: 1;
          max-width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          padding-top: 38px;
        }
          
        .hiw-card {
          position: relative;
          background: linear-gradient(165deg, #fffdf8 0%, #fdf6e9 100%);
          border-radius: 18px;
          padding: 2.3rem 1.5rem 1.6rem;
          width: 100%;
          border: 1.5px solid transparent;
          background-image: linear-gradient(165deg, #fffdf8 0%, #fdf6e9 100%),
                             linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 50%, ${AMBER_LIGHT} 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          box-shadow: 0 1px 2px rgba(43,18,0,0.04), 0 12px 28px rgba(43,18,0,0.07);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
          z-index: 5;
        }
        .hiw-step:hover .hiw-card {
          transform: translateY(-8px);
          box-shadow: 0 4px 10px rgba(43,18,0,0.06), 0 24px 48px rgba(200,121,26,0.18);
          border-color: rgba(200,121,26,0.4);
        }
        .pc-chakra-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 100%;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: stretch;
    }
    .pc-chakra-img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0.5;
      pointer-events: none;
      z-index: 0;
    }
    .pc-slide-img2 {
      position: relative;
      z-index: 1;
      width: 78%;
      height: 92%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pc-slide-img2 img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
        /* Badge — solid gradient fill, plain number, nothing else */
        .hiw-badge {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(150deg, ${AMBER_DARK}, ${AMBER});
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.05rem;
          font-family: 'Playfair Display', serif;
          box-shadow: 0 0 0 5px #fdf6e9, 0 0 0 6px rgba(200,121,26,0.25), 0 6px 16px rgba(139,78,10,0.4);
          position: absolute;
          top: 17px;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .hiw-step:hover .hiw-badge { transform: translate(-50%, -50%) scale(1.1) rotate(-4deg); }

        /* icon circle with dashed ring + sparkles */
        .hiw-icon-wrap {
          position: relative;
          width: 96px; height: 96px;
          margin: 0.5rem auto 0.9rem;
        }
        .hiw-icon-dashring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1.5px dashed ${AMBER}77;
          animation: hiwSpin 22s linear infinite;
        }
        @keyframes hiwSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .hiw-icon-circle {
          position: absolute; inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff 0%, ${AMBER}22 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .hiw-icon-circle svg { width: 48px; height: 48px; }
        .hiw-sparkle {
          position: absolute;
          color: ${AMBER};
          font-size: 10px;
          opacity: 0.7;
        }

        /* ornamental divider */
        .hiw-divider {
          display: flex; align-items: center; justify-content: center;
          gap: 0.4rem;
          margin: 0.2rem 0 0.8rem;
        }
        .hiw-divider-line { width: 30px; height: 1px; background: ${AMBER}88; }
        .hiw-divider-icon { color: ${AMBER}; font-size: 0.6rem; }

        .hiw-card h3 {
          color: ${BROWN_TEXT}; font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 2vw, 1.1rem); margin: 0 0 0.6rem;
        }
        .hiw-card p {
          color: ${BROWN_MID}; font-size: clamp(0.8rem, 1.5vw, 0.88rem);
          line-height: 1.7; margin: 0 0 1rem;
        }

        .hiw-bottom-flourish {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem;
        }
        .hiw-bottom-line { width: 26px; height: 1px; background: ${AMBER}66; }
        .hiw-bottom-icon { color: ${AMBER}; font-size: 0.85rem; }

        /* connecting line, centered exactly on the badges */
        .hiw-line {
          position: absolute;
          top: 17px;
          left: 16.666%; right: 16.666%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, ${AMBER}88 10%, ${AMBER}88 90%, transparent);
          z-index: 0;
        }
        .hiw-line-dot {
          position: absolute; top: 17px;
          width: 7px; height: 7px; border-radius: 50%;
          background: ${AMBER}; transform: translate(-50%,-50%);
          box-shadow: 0 0 0 3px #fdf6e9;
          z-index: 1;
        }

        /* premium traveling arrow — gold gradient stroke + pulsing glow + comet trail */
        .hiw-arrow-wrap {
          position: absolute;
          top: 17px;
          left: 16.666%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          transform: translate(-50%, -50%);
          z-index: 2;
          animation: hiwArrowMove 3.4s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        .hiw-arrow-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, ${AMBER}55 0%, ${AMBER}00 70%);
          filter: blur(3px);
          animation: hiwArrowPulse 1.5s ease-in-out infinite;
        }
        .hiw-arrow-trail {
          position: absolute;
          top: 50%;
          right: 100%;
          width: 22px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, ${AMBER}99);
          transform: translateY(-50%);
        }
        .hiw-arrow-wrap svg {
          position: relative;
          filter: drop-shadow(0 2px 5px rgba(139,78,10,0.5));
        }
        @keyframes hiwArrowPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
        @keyframes hiwArrowMove {
          0%   { left: 16.666%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 83.333%; opacity: 0; }
        }

        @media (max-width: 768px) {
          .hiw-row3 { flex-direction: column; align-items: center; gap: 2.75rem; }
          .hiw-line, .hiw-line-dot, .hiw-arrow-wrap { display: none; }
          .hiw-step { max-width: 380px; width: 100%; }
        }

        /* ── Big screen / laptop support ── */
        @media (min-width: 1440px) {
          .hiw-step { max-width: 340px; }
        }
        @media (min-width: 1920px) {
          .hiw-step { max-width: 380px; }
        }
      `}</style>

      <div className="hiw-track-wrap">
        <div className="hiw-line" />
        <div className="hiw-line-dot" style={{ left: '33.333%' }} />
        <div className="hiw-line-dot" style={{ left: '66.666%' }} />
        <div className="hiw-arrow-wrap">
          <div className="hiw-arrow-glow" />
          <span className="hiw-arrow-trail" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="hiwArrowGrad" x1="0" y1="0" x2="24" y2="0">
                <stop offset="0%" stopColor={AMBER_DARK} />
                <stop offset="100%" stopColor={AMBER} />
              </linearGradient>
            </defs>
            <path d="M9 6l6 6-6 6" stroke="url(#hiwArrowGrad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="hiw-row3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="hiw-step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="hiw-badge">{i + 1}</div>

              <div className="hiw-card">
                <div className="hiw-icon-wrap">
                  <div className="hiw-icon-dashring" />
                  <span className="hiw-sparkle" style={{ top: 2, left: 6 }}>✦</span>
                  <span className="hiw-sparkle" style={{ bottom: 4, right: 2, fontSize: 8 }}>✦</span>
                  <span className="hiw-sparkle" style={{ top: 10, right: -2, fontSize: 7 }}>✦</span>
                  <div className="hiw-icon-circle">{icons[i % icons.length]}</div>
                </div>

                <div className="hiw-divider">
                  <span className="hiw-divider-line" />
                  <span className="hiw-divider-icon">❖</span>
                  <span className="hiw-divider-line" />
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                <div className="hiw-bottom-flourish">
                  <span className="hiw-bottom-line" />
                  <span className="hiw-bottom-icon">❧</span>
                  <span className="hiw-bottom-line" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'clamp(0.9rem,3vw,1.35rem) clamp(0.9rem,3vw,1.6rem)' }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', fontWeight: 700, color: AMBER, opacity: 0.75, minWidth: 24, flexShrink: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.88rem, 2vw, 1.15rem)', color: BROWN_TEXT, fontWeight: 700, lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <div style={{
          flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
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
        <div style={{ padding: '0 clamp(0.9rem,3vw,1.6rem) clamp(0.9rem,3vw,1.35rem)' }}>
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
export default function ConsultationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const consultation = getConsultationBySlug(slug ?? '')
  const [angle, setAngle] = useState(0)
  const [callDuration, setCallDuration] = useState<'15' | '30'>(
  slug === 'couple' ? '30' : '15'
)
  

  useEffect(() => {
    const t = setInterval(() => setAngle(a => (a + 0.3) % 360), 16)
    return () => clearInterval(t)
  }, [])

  if (!consultation) {
    return (
      <div style={{ background: CREAM, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: BROWN_TEXT, marginBottom: '1rem' }}>Consultation Not Found</h1>
          <p style={{ color: BROWN_MID, marginBottom: '2rem' }}>We couldn't find a consultation matching <strong>"{slug}"</strong>.</p>
          <Link to="/" style={{ ...ctaBtn }}>Back to Home</Link>
        </div>
        <Footer />
      </div>
    )
  }
  const selectedPlan = callDuration === '15'
    ? consultation.pricingPlans[0]
    : (consultation.pricingPlans[1] ?? consultation.pricingPlans[0])

  const allFeatureLabels: string[] = []
  consultation.pricingPlans.forEach(plan => {
    plan.features.forEach(f => {
      if (!allFeatureLabels.includes(f.label)) allFeatureLabels.push(f.label)
    })
  })

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: BROWN_TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
          <Navbar />

      <style>{`
        :root {
          --content-max: 1100px;
        }
        @media (min-width: 1440px) {
          :root { --content-max: 1280px; }
        }
        @media (min-width: 1920px) {
          :root { --content-max: 1440px; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .cp-hero-anim { animation: fadeSlideUp 0.45s ease forwards; }

        /* ── HERO ── */
        .cp-hero {
  background: linear-gradient(135deg, #c47a1e 0%, #b8691a 100%);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;              /* was space-between */
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(36px,6vw,90px) clamp(20px, 8%, 120px) clamp(48px,7vw,100px);
  min-height: clamp(340px, 42vw, 640px); /* was capped at 500px */
  position: relative;
  overflow: hidden;
}
.cp-hero-left {
  flex: 1 1 0;
  min-width: 0;
  max-width: 600px;                      /* was missing — text was growing unbounded */
  z-index: 2;
}
.cp-hero-right {
  flex-shrink: 0;
  position: relative;
  width: clamp(150px, 30vw, 560px);      /* was capped at 480px */
  height: clamp(150px, 30vw, 560px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
  @media (min-width: 1440px) {
  .cp-hero { padding-left: 100px; padding-right: 100px; }
  .cp-hero-left { max-width: 680px; }
  .cp-hero-right { width: clamp(280px, 26vw, 620px); height: clamp(280px, 26vw, 620px); }
}
  @media (min-width: 1920px) {
  .cp-hero { padding-left: 160px; padding-right: 160px; }
  .cp-hero-left { max-width: 760px; }
  .cp-hero-right { width: clamp(320px, 24vw, 680px); height: clamp(320px, 24vw, 680px); }
}
        .cp-chakra {
          position: absolute; top: 50%; left: 50%;
          width: 100%; height: 100%;
          object-fit: contain; opacity: 0.42;
          pointer-events: none; z-index: 0;
        }
        .cp-slide-img {
          position: relative; z-index: 1;
          width: 55%; height: 80%;
          display: flex; align-items: center; justify-content: center;
        }
        .cp-slide-img img { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; }

        /* HERO mobile */
        @media (max-width: 600px) {
          .cp-hero {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 32px 16px 48px;
            min-height: unset;
            gap: 20px;
          }
          .cp-hero-left  { order: 2; width: 100%; min-width: 0; }
          .cp-hero-right { order: 1; width: 140px; height: 140px; }
          .cp-hero-btns  { justify-content: center !important; }
          .hero-stats    { justify-content: center !important; }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .cp-hero-right { width: clamp(160px,28vw,280px); height: clamp(160px,28vw,280px); }
        }

        /* ── FLORAL ── */
        .floral-svg { transition: opacity 0.2s; }
        @media (max-width: 480px) {
          .floral-svg { width: 60px !important; height: 60px !important; opacity: 0.35 !important; }
        }

        /* ── FOR WHOM ── */
        .for-whom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
          gap: 1.25rem;
        }
        @media (min-width: 1440px) {
          .for-whom-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        }

        /* ── PRICING ── */
        .pricing-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .pricing-table  { min-width: 420px; }
        @media (max-width: 480px) {
          .pricing-table { min-width: 360px; }
          .pricing-table th, .pricing-table td { padding: 0.65rem 0.6rem !important; font-size: 0.75rem !important; }
        }

        /* ── ABOUT ── */
        .about-grid {
          max-width: 1050px; margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 420px) 1fr;
gap: 4.5rem;
          align-items: center;
          position: relative; z-index: 1;
        }
       @media (max-width: 700px) {
  .about-grid {
    grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
            gap: 2rem;
          }
          .about-photo { max-width: 280px !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1440px) {
          .about-grid { max-width: 1240px; gap: 5.5rem; }
        }

        /* ── KUNDLI / WHAT'S INSIDE ── */
        /* Default: 4-col grid */
        .kg {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 2px solid #3a5070;
  position: relative;
  min-width: 340px;
}
        /* Tablet: compact but still grid */
       @media (max-width: 680px) {
  .kg-title { font-size: clamp(.5rem, 2.2vw, .75rem); }
  .kg-desc  { font-size: clamp(.42rem, 1.8vw, .62rem); }
  .kg-icon  { width: 20px; height: 20px; }
}
        .kg-house {
          border: 1.5px solid #3a5070;
          padding: clamp(.4rem,.8vw,.65rem) clamp(.4rem,.8vw,.6rem);
          display: flex; flex-direction: column;
          min-height: clamp(70px,12vw,130px);
        }
        .kg-icon {
          width: clamp(22px,3.5vw,34px); height: clamp(22px,3.5vw,34px);
          border-radius: 50%;
          background: linear-gradient(135deg,#8b4e0a,#c8791a);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: .3rem; flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(139,78,10,.4);
        }
        .kg-title {
          font-size: clamp(.55rem,1.1vw,.75rem);
          font-weight: 700; color: #2a1200; line-height: 1.25;
          margin: .15rem 0 .1rem;
          font-family: 'Playfair Display', serif; flex-shrink: 0;
        }
        .kg-line { width: 20px; height: 2px; background: #c8791a; border-radius: 1px; margin: .18rem 0 .25rem; flex-shrink: 0; }
        .kg-desc { font-size: clamp(.48rem,.85vw,.62rem); color: #6b3a10; font-family: sans-serif; line-height: 1.35; }
        .kg-corner-tl { clip-path: polygon(0 0,100% 0,0 100%); background: rgba(235,205,140,.35); }
        .kg-corner-tr { clip-path: polygon(0 0,100% 0,100% 100%); background: rgba(235,205,140,.35); }
        .kg-corner-bl { clip-path: polygon(0 0,0 100%,100% 100%); background: rgba(235,205,140,.35); }
        .kg-corner-br { clip-path: polygon(100% 0,0 100%,100% 100%); background: rgba(235,205,140,.35); }
        .kg-center {
          grid-column: 2/4; grid-row: 2/3;
          position: relative; overflow: hidden;
          border: 1.5px solid #3a5070 !important;
        }
        .kg-center-diag { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .kg-tri { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: .2rem; }
        .kg-tri-t { top:0;left:0;right:0;height:50%; clip-path:polygon(50% 0%,0% 100%,100% 100%); padding-top:.5rem; }
        .kg-tri-b { bottom:0;left:0;right:0;height:50%; clip-path:polygon(0% 0%,100% 0%,50% 100%); padding-bottom:.5rem; }
        .kg-tri-l { top:0;left:0;width:50%;height:100%; clip-path:polygon(0% 50%,100% 0%,100% 100%); padding-right:.35rem; }
        .kg-tri-r { top:0;right:0;width:50%;height:100%; clip-path:polygon(0% 0%,100% 50%,0% 100%); padding-left:.35rem; }
        .kg-brand { font-size: clamp(.45rem,.9vw,.65rem); font-weight: 700; color: #8b4e0a; font-family: 'Playfair Display', serif; }
        .kg-item5 { grid-column: 2/4; grid-row: 3/4; }

        /* ── Roller ── */
        .roller-wrap {
          position: relative; width: 100%;
          height: clamp(24px,4vw,40px);
          display: flex; align-items: center; z-index: 2; margin: 0;
        }
        .roller-stick {
          position: absolute; left: 0; right: 0;
          height: clamp(10px,1.8vw,18px); top: 50%; transform: translateY(-50%);
          background: linear-gradient(180deg,#f8eecc 0%,#e8d080 12%,#c8a040 30%,#f0e090 50%,#c8a040 70%,#a07828 88%,#d4b060 100%);
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.35);
        }
        .roller-knob {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: clamp(22px,3.8vw,38px); height: clamp(22px,3.8vw,38px); border-radius: 50%;
          background: radial-gradient(circle at 36% 30%,#f0d888 0%,#c09030 38%,#805010 68%,#3a2008 100%);
          box-shadow: inset 0 2px 5px rgba(255,255,255,.28), inset 0 -2px 5px rgba(0,0,0,.35), 0 3px 8px rgba(0,0,0,.5);
          z-index: 3;
        }
        .roller-knob-l { left: clamp(-11px,-2vw,-9px); }
        .roller-knob-r { right: clamp(-11px,-2vw,-9px); }

        .parchment {
  background: linear-gradient(160deg,#f7ecc8 0%,#ead8a0 25%,#f2e0b0 55%,#e8d49a 100%);
  margin: 0 clamp(10px,2vw,14px);
  padding: clamp(.5rem,2vw,1.2rem) clamp(.5rem,2vw,1rem);
  border-left: 2px solid #c0a050;
  border-right: 2px solid #c0a050;
  box-shadow: inset 0 0 40px rgba(120,80,20,.12);
  overflow-x: auto;
}

        /* ── CTA ── */
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
        .cta-btn-wrap { position: relative; display: inline-block; }
        .cta-pulse-ring {
          position: absolute; inset: -8px; border-radius: 60px;
          border: 2px solid rgba(255,255,255,0.5);
          animation: ctaPulseRing 2s ease-out infinite;
        }
        .cta-btn {
          position: relative; z-index: 1; display: inline-block;
          background: #fff; color: ${AMBER_DARK};
          font-weight: 700; font-size: clamp(0.85rem, 2vw, 1.05rem);
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 2.4rem);
          border-radius: 50px; text-decoration: none; letter-spacing: 0.02em;
          background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,215,100,0.35) 50%, rgba(255,255,255,0) 60%, transparent 100%);
          background-size: 200% auto;
          animation: ctaGlowBtn 2.5s ease-in-out infinite, ctaShimmer 3.5s linear infinite;
          transition: transform 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.05) translateY(-2px); }

        /* ── What's Inside heading section ── */
        .whats-inside-section {
          background: linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%);
          padding: clamp(2.5rem,6vw,5rem) clamp(1rem,3vw,1.5rem);
          position: relative; overflow: hidden;
        }

        /* ── Book cards (for-whom) ── */
        .fw-card-img-inner {
          width: 100%; aspect-ratio: 3/2;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .fw-book-cover {
          width: 62%; height: 86%;
          border-radius: 4px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.4);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1rem; gap: 0.4rem;
        }
        .fw-book-brand  { font-size: 0.52rem; letter-spacing: 0.12em; font-family: sans-serif; text-transform: uppercase; }
        .fw-book-title  { font-size: clamp(0.75rem,2vw,1.05rem); font-weight: 800; color: #fff; font-family: 'Playfair Display', serif; text-align: center; line-height: 1.2; }
        .fw-book-line   { width: 32px; height: 1.5px; background: #c8791a; margin: 0.2rem 0; }
        .fw-book-sub    { font-size: 0.7rem; letter-spacing: 0.08em; font-family: sans-serif; text-align: center; text-transform: uppercase; }

        /* Pricing card grid */
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
          gap: 1.25rem;
          margin-top: 2rem;
        }

        /* Hero stats */
       .hero-stats-item {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 10px;   /* was 10 — invalid without unit */
  padding: 0.5rem 0.9rem;
  text-align: center;
}
        @media (max-width: 380px) {
          .hero-stats-item { padding: 0.4rem 0.6rem; }
        }
        @media (max-width: 640px) {
  .what-is-grid > *:first-child { order: 2; }
  .what-is-grid > *:last-child  { order: 1; }
}

        /* ── Big screen / laptop tuning for pricing layout ── */
        @media (min-width: 1440px) {
          .pc-wrap { gap: 3.5rem; }
        }
        @media (min-width: 1920px) {
          .pc-wrap { gap: 4.5rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-anim cp-hero-left">
          <span style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '4px 14px', fontSize: 11, marginBottom: 16, display: 'inline-block', letterSpacing: '0.12em', fontWeight: 600 }}>
            ✦ 1-On-1 Consultation with Astro Aaditya Narayan
          </span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px, 3.2vw, 50px)', fontWeight: 800, lineHeight: 1.2, margin: '12px 0 14px' }}>
            {consultation.tagline}
          </h1>
          <p style={{ fontSize: 'clamp(11px, 1.4vw, 17px)', opacity: 0.88, marginBottom: 12, fontStyle: 'italic' }}>
            {consultation.subtitle}
          </p>
          <p style={{ fontSize: 'clamp(11px, 1.4vw, 17px)', opacity: 0.82, marginBottom: 28, lineHeight: 1.7 }}>
            {consultation.heroDescription}
          </p>
          <div className="cp-hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: '#fff', color: AMBER_DARK, border: '2px solid #fff', padding: '12px 26px', borderRadius: 30, fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'none' }}>
              Book Your {consultation.title} →
            </a>
          </div>
          <div className="hero-stats" style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[['2 Lakh+', 'Kundlis Analyzed'], ['4.9/5 ★', 'Avg Rating'], ['100%', 'Personalized']].map(([v, l]) => (
              <div key={l} className="hero-stats-item" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 10, padding: '0.5rem 0.9rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 2vw, 1.15rem)', fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.75, marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cp-hero-right">
          <img src="/chakra.png" alt="" className="cp-chakra" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }} />
          <div className="cp-hero-anim cp-slide-img">
            <img src={consultation.image} alt={consultation.title} />
          </div>
        </div>
      </section>

      {/* ── WHAT IS ── */}
      <section style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'clamp(2.5rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
        <div className="what-is-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>
          <div>
            <SectionLabel>What is the {consultation.title}?</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2.3rem)', color: BROWN_TEXT, marginBottom: '1.25rem', lineHeight: 1.35 }}>
              {consultation.whatIs.heading}
            </h2>
            <p style={{ color: BROWN_MID, lineHeight: 1.85, marginBottom: '2rem', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>
              {consultation.whatIs.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {consultation.whatIs.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: BROWN_TEXT, fontSize: 'clamp(0.82rem, 1.5vw, 0.96rem)', lineHeight: 1.65 }}>
                  <span style={{ color: AMBER, marginTop: 3, flexShrink: 0, fontSize: '0.7rem' }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
<button
  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
  style={{ ...ctaBtn }}
>
  Book Now
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
            <img src={consultation.image2} alt={consultation.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }} />
            <BorderBeam size={120} duration={6} colorFrom="#c8791a" colorTo="#e8a84b" glowIntensity={2} />
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      {/* ── WHAT'S INSIDE ── */}
      <section className="whats-inside-section">
        <style>{`
          @keyframes wiCardIn {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .wi-card {
            background: #fdf6e9;
            border: 1px solid rgba(139,78,10,0.18);
            border-radius: 16px;
            padding: 1.5rem 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            box-shadow: 0 4px 18px rgba(0,0,0,0.12);
            opacity: 0;
            animation: wiCardIn 0.55s ease forwards;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow 0.3s ease,
                        border-color 0.3s ease;
            cursor: default;
          }
          .wi-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 36px rgba(0,0,0,0.22);
            border-color: rgba(200,121,26,0.45);
          }
          .wi-icon {
            width: 44px; height: 44px; border-radius: 50%;
            background: linear-gradient(135deg, #ec9837, #e79634);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3); flex-shrink: 0;
            transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          }
          .wi-card:hover .wi-icon {
            transform: rotate(-8deg) scale(1.1);
          }
          .wi-divider {
            width: 28px; height: 2px; background: #c8791a; border-radius: 1px;
            transition: width 0.3s ease;
          }
          .wi-card:hover .wi-divider {
            width: 44px;
          }
        `}</style>

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.1) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ✦ &nbsp; Inside Your Session &nbsp; ✦
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', color: '#fff', marginBottom: 0, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
              What's Covered in Your {consultation.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.9rem' }}>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem' }}>✦</span>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </div>
          </div>

          {/* Scroll */}
          <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
  gap: '1.25rem',
  maxWidth: 'var(--content-max)',
  margin: '0 auto',
}}>
  {consultation.whatsInside.map((item, i) => {
    const Icon = (LucideIcons as unknown as Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>>)[item?.icon]
    return (
      <div key={i} className="wi-card" style={{ animationDelay: `${i * 0.1}s` }}>
        {/* Icon */}
        <div className="wi-icon">
          {Icon ? <Icon size={20} color="#fff" strokeWidth={1.8} /> : null}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          fontWeight: 700, color: '#2a1200', lineHeight: 1.3,
        }}>
          {item?.title}
        </div>

        {/* Divider */}
        <div className="wi-divider" />

        {/* Description */}
        <div style={{
          fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)',
          color: '#6b3a10',
          lineHeight: 1.65,
        }}>
          {item?.description}
        </div>
      </div>
    )
  })}
</div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks steps={consultation.steps} />

      {/* ── FOR WHOM ── */}
      <section style={{ background: `linear-gradient(${AMBER}28, ${AMBER}28), ${CREAM}`, padding: 'clamp(2.5rem,6vw,6rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>

        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: `${AMBER}0d`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: `${AMBER_DARK}08`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block', background: `${AMBER}18`, border: `1px solid ${AMBER}44`,
              borderRadius: 20, padding: '0.3rem 1rem', fontSize: '0.7rem', fontWeight: 700,
              color: AMBER_DARK, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Who Is This For?
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', color: BROWN_TEXT, marginBottom: '0.75rem', lineHeight: 1.25 }}>
              This Consultation Is Made for You If…
            </h2>
            <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LIGHT})`, margin: '0 auto' }} />
          </div>

          <div className="for-whom-grid">
            {consultation.forWhom.map((item, i) => {
              const themes = [
                { bg: 'linear-gradient(160deg,#1a2a4a,#0d1a30)', cover: 'linear-gradient(160deg,#1e3a6e,#0a1a3a)', brand: '#aac4f0', sub: '#7aa0d4', scallop: '#1a2a4a' },
                { bg: 'linear-gradient(160deg,#1a0a2e,#0d0520)', cover: 'linear-gradient(160deg,#2d1060,#130530)', brand: '#c4a8f0', sub: '#9a78d4', scallop: '#1a0a2e' },
                { bg: 'linear-gradient(160deg,#1a0d00,#0d0600)', cover: 'linear-gradient(160deg,#3a1a00,#1a0800)', brand: '#f0c890', sub: '#d4a060', scallop: '#1a0d00' },
                { bg: 'linear-gradient(160deg,#001a10,#000d08)', cover: 'linear-gradient(160deg,#003a20,#001508)', brand: '#90d4b0', sub: '#60b488', scallop: '#001a10' },
              ]
              const labels = ['Specific Questions', 'Live Conversation', 'Decision Point', 'Second Opinion']
              const subtags = ['Personalized Session', 'Real-Time Guidance', 'Clarity Before You Decide', 'Expert Perspective']
              const t = themes[i % themes.length]

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: '#fff8ee', borderRadius: 16, overflow: 'hidden',
                    border: `1px solid ${AMBER}22`,
                    boxShadow: `0 4px 24px ${AMBER}18`,
                  }}
                >
                  <div style={{ position: 'relative', background: '#f5e8cc' }}>
                    <div className="fw-card-img-inner" style={{ background: t.bg }}>
                      <div className="fw-book-cover" style={{ background: t.cover }}>
                        <span className="fw-book-title">{labels[i % labels.length]}</span>
                        <div className="fw-book-line" />
                        <span className="fw-book-sub" style={{ color: t.sub }}>{subtags[i % subtags.length]}</span>
                      </div>
                    </div>
                    <svg viewBox="0 0 300 28" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 28 }} xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,0 Q15,28 30,14 Q45,0 60,14 Q75,28 90,14 Q105,0 120,14 Q135,28 150,14 Q165,0 180,14 Q195,28 210,14 Q225,0 240,14 Q255,28 270,14 Q285,0 300,14 L300,0 Z" fill={t.scallop} />
                      <path d="M0,0 Q15,28 30,14 Q45,0 60,14 Q75,28 90,14 Q105,0 120,14 Q135,28 150,14 Q165,0 180,14 Q195,28 210,14 Q225,0 240,14 Q255,28 270,14 Q285,0 300,14 L300,28 L0,28 Z" fill="#fff8ee" />
                    </svg>
                  </div>

                  <div style={{ padding: '0.2rem 1.25rem 1.4rem' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '0.8rem', fontFamily: "'Playfair Display', serif",
                      boxShadow: `0 3px 10px ${AMBER}44`, marginBottom: '0.65rem',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{
                      color: AMBER_DARK, fontWeight: 700, fontSize: 'clamp(0.9rem,1.8vw,1.08rem)',
                      marginBottom: '0.35rem', fontFamily: "'Playfair Display', serif", lineHeight: 1.3,
                    }}>
                      {item.title}
                    </div>
                    <div style={{ color: BROWN_MID, fontSize: 'clamp(0.78rem,1.4vw,0.85rem)', lineHeight: 1.72 }}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
<section id="pricing" style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'clamp(2.5rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 3.4vw, 2.5rem)', color: BROWN_TEXT, margin: 0, lineHeight: 1.3 }}>
      Choose Your <span style={{ color: AMBER }}>{consultation.title} Plan</span>
    </h2>
  </div>

  <style>{`
    .pc-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.5rem, 4vw, 3rem);
      align-items: stretch;
    }
    @media (max-width: 800px) {
      .pc-wrap { grid-template-columns: 1fr; }
    }
    .pc-mode-pill {
      flex: 1;
      text-align: center;
      padding: 0.6rem 0.5rem;
      font-weight: 700;
      font-size: 0.85rem;
      color: ${BROWN_MID};
      cursor: default;
    }
    .pc-mode-pill.active {
      background: ${AMBER_DARK};
      color: #fff;
    }
  `}</style>

  <div className="pc-wrap">

    {/* ── LEFT: hero-style amber panel ── */}
   <div className="pc-chakra-wrap" style={{
      background: `linear-gradient(135deg, #c47a1e 0%, #b8691a 100%)`,
    }}>
      <img
        src="/chakra.png"
        alt=""
        className="pc-chakra-img"
        style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
      />
      <div className="pc-slide-img2">
        <img src={consultation.pricingImage} alt={consultation.title} />
      </div>
    </div>

    {/* ── RIGHT: single consultation card (image 2 style) ── */}
    <div style={{
      background: CREAM,
      border: `1.5px solid ${AMBER}55`,
      borderRadius: 18,
      padding: 'clamp(1.5rem, 3vw, 2.2rem)',
      boxShadow: `0 8px 28px ${AMBER}22`,
    }}>
      {/* Avatar + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
        <img
          src={consultation.astrologerPhoto}
          alt="Astrologer"
          style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${AMBER}` }}
        />
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: BROWN_TEXT, margin: 0 }}>
          {consultation.title}
        </h3>
      </div>

      <div style={{ height: 1, background: `${AMBER}44`, marginBottom: '1.1rem' }} />

      <p style={{ color: BROWN_MID, fontSize: '0.9rem', marginBottom: '1.4rem' }}>
        Ideal for individuals seeking clarity and solutions.
      </p>

      {/* Mode / Duration / Type pills (static display, edit text as needed) */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: BROWN_TEXT, marginBottom: 6 }}>Mode:</div>
          <div style={{ display: 'flex', borderRadius: 30, overflow: 'hidden', border: `1px solid ${AMBER}55` }}>
            <span className="pc-mode-pill active">Normal</span>
          </div>
        </div>
        <div>
  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: BROWN_TEXT, marginBottom: 6 }}>Duration:</div>
  <div style={{ display: 'flex', borderRadius: 30, overflow: 'hidden', border: `1px solid ${AMBER}55` }}>
    {slug !== 'couple' && (
      <span
        className={`pc-mode-pill ${callDuration === '15' ? 'active' : ''}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setCallDuration('15')}
      >
        15 Min
      </span>
    )}
    <span
      className={`pc-mode-pill ${callDuration === '30' ? 'active' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => setCallDuration('30')}
    >
      30 Min
    </span>
  </div>
</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: BROWN_TEXT, marginBottom: 6 }}>Consultation Type:</div>
          <div style={{ display: 'flex', borderRadius: 30, overflow: 'hidden', border: `1px solid ${AMBER}55` }}>
            <span className="pc-mode-pill active">Audio</span>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: BROWN_TEXT, marginBottom: 6 }}>Plan:</div>
          <div style={{ display: 'flex', borderRadius: 30, overflow: 'hidden', border: `1px solid ${AMBER}55` }}>
            <span className="pc-mode-pill active">
              {callDuration === '15'
                ? consultation.pricingPlans[0]?.name ?? 'Quick Consultation'
                : consultation.pricingPlans[1]?.name ?? 'Extended Consultation'}
            </span>
          </div>
        </div>
      </div>

      {/* Bullets — pulled from your existing whatIs.bullets */}
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: BROWN_TEXT, marginBottom: '0.6rem' }}>Includes:</div>
      <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', margin: '0 0 1.6rem', color: BROWN_MID, fontSize: '0.88rem', lineHeight: 1.9 }}>
        {consultation.whatIs.bullets.slice(0, 3).map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {/* Price + Book button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 800, color: BROWN_TEXT }}>
            Price: {selectedPlan.discountedPrice}
          </div>
          <div style={{ fontSize: '0.8rem', color: BROWN_MID, textDecoration: 'line-through', opacity: 0.7 }}>
            {selectedPlan.originalPrice}
          </div>
        </div>
       <button
  onClick={() =>
    navigate(`/checkout/consultation/${slug}?plan=${callDuration === '15' ? 0 : 1}`)
  }
  style={{
            background: `linear-gradient(135deg, ${AMBER}, ${AMBER_LIGHT})`,
            color: '#fff', fontWeight: 700, fontSize: '0.95rem',
            padding: '0.85rem 2rem', borderRadius: 8, border: 'none',
            cursor: 'pointer', boxShadow: `0 4px 14px ${AMBER}55`,
          }}
        >
          Book Now
        </button>
      </div>
    </div>

  </div>
</section>

      {/* ── ABOUT ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,3rem)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div className="about-grid">
          <div className="about-photo" style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
            <img
              src="/Aaditya.png" alt="Astro Aaditya Narayan"
              style={{ width: '100%', height: 'clamp(280px, 50vw, 560px)', objectFit: 'cover', objectPosition: 'top center', display: 'block', borderRadius: 18 }}
            />
          </div>

          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.72rem', color: '#fff', fontWeight: 600 }}>
                📜 Know Your Astrologer
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: '#fff', marginBottom: '0.9rem', lineHeight: 1.2 }}>
              Meet Astro Aaditya Narayan
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontSize: 'clamp(0.95rem,1.8vw,1.1rem)', marginBottom: '1.1rem' }}>
              Astro Aaditya Narayan is the guiding force behind Divine Arra — helping people understand their kundali, planetary influences, karmic patterns, and remedies through years of Vedic astrology practice. His consultations are clear, compassionate, and practical, bringing awareness and direction rather than fear.
            </p>
            <blockquote style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderLeft: '3px solid rgba(255,255,255,0.5)', borderRadius: 8,
              padding: '0.75rem 1rem', marginBottom: '1.4rem',
              fontStyle: 'italic', color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(0.9rem,1.6vw,1.05rem)', lineHeight: 1.65,
            }}>
              "Astrology is not about fear — it is about awareness, alignment, and awakening your inner power."
            </blockquote>
            <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
              {[['100K+','Consultations Delivered'],['9+','Years of Experience'],['59+','Years of Legacy'],['8+','Professional Awards'],['30K+','Hours of Expert Guidance']].map(([v, l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '0.5rem', textAlign: 'center' }}>
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
      <section style={{ background: CREAM_DARK, padding: 'clamp(2.5rem,6vw,5rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: `${AMBER}18`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: `${AMBER_DARK}10`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block', background: `${AMBER}22`, border: `1px solid ${AMBER}55`,
              borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.7rem', fontWeight: 700,
              color: AMBER_DARK, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.9rem',
            }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2.1rem)', color: BROWN_TEXT, lineHeight: 1.2, margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ marginTop: '0.75rem', width: 48, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})` }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {consultation.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(2.5rem,8vw,5.5rem) clamp(1rem,3vw,1.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', animation: 'ctaOrbit 9s linear infinite', transformOrigin: '0 0' }} />
          <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.13)', animation: 'ctaOrbit2 13s linear infinite', transformOrigin: '0 0' }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.1s', marginBottom: '1.2rem' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(8px)' }} />
              <span style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', position: 'relative', zIndex: 1 }}>{consultation.icon}</span>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3.5vw, 2.4rem)', color: '#fff', marginBottom: '0.8rem', lineHeight: 1.25, animation: 'ctaFadeUp 0.6s ease both 0.2s' }}>
            Ready to Book Your {consultation.title}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', marginBottom: '2.4rem', lineHeight: 1.8, fontSize: 'clamp(0.85rem,2vw,1.05rem)', animation: 'ctaFadeUp 0.6s ease both 0.35s' }}>
            {consultation.tagline}
          </p>
          <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.5s' }}>
            <div className="cta-btn-wrap">
              <div className="cta-pulse-ring" />
              <a href="#pricing" className="cta-btn">Book Your Session →</a>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.62rem,1.5vw,0.75rem)', marginTop: '1.2rem', letterSpacing: '0.04em', animation: 'ctaFadeUp 0.6s ease both 0.65s' }}>
            ✦ Flexible Scheduling &nbsp;·&nbsp; Live 1-on-1 Session &nbsp;·&nbsp; Secure Booking
          </p>
        </div>
      </section>

    </div>
  )
}