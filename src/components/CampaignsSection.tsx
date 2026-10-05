import aca from '../assets/campaignsSection/aca.jpg'
import energy from '../assets/campaignsSection/energy.jpg'
import home from '../assets/campaignsSection/home.jpg'
import insurance from '../assets/campaignsSection/insurance.jpg'
import medicare from '../assets/campaignsSection/medicare.jpg'
import mva from '../assets/campaignsSection/mva.jpg'

const campaigns = [
  { title: 'ACA Marketplace Plans', image: aca },
  { title: 'Health Insurance', image: insurance },
  { title: 'Final Expense Life Insurance', image: medicare },
  { title: 'Medicaid Guidance', image: mva },
  { title: 'Home & Auto Coverage', image: home },
  { title: 'Business Protection', image: energy },
] as const

export function CampaignsSection() {
  return (
    <section className="home-campaigns" aria-labelledby="home-campaigns-title">
      <div className="home-campaigns-glow">
        <div className="home-campaigns-inner">
          <div className="home-campaigns-heading">
            <p className="home-campaigns-kicker" aria-hidden="true">
              Focus Areas
            </p>
            <h2 className="home-campaigns-title" id="home-campaigns-title">
              Coverage That Helps You{' '}
              <span className="home-campaigns-title-mark">
                Move Forward
                <svg
                  className="home-campaigns-underline"
                  viewBox="0 115 500 40"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                </svg>
              </span>
            </h2>
            <span className="home-campaigns-orb" aria-hidden="true" />
          </div>
          <div className="home-campaigns-grid">
            {campaigns.map((campaign) => (
              <article key={campaign.title} className="home-campaigns-card">
                <img
                  className="home-campaigns-card-image"
                  src={campaign.image}
                  alt=""
                />
                <h3 className="home-campaigns-card-title">{campaign.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
