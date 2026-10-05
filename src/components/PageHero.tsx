import torus from '../assets/footer-torus.png'

type PageHeroProps = {
  id: string
  kicker: string
  title: string
  titleMark: string
}

export function PageHero({ id, kicker, title, titleMark }: PageHeroProps) {
  const titleId = `${id}-title`

  return (
    <section className="page-hero" aria-labelledby={titleId}>
      <img className="page-hero-ring" src={torus} alt="" aria-hidden="true" />
      <span className="page-hero-orb page-hero-orb-a" aria-hidden="true" />
      <span className="page-hero-orb page-hero-orb-b" aria-hidden="true" />
      <span className="page-hero-line" aria-hidden="true" />

      <div className="page-hero-inner">
        <p className="page-hero-kicker">{kicker}</p>
        <h1 className="page-hero-title" id={titleId}>
          <span className="page-hero-title-line">{title}</span>{' '}
          <span className="page-hero-title-mark">
            {titleMark}
            <svg
              className="page-hero-underline"
              viewBox="0 115 500 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
            </svg>
          </span>
        </h1>
      </div>
    </section>
  )
}
