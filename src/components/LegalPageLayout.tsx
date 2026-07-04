import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AMBER      = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const CREAM      = '#fdf6e9'
const BROWN_TEXT = '#2a1200'
const BROWN_MID  = '#6b3a10'

export interface LegalSection {
  heading: string
  body?: string[]
  list?: string[]
  note?: string
}

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
  closingNote: string
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Fixed positions/timings so stars don't reshuffle on every re-render
const STARS = [
  { top: '14%', left: '10%', size: 3, delay: 0 },
  { top: '22%', left: '82%', size: 2, delay: 0.6 },
  { top: '65%', left: '6%',  size: 2, delay: 1.2 },
  { top: '75%', left: '90%', size: 3, delay: 0.3 },
  { top: '10%', left: '48%', size: 2, delay: 1.6 },
  { top: '40%', left: '92%', size: 2, delay: 0.9 },
  { top: '55%', left: '18%', size: 3, delay: 1.9 },
  { top: '30%', left: '30%', size: 2, delay: 2.3 },
  { top: '80%', left: '40%', size: 2, delay: 0.4 },
  { top: '18%', left: '65%', size: 3, delay: 1.1 },
  { top: '60%', left: '75%', size: 2, delay: 1.7 },
  { top: '85%', left: '15%', size: 2, delay: 2.6 },
]

function Twinkle({ top, left, size, delay }: { top: string; left: string; size: number; delay: number }) {
  return (
    <motion.span
      style={{
        position: 'absolute', top, left, width: size, height: size, borderRadius: '50%',
        background: '#e8c97a', boxShadow: '0 0 6px 1px rgba(232,201,122,0.8)',
        pointerEvents: 'none',
      }}
      animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Premium flanking Om medallions — one to the left, one to the right of the hero content.
// side: -1 for left, 1 for right.
function SideOm({ side }: { side: -1 | 1 }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: '50%',
        [side === -1 ? 'left' : 'right']: 'clamp(0.75rem, 4vw, 4.5rem)',
        transform: 'translateY(-50%)',
        zIndex: 1, pointerEvents: 'none',
      } as React.CSSProperties}
      initial={{ opacity: 0, x: side * 24 }}
      animate={{ opacity: 1, x: 0, y: ['-50%', 'calc(-50% - 10px)', '-50%'] }}
      transition={{
        opacity: { duration: 0.8, delay: 0.4 },
        x: { duration: 0.8, delay: 0.4 },
        y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
      }}
    >
      <div style={{
        position: 'relative',
        width: 'clamp(56px, 8vw, 92px)', height: 'clamp(56px, 8vw, 92px)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle at 35% 30%, rgba(232,201,122,0.16), rgba(200,121,26,0.05) 70%)',
        border: '1px solid rgba(232,201,122,0.4)',
        boxShadow: '0 0 0 1px rgba(232,201,122,0.12) inset, 0 0 26px rgba(232,201,122,0.18)',
      }}>
        {/* soft outer glow pulse */}
        <motion.div
          style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: '1px solid rgba(232,201,122,0.25)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{
          fontFamily: "'Noto Sans Devanagari', 'Segoe UI', serif",
          fontSize: 'clamp(26px, 4vw, 44px)',
          lineHeight: 1,
          background: 'linear-gradient(160deg, #f6dfa0 0%, #e8c97a 45%, #c8791a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(232,201,122,0.45))',
        }}>
          ॐ
        </span>
      </div>
    </motion.div>
  )
}

