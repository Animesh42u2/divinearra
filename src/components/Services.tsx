import { useState } from 'react'
import { MessageCircle, Briefcase, Users, Gem, BookOpen, Sun, ClipboardList, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const tabs = ['Consultations', 'Reports', 'Kundli']

const serviceData: Record<string, {
  tag: string
  Icon: LucideIcon
  title: string
  desc: string
  btnLabel: string
}[]> = {
  Consultations: [
    {
      tag: '1-on-1',
      Icon: MessageCircle,
      title: 'Personalized Consultation',
      desc: 'Get personalized guidance directly from the leading expert for clear life decisions.',
      btnLabel: 'Book Now',
    },
    {
      tag: 'Expert',
      Icon: Briefcase,
      title: 'Career Astrology Consultation',
      desc: 'Get expert guidance for your career growth and professional success.',
      btnLabel: 'Book Now',
    },
    {
      tag: 'Couple',
      Icon: Users,
      title: 'Couple Consultation',
      desc: 'Understand your relationship dynamics and get clarity for your future together.',
      btnLabel: 'Book Now',
    },
    {
      tag: 'Special',
      Icon: Gem,
      title: 'Gemstone & Rudraksha',
      desc: 'Get the right gemstone recommendations based on your birth chart analysis.',
      btnLabel: 'Book Now',
    },
  ],
  Reports: [
    {
      tag: "India's No.1",
      Icon: BookOpen,
      title: 'Life Journey Report',
      desc: 'Detailed life guidance through a customized birth chart analysis.',
      btnLabel: 'Order Now',
    },
    {
      tag: 'Bestseller',
      Icon: Sun,
      title: 'Life Changing Report',
      desc: 'Detailed yearly predictions based on your birth chart and planetary positions.',
      btnLabel: 'Order Now',
    },
    {
      tag: 'New',
      Icon: BookOpen,
      title: 'Varshphal Report',
      desc: 'Your 2026 + 4 years astrological forecast with detailed yearly insights.',
      btnLabel: 'Order Now',
    },
    {
      tag: 'New',
      Icon: BookOpen,
      title: 'Name Number Report',
      desc: 'Numerological analysis of your name to unlock hidden potential.',
      btnLabel: 'Order Now',
    },
  ],
  Kundli: [
    {
      tag: 'FREE',
      Icon: ClipboardList,
      title: 'Free Kundli Calculator',
      desc: 'Generate your accurate birth chart instantly for fundamental celestial insights.',
      btnLabel: 'Check Now',
    },
    {
      tag: 'Ideal',
      Icon: Heart,
      title: 'Matchmaking Kundli',
      desc: 'Check marriage compatibility with detailed Guna Milan analysis.',
      btnLabel: 'Check Now',
    },
  ],
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('Consultations')
  const cards = serviceData[activeTab]

  return (
    <section style={{ padding: '72px 8%', background: '#fdf6ed' }}>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        {cards.map(s => (
          <div
            key={s.title}
            style={{
              background: '#fff5e6',
              borderRadius: 16,
              padding: '28px 22px',
              border: '1.5px solid #e8d5b7',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                fontSize: 11,
                color: '#9a7050',
                fontFamily: 'sans-serif',
                background: '#fff',
                padding: '2px 10px',
                borderRadius: 10,
                border: '1px solid #e8d5b7',
              }}
            >
              {s.tag}
            </span>

            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                border: '1.5px solid #e8d5b7',
              }}
            >
              <s.Icon size={24} color="#c47a1e" strokeWidth={1.5} />
            </div>

            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: '0 0 10px',
                color: '#4a2006',
                fontFamily: 'Georgia, serif',
              }}
            >
              {s.title}
            </h3>

            <p
              style={{
                fontSize: 13,
                color: '#9a7050',
                lineHeight: 1.6,
                fontFamily: 'sans-serif',
                marginBottom: 18,
                flex: 1,
              }}
            >
              {s.desc}
            </p>

            <button
              style={{
                width: '100%',
                background: 'transparent',
                border: '1.5px solid #4a2006',
                color: '#4a2006',
                padding: '10px',
                borderRadius: 8,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'sans-serif',
                fontSize: 13,
                marginTop: 'auto',
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
