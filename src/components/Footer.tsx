import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

export default function Footer() {
  const quickLinks = ['About Us', 'Services', 'Courses', 'Contact', 'Blogs & Articles']
  const otherLinks = ['Privacy Policy', 'Refund Policy', 'Terms & Conditions', 'Disclaimer', 'Sitemap']

  const [showScroll, setShowScroll] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollHover, setScrollHover] = useState(false)
  const circumference = 2 * Math.PI * 16

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setShowScroll(scrollTop > 300)
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%)',
      color: '#e8c97a',
      fontFamily: 'Georgia, serif',
      borderTop: '1px solid #c47a1e',
    }}>
      <style>{`
        .footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c8a55a;
          text-decoration: none;
          font-size: 14px;
          font-family: sans-serif;
          padding: 5px 0;
          transition: color 0.2s, padding-left 0.2s;
        }
        .footer-link:hover { color: #ffd700; padding-left: 4px; }
        .footer-link::before {
          content: '›';
          color: #c47a1e;
          font-size: 16px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .footer-col-title {
          font-family: 'Georgia', serif;
          font-size: 17px;
          font-weight: 700;
          color: #e8c97a;
          letter-spacing: 0.08em;
          margin-bottom: 18px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #c8a55a;
          font-family: sans-serif;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .footer-map-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #c47a1e;
          box-shadow: 0 4px 20px rgba(196,122,30,0.2);
        }
        .footer-bottom {
          text-align: center;
          padding: 18px 5%;
          font-family: sans-serif;
          font-size: 13px;
          color: #c8a55a;
          border-top: 1px solid rgba(196,122,30,0.3);
          letter-spacing: 0.04em;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px 32px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-inner { padding: 36px 5% 32px !important; }
          .footer-map-container iframe { height: 200px !important; }
        }

        /* Scroll to top */
        .scroll-top-btn {
          position: fixed; bottom: 90px; right: 24px; z-index: 1001;
          width: 44px; height: 44px; border-radius: 50%;
          cursor: pointer;
          background: rgba(26,10,0,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(196,122,30,0.4);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }
        .scroll-top-btn.hidden-btn { opacity: 0; pointer-events: none; transform: translateY(10px); }
        .scroll-top-btn.visible-btn { opacity: 1; pointer-events: auto; transform: translateY(0); }
.scroll-top-btn:hover { 
  background: #e8c97a; 
  border-color: #e8c97a; 
  transform: translateY(-3px); 
}        .scroll-top-svg { position: absolute; top: 0; left: 0; width: 44px; height: 44px; transform: rotate(-90deg); border-radius: 50%; }
        .scroll-top-track { fill: none; stroke: rgba(232,201,122,0.3); stroke-width: 2; }
.scroll-top-progress { fill: none; stroke: #e8c97a; stroke-width: 2; stroke-linecap: round; transition: stroke-dashoffset 0.15s linear; }

        /* WhatsApp */
        @keyframes wa-ping {
          0% { transform: scale(1); opacity: 0.4; }
          80%, 100% { transform: scale(1.9); opacity: 0; }
        }
        .wa-wrapper {
          position: fixed; bottom: 24px; right: 24px; z-index: 1001;
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
        }
        .wa-ping {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(37,211,102,0.35);
          animation: wa-ping 2.4s ease-out infinite;
          pointer-events: none;
        }
        .wa-btn {
          position: relative; z-index: 1;
          width: 52px; height: 52px; border-radius: 50%;
          background: #25d366;
          display: flex; align-items: center; justify-content: center;
          color: white; text-decoration: none;
          box-shadow: 0 4px 16px rgba(37,211,102,0.4);
          transition: all 0.3s ease;
        }
        .wa-btn:hover { transform: translateY(-3px) scale(1.07); background: #20c45e; }
      `}</style>

      <div className="footer-inner" style={{ padding: '52px 8% 40px' }}>
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18, cursor: 'pointer' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo.jpeg" alt="Divine Arra" style={{ width: 36, height: 36, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#e8c97a', letterSpacing: '0.08em' }}>Divine Arra</span>
            </div>
            <p style={{ color: '#b89060', fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
              Divine Arra blends traditional wisdom with a modern, compassionate approach to guide
              individuals through life's uncertainties.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {quickLinks.map(link => (
                <a key={link} href="#" className="footer-link">{link}</a>
              ))}
            </nav>
          </div>

          {/* Column 3: Other Links */}
          <div>
            <div className="footer-col-title">Other Links</div>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {otherLinks.map(link => (
                <a key={link} href="#" className="footer-link">{link}</a>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            <div className="footer-contact-item">
              <Phone size={15} color="#c47a1e" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>+91 8280055593</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={15} color="#c47a1e" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>support@divinearra.com</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={15} color="#c47a1e" style={{ flexShrink: 0, marginTop: 3 }} />
              <span>
                3rd Floor, Shanti Enclave, Laxmisagar,<br />
                Bhubaneswar, Odisha, 751006
              </span>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="footer-map-container">
          <iframe
            src="https://www.google.com/maps?ll=20.265125,85.854716&z=12&t=m&hl=en-US&gl=US&mapclient=embed&q=Bhubaneswar,+Odisha+751006+Laxmisagar&output=embed"
            width="100%"
            height="260"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Divine Arra Location"
          />
        </div>
      </div>

      <div className="footer-bottom">
        Copyright © 2026 Divine Arra – All Rights Reserved
      </div>

      {/* Scroll To Top */}
     <button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  onMouseEnter={() => setScrollHover(true)}
  onMouseLeave={() => setScrollHover(false)}
  className={`scroll-top-btn ${showScroll ? 'visible-btn' : 'hidden-btn'}`}
  aria-label="Scroll to top"
>
  <svg className="scroll-top-svg" viewBox="0 0 44 44">
    <circle className="scroll-top-track" cx="22" cy="22" r="16" />
    <circle
      className="scroll-top-progress"
      cx="22" cy="22" r="16"
      strokeDasharray={circumference}
      strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
    />
  </svg>
  <ArrowUp size={16} color={scrollHover ? '#1a0a00' : '#e8c97a'} style={{ position: 'relative', zIndex: 1 }} />
</button>

      {/* WhatsApp Floating */}
      <div className="wa-wrapper">
        <span className="wa-ping" />
        <a
          href="https://wa.me/918280055593"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="wa-btn"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </footer>
  )
}