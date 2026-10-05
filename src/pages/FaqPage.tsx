import { FaqSection } from '../components/FaqSection'
import { PageHero } from '../components/PageHero'

const faqCategories = [
  {
    id: 'faq-general-insurance',
    kicker: 'General',
    title: 'General',
    titleMark: 'Insurance',
    items: [
      {
        question: 'How do I file a claim with Unified Risk Solutions?',
        answer:
          'You can file a claim 24/7 through our online portal, by calling our dedicated claims hotline at 848-256-9995, or by contacting your personal agent directly. We recommend having your policy number and incident details ready to expedite the process.',
      },
      {
        question: 'How can I update my policy information or coverage limits?',
        answer:
          'Policy updates can be requested through your online account dashboard or by speaking with your agent. Most changes, such as updating an address or adjusting coverage limits, can be processed within one business day.',
      },
      {
        question: 'What payment methods do you accept for premiums?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), electronic bank transfers (ACH), and traditional paper checks. You can also set up automatic monthly deductions for convenience and to avoid missed payments.',
      },
      {
        question: 'What is your policy cancellation process?',
        answer:
          'To cancel a policy, we require a written request signed by the primary policyholder. You can submit this via email or mail. Depending on the policy type and billing cycle, you may be entitled to a prorated refund of unused premiums.',
      },
      {
        question: 'How quickly can I get proof of insurance?',
        answer:
          'Digital proof of insurance (ID cards and declaration pages) is available immediately through our mobile app and online portal. We can also email or fax certificates of insurance to third parties upon your request within minutes.',
      },
    ],
  },
  {
    id: 'faq-life-insurance',
    kicker: 'Life',
    title: 'Life',
    titleMark: 'Insurance',
    items: [
      {
        question: 'What is the difference between term and whole life insurance?',
        answer:
          'Term life insurance provides coverage for a specific period (e.g., 10, 20, or 30 years) and is generally more affordable. Whole life insurance provides permanent coverage for your entire lifetime and includes a cash value component that grows over time.',
      },
      {
        question: 'Do I need to take a medical exam to get life insurance?',
        answer:
          "It depends on the policy type and coverage amount. We offer 'no-exam' or simplified issue policies that only require a health questionnaire. However, traditional policies with higher coverage limits typically require a brief paramedical exam.",
      },
      {
        question: 'How much life insurance coverage do I actually need?',
        answer:
          "A general rule of thumb is 10-15 times your annual income. However, your specific needs depend on factors like your mortgage balance, outstanding debts, children's future education costs, and your spouse's income. Our advisors can help you calculate the exact amount.",
      },
      {
        question: 'Can I change my beneficiaries after the policy is active?',
        answer:
          'Yes, you can update your beneficiaries at any time, free of charge. Simply log into your account or contact your agent to complete a change of beneficiary form. We recommend reviewing your beneficiaries after major life events like marriage, divorce, or the birth of a child.',
      },
      {
        question: 'Are life insurance payouts taxable to my beneficiaries?',
        answer:
          'In most cases, life insurance death benefits are paid out to beneficiaries completely income-tax-free. However, if your estate is very large, the payout could be subject to estate taxes. We recommend consulting with a tax professional for specific guidance.',
      },
    ],
  },
  {
    id: 'faq-health-insurance',
    kicker: 'Health',
    title: 'Health',
    titleMark: 'Insurance',
    items: [
      {
        question: 'What is the difference between an HMO and a PPO network?',
        answer:
          'An HMO (Health Maintenance Organization) requires you to use doctors within their network and get referrals from a primary care physician to see specialists. A PPO (Preferred Provider Organization) offers more flexibility, allowing you to see out-of-network providers and specialists without referrals, though usually at a higher out-of-pocket cost.',
      },
      {
        question: 'How do deductibles, copays, and premiums work together?',
        answer:
          'Your premium is the monthly cost to keep the insurance active. A deductible is the amount you pay out-of-pocket before insurance kicks in. A copay is a fixed fee you pay for specific services (like a $30 doctor visit) regardless of your deductible status.',
      },
      {
        question: 'Are pre-existing conditions covered under your health plans?',
        answer:
          'Yes. Under the Affordable Care Act (ACA), all comprehensive health insurance plans we offer must cover pre-existing conditions without charging you more or denying coverage based on your health history.',
      },
      {
        question: "What does 'out-of-pocket maximum' mean?",
        answer:
          'The out-of-pocket maximum is the absolute most you will have to pay for covered medical services in a single year. Once you hit this limit through deductibles, copays, and coinsurance, your health plan pays 100% of covered benefits for the rest of the year.',
      },
      {
        question: 'Does health insurance cover dental and vision care?',
        answer:
          'Standard health insurance plans for adults typically do not include comprehensive dental and vision coverage. However, we offer affordable standalone dental and vision policies that can be bundled with your health insurance.',
      },
    ],
  },
  {
    id: 'faq-home-insurance',
    kicker: 'Home',
    title: 'Home',
    titleMark: 'Insurance',
    items: [
      {
        question: 'What does a standard homeowners insurance policy cover?',
        answer:
          "A standard policy covers your home's structure, your personal belongings, liability protection (if someone is injured on your property), and additional living expenses if your home becomes temporarily uninhabitable due to a covered peril like fire or windstorm.",
      },
      {
        question: 'Is flood or earthquake damage covered by standard home insurance?',
        answer:
          'No. Standard homeowners policies specifically exclude damage from floods and earthquakes. You must purchase separate flood insurance (often through the National Flood Insurance Program) or an earthquake endorsement to be protected against these events.',
      },
      {
        question: 'How is the replacement cost of my home calculated?',
        answer:
          "Replacement cost is calculated based on what it would cost to rebuild your home from the ground up using similar materials at today's labor rates. It is not based on your home's current real estate market value or the land value.",
      },
      {
        question: 'Are my expensive jewelry and electronics fully covered?',
        answer:
          "Standard policies have sub-limits for high-value items (e.g., a $1,500 limit for stolen jewelry). To fully protect expensive items like engagement rings, fine art, or high-end electronics, you should add a 'scheduled personal property' endorsement to your policy.",
      },
      {
        question: 'Will my home insurance cover a dog bite incident?',
        answer:
          'Generally, yes. The liability portion of your homeowners policy typically covers dog bites, both on and off your property. However, some policies exclude certain dog breeds with a history of aggression. Please check with your agent regarding your specific breed.',
      },
    ],
  },
  {
    id: 'faq-auto-insurance',
    kicker: 'Auto',
    title: 'Auto',
    titleMark: 'Insurance',
    items: [
      {
        question: 'What is the difference between comprehensive and collision coverage?',
        answer:
          'Collision covers damage to your car from an accident with another vehicle or object. Comprehensive covers damage from non-collision events, such as theft, vandalism, fire, falling objects, or hitting an animal.',
      },
      {
        question: 'Does my auto insurance cover me when I drive a rental car?',
        answer:
          "In most cases, the coverage limits and deductibles on your personal auto policy extend to a rental car used for personal travel within the US and Canada. However, it does not cover 'loss of use' fees charged by the rental company. Check your specific policy before declining rental counter coverage.",
      },
      {
        question: 'What is uninsured/underinsured motorist coverage?',
        answer:
          "This coverage protects you if you are in an accident caused by a driver who either has no insurance or doesn't have enough insurance to cover your medical bills and vehicle damage. It is highly recommended and required in some states.",
      },
      {
        question: 'How do speeding tickets or accidents affect my premium?',
        answer:
          "Moving violations and at-fault accidents generally increase your risk profile, which can lead to higher premiums at your next renewal. The impact varies based on the severity of the incident and your prior driving history. Some policies include 'accident forgiveness' for your first offense.",
      },
      {
        question: 'Is someone else covered if they drive my car?',
        answer:
          'Yes, auto insurance generally follows the car, not the driver. If you give a friend or family member permission to drive your vehicle, your insurance will typically be the primary coverage in the event of an accident.',
      },
    ],
  },
  {
    id: 'faq-business-insurance',
    kicker: 'Business',
    title: 'Business',
    titleMark: 'Insurance',
    items: [
      {
        question: 'What is the difference between General Liability and Professional Liability?',
        answer:
          'General Liability covers physical risks like bodily injury or property damage to a third party (e.g., a customer slipping in your store). Professional Liability (Errors & Omissions) covers financial losses resulting from mistakes, negligence, or failure to deliver promised services.',
      },
      {
        question: "Is Workers' Compensation insurance legally required?",
        answer:
          "In almost all states, if you have employees (even just one), you are legally required to carry Workers' Compensation insurance. It covers medical costs and lost wages for employees who are injured or become ill on the job.",
      },
      {
        question: 'What does Cyber Liability insurance cover?',
        answer:
          'Cyber Liability protects your business against data breaches and cyberattacks. It covers costs associated with notifying affected customers, credit monitoring services, legal fees, regulatory fines, and recovering compromised data.',
      },
      {
        question: 'How does Business Interruption insurance work?',
        answer:
          'If a covered peril (like a fire) forces you to temporarily close your business, Business Interruption insurance helps replace lost net income and covers ongoing expenses like rent and payroll while you rebuild.',
      },
      {
        question: 'How quickly can I get a Certificate of Insurance (COI) for a client?',
        answer:
          'We understand that COIs are critical for securing contracts. Active commercial clients can generate standard COIs instantly through our online portal, or request custom certificates from their agent, which are typically processed within 2-4 business hours.',
      },
    ],
  },
]

export function FaqPage() {
  return (
    <main className="page">
      <PageHero
        id="faq"
        kicker="FAQ"
        title="Frequently Asked"
        titleMark="Questions"
      />
      {faqCategories.map((category) => (
        <FaqSection key={category.id} {...category} />
      ))}
    </main>
  )
}
