import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import torus from '../assets/footer-torus.png'
import { useServiceFeatureReveal } from '../hooks/useServiceFeatureReveal'
import { AboutTitleMotion } from './AboutTitleMotion'
import 'swiper/css'
import 'swiper/css/pagination'

export type ServiceFeatureImage = {
  src: string
  alt: string
}

export type ServiceFeatureProps = {
  watermark: string
  title: string
  titleMark: string
  description: string
  features: string[]
  featuredImage: ServiceFeatureImage
  galleryImages: ServiceFeatureImage[]
  /** When true, copy sits left and media sits right on desktop. */
  reversed?: boolean
}

export function ServiceFeature({
  watermark,
  title,
  titleMark,
  description,
  features,
  featuredImage,
  galleryImages,
  reversed = false,
}: ServiceFeatureProps) {
  const titleId = `service-feature-${watermark.toLowerCase().replace(/\s+/g, '-')}-title`
  const { ref } = useServiceFeatureReveal(reversed)

  return (
    <section
      ref={ref}
      className={reversed ? 'service-feature service-feature-reversed' : 'service-feature'}
      aria-labelledby={titleId}
    >
      <div className="service-feature-inner">
        <div className="service-feature-media">
          <div className="service-feature-featured">
            <div className="service-feature-featured-frame">
              <img
                className="service-feature-featured-image"
                src={featuredImage.src}
                alt={featuredImage.alt}
              />
            </div>
          </div>

          <div className="service-feature-gallery-wrap">
            <img
              className="service-feature-ring"
              src={torus}
              alt=""
              aria-hidden="true"
            />
            <div className="service-feature-gallery">
              <Swiper
                className="service-feature-swiper"
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={15}
                pagination={{ clickable: true }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                }}
                aria-label="Image gallery"
              >
                {galleryImages.map((image) => (
                  <SwiperSlide key={image.src} className="service-feature-gallery-slide">
                    <img
                      className="service-feature-gallery-image"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="service-feature-copy">
          <p className="service-feature-watermark" aria-hidden="true">
            {watermark}
          </p>
          <AboutTitleMotion className="service-feature-title" id={titleId}>
            <span className="service-feature-title-plain">{title} </span>
            <span className="service-feature-title-mark">
              {titleMark}
              <svg
                className="service-feature-underline"
                viewBox="0 115 500 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.8-197.1,9" />
              </svg>
            </span>
          </AboutTitleMotion>
          <p className="service-feature-text">{description}</p>
          <ul className="service-feature-list">
            {features.map((feature) => (
              <li key={feature} className="service-feature-item">
                <svg
                  className="service-feature-check"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
