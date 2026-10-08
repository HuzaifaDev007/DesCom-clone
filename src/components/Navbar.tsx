import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import logo from '../assets/DESCOM_VECTOR.svg'
import { useNavbarMenu } from '../hooks/useNavbarMenu'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'About Us', end: false },
  { to: '/services', label: 'Services', end: false },
  { to: '/join-our-agency', label: 'Join Our Agency', end: false },
  { to: '/insurance-lead-generation', label: 'Lead Generation', end: false },
  { to: '/faq', label: 'FAQ', end: false },
  { to: '/contact-us', label: 'Contact Us', end: false },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useNavbarMenu(menuOpen)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return

    const smoother = ScrollSmoother.get()
    const previousOverflow = document.body.style.overflow

    if (smoother) {
      smoother.paused(true)
    } else {
      document.body.style.overflow = 'hidden'
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    const desktop = window.matchMedia('(min-width: 1025px)')
    const onViewport = () => {
      if (desktop.matches) closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onViewport)

    return () => {
      smoother?.paused(false)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onViewport)
    }
  }, [menuOpen, closeMenu])

  return (
    <header ref={rootRef} className={menuOpen ? 'navbar navbar-open' : 'navbar'}>
      <div className="navbar-inner">
        <div className="navbar-bar">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img
              src={logo}
              alt="DESCOM"
              className="navbar-logo-image"
            />
          </Link>

          <nav className="navbar-links" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-cta">
            <Link to="/quote" className="navbar-join">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="navbar-toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
        </div>
      </div>

      <nav className="navbar-menu" aria-label="Mobile" aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive
                ? 'navbar-menu-item navbar-menu-link navbar-menu-link-active'
                : 'navbar-menu-item navbar-menu-link'
            }
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </NavLink>
        ))}
        <Link
          to="/quote"
          className="navbar-join navbar-menu-cta navbar-menu-item"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  )
}
