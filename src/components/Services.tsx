import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageCircle, Briefcase, Users,
  BookOpen, Sun, ClipboardList, Heart,
  DollarSign, Calendar, GraduationCap,
  Activity, Moon, Star, Layers
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const tabs = [ 'Reports','Consultations', 'Kundli']

const serviceData: Record<string, {
  tag: string
  Icon: LucideIcon
  title: string
  desc: string
  btnLabel: string
  route: string
}[]> = {
  Consultations: [
    { tag: '1-on-1', Icon: MessageCircle, title: 'Personalized Consultation', desc: 'Get personalized guidance directly from the leading expert for clear life decisions.', btnLabel: 'Book Now', route: '/consultation/personal' },
    // { tag: 'Expert', Icon: Briefcase, title: 'Tarot Card Reading Consultation', desc: 'Get expert guidance for your career growth and professional success.', btnLabel: 'Book Now', route: '/consultation/tarot-card-reading' },
    { tag: 'Couple', Icon: Users, title: 'Couple Consultation', desc: 'Understand your relationship dynamics and get clarity for your future together.', btnLabel: 'Book Now', route: '/consultation/couple' },
    // { tag: 'Special', Icon: Gem, title: 'Gemstone & Rudraksha', desc: 'Get the right gemstone recommendations based on your birth chart analysis.', btnLabel: 'Book Now', route: '/consultation/gemstone-rudraksha' },
  ],
  Reports: [
  { tag: 'Premium', Icon: Star, title: 'Premium Personalized Kundali', desc: 'A deeply detailed, fully personalized Kundali report crafted just for you.', btnLabel: 'Order Now', route: '/reports/premium-kundali' },
  { tag: 'Expert', Icon: Briefcase, title: 'Career Report', desc: 'Detailed career guidance through planetary analysis and life path insights.', btnLabel: 'Order Now', route: '/reports/career-report' },
  { tag: 'Popular', Icon: DollarSign, title: 'Finance Report', desc: 'Understand your financial destiny and wealth-building potential through Vedic astrology.', btnLabel: 'Order Now', route: '/reports/finance-report' },
  { tag: 'New', Icon: Calendar, title: 'Varshaphal Report', desc: 'Your 2026 + 4 years astrological forecast with detailed yearly insights.', btnLabel: 'Order Now', route: '/reports/varshaphal-report' },
  { tag: 'Ancient', Icon: BookOpen, title: 'Lal Kitab Report', desc: 'Remedies and predictions based on the powerful ancient Lal Kitab system.', btnLabel: 'Order Now', route: '/reports/lal-kitab-report' },
  { tag: 'New', Icon: GraduationCap, title: 'Education Report', desc: 'Find the right field of study and timing for academic success.', btnLabel: 'Order Now', route: '/reports/education-report' },
  { tag: 'Wellness', Icon: Activity, title: 'Health Report', desc: 'Astrological insights into your health patterns and preventive guidance.', btnLabel: 'Order Now', route: '/reports/health-report' },
  { tag: 'Saturn', Icon: Moon, title: 'Shani Sadesati Report', desc: 'Understand and navigate the 7.5-year Saturn transit with confidence.', btnLabel: 'Order Now', route: '/reports/shani-sadesati-report' },
  { tag: 'Lucky', Icon: Sun, title: 'Fortune Report', desc: 'Discover your lucky periods, numbers, and life opportunities ahead.', btnLabel: 'Order Now', route: '/reports/fortune-report' },
  { tag: 'Ideal', Icon: Heart, title: 'Couple Matching Report', desc: 'Check deep compatibility and marriage suitability through Guna Milan.', btnLabel: 'Order Now', route: '/reports/couple-matching-report' },
],
  Kundli: [
  { tag: 'FREE', Icon: ClipboardList, title: 'Free Kundli Calculator',
    desc: 'Generate your accurate birth chart instantly for fundamental celestial insights.',
    btnLabel: 'Check Now', route: '#kundli-section' },          

  { tag: 'Ideal', Icon: Layers, title: 'Matchmaking Kundli',
    desc: 'Check marriage compatibility with detailed Guna Milan analysis.',
    btnLabel: 'Check Now', route: '#calculators-section' },     
],
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('Reports')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const navigate = useNavigate()

  const cards = serviceData[activeTab]

  return (
    <section style={{ padding: 'clamp(56px, 7vw, 100px) clamp(20px, 6vw, 8%)', background: '#fdf6ed', overflow: 'hidden' }}>
      <style>{`
        .svc-card {
          background: #fff5e6;
          border-radius: 20px;
          padding: clamp(28px, 2.2vw, 38px) clamp(22px, 1.8vw, 30px);
          border: 1.5px solid #e8d5b7;
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.28s ease,
                      border-color 0.28s ease,
                      background 0.28s ease;
          overflow: hidden;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(196,122,30,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.28s ease;
          border-radius: 20px;
          pointer-events: none;
        }
        .svc-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 48px rgba(196,122,30,0.18), 0 4px 12px rgba(0,0,0,0.06);
          border-color: #c47a1e;
          background: #fff8f0;
        }
        .svc-card:hover::before { opacity: 1; }

        .svc-icon-wrap {
          width: clamp(56px, 4.2vw, 72px);
          height: clamp(56px, 4.2vw, 72px);
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: clamp(16px, 1.4vw, 22px);
          border: 1.5px solid #e8d5b7;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
        }
        .svc-icon-wrap svg {
          width: clamp(24px, 1.8vw, 32px);
          height: clamp(24px, 1.8vw, 32px);
        }
        .svc-card:hover .svc-icon-wrap {
          border-color: #c47a1e;
          background: linear-gradient(135deg, #fff8ee, #fff);
          transform: rotate(-5deg) scale(1.1);
        }

        .svc-btn {
          width: 100%;
          background: transparent;
          border: 1.5px solid #4a2006;
          color: #4a2006;
          padding: clamp(10px, 0.9vw, 14px);
          border-radius: 9px;
          font-weight: 600;
          cursor: pointer;
          font-family: sans-serif;
          font-size: clamp(13px, 0.95vw, 15px);
          margin-top: auto;
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
        }
        .svc-card:hover .svc-btn {
          background: linear-gradient(90deg, #c47a1e, #e8a135);
          color: #fff;
          border-color: transparent;
          transform: translateY(-1px);
        }

        .svc-tag {
          position: absolute;
          top: clamp(14px, 1.1vw, 18px);
          right: clamp(14px, 1.1vw, 18px);
          font-size: clamp(11px, 0.8vw, 12.5px);
          color: #9a7050;
          font-family: sans-serif;
          background: #fff;
          padding: 3px 11px;
          border-radius: 10px;
          border: 1px solid #e8d5b7;
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        }
        .svc-card:hover .svc-tag {
          background: #c47a1e;
          color: #fff;
          border-color: #c47a1e;
        }

        .svc-title {
          font-size: clamp(15px, 1.15vw, 18px);
          font-weight: 700;
          margin: 0 0 12px;
          color: #4a2006;
          line-height: 1.3;
        }

        .svc-desc {
          font-size: clamp(13px, 0.95vw, 15px);
          color: #9a7050;
          line-height: 1.6;
          font-family: sans-serif;
          margin-bottom: 20px;
          flex: 1;
        }

        .svc-eyebrow { font-size: clamp(13px, 0.85vw, 14px); }
        .svc-heading { font-size: clamp(30px, 3vw, 46px); }
        .svc-subhead { font-size: clamp(17px, 1.3vw, 20px); }

        .svc-tab-btn {
          padding: clamp(9px, 0.8vw, 12px) clamp(20px, 1.8vw, 28px);
          font-size: clamp(13px, 0.95vw, 15px);
        }

        .svc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  justify-content: center;
  gap: clamp(18px, 1.6vw, 26px);
  max-width: 1500px;
  margin: 0 auto;
}
@media (max-width: 480px) {
  .svc-grid { grid-template-columns: minmax(0, 340px); }
}
      `}</style>

      <h2 className="svc-heading" style={{ textAlign: 'center', fontWeight: 700, margin: '0 0 14px' }}>
        Our <span style={{ color: '#c47a1e' }}>Services</span>
      </h2>
      <p className="svc-subhead" style={{ textAlign: 'center', color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 40 }}>
        Choose the service that fits your needs and start your journey toward clarity
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 44, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className="svc-tab-btn"
            onClick={() => setActiveTab(tab)}
            style={{
              borderRadius: 25,
              border: '1.5px solid #e0c090',
              background: activeTab === tab ? '#c47a1e' : 'transparent',
              color: activeTab === tab ? '#fff' : '#7a3e0a',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'sans-serif',
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="svc-grid">
        {cards.map(s => (
          <div
            key={s.title}
            className="svc-card"
            onMouseEnter={() => setHoveredCard(s.title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <span className="svc-tag">{s.tag}</span>

            <div className="svc-icon-wrap">
              <s.Icon
                color={hoveredCard === s.title ? '#c47a1e' : '#c47a1e'}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="svc-title">
              {s.title}
            </h3>

            <p className="svc-desc">
              {s.desc}
            </p>

            <button
  className="svc-btn"
  onClick={() => {
    if (s.route.startsWith('#')) {
      const el = document.querySelector(s.route)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(s.route)
    }
  }}
>
  {s.btnLabel}
</button>
          </div>
        ))}
      </div>
    </section>
  )
}