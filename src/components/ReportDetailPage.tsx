import { useParams, Link } from 'react-router-dom'
import { getReportBySlug } from '../data/reportsConfig'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ReportDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const report = getReportBySlug(slug || '')

  if (!report) {
    return (
      <div style={{ background: '#1a0a00', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#f5e6c8' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔮</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '1rem' }}>Report Not Found</h1>
          <p style={{ color: '#c8952a', marginBottom: '2rem' }}>This report doesn't exist or may have moved.</p>
          <Link to="/reports" style={{ background: '#c8952a', color: '#1a0a00', padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>
            View All Reports
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const accent = report.accentColor
  const bg = report.gradientTo

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f5e6c8', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${report.gradientFrom} 0%, ${bg} 100%)`,
          padding: '6rem 1.5rem 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{report.icon}</div>
          <div style={{ color: accent, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Exclusive Report by Astro Arun Pandit
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '0.5rem', color: '#fff' }}>
            {report.title}
          </h1>
          <p style={{ color: accent, fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '1rem' }}>{report.subtitle}</p>
          <p style={{ color: '#d4c4a8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            {report.heroDescription}
          </p>
          <a
            href="#pricing"
            style={{ display: 'inline-block', background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#fff', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: `0 8px 32px ${accent}44`, letterSpacing: '0.05em' }}
          >
            Get Your {report.title} →
          </a>
        </div>
      </section>

      {/* ── WHAT IS ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <SectionLabel color={accent}>What is the {report.title}?</SectionLabel>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '1.25rem', maxWidth: '700px' }}>
          {report.whatIs.heading}
        </h2>
        <p style={{ color: '#c4b49a', lineHeight: 1.8, maxWidth: '750px', marginBottom: '2rem' }}>
          {report.whatIs.description}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {report.whatIs.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#d4c4a8' }}>
              <span style={{ color: accent, fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section style={{ background: '#ffffff08', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel color={accent}>Inside Your Report</SectionLabel>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '2.5rem' }}>
            What's Included in Your {report.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {report.whatsInside.map((item, i) => (
              <div key={i} style={{ background: '#ffffff0a', border: `1px solid ${accent}33`, borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#b0a090', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <SectionLabel color={accent}>The Process</SectionLabel>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '3rem' }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {report.steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, ${accent}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.3rem', fontWeight: 800, color: '#fff', fontFamily: 'Playfair Display, serif', boxShadow: `0 4px 20px ${accent}44` }}>
                {i + 1}
              </div>
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ color: '#b0a090', fontSize: '0.88rem', lineHeight: 1.6 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOR WHOM ── */}
      <section style={{ background: '#ffffff08', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel color={accent}>Who Is This For?</SectionLabel>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '2.5rem' }}>
            This Report Is Made for You If…
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {report.forWhom.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: '#ffffff08', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #ffffff10' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0, marginTop: '2px' }}>{i + 1}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.95rem' }}>{item.title}</div>
                  <div style={{ color: '#b0a090', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <SectionLabel color={accent}>Pricing</SectionLabel>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '2.5rem' }}>
          Choose Your {report.title} Package
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {report.pricingPlans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.highlight ? `linear-gradient(145deg, ${accent}18, ${accent}08)` : '#ffffff08',
                border: `2px solid ${plan.highlight ? accent : '#ffffff15'}`,
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {plan.highlight && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: accent, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '50px', letterSpacing: '0.1em' }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', marginBottom: '0.5rem', paddingRight: plan.highlight ? '6rem' : 0 }}>{plan.name}</h3>
              <p style={{ color: '#b0a090', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{plan.tagline}</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: '#888', textDecoration: 'line-through', fontSize: '0.9rem', marginRight: '0.5rem' }}>{plan.originalPrice}</span>
                <span style={{ color: accent, fontSize: '2rem', fontWeight: 800, fontFamily: 'Playfair Display, serif' }}>{plan.discountedPrice}</span>
                <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '0.25rem' }}>only</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: f.included ? '#d4c4a8' : '#666' }}>
                    <span style={{ color: f.included ? accent : '#555', fontSize: '1rem', flexShrink: 0 }}>{f.included ? '✓' : '✗'}</span>
                    {f.label}
                  </li>
                ))}
              </ul>
              <button
                style={{ width: '100%', background: plan.highlight ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : 'transparent', border: `2px solid ${plan.highlight ? 'transparent' : accent}`, color: plan.highlight ? '#fff' : accent, padding: '0.875rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', letterSpacing: '0.05em' }}
              >
                BUY NOW →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: '#ffffff08', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: `linear-gradient(135deg, ${accent}44, ${accent}22)`, border: `3px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexShrink: 0 }}>
            🧙‍♂️
          </div>
          <div>
            <SectionLabel color={accent}>About the Expert</SectionLabel>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>Astro Arun Pandit</h2>
            <div style={{ color: accent, fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>Gold Medalist & Certified Astrologer</div>
            <p style={{ color: '#b0a090', lineHeight: 1.8, fontSize: '0.95rem' }}>
              A renowned astrologer in India who has analyzed over 2 lakh Kundlis. Mentored by his father — who brings over 53 years of astrological legacy — he delivers precise insights and practical guidance. He believes astrology is not a matter of belief, but a precise science that provides clarity and empowered decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <SectionLabel color={accent}>Testimonials</SectionLabel>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '2.5rem' }}>
          What Our Clients Say
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {report.testimonials.map((t, i) => (
            <div key={i} style={{ background: '#ffffff08', border: '1px solid #ffffff12', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ color: accent, fontSize: '1.5rem', marginBottom: '0.75rem' }}>❝</div>
              <p style={{ color: '#c4b49a', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.25rem' }}>{t.text}</p>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#ffffff08', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SectionLabel color={accent}>FAQ</SectionLabel>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '2.5rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {report.faqs.map((faq, i) => (
              <details key={i} style={{ background: '#ffffff08', border: '1px solid #ffffff12', borderRadius: '12px', padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
                <summary style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  {faq.question}
                  <span style={{ color: accent, fontSize: '1.2rem', flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ color: '#b0a090', marginTop: '0.75rem', lineHeight: 1.7, fontSize: '0.9rem' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center', background: `linear-gradient(180deg, transparent 0%, ${report.gradientFrom}88 100%)` }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{report.icon}</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', marginBottom: '1rem' }}>
            Ready to Unlock Your {report.title}?
          </h2>
          <p style={{ color: '#b0a090', marginBottom: '2rem', lineHeight: 1.7 }}>{report.tagline}</p>
          <a
            href="#pricing"
            style={{ display: 'inline-block', background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#fff', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: `0 8px 32px ${accent}44` }}
          >
            Order Your Report →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ color, fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
      {children}
    </div>
  )
}
