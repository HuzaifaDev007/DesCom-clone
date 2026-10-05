import teamPhoto from '../assets/career-team.jpg'

const focusAreas = [
  'Life Insurance & Final Expense',
  'Health & Supplemental Coverage',
  'Home, Auto & Business Protection',
]

export function AboutSection() {
  return (
    <section className="home-about" aria-labelledby="home-about-title">
      <div className="home-about-photo">
        <img
          className="home-about-photo-image"
          src={teamPhoto}
          alt="DesCom team members seated together in the office"
        />
      </div>
      <div className="home-about-panel">
        <div className="home-about-copy">
          <p className="home-about-kicker">About</p>
          <h2 className="home-about-title" id="home-about-title">
            Your Trusted Partner
            <span className="home-about-highlight">
              In Insurance
              <svg
                className="home-about-underline"
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
          <p className="home-about-text">
            At DesCom, we understand that navigating insurance can be complex.
            That&apos;s why we simplify the process and provide clear,
            comprehensive coverage options for life, health, and property —
            tailored to your unique circumstances. Our commitment is your
            security and peace of mind.
          </p>
          <div className="home-about-bottom">
            <div className="home-about-card">
              <h3 className="home-about-card-title">
                Explore Coverage Options
              </h3>
              <p className="home-about-card-text">
                Personalized plans designed to protect what matters most.
              </p>
            </div>
            <ul className="home-about-roles">
              {focusAreas.map((area) => (
                <li key={area} className="home-about-role">
                  <svg
                    className="home-about-role-icon"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                  </svg>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          <span className="home-about-orb" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
