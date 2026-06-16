import { useEffect, useRef } from 'react' 
import { motion, useInView } from 'framer-motion'

// ─── THEME (matches CourseDetailPage) ───────────────────────
const AMBER       = '#c8791a'
const AMBER_DARK  = '#8b4e0a'
const AMBER_LIGHT = '#e8a84b'
const CREAM       = '#fdf6e9'
const BROWN_TEXT  = '#2a1200'
const BROWN_MID   = '#6b3a10'

type ForWhomItem = { title: string; description: string }

type ForWhomSlidingProps = {
  forWhom: ForWhomItem[]
}

// ─── card stack animation (self-contained, no external lib) ──
// autoPlayOnce: if true, plays through the stack one time (triggered by
// scroll-into-view), then stops automated cycling — drag/swipe still works.
function useSlidingStack(autoPlayOnce: boolean, autoPlayInterval: number, count: number) {
  const stackRef = useRef<HTMLDivElement>(null)
  const orderRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    orderRef.current = Array.from(stack.querySelectorAll<HTMLElement>('[data-card]'))

    let isDragging = false
    let startX = 0
    let currentX = 0
    let rafId: number | null = null
    const DURATION = 320

    const front = () => orderRef.current[0]

    const layout = () => {
      orderRef.current.forEach((card, i) => {
        const depth = i + 1
        card.style.zIndex = String(100 - depth)
        card.style.transition = 'transform 320ms ease, opacity 320ms ease'
        card.style.transform = `perspective(800px) translateZ(${-14 * depth}px) translateY(${8 * depth}px) translateX(0px) rotate(0deg)`
        card.style.opacity = '1'
      })
    }

    const applyDragVisual = (deltaX: number) => {
      const card = front()
      if (!card) return
      const rotate = deltaX * 0.06
      const fade = 1 - Math.min(Math.abs(deltaX) / 140, 1) * 0.7
      card.style.transform = `perspective(800px) translateZ(-14px) translateY(8px) translateX(${deltaX}px) rotate(${rotate}deg)`
      card.style.opacity = String(fade)
    }

    const recycleFront = (direction: number) => {
      const card = front()
      if (!card) return
      card.style.transition = `transform ${DURATION}ms cubic-bezier(.2,.7,.3,1), opacity ${DURATION}ms ease`
      card.style.transform = `perspective(800px) translateZ(-14px) translateY(8px) translateX(${direction * 420}px) rotate(${direction * 18}deg)`
      card.style.opacity = '0'

      window.setTimeout(() => {
        orderRef.current = [...orderRef.current.slice(1), card]
        layout()
      }, DURATION)
    }

    const handleStart = (clientX: number) => {
      if (isDragging) return
      isDragging = true
      startX = currentX = clientX
      const card = front()
      if (card) card.style.transition = 'none'
    }

    const handleMove = (clientX: number) => {
      if (!isDragging) return
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        currentX = clientX
        applyDragVisual(currentX - startX)
      })
    }

    const handleEnd = () => {
      if (!isDragging) return
      isDragging = false
      if (rafId) cancelAnimationFrame(rafId)

      const deltaX = currentX - startX
      const threshold = 60
      const card = front()
      if (!card) return

      card.style.transition = `transform ${DURATION}ms ease, opacity ${DURATION}ms ease`

      if (Math.abs(deltaX) > threshold) {
        recycleFront(Math.sign(deltaX) || 1)
      } else {
        layout()
      }
      startX = currentX = 0
    }

    const onPointerDown = (e: PointerEvent) => handleStart(e.clientX)
    const onPointerMove = (e: PointerEvent) => handleMove(e.clientX)
    const onPointerUp = () => handleEnd()
    const onPointerLeave = () => isDragging && handleEnd()

    stack.addEventListener('pointerdown', onPointerDown)
    stack.addEventListener('pointermove', onPointerMove)
    stack.addEventListener('pointerup', onPointerUp)
    stack.addEventListener('pointerleave', onPointerLeave)

    layout()

    // Auto-play once through every card, then stop — only manual drag after.
    const timeouts: number[] = []
    if (autoPlayOnce && count > 1) {
      for (let i = 0; i < count - 1; i++) {
        const t = window.setTimeout(() => {
          if (!isDragging) recycleFront(1)
        }, autoPlayInterval * (i + 1))
        timeouts.push(t)
      }
    }

    return () => {
      stack.removeEventListener('pointerdown', onPointerDown)
      stack.removeEventListener('pointermove', onPointerMove)
      stack.removeEventListener('pointerup', onPointerUp)
      stack.removeEventListener('pointerleave', onPointerLeave)
      timeouts.forEach(t => window.clearTimeout(t))
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [autoPlayOnce, autoPlayInterval, count])

  return stackRef
}

