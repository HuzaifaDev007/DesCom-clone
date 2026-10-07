import { formatIndex } from '../lib/formatIndex'
import { useCompanyOverviewReveal } from '../hooks/useCompanyOverviewReveal'
import { AboutTitleMotion } from './AboutTitleMotion'
import { TrustedCardsMotion } from './TrustedCardsMotion'

const values = [
  {
    title: 'Integrity',
    text: "We operate with complete transparency, always putting our clients' best interests first.",
    enter: 'bottom' as const,
  },
  {
    title: 'Excellence',
    text: 'We are committed to delivering superior support and continuous improvement in our services.',
    enter: 'top' as const,
  },
  {
    title: 'Empathy',
    text: 'We listen to your unique story to provide personalized plans that truly fit your life.',
    enter: 'bottom' as const,
  },
]

export function CompanyOverviewSection() {
  const { ref } = useCompanyOverviewReveal()

  return (
    <section
      ref={ref}
      className="about-us-overview"
      aria-labelledby="about-us-overview-title"
    >
      <div className="about-us-overview-glow">
        <div className="about-us-overview-inner">
          <div className="about-us-overview-intro">
            <div className="about-us-overview-heading">
              <p className="about-us-overview-kicker" aria-hidden="true">
                Overview
              </p>
              <AboutTitleMotion
                className="about-us-overview-title"
                id="about-us-overview-title"
              >
                <span className="about-us-overview-title-line">Company</span>
                <span className="about-us-overview-title-mark">
                  Overview
                  <svg
                    className="about-us-overview-underline"
                    viewBox="0 115 500 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                  </svg>
                </span>
              </AboutTitleMotion>
            </div>
            <p className="about-us-overview-text">
              Unified Risk Solutions was founded on a simple yet powerful
              principle: everyone deserves access to clear, reliable, and
              comprehensive insurance coverage. We are an independent agency
              dedicated to serving individuals, families, and businesses across
              the nation. By partnering with top-tier carriers, we ensure that
              our clients receive the best possible protection tailored to
              their specific needs.
            </p>
          </div>

          <article className="about-us-overview-mission">
            <div className="about-us-overview-mission-body">
              <h3 className="about-us-overview-mission-title">Our Mission</h3>
              <p className="about-us-overview-mission-text">
                Our mission is to safeguard your tomorrow by providing expert
                solutions and personal service today. We strive to demystify
                the insurance process, empowering our clients to make informed
                decisions about their financial security and well-being.
              </p>
            </div>
          </article>

          <div className="about-us-overview-values">
            <h3 className="about-us-overview-values-title">Our Values</h3>
            <TrustedCardsMotion
              className="about-us-overview-grid"
              cardSelector=".about-us-overview-card[data-trusted-enter]"
            >
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className="about-us-overview-card"
                  data-trusted-enter={value.enter}
                >
                  <div className="about-us-overview-card-body">
                    <span className="about-us-overview-card-index">
                      {formatIndex(index)}
                    </span>
                    <div className="about-us-overview-card-copy">
                      <h4 className="about-us-overview-card-title">
                        {value.title}
                      </h4>
                      <p className="about-us-overview-card-text">{value.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </TrustedCardsMotion>
          </div>
        </div>
      </div>
    </section>
  )
}
