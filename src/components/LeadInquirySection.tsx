import { Link } from 'react-router'
import torus from '../assets/footer-torus.png'
import { useJoinApplyReveal } from '../hooks/useJoinApplyReveal'
import { useLeadInquiryForm } from '../hooks/useLeadInquiryForm'
import { LEAD_TYPES } from '../lib/leadInquiry'
import { AboutTitleMotion } from './AboutTitleMotion'
import { HighlightUnderline } from './HighlightUnderline'

export function LeadInquirySection() {
  const { values, status, handleChange, handleSubmit } = useLeadInquiryForm()
  const { ref } = useJoinApplyReveal()
  const isSubmitting = status.type === 'submitting'

  return (
    <section
      ref={ref}
      id="lead-form"
      className="join-us-apply lead-generation-inquiry"
      aria-labelledby="lead-generation-inquiry-title"
    >
      <div className="join-us-apply-inner">
        <div className="join-us-apply-intro">
          <p className="join-us-apply-kicker" aria-hidden="true">
            Inquire
          </p>
          <AboutTitleMotion className="join-us-apply-title" id="lead-generation-inquiry-title">
            Discuss Your
            <HighlightUnderline className="join-us-apply-highlight">
              Lead Needs
            </HighlightUnderline>
          </AboutTitleMotion>
          <p className="join-us-apply-text">
            Tell us about your agency and the leads you are looking for. We will
            follow up to talk through availability and next steps.
          </p>
        </div>

        <div className="join-us-apply-stage">
          <div className="join-us-apply-frame">
            <form className="join-us-apply-form" onSubmit={handleSubmit} noValidate>
              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="lead-name">
                  Name *
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  value={values.name}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="lead-company">
                  Company / Agency
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Your agency name"
                  value={values.company}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="lead-email">
                  Email *
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-email"
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
                <label className="join-us-apply-label" htmlFor="lead-phone">
                  Phone Number
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="lead-states">
                  States of Interest
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-states"
                  name="statesOfInterest"
                  placeholder="e.g., NJ, PA, NY"
                  value={values.statesOfInterest}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="lead-type">
                  Lead Type *
                </label>
                <select
                  className="join-us-apply-input join-us-apply-select"
                  id="lead-type"
                  name="leadType"
                  required
                  value={values.leadType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a lead type
                  </option>
                  {LEAD_TYPES.map((leadType) => (
                    <option key={leadType} value={leadType}>
                      {leadType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="lead-volume">
                  Expected Volume
                </label>
                <input
                  className="join-us-apply-input"
                  id="lead-volume"
                  name="expectedVolume"
                  placeholder="e.g., 25 leads per week"
                  value={values.expectedVolume}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <div className="lead-generation-inquiry-consent">
                  <input
                    className="lead-generation-inquiry-checkbox"
                    id="lead-sms-consent"
                    name="smsConsent"
                    type="checkbox"
                    checked={values.smsConsent}
                    onChange={handleChange}
                  />
                  <div className="lead-generation-inquiry-consent-copy">
                    <label
                      className="lead-generation-inquiry-consent-text"
                      htmlFor="lead-sms-consent"
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
                    <p className="lead-generation-inquiry-consent-note">
                      Your information will only be used to respond to your
                      inquiry and communicate with you about Unified Solutions
                      services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="lead-message">
                  Message *
                </label>
                <textarea
                  className="join-us-apply-input join-us-apply-textarea"
                  id="lead-message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your agency and what you are looking for"
                  required
                  value={values.message}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <button className="join-us-apply-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
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
          <img className="join-us-apply-ring" src={torus} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
