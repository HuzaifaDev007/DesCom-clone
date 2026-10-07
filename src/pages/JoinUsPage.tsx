import { JoinApplySection } from '../components/JoinApplySection'
import { JoinBenefitsSection } from '../components/JoinBenefitsSection'
import { JoinCriteriaSection } from '../components/JoinCriteriaSection'
import { JoinStepsSection } from '../components/JoinStepsSection'
import { PageHero } from '../components/PageHero'
import '../css/join-us.css'

export function JoinUsPage() {
  return (
    <main className="join-us">
      <PageHero
        id="join-us-hero"
        kicker="Join Our Agency"
        title="Build Your Career"
        titleMark="With DesCom"
        ctaLabel="Apply Now"
        ctaHref="#apply"
      />
      <JoinBenefitsSection />
      <JoinCriteriaSection />
      <JoinStepsSection />
      <JoinApplySection />
    </main>
  )
}
