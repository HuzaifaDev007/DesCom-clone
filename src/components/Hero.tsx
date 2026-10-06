import marsVideo from '../assets/marsvideo.mp4'
import { useHeroTextReveal } from '../hooks/useHeroTextReveal'

export function Hero() {
  const { ref } = useHeroTextReveal()

  return (
    <section ref={ref} className="home-hero" aria-label="DesCom">
      <div className="home-hero-planet" aria-hidden="true">
        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={marsVideo} type="video/mp4" />
        </video>
      </div>
      <div className="home-hero-copy">
        <div className="home-hero-title-mask">
          <h1 className="home-hero-title">
            <span className="home-hero-title-text">DesCom</span>
          </h1>
        </div>
        <div className="home-hero-tagline-mask">
          <p className="home-hero-tagline">
            Protecting Your Future,
            <br />
            Securing Your Peace of Mind
          </p>
        </div>
      </div>
    </section>
  )
}
