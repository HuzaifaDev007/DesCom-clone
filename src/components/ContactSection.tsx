import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useContactForm } from '../hooks/useContactForm'
import { useContactSectionReveal } from '../hooks/useContactSectionReveal'
import { CONTACT_REASONS } from '../lib/contactInquiry'
import { AboutTitleMotion } from './AboutTitleMotion'

type ContactMethod = {
  label: string
  value: string
  href?: string
  icon: ReactNode
}

const contactMethods: ContactMethod[] = [
  {
    label: 'Phone',
    value: '848-256-9995',
    href: 'tel:+18482569995',
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'Email',
    value: 'admin@unifiedrisksolutions.com',
    href: 'mailto:admin@unifiedrisksolutions.com',
    icon: (
      <>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  },
  {
    label: 'Location',
    value: 'New Jersey, USA',
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

export function ContactSection() {
  const { values, status, handleChange, handleSubmit } = useContactForm()
  const { ref } = useContactSectionReveal()
  const isSubmitting = status.type === 'submitting'

  return (
    <section
      ref={ref}
      className="join-us-apply contact-us-touch"
      aria-labelledby="contact-us-touch-title"
    >
      <div className="join-us-apply-inner">
        <div className="join-us-apply-intro">
          <p className="join-us-apply-kicker" aria-hidden="true">
            Contact
          </p>
          <AboutTitleMotion className="join-us-apply-title" id="contact-us-touch-title">
            Get In
            <span className="join-us-apply-highlight">
              Touch
              <svg
                className="join-us-apply-underline"
                viewBox="0 0 220 18"
                aria-hidden="true"
              >
                <path
                  d="M4 11C36 4 62 16 100 9s62-8 116 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </AboutTitleMotion>
          <p className="join-us-apply-text">
            Whether you have a question about our services, need a quote, or
            require assistance with an existing policy, our team is ready to
            assist you.
          </p>

          <ul className="contact-us-touch-methods">
            {contactMethods.map((method) => {
              const content = (
                <>
                  <span className="contact-us-touch-icon-wrap">
                    <svg
                      className="contact-us-touch-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {method.icon}
                    </svg>
                  </span>
                  <span className="contact-us-touch-copy">
                    <span className="contact-us-touch-label">{method.label}</span>
                    <span className="contact-us-touch-value">{method.value}</span>
                  </span>
                </>
              )

              return (
                <li key={method.label} className="contact-us-touch-method">
                  {method.href ? (
                    <a className="contact-us-touch-card" href={method.href}>
                      {content}
                    </a>
                  ) : (
                    <div className="contact-us-touch-card">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="join-us-apply-stage">
          <div className="join-us-apply-frame">
            <form className="join-us-apply-form" onSubmit={handleSubmit} noValidate>
              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="contact-name">
                  Name *
                </label>
                <input
                  className="join-us-apply-input"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  value={values.name}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="contact-email">
                  Email *
                </label>
                <input
                  className="join-us-apply-input"
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="contact-phone">
                  Phone Number
                </label>
                <input
                  className="join-us-apply-input"
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="contact-reason">
                  How Can We Help? *
                </label>
                <select
                  className="join-us-apply-input join-us-apply-select"
                  id="contact-reason"
                  name="reason"
                  required
                  value={values.reason}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {CONTACT_REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="contact-message">
                  Message *
                </label>
                <textarea
                  className="join-us-apply-input join-us-apply-textarea"
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="How can our team help you?"
                  required
                  value={values.message}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <div className="lead-generation-inquiry-consent">
                  <input
                    className="lead-generation-inquiry-checkbox"
                    id="contact-sms-consent"
                    name="smsConsent"
                    type="checkbox"
                    checked={values.smsConsent}
                    onChange={handleChange}
                  />
                  <div className="lead-generation-inquiry-consent-copy">
                    <label
                      className="lead-generation-inquiry-consent-text"
                      htmlFor="contact-sms-consent"
                    >
                      By checking this box, I consent to receive text messages
                      from Unified Solutions regarding my inquiry, services,
                      appointments, updates, and follow-ups. Message and data
                      rates may apply. Message frequency may vary. Reply STOP to
                      opt out and HELP for assistance. I have read and agree to
                      the{' '}
                      <Link
                        className="lead-generation-inquiry-consent-link"
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link
                        className="lead-generation-inquiry-consent-link"
                        to="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </Link>
                      . Consent is not a condition of purchase.
                    </label>
                  </div>
                </div>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <button className="join-us-apply-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg
                    className="join-us-apply-submit-icon"
                    viewBox="0 0 15 15"
                    aria-hidden="true"
                  >
                    <path
                      d="M1.5 7.5h12M9 3.5l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <p
                  className={`join-us-apply-status join-us-apply-status-${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.type === 'success' || status.type === 'error'
                    ? status.message
                    : null}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
