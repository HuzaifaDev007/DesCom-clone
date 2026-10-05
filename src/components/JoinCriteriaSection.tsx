import advisorPhoto from '../assets/servicesFeature/gallery-2.webp'

const criteria = [
  'Self-motivated individuals with a strong entrepreneurial spirit.',
  "Professionals dedicated to putting clients' needs first.",
  'Excellent communicators who can simplify complex concepts.',
  'Active life insurance license (or willingness to obtain one).',
  'High ethical standards and unwavering integrity.',
]

export function JoinCriteriaSection() {
  return (
    <section className="join-us-criteria" aria-labelledby="join-us-criteria-title">
      <div className="join-us-criteria-photo">
        <img
          className="join-us-criteria-photo-image"
          src={advisorPhoto}
          alt="DesCom advisor wearing a headset in the office"
        />
      </div>

      <div className="join-us-criteria-panel">
        <div className="join-us-criteria-copy">
          <p className="join-us-criteria-kicker" aria-hidden="true">
            Agents
          </p>
          <h2 className="join-us-criteria-title" id="join-us-criteria-title">
            Who We&apos;re
            <span className="join-us-criteria-highlight">
              Looking For
              <svg
                className="join-us-criteria-underline"
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

          <ul className="join-us-criteria-list">
            {criteria.map((item) => (
              <li key={item} className="join-us-criteria-item">
                <svg
                  className="join-us-criteria-icon"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <span className="join-us-criteria-orb" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
