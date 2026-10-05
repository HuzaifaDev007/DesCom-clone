import { PageHero } from '../components/PageHero'
import { QuoteRequestSection } from '../components/QuoteRequestSection'
import '../css/join-us.css'
import '../css/quote.css'

export function QuotePage() {
  return (
    <main className="page">
      <PageHero id="quote" kicker="Quote" title="Get A" titleMark="Quote" />
      <QuoteRequestSection />
    </main>
  )
}