export default function LegalPageLayout({ eyebrow, title, intro, sections, closingNote }: LegalPageLayoutProps) {
  return (
    <div style={{
      background: CREAM, minHeight: '100vh', width: '100%', maxWidth: '100%',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      overflowX: 'hidden', boxSizing: 'border-box',
      display: 'block',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@500;700&display=swap');`}</style>

      {/* ════════════ HEADER BANNER ════════════ */}
      <section style={{
        background: 'radial-gradient(120% 160% at 50% 0%, #3a1700 0%, #1f0d00 55%, #120600 100%)',
        padding: 'clamp(3.4rem,9vw,5.5rem) clamp(1.25rem,5vw,2.5rem) clamp(4rem,9vw,6rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        {/* fine gold hairline at the very top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #e8c97a 50%, transparent 100%)',
          opacity: 0.6,
        }} />
        {/* subtle dot-grid texture for depth */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(232,201,122,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 20%, transparent 80%)',
          pointerEvents: 'none',
        }} />
        {/* layered glows */}
        <div style={{
          position: 'absolute', top: '-25%', left: '50%', transform: 'translateX(-50%)',
          width: 'min(640px, 140vw)', height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,121,26,0.22) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '18%',
          width: 'min(320px, 60vw)', height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,201,122,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* astro theme: twinkling starfield + premium flanking Om medallions */}
        {STARS.map((s, i) => <Twinkle key={i} {...s} />)}
        <SideOm side={-1} />
        <SideOm side={1} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
          <motion.div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'linear-gradient(135deg, rgba(232,201,122,0.12), rgba(255,255,255,0.05))',
              border: '1px solid rgba(232,201,122,0.35)',
              borderRadius: 20, padding: '7px 20px', fontSize: 'clamp(10.5px,2vw,12px)',
              color: '#e8c97a', fontWeight: 600, letterSpacing: '0.16em',
              marginBottom: '1.4rem', textTransform: 'uppercase',
              boxShadow: '0 4px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              style={{ display: 'inline-flex' }}
              animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={13} />
            </motion.span>
            {eyebrow}
          </motion.div>
          <motion.h1
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(2.2rem,6vw,3.6rem)', fontWeight: 800,
              color: '#fdf6e9', margin: 0, lineHeight: 1.18,
              textShadow: '0 2px 24px rgba(200,121,26,0.25)',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.div
            style={{
              width: 64, height: 3, margin: '1.3rem auto 0', borderRadius: 2,
              background: `linear-gradient(90deg, transparent, ${AMBER}, #e8c97a, ${AMBER}, transparent)`,
              backgroundSize: '200% 100%',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1, backgroundPosition: ['0% 0%', '200% 0%'] }}
            transition={{
              scaleX: { duration: 0.6, delay: 0.5 },
              opacity: { duration: 0.6, delay: 0.5 },
              backgroundPosition: { duration: 3, delay: 1, repeat: Infinity, ease: 'linear' },
            }}
          />
        </div>

        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: 52,
          background: CREAM, clipPath: 'ellipse(58% 100% at 50% 100%)',
        }} />
      </section>

      {/* ════════════ INTRO ════════════ */}
      <section style={{ maxWidth: 1040, width: '100%', margin: '-1.5rem auto 0', padding: '0 clamp(1rem,4vw,2rem)', position: 'relative', zIndex: 3 }}>
        <FadeUp>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 'clamp(1.2rem,3vw,1.7rem) clamp(1.4rem,3vw,2rem)',
            border: `1px solid ${AMBER}30`, boxShadow: '0 6px 28px rgba(200,121,26,0.14)',
          }}>
            <p style={{ color: BROWN_MID, fontSize: 'clamp(1.05rem,2.1vw,1.15rem)', lineHeight: 1.85, margin: 0, textAlign: 'left' }}>
              {intro}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ════════════ SECTIONS ════════════ */}
      <section style={{ maxWidth: 1040, width: '100%', margin: '0 auto', padding: '2.5rem clamp(1rem,4vw,2rem) 1rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {sections.map((sec, i) => (
          <FadeUp key={sec.heading} delay={Math.min(i * 0.04, 0.3)}>
            <div style={{
              background: '#fff', borderRadius: 14,
              padding: 'clamp(1.1rem,3vw,1.5rem) clamp(1.3rem,3vw,1.8rem)',
              border: `1px solid ${AMBER}22`,
              boxShadow: '0 2px 14px rgba(200,121,26,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.25rem,2.6vw,1.55rem)',
                color: AMBER_DARK, margin: 0, fontWeight: 700,
                textAlign: 'center',
              }}>
                {sec.heading}
              </h2>
              <div style={{
                width: 36, height: 3, borderRadius: 2, marginTop: '0.7rem', marginBottom: '0.7rem',
                background: `linear-gradient(90deg, ${AMBER}, #e8c97a)`,
              }} />
              {/* Body copy reads left-aligned for legibility; the block itself stays
                  centered on the page via the parent's alignItems + maxWidth. */}
              <div style={{ width: '100%', maxWidth: 680, textAlign: 'left' }}>
                {sec.body?.map((p, j) => (
                  <p key={j} style={{
                    color: BROWN_MID, fontSize: 'clamp(1rem,1.9vw,1.1rem)',
                    lineHeight: 1.8, margin: j === 0 ? 0 : '0.8rem 0 0',
                  }}>
                    {p}
                  </p>
                ))}
                {sec.list && (
                  <ul style={{ margin: sec.body ? '0.8rem 0 0' : 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {sec.list.map((item, k) => (
                      <li key={k} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        color: BROWN_MID, fontSize: 'clamp(1rem,1.9vw,1.1rem)', lineHeight: 1.75,
                        textAlign: 'left',
                      }}>
                        <span style={{ color: AMBER, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.note && (
                  <p style={{
                    color: BROWN_TEXT, fontSize: 'clamp(1rem,1.9vw,1.1rem)',
                    lineHeight: 1.75, margin: '0.9rem 0 0', paddingTop: '0.8rem',
                    borderTop: `1px dashed ${AMBER}40`, fontWeight: 600,
                    textAlign: 'left',
                  }}>
                    {sec.note}
                  </p>
                )}
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ════════════ CLOSING NOTE ════════════ */}
      <section style={{ maxWidth: 1040, width: '100%', margin: '0 auto', padding: '0.5rem clamp(1rem,4vw,2rem) 0' }}>
        <FadeUp>
          <div style={{
            background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 100%)`,
            borderRadius: 14, padding: 'clamp(1.2rem,3vw,1.6rem) clamp(1.4rem,3vw,2rem)',
            textAlign: 'center',
          }}>
            <p style={{
              color: '#fff', fontSize: 'clamp(1.05rem,2.1vw,1.15rem)',
              lineHeight: 1.8, margin: 0, fontStyle: 'italic', fontWeight: 500,
              textAlign: 'center',
            }}>
              {closingNote}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section style={{ maxWidth: 1040, width: '100%', margin: '0 auto', padding: '2rem clamp(1rem,4vw,2rem) 4.5rem' }}>
        <FadeUp>
          <div style={{
            background: '#fff', borderRadius: 14, padding: 'clamp(1.2rem,3vw,1.6rem) clamp(1.4rem,3vw,2rem)',
            border: `1px solid ${AMBER}22`, boxShadow: '0 2px 14px rgba(200,121,26,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.25rem,2.6vw,1.55rem)',
              color: BROWN_TEXT, margin: '0 0 1rem', fontWeight: 700,
            }}>
              Questions? Reach Out
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: BROWN_MID, fontSize: '1.05rem' }}>
                <Phone size={16} color={AMBER} style={{ flexShrink: 0 }} />
                <span>+91 8280055593</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: BROWN_MID, fontSize: '1.05rem' }}>
                <Mail size={16} color={AMBER} style={{ flexShrink: 0 }} />
                <span>support@divinearra.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: BROWN_MID, fontSize: '1.05rem', lineHeight: 1.6, textAlign: 'center' }}>
                <MapPin size={16} color={AMBER} style={{ flexShrink: 0 }} />
                <span>3rd Floor, Shanti Enclave, Laxmisagar, Bhubaneswar, Odisha, 751006</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
