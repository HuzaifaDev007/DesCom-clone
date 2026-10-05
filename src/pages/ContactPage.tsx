import { ContactSection } from '../components/ContactSection'
import { PageHero } from '../components/PageHero'
import '../css/join-us.css'
import '../css/lead-generation.css'
import '../css/contact-us.css'

export function ContactPage() {
  return (
    <main className="page">
      <PageHero id="contact-us" kicker="Contact" title="Contact" titleMark="Us" />
      <ContactSection />
    </main>
  )
}
