import teamPhoto from '../assets/servicesFeature/gallery-1.webp'
import { useJoinBenefitsReveal } from '../hooks/useJoinBenefitsReveal'
import { formatIndex } from '../lib/formatIndex'
import { AboutTitleMotion } from './AboutTitleMotion'

const featured = {
  title: 'Competitive Commissions & Recurring Income',
  text: 'Earn top-tier compensation from day one. Build a sustainable business with strong renewal commissions that reward your long-term client relationships.',
}

const benefits = [
  {
    title: 'Top-Tier Carriers',
    text: "Access a diverse portfolio of A-rated insurance carriers to ensure you always have the right product for your clients' needs.",
  },
  {
    title: 'Professional Training',
    text: 'Continuous education, mentorship programs, and sales training to keep you at the top of your game.',
  },
  {
    title: 'Flexible Remote Work',
    text: 'Work from anywhere. We provide the digital infrastructure you need to serve clients nationwide.',
  },
  {
    title: 'Growth & Advancement',
    text: 'Whether you want to be a top personal producer or build your own agency within our framework, we provide clear pathways for career advancement and leadership.',
  },
]

export function JoinBenefitsSection() {
  const { ref } = useJoinBenefitsReveal()

  return (
    <section ref={ref} className="join-us-benefits" aria-labelledby="join-us-benefits-title">
      <div className="join-us-benefits-glow">
        <div className="join-us-benefits-inner">
          <div className="join-us-benefits-intro">
            <div className="join-us-benefits-heading">
              <p className="join-us-benefits-kicker" aria-hidden="true">
                Benefits
              </p>
              <AboutTitleMotion className="join-us-benefits-title" id="join-us-benefits-title">
                <span className="join-us-benefits-title-line">Why Partner</span>
                <span className="join-us-benefits-title-mark">
                  With Us?
                  <svg
                    className="join-us-benefits-underline"
                    viewBox="0 115 500 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                  </svg>
                </span>
              </AboutTitleMotion>
            </div>
            <p className="join-us-benefits-text">
              We invest in our agents because your success is our success.
              Discover the advantages of building your practice here.
            </p>
          </div>

          <div className="join-us-benefits-grid">
            <article className="join-us-benefits-card join-us-benefits-card-featured">
              <div className="join-us-benefits-card-body">
                <img className="join-us-benefits-card-photo" src={teamPhoto} alt="" />
                <span className="join-us-benefits-card-index">{formatIndex(0)}</span>
                <div className="join-us-benefits-card-copy">
                  <h3 className="join-us-benefits-card-title">{featured.title}</h3>
                  <p className="join-us-benefits-card-text">{featured.text}</p>
                </div>
              </div>
            </article>

            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="join-us-benefits-card">
                <div className="join-us-benefits-card-body">
                  <span className="join-us-benefits-card-index">
                    {formatIndex(index + 1)}
                  </span>
                  <div className="join-us-benefits-card-copy">
                    <h3 className="join-us-benefits-card-title">{benefit.title}</h3>
                    <p className="join-us-benefits-card-text">{benefit.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
