import { CareerApplySection } from '../components/CareerApplySection'
import { PageHero } from '../components/PageHero'
import '../css/join-us.css'
import '../css/career.css'

export function CareerPage() {
  return (
    <main className="career">
      <PageHero
        id="career-hero"
        kicker="Career"
        title="Join Our"
        titleMark="Team"
        ctaLabel="Apply Now"
        ctaHref="#apply"
      />
      <CareerApplySection />
    </main>
  )
}
