import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { drawUnderlineOnEnter, riseOnEnter, scrubIntoPlace } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Lead categories — Performance/Benefits vocabulary: centered scrubbed
 * watermark, underline + intro rise, category cards rising in as a staggered
 * batch, and the closing note settling up like the Trusted cards on desktop.
 */
export function useLeadMatchReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const heading = section.querySelector('.lead-generation-match-heading')
      const kicker = section.querySelector('.lead-generation-match-kicker')
      const underline = section.querySelector('.lead-generation-match-underline path')
      const text = section.querySelector('.lead-generation-match-text')
      const cards = gsap.utils.toArray<HTMLElement>('.lead-generation-match-card', section)
      const note = section.querySelector('.lead-generation-match-note')

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

        if (cards.length) {
          gsap.set(cards, { y: 36, autoAlpha: 0 })
          ScrollTrigger.batch(cards, {
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
        }
      })

      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        if (note) scrubIntoPlace(note, { yPercent: 10 })
      })

      mm.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (note) riseOnEnter(note)
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
