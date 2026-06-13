import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getReportBySlug } from '../data/reportsConfig'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import Footer from './Footer'
import { BorderBeam } from './BorderBeam'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const cometTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={sectionRef} style={{ maxWidth: 900, margin: '0 auto', padding: '5rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The Process</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: BROWN_TEXT }}>
          How It Works
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* static background line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 2, background: `${AMBER}33`, transform: 'translateX(-50%)',
        }} />

        {/* animated progress line */}
        <motion.div style={{
          position: 'absolute', left: '50%', top: 0,
          width: 2, height: lineHeight,
          background: `linear-gradient(to bottom, ${AMBER_DARK}, ${AMBER})`,
          transform: 'translateX(-50%)',
          boxShadow: `0 0 10px ${AMBER}88, 0 0 20px ${AMBER}44`,
          borderRadius: 9999,
          zIndex: 1,
        }} />

        {/* traveling comet */}
        <motion.div style={{
          position: 'absolute', left: '50%', top: cometTop,
          translateX: '-50%', translateY: '-50%', zIndex: 3,
        }}>
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 16, height: 16, borderRadius: '50%',
              background: `radial-gradient(circle, ${AMBER} 0%, ${AMBER_LIGHT} 40%, transparent 70%)`,
              boxShadow: `0 0 12px 4px ${AMBER}99, 0 0 24px 8px ${AMBER}55`,
            }}
          />
        </motion.div>

        {steps.map((step, i) => {
  const isLeft = i % 2 === 0
  return (
    <div key={i} style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      marginBottom: '3.5rem',
      position: 'relative',
      alignItems: 'center',  
      width: '100%', // ← ADD THIS
    }}>
      {/* dot — centered on the line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: i * 0.1, type: 'spring', stiffness: 200 }}
        style={{
  position: 'absolute',
  left: 'calc(50% - 11px)',   // ← CHANGE: 11px = half of dot width (22px)
  top: '50%',
  transform: 'translateY(-50%)',   // ← CHANGE: only vertical now
  width: 22,
  height: 22,
  borderRadius: '50%',
  background: CREAM,
  border: `2px solid ${AMBER}`,
  boxShadow: `0 0 8px 3px ${AMBER}55, 0 0 18px 6px ${AMBER}22`,
  zIndex: 4,
}}
      />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: i * 0.1 + 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ y: -4, boxShadow: `0 8px 28px ${AMBER}33` }}
        style={{
          width: 'calc(50% - 48px)',
          background: '#fff', borderRadius: 14, padding: '1.5rem',
          border: `1px solid ${AMBER}33`,
          boxShadow: `0 4px 20px ${AMBER}15`,
          textAlign: isLeft ? 'right' : 'left',
          cursor: 'default',
        }}
      >
        <h3 style={{ color: BROWN_TEXT, fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', marginBottom: '0.4rem' }}>
          {step.title}
        </h3>
        <p style={{ color: BROWN_MID, fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
          {step.description}
        </p>
      </motion.div>
    </div>
  )
})}
      </div>
    </section>
  )
}

function CheckIcon({ included }: { included: boolean }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: included ? `${AMBER}22` : 'rgba(180,60,60,0.1)',
      color: included ? AMBER : '#cc3333',
      fontSize: '0.78rem',
      flexShrink: 0,
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
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: open ? `0 8px 32px rgba(139,90,43,0.10)` : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Trigger row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.35rem 1.6rem',
      }}>
        {/* Number */}
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.78rem',
          fontWeight: 700,
          color: AMBER,
          opacity: 0.75,
          minWidth: 24,
          flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span style={{
          flex: 1,
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: BROWN_TEXT,
          fontWeight: 700,
          lineHeight: 1.4,
        }}>
          {faq.question}
        </span>

        {/* Icon */}
        <div style={{
          flexShrink: 0,
          width: 34, height: 34,
          borderRadius: '50%',
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

      {/* Answer body */}
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '0 1.6rem 1.35rem 1.6rem' }}>
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, ${AMBER}66, transparent)`,
            marginBottom: '0.9rem',
          }} />
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: BROWN_MID,
            lineHeight: 1.85,
          }}>
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
  borderRadius: 8,
  fontWeight: 700,
  fontSize: '1rem',
  textDecoration: 'none',
  boxShadow: `0 4px 18px ${AMBER}55`,
  letterSpacing: '0.03em',
  border: 'none',
  cursor: 'pointer',
}

// ─── PAGE ────────────────────────────────────────────────────
export default function ReportDetailPage() {
  // ✅ Read slug dynamically from the URL
  const { slug } = useParams<{ slug: string }>()
  const report = getReportBySlug(slug ?? '')
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setAngle(a => (a + 0.3) % 360), 16)
    return () => clearInterval(t)
  }, [])

  if (!report) {
    return (
      <div style={{ background: CREAM, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: BROWN_TEXT, marginBottom: '1rem' }}>Report Not Found</h1>
          <p style={{ color: BROWN_MID, marginBottom: '2rem' }}>We couldn't find a report matching <strong>"{slug}"</strong>.</p>
          <Link to="/reports" style={{ ...ctaBtn }}>View All Reports</Link>
        </div>
        <Footer />
      </div>
    )
  }

  // ─── Build a unified list of feature labels across all pricing plans ───
  const allFeatureLabels: string[] = []
  report.pricingPlans.forEach(plan => {
    plan.features.forEach(f => {
      if (!allFeatureLabels.includes(f.label)) allFeatureLabels.push(f.label)
    })
  })

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: BROWN_TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <Navbar />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .rp-hero-anim { animation: fadeSlideUp 0.45s ease forwards; }

        .rp-hero {
          background: linear-gradient(135deg, #c47a1e 0%, #b8691a 100%);
          color: #fff;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 60px clamp(48px, 8%, 100px) 70px;
          min-height: 500px;
          position: relative;
          overflow: hidden;
        }
        .rp-hero-left {
          flex: 1 1 0;
          min-width: 0;
          max-width: 520px;
          z-index: 2;
        }
        .rp-hero-right {
          flex-shrink: 0;
          position: relative;
          width: clamp(280px, 36vw, 480px);
          height: clamp(280px, 36vw, 480px);
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
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }
        @media (max-width: 640px) {
          .rp-hero {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 36px 20px 56px;
            min-height: unset;
            gap: 24px;
          }
          .rp-hero-left  { max-width: 100%; order: 2; }
          .rp-hero-right { order: 1; width: 220px; height: 220px; }
          .rp-hero-btns  { justify-content: center !important; }
        }
        @media (max-width: 900px) and (min-width: 641px) {
          .rp-hero-right { width: 260px; height: 260px; }
          .rp-hero { padding: 48px 32px 64px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="rp-hero">
        <div className="rp-hero-anim rp-hero-left">
          <span style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '4px 14px', fontSize: 11, marginBottom: 16, display: 'inline-block', letterSpacing: '0.12em', fontWeight: 600 }}>
            ✦ Exclusive Report by Aditya Narayan Panigrahi
          </span>

          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.2vw, 44px)', fontWeight: 800, lineHeight: 1.2, margin: '12px 0 14px' }}>
            {report.tagline}
          </h1>
          <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', opacity: 0.88, marginBottom: 12, fontStyle: 'italic' }}>
            {report.subtitle}
          </p>
          <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', opacity: 0.82, marginBottom: 28, lineHeight: 1.7 }}>
            {report.heroDescription}
          </p>

          <div className="rp-hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#pricing" style={{ background: '#fff', color: AMBER_DARK, border: '2px solid #fff', padding: '12px 26px', borderRadius: 30, fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'none' }}>
              Get Your {report.title} →
            </a>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[['2 Lakh+', 'Kundlis Analyzed'], ['4.8/5 ★', 'Avg Rating'], ['100%', 'Personalized']].map(([v, l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 10, padding: '0.6rem 1.1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.75, marginTop: 1 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: rotating chakra + report image ── */}
        <div className="rp-hero-right">
          <img
            src="/chakra.png"
            alt=""
            className="rp-chakra"
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          />
          {/* ✅ Uses report.title to match your actual filenames e.g. "Love Report.png" */}
          <div className="rp-hero-anim rp-slide-img">
            <img src={`/reports/${report.title}.png`} alt={report.title} />
          </div>
        </div>
      </section>

      {/* ── WHAT IS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <SectionLabel>What is the {report.title}?</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: BROWN_TEXT, marginBottom: '1.25rem', lineHeight: 1.35 }}>
              {report.whatIs.heading}
            </h2>
            <p style={{ color: BROWN_MID, lineHeight: 1.85, marginBottom: '2rem', fontSize: '0.95rem' }}>
              {report.whatIs.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {report.whatIs.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: BROWN_TEXT, fontSize: '0.92rem', lineHeight: 1.65 }}>
                  <span style={{ color: AMBER, marginTop: 3, flexShrink: 0, fontSize: '0.7rem' }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#pricing" style={{ ...ctaBtn }}>Order Now</a>
          </div>

          {/* report image */}
{/* report image */}
<div style={{
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: `0 8px 32px ${AMBER}22`,
  border: `1px solid ${AMBER}33`,
  background: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',   // ← ADD THIS
}}>
  <img
    src={report.image}
    alt={report.title}
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 20,
    }}
  />
  <BorderBeam        
    size={120}
    duration={6}
    colorFrom="#c8791a"
    colorTo="#e8a84b"
    glowIntensity={2}
  />
</div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section id="whats-inside" style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem', textAlign: 'center' }}>Inside Your Report</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#fff', marginBottom: '2.5rem', textAlign: 'center' }}>
            What's Included in Your {report.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {report.whatsInside.map((item, i) => (
              <div key={i} style={{ background: CREAM, borderRadius: 16, padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
  {(() => {
    const Icon = (LucideIcons as unknown as Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>>)[item.icon]
    return Icon ? <Icon size={22} color="#fff" strokeWidth={1.8} /> : null
  })()}
</div>
                <h3 style={{ color: BROWN_TEXT, fontFamily: "'Playfair Display', serif", fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: BROWN_MID, fontSize: '0.875rem', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ── HOW IT WORKS ── */}
<HowItWorks steps={report.steps} />
      {/* ── FOR WHOM ── */}
<section style={{ background: CREAM, padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>

  {/* decorative background blobs */}
  <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: `${AMBER}0d`, pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: `${AMBER_DARK}08`, pointerEvents: 'none' }} />

  <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <span style={{
        display: 'inline-block',
        background: `${AMBER}18`,
        border: `1px solid ${AMBER}44`,
        borderRadius: 20,
        padding: '0.3rem 1rem',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: AMBER_DARK,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}>
        Who Is This For?
      </span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
        color: BROWN_TEXT,
        marginBottom: '0.75rem',
        lineHeight: 1.25,
      }}>
        This Report Is Made for You If…
      </h2>
      <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LIGHT})`, margin: '0 auto' }} />
    </div>

    {/* Cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {report.forWhom.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -4, boxShadow: `0 12px 36px ${AMBER}22` }}
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: '1.75rem',
            border: `1px solid ${AMBER}22`,
            boxShadow: `0 2px 12px ${AMBER}0f`,
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* subtle top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${AMBER_DARK}, ${AMBER_LIGHT})`,
            borderRadius: '18px 18px 0 0',
          }} />

          {/* number badge */}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.95rem',
            fontFamily: "'Playfair Display', serif",
            boxShadow: `0 4px 14px ${AMBER}44`,
            marginBottom: '1.1rem',
          }}>
            {i + 1}
          </div>

          <div style={{ color: BROWN_TEXT, fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', fontFamily: "'Playfair Display', serif" }}>
            {item.title}
          </div>
          <div style={{ color: BROWN_MID, fontSize: '0.86rem', lineHeight: 1.7 }}>
            {item.description}
          </div>

          {/* decorative corner glow */}
          <div style={{
            position: 'absolute', bottom: -20, right: -20,
            width: 80, height: 80, borderRadius: '50%',
            background: `${AMBER}0a`,
            pointerEvents: 'none',
          }} />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ── PRICING (Comparison Table) ── */}
      <section id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3.4vw, 2.3rem)', color: BROWN_TEXT, margin: 0, lineHeight: 1.3 }}>
            Choose your perfect <span style={{ color: AMBER }}>Features Of {report.title}</span>
          </h2>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: 16, boxShadow: `0 8px 32px ${AMBER}1a`, border: `1px solid ${AMBER}30` }}>
          <table style={{ width: '100%', borderCollapse: 'separate',borderSpacing: 0,minWidth: 560, background: '#fff' }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left',
                  padding: '1.1rem 1.5rem',
                  background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                  color: '#fff',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderTopLeftRadius: 16,
                  borderRight: '1px solid rgba(255,255,255,0.5)',
                }}>
                  Features
                </th>
                {report.pricingPlans.map((plan, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: 'center',
                      padding: '1.1rem 1.25rem',
                      background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`,
                      color: '#fff',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      borderTopRightRadius: i === report.pricingPlans.length - 1 ? 16 : 0,
                      borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(255,255,255,0.5)' : 'none',  // ← ADD THIS
                      minWidth: 180,
                    }}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatureLabels.map((label, rowIdx) => (
                <tr key={label} style={{ background: rowIdx % 2 === 0 ? CREAM : '#fff' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: BROWN_TEXT, fontSize: '0.92rem', whiteSpace: 'nowrap',borderRight: '2px solid rgba(200,121,26,0.35)', }}>
                    {label}
                  </td>
                  {report.pricingPlans.map((plan, i) => {
                    const feature = plan.features.find(f => f.label === label)
                    const included = feature ? feature.included : false
                    return (
                      <td key={i} style={{ textAlign: 'center', padding: '1rem 1.25rem',borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none'}}>
                        <CheckIcon included={included} />
                      </td>
                    )
                  })}
                </tr>
              ))}
              {/* Price row */}
              <tr style={{ background: CREAM_DARK }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: BROWN_TEXT, fontSize: '0.95rem', borderBottomLeftRadius: 16,borderRight: '2px solid rgba(200,121,26,0.35)', }}>
                  Price
                </td>
                {report.pricingPlans.map((plan, i) => (
                  <td
                    key={i}
                    style={{
                      textAlign: 'center',
                      padding: '1.25rem 1.25rem',
                      borderBottomRightRadius: i === report.pricingPlans.length - 1 ? 16 : 0,
                      borderRight: i < report.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                      <div>
                        <span style={{ color: AMBER_DARK, fontSize: '1.3rem', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                          {plan.discountedPrice}/-
                        </span>
                      </div>
                      <span style={{ color: '#bbb', textDecoration: 'line-through', fontSize: '0.82rem' }}>
                        {plan.originalPrice}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <a href="#pricing" style={{ ...ctaBtn }}>Order Now</a>
        </div>
      </section>

      {/* ── ABOUT ── */}
<section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: '5rem 1.5rem', overflow: 'hidden', position: 'relative' }}>
  {/* decorative background circles */}
  <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

  <div className="about-grid" style={{ maxWidth: 1050, margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', gap: '3.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>

    {/* ── Photo ── */}
<div style={{ position: 'relative' }}>
  <img
    src="/Aditya.png"
    alt="Astro Aaditya Narayan"
    style={{
      width: '100%',
      height: 'clamp(340px, 46vw, 440px)',
      objectFit: 'cover',
      objectPosition: 'top center',
      display: 'block',
      borderRadius: 18,
    }}
  />
</div>

    {/* ── Text ── */}
    <div>
      {/* Badge */}
      <div style={{ marginBottom: '0.75rem' }}>
        <span style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.72rem', color: '#fff', fontWeight: 600 }}>
          📜 Know Your Astrologer
        </span>
      </div>

      {/* Heading */}
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#fff', marginBottom: '0.9rem', lineHeight: 1.2 }}>
        Meet Astro Aaditya Narayan
      </h2>

      {/* Bio — single condensed paragraph */}
      <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontSize: '0.88rem', marginBottom: '1.1rem' }}>
        Astro Aaditya Narayan is the guiding force behind Divine Arra — helping people understand their kundali, planetary influences, karmic patterns, and remedies through years of Vedic astrology practice. His consultations are clear, compassionate, and practical, bringing awareness and direction rather than fear. From career and relationships to marriage compatibility and spiritual growth, every session is handled with patience and personal attention.
      </p>

      {/* Quote */}
      <blockquote style={{
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderLeft: '3px solid rgba(255,255,255,0.5)',
        borderRadius: 8,
        padding: '0.75rem 1rem',
        marginBottom: '1.4rem',
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.88)',
        fontSize: '0.85rem',
        lineHeight: 1.65
      }}>
        "Astrology is not about fear — it is about awareness, alignment, and awakening your inner power."
      </blockquote>

      {/* Stats — 3 col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
        {[
          ['100K+', 'Consultations Delivered'],
          ['7+',    'Years of Experience'],
          ['59+',   'Years of Legacy'],
          ['8+',    'Professional Awards'],
          ['30K+',  'Hours of Expert Guidance'],
        ].map(([v, l]) => (
          <div key={l} style={{
            background: 'rgba(255,255,255,0.11)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            padding: '0.5rem 0.75rem',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{v}</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

  </div>

  <style>{`
    @media (max-width: 680px) {
      .about-grid { grid-template-columns: 1fr !important; justify-items: center; text-align: center; }
    }
  `}</style>
</section>

     {/* ── TESTIMONIALS ── */}
<Testimonials />

      {/* ── FAQ ── */}
<section style={{ background: CREAM_DARK, padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>

  <style>{`
    @keyframes faqFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .faq-item {
      animation: faqFadeUp 0.5s ease both;
      border-radius: 14px;
      border: 1.5px solid rgba(139,90,43,0.13);
      background: #fff;
      overflow: hidden;
      transition: box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .faq-item:hover {
      border-color: rgba(139,90,43,0.32);
      box-shadow: 0 8px 32px rgba(139,90,43,0.10);
    }
    .faq-trigger {
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.2rem 1.4rem;
      text-align: left;
    }
    .faq-trigger:hover .faq-icon-wrap { background: rgba(139,90,43,0.12); }
    .faq-icon-wrap {
      flex-shrink: 0;
      width: 30px; height: 30px;
      border-radius: 50%;
      background: rgba(139,90,43,0.07);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s ease, transform 0.3s ease;
    }
    .faq-icon-wrap.open { background: ${AMBER}22; transform: rotate(45deg); }
    .faq-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s ease;
      padding: 0 1.4rem;
    }
    .faq-body.open {
      max-height: 400px;
      padding: 0 1.4rem 1.2rem;
    }
    .faq-number {
      font-family: 'Playfair Display', serif;
      font-size: 0.72rem;
      font-weight: 700;
      color: ${AMBER};
      min-width: 22px;
      opacity: 0.7;
    }
  `}</style>

  {/* decorative amber blob top-right */}
  <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: `${AMBER}18`, pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: `${AMBER_DARK}10`, pointerEvents: 'none' }} />

  <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>

    {/* Header */}
    <div style={{ marginBottom: '2.8rem' }}>
      <span style={{
        display: 'inline-block',
        background: `${AMBER}22`,
        border: `1px solid ${AMBER}55`,
        borderRadius: 20,
        padding: '0.28rem 0.9rem',
        fontSize: '0.7rem',
        fontWeight: 700,
        color: AMBER_DARK,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.9rem',
      }}>
        FAQ
      </span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
        color: BROWN_TEXT,
        lineHeight: 1.2,
        margin: 0,
      }}>
        Frequently Asked Questions
      </h2>
      {/* decorative line */}
      <div style={{ marginTop: '0.75rem', width: 48, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})` }} />
    </div>

    {/* FAQ items */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      {report.faqs.map((faq, i) => (
        <FaqItem
          key={i}
          faq={faq}
          index={i}
        />
      ))}
    </div>

  </div>
</section>

      {/* ── BOTTOM CTA ── */}
<section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: '5.5rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

  <style>{`
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
      position: absolute; inset: -8px;
      border-radius: 60px;
      border: 2px solid rgba(255,255,255,0.5);
      animation: ctaPulseRing 2s ease-out infinite;
    }
    .cta-pulse-ring-2 {
      position: absolute; inset: -8px;
      border-radius: 60px;
      border: 2px solid rgba(255,255,255,0.3);
      animation: ctaPulseRing 2s ease-out 0.6s infinite;
    }
    .cta-btn {
      position: relative; z-index: 1;
      display: inline-block;
      background: #fff;
      color: ${AMBER_DARK};
      font-weight: 700;
      font-size: 1.05rem;
      padding: 1rem 2.4rem;
      border-radius: 50px;
      text-decoration: none;
      letter-spacing: 0.02em;
      animation: ctaGlowBtn 2.5s ease-in-out infinite;
      transition: transform 0.2s ease;
      background-image: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,215,100,0.35) 50%, rgba(255,255,255,0) 60%, transparent 100%);
      background-size: 200% auto;
      animation: ctaGlowBtn 2.5s ease-in-out infinite, ctaShimmer 3.5s linear infinite;
    }
    .cta-btn:hover { transform: scale(1.05) translateY(-2px); }
  `}</style>

  {/* orbiting soft blobs */}
  <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', animation: 'ctaOrbit 9s linear infinite', transformOrigin: '0 0' }} />
    <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.13)', animation: 'ctaOrbit2 13s linear infinite', transformOrigin: '0 0' }} />
  </div>

  {/* decorative radial glow behind content */}
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

  <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>

    {/* Icon with glow halo */}
    <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.1s', marginBottom: '1.2rem' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(8px)' }} />
        <span style={{ fontSize: '3.2rem', position: 'relative', zIndex: 1 }}>{report.icon}</span>
      </div>
    </div>

    {/* Heading */}
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
      color: '#fff',
      marginBottom: '0.8rem',
      lineHeight: 1.25,
      animation: 'ctaFadeUp 0.6s ease both 0.2s',
    }}>
      Ready to Unlock Your {report.title}?
    </h2>

    {/* Tagline */}
    <p style={{
      color: 'rgba(255,255,255,0.82)',
      marginBottom: '2.4rem',
      lineHeight: 1.8,
      fontSize: '1.02rem',
      animation: 'ctaFadeUp 0.6s ease both 0.35s',
    }}>
      {report.tagline}
    </p>

    {/* CTA Button */}
    <div style={{ animation: 'ctaFadeUp 0.6s ease both 0.5s' }}>
      <div className="cta-btn-wrap">
        <a href="#pricing" className="cta-btn">
          Order Your Report →
        </a>
      </div>
    </div>

    {/* trust micro-line */}
    <p style={{
      color: 'rgba(255,255,255,0.5)',
      fontSize: '0.75rem',
      marginTop: '1.2rem',
      letterSpacing: '0.04em',
      animation: 'ctaFadeUp 0.6s ease both 0.65s',
    }}>
      ✦ Delivered within 24 hours &nbsp;·&nbsp; 100% personalised &nbsp;·&nbsp; Secure checkout
    </p>

  </div>
</section>

      <Footer />
    </div>
  )
}
