import featuredConvert from '../assets/servicesFeature/DSC06679.webp'
import galleryConvert1 from '../assets/servicesFeature/DSC00316.webp'
import galleryConvert2 from '../assets/servicesFeature/DSC06822.webp'
import galleryConvert3 from '../assets/servicesFeature/DSC07039.webp'
import featuredInnovate from '../assets/servicesFeature/4.webp'
import galleryInnovate1 from '../assets/servicesFeature/1.webp'
import galleryInnovate2 from '../assets/servicesFeature/2.webp'
import galleryInnovate3 from '../assets/servicesFeature/3.webp'
import featuredSupport from '../assets/servicesFeature/featured-support.webp'
import gallery1 from '../assets/servicesFeature/gallery-1.webp'
import gallery2 from '../assets/servicesFeature/gallery-2.webp'
import gallery3 from '../assets/servicesFeature/gallery-3.webp'
import { CampaignsSection } from '../components/CampaignsSection'
import { GrowSection } from '../components/GrowSection'
import { ServiceFeature } from '../components/ServiceFeature'
import { ServicesHero } from '../components/ServicesHero'
import '../css/home.css'
import '../css/services.css'

export function ServicesPage() {
  return (
    <main className="services">
      <ServicesHero />

      <ServiceFeature
        watermark="Protect"
        title="Life"
        titleMark="Insurance"
        description="Protecting your loved ones with secure and reliable coverage. Life insurance provides a crucial financial safety net for your family in the event of the unexpected. At DesCom, we help you choose the right plan with clear guidance and coverage tailored to your goals."
        features={[
          'Term Life Coverage',
          'Whole Life Policies',
          'Final Expense Insurance',
          'Wealth Transfer Strategies',
        ]}
        featuredImage={{
          src: featuredSupport,
          alt: 'DesCom advisor helping a client review life coverage options',
        }}
        galleryImages={[
          {
            src: gallery1,
            alt: 'DesCom teammates collaborating over a laptop',
          },
          {
            src: gallery2,
            alt: 'DesCom advisor wearing a headset in the office',
          },
          {
            src: gallery3,
            alt: 'DesCom team working together in the office',
          },
        ]}
      />

      <ServiceFeature
        reversed
        watermark="Care"
        title="Health"
        titleMark="Insurance"
        description="Ensuring your well-being with comprehensive health plans. Navigate the complexities of healthcare with policies designed to cover medical expenses and preventive care. DesCom guides you through the options so you can choose coverage that fits your life."
        features={[
          'Individual & Family Plans',
          'Medicare Supplements',
          'Dental & Vision Coverage',
          'Disability Insurance',
        ]}
        featuredImage={{
          src: featuredInnovate,
          alt: 'DesCom team collaborating in a modern office',
        }}
        galleryImages={[
          {
            src: galleryInnovate1,
            alt: 'DesCom advisors working together at a shared desk',
          },
          {
            src: galleryInnovate2,
            alt: 'DesCom teammates reviewing work on a laptop',
          },
          {
            src: galleryInnovate3,
            alt: 'DesCom team members in a discussion',
          },
        ]}
      />

      <ServiceFeature
        watermark="Secure"
        title="Home, Auto &"
        titleMark="Business"
        description="Coverage for your property, vehicles, and business needs. Safeguard your most valuable physical assets and protect your enterprise from unforeseen liabilities. DesCom helps you build practical protection for home, auto, and commercial risks."
        features={[
          'Homeowners & Renters',
          'Auto & Recreational Vehicles',
          'Commercial Liability',
          'Workers Compensation',
        ]}
        featuredImage={{
          src: featuredConvert,
          alt: 'DesCom team collaborating around a laptop',
        }}
        galleryImages={[
          {
            src: galleryConvert1,
            alt: 'DesCom advisors in a training session',
          },
          {
            src: galleryConvert2,
            alt: 'DesCom teammates working side by side',
          },
          {
            src: galleryConvert3,
            alt: 'DesCom team meeting in the office',
          },
        ]}
      />

      <CampaignsSection />
      <GrowSection />
    </main>
  )
}
