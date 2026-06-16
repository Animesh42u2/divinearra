import { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseBySlug } from '../data/CoursesConfig'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import Footer from './Footer'
import { BorderBeam } from './BorderBeam'
import { motion } from 'framer-motion'

// ─── THEME ───────────────────────────────────────────────────
const AMBER       = '#c8791a'
const AMBER_DARK  = '#8b4e0a'
const AMBER_LIGHT = '#e8a84b'
const CREAM       = '#fdf6e9'
const CREAM_DARK  = '#f5ead4'
const BROWN_TEXT  = '#2a1200'
const BROWN_MID   = '#6b3a10'

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

// ─── SUB-COMPONENTS ──────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: AMBER, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
      {children}
    </p>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 'clamp(1rem,3vw,1.35rem) clamp(1rem,3vw,1.6rem)' }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.78rem', fontWeight: 700, color: AMBER, opacity: 0.75, minWidth: 24, flexShrink: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: BROWN_TEXT, fontWeight: 700, lineHeight: 1.4 }}>
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
        <div style={{ padding: '0 clamp(1rem,3vw,1.6rem) clamp(1rem,3vw,1.35rem)' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${AMBER}66, transparent)`, marginBottom: '0.9rem' }} />
          <p style={{ margin: 0, fontSize: 'clamp(0.875rem,2vw,1rem)', color: BROWN_MID, lineHeight: 1.85 }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function CurriculumModule({ mod, index }: { mod: { title: string; lessons: string[] }; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div style={{
      background: '#fff', border: `1.5px solid ${open ? AMBER + '55' : AMBER + '22'}`,
      borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      boxShadow: open ? `0 6px 24px ${AMBER}14` : 'none',
      transition: 'border-color 0.25s, box-shadow 0.25s',
    }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '1.1rem 1.4rem' }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: open ? `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})` : `${AMBER}18`,
          color: open ? '#fff' : AMBER_DARK,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '0.78rem', fontFamily: "'Playfair Display', serif",
          transition: 'background 0.25s, color 0.25s',
        }}>
          {index + 1}
        </div>
        <span style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem,1.8vw,1rem)', color: BROWN_TEXT, fontWeight: 700 }}>
          {mod.title}
        </span>
        <span style={{ fontSize: '0.75rem', color: BROWN_MID, flexShrink: 0 }}>
          {mod.lessons.length} lessons
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: open ? `${AMBER}22` : 'rgba(139,90,43,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s ease, background 0.2s ease', flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke={AMBER_DARK} strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke={AMBER_DARK} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ padding: '0 1.4rem 1.2rem 4rem' }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${AMBER}44, transparent)`, marginBottom: '0.85rem' }} />
          {mod.lessons.map((lesson, li) => (
            <div key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.55rem', fontSize: 'clamp(0.8rem,1.5vw,0.88rem)', color: BROWN_MID, lineHeight: 1.55 }}>
              <span style={{ color: AMBER, marginTop: 3, flexShrink: 0, fontSize: '0.6rem' }}>▶</span>
              {lesson}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const course = getCourseBySlug(slug ?? '')
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setAngle(a => (a + 0.3) % 360), 16)
    return () => clearInterval(t)
  }, [])

  if (!course) {
    return (
      <div style={{ background: CREAM, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: BROWN_TEXT, marginBottom: '1rem' }}>Course Not Found</h1>
          <p style={{ color: BROWN_MID, marginBottom: '2rem' }}>We couldn't find a course matching <strong>"{slug}"</strong>.</p>
          <Link to="/" style={{ ...ctaBtn }}>Back to Home</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const allFeatureLabels: string[] = []
  course.pricingPlans.forEach(plan => {
    plan.features.forEach(f => {
      if (!allFeatureLabels.includes(f.label)) allFeatureLabels.push(f.label)
    })
  })

  const levelColor = course.level === 'Beginner' ? '#2ecc71' : course.level === 'Intermediate' ? '#c8791a' : '#e05c8a'

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: BROWN_TEXT, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <Navbar />

      <style>{`
        @keyframes fadeSlideUp { from { opacity:0;transform:translateY(14px) } to { opacity:1;transform:translateY(0) } }
        .cp-hero-anim { animation: fadeSlideUp 0.45s ease forwards; }

        .cp-hero {
          background: linear-gradient(135deg, #c47a1e 0%, #b8691a 100%);
          color: #fff; display: flex; flex-direction: row;
          align-items: center; justify-content: space-between;
          gap: 32px; padding: 60px clamp(20px,8%,100px) 70px;
          min-height: 500px; position: relative; overflow: hidden;
        }
        .cp-hero-left  { flex:1 1 0; min-width:0; max-width:520px; z-index:2; }
        .cp-hero-right {
          flex-shrink:0; position:relative;
          width:clamp(200px,36vw,480px); height:clamp(200px,36vw,480px);
          display:flex; align-items:center; justify-content:center; z-index:2;
        }
        .cp-chakra {
          position:absolute; top:50%; left:50%;
          width:100%; height:100%; object-fit:contain;
          opacity:0.42; pointer-events:none; z-index:0;
        }
        .cp-slide-img { position:relative; z-index:1; width:55%; height:80%; display:flex; align-items:center; justify-content:center; }
        .cp-slide-img img { width:100%; height:100%; object-fit:contain; object-position:center; display:block; }

        .fw-card-img-inner { width:100%; aspect-ratio:3/2; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .fw-book-cover {
          width:62%; height:86%; border-radius:4px;
          box-shadow:0 8px 28px rgba(0,0,0,0.4);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:1rem; gap:0.4rem;
        }
        .fw-book-brand { font-size:0.52rem; letter-spacing:0.12em; font-family:sans-serif; text-transform:uppercase; }
        .fw-book-title { font-size:1.05rem; font-weight:800; color:#fff; font-family:'Playfair Display',serif; text-align:center; line-height:1.2; }
        .fw-book-line  { width:32px; height:1.5px; background:#c8791a; margin:0.2rem 0; }
        .fw-book-sub   { font-size:0.46rem; letter-spacing:0.08em; font-family:sans-serif; text-align:center; text-transform:uppercase; }
        .fw-cta-btn {
          display:block; width:100%; padding:0.82rem 0;
          background:linear-gradient(135deg,#d4860f,#e8a030);
          color:#fff; font-family:sans-serif; font-size:0.82rem;
          font-weight:700; letter-spacing:0.14em; text-transform:uppercase;
          text-align:center; border:none; border-radius:8px; cursor:pointer;
          margin-top:0.9rem; box-shadow:0 4px 16px rgba(200,121,26,0.35);
          transition:filter 0.2s ease,transform 0.15s ease; text-decoration:none;
        }
        .fw-cta-btn:hover { filter:brightness(1.08); transform:translateY(-1px); }

        .for-whom-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr)); gap:1.5rem; }
        .curriculum-grid { display:flex; flex-direction:column; gap:0.75rem; }

        @media (max-width:640px) {
          .cp-hero { flex-direction:column; align-items:center; text-align:center; padding:36px 20px 56px; min-height:unset; gap:24px; }
          .cp-hero-left { max-width:100%; order:2; }
          .cp-hero-right { order:1; width:180px; height:180px; }
        }

        @keyframes ctaPulseRing { 0% { transform:scale(0.85);opacity:0.5; } 70% { transform:scale(1.25);opacity:0; } 100% { transform:scale(1.25);opacity:0; } }
        @keyframes ctaGlowBtn { 0%,100% { box-shadow:0 4px 24px rgba(255,255,255,0.35); } 50% { box-shadow:0 8px 40px rgba(255,255,255,0.55); } }
        @keyframes ctaShimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes ctaFadeUp { from { opacity:0;transform:translateY(24px); } to { opacity:1;transform:translateY(0); } }
        @keyframes ctaOrbit  { from { transform:rotate(0deg) translateX(220px) rotate(0deg); } to { transform:rotate(360deg) translateX(220px) rotate(-360deg); } }
        @keyframes ctaOrbit2 { from { transform:rotate(180deg) translateX(160px) rotate(-180deg); } to { transform:rotate(540deg) translateX(160px) rotate(-540deg); } }
        .cta-btn-wrap { position:relative; display:inline-block; }
        .cta-pulse-ring { position:absolute; inset:-8px; border-radius:60px; border:2px solid rgba(255,255,255,0.5); animation:ctaPulseRing 2s ease-out infinite; }
        .cta-btn {
          position:relative; z-index:1; display:inline-block;
          background:#fff; color:${AMBER_DARK}; font-weight:700;
          font-size:clamp(0.9rem,2vw,1.05rem);
          padding:clamp(0.8rem,2vw,1rem) clamp(1.5rem,4vw,2.4rem);
          border-radius:50px; text-decoration:none; letter-spacing:0.02em;
          background-image:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0) 40%,rgba(255,215,100,0.35) 50%,rgba(255,255,255,0) 60%,transparent 100%);
          background-size:200% auto;
          animation:ctaGlowBtn 2.5s ease-in-out infinite,ctaShimmer 3.5s linear infinite;
          transition:transform 0.2s ease;
        }
        .cta-btn:hover { transform:scale(1.05) translateY(-2px); }

        .about-grid {
          max-width:1050px; margin:0 auto;
          display:grid; grid-template-columns:340px 1fr;
          gap:3.5rem; align-items:center; position:relative; z-index:1;
        }
        @media (max-width:780px) {
          .about-grid { grid-template-columns:1fr !important; justify-items:center; text-align:center; gap:2rem; }
          .about-photo { max-width:320px !important; }
        }

        .pricing-scroll { overflow-x:auto; }
        .pricing-table  { min-width:480px; }
        @media (max-width:480px) {
          .pricing-table th,.pricing-table td { padding:0.75rem 0.75rem !important; font-size:0.8rem !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-anim cp-hero-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '4px 14px', fontSize: 11, letterSpacing: '0.12em', fontWeight: 600 }}>
              ✦ Live Course with Aditya Narayan Panigrahi
            </span>
            <span style={{ background: levelColor, color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
              {course.level}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.2, margin: '12px 0 14px' }}>
            {course.tagline}
          </h1>
          <p style={{ fontSize: 'clamp(12px,1.4vw,15px)', opacity: 0.88, marginBottom: 12, fontStyle: 'italic' }}>
            {course.subtitle}
          </p>
          <p style={{ fontSize: 'clamp(12px,1.4vw,15px)', opacity: 0.82, marginBottom: 28, lineHeight: 1.7 }}>
            {course.heroDescription}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <a href="#pricing" style={{ background: '#fff', color: AMBER_DARK, border: '2px solid #fff', padding: '12px 26px', borderRadius: 30, fontWeight: 700, fontSize: 14, cursor: 'pointer', textDecoration: 'none' }}>
              Enroll in {course.title} →
            </a>
          </div>
          {/* course meta pills */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {[
              ['🕐', course.duration],
              ['🌐', course.language],
              ['👥', `${course.students} Students`],
            ].map(([icon, label]) => (
              <span key={label} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 20, padding: '0.35rem 0.85rem', fontSize: '0.72rem', fontWeight: 600 }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>

        <div className="cp-hero-right">
          <img src="/chakra.png" alt="" className="cp-chakra" style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)` }} />
          <div className="cp-hero-anim cp-slide-img">
            <img src={course.image} alt={course.title} />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>
          <div>
            <SectionLabel>What You'll Learn</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2.1rem)', color: BROWN_TEXT, marginBottom: '1.25rem', lineHeight: 1.35 }}>
              {course.whatYouLearn.heading}
            </h2>
            <p style={{ color: BROWN_MID, lineHeight: 1.85, marginBottom: '2rem', fontSize: 'clamp(0.875rem,1.5vw,0.95rem)' }}>
              {course.whatYouLearn.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {course.whatYouLearn.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: BROWN_TEXT, fontSize: 'clamp(0.85rem,1.5vw,0.92rem)', lineHeight: 1.65 }}>
                  <span style={{ color: AMBER, marginTop: 3, flexShrink: 0, fontSize: '0.7rem' }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#pricing" style={{ ...ctaBtn }}>Enroll Now</a>
          </div>

          <div style={{
            borderRadius: 20, overflow: 'hidden',
            boxShadow: `0 8px 32px ${AMBER}22`,
            border: `1px solid ${AMBER}33`,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <img src={course.image2} alt={course.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }} />
            <BorderBeam size={120} duration={6} colorFrom="#c8791a" colorTo="#e8a84b" glowIntensity={2} />
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section style={{ background: CREAM_DARK, padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <SectionLabel>Course Curriculum</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2.1rem)', color: BROWN_TEXT }}>
              What's Inside the Course
            </h2>
            <p style={{ color: BROWN_MID, fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {course.curriculum.length} modules · {course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
            </p>
          </motion.div>
          <div className="curriculum-grid">
            {course.curriculum.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <CurriculumModule mod={mod} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR WHOM ── */}
      <section style={{ background: CREAM, padding: 'clamp(3rem,6vw,6rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .for-whom-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(260px,100%), 1fr));
            gap: 1.75rem;
          }

          .fw-card-img-inner { width:100%; aspect-ratio:3/2; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }

          /* Base book cover */
          .fw-book-cover { width:62%; height:86%; border-radius:4px; box-shadow:0 8px 28px rgba(0,0,0,0.4); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1rem; gap:0.4rem; position:relative; }

          .fw-book-brand { font-family:'Inter',sans-serif; font-size:0.55rem; letter-spacing:0.16em; text-transform:uppercase; font-weight:600; opacity:0.85; }
          .fw-book-title { font-family:'Playfair Display',serif; font-weight:800; font-size:1rem; color:#fff; text-align:center; line-height:1.25; }
          .fw-book-sub { font-family:'Inter',sans-serif; font-size:0.62rem; letter-spacing:0.06em; text-align:center; font-style:italic; }
          .fw-book-line { width:26px; height:1.5px; border-radius:2px; background:rgba(255,255,255,0.35); }

          /* ── Variant 0: Beginner — celestial/starfield, rounded corners, dotted constellation border ── */
          .fw-variant-0 .fw-book-cover {
            border: 1px solid rgba(170,196,240,0.35);
            border-radius: 10px;
          }
          .fw-variant-0 .fw-book-cover::before {
            content: '✦';
            position: absolute; top: 8px; left: 10px;
            font-size: 0.7rem; color: rgba(170,196,240,0.6);
          }
          .fw-variant-0 .fw-book-cover::after {
            content: '✦';
            position: absolute; bottom: 8px; right: 10px;
            font-size: 0.5rem; color: rgba(170,196,240,0.4);
          }
          .fw-variant-0 .fw-book-title { letter-spacing: 0.01em; }

          /* ── Variant 1: Deep Learning — mystic/tarot, ornate corner frame, sharp edges ── */
          .fw-variant-1 .fw-book-cover {
            border-radius: 2px;
            border: 1px solid rgba(196,168,240,0.4);
          }
          .fw-variant-1 .fw-book-cover::before,
          .fw-variant-1 .fw-book-cover::after {
            content: '';
            position: absolute;
            width: 14px; height: 14px;
            border: 1.5px solid rgba(196,168,240,0.55);
          }
          .fw-variant-1 .fw-book-cover::before { top: 6px; left: 6px; border-right:none; border-bottom:none; }
          .fw-variant-1 .fw-book-cover::after { bottom: 6px; right: 6px; border-left:none; border-top:none; }
          .fw-variant-1 .fw-book-title { font-style: italic; }

          /* ── Variant 2: Skill Building — warm/amber, hexagonal clip, bold ── */
          .fw-variant-2 .fw-book-cover {
            clip-path: polygon(8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%, 0 8%);
          }
          .fw-variant-2 .fw-book-title { font-weight: 900; letter-spacing: -0.01em; }
          .fw-variant-2 .fw-book-line { width: 36px; height: 2px; }

          /* ── Variant 3: Career Growth — emerald/professional, diagonal ribbon, crisp rectangle ── */
          .fw-variant-3 .fw-book-cover {
            border-radius: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(144,212,176,0.25);
          }
          .fw-variant-3 .fw-book-cover::before {
            content: '';
            position: absolute; top: 0; right: 14px;
            width: 18px; height: 26px;
            background: rgba(144,212,176,0.5);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
          }
          .fw-variant-3 .fw-book-title { text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.04em; }

          .fw-cta-btn {
            display:inline-flex; align-items:center; justify-content:center;
            margin-top:1rem; width:100%;
            background: linear-gradient(135deg, ${AMBER_DARK}, ${AMBER});
            color:#fff; font-weight:700; font-size:0.82rem;
            padding:0.65rem 1rem; border-radius:8px; letter-spacing:0.02em;
            text-decoration:none; transition: filter 0.2s ease, transform 0.2s ease;
          }
          .fw-cta-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        `}</style>

        <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: `${AMBER}0d`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: `${AMBER_DARK}08`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'inline-block', background: `${AMBER}18`, border: `1px solid ${AMBER}44`, borderRadius: 20, padding: '0.3rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: AMBER_DARK, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Who Is This For?
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2.3rem)', color: BROWN_TEXT, marginBottom: '0.75rem', lineHeight: 1.25 }}>
              This Course Is Made for You If…
            </h2>
            <div style={{ width: 56, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_LIGHT})`, margin: '0 auto' }} />
          </div>

          <div className="for-whom-grid">
            {course.forWhom.map((item, i) => {
              const themes = [
                { bg: 'linear-gradient(160deg,#1a2a4a,#0d1a30)', cover: 'linear-gradient(160deg,#1e3a6e,#0a1a3a)', brand: '#aac4f0', sub: '#7aa0d4', scallop: '#1a2a4a' },
                { bg: 'linear-gradient(160deg,#1a0a2e,#0d0520)', cover: 'linear-gradient(160deg,#2d1060,#130530)', brand: '#c4a8f0', sub: '#9a78d4', scallop: '#1a0a2e' },
                { bg: 'linear-gradient(160deg,#1a0d00,#0d0600)', cover: 'linear-gradient(160deg,#3a1a00,#1a0800)', brand: '#f0c890', sub: '#d4a060', scallop: '#1a0d00' },
                { bg: 'linear-gradient(160deg,#001a10,#000d08)', cover: 'linear-gradient(160deg,#003a20,#001508)', brand: '#90d4b0', sub: '#60b488', scallop: '#001a10' },
              ]
              const labels = ['Beginner\'s Path', 'Deep Learning', 'Skill Building', 'Career Growth']
              const subtags = ['Start From Zero', 'Advanced Concepts', 'Practical Skills', 'Professional Track']
              const t = themes[i % themes.length]
              const variant = i % 4

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ background: '#fff8ee', borderRadius: 16, overflow: 'hidden', border: `1px solid ${AMBER}22`, boxShadow: `0 4px 24px ${AMBER}18` }}
                >
                  <div style={{ position: 'relative', background: '#f5e8cc' }}>
                    <div className={`fw-card-img-inner fw-variant-${variant}`} style={{ background: t.bg }}>
                      <div className="fw-book-cover" style={{ background: t.cover }}>
                        <span className="fw-book-brand" style={{ color: t.brand }}>Astro Aaditya Narayan</span>
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
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', fontFamily: "'Playfair Display', serif", boxShadow: `0 3px 10px ${AMBER}44`, marginBottom: '0.65rem' }}>
                      {i + 1}
                    </div>
                    <div style={{ color: AMBER_DARK, fontWeight: 700, fontSize: 'clamp(0.95rem,1.8vw,1.08rem)', marginBottom: '0.35rem', fontFamily: "'Playfair Display', serif", lineHeight: 1.3 }}>
                      {item.title}
                    </div>
                    <div style={{ color: BROWN_MID, fontSize: 'clamp(0.78rem,1.4vw,0.85rem)', lineHeight: 1.72 }}>
                      {item.description}
                    </div>
                    <a href="#pricing" className="fw-cta-btn">Enroll Now →</a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,3.4vw,2.3rem)', color: BROWN_TEXT, margin: 0, lineHeight: 1.3 }}>
            Choose Your <span style={{ color: AMBER }}>{course.title} Plan</span>
          </h2>
        </div>

        <div className="pricing-scroll" style={{ borderRadius: 16, boxShadow: `0 8px 32px ${AMBER}1a`, border: `1px solid ${AMBER}30` }}>
          <table className="pricing-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1.1rem 1.5rem', background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`, color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.85rem,1.8vw,1rem)', fontWeight: 700, borderTopLeftRadius: 16, borderRight: '1px solid rgba(255,255,255,0.5)' }}>
                  Features
                </th>
                {course.pricingPlans.map((plan, i) => (
                  <th key={i} style={{ textAlign: 'center', padding: '1.1rem 1.25rem', background: `linear-gradient(135deg, ${AMBER_DARK}, ${AMBER})`, color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.85rem,1.8vw,1rem)', fontWeight: 700, lineHeight: 1.35, borderTopRightRadius: i === course.pricingPlans.length - 1 ? 16 : 0, borderRight: i < course.pricingPlans.length - 1 ? '2px solid rgba(255,255,255,0.5)' : 'none', minWidth: 140 }}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatureLabels.map((label, rowIdx) => (
                <tr key={label} style={{ background: rowIdx % 2 === 0 ? CREAM : '#fff' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: BROWN_TEXT, fontSize: 'clamp(0.8rem,1.5vw,0.92rem)', whiteSpace: 'nowrap', borderRight: '2px solid rgba(200,121,26,0.35)' }}>
                    {label}
                  </td>
                  {course.pricingPlans.map((plan, i) => {
                    const feature = plan.features.find(f => f.label === label)
                    return (
                      <td key={i} style={{ textAlign: 'center', padding: '1rem 1.25rem', borderRight: i < course.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none' }}>
                        <CheckIcon included={feature ? feature.included : false} />
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr style={{ background: CREAM_DARK }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: BROWN_TEXT, fontSize: 'clamp(0.85rem,1.5vw,0.95rem)', borderBottomLeftRadius: 16, borderRight: '2px solid rgba(200,121,26,0.35)' }}>
                  Price
                </td>
                {course.pricingPlans.map((plan, i) => (
                  <td key={i} style={{ textAlign: 'center', padding: '1.25rem 1.25rem', borderBottomRightRadius: i === course.pricingPlans.length - 1 ? 16 : 0, borderRight: i < course.pricingPlans.length - 1 ? '2px solid rgba(200,121,26,0.35)' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                      <span style={{ color: AMBER_DARK, fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                        {plan.discountedPrice}/-
                      </span>
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
          <a href="#pricing" style={{ ...ctaBtn }}>Enroll Now</a>
        </div>
      </section>

      {/* ── ABOUT INSTRUCTOR ── */}
      <section style={{ background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`, padding: 'clamp(3rem,6vw,5rem) clamp(1rem,3vw,1.5rem)', overflow: 'hidden', position: 'relative' }}>
        <div className="about-grid">
          <div className="about-photo" style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
            <img src={course.instructor.image} alt={course.instructor.name} style={{ width: '100%', height: 'clamp(280px,46vw,440px)', objectFit: 'cover', objectPosition: 'top center', display: 'block', borderRadius: 18 }} />
          </div>
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.72rem', color: '#fff', fontWeight: 600 }}>
                📜 Your Instructor
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: '#fff', marginBottom: '0.9rem', lineHeight: 1.2 }}>
              {course.instructor.name}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, fontSize: 'clamp(0.82rem,1.5vw,0.88rem)', marginBottom: '1.1rem' }}>
              {course.instructor.bio}
            </p>
            <blockquote style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderLeft: '3px solid rgba(255,255,255,0.5)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.4rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(0.8rem,1.4vw,0.85rem)', lineHeight: 1.65 }}>
              "Astrology is not about fear — it is about awareness, alignment, and awakening your inner power."
            </blockquote>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
              {[['100K+','Consultations Delivered'],['7+','Years of Experience'],['59+','Years of Legacy'],['8+','Professional Awards'],['30K+','Hours of Expert Guidance']].map(([v, l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '0.5rem 0.5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.85rem,1.5vw,1rem)', fontWeight: 800, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 'clamp(0.55rem,1vw,0.6rem)', color: 'rgba(255,255,255,0.65)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{l}</div>
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
        <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '2.8rem' }}>
            <span style={{ display: 'inline-block', background: `${AMBER}22`, border: `1px solid ${AMBER}55`, borderRadius: 20, padding: '0.28rem 0.9rem', fontSize: '0.7rem', fontWeight: 700, color: AMBER_DARK, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
              FAQ
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3vw,2.1rem)', color: BROWN_TEXT, lineHeight: 1.2, margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <div style={{ marginTop: '0.75rem', width: 48, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})` }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {course.faqs.map((faq, i) => (
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
        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 'clamp(2.4rem,5vw,3.2rem)' }}>{course.icon}</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', color: '#fff', margin: '0.8rem 0', lineHeight: 1.25 }}>
            Ready to Enroll in {course.title}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', marginBottom: '2.4rem', lineHeight: 1.8, fontSize: 'clamp(0.9rem,2vw,1.02rem)' }}>
            {course.tagline}
          </p>
          <div className="cta-btn-wrap">
            <div className="cta-pulse-ring" />
            <a href="#pricing" className="cta-btn">Enroll Now →</a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.65rem,1.5vw,0.75rem)', marginTop: '1.2rem', letterSpacing: '0.04em' }}>
            ✦ {course.duration} &nbsp;·&nbsp; {course.language} &nbsp;·&nbsp; Secure Enrollment
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}