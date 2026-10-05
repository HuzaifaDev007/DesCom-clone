import { FaqSection } from '../components/FaqSection'
import { JoinStepsSection } from '../components/JoinStepsSection'
import { LeadInquirySection } from '../components/LeadInquirySection'
import { LeadMatchSection } from '../components/LeadMatchSection'
import { PageHero } from '../components/PageHero'
import '../css/join-us.css'
import '../css/lead-generation.css'

const leadSteps = [
  {
    title: 'Initial Inquiry',
    text: 'Submit the form below or give us a call. Tell us a little about your agency, your licenses, and what you are looking for.',
  },
  {
    title: 'Lead Type & Target States',
    text: 'We will discuss the lead categories you are interested in, the states you are licensed in, and the volume you are hoping to work with.',
  },
  {
    title: 'Next Steps',
    text: 'If there is a fit, we will outline current availability, pricing, and onboarding so you can decide how you would like to proceed.',
  },
]

const leadFaqs = [
  {
    question: 'Who are your lead generation services for?',
    answer:
      'We work with insurance agencies and licensed insurance agents who want to connect with consumers actively looking for coverage. If you are licensed and ready to talk with prospects, we would be glad to discuss your needs.',
  },
  {
    question: 'Which states do you generate leads in?',
    answer:
      'Availability varies by lead category and over time. During our initial discussion, tell us the states you are licensed in and targeting, and we will let you know what is currently available.',
  },
  {
    question: 'Do you guarantee a specific number of leads?',
    answer:
      'No. We do not promise specific lead volumes or outcomes. We will discuss your expected volume and current availability before you commit to anything, so you can make an informed decision.',
  },
  {
    question: 'Are your leads exclusive?',
    answer:
      'Lead arrangements vary by category and program. We will explain exactly how leads are delivered for the options you are considering during our discussion — before you make any commitment.',
  },
  {
    question: 'Is Unified Risk Solutions a government agency?',
    answer:
      'No. Unified Risk Solutions is a private insurance agency and is not affiliated with any government agency. We do not sell Medicaid coverage — our Medicaid-related leads are consumers seeking information and guidance about their coverage options.',
  },
]

export function LeadGenerationPage() {
  return (
    <main className="page">
      <PageHero
        id="lead-generation"
        kicker="Leads"
        title="Insurance Lead"
        titleMark="Generation"
      />
      <LeadMatchSection />
      <JoinStepsSection
        id="lead-generation-steps-title"
        kicker="Process"
        title="How It"
        titleMark="Works"
        steps={leadSteps}
      >
        <div className="lead-generation-steps-actions">
          <a className="lead-generation-steps-cta" href="#lead-form">
            Discuss Your Lead Needs
            <svg
              className="lead-generation-steps-cta-icon"
              viewBox="0 0 15 15"
              aria-hidden="true"
            >
              <path
                d="M1.5 7.5h12M9 3.5l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </JoinStepsSection>
      <LeadInquirySection />
      <FaqSection
        id="lead-generation-faq"
        kicker="FAQ"
        title="Frequently Asked"
        titleMark="Questions"
        items={leadFaqs}
      />
    </main>
  )
}
