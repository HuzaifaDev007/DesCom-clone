import { Link } from 'react-router'
import logo from '../assets/DESCOM_VECTOR.svg'

type FooterDestination = {
  label: string
  to?: string
  href?: string
}

const quickLinks: FooterDestination[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Services', to: '/services' },
  { label: 'Join Our Agency', to: '/join-our-agency' },
  { label: 'Lead Generation', to: '/insurance-lead-generation' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact-us' },
]

const legalLinks: FooterDestination[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
]

const socialLinks = [
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/company/unified-risk-solutions-llc',
    icon: (
      <svg className="footer-social-icon" viewBox="0 0 448 512" aria-hidden="true">
        <path
          fill="currentColor"
          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        />
      </svg>
    ),
  },
]

function FooterAnchor({
  item,
  className,
}: {
  item: FooterDestination
  className: string
}) {
  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    )
  }

  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  )
}

function MailIcon() {
  return (
    <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m22 6-10 7L2 6"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="footer-contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="footer-join-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.004 9.414 7.397 18.021l-1.414-1.414 8.607-8.607H7.004V6h11v11h-2V9.414z"
      />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-glow">
        <div className="footer-inner">
          <div className="footer-columns">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img
                  className="footer-logo-image"
                  src={logo}
                  alt="DESCOM"
                />
              </Link>
              <p className="footer-about">
                DesCom helps individuals, families, and partners find clear,
                reliable insurance solutions for life, health, and property —
                with guidance you can trust every step of the way.
              </p>
              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    className="footer-social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="footer-social-label">{social.label}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <h2 className="footer-heading">Quick Links</h2>
              <ul className="footer-links-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor item={link} className="footer-link" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-contact">
              <div className="footer-address">
                <h2 className="footer-address-title">Visit Us</h2>
                <p className="footer-address-text">New Jersey, USA</p>
              </div>
              <ul className="footer-contact-list">
                <li>
                  <a
                    className="footer-contact-link"
                    href="mailto:admin@unifiedrisksolutions.com"
                  >
                    <MailIcon />
                    admin@unifiedrisksolutions.com
                  </a>
                </li>
                <li>
                  <a className="footer-contact-link" href="tel:+18482569995">
                    <PhoneIcon />
                    848-256-9995
                  </a>
                </li>
              </ul>
              <div className="footer-join-wrap">
                <Link className="footer-join" to="/quote">
                  GET A QUOTE
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-bar">
            <div className="footer-copy-wrap">
              <p className="footer-copy">
                {year} © Copyright DesCom. All rights reserved
              </p>
            </div>
            <div className="footer-legal-wrap">
              <ul className="footer-legal">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor item={link} className="footer-legal-link" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
