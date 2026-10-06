import { useRef } from 'react'
import bpoHover from '../assets/performanceSection/bpo-hover.webp'
import businessHover from '../assets/performanceSection/business-hover.webp'
import callCenterHover from '../assets/performanceSection/call-center-hover.webp'
import officePhoto from '../assets/performanceSection/office.webp'
import outreachHover from '../assets/performanceSection/outreach-hover.webp'
import { AboutTitleMotion } from './AboutTitleMotion'
import { HighlightUnderline } from './HighlightUnderline'
import { usePerformanceHealthCardMotion } from './PerformanceHealthCardMotion'

const services = [
  {
    id: 'performance-card-life',
    title: 'Life Insurance',
    text: 'Protecting your loved ones with secure and reliable coverage.',
    icon: 'headphones',
    image: bpoHover,
    modifier: 'home-performance-card-bpo',
  },
  {
    id: 'performance-card-health',
    title: 'Health Insurance' ,
    text: 'Ensuring your well-being with comprehensive health plans.',
    icon: 'calls',
    image: callCenterHover,
    modifier: 'home-performance-card-calls',
  },
  {
    id: 'performance-card-home',
    title: 'Home, Auto & Business',
    text: 'Coverage for your property, vehicles, and business needs.',
    icon: 'outreach',
    image: outreachHover,
    modifier: 'home-performance-card-outreach',
  },
] as const

const business = {
  id: 'performance-card-leads',
  title: 'Insurance Lead Generation',
  text: 'Connecting agencies and licensed agents with quality consumer interest.',
  icon: 'business',
  image: businessHover,
  modifier: 'home-performance-card-business',
}

function ServiceCard({
  id,
  title,
  text,
  icon,
  image,
  modifier,
}: {
  id: string
  title: string
  text: string
  icon: string
  image: string
  modifier: string
}) {
  return (
    <article id={id} className={`home-performance-card ${modifier}`}>
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
  const sectionRef = useRef<HTMLElement | null>(null)
  usePerformanceHealthCardMotion(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="home-performance"
      aria-labelledby="home-performance-title"
    >
      <div className="home-performance-inner">
        <div className="home-performance-heading">
          <p className="home-performance-kicker" aria-hidden="true">
            Services
          </p>
          <AboutTitleMotion
            className="home-performance-title"
            id="home-performance-title"
          >
            <span className="home-performance-title-line">Comprehensive Coverage</span>
            <HighlightUnderline className="home-performance-title-mark">
              You Can Trust
            </HighlightUnderline>
          </AboutTitleMotion>
        </div>
        <div className="home-performance-grid">
          <div className="home-performance-top">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          <div className="home-performance-bottom">
            <ServiceCard {...business} />
            <div id="performance-photo" className="home-performance-photo">
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
