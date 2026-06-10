import { useState, useEffect, useRef, useCallback } from 'react'

const reviews = [
  {
    text: 'Our collaboration with Divine Arra was smooth, professional, and highly impactful. His insights are accurate and delivered in a way that truly resonates with people. We saw a noticeable increase in audience trust and interaction.',
    name: 'Priya Sharma',
    role: 'Marketing Director, Wellness Brand',
    photo: 'https://bookingagentinfo.com/wp-content/uploads/2022/04/Priya-Sharma.png',
    initials: 'PS',
    color: ['#c47a1e', '#e8a63a'],
  },
  {
    text: 'The consultation changed my perspective completely. I was able to make confident career decisions after understanding my birth chart. Truly a life-altering experience — highly recommend to anyone seeking clarity!',
    name: 'Rahul Mehta',
    role: 'Entrepreneur, Mumbai',
    photo: 'https://bottindia.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-20-at-12.17.37.jpeg',
    initials: 'RM',
    color: ['#7c5cbf', '#a07dd4'],
  },
  {
    text: 'Incredibly accurate and insightful reading. The remedies suggested actually worked within weeks. Divine Arra is truly gifted — his knowledge of ancient wisdom combined with modern sensibility is remarkable.',
    name: 'Sunita Verma',
    role: 'Teacher, Delhi',
    photo: 'https://i1.rgstatic.net/ii/profile.image/11431281159504353-1684391870697_Q512/Sunita-Verma.jpg',
    initials: 'SV',
    color: ['#2e8b6e', '#4caf8a'],
  },
]

const INTERVAL = 5000

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return
      const next = ((idx % reviews.length) + reviews.length) % reviews.length
      if (next === current) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent(next)
        setProgressKey((k) => k + 1)
        setAnimating(false)
      }, 350)
    },
    [animating, current]
  )

  const resetAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setProgressKey((k) => k + 1)
        return (c + 1) % reviews.length
      })
    }, INTERVAL)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetAuto])

  const handleNav = (idx: number) => {
    goTo(idx)
    resetAuto()
  }

  const r = reviews[current]

  return (
    <section style={styles.section}>
      <p style={styles.eyebrow}>Testimonials</p>
      <h2 style={styles.heading}>
        What <span style={styles.gold}>Our Partners</span> Say About Us
      </h2>
      <p style={styles.subtext}>Real feedback from partners who have collaborated with Divine Arra</p>

      {/* Card */}
      <div
        style={{
          ...styles.card,
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(12px) scale(0.98)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div
            key={progressKey}
            style={{
              ...styles.progressBar,
              animation: `growWidth ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>

        {/* Quote icon */}
        <div style={styles.quoteIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>

        {/* Stars */}
        <div style={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.star,
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(6px) scale(0.7)' : 'translateY(0) scale(1)',
                transition: `opacity 0.3s ease ${0.15 + i * 0.07}s, transform 0.3s ease ${0.15 + i * 0.07}s`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review text */}
        <p
          style={{
            ...styles.reviewText,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
          }}
        >
          "{r.text}"
        </p>

        {/* Author */}
        <div
          style={{
            ...styles.author,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
          }}
        >
          {imgErrors[current] ? (
            <div
              style={{
                ...styles.avatarFallback,
                background: `linear-gradient(135deg, ${r.color[0]}, ${r.color[1]})`,
              }}
            >
              {r.initials}
            </div>
          ) : (
            <img
              src={r.photo}
              alt={r.name}
              style={styles.avatar}
              onError={() => setImgErrors((e) => ({ ...e, [current]: true }))}
            />
          )}
          <div>
            <div style={styles.authorName}>{r.name}</div>
            <div style={styles.authorRole}>{r.role}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button style={styles.navBtn} onClick={() => handleNav(current - 1)} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c47a1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div style={styles.dots}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => handleNav(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                ...styles.dot,
                width: i === current ? 24 : 8,
                background: i === current ? '#c47a1e' : '#e8d5b7',
                transition: 'width 0.35s ease, background 0.35s ease',
              }}
            />
          ))}
        </div>

        <button style={styles.navBtn} onClick={() => handleNav(current + 1)} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c47a1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes growWidth {
          from { width: 0% }
          to   { width: 100% }
        }
        @media (max-width: 480px) {
          .t-review-text { font-size: 14px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: 'clamp(40px, 8vw, 80px) clamp(16px, 6%, 80px)' as unknown as string,
    background: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    overflow: 'hidden',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: '#c47a1e',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heading: {
    fontSize: 'clamp(22px, 4vw, 34px)' as unknown as string,
    fontWeight: 700,
    margin: '0 0 8px',
    fontFamily: 'Georgia, serif',
    color: '#1a0a00',
    lineHeight: 1.3,
  },
  gold: { color: '#c47a1e' },
  subtext: {
    color: '#9a7050',
    marginBottom: 'clamp(28px, 5vw, 48px)' as unknown as string,
    fontSize: 13,
  },
  card: {
    maxWidth: 720,
    margin: '0 auto',
    background: '#fff9f2',
    borderRadius: 20,
    padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)' as unknown as string,
    border: '1px solid #f0dfc0',
    position: 'relative',
    overflow: 'hidden',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: '#f0dfc0',
    borderRadius: '0 0 20px 20px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #e8a63a, #c47a1e)',
    width: 0,
  },
  quoteIcon: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e8a63a, #c47a1e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 20,
  },
  star: {
    color: '#e8a63a',
    fontSize: 18,
    display: 'inline-block',
  },
  reviewText: {
    fontSize: 'clamp(14px, 2.4vw, 17px)' as unknown as string,
    lineHeight: 1.8,
    color: '#4a2006',
    fontStyle: 'italic',
    fontFamily: 'Georgia, serif',
    marginBottom: 'clamp(24px, 4vw, 36px)' as unknown as string,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: '50%',
    border: '2.5px solid #c47a1e',
    objectFit: 'cover',
    flexShrink: 0,
  },
  avatarFallback: {
    width: 58,
    height: 58,
    borderRadius: '50%',
    border: '2.5px solid #c47a1e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  authorName: {
    fontWeight: 700,
    fontSize: 15,
    color: '#4a2006',
    textAlign: 'left',
  },
  authorRole: {
    fontSize: 12,
    color: '#c47a1e',
    marginTop: 3,
    textAlign: 'left',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 28,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: '1.5px solid #d4a055',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
  dots: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
}
