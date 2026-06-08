export default function Footer() {
  return (
    <footer style={{ background: '#8b0000', color: '#dba0a0', fontFamily: 'sans-serif', padding: '48px 8% 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 40 }}>
        {[
          { title: 'Shubh Muhurat 2026', links: ['Amavasyankar Muhurat 2026', 'Navratribanav Muhurat 2026', 'Grihba Muhurat 2026', 'Bhoomi Pujan Muhurat 2026', 'Marriage Muhurat 2026', 'Online Pravesh Muhurat 2026', 'Mundan Muhurat 2026'] },
          { title: 'Important Links', links: ['Planetary Transit 2026', 'Solar Eclipse 2026', 'Lunar Eclipse 2026', 'Festival Calendar 2026', 'Vrat Calendar 2026', 'Astrology Yoga', 'Kaalsarp Dosha', 'Mantras'] },
          { title: 'More Links', links: ['Blog', 'AstroShop', 'Horoscope'] },
          { title: 'Astrologer Links', links: ['Astrologer Signup', 'Astrologer Login'] },
          { title: 'Corporate Info', links: ['Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Shipping Policy', 'About Us', 'Contact Us'] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 14, letterSpacing: 0.3 }}>{col.title}</h4>
            {col.links.map(l => (
              <a key={l} href="#" style={{ display: 'block', color: '#dba0a0', textDecoration: 'none', fontSize: 12, lineHeight: 2.2 }}
                onMouseOver={e => (e.currentTarget.style.color = '#e8a135')}
                onMouseOut={e => (e.currentTarget.style.color = '#dba0a0')}>{l}</a>
            ))}
          </div>
        ))}
        <div>
          <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Contact Us</h4>
          <div style={{ fontSize: 12, lineHeight: 2.2, color: '#dba0a0' }}>
            <div>✉ info@divinearra.com</div>
            <div style={{ color: '#c47a1e', marginTop: 8, fontWeight: 600 }}>Website Consultation related query</div>
            <div>📞 +91-8007891666</div>
            <div style={{ color: '#c47a1e', marginTop: 8, fontWeight: 600 }}>Puja related query</div>
            <div>📞 +91-8750911116</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {['f', '📸', '▶', '💼', '𝕏'].map(icon => (
              <button key={icon} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: 13 }}>{icon}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 18, textAlign: 'center', fontSize: 12, color: '#9a6060' }}>
        © 2026 Divine Arra. All rights reserved. · Privacy Policy · Terms of Service
      </div>
    </footer>
  )
}