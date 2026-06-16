import { Link } from 'react-router-dom'
import { coursesConfig } from '../data/CoursesConfig'
import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'

// ─── SPLINE PUBLIC EMBED URL ────────────────────────────────
// Uses the my.spline.design viewer URL directly (no CORS issues)
const SPLINE_IFRAME_URL = 'https://my.spline.design/galaxy-DC5yMBQtvqJPZf5Y4XlgbqM6/'

// ─── THEME ──────────────────────────────────────────────────
const AMBER      = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const CREAM      = '#fdf6e9'
const BROWN_TEXT = '#2a1200'
const BROWN_MID  = '#6b3a10'

const levelColor = (level: string) =>
  level === 'Beginner' ? '#2ecc71' : level === 'Intermediate' ? '#c8791a' : '#e05c8a'


export default function CoursesPage() {
  return (
    <div
      style={{
        background: CREAM,
        minHeight: '100vh',
        color: BROWN_TEXT,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
       .explore-wrap {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  pointer-events: none;
}

.explore-heading {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.7rem, 6vw, 3.1rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0 0 0.5rem;
  max-width: 90%;
}

.explore-img {
  width: clamp(220px, 32vw, 380px);
  margin-top: 0.5rem;
  filter: drop-shadow(0 12px 30px rgba(0,0,0,0.5));
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(14px); }
}
        /* ── HERO ── */
        .hero-section {
          position: relative;
          min-height: clamp(420px, 70vh, 780px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #0e0600;
        }

        /* Spline iframe sits behind everything */
        .hero-spline {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
        }

        /* Gradient overlay — dark at left for text legibility, fades right */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(
              105deg,
              rgba(14,6,0,0.82) 0%,
              rgba(14,6,0,0.55) 45%,
              rgba(14,6,0,0.18) 75%,
              transparent 100%
            ),
            radial-gradient(ellipse 60% 100% at 0% 50%, rgba(14,6,0,0.45) 0%, transparent 100%);
        }

        /* Hero content */
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
          width: 100%;
          padding: clamp(2.5rem,9vw,7rem) clamp(1.25rem,4vw,2.5rem);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Eyebrow */
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(200,121,26,0.12);
          border: 1px solid rgba(200,121,26,0.4);
          border-radius: 100px;
          padding: 0.3rem 1rem 0.3rem 0.6rem;
          font-size: clamp(0.6rem, 1.6vw, 0.7rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e8a44a;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(8px);
          max-width: 100%;
          white-space: normal;
          text-align: center;
        }
        .hero-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #c8791a;
          box-shadow: 0 0 8px #c8791a;
          animation: dot-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes dot-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.5); }
        }

        .hero-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.7rem, 6vw, 3.1rem);
          font-weight: 700;
          line-height: 1.2;
          color: #fff;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }
        .hero-title em {
          font-style: normal;
          color: #e8a44a;
        }

        .hero-rule {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #c8791a, transparent);
          margin: 1.25rem 0;
          border-radius: 2px;
        }

        .hero-sub {
          font-size: clamp(0.85rem, 2.5vw, 1.02rem);
          color: rgba(253,246,233,0.7);
          line-height: 1.85;
          margin: 0 0 2.25rem;
          max-width: 500px;
        }

        .hero-cta-row {
          display: flex; gap: 1rem; flex-wrap: wrap;
          width: 100%;
        }
        .hero-btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          background: linear-gradient(135deg, #8b4e0a 0%, #c8791a 55%, #e8a44a 100%);
          color: #fff; font-weight: 700; font-size: clamp(0.8rem, 2.2vw, 0.9rem);
          padding: 0.9rem 2.1rem; border-radius: 10px;
          letter-spacing: 0.03em;
          box-shadow: 0 6px 28px rgba(200,121,26,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          flex: 1 1 auto;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(200,121,26,0.65);
          filter: brightness(1.07);
        }
        .hero-btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(200,121,26,0.38);
          color: rgba(253,246,233,0.85); font-weight: 600; font-size: clamp(0.8rem, 2.2vw, 0.9rem);
          padding: 0.9rem 1.7rem; border-radius: 10px;
          text-decoration: none;
          backdrop-filter: blur(12px);
          transition: background 0.2s, border-color 0.2s;
          flex: 1 1 auto;
          white-space: nowrap;
        }
        .hero-btn-secondary:hover {
          background: rgba(200,121,26,0.14);
          border-color: rgba(200,121,26,0.6);
        }


        /* ── COURSES ── */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(280px,100%), 1fr));
          gap: 1.75rem;
        }
        .course-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1.5px solid rgba(139,90,43,0.13);
          box-shadow: 0 4px 24px rgba(139,90,43,0.08);
          display: flex; flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          text-decoration: none; color: inherit;
        }
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(139,90,43,0.16);
          border-color: rgba(200,121,26,0.45);
        }
        .course-card-img { width:100%; aspect-ratio:16/10; object-fit:cover; display:block; background:#f5ead4; }
        .course-card-body { padding: clamp(1.1rem,4vw,1.4rem) clamp(1.1rem,4vw,1.5rem) clamp(1.3rem,4vw,1.6rem); display:flex; flex-direction:column; flex:1; }
        .course-meta-row { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.9rem; }
        .course-meta-pill {
          background:rgba(139,90,43,0.07); border:1px solid rgba(139,90,43,0.15);
          border-radius:20px; padding:0.25rem 0.75rem;
          font-size:0.7rem; font-weight:600; color:${BROWN_MID}; white-space:nowrap;
        }
        .course-price-row { display:flex; align-items:baseline; gap:0.5rem; margin-top:1.1rem; flex-wrap: wrap; }
        .course-cta {
          margin-top:1.2rem; display:inline-flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,${AMBER_DARK},${AMBER});
          color:#fff; font-weight:700; font-size:0.85rem;
          padding:0.7rem 1.2rem; border-radius:8px; letter-spacing:0.02em;
          box-shadow:0 4px 16px ${AMBER}40; transition:filter 0.2s ease;
          text-align: center;
        }
        .course-card:hover .course-cta { filter:brightness(1.08); }

        .section-eyebrow {
          font-size:0.7rem; font-weight:700; letter-spacing:0.18em;
          text-transform:uppercase; color:${AMBER_DARK}; display:block; margin-bottom:0.5rem;
        }
        .section-title {
          font-family:'Playfair Display',serif;
          font-size:clamp(1.4rem,5vw,2.2rem);
          font-weight:800; color:${BROWN_TEXT}; margin:0 0 0.5rem; line-height:1.25;
        }
        .section-rule {
          width:40px; height:3px;
          background:linear-gradient(90deg,${AMBER},#e8a44a);
          border-radius:2px; margin-bottom:2.5rem;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .courses-grid {
            grid-template-columns: repeat(auto-fit, minmax(min(260px,100%), 1fr));
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          .hero-section { min-height: clamp(380px, 60vh, 600px); }
          .hero-inner { align-items: center; text-align: center; }
          .hero-rule { margin: 1rem auto; }
          .hero-sub { margin-left: auto; margin-right: auto; }
          .hero-cta-row { justify-content: center; flex-direction: column; }
          .hero-btn-primary, .hero-btn-secondary { width: 100%; }
          .hero-overlay {
            background: rgba(14,6,0,0.68);
          }
          .courses-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 400px) {
          .hero-eyebrow { font-size: 0.58rem; padding: 0.3rem 0.7rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">
        {/* Spline 3D background via iframe */}
        <div className="hero-spline">
          <iframe
            src={SPLINE_IFRAME_URL}
            frameBorder="0"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              pointerEvents: 'auto',
            }}
            title="Galaxy 3D background"
          />
          {/* Cover the Built with Spline watermark (bottom-right) */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '200px',
            height: '56px',
            background: '#0e0600',
            zIndex: 3,
            pointerEvents: 'none',
          }} />
        </div>

        {/* Gradient overlay for text legibility */}
        <div className="hero-overlay" />
        <div className="explore-wrap">
<h2 className="explore-heading" style={{ color: '#e8a44a' }}>Explore our courses given below</h2>
  <img src="/ganesh.png" alt="Explore our courses" className="explore-img" />
</div>

        
      </section>

      {/* ── COURSES GRID ── */}
      <section
        id="courses"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: 'clamp(2.5rem,6vw,5rem) clamp(1rem,3vw,1.5rem)',
        }}
      >
        <span className="section-eyebrow">✦ All Programmes</span>
        <h2 className="section-title">Choose Your Path</h2>
        <div className="section-rule" />

        <div className="courses-grid">
          {coursesConfig.map(course => (
            <Link key={course.slug} to={`/courses/${course.slug}`} className="course-card">
              <img src={course.image} alt={course.title} className="course-card-img" />
              <div className="course-card-body">
                <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.6rem' }}>
                  <span style={{ fontSize:'1.4rem' }}>{course.icon}</span>
                  <span style={{
                    background: levelColor(course.level), color: '#fff',
                    borderRadius: 20, padding: '3px 10px', fontSize: '0.68rem',
                    fontWeight: 700, letterSpacing: '0.06em',
                  }}>
                    {course.level}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.05rem,2vw,1.25rem)',
                  fontWeight: 800, color: BROWN_TEXT, margin: '0 0 0.4rem', lineHeight: 1.3,
                }}>
                  {course.title}
                </h3>
                <p style={{ color:BROWN_MID, fontSize:'0.85rem', fontStyle:'italic', margin:0, lineHeight:1.5 }}>
                  {course.subtitle}
                </p>
                <div className="course-meta-row">
                  <span className="course-meta-pill">🕐 {course.duration}</span>
                  <span className="course-meta-pill">🌐 {course.language}</span>
                  <span className="course-meta-pill">👥 {course.students}</span>
                </div>
                <div className="course-price-row">
                  <span style={{ color:AMBER_DARK, fontSize:'1.15rem', fontWeight:800, fontFamily:"'Playfair Display',serif" }}>
                    {course.pricingPlans[0]?.discountedPrice}/-
                  </span>
                  {course.pricingPlans[0]?.originalPrice && (
                    <span style={{ color:'#bbb', textDecoration:'line-through', fontSize:'0.8rem' }}>
                      {course.pricingPlans[0].originalPrice}
                    </span>
                  )}
                  <span style={{ color:BROWN_MID, fontSize:'0.75rem' }}>onwards</span>
                </div>
                <span className="course-cta">View Course Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
