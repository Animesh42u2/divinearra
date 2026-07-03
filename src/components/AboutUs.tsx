import { useNavigate } from 'react-router-dom'
import {
  Users, Star, Trophy, Globe, Clock, BookOpen,
  CheckCircle2, Sparkles, Heart, Briefcase, Wallet,
  Leaf, Moon, Shield, Gem, Target,
} from 'lucide-react'
import Navbar from './Navbar'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const AMBER      = '#c8791a'
const AMBER_DARK = '#8b4e0a'
const CREAM      = '#fdf6e9'
const BROWN_TEXT = '#2a1200'
const BROWN_MID  = '#6b3a10'

const stats = [
  { icon: Users,    value: 100, suffix: 'K+', label: 'Consultations Delivered'  },
  { icon: Clock,    value: 9,   suffix: '+',  label: 'Years of Experience'      },
  { icon: BookOpen, value: 59,  suffix: '+',  label: 'Years of Legacy'          },
  { icon: Trophy,   value: 8,   suffix: '+',  label: 'Professional Awards'      },
  { icon: Star,     value: 30,  suffix: 'K+', label: 'Hours of Expert Guidance' },
]

const trustPoints = [
  '9+ Years of dedicated practice in Vedic Astrology, guiding individuals, families, and businesses toward clarity and purpose.',
  'Conducted over 100K+ consultations — including top professionals, entrepreneurs, spiritual seekers, and public figures across India and abroad.',
  'Honored with 8+ prestigious Professional Awards recognising excellence, accuracy, and ethical practice in Vedic astrology.',
  'Carries a 59-year combined family legacy of Vedic sciences — ancient wisdom passed down and refined through generations.',
  '30,000+ hours of expert guidance delivered — each session deeply personalised, rooted in the unique planetary blueprint of the client.',
  'Trusted by 2 Lakh+ kundlis analysed with a 4.9/5 average rating — a track record built on accuracy, discretion, and genuine care.',
]

const approachAreas = [
  { icon: Briefcase, label: 'Career & Business Growth'       },
  { icon: Heart,     label: 'Love & Relationships'           },
  { icon: Wallet,    label: 'Financial Stability & Wealth'   },
  { icon: Leaf,      label: 'Health & Wellbeing'             },
  { icon: Moon,      label: 'Kundli & Birth Chart Analysis'  },
  { icon: Gem,       label: 'Planetary Remedies & Gemstones' },
]

const expertiseAreas = [
  { icon: Briefcase, label: 'Career & Business'    },
  { icon: Heart,     label: 'Love & Relationships' },
  { icon: Wallet,    label: 'Financial Stability'  },
  { icon: Leaf,      label: 'Health & Wellbeing'   },
]

const promises = [
  { icon: Target,   title: '100% Personalised', desc: 'Every reading is based solely on your unique birth chart, planetary positions, and life circumstances — never generic advice.' },
  { icon: Shield,   title: 'Ethically Guided',  desc: 'No fear-based predictions, no false promises. Only honest, compassionate guidance that empowers you to make informed decisions.' },
  { icon: Sparkles, title: 'Result-Oriented',   desc: 'Practical, time-tested remedies drawn from classical Vedic texts — solutions you can apply immediately in your daily life.' },
]

// ── CountUp component ──────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const duration = 1800
    const steps = 60
    const increment = target / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, target])

  return <div ref={ref}>{count}{suffix}</div>
}

