import { useState } from 'react'
import { navLinks } from '../data/navData'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)

  return (
    <>
      <style>{`
        .desktop-nav { display: flex !important; }
        .hamburger { display: none !important; }
        .nav-link { color: #e8c97a !important; }
        .nav-link:hover { color: #ffd700 !important; background: rgba(196,122,30,0.2) !important; }
        .dropdown-item:hover { background: rgba(196,122,30,0.25) !important; color: #ffd700 !important; padding-left: 26px !important; }
        .mobile-menu { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .mobile-menu.open { max-height: 80vh; overflow-y: auto; }
        .mobile-menu.open::-webkit-scrollbar { width: 4px; }
        .mobile-menu.open::-webkit-scrollbar-track { background: #1e0d00; }
        .mobile-menu.open::-webkit-scrollbar-thumb { background: #c47a1e; border-radius: 4px; }
        .mobile-sub { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .mobile-sub.open { max-height: 500px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'linear-gradient(90deg, #1a0a00 0%, #2d1200 40%, #3a1800 70%, #1a0a00 100%)',
        borderBottom: '1px solid #c47a1e',
        boxShadow: '0 2px 20px rgba(196,122,30,0.25)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 24px', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>

          {/* Logo: image on top, text below */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <img
              src="/logo.jpeg"
              alt="Divine Arra Logo"
              style={{ width: 46, height: 46, objectFit: 'contain', filter: 'brightness(1.1)' }}
            />
            <div style={{
              fontWeight: 700, fontSize: 12,
              color: '#e8c97a',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              textShadow: '0 0 12px rgba(232,201,122,0.4)'
            }}>
              Divine Arra
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
            {navLinks.map(link => (
              <div key={link.label} style={{ position: 'relative' }}
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <a href={link.path}
                  className="nav-link"
                  style={{
                    padding: '8px 12px', borderRadius: 8,
                    color: openDropdown === link.label ? '#ffd700' : '#e8c97a',
                    textDecoration: 'none', fontSize: 13,
                    fontFamily: 'sans-serif', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: openDropdown === link.label ? 'rgba(196,122,30,0.2)' : 'transparent',
                    transition: 'all 0.2s', whiteSpace: 'nowrap',
                    letterSpacing: '0.02em'
                  }}>
                  {link.label}
                  {link.dropdown && (
                    <span style={{ fontSize: 8, color: '#c47a1e' }}>▼</span>
                  )}
                </a>

                {link.dropdown && openDropdown === link.label && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#1e0d00',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    border: '1px solid #c47a1e',
                    minWidth: 240, padding: '8px 0', zIndex: 200
                  }}>
                    {link.dropdown.map(item => (
                      <a key={item} href="#"
                        className="dropdown-item"
                        style={{
                          display: 'block', padding: '9px 20px',
                          color: '#e8c97a', textDecoration: 'none',
                          fontSize: 13, fontFamily: 'sans-serif',
                          transition: 'all 0.15s',
                          borderBottom: '1px solid rgba(196,122,30,0.15)'
                        }}>
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <div style={{ width: 1, height: 28, background: 'rgba(196,122,30,0.4)', margin: '0 8px' }} />

            <a href="#" style={{
              background: 'linear-gradient(135deg, #c47a1e 0%, #e8a135 50%, #c47a1e 100%)',
              color: '#1a0a00',
              padding: '10px 22px', borderRadius: 25,
              textDecoration: 'none', fontSize: 13,
              fontFamily: 'sans-serif', fontWeight: 700,
              boxShadow: '0 4px 16px rgba(196,122,30,0.45)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.03em',
              border: '1px solid #e8a135'
            }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #e8a135 0%, #ffd700 50%, #e8a135 100%)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(196,122,30,0.6)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #c47a1e 0%, #e8a135 50%, #c47a1e 100%)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(196,122,30,0.45)'
              }}>
              Book Now
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5
            }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2,
                background: '#e8c97a', borderRadius: 2,
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

        {/* Mobile Menu — scrollable with working chevrons */}
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} style={{
          background: '#1e0d00',
          borderTop: mobileOpen ? '1px solid #c47a1e' : 'none',
        }}>
          {navLinks.map(link => (
            <div key={link.label}>
              <div
                onClick={() => {
                  if (link.dropdown) {
                    setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                  } else {
                    setMobileOpen(false)
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 24px',
                  borderBottom: '1px solid rgba(196,122,30,0.2)',
                  cursor: 'pointer'
                }}>
                <span style={{
                  color: '#e8c97a', fontSize: 15,
                  fontFamily: 'sans-serif', fontWeight: 600
                }}>
                  {link.label}
                </span>
                {link.dropdown && (
                  <span style={{
                    color: '#c47a1e', fontSize: 10,
                    display: 'inline-block',
                    transition: 'transform 0.25s',
                    transform: mobileDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}>▼</span>
                )}
              </div>

              {/* Sub-items smooth expand */}
              <div className={`mobile-sub${mobileDropdown === link.label ? ' open' : ''}`}
                style={{ background: '#150900' }}>
                {link.dropdown && link.dropdown.map(item => (
                  <a key={item} href="#" style={{
                    display: 'block', padding: '9px 36px',
                    color: '#b89050', textDecoration: 'none',
                    fontSize: 13, fontFamily: 'sans-serif',
                    borderBottom: '1px solid rgba(196,122,30,0.1)'
                  }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ padding: '16px 24px 20px' }}>
            <a href="#" style={{
              display: 'block', textAlign: 'center',
              background: 'linear-gradient(135deg, #c47a1e, #e8a135)',
              color: '#1a0a00',
              padding: '13px', borderRadius: 25,
              textDecoration: 'none', fontWeight: 700,
              fontFamily: 'sans-serif', fontSize: 15
            }}>
              Book Now
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}