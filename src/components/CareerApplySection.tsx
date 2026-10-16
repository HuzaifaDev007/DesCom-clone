import { CAREER_POSITIONS } from '../lib/careerApplication'
import { useCareerApplicationForm } from '../hooks/useCareerApplicationForm'
import { useCareerApplyReveal } from '../hooks/useCareerApplyReveal'
import { AboutTitleMotion } from './AboutTitleMotion'
import { HighlightUnderline } from './HighlightUnderline'

export function CareerApplySection() {
  const { values, errors, status, handleChange, handleSubmit } =
    useCareerApplicationForm()
  const { ref } = useCareerApplyReveal()
  const isSubmitting = status.type === 'submitting'

  return (
    <section
      ref={ref}
      id="apply"
      className="join-us-apply career-apply"
      aria-labelledby="career-apply-title"
    >
      <div className="join-us-apply-inner">
        <div className="join-us-apply-intro">
          <p className="join-us-apply-kicker" aria-hidden="true">
            Career
          </p>
          <AboutTitleMotion className="join-us-apply-title" id="career-apply-title">
            Apply For A
            <HighlightUnderline className="join-us-apply-highlight">
              Role
            </HighlightUnderline>
          </AboutTitleMotion>
          <p className="join-us-apply-text">
            Share your details and CV. Our team reviews every application and
            will follow up if there is a match.
          </p>
        </div>

        <div className="join-us-apply-stage">
          <div className="join-us-apply-frame">
            <form
              className="join-us-apply-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="career-fullName">
                  Full Name *
                </label>
                <input
                  className={
                    errors.fullName
                      ? 'join-us-apply-input career-apply-input-error'
                      : 'join-us-apply-input'
                  }
                  id="career-fullName"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? 'career-fullName-error' : undefined
                  }
                  value={values.fullName}
                  onChange={handleChange}
                />
                {errors.fullName ? (
                  <p
                    className="career-apply-field-error"
                    id="career-fullName-error"
                    role="alert"
                  >
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="career-email">
                  Email Address *
                </label>
                <input
                  className={
                    errors.email
                      ? 'join-us-apply-input career-apply-input-error'
                      : 'join-us-apply-input'
                  }
                  id="career-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'career-email-error' : undefined
                  }
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <p
                    className="career-apply-field-error"
                    id="career-email-error"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="join-us-apply-field">
                <label
                  className="join-us-apply-label"
                  htmlFor="career-contactNumber"
                >
                  Contact Number *
                </label>
                <input
                  className={
                    errors.contactNumber
                      ? 'join-us-apply-input career-apply-input-error'
                      : 'join-us-apply-input'
                  }
                  id="career-contactNumber"
                  name="contactNumber"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  required
                  aria-invalid={Boolean(errors.contactNumber)}
                  aria-describedby={
                    errors.contactNumber
                      ? 'career-contactNumber-error'
                      : undefined
                  }
                  value={values.contactNumber}
                  onChange={handleChange}
                />
                {errors.contactNumber ? (
                  <p
                    className="career-apply-field-error"
                    id="career-contactNumber-error"
                    role="alert"
                  >
                    {errors.contactNumber}
                  </p>
                ) : null}
              </div>

              <div className="join-us-apply-field">
                <label className="join-us-apply-label" htmlFor="career-position">
                  Position Are You Applying For *
                </label>
                <select
                  className={
                    errors.position
                      ? 'join-us-apply-input join-us-apply-select career-apply-input-error'
                      : 'join-us-apply-input join-us-apply-select'
                  }
                  id="career-position"
                  name="position"
                  required
                  aria-invalid={Boolean(errors.position)}
                  aria-describedby={
                    errors.position ? 'career-position-error' : undefined
                  }
                  value={values.position}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a position
                  </option>
                  {CAREER_POSITIONS.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                {errors.position ? (
                  <p
                    className="career-apply-field-error"
                    id="career-position-error"
                    role="alert"
                  >
                    {errors.position}
                  </p>
                ) : null}
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <label className="join-us-apply-label" htmlFor="career-cv">
                  Upload CV *
                </label>
                <div
                  className={
                    errors.cv
                      ? 'career-apply-upload career-apply-upload-error'
                      : 'career-apply-upload'
                  }
                >
                  <input
                    className="career-apply-upload-input"
                    id="career-cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg"
                    required
                    aria-invalid={Boolean(errors.cv)}
                    aria-describedby={
                      errors.cv
                        ? 'career-cv-error career-cv-cue'
                        : 'career-cv-cue'
                    }
                    onChange={handleChange}
                  />
                  <div className="career-apply-upload-cue" id="career-cv-cue">
                    <span className="career-apply-upload-title">
                      {values.cv ? values.cv.name : 'Choose a file'}
                    </span>
                    <span className="career-apply-upload-hint">
                      PDF, Word, PNG, or JPG · Max 5MB
                    </span>
                  </div>
                </div>
                {errors.cv ? (
                  <p
                    className="career-apply-field-error"
                    id="career-cv-error"
                    role="alert"
                  >
                    {errors.cv}
                  </p>
                ) : null}
              </div>

              <div className="join-us-apply-field join-us-apply-field-wide">
                <button
                  className="join-us-apply-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
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
