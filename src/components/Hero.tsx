import { useState, useEffect } from 'react'

const slides = [
  {
    tag: '✦ Who we are',
    title: "Understand Your Life's Complete Blueprint & Make the Right Decisions at the Right Time",
    desc: 'Understand your favorable periods and avoid setbacks with Personalized Life Journey Report.',
    btn1: 'Fix My Luck', btn2: 'Book a Consultation',
    image: '/slide1.png',
  },
  {
    tag: '✦ Vedic Astrology',
    title: 'Right Timing Changes Everything in Your Career and Life',
    desc: 'Understand your favorable periods and avoid setbacks with Personalized Fortune Report.',
    btn1: 'Fix My Luck', btn2: 'Book a Consultation',
    image: '/slide2.png',
  },
  {
    tag: '✦ Vedic Astrology & Spiritual Guidance',
    title: "Decode Your Destiny, Discover Your Purpose & Align Your Life with What You're Meant For",
    desc: "Discover your life's purpose and unlock hidden potential with our comprehensive birth chart analysis.",
    btn1: 'Get Your Report', btn2: 'Talk to Expert',
    image: '/slide3.png',
  },
  {
    tag: '✦ Spiritual Guidance',
    title: 'Remove Life Blockages, Get Clear Direction & Start Creating the Future You Truly Want',
    desc: "Navigate life's challenges with confidence. Get personalized remedies and spiritual guidance.",
    btn1: 'Start Your Journey', btn2: 'Learn More',
    image: '/slide4.png',
  },
  {
    tag: '✦ Meet Your Guide',
    title: 'Trusted Vedic Astrologer with Thousands of Lives Transformed',
    desc: 'Experience authentic Vedic wisdom and personal guidance from a dedicated spiritual practitioner.',
    btn1: 'Book a Session', btn2: 'Learn More',
    image: '/slide5.png',
  },
  {
    tag: '✦ Wealth & Prosperity',
    title: 'Unlock the Secrets of Wealth, Prosperity & Financial Growth Through the Stars',
    desc: 'Discover planetary influences on your finances and get personalized strategies to attract abundance.',
    btn1: 'Get Fortune Report', btn2: 'Book a Consultation',
    image: '/slide6.png',
  },
]

