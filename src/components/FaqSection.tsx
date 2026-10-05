type FaqItem = {
  question: string
  answer: string
}

type FaqSectionProps = {
  id: string
  kicker: string
  title: string
  titleMark: string
  items: FaqItem[]
}

export function FaqSection({ id, kicker, title, titleMark, items }: FaqSectionProps) {
  const titleId = `${id}-title`

  return (
    <section className="faq-section" aria-labelledby={titleId}>
      <div className="faq-section-inner">
        <div className="faq-section-heading">
          <p className="faq-section-kicker" aria-hidden="true">
            {kicker}
          </p>
          <h2 className="faq-section-title" id={titleId}>
            <span className="faq-section-title-line">{title}</span>
            <span className="faq-section-title-mark">
              {titleMark}
              <svg
                className="faq-section-underline"
                viewBox="0 115 500 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="faq-section-list">
          {items.map((item) => (
            <details key={item.question} className="faq-section-item">
              <summary className="faq-section-question">
                <span className="faq-section-question-text">{item.question}</span>
                <span className="faq-section-icon" aria-hidden="true" />
              </summary>
              <p className="faq-section-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
