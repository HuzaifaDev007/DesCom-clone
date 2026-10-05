const stats = [
  { value: 'Life', label: 'Secure Family Protection' },
  { value: 'Health', label: 'Coverage Built Around You' },
  { value: '8+', label: 'Trusted Carrier Partners' },
  { value: '100%', label: 'Personalized Plan Focus' },
] as const

export function TrustedSection() {
  return (
    <section className="home-trusted" aria-labelledby="home-trusted-title">
      <div className="home-trusted-glow">
        <div className="home-trusted-inner">
          <div className="home-trusted-intro">
            <div className="home-trusted-heading">
              <p className="home-trusted-kicker" aria-hidden="true">
                Why Us
              </p>
              <h2 className="home-trusted-title" id="home-trusted-title">
                <span className="home-trusted-title-line">Trusted By Families.</span>
                <span className="home-trusted-title-mark">
                  Powered By Expertise.
                  <svg
                    className="home-trusted-underline"
                    viewBox="0 115 500 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                  </svg>
                </span>
              </h2>
            </div>
            <p className="home-trusted-text">
              Experienced advisors, personalized plans, and superior support —
              so you can protect what matters with confidence.
            </p>
          </div>
          <div className="home-trusted-grid">
            {stats.map((stat) => (
              <article key={stat.label} className="home-trusted-card">
                <div className="home-trusted-card-body">
                  <h3 className="home-trusted-card-label">{stat.label}</h3>
                  <p className="home-trusted-card-value">{stat.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
