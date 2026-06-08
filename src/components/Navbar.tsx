import { useState } from 'react'
import { navLinks } from '../data/navData'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #e8d5b7',
      boxShadow: '0 2px 12px rgba(180,100,20,0.08)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.jpeg" alt="Divine Arra Logo"
            style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '2px solid #c47a1e' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: '#7a3e0a', fontFamily: 'Georgia, serif' }}>
              Divine Arra
            </div>
          </div>
        </div>

        {/* Desktop Nav — hidden on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          className="desktop-nav">
          {navLinks.map(link => (
            <div key={link.label} style={{ position: 'relative' }}
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}>
              <a href={link.path} style={{
                padding: '8px 12px', borderRadius: 8,
                color: openDropdown === link.label ? '#c47a1e' : '#5a3010',
                textDecoration: 'none', fontSize: 13,
                fontFamily: 'sans-serif', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 4,
                background: openDropdown === link.label ? '#fff5e6' : 'transparent',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}>
                {link.label}
                {link.dropdown && <span style={{ fontSize: 8, color: '#c47a1e' }}>▼</span>}
              </a>

              {link.dropdown && openDropdown === link.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#fff', borderRadius: 12,
                  boxShadow: '0 8px 32px rgba(122,62,10,0.15)',
                  border: '1px solid #e8d5b7',
                  minWidth: 260, padding: '8px 0', zIndex: 200
                }}>
                  {link.dropdown.map(item => (
                    <a key={item} href="#" style={{
                      display: 'block', padding: '9px 20px',
                      color: '#5a3010', textDecoration: 'none',
                      fontSize: 13, fontFamily: 'sans-serif',
                      transition: 'all 0.15s'
                    }}
                      onMouseOver={e => {
                        const el = e.target as HTMLElement
                        el.style.background = '#fff5e6'
                        el.style.color = '#c47a1e'
                        el.style.paddingLeft = '26px'
                      }}
                      onMouseOut={e => {
                        const el = e.target as HTMLElement
                        el.style.background = 'transparent'
                        el.style.color = '#5a3010'
                        el.style.paddingLeft = '20px'
                      }}>
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="#" style={{
            marginLeft: 8, background: '#c47a1e', color: '#fff',
            padding: '10px 20px', borderRadius: 25,
            textDecoration: 'none', fontSize: 13,
            fontFamily: 'sans-serif', fontWeight: 700,
            boxShadow: '0 4px 14px rgba(196,122,30,0.35)',
            whiteSpace: 'nowrap'
          }}
            onMouseOver={e => (e.currentTarget.style.background = '#7a3e0a')}
            onMouseOut={e => (e.currentTarget.style.background = '#c47a1e')}>
            Book Now
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="hamburger"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5
          }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: '#7a3e0a', borderRadius: 2,
              transition: 'all 0.3s',
              transform: mobileOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                : 'none'
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: '#fff', borderTop: '1px solid #e8d5b7',
          padding: '12px 0 20px'
        }} className="mobile-menu">
          {navLinks.map(link => (
            <div key={link.label}>
              <a href={link.path} style={{
                display: 'block', padding: '11px 24px',
                color: '#5a3010', textDecoration: 'none',
                fontSize: 15, fontFamily: 'sans-serif', fontWeight: 600,
                borderBottom: '1px solid #f5e8d0'
              }}
                onClick={() => !link.dropdown && setMobileOpen(false)}>
                {link.label} {link.dropdown && <span style={{ color: '#c47a1e', fontSize: 10 }}>▼</span>}
              </a>
              {link.dropdown && link.dropdown.map(item => (
                <a key={item} href="#" style={{
                  display: 'block', padding: '9px 36px',
                  color: '#9a7050', textDecoration: 'none',
                  fontSize: 13, fontFamily: 'sans-serif',
                  borderBottom: '1px solid #faf0e6'
                }}>
                  {item}
                </a>
              ))}
            </div>
          ))}
          <div style={{ padding: '16px 24px 0' }}>
            <a href="#" style={{
              display: 'block', textAlign: 'center',
              background: '#c47a1e', color: '#fff',
              padding: '13px', borderRadius: 25,
              textDecoration: 'none', fontWeight: 700,
              fontFamily: 'sans-serif', fontSize: 15
            }}>
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}