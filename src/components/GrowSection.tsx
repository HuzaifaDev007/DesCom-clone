import { Link } from 'react-router'
import officePhoto from '../assets/growSection/office.webp'
import torus from '../assets/growSection/torus.png'

export function GrowSection() {
  return (
    <section className="home-grow" aria-labelledby="home-grow-title">
      <div className="home-grow-glow">
        <div className="home-grow-inner">
          <div className="home-grow-stage">
            <div className="home-grow-frame">
              <div className="home-grow-card">
                <img
                  className="home-grow-photo"
                  src={officePhoto}
                  alt="DesCom advisors collaborating in the office"
                />
                <div className="home-grow-copy">
                  <h2 className="home-grow-title" id="home-grow-title">
                    <span className="home-grow-title-line">
                      Let Us Help You Find
                    </span>
                    <span className="home-grow-title-mark">
                      The Right Coverage.
                      <svg
                        className="home-grow-underline"
                        viewBox="0 115 500 40"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
                      </svg>
                    </span>
                  </h2>
                  <p className="home-grow-text">
                    Expert solutions, personal service, and peace of mind —
                    whether you need coverage for your family or want to grow
                    with our agency partners.
                  </p>
                  <Link className="home-grow-cta" to="/quote">
                    Get a Free Quote
                    <svg
                      className="home-grow-cta-icon"
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
                  </Link>
                </div>
              </div>
            </div>
            <img className="home-grow-ring" src={torus} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