// ─── visual themes for each book-cover card (from original variants) ──
const THEMES = [
  { bg: 'linear-gradient(160deg,#1a2a4a,#0d1a30)', cover: 'linear-gradient(160deg,#1e3a6e,#0a1a3a)', brand: '#aac4f0', sub: '#7aa0d4' },
  { bg: 'linear-gradient(160deg,#1a0a2e,#0d0520)', cover: 'linear-gradient(160deg,#2d1060,#130530)', brand: '#c4a8f0', sub: '#9a78d4' },
  { bg: 'linear-gradient(160deg,#1a0d00,#0d0600)', cover: 'linear-gradient(160deg,#3a1a00,#1a0800)', brand: '#f0c890', sub: '#d4a060' },
  { bg: 'linear-gradient(160deg,#001a10,#000d08)', cover: 'linear-gradient(160deg,#003a20,#001508)', brand: '#90d4b0', sub: '#60b488' },
]

export default function ForWhomSliding({ forWhom }: ForWhomSlidingProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const stackRef = useSlidingStack(inView, 800, forWhom.length)

  return (
    <section ref={sectionRef} style={{ background: CREAM, padding: 'clamp(3rem,6vw,6rem) clamp(1rem,3vw,1.5rem)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .fws-stack {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          place-content: center;
          touch-action: none;
          user-select: none;
        }
        .fws-card {
          position: absolute;
          inset: 1rem;
          border-radius: 16px;
          cursor: grab;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(0,0,0,0.4);
        }
        .fws-card-inner {
          width: 86%;
          height: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1.25rem 1rem;
          text-align: center;
        }
        .fws-num {
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-weight: 800; font-size: 0.85rem;
          color: #fff; background: rgba(255,255,255,0.16);
          border: 1.5px solid rgba(255,255,255,0.3);
          margin-bottom: 0.2rem; flex-shrink: 0;
        }
        .fws-title { font-family:'Playfair Display',serif; font-weight:800; font-size:1.05rem; color:#fff; line-height:1.3; }
        .fws-line { width:28px; height:1.5px; border-radius:2px; background:rgba(255,255,255,0.35); }
        .fws-desc { font-family:'Inter',sans-serif; font-size:0.78rem; line-height:1.6; color:rgba(255,255,255,0.82); }
        .fws-hint { margin-top: 1rem; font-size: 0.78rem; color: ${BROWN_MID}; opacity: 0.7; text-align: center; }
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

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: 300, height: '23rem', margin: '0 auto' }}
        >
          <div ref={stackRef} className="fws-stack">
            {forWhom.map((item, i) => {
              const t = THEMES[i % THEMES.length]
              return (
                <article key={i} data-card className="fws-card" style={{ background: t.cover }}>
                  <div className="fws-card-inner">
                    <span className="fws-num">{i + 1}</span>
                    <span className="fws-title">{item.title}</span>
                    <div className="fws-line" />
                    <span className="fws-desc">{item.description}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </motion.div>

        <p className="fws-hint">Drag a card to see the next one →</p>
      </div>
    </section>
  )
}
