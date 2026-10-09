import { useAgentApplicationForm } from '../hooks/useAgentApplicationForm'
import { useJoinApplyReveal } from '../hooks/useJoinApplyReveal'
import { US_STATES } from '../lib/agentApplication'
import { AboutTitleMotion } from './AboutTitleMotion'
import { HighlightUnderline } from './HighlightUnderline'

export function JoinApplySection() {
  const { values, status, handleChange, handleSubmit } = useAgentApplicationForm()
  const { ref } = useJoinApplyReveal()
  const isSubmitting = status.type === 'submitting'

  return (
    <section ref={ref} id="apply" className="join-us-apply" aria-labelledby="join-us-apply-title">
      <div className="join-us-apply-inner">
        <div className="join-us-apply-intro">
          <p className="join-us-apply-kicker" aria-hidden="true">
            Apply
          </p>
          <AboutTitleMotion className="join-us-apply-title" id="join-us-apply-title">
            Apply To Join
            <HighlightUnderline className="join-us-apply-highlight">
              Our Team
            </HighlightUnderline>
          </AboutTitleMotion>
          <p className="join-us-apply-text">
            Take the first step toward a rewarding career. Fill out the form
            below and our team will reach out.
          </p>
        </div>

        <div className="join-us-apply-stage">
          <div className="join-us-apply-frame">
            <form className="join-us-apply-form" onSubmit={handleSubmit} noValidate>
              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="fullName">
                  Full Name *
                </label>
                <input
                  className="join-us-apply-input"
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  value={values.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  className="join-us-apply-input"
                  id="phone"
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
                <label className="join-us-apply-label" htmlFor="email">
                  Email Address *
                </label>
                <input
                  className="join-us-apply-input"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="state">
                  State *
                </label>
                <select
                  className="join-us-apply-input join-us-apply-select"
                  id="state"
                  name="state"
                  required
                  value={values.state}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="join-us-apply-field join-us-apply-fieldset">
                <legend className="join-us-apply-label">Currently Licensed? *</legend>
                <div className="join-us-apply-choices">
                  {(['yes', 'no'] as const).map((option) => (
                    <label key={option} className="join-us-apply-choice">
                      <input
                        className="join-us-apply-choice-input"
                        type="radio"
                        name="licensed"
                        value={option}
                        checked={values.licensed === option}
                        onChange={handleChange}
                      />
                      <span className="join-us-apply-choice-label">
                        {option === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="experience">
                  Years of Experience
                </label>
                <input
                  className="join-us-apply-input"
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  placeholder="e.g. 3"
                  value={values.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="message">
                  Message / Additional Information
                </label>
                <textarea
                  className="join-us-apply-input join-us-apply-textarea"
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a bit about your background and goals..."
                  value={values.message}
                  onChange={handleChange}
                />
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <button className="join-us-apply-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
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
