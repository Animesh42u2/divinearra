import { useState } from 'react'
import {
  MessageCircle, Briefcase, Users, Gem,
  BookOpen, Sun, ClipboardList, Heart,
  DollarSign, Calendar, GraduationCap,
  Activity, Moon, Star, Layers
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import BookingModal from './BookingModal'

const tabs = ['Consultations', 'Reports', 'Kundli']

const serviceData: Record<string, {
  tag: string
  Icon: LucideIcon
  title: string
  desc: string
  btnLabel: string
}[]> = {
  Consultations: [
    { tag: '1-on-1', Icon: MessageCircle, title: 'Personalized Consultation', desc: 'Get personalized guidance directly from the leading expert for clear life decisions.', btnLabel: 'Book Now' },
    { tag: 'Expert', Icon: Briefcase, title: 'Tarot Card Reading Consultation', desc: 'Get expert guidance for your career growth and professional success.', btnLabel: 'Book Now' },
    { tag: 'Couple', Icon: Users, title: 'Couple Consultation', desc: 'Understand your relationship dynamics and get clarity for your future together.', btnLabel: 'Book Now' },
    { tag: 'Special', Icon: Gem, title: 'Gemstone & Rudraksha', desc: 'Get the right gemstone recommendations based on your birth chart analysis.', btnLabel: 'Book Now' },
  ],
  Reports: [
    { tag: "Premium", Icon: Star, title: 'Premium Personalized Kundali', desc: 'A deeply detailed, fully personalized Kundali report crafted just for you.', btnLabel: 'Order Now' },
    { tag: 'Expert', Icon: Briefcase, title: 'Career Report', desc: 'Detailed career guidance through planetary analysis and life path insights.', btnLabel: 'Order Now' },
    { tag: 'Popular', Icon: DollarSign, title: 'Finance Report', desc: 'Understand your financial destiny and wealth-building potential through Vedic astrology.', btnLabel: 'Order Now' },
    { tag: 'New', Icon: Calendar, title: 'Varshaphal Report', desc: 'Your 2026 + 4 years astrological forecast with detailed yearly insights.', btnLabel: 'Order Now' },
    { tag: 'Ancient', Icon: BookOpen, title: 'Lal Kitab Report', desc: 'Remedies and predictions based on the powerful ancient Lal Kitab system.', btnLabel: 'Order Now' },
    { tag: 'New', Icon: GraduationCap, title: 'Education Report', desc: 'Find the right field of study and timing for academic success.', btnLabel: 'Order Now' },
    { tag: 'Wellness', Icon: Activity, title: 'Health Report', desc: 'Astrological insights into your health patterns and preventive guidance.', btnLabel: 'Order Now' },
    { tag: 'Saturn', Icon: Moon, title: 'Shani Sadesati Report', desc: 'Understand and navigate the 7.5-year Saturn transit with confidence.', btnLabel: 'Order Now' },
    { tag: 'Lucky', Icon: Sun, title: 'Fortune Report', desc: 'Discover your lucky periods, numbers, and life opportunities ahead.', btnLabel: 'Order Now' },
    { tag: 'Ideal', Icon: Heart, title: 'Couple Matching Report', desc: 'Check deep compatibility and marriage suitability through Guna Milan.', btnLabel: 'Order Now' },
  ],
  Kundli: [
    { tag: 'FREE', Icon: ClipboardList, title: 'Free Kundli Calculator', desc: 'Generate your accurate birth chart instantly for fundamental celestial insights.', btnLabel: 'Check Now' },
    { tag: 'Ideal', Icon: Layers, title: 'Matchmaking Kundli', desc: 'Check marriage compatibility with detailed Guna Milan analysis.', btnLabel: 'Check Now' },
  ],
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('Consultations')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeService, setActiveService] = useState<string | null>(null)

  const cards = serviceData[activeTab]

  return (
    <section style={{ padding: '72px 8%', background: '#fdf6ed', overflow: 'hidden' }}>
      <style>{`
        .svc-card {
          background: #fff5e6;
          border-radius: 18px;
          padding: 28px 22px;
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
          border-radius: 18px;
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
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          border: 1.5px solid #e8d5b7;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
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
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-family: sans-serif;
          font-size: 13px;
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
          top: 14px; right: 14px;
          font-size: 11px;
          color: #9a7050;
          font-family: sans-serif;
          background: #fff;
          padding: 2px 10px;
          border-radius: 10px;
          border: 1px solid #e8d5b7;
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        }
        .svc-card:hover .svc-tag {
          background: #c47a1e;
          color: #fff;
          border-color: #c47a1e;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 720px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .svc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 8 }}>
        What We Offer
      </p>
      <h2 style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, margin: '0 0 10px', fontFamily: 'Georgia, serif' }}>
        Our <span style={{ color: '#c47a1e' }}>Services</span>
      </h2>
      <p style={{ textAlign: 'center', color: '#9a7050', fontFamily: 'sans-serif', marginBottom: 32, fontSize: 15 }}>
        Choose the service that fits your needs and start your journey toward clarity
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 22px',
              borderRadius: 25,
              border: '1.5px solid #e0c090',
              background: activeTab === tab ? '#c47a1e' : 'transparent',
              color: activeTab === tab ? '#fff' : '#7a3e0a',
              fontWeight: 600,
              fontSize: 14,
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
                size={24}
                color={hoveredCard === s.title ? '#c47a1e' : '#c47a1e'}
                strokeWidth={1.5}
              />
            </div>

            <h3 style={{
              fontSize: 15,
              fontWeight: 700,
              margin: '0 0 10px',
              color: '#4a2006',
              fontFamily: 'Georgia, serif',
              lineHeight: 1.3,
            }}>
              {s.title}
            </h3>

            <p style={{
              fontSize: 13,
              color: '#9a7050',
              lineHeight: 1.6,
              fontFamily: 'sans-serif',
              marginBottom: 18,
              flex: 1,
            }}>
              {s.desc}
            </p>

            <button
              className="svc-btn"
              onClick={() => setActiveService(s.title)}
            >
              {s.btnLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {activeService && (
        <BookingModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  )
}