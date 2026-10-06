import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createScrollSlideReveal } from '../hooks/useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Performance section scroll motion.
 * Call from PerformanceSection (same component that owns sectionRef).
 */
export function usePerformanceHealthCardMotion(
  sectionRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const heading = section.querySelector<HTMLElement>(
        '.home-performance-heading',
      )
      const kicker = section.querySelector<HTMLElement>(
        '.home-performance-kicker',
      )
      const healthCard = section.querySelector<HTMLElement>(
        '#performance-card-health',
      )
      const leadsCard = section.querySelector<HTMLElement>(
        '#performance-card-leads',
      )
      const photo = section.querySelector<HTMLElement>('#performance-photo')

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (kicker && heading) {
          createScrollSlideReveal({
            // Heading (not the tall section) so the rest pose is centered when in view
            trigger: heading,
            targets: kicker,
            start: 'top bottom',
            end: 'bottom top',
            // Centered watermark: rest at -50/-50, slide in from 10% further left
            xPercent: -60,
            xPercentTo: -50,
            yPercent: -50,
          })
        }
      })

      mm.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (healthCard) {
            gsap.from(healthCard, {
              yPercent: -35,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: '30% bottom',
                end: '70% bottom',
                scrub: true,
              },
            })
          }

          if (leadsCard) {
            gsap.from(leadsCard, {
              xPercent: -10,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: '62% bottom',
                end: '95% bottom',
                scrub: true,
              },
            })
          }

          if (photo) {
            gsap.from(photo, {
              xPercent: 10,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: '62% bottom',
                end: '95% bottom',
                scrub: true,
              },
            })
          }
        },
      )

      mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
        const cards = [healthCard, leadsCard, photo].filter(
          (card): card is HTMLElement => card != null,
        )
        if (cards.length > 0) {
          gsap.set(cards, { clearProps: 'transform' })
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (kicker) {
          gsap.set(kicker, { xPercent: -50, yPercent: -50 })
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: sectionRef },
  )
}
