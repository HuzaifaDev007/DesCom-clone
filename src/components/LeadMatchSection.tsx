import { useLeadMatchReveal } from '../hooks/useLeadMatchReveal'
import { formatIndex } from '../lib/formatIndex'
import { AboutTitleMotion } from './AboutTitleMotion'

const categories = [
  'ACA Marketplace Plans',
  'Medicaid',
  'Other Health Insurance Coverage',
  'Final Expense Life Insurance',
] as const

export function LeadMatchSection() {
  const { ref } = useLeadMatchReveal()

  return (
    <section
      ref={ref}
      className="lead-generation-match"
      aria-labelledby="lead-generation-match-title"
    >
      <div className="lead-generation-match-glow">
        <div className="lead-generation-match-inner">
          <div className="lead-generation-match-intro">
            <div className="lead-generation-match-heading">
              <p className="lead-generation-match-kicker" aria-hidden="true">
                Match
              </p>
              <AboutTitleMotion
                className="lead-generation-match-title"
                id="lead-generation-match-title"
              >
                <span className="lead-generation-match-title-line">
                  Leads That Match Your
                </span>
                <span className="lead-generation-match-title-mark">
                  Book of Business
                  <svg
                    className="lead-generation-match-underline"
                    viewBox="0 115 500 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                  </svg>
                </span>
              </AboutTitleMotion>
            </div>
            <p className="lead-generation-match-text">
              Finding qualified prospects is one of the hardest parts of growing
              an insurance business. Unified Risk Solutions generates consumer
              interest across four key categories — ACA Marketplace plans,
              Medicaid, other health insurance coverage, and final expense life
              insurance — and connects that interest with agencies and agents
              who can help.
            </p>
          </div>

          <div className="lead-generation-match-grid">
            {categories.map((title, index) => (
              <article key={title} className="lead-generation-match-card">
                <div className="lead-generation-match-card-body">
                  <span className="lead-generation-match-card-index">
                    {formatIndex(index)}
                  </span>
                  <h3 className="lead-generation-match-card-title">{title}</h3>
                </div>
              </article>
            ))}
          </div>

          <article className="lead-generation-match-note">
            <p className="lead-generation-match-note-text">
              Tell us what you are looking for, and we will have an honest
              conversation about availability, fit, and next steps. No pressure
              and no inflated promises.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
