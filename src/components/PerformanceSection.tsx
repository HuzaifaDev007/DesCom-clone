import bpoHover from '../assets/performanceSection/bpo-hover.webp'
import businessHover from '../assets/performanceSection/business-hover.webp'
import callCenterHover from '../assets/performanceSection/call-center-hover.webp'
import officePhoto from '../assets/performanceSection/office.webp'
import outreachHover from '../assets/performanceSection/outreach-hover.webp'

const services = [
  {
    title: 'Life Insurance',
    text: 'Protecting your loved ones with secure and reliable coverage.',
    icon: 'headphones',
    image: bpoHover,
    modifier: 'home-performance-card-bpo',
  },
  {
    title: 'Health Insurance',
    text: 'Ensuring your well-being with comprehensive health plans.',
    icon: 'calls',
    image: callCenterHover,
    modifier: 'home-performance-card-calls',
  },
  {
    title: 'Home, Auto & Business',
    text: 'Coverage for your property, vehicles, and business needs.',
    icon: 'outreach',
    image: outreachHover,
    modifier: 'home-performance-card-outreach',
  },
] as const

const business = {
  title: 'Insurance Lead Generation',
  text: 'Connecting agencies and licensed agents with quality consumer interest.',
  icon: 'business',
  image: businessHover,
  modifier: 'home-performance-card-business',
}

function ServiceCard({
  title,
  text,
  icon,
  image,
  modifier,
}: {
  title: string
  text: string
  icon: string
  image: string
  modifier: string
}) {
  return (
    <article className={`home-performance-card ${modifier}`}>
      <div className="home-performance-card-body">
        <img className="home-performance-card-photo" src={image} alt="" />
        <div className="home-performance-card-copy">
          <span
            className={`home-performance-icon home-performance-icon-${icon}`}
            aria-hidden="true"
          />
          <h3 className="home-performance-card-title">{title}</h3>
          <p className="home-performance-card-text">{text}</p>
        </div>
      </div>
    </article>
  )
}

export function PerformanceSection() {
  return (
    <section className="home-performance" aria-labelledby="home-performance-title">
      <div className="home-performance-inner">
        <div className="home-performance-heading">
          <p className="home-performance-kicker" aria-hidden="true">
            Services
          </p>
          <h2 className="home-performance-title" id="home-performance-title">
            <span className="home-performance-title-line">Comprehensive Coverage</span>
            <span className="home-performance-title-mark">
              You Can Trust
              <svg
                className="home-performance-underline"
                viewBox="0 115 500 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
              </svg>
            </span>
          </h2>
        </div>
        <div className="home-performance-grid">
          <div className="home-performance-top">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="home-performance-bottom">
            <ServiceCard {...business} />
            <div className="home-performance-photo">
              <img
                className="home-performance-photo-image"
                src={officePhoto}
                alt="DesCom team working at desks in the office"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
