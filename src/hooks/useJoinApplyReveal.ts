import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { riseOnEnter, scrubIntoPlace } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Application form — closing CTA: scrubbed left watermark, underline + intro
 * rise, and the form stage settling up like the Service gallery on desktop.
 * Fields themselves never animate so the form is usable immediately.
 */
export function useJoinApplyReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const intro = section.querySelector('.join-us-apply-intro')
      const kicker = section.querySelector('.join-us-apply-kicker')
      const text = section.querySelector('.join-us-apply-text')
      const stage = section.querySelector('.join-us-apply-stage')

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (kicker && intro) {
          createScrollSlideReveal({
            trigger: intro,
            targets: kicker,
            start: 'top bottom',
            end: 'center center',
            xPercent: -10,
          })
        }
        if (text) riseOnEnter(text)
      })

      mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        if (stage) scrubIntoPlace(stage, { yPercent: 10 })
      })

      mm.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (stage) riseOnEnter(stage, { y: 48, duration: 0.85, start: 'top 88%' })
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
