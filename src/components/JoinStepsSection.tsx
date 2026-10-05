import type { ReactNode } from 'react'
import { formatIndex } from '../lib/formatIndex'

type Step = {
  title: string
  text: string
}

const defaultSteps: Step[] = [
  {
    title: 'Submit Application',
    text: 'Fill out the form below with your details and experience. Our recruitment team reviews applications daily.',
  },
  {
    title: 'Discovery Call',
    text: "If there's a mutual fit, we'll schedule a brief call to discuss your goals, our platform, and answer your questions.",
  },
  {
    title: 'Onboarding & Contracting',
    text: 'Complete carrier contracting, gain access to our proprietary tools, and begin your specialized training.',
  },
]

type JoinStepsSectionProps = {
  id?: string
  kicker?: string
  title?: string
  titleMark?: string
  steps?: Step[]
  children?: ReactNode
}

export function JoinStepsSection({
  id = 'join-us-steps-title',
  kicker = 'Process',
  title = 'Your Path To',
  titleMark = 'Partnership',
  steps = defaultSteps,
  children,
}: JoinStepsSectionProps) {
  return (
    <section className="join-us-steps" aria-labelledby={id}>
      <div className="join-us-steps-inner">
        <div className="join-us-steps-heading">
          <p className="join-us-steps-kicker" aria-hidden="true">
            {kicker}
          </p>
          <h2 className="join-us-steps-title" id={id}>
            <span className="join-us-steps-title-line">{title}</span>
            <span className="join-us-steps-title-mark">
              {titleMark}
              <svg
                className="join-us-steps-underline"
                viewBox="0 115 500 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
              </svg>
            </span>
          </h2>
        </div>

        <ol className="join-us-steps-list">
          {steps.map((step, index) => (
            <li key={step.title} className="join-us-steps-item">
              <span className="join-us-steps-number">{formatIndex(index)}</span>
              <div className="join-us-steps-copy">
                <h3 className="join-us-steps-item-title">{step.title}</h3>
                <p className="join-us-steps-item-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {children}
      </div>
    </section>
  )
}
