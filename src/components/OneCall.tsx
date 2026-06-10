import { useState, useEffect, useRef } from 'react'
import {
  Star,
  Briefcase,
  Heart,
  Sparkles,
  ArrowRight,
  Phone,
  type LucideIcon,
} from 'lucide-react'
interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

const features: Feature[] = [
  {
    icon: Star,
    title: 'Vedic Birth Chart',
    desc: 'Understand your birth chart, life patterns, and future possibilities.',
  },
  {
    icon: Briefcase,
    title: 'Career & Business',
    desc: 'Get clear direction for career growth and business decisions.',
  },
  {
    icon: Heart,
    title: 'Relationship & Marriage',
    desc: 'Understand compatibility, challenges, and the right timing.',
  },
  {
    icon: Sparkles,
    title: 'Remedies & Solutions',
    desc: 'Get practical remedies to balance planetary influences.',
  },
]

// Pre-generate star data so values are stable across renders
interface StarData {
  width: string
  height: string
  top: string
  left: string
  d: string
  delay: string
  maxOp: string
}

const STARS: StarData[] = Array.from({ length: 40 }, () => ({
  width: `${Math.random() * 2 + 1}px`,
  height: `${Math.random() * 2 + 1}px`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  d: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 5}s`,
  maxOp: `${0.3 + Math.random() * 0.5}`,
}))

export default function OneCall() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .oc-section {
          padding: 96px 5%;
          background: #0e0a1a;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .oc-bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .oc-bg-glow-1 {
          width: 480px; height: 480px;
          background: rgba(180, 100, 20, 0.18);
          top: -120px; left: -80px;
        }
        .oc-bg-glow-2 {
          width: 360px; height: 360px;
          background: rgba(90, 40, 180, 0.15);
          bottom: -80px; right: -60px;
        }

        .oc-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .oc-star-dot {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          animation: twinkle var(--d, 3s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: var(--max-op, 0.6); transform: scale(1); }
        }

        .oc-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .oc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(196,122,30,0.12);
          border: 1px solid rgba(196,122,30,0.35);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e8a84a;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .oc-eyebrow.visible { opacity: 1; transform: translateY(0); }

        .oc-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c47a1e;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196,122,30,0.6); }
          50% { box-shadow: 0 0 0 5px rgba(196,122,30,0); }
        }

        .oc-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          color: #f5ead8;
          margin: 0 0 16px;
          line-height: 1.15;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .oc-heading.visible { opacity: 1; transform: translateY(0); }
        .oc-heading span {
          background: linear-gradient(135deg, #e8a84a 0%, #c47a1e 50%, #a05a10 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .oc-subtext {
          color: #9a8070;
          font-size: 16px;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 64px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .oc-subtext.visible { opacity: 1; transform: translateY(0); }

        .oc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 56px;
        }

        .oc-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(196,122,30,0.2);
          border-radius: 20px;
          padding: 32px 24px;
          cursor: default;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }
        .oc-card.visible { opacity: 1; transform: translateY(0); }
        .oc-card:hover {
          border-color: rgba(196,122,30,0.55);
          background: rgba(196,122,30,0.06);
        }
        .oc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(ellipse at 50% 0%, rgba(196,122,30,0.12) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .oc-card:hover::before { opacity: 1; }

        .oc-icon-wrap {
          position: relative;
          width: 64px; height: 64px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .oc-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(196,122,30,0.35);
          animation: orbit-ring 6s linear infinite;
        }
        .oc-icon-ring::after {
          content: '';
          position: absolute;
          width: 5px; height: 5px;
          background: #c47a1e;
          border-radius: 50%;
          top: -2.5px;
          left: calc(50% - 2.5px);
          box-shadow: 0 0 6px #c47a1e;
        }
        @keyframes orbit-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .oc-icon-ring-2 {
          animation-duration: 9s;
          animation-direction: reverse;
          inset: 7px;
          border-color: rgba(196,122,30,0.2);
        }
        .oc-icon-ring-2::after {
          width: 4px; height: 4px;
          top: auto;
          bottom: -2px;
          left: calc(50% - 2px);
          background: #e8a84a;
          box-shadow: 0 0 5px #e8a84a;
        }
        .oc-icon-inner {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(196,122,30,0.2) 0%, rgba(196,122,30,0.08) 100%);
          border: 1px solid rgba(196,122,30,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .oc-card:hover .oc-icon-inner {
          background: linear-gradient(135deg, rgba(196,122,30,0.35) 0%, rgba(196,122,30,0.15) 100%);
          transform: scale(1.08);
        }

        .oc-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px;
          font-weight: 600;
          color: #f0e0c0;
          margin: 0 0 10px;
        }
        .oc-card-desc {
          font-size: 13.5px;
          color: #7a6a58;
          line-height: 1.65;
          transition: color 0.3s ease;
        }
        .oc-card:hover .oc-card-desc { color: #9a8068; }

        .oc-cta-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .oc-cta-wrap.visible { opacity: 1; transform: translateY(0); }

        .oc-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #c47a1e 0%, #a05a10 100%);
          color: #fff8ee;
          border: none;
          padding: 15px 36px;
          border-radius: 999px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(196,122,30,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .oc-btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .oc-btn-primary:hover::before { left: 100%; }
        .oc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(196,122,30,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .oc-btn-primary:active { transform: translateY(0); }

        .oc-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #c47a1e;
          border: 1px solid rgba(196,122,30,0.4);
          padding: 14px 28px;
          border-radius: 999px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .oc-btn-secondary:hover {
          border-color: rgba(196,122,30,0.7);
          background: rgba(196,122,30,0.06);
          transform: translateY(-2px);
        }

        .oc-divider {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,122,30,0.5), transparent);
          margin: 0 auto 40px;
          opacity: 0;
          transition: opacity 0.8s ease 0.15s;
        }
        .oc-divider.visible { opacity: 1; }

        @media (max-width: 600px) {
          .oc-section { padding: 72px 6%; }
          .oc-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .oc-card { padding: 24px 16px; }
        }
        @media (max-width: 420px) {
          .oc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="oc-section" ref={sectionRef}>
        {/* Ambient glows */}
        <div className="oc-bg-glow oc-bg-glow-1" />
        <div className="oc-bg-glow oc-bg-glow-2" />

        {/* Star field */}
        <div className="oc-stars" aria-hidden="true">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="oc-star-dot"
              style={
                {
                  width: star.width,
                  height: star.height,
                  top: star.top,
                  left: star.left,
                  '--d': star.d,
                  '--delay': star.delay,
                  '--max-op': star.maxOp,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="oc-inner">
          <div className={`oc-eyebrow${visible ? ' visible' : ''}`}>
            <span className="oc-eyebrow-dot" />
            Personal Consultation
          </div>

          <h2 className={`oc-heading${visible ? ' visible' : ''}`}>
            One Call Can{' '}
            <span>Change Everything</span>
          </h2>

          <div className={`oc-divider${visible ? ' visible' : ''}`} />

          <p className={`oc-subtext${visible ? ' visible' : ''}`}>
            Connect directly with Acharya for a personal consultation that clears confusion,
            reveals the right direction, and helps you move forward with confidence.
          </p>

          <div className="oc-grid">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className={`oc-card${visible ? ' visible' : ''}`}
                  style={{ transitionDelay: visible ? `${0.25 + i * 0.08}s` : '0s' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="oc-icon-wrap">
                    <div className="oc-icon-ring" />
                    <div className="oc-icon-ring oc-icon-ring-2" />
                    <div className="oc-icon-inner">
                      <Icon
                        size={22}
                        color={hovered === i ? '#e8a84a' : '#c47a1e'}
                        strokeWidth={1.5}
                        style={{ transition: 'color 0.3s ease' }}
                      />
                    </div>
                  </div>
                  <div className="oc-card-title">{f.title}</div>
                  <div className="oc-card-desc">{f.desc}</div>
                </div>
              )
            })}
          </div>

          <div className={`oc-cta-wrap${visible ? ' visible' : ''}`}>
            <button className="oc-btn-primary" type="button">
              <Phone size={16} strokeWidth={2} />
              Schedule Your Call
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}