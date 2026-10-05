import { AboutSection } from '../components/AboutSection'
import { CampaignsSection } from '../components/CampaignsSection'
import { GrowSection } from '../components/GrowSection'
import { Hero } from '../components/Hero'
import { PerformanceSection } from '../components/PerformanceSection'
import { TrustedSection } from '../components/TrustedSection'
import '../css/home.css'

export function HomePage() {
  return (
    <main className="home">
      <Hero />
      <AboutSection />
      <PerformanceSection />
      <TrustedSection />
      <CampaignsSection />
      <GrowSection />
    </main>
  )
}
