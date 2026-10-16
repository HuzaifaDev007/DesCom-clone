// import EarthHero from './EarthHero'
import EarthHeroUpdated from './EarthHeroUpdated'
import { useHeroTextReveal } from '../hooks/useHeroTextReveal'
import { isStaticScreenshotMode } from '../lib/enableStaticScreenshotMode'

export function Hero() {
  const { ref } = useHeroTextReveal()
  const staticShot = isStaticScreenshotMode()

  return (
    <section ref={ref} className="home-hero" aria-label="DesCom">
      <div className="home-hero-planet" aria-hidden="true">
        {/* <EarthHero className="home-hero-earth" speed={staticShot ? 0 : 1} /> */}
        <EarthHeroUpdated
          className="home-hero-earth"
          speed={staticShot ? 0 : 1}
          textureUrl="/textures/earth-day.jpg"
        />
      </div>
      <div className="home-hero-copy">
        <div className="home-hero-title-mask">
          <h1 className="home-hero-title">
            <span className="home-hero-title-text">DesCom</span>
          </h1>
        </div>
        <div className="home-hero-tagline-mask">
          <p className="home-hero-tagline">
            <span className="home-hero-tagline-white">Protecting Your Future,</span>
            <br />
            <span className="home-hero-tagline-blue">Securing Your </span>
            <span className="home-hero-tagline-gold">Peace of Mind</span>
          </p>
        </div>
      </div>
    </section>
  )
}
