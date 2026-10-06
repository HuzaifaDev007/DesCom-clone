import { useScrollSlideReveal } from '../hooks/useScrollSlideReveal'
import { HighlightUnderline } from './HighlightUnderline'
import { TrustedCardsMotion } from './TrustedCardsMotion'

const stats = [
  { value: 'Life', label: 'Secure Family Protection', enter: 'bottom' },
  { value: 'Health', label: 'Coverage Built Around You', enter: 'top' },
  { value: '8+', label: 'Trusted Carrier Partners', enter: 'bottom' },
  { value: '100%', label: 'Personalized Plan Focus', enter: undefined },
] as const

export function TrustedSection() {
  const { ref } = useScrollSlideReveal({
    target: '.home-trusted-kicker',
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
      className="home-trusted"
      aria-labelledby="home-trusted-title"
    >
      <div className="home-trusted-glow">
        <div className="home-trusted-inner">
          <div className="home-trusted-intro">
            <div className="home-trusted-heading">
              <p className="home-trusted-kicker" aria-hidden="true">
                Why Us
              </p>
              <h2 className="home-trusted-title" id="home-trusted-title">
                <span className="home-trusted-title-line">Trusted By Families.</span>
                <HighlightUnderline className="home-trusted-title-mark">
                  Powered By Expertise.
                </HighlightUnderline>
              </h2>
            </div>
            <p className="home-trusted-text">
              Experienced advisors, personalized plans, and superior support —
              so you can protect what matters with confidence.
            </p>
          </div>
          <TrustedCardsMotion>
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="home-trusted-card"
                data-trusted-enter={stat.enter}
              >
                <div className="home-trusted-card-body">
                  <h3 className="home-trusted-card-label">{stat.label}</h3>
                  <p className="home-trusted-card-value">{stat.value}</p>
                </div>
              </article>
            ))}
          </TrustedCardsMotion>
        </div>
      </div>
    </section>
  )
}
