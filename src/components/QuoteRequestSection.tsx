import torus from '../assets/footer-torus.png'
import { useQuoteRequestForm } from '../hooks/useQuoteRequestForm'
import { CONTACT_TIMES, INSURANCE_TYPES } from '../lib/quoteRequest'

export function QuoteRequestSection() {
  const { values, status, handleChange, handleSubmit } = useQuoteRequestForm()
  const isSubmitting = status.type === 'submitting'

  return (
    <section className="join-us-apply" aria-labelledby="quote-request-title">
      <div className="join-us-apply-inner">
        <div className="join-us-apply-intro">
          <p className="join-us-apply-kicker" aria-hidden="true">
            Quote
          </p>
          <h2 className="join-us-apply-title" id="quote-request-title">
            Get A Free
            <span className="join-us-apply-highlight">
              Quote
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
          </h2>
          <p className="join-us-apply-text">
            Fill out the form below and our team will contact you with
            personalized insurance options tailored to your needs.
          </p>
        </div>

        <div className="join-us-apply-stage">
          <div className="join-us-apply-frame">
            <form className="join-us-apply-form" onSubmit={handleSubmit} noValidate>
              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-first-name">
                  First Name *
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-first-name"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="First name"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-last-name">
                  Last Name *
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-last-name"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Last name"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-email">
                  Email *
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-email"
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
                <label className="join-us-apply-label" htmlFor="quote-phone">
                  Phone Number *
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  required
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-address">
                  Address
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-address"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Your street address"
                  value={values.address}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-coverage">
                  Desired Coverage Amount
                </label>
                <input
                  className="join-us-apply-input"
                  id="quote-coverage"
                  name="desiredCoverageAmount"
                  placeholder="e.g., $250,000"
                  value={values.desiredCoverageAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-insurance-type">
                  Insurance Type *
                </label>
                <select
                  className="join-us-apply-input join-us-apply-select"
                  id="quote-insurance-type"
                  name="insuranceType"
                  required
                  value={values.insuranceType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select policy type
                  </option>
                  {INSURANCE_TYPES.map((insuranceType) => (
                    <option key={insuranceType} value={insuranceType}>
                      {insuranceType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="quote-contact-time">
                  Best Time to Contact
                </label>
                <select
                  className="join-us-apply-input join-us-apply-select quote-request-select-optional"
                  id="quote-contact-time"
                  name="bestTimeToContact"
                  value={values.bestTimeToContact}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {CONTACT_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="quote-favorite-color">
                  Favorite Color (For Call Back Reference)
                </label>
                <div className="quote-request-color">
                  <input
                    className="quote-request-color-input"
                    id="quote-favorite-color"
                    name="favoriteColor"
                    type="color"
                    value={values.favoriteColor}
                    onChange={handleChange}
                  />
                  <span className="quote-request-color-value">{values.favoriteColor}</span>
                </div>
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <button className="join-us-apply-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
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
