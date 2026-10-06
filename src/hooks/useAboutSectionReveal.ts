import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const KICKER_START = '20% bottom'
const KICKER_END = '70% bottom'
const BOTTOM_END = '90% bottom'

export function useAboutSectionReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const kicker = section.querySelector('.home-about-kicker')

        if (kicker) {
          createScrollSlideReveal({
            trigger: section,
            targets: kicker,
            start: KICKER_START,
            end: KICKER_END,
            xPercent: -10,
          })
        }
      })

      mm.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          const bottom = section.querySelector('.home-about-bottom')
          if (!bottom) return

          const items = bottom.querySelectorAll(
            '.home-about-card, .home-about-role',
          )

          createScrollSlideReveal({
            trigger: section,
            targets: items,
            start: KICKER_END,
            end: BOTTOM_END,
            xPercent: -5,
            stagger: 0.12,
          })
        },
      )

      mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
        gsap.set('.home-about-card, .home-about-role', {
          clearProps: 'transform',
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.home-about-kicker', { clearProps: 'transform' })
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