const categories = [
  { img: '/icon-reports.png',  label: 'Explore Reports' },
  { img: '/icon-astro.png',    label: 'Life Changing Astro' },
  { img: '/icon-bandhu.png',   label: 'Ask Bandhu' },
  { img: '/icon-gurukull.png', label: 'Astro Gurukull' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrent(p => (p + 1) % slides.length)
    }, 4000)
    return () => clearInterval(slideTimer)
  }, [])

  useEffect(() => {
    const wheelTimer = setInterval(() => {
      setAngle(a => (a + 0.3) % 360)
    }, 16)
    return () => clearInterval(wheelTimer)
  }, [])

  const slide = slides[current]

  return (
    <>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .hero-anim { animation: fadeSlide 0.45s ease forwards; }
        .arrow-btn:hover { background: rgba(255,255,255,0.3) !important; }

        /* ===== HERO SECTION ===== */
        .hero-section {
          background: linear-gradient(135deg, #c47a1e 0%, #b8691a 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
          /* Stack vertically on mobile, row on desktop */
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 60px clamp(48px, 8%, 100px) 70px;
          min-height: 500px;
        }

        /* ===== LEFT TEXT ===== */
        .hero-left {
          flex: 1 1 0;
          min-width: 0;
          z-index: 2;
          max-width: 520px;
        }

        /* ===== RIGHT: chakra + image ===== */
        .hero-right {
          flex-shrink: 0;
          position: relative;
          width: clamp(280px, 36vw, 480px);
          height: clamp(280px, 36vw, 480px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .chakra-wheel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.42;
          pointer-events: none;
          z-index: 0;
        }

        .slide-img-outer {
          position: relative;
          z-index: 1;
          width: 55%;   /* relative to hero-right size */
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-img-outer img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        /* ===== ARROWS ===== */
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          width: 38px; height: 38px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        /* ===== DOTS ===== */
        .hero-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 7px;
          z-index: 10;
        }

        .cat-strip {
          background: #fff8ee;
          padding: 36px 16px;
        }
        .cat-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(16px, 5vw, 56px);
          flex-wrap: nowrap;
        }
        .cat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .cat-box {
          width: clamp(68px, 11vw, 96px);
          height: clamp(68px, 11vw, 96px);
          background: #fff;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(196,122,30,0.15);
          border: 1px solid #f0dfc0;
          overflow: hidden;
          padding: 10px;
          margin-bottom: 10px;
        }
        .cat-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .cat-label {
          font-size: clamp(10px, 1.9vw, 14px);
          color: #5a3010;
          font-family: sans-serif;
          font-weight: 500;
          white-space: nowrap;
          text-align: center;
        }

        /* ===== MOBILE: stack layout, show chakra+image ===== */
        @media (max-width: 640px) {
          .hero-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 36px 20px 56px;
            min-height: unset;
            gap: 24px;
          }
          .hero-left {
            max-width: 100%;
            order: 2;
          }
          .hero-right {
            order: 1;
            width: 260px;
            height: 260px;
            flex-shrink: 0;
          }
          .hero-btn-group {
            justify-content: center !important;
          }
          .arrow-btn {
            width: 32px; height: 32px;
            font-size: 16px;
          }
        }

        /* ===== TABLET ===== */
        @media (max-width: 900px) and (min-width: 641px) {
          .hero-right {
            width: 260px;
            height: 260px;
          }
          .hero-section {
            padding: 48px 32px 64px;
          }
        }
      `}</style>

      <section className="hero-section">

        {/* Prev arrow */}
        <button className="arrow-btn" style={{ left: 10 }}
          onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}>‹</button>

        {/* Next arrow */}
        <button className="arrow-btn" style={{ right: 10 }}
          onClick={() => setCurrent(p => (p + 1) % slides.length)}>›</button>

        {/* ── LEFT: text ── */}
        <div key={`txt-${current}`} className="hero-anim hero-left">
          <span style={{
            border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20,
            padding: '4px 14px', fontSize: 11, fontFamily: 'sans-serif',
            marginBottom: 16, display: 'inline-block'
          }}>{slide.tag}</span>

          <h1 style={{
            fontSize: 'clamp(20px, 3.2vw, 44px)', fontWeight: 800,
            lineHeight: 1.2, margin: '12px 0 14px', fontFamily: 'Georgia, serif'
          }}>{slide.title}</h1>

          <p style={{
            fontSize: 'clamp(13px, 1.4vw, 15px)', opacity: 0.88,
            marginBottom: 28, fontFamily: 'sans-serif', lineHeight: 1.6
          }}>{slide.desc}</p>

          <div className="hero-btn-group" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{
              background: '#c47a1e', color: '#fff', border: '2px solid #fff',
              padding: '12px 26px', borderRadius: 30, fontWeight: 700,
              fontSize: 14, cursor: 'pointer', fontFamily: 'sans-serif'
            }}>{slide.btn1}</button>
            <button style={{
              background: 'transparent', color: '#fff',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '12px 24px', borderRadius: 30, fontWeight: 600,
              fontSize: 14, cursor: 'pointer', fontFamily: 'sans-serif'
            }}>{slide.btn2}</button>
          </div>
        </div>

        {/* ── RIGHT: chakra ring + slide image ── */}
        <div className="hero-right">
          <img
            src="/chakra.png"
            alt=""
            className="chakra-wheel"
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          />
          <div key={`img-${current}`} className="hero-anim slide-img-outer">
            <img src={slide.image} alt={slide.tag} />
          </div>
        </div>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 22 : 7, height: 7,
              borderRadius: 4, border: 'none', cursor: 'pointer',
              background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s', padding: 0
            }} />
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: '#7a3e0a', color: '#fff', padding: '11px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 64,
          animation: 'ticker 25s linear infinite',
          whiteSpace: 'nowrap', fontFamily: 'sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.02em'
        }}>
          {Array(2).fill([
            'Divine Guidance for Life', 'Personalized Astrology Consultation',
            'Couple Kundali Matching', 'Career Report',
            'Name Analysis & Correction', 'Vedic Astrology Course',
          ]).flat().map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36 }}>
              {t}<span style={{ color: '#e8c97a', fontSize: 9 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY ICONS ── */}
      <div className="cat-strip">
        <div className="cat-row">
          {categories.map(c => (
            <div key={c.label} className="cat-item">
              <div className="cat-box">
                <img src={c.img} alt={c.label} />
              </div>
              <span className="cat-label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}