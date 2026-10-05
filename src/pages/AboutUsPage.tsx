import { CompanyOverviewSection } from '../components/CompanyOverviewSection'
import { PageHero } from '../components/PageHero'
import '../css/about-us.css'

export function AboutUsPage() {
  return (
    <main className="page">
      <PageHero id="about-us" kicker="About" title="About" titleMark="Us" />
      <CompanyOverviewSection />
    </main>
  )
}
