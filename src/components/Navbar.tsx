import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { navLinks } from '../data/navData'

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const navigate = useNavigate()

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
        .hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: #e8c97a;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
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

          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <img
              src="/logo.jpeg"
              alt="Divine Arra Logo"
              style={{ width: 46, height: 46, objectFit: 'contain', filter: 'brightness(1.1)' }}
            />
            <div style={{
              fontWeight: 700, fontSize: 14,
              color: '#e8c97a',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              textShadow: '0 0 12px rgba(232,201,122,0.4)',
              marginTop: 0,
              lineHeight: 1,
            }}>
              Divine Arra
            </div>
          </a>

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
                </a>

                {link.dropdown && openDropdown === link.label && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#1e0d00',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    border: '1px solid #c47a1e',
                    minWidth: 260, padding: '8px 0', zIndex: 200
                  }}>
                    {link.dropdown.map(item => (
                      <a
                        key={item.label}
                        href={item.path}
                        onClick={(e) => { e.preventDefault(); navigate(item.path); setOpenDropdown(null) }}
                        className="dropdown-item"
                        style={{
                          display: 'block', padding: '9px 20px',
                          color: '#e8c97a', textDecoration: 'none',
                          fontSize: 13, fontFamily: 'sans-serif',
                          transition: 'all 0.15s',
                          borderBottom: '1px solid rgba(196,122,30,0.15)'
                        }}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a href="/login" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(196,122,30,0.2)',
              color: '#e8c97a',
              padding: '7px 14px 7px 7px', borderRadius: 25,
              textDecoration: 'none', fontSize: 13,
              fontFamily: 'sans-serif', fontWeight: 500,
              border: '1px solid #c47a1e',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(196,122,30,0.35)'
                e.currentTarget.style.color = '#ffd700'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(196,122,30,0.2)'
                e.currentTarget.style.color = '#e8c97a'
              }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#e8c97a">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              Customer Login
            </a>
          </div>

          {/* Hamburger — FIX: removed inline display:none so CSS media query can take over */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 8,
              flexDirection: 'column', gap: 5,
              alignItems: 'center', justifyContent: 'center',
            }}>
            <span
              className="hamburger-bar"
              style={{
                transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              className="hamburger-bar"
              style={{
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? 'scaleX(0)' : 'none',
              }}
            />
            <span
              className="hamburger-bar"
              style={{
                transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
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
                    navigate(link.path)
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
                  <span style={{ color: '#c47a1e', fontSize: 12 }}>
                    {mobileDropdown === link.label ? '▲' : '▼'}
                  </span>
                )}
              </div>

              {/* Sub-items */}
              <div className={`mobile-sub${mobileDropdown === link.label ? ' open' : ''}`}
                style={{ background: '#150900' }}>
                {link.dropdown && link.dropdown.map(item => (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(item.path)
                      setMobileOpen(false)
                      setMobileDropdown(null)
                    }}
                    style={{
                      display: 'block', padding: '9px 36px',
                      color: '#b89050', textDecoration: 'none',
                      fontSize: 13, fontFamily: 'sans-serif',
                      borderBottom: '1px solid rgba(196,122,30,0.1)'
                    }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ padding: '16px 24px 20px' }}>
            <a href="/login" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'rgba(196,122,30,0.2)',
              color: '#e8c97a',
              padding: '10px 20px 10px 10px', borderRadius: 25,
              textDecoration: 'none', fontWeight: 500,
              fontFamily: 'sans-serif', fontSize: 15,
              border: '1px solid #c47a1e',
              letterSpacing: '0.02em',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#e8c97a">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              Customer Login
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
