import aca from '../assets/campaignsSection/aca.png'
import energy from '../assets/campaignsSection/energy.png'
import home from '../assets/campaignsSection/home.png'
import insurance from '../assets/campaignsSection/insurance.png'
import medicare from '../assets/campaignsSection/medicare.png'
import mva from '../assets/campaignsSection/mva.png'
import { useScrollSlideReveal } from '../hooks/useScrollSlideReveal'
import { AboutTitleMotion } from './AboutTitleMotion'
import { HighlightUnderline } from './HighlightUnderline'
import { CampaignsGridMotion } from './CampaignsGridMotion'

const campaigns = [
  { title: 'ACA Marketplace Plans', image: aca },
  { title: 'Health Insurance', image: insurance },
  { title: 'Final Expense Life Insurance', image: medicare },
  { title: 'Medicaid Guidance', image: mva },
  { title: 'Home & Auto Coverage', image: home },
  { title: 'Business Protection', image: energy },
] as const

export function CampaignsSection() {
  const { ref } = useScrollSlideReveal({
    target: '.home-campaigns-kicker',
    start: '20% bottom',
    end: '70% bottom',
    // Centered watermark: rest at -50/-50, slide in from 10% further left
    xPercent: -60,
    xPercentTo: -50,
    yPercent: -50,
  })

  return (
    <section
      ref={ref}
      className="home-campaigns"
      aria-labelledby="home-campaigns-title"
    >
      <div className="home-campaigns-glow">
        <div className="home-campaigns-inner">
          <div className="home-campaigns-heading">
            <p className="home-campaigns-kicker" aria-hidden="true">
              Focus Areas
            </p>
            <AboutTitleMotion
              className="home-campaigns-title"
              id="home-campaigns-title"
            >
              Coverage That Helps You{' '}
              <HighlightUnderline className="home-campaigns-title-mark">
                Move Forward
              </HighlightUnderline>
            </AboutTitleMotion>
            <span className="home-campaigns-orb" aria-hidden="true" />
          </div>
          <CampaignsGridMotion>
            {campaigns.map((campaign, index) => (
              <article
                key={campaign.title}
                className="home-campaigns-card"
                data-campaigns-row={index < 3 ? 'top' : 'bottom'}
                tabIndex={0}
              >
                <div className="home-campaigns-card-face home-campaigns-card-front">
                  <img
                    className="home-campaigns-card-image"
                    src={campaign.image}
                    alt=""
                  />
                  <h3 className="home-campaigns-card-title">{campaign.title}</h3>
                </div>
                <div
                  className="home-campaigns-card-face home-campaigns-card-back"
                  aria-hidden="true"
                >
                  <img
                    className="home-campaigns-card-image"
                    src={campaign.image}
                    alt=""
                  />
                  <p className="home-campaigns-card-title">{campaign.title}</p>
                </div>
              </article>
            ))}
          </CampaignsGridMotion>
        </div>
      </div>
    </section>
  )
}
