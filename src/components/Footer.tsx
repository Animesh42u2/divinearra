import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const quickLinks = ['About Us', 'Services', 'Courses', 'Contact', 'Blogs & Articles']
  const otherLinks = ['Privacy Policy', 'Refund Policy', 'Terms & Conditions', 'Disclaimer', 'Sitemap']

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

        /* ── Responsive grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px 32px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-inner {
            padding: 36px 5% 32px !important;
          }
          .footer-map-container iframe {
            height: 200px !important;
          }
        }
      `}</style>

      <div className="footer-inner" style={{ padding: '52px 8% 40px' }}>
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <div>
            <div className="footer-col-title">Divine Arra</div>
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
            <div className="footer-col-title">Divine Arra</div>

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
    </footer>
  )
}
