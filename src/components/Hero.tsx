import marsVideo from '../assets/marsvideo.mp4'
import { useHeroTextReveal } from '../hooks/useHeroTextReveal'

export function Hero() {
  const { ref } = useHeroTextReveal()

  return (
    <section ref={ref} className="home-hero" aria-label="DesCom">
      <video
        className="home-hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={marsVideo} type="video/mp4" />
      </video>
      <div className="home-hero-copy">
        <h1 className="home-hero-title">
          <span className="home-hero-title-text">DesCom</span>
        </h1>
        <p className="home-hero-tagline">
          Protecting Your Future,
          <br />
          Securing Your Peace of Mind
        </p>
      </div>
    </section>
  )
}
