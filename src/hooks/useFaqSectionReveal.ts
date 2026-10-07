import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { drawUnderlineOnEnter } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * FAQ list — centered scrubbed watermark, underline draw, and accordion items
 * rising in as a staggered batch. Items keep their final layout so toggling
 * an answer never fights a running tween.
 */
export function useFaqSectionReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const heading = section.querySelector('.faq-section-heading')
      const kicker = section.querySelector('.faq-section-kicker')
      const underline = section.querySelector('.faq-section-underline path')
      const items = gsap.utils.toArray<HTMLElement>('.faq-section-item', section)

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (kicker && heading) {
          createScrollSlideReveal({
            trigger: heading,
            targets: kicker,
            start: 'top bottom',
            end: 'bottom top',
            xPercent: -60,
            xPercentTo: -50,
            yPercent: -50,
          })
        }
        if (underline && heading) drawUnderlineOnEnter(underline, heading)

        if (items.length) {
          gsap.set(items, { y: 36, autoAlpha: 0 })
          ScrollTrigger.batch(items, {
            start: 'top 92%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                stagger: 0.1,
                ease: 'power2.out',
                overwrite: 'auto',
              }),
          })
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
