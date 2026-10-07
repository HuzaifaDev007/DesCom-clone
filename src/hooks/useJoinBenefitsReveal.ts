import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { drawUnderlineOnEnter, riseOnEnter, scrubIntoPlace } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Benefits grid — Performance section vocabulary: centered scrubbed watermark,
 * featured card enters from the left like the leads card, the rest settle up
 * like the Trusted cards. Tablet/mobile cards rise in as a batch.
 */
export function useJoinBenefitsReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const heading = section.querySelector('.join-us-benefits-heading')
      const kicker = section.querySelector('.join-us-benefits-kicker')
      const underline = section.querySelector('.join-us-benefits-underline path')
      const text = section.querySelector('.join-us-benefits-text')
      const featured = section.querySelector('.join-us-benefits-card-featured')
      const cards = gsap.utils.toArray<HTMLElement>(
        '.join-us-benefits-card:not(.join-us-benefits-card-featured)',
        section,
      )
      const allCards = gsap.utils.toArray<HTMLElement>('.join-us-benefits-card', section)

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
        if (text) riseOnEnter(text)
      })

      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        if (featured) scrubIntoPlace(featured, { xPercent: -10 })
        cards.forEach((card) => scrubIntoPlace(card, { yPercent: 10 }))
      })

      mm.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(allCards, { y: 36, autoAlpha: 0 })
        ScrollTrigger.batch(allCards, {
          start: 'top 90%',
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
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
