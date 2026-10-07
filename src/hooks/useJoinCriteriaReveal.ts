import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { riseOnEnter, scrubIntoPlace } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Criteria split — Service feature vocabulary: scrubbed left watermark,
 * once-triggered underline + staggered checklist, desktop list panel
 * settling in from the left over the photo.
 */
export function useJoinCriteriaReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const copy = section.querySelector('.join-us-criteria-copy')
      const kicker = section.querySelector('.join-us-criteria-kicker')
      const list = section.querySelector('.join-us-criteria-list')
      const items = section.querySelectorAll('.join-us-criteria-item')

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (kicker && copy) {
          createScrollSlideReveal({
            trigger: copy,
            targets: kicker,
            start: 'top bottom',
            end: 'center center',
            xPercent: -10,
          })
        }
        if (items.length) {
          riseOnEnter(items, { y: 24, duration: 0.65, stagger: 0.1, start: 'top 92%' })
        }
      })

      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        if (list) scrubIntoPlace(list, { xPercent: -10 }, section)
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
