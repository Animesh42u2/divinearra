import { useState, useEffect, useRef, useCallback } from 'react'

const reviews = [
  {
    text: 'Excellent predictions, every word felt connected with my life. Thank you so much Divine Arra for such meaningful guidance.',
    name: 'Sushree',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjs5fyQQJzn1BauQV4LWbMRlh3zJCP3Rk4tQ&s',
    initials: 'S',
    color: ['#c47a1e', '#e8a63a'],
  },
  {
    text: 'I booked a consultation for marriage-related confusion. The guidance was very clear, practical, and peaceful.',
    name: 'Rohit Sharma',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9z6c29C6RLCnd7lVgmRuQww43gXcmRAZFw&s',
    initials: 'RS',
    color: ['#7c5cbf', '#a07dd4'],
  },
  {
    text: 'The name correction consultation helped me understand hidden blocks in my business name. Very professional service.',
    name: 'Ankita Roy',
    photo: 'data:image/jpeg;base64,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',
    initials: 'AR',
    color: ['#2e8b6e', '#4caf8a'],
  },
  {
    text: 'Their career report gave me direction at the right time. I highly recommend Divine Arra for genuine astrology guidance.',
    name: 'Vikram Mehta',
    photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEBUPEA8PEBAPFRUPDw8PEA8PDxUVFREXFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0dHSUtLS0tLS0tLS0rLS0tKysrLSstLS0uLS0rLS0tLSsvKy0tKy0rLS0tLS0tKy0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQUGAgMEB//EADwQAAIBAgMFBAkCBQMFAAAAAAABAgMRBCExBRJBUWEGcYGREyIyQlKhscHw0eEzYnKS8SMksgcUFcLi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACgRAQACAgEEAQMEAwAAAAAAAAABAgMRBBIhMVFBExQyYXGR4SIjM//aAAwDAQACEQMRAD8A1koKbuRCgoEKCgQoAAFAEBQBAUAQFAEBQBAUAQFAEBQBAUWAgKAIAABCgCAoAgAAhQUCFAAFAAAFAhQAABQIAeXHY+FFNvOXCN82CI29MmkrvJHhxO1qMHa7k1wir/M1raG0qlZ3baSy3Fp39Tx70v2dzOb+m0YvbZZ9oY3soO3BtpBdoY8YO/Rp+ZrXo5eeuhLPl5kdUr/Tq3XCbRpVFlKz5SyZ7D59Gp4eJltn7XqU8m3OHJu78GWi/tS2L02sh14bERqR3ou6O0uxQWKAICgCAoAgKQAAAICgCAAACgAAUCFAAAFAAFAgKAPPjcSqUHN3fBJcWahXqyqSlUk9fpyRme1FVr0cVx3n5WX3PX2K7O08XVbq3cKSUt1ZKTb0fQxyX06sGPfhgdnbHr4h2p05z62yXibFR7AYtrNRj4p+eZ9VwuDp04qMIqKXBKx7FBHBbkWmez068WsR3fJH/wBPa61mr291nkqdgMVG7jKLyyX2Pr06Od7nXUguPkV+4u0+2xy+IY7sxi6XrOjJpauKv9DH7lsrtS/mTT+fgfdpwjpb5GC2x2dw+JVpwW9wnHKSfebU5G/LHJxIj8ZfLsBjZUZXWabtJaX7jb4yTSazTzTNY27sieErKlJ78WnKM9Hb9TL9n6m9RX8rcV3WT+52Y7beZmppkQAaucIUAQFAEBSAAABAUgEBQAKAABbACFAAAFAAAIAABjNrYb0k6XRy+if2Nt7HYCVO89INWz1lZ/Qwe5epT75f8G/sblTrqlh03pGN3ZZ+Bxcmddnq8GsTXc/DKKrd20PdQiueZpFKltDEO8YuknfdUpbqS4X4tnnxOE2jQedWE+6bXfmkjmjFHzLttln4h9BnT5ZnVVw+Ridh46vL1ZRck1e7s2np4nq2jtRwg+DS48ys44Xi0lWgkvaPBVlZmmbT21ja0t2gpO2Ss7J+ZwhLakFvVKUrLO8XCXmk7l4xRHyztmn1L3dttmyqxjUSuknFviuKMDsClu0bcXKTf0+xuOAxaxOGqQmt2UIy3k/6bpmt4aG7G3Vvzkzswenm8zWtu0AHS4AhQEoCgCAACAoAgAAgAApQAABQIUAAAAgBQBCpN5LNvJIh6dm/xqa5zivN2ItOomU1jdogr4GpTcJzVot3Uk7x9lrVd5tGG3fRQlNXUYRlbXO18zI4+nTWGvPds96O7LinkrfnE6sLh97JLLJeB5OTNOTy+hxceuLcV8Ndr7WxVWo6dOnUhBe/Zxj0uk1J30srd70MMqONdSbrxVNpR9HGO67t+0pS3sle/PhqfRqmxY63lH+luP0Lh9iUY+s4b0ucnf5stF4iNaWmu53t4ezGHlFqTTSaTaeav0PB27hNw9S6beduRteHa4cMsjxbdw++slpmUiflaWg4On6PDyqQo79ROyjJylOUc/XVnGCztlvN2fgePD7axMIRlVjZybTpxc6m7b4k1eKfNPwNspbOpV1k92a13W4vx5nJdnZPWpN9G0vovuadcfMM5xz5iWOwVeFWnUlFWcqU1fj7LMHCLcd62Wl+Fzbo4FU5JW1yfc1mazi6KpuEI+xuzXjF3f0ia4svTP7ubPx/qRM78Rt5gAd7xgABIAAIAAAAAgAAAgA5AFAAAAAUIQoAQhQAB3YKoo1YSekZxk/CSOkCY3Gk1nU7bptCq1BtpuG46cXZ5TVNqz5XydzJ7FqRsr8UmzX5Y6nHAupOonLcs4J+vKUVazXhfxO/s7id6mpPWyX5+cTx+ia737fS/Ui+tem5YjFU4wu9UY6OM9JBy3kovQ13tjKvKjCnTulUqRhOS1UbNvztYwuErQrXpwqYtuKs4+jdNK662urF4/yjaPE6hvK2naSjGnBRy9eVRJt8oxS+rR4O0u34Uo70VFz4QbUfNy0MRHsp6eG5OOLvvJQasmna9nbXLM821uy8XGMXQxDjFqnBtVJS3tLdS/TEI7zPx/LqhtiVWVOVKMYVI+3aW8mnqr2V14G7YXEqcN7jxXU+T7RwtGhJb061GTtuKpGS4tK3imZ7spisTCtOFWW9SnFSpT6q9/qitq/MEXn8ZbZjKibNDqbyclL46k4/0znaNvCMjYcVjHF3v1zMDVmpUaM/jjmr/Dp9X8y+KvVaGHIv0Utr1/TzgEPReIoIAABAKCACkAAAEAAADmAAhSAoQhQAAAAAAAAAI1fxyZ7uzGKlbcbzi2pJ3916+MTxEoQmqm/TV3Z7yWvqq91zdl9ORjmp1VdXEydF9e306dKM6TjK+64pvn4Hlp4WCtOk1vRy3la+TWj4q6+Rr9XtGnh3GKbm1u5tLNnLs7iG/VU96yye8m3bVvpqcEVmIez1xtuGG2riI3lvReaklKC4RUbK1uB0YjtHVsr7nqty9h8U+vU13HN1WnCru3upxTks72avdGC2hhaiu41rv3c5Xusms3nxyNYncImKRPerJ7WpRxc4TqL0koW3bpKKcW2m0sm1vPoWcVCW63nGHq6cdfzqY3ZmK3YqTmnLk738WeDG7UXp1U5xzXLMrqZRN4h27cxElF/E1uxt8T9VfU8lKG7FRWkUorwR1us60973IN26yf6JvzO47MFNVeVysnVbUAIDZygIS4FBLkuByuLnG4uByBxuLgcgcSgAQAdpSAICgBAAAAAAAAAAAB7NnyVKtQlO6debhSS4+o7yfTgXZuAdR70soLXm+i/Ux+1sTKptjDUYL1cOlKVrWW8n+3mRkjVJmW+Cu8kMj2n7PTu62HebzlSvZP8Ap5Poa3snalShJ06ilDJqSklC2XHI+swpKUTDbS2BSr3VSnGWVlJq013S1PNpl7as9jJh77q1rA7QlGTnvXi23fim+LOqptZSlGGTve6vldq/3aO3E9ipxb9FXnGLfstby80zHLsxXi7yrR792Tf2NY6fbKeuPh4cTjXvt71lFN3vrrkdmzMNPEz3nlTXqyk8r2d2oo91Hs/C96jlUfLSPlyMtRpqNkkklolkkRN4jwmuO0zuXjjFTq1qMIqLoOKhFe9F0oSt1eZ1XLFNY+bXvRpzb67u5/6GUxmGVT1l6s+PJvryfU7sfekS8zPXV5YkjZyqQcdVY4XJYlxchLgUlyXAFuLkJcDlctziAOQucRcDkDjcoHeUAKgAAAAACFAA9NDAVJ8N1c5XXyMlhtmwjqt583p5FopMp0xNDDTn7MW1z0j56GTwmyUs5u7Xu+7+5kvZWXgI+HyNa44+R3Qi4rgrcrJGn9lafpcXicS826vo4vpBfubZVuoOzd2r8DGdkNlTpU5TkvVrVZVYSWjWSku9O68nxOXnzqnZ38CIm+5bdh8kjsnE401kjtWXceO9eXVboYvG048kZlzRj8Y4ltoYN0L52sjz1qVjLSVlcx+LTaYiVtMNhKXpK9Wa4KEPK7+5lnTOjYeGcVUk07SldPuiZBNeK1WR7fHj/XDweR/0ljqtO0rO1prirq61+VvI6K2zovR7r15ryMhtCPqb0btwalpZZa/JsRaaT/PzQ36YnywYDEYKpC943S96Oa/Y8xtKT8VkeergqU9Y2bz3o2Uv0fiZ2xekNfIZCvsia9hqa4L2Zfp8zwVISi7Si4vlJNGUxMeUoCAgUEAHIEuAgsAAPUACVQAADnSoyk7Ri39PM7MFRU52eiW8/D97GVpUbuVrZvvy3UaUp1JeOls3jKXhH9T2UcMo5Ril/NZ382ehUrcrI5xVuGuv3NYpEDjCn+O526fmZb96vmSN3y7yUuMuea5ndTs8k8ufDzJZd3cWEUmNmkxL9T5fQ3PsRgadXZ0ITWW9J9Yu+qZpmKVoNm99hMsHBr3m2c2eNw3xTrvDpxWwqtP2V6SPBx9rxj+hjK0HHKUXF/zJp/M31SDszz7caJ8dndXlWjzG3zec08rnVKmr8z6T/wBtT+CH9sTlGnFaRiu5JFPtv1afefo+Zf8AisRVdqdGpLq47sf7nZGb2f2MvaWInZaulTeb75cPDzN0bOqU+CNacesee7K/Kvbx2aN2zw8Kbp04RjGEabUYxskryZqktfHx5fqbZ23f+sulNf8AJmqQvez4LPyuenj7Vedfy8zwvGrKc022rtxglf4V976HdbhweWTyXB/nQ9VOOaXhb87zx4eTcqr91TcYr+lWfzTNIlRXzJNLJ2/w9TtlHO2vH8/OBwjB2tlyLISS6afjLNJqzScXnaWf1ObjdJ9OTOLWXHyAx9XZFOTe7eNlf1WmumT8fIwdSDi3F6p2ZtOHzUuj3U+7P7mB21C1Vv4kpZc9PsYZKxHhaHiuDiUxFKcSgAAB7AASoAgCWQ2VD2pcrLzz+xk8Is5WtlZ8tVl9Dy4CO7TWXtes/HT5JHpptb39Uc75Zp//AEzqpGqj0xplUev1/ORYvr8yyk/zMmR1TOVOP5Yk0coq7sQlbO/n9TtSJbPz+hyll5fcql1Yr+HLuN+7EL/Y0u5/U0HE+w+6xv3YeX+zgvhbXzMcrbGz9igHO0QgKkSk0OqmtWdsjhTCGi9t3/r2/kj9ZM1ZPV8/2sbL20lfEyXKMV5xX6mtQ1twR2Y/xc9/L0U7J56K7PJs3+HF8ZLfeXxPe+5zx1XdpTlx3JW8sjsjBRSSWUUl5IsqrWmb5eX4yNWd+euZ2Wy06rIS6d64EodcFla+jtqdVsnn+P8AwdibTevDmdFTVri9O/QkcKd92/O7z6v/AB5mK2zTvFTXuvdfc9Pp8zL1Wllytp0aPJVgppwfFWvwXJ/L5FLxuEw1wpGrOzyaya6g5hQQAcrkIAPcACUBYq7stXkgAM9CKaUeWS8Ec6kWpQfwytbv9X6tAHb8KvW724aaeJwula/5mAQO+NrX6XOrd4+IBRZ3Uc7d/wChzf2ICspcKyvFm59hZ/6Ljyd/NAGWVtjbQg2QHO0EUAkGcKaKCB817Uz3sTVfKVv7Uo/Yw1Hrk3x78kAd1PxhzW8uGPjdRj8dSEfJ7z+UD0tfndp9yAmEKn+dxcuvn1AA6pWvl1+R0VL78erv1yTl+gBI66k73/OMTqaSf5zAIQwe16e7VdtJJT88n80zxgHNPlICggQoAH//2Q==',
    initials: 'VM',
    color: ['#c47a1e', '#e8a63a'],
  },
  {
    text: 'Very detailed kundali matching and explanation. It helped both families understand compatibility better.',
    name: 'Priya Nair',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEhzcanHddpVy-7bYlrRNiRFsKki8WyjJvw&s',
    initials: 'PN',
    color: ['#7c5cbf', '#a07dd4'],
  },
  {
    text: 'The remedies were simple and effective. I felt more balanced and confident after the consultation.',
    name: 'Neha Agarwal',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5BrgZ-1BJJn2Z8R4IJOrbyay_a5-YKM4Vw&s',
    initials: 'NA',
    color: ['#2e8b6e', '#4caf8a'],
  },
  {
    text: 'Aaditya Narayan ji explains everything patiently. The consultation felt personal and very honest.',
    name: 'Rahul Banerjee',
    photo: 'data:image/jpeg;base64,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',
    initials: 'RB',
    color: ['#c47a1e', '#e8a63a'],
  },
  {
    text: 'Best astrology consultation experience. The report was detailed, beautiful, and easy to understand.',
    name: 'Shalini Kapoor',
    photo: 'data:image/jpeg;base64,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',
    initials: 'SK',
    color: ['#7c5cbf', '#a07dd4'],
  },
  {
    text: 'I joined the astrology course and learned many practical concepts. The teaching style is simple and powerful.',
    name: 'Arjun Das',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNK4K-681eUwrPNBZZ956IWkMSnuJtr4CBQ&s',
    initials: 'AD',
    color: ['#2e8b6e', '#4caf8a'],
  },
  {
    text: 'The consultation gave me hope and direction. I am thankful for the guidance and spiritual support.',
    name: 'Meera Joshi',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQErXHcMTLhE6_WMDNjCWqYG_lGez-1rTqPZw&s',
    initials: 'MJ',
    color: ['#c47a1e', '#e8a63a'],
  },
  {
    text: 'Very premium and authentic service. I received proper answers for relationship, career, and health-related questions.',
    name: 'Devansh Singh',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl35ytjkXsJhAUYcIgkNAIcy-tHDnEU-sIg&s',
    initials: 'DS',
    color: ['#7c5cbf', '#a07dd4'],
  },
  {
    text: 'Divine Arra truly changed my perspective on astrology. Their accurate insights and compassionate guidance helped me navigate tough times with faith and strength.',
    name: 'Payam Sema',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvUIStiJ_OFcAx6TjmqSfwtpMYOVziSIcXQ&s',
    initials: 'PS',
    color: ['#2e8b6e', '#4caf8a'],
  },
  {
    text: 'I felt like Pandit ji was next to me. The report was deeply personalized and gave me clarity in my career and family decisions.',
    name: 'Tushar',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-MqdxZSngA2P1Ao0G_7IO8VeScXomhX8lA&s',
    initials: 'T',
    color: ['#c47a1e', '#e8a63a'],
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
        What <span style={styles.gold}>Our Clients</span> Say About Us
      </h2>
      <p style={styles.subtext}>Real feedback from clients who have collaborated with Divine Arra</p>

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
         {reviews.map((_, i) => {
  const isNear = Math.abs(i - current) <= 2 || i === 0 || i === reviews.length - 1
  return (
    <button
      key={i}
      onClick={() => handleNav(i)}
      aria-label={`Go to testimonial ${i + 1}`}
      style={{
        ...styles.dot,
        width: i === current ? 24 : isNear ? 8 : 5,
        opacity: isNear ? 1 : 0.4,
        background: i === current ? '#c47a1e' : '#e8d5b7',
        transition: 'width 0.35s ease, background 0.35s ease, opacity 0.35s ease',
      }}
    />
  )
})}
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
  authorphoto: {
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
  gap: 6,
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 220,
},
  dot: {
    height: 8,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
}