// ── Animation helpers ──────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      style={{ height: '100%' }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <div style={{ background: CREAM, minHeight: '100vh', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar />

      <style>{`
        @keyframes twinkle {
          0%,100% { opacity:0.2; transform:scale(0.8); }
          50%      { opacity:1;   transform:scale(1.2); }
        }
        @keyframes sunCorona {
          0%,100% { box-shadow: 0 0 30px 10px rgba(255,200,50,0.6), 0 0 70px 25px rgba(255,140,0,0.35), 0 0 120px 50px rgba(255,80,0,0.15); }
          50%      { box-shadow: 0 0 50px 18px rgba(255,220,80,0.75), 0 0 100px 40px rgba(255,160,20,0.45), 0 0 160px 70px rgba(255,100,0,0.2); }
        }
        @keyframes os1  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os2  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os3  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os4  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os5  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os6  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os7  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os8  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes os9  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .orbit-track { position:absolute; border-radius:50%; border:1px solid rgba(255,200,100,0.12); top:50%; left:50%; transform:translate(-50%,-50%); }
        .orbit-arm   { position:absolute; top:50%; left:50%; transform-origin:0 0; }
        .p1-arm { animation: os1  4.1s  linear infinite; }
        .p2-arm { animation: os2  7.2s  linear infinite; }
        .p3-arm { animation: os3  11.8s linear infinite; }
        .p4-arm { animation: os4  18.5s linear infinite; }
        .p5-arm { animation: os5  35s   linear infinite; }
        .p6-arm { animation: os6  55s   linear infinite; }
        .p7-arm { animation: os7  82s   linear infinite; }
        .p8-arm { animation: os8  120s  linear infinite; }
        .p9-arm { animation: os9  175s  linear infinite; }
        .sun-corona { animation: sunCorona 3s ease-in-out infinite; }
        .star-dot   { animation: twinkle var(--td,2s) ease-in-out infinite var(--dl,0s); }

        .au-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .au-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(200,121,26,0.22) !important; }
        .au-cta:hover  { transform: scale(1.04); box-shadow: 0 8px 28px rgba(200,121,26,0.5) !important; }

        /* ── Hero layout ── */
        .hero-section {
          background: linear-gradient(160deg,#020408 0%,#050d18 25%,#0a1628 55%,#0f1f35 80%,#081020 100%);
          padding: 0;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .solar-scene-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
        }
        .solar-scene {
          position: relative;
          width: 960px;
          height: 960px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .hero-img-wrapper {
          display: flex;
          justify-content: center;
          flex: 1;
          align-items: flex-end;
          position: relative;
        }

        .hero-person-img {
          max-width: 520px;
          width: 100%;
          object-fit: contain;
          object-position: bottom;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 -6px 28px rgba(200,121,26,0.3)) drop-shadow(0 10px 24px rgba(0,0,0,0.45));
        }

        /* ── Large Desktop / Wide screens ── */
        @media (min-width:1200px) {
          .au-trust    { grid-template-columns: repeat(3,1fr) !important; }
          .au-approach { grid-template-columns: repeat(3,1fr) !important; }
        }

        /* ── Tablet ── */
        @media (max-width:900px) {
          .au-stats   { grid-template-columns: repeat(3,1fr) !important; }
          .au-promise { grid-template-columns: 1fr 1fr !important; }
          .au-expert  { grid-template-columns: repeat(2,1fr) !important; }
          .solar-scene { transform: scale(0.65); }
        }

        /* ── Mobile ── */
        @media (max-width:640px) {
          .au-stats   { grid-template-columns: repeat(2,1fr) !important; }
          .au-trust   { grid-template-columns: 1fr !important; }
          .au-approach{ grid-template-columns: 1fr 1fr !important; }
          .au-promise { grid-template-columns: 1fr !important; }
          .au-expert  { grid-template-columns: repeat(2,1fr) !important; }
          .hero-top   { padding: 2.5rem 1.2rem 1rem !important; }
          .solar-scene { transform: scale(0.4); }
          .hero-section { min-height: 100vh; }
          .hero-content {
            position: absolute;
            inset: 0;
            justify-content: space-between;
          }
          .hero-img-wrapper {
            flex: 0 0 auto;
            align-items: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-38%);
            z-index: 5;
          }
          .hero-person-img {
            max-width: 300px !important;
            margin-bottom: -20px;
          }
        }
      `}</style>

      {/* ════════════ HERO ════════════ */}
      <section className="hero-section">

        {/* Star field */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
          {[
            {t:'4%',l:'3%',s:1.8,td:'2.1s',dl:'0s'},{t:'7%',l:'11%',s:1.2,td:'3.4s',dl:'0.3s'},
            {t:'2%',l:'19%',s:2.2,td:'1.8s',dl:'0.8s'},{t:'9%',l:'28%',s:1.5,td:'2.7s',dl:'0.2s'},
            {t:'5%',l:'37%',s:1.0,td:'3.1s',dl:'1.1s'},{t:'3%',l:'46%',s:2.0,td:'2.3s',dl:'0.5s'},
            {t:'8%',l:'54%',s:1.3,td:'1.9s',dl:'1.4s'},{t:'4%',l:'63%',s:1.7,td:'3.6s',dl:'0.1s'},
            {t:'6%',l:'71%',s:1.1,td:'2.5s',dl:'0.9s'},{t:'2%',l:'80%',s:2.3,td:'1.7s',dl:'0.6s'},
            {t:'7%',l:'88%',s:1.4,td:'3.0s',dl:'1.3s'},{t:'3%',l:'95%',s:1.8,td:'2.2s',dl:'0.4s'},
            {t:'14%',l:'8%',s:1.0,td:'2.8s',dl:'0.7s'},{t:'18%',l:'16%',s:2.1,td:'1.6s',dl:'1.2s'},
            {t:'22%',l:'24%',s:1.5,td:'3.3s',dl:'0.0s'},{t:'16%',l:'33%',s:1.2,td:'2.0s',dl:'1.5s'},
            {t:'20%',l:'42%',s:1.9,td:'2.6s',dl:'0.3s'},{t:'25%',l:'51%',s:1.3,td:'3.5s',dl:'0.8s'},
            {t:'19%',l:'60%',s:1.6,td:'1.9s',dl:'1.0s'},{t:'23%',l:'69%',s:2.0,td:'2.4s',dl:'0.5s'},
            {t:'33%',l:'5%',s:1.7,td:'1.8s',dl:'0.6s'},{t:'38%',l:'14%',s:1.2,td:'3.4s',dl:'1.1s'},
            {t:'36%',l:'91%',s:1.9,td:'1.7s',dl:'1.4s'},{t:'44%',l:'83%',s:1.3,td:'2.7s',dl:'0.1s'},
            {t:'55%',l:'7%',s:2.2,td:'2.0s',dl:'0.5s'},{t:'65%',l:'90%',s:1.8,td:'1.9s',dl:'0.3s'},
            {t:'75%',l:'73%',s:2.0,td:'2.3s',dl:'0.6s'},{t:'80%',l:'9%',s:1.5,td:'2.8s',dl:'1.0s'},
            {t:'88%',l:'62%',s:1.7,td:'2.1s',dl:'0.7s'},{t:'92%',l:'44%',s:1.3,td:'3.0s',dl:'1.3s'},
          ].map((st, i) => (
            <div key={i} className="star-dot" style={{
              position:'absolute', top:st.t, left:st.l,
              width:st.s, height:st.s, borderRadius:'50%',
              background: i%5===0 ? '#ffe8a0' : i%3===0 ? '#c8d8ff' : '#fff',
              '--td':st.td, '--dl':st.dl,
            } as React.CSSProperties}/>
          ))}
          <div style={{
            position:'absolute', top:'10%', left:'-10%', width:'120%', height:'40%',
            background:'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(60,80,180,0.1) 0%, rgba(120,40,160,0.05) 50%, transparent 70%)',
            transform:'rotate(-18deg)',
          }}/>
        </div>

        {/* Solar system */}
        <div className="solar-scene-container">
          <div className="solar-scene">
            {[130,210,295,385,480,575,670,760,850].map((d,i) => (
              <div key={i} className="orbit-track" style={{ width:d*2, height:d*2, borderColor: i>=7 ? 'rgba(255,180,80,0.07)' : `rgba(255,${200-i*12},${100-i*8},${0.15-i*0.01})` }}/>
            ))}
            <div className="sun-corona" style={{ position:'absolute', zIndex:3, width:90, height:90, borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #fff9e0 0%, #ffe566 20%, #ffaa00 50%, #ff6600 75%, #cc3300 100%)' }}>
              <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle at 65% 68%, rgba(255,80,0,0.4) 0%, transparent 40%), radial-gradient(circle at 25% 30%, rgba(255,255,200,0.35) 0%, transparent 35%)' }}/>
            </div>
            <div className="orbit-arm p1-arm"><div style={{ position:'absolute', marginTop:-6, marginLeft:124, width:12, height:12, borderRadius:'50%', background:'radial-gradient(circle at 38% 32%, #e8e0d8 0%, #b0a090 40%, #706050 75%, #403020 100%)', boxShadow:'inset -3px -2px 6px rgba(0,0,0,0.6)' }}/></div>
            <div className="orbit-arm p2-arm"><div style={{ position:'absolute', marginTop:-10, marginLeft:200, width:20, height:20, borderRadius:'50%', background:'radial-gradient(circle at 38% 30%, #fff5d0 0%, #f0c860 30%, #c89030 65%, #8b5a10 100%)', boxShadow:'inset -5px -3px 10px rgba(0,0,0,0.5), 0 0 8px rgba(240,200,80,0.4)' }}><div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(ellipse 90% 20% at 50% 35%, rgba(255,255,220,0.3) 0%, transparent 100%)' }}/></div></div>
            <div className="orbit-arm p3-arm"><div style={{ position:'relative' }}><div style={{ position:'absolute', marginTop:-13, marginLeft:282, width:26, height:26, borderRadius:'50%', background:'radial-gradient(circle at 38% 30%, #a8d8f0 0%, #2080c0 25%, #1060a0 50%, #0a4080 75%, #063060 100%)', boxShadow:'inset -6px -4px 12px rgba(0,0,0,0.55), 0 0 10px rgba(30,120,200,0.45)' }}><div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(ellipse 35% 25% at 40% 40%, rgba(60,160,60,0.75) 0%, transparent 100%), radial-gradient(ellipse 28% 20% at 65% 55%, rgba(50,140,50,0.65) 0%, transparent 100%)' }}/></div><div style={{ position:'absolute', marginTop:-20, marginLeft:309, width:7, height:7, borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #e8e8e0, #909090)', boxShadow:'inset -2px -1px 4px rgba(0,0,0,0.5)' }}/></div></div>
            <div className="orbit-arm p4-arm"><div style={{ position:'absolute', marginTop:-9, marginLeft:376, width:18, height:18, borderRadius:'50%', background:'radial-gradient(circle at 38% 30%, #ff9070 0%, #d04020 35%, #a02010 65%, #601008 100%)', boxShadow:'inset -5px -3px 9px rgba(0,0,0,0.6), 0 0 8px rgba(200,60,20,0.4)' }}><div style={{ position:'absolute', top:1, left:'20%', width:'60%', height:'25%', borderRadius:'50%', background:'rgba(255,255,255,0.55)' }}/></div></div>
            <div className="orbit-arm p5-arm"><div style={{ position:'absolute', marginTop:-22, marginLeft:458, width:44, height:44, borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #f0d8b0 0%, #d4a870 25%, #b87840 50%, #8b5020 75%, #5a2e0a 100%)', boxShadow:'inset -10px -7px 20px rgba(0,0,0,0.5), 0 0 16px rgba(200,140,60,0.45)' }}><div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'linear-gradient(180deg, transparent 5%, rgba(180,100,40,0.5) 15%, transparent 22%, rgba(220,160,80,0.4) 30%, transparent 38%, rgba(160,80,30,0.55) 46%, transparent 54%, rgba(200,140,70,0.45) 62%, transparent 70%, rgba(140,70,20,0.4) 78%, transparent 86%)' }}/><div style={{ position:'absolute', bottom:'28%', left:'22%', width:'30%', height:'18%', borderRadius:'50%', background:'radial-gradient(ellipse, rgba(180,40,20,0.85) 0%, rgba(140,30,10,0.6) 60%, transparent 100%)' }}/></div></div>
            <div className="orbit-arm p6-arm"><div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ position:'absolute', marginLeft:520, marginTop:-5, width:110, height:22, borderRadius:'50%', background:'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(210,180,120,0.15) 30%, rgba(230,200,140,0.55) 36%, rgba(210,175,110,0.45) 42%, rgba(190,155,90,0.3) 47%, rgba(210,180,120,0.5) 52%, rgba(230,200,150,0.4) 57%, transparent 76%)', zIndex:1 }}/><div style={{ position:'absolute', marginTop:-18, marginLeft:557, width:36, height:36, borderRadius:'50%', zIndex:2, background:'radial-gradient(circle at 36% 30%, #f8e8c0 0%, #e0c078 25%, #c09040 55%, #906018 80%, #5a3808 100%)', boxShadow:'inset -9px -6px 18px rgba(0,0,0,0.5), 0 0 14px rgba(220,180,80,0.5)' }}><div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'linear-gradient(180deg, transparent 10%, rgba(160,100,30,0.4) 22%, transparent 30%, rgba(200,150,70,0.35) 42%, transparent 52%, rgba(150,90,25,0.4) 64%, transparent 74%)' }}/></div><div style={{ position:'absolute', marginLeft:520, marginTop:6, width:110, height:10, borderRadius:'50%', background:'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(230,200,140,0.28) 38%, rgba(210,175,110,0.22) 46%, transparent 72%)', zIndex:3 }}/></div></div>
            <div className="orbit-arm p7-arm"><div style={{ position:'absolute', marginTop:-15, marginLeft:655, width:30, height:30, borderRadius:'50%', background:'radial-gradient(circle at 38% 30%, #d0f4f8 0%, #70ccd8 30%, #40a0b8 60%, #206888 85%, #0f3a50 100%)', boxShadow:'inset -7px -5px 14px rgba(0,0,0,0.5), 0 0 12px rgba(80,200,220,0.4)' }}/><div style={{ position:'absolute', marginTop:-4, marginLeft:638, width:64, height:8, borderRadius:'50%', border:'1.5px solid rgba(150,220,240,0.35)', transform:'rotate(8deg)' }}/></div>
            <div className="orbit-arm p8-arm"><div style={{ position:'absolute', marginTop:-14, marginLeft:746, width:28, height:28, borderRadius:'50%', background:'radial-gradient(circle at 36% 28%, #a0b8ff 0%, #4060e0 28%, #2040c0 55%, #102090 80%, #080f50 100%)', boxShadow:'inset -7px -4px 14px rgba(0,0,0,0.6), 0 0 12px rgba(60,80,220,0.5)' }}><div style={{ position:'absolute', top:'30%', left:'30%', width:'35%', height:'25%', borderRadius:'50%', background:'rgba(10,20,100,0.7)' }}/></div></div>
            <div className="orbit-arm p9-arm"><div style={{ position:'absolute', marginTop:-5, marginLeft:845, width:10, height:10, borderRadius:'50%', background:'radial-gradient(circle at 38% 30%, #d8c8b8 0%, #a08878 35%, #786050 65%, #4a3830 100%)', boxShadow:'inset -2px -1px 5px rgba(0,0,0,0.7)' }}/></div>
            {Array.from({length:28}).map((_,i) => {
              const angle = (i/28)*Math.PI*2
              const r = 432+(i%4)*12
              return <div key={`ast-${i}`} style={{ position:'absolute', left:`calc(50% + ${Math.cos(angle)*r}px)`, top:`calc(50% + ${Math.sin(angle)*r}px)`, width:i%4===0?3.5:i%3===0?2.5:1.5, height:i%4===0?3.5:i%3===0?2.5:1.5, borderRadius:'50%', background:i%3===0?'rgba(220,190,140,0.6)':'rgba(180,160,120,0.4)', transform:'translate(-50%,-50%)' }}/>
            })}
          </div>
        </div>

        {/* Content layer */}
        <div className="hero-content">
          <div className="hero-top" style={{ textAlign:'center', padding:'3.5rem 2rem 1.5rem', maxWidth:700, position:'relative', zIndex:4 }}>
            <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:20, padding:'6px 18px', fontSize:12, color:'rgba(255,220,150,0.9)', fontWeight:600, letterSpacing:'0.12em', marginBottom:'1.4rem' }}>
              <BookOpen size={13}/> Know Your Astrologer
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.25 }} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(1.4rem,3vw,2.2rem)', fontWeight:800, lineHeight:1.2, margin:'0 0 0.85rem', color:'#fff' }}>
              Meet <span style={{ color:'#ffeaa0' }}>Astro Aaditya Narayan</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.4 }} style={{ color:'rgba(255,255,255,0.78)', fontSize:'clamp(0.78rem,1.4vw,0.88rem)', lineHeight:1.8, margin:'0 0 0.4rem' }}>
              The mind behind Divine Arra — combining ancient Vedic astrology with modern psychological insight to help you discover clarity and purpose.
            </motion.p>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.55 }} style={{ color:'rgba(255,220,150,0.6)', fontSize:'clamp(0.72rem,1.2vw,0.82rem)', lineHeight:1.7, margin:0, letterSpacing:'0.04em' }}>
              Your Trusted Guide to Clarity, Cosmic Awareness &amp; Life Alignment
            </motion.p>
          </div>

          <motion.div
            className="hero-img-wrapper"
            initial={{ opacity:0, y:50, scale:0.95 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ duration:0.9, delay:0.5, ease:[0.22,1,0.36,1] }}
          >
            <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:420, height:280, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(200,140,40,0.18) 0%, rgba(255,180,60,0.08) 50%, transparent 75%)', filter:'blur(22px)' }}/>
            <img
              src="/star.png"
              alt="Astro Aaditya Narayan"
              className="hero-person-img"
            />
          </motion.div>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:72, background:CREAM, clipPath:'ellipse(55% 100% at 50% 100%)', zIndex:4 }}/>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section style={{ maxWidth:1300, margin:'-1.5rem auto 0', padding:'0 clamp(1rem,4vw,2rem)', position:'relative', zIndex:10 }}>
        <div className="au-stats" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'1rem' }}>
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <ScaleIn key={label} delay={i * 0.08}>
              <div className="au-card" style={{ height:'100%', background:'#fff', borderRadius:18, padding:'1.5rem 1rem', textAlign:'center', boxShadow:`0 4px 24px rgba(200,121,26,0.14), 0 1px 4px rgba(200,121,26,0.08)`, border:`1.5px solid ${AMBER}30`, cursor:'default' }}>
                <div style={{ width:52, height:52, borderRadius:14, margin:'0 auto 1rem', background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 12px ${AMBER}55` }}>
                  <Icon size={24} color="#fff" strokeWidth={1.8}/>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.2rem,2.5vw,1.6rem)', fontWeight:800, color:AMBER_DARK, lineHeight:1 }}>
                  <CountUp target={value} suffix={suffix} />
                </div>
                <div style={{ fontSize:'0.68rem', color:BROWN_MID, marginTop:6, textTransform:'uppercase', letterSpacing:'0.08em', lineHeight:1.4, fontWeight:600 }}>{label}</div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* ════════════ ABOUT TEXT ════════════ */}
      <section style={{ maxWidth:900, margin:'3.5rem auto 0', padding:'0 clamp(1rem,4vw,2rem)' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
          {[
            "With over 9+ years of experience, Aaditya Narayan ji has guided countless individuals across the globe through the intricate patterns of their birth charts — offering accurate predictions, practical remedies, and spiritual direction that truly transform lives.",
            "His approach goes beyond traditional astrology. Every consultation is a journey of self-understanding, healing, and empowerment, where you don't just get answers — you gain the wisdom to realign your energy and rewrite your destiny.",
            "Whether you're struggling with career confusion, relationship issues, or life direction, Aaditya Narayan ji's compassionate guidance helps you see the hidden patterns behind your challenges and find your path toward peace and success.",
          ].map((text, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div style={{ background:'#fff', borderRadius:14, padding:'clamp(1rem,3vw,1.4rem) clamp(1.2rem,3vw,1.8rem)', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 14px rgba(200,121,26,0.08)' }}>
                <p style={{ color:BROWN_MID, fontSize:'clamp(0.875rem,1.8vw,0.97rem)', lineHeight:1.85, margin:0 }}>{text}</p>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.3}>
            <div style={{ background:'#fff', borderRadius:14, padding:'clamp(1rem,3vw,1.4rem) clamp(1.2rem,3vw,1.8rem)', border:`1px solid ${AMBER}33`, borderLeft:`4px solid ${AMBER}`, boxShadow:'0 2px 14px rgba(200,121,26,0.09)' }}>
              <p style={{ color:BROWN_TEXT, fontSize:'clamp(0.9rem,2vw,1.02rem)', lineHeight:1.8, margin:0, fontStyle:'italic', fontWeight:500 }}>
                "Astrology isn't about predicting fate — it's about awakening your power to create it."
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════ WHY TRUST ════════════ */}
      <section style={{ maxWidth:1300, margin:'4rem auto 0', padding:'0 clamp(1rem,4vw,2rem)' }}>
        <FadeUp>
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <div style={{ width:40, height:1, background:AMBER }}/><Sparkles size={16} color={AMBER}/><div style={{ width:40, height:1, background:AMBER }}/>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,2rem)', color:AMBER_DARK, margin:0 }}>Why People Trust Astro Aaditya Narayan</h2>
          </div>
        </FadeUp>
        <div className="au-trust" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {trustPoints.map((point, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="au-card" style={{ background:'#fff', borderRadius:12, padding:'1rem 1.25rem', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 12px rgba(200,121,26,0.08)', display:'flex', gap:'0.75rem', alignItems:'flex-start', cursor:'default', height:'100%' }}>
                <div style={{ width:30, height:30, borderRadius:'50%', flexShrink:0, background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <CheckCircle2 size={16} color="#fff" strokeWidth={2}/>
                </div>
                <p style={{ color:BROWN_MID, fontSize:'clamp(0.8rem,1.5vw,0.875rem)', lineHeight:1.75, margin:0 }}>{point}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════ OUR APPROACH ════════════ */}
      <section style={{ maxWidth:1100, margin:'4rem auto 0', padding:'0 clamp(1rem,4vw,2rem)' }}>
        <FadeUp>
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <div style={{ width:40, height:1, background:AMBER }}/><Sparkles size={16} color={AMBER}/><div style={{ width:40, height:1, background:AMBER }}/>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,2rem)', color:AMBER_DARK, margin:0 }}>Our Approach</h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ background:'#fff', borderRadius:14, padding:'clamp(1rem,3vw,1.5rem) clamp(1.2rem,3vw,1.8rem)', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 16px rgba(200,121,26,0.09)', marginBottom:'1.25rem' }}>
            <p style={{ color:BROWN_MID, fontSize:'clamp(0.875rem,1.8vw,0.97rem)', lineHeight:1.85, margin:0 }}>
              Every consultation is more than just predictions — it's a roadmap to unlock your potential and remove the blocks holding you back. Astro Aaditya Narayan follows a holistic approach, combining ancient Vedic wisdom with modern-day practical remedies. At Divine Arra, you are never alone in your journey — every session is guided with care, precision, and unwavering ethical standards.
            </p>
          </div>
        </FadeUp>
        <div className="au-approach" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          {approachAreas.map(({ icon: Icon, label }, i) => (
            <FadeUp key={label} delay={i * 0.07}>
              <div style={{ background:'#fff', borderRadius:12, padding:'0.9rem 1.2rem', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 10px rgba(200,121,26,0.08)', display:'flex', gap:'0.7rem', alignItems:'center', height:'100%' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0, background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={16} color="#fff" strokeWidth={1.8}/>
                </div>
                <span style={{ color:BROWN_TEXT, fontSize:'clamp(0.8rem,1.5vw,0.875rem)', fontWeight:600 }}>{label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ════════════ OUR PROMISE ════════════ */}
      <section style={{ maxWidth:1300, margin:'4rem auto 0', padding:'0 clamp(1rem,4vw,2rem)' }}>
        <FadeUp>
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <div style={{ width:40, height:1, background:AMBER }}/><Sparkles size={16} color={AMBER}/><div style={{ width:40, height:1, background:AMBER }}/>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,2rem)', color:AMBER_DARK, margin:0 }}>Our Promise to You</h2>
            <p style={{ color:BROWN_MID, fontSize:'0.875rem', margin:'0.5rem 0 0', lineHeight:1.7 }}>When you consult with Astro Aaditya Narayan, you're not just getting advice — you're gaining a partner in your success.</p>
          </div>
        </FadeUp>
        <div className="au-promise" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
          {promises.map(({ icon: Icon, title, desc }, i) => (
            <ScaleIn key={title} delay={i * 0.1}>
              <div className="au-card" style={{ height:'100%', background:'#fff', borderRadius:14, padding:'clamp(1.25rem,3vw,1.6rem)', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 14px rgba(200,121,26,0.09)', cursor:'default', textAlign:'center' }}>
                <div style={{ width:52, height:52, borderRadius:14, margin:'0 auto 1rem', background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={24} color="#fff" strokeWidth={1.8}/>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(0.95rem,2vw,1.05rem)', color:BROWN_TEXT, margin:'0 0 0.5rem', fontWeight:700 }}>{title}</h3>
                <p style={{ color:BROWN_MID, fontSize:'clamp(0.78rem,1.4vw,0.85rem)', lineHeight:1.75, margin:0 }}>{desc}</p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* ════════════ EXPERTISE ════════════ */}
      <section style={{ maxWidth:1200, margin:'4rem auto 0', padding:'0 clamp(1rem,4vw,2rem)' }}>
        <FadeUp>
          <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,2rem)', color:BROWN_TEXT, margin:'0 0 0.3rem' }}>Our Expertise Areas</h2>
            <p style={{ color:BROWN_MID, fontSize:'0.875rem', margin:0 }}>Comprehensive solutions for every aspect of your life</p>
          </div>
        </FadeUp>
        <div className="au-expert" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
          {expertiseAreas.map(({ icon: Icon, label }, i) => (
            <ScaleIn key={label} delay={i * 0.08}>
              <div className="au-card" style={{ height:'100%', background:'#fff', borderRadius:14, padding:'1.5rem 1rem', textAlign:'center', border:`1px solid ${AMBER}22`, boxShadow:'0 2px 12px rgba(200,121,26,0.09)', cursor:'default' }}>
                <div style={{ width:52, height:52, borderRadius:14, margin:'0 auto 0.75rem', background:`linear-gradient(135deg,${AMBER_DARK},${AMBER})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={24} color="#fff" strokeWidth={1.8}/>
                </div>
                <p style={{ color:BROWN_TEXT, fontSize:'0.8rem', fontWeight:600, margin:0, lineHeight:1.4 }}>{label}</p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section style={{ maxWidth:950, margin:'4rem auto 0', padding:'0 clamp(1rem,4vw,2rem) 5rem' }}>
        <FadeUp>
          <div style={{ background:`linear-gradient(135deg,${AMBER_DARK} 0%,${AMBER} 100%)`, borderRadius:20, padding:'clamp(2rem,5vw,3.2rem)', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }}/>
            <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem' }}>
              <Globe size={28} color="#fff" strokeWidth={1.6}/>
            </div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,3vw,2rem)', color:'#fff', margin:'0 0 0.75rem', lineHeight:1.25 }}>Ready to Transform Your Life?</h2>
            <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'clamp(0.875rem,1.8vw,0.97rem)', margin:'0 0 1.75rem', lineHeight:1.75, maxWidth:500, marginLeft:'auto', marginRight:'auto' }}>
              Your transformation begins with a single consultation. Step into clarity, confidence, and cosmic support today. Let Astro Aaditya Narayan illuminate the path ahead.
            </p>
            <button className="au-cta" onClick={() => navigate('/consultation')} style={{ background:'#fff', color:AMBER_DARK, border:'none', borderRadius:30, padding:'0.95rem 2.6rem', fontWeight:700, fontSize:'clamp(0.9rem,2vw,1rem)', cursor:'pointer', boxShadow:'0 4px 18px rgba(0,0,0,0.2)', transition:'all 0.25s ease', display:'inline-flex', alignItems:'center', gap:8 }}>
              Book Your Consultation →
            </button>
          </div>
        </FadeUp>
      </section>

    </div>
  )
}