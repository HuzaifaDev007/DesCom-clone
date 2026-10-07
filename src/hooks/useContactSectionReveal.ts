import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { riseOnEnter } from './sectionReveal'
import { useJoinApplyReveal } from './useJoinApplyReveal'

gsap.registerPlugin(useGSAP)

/**
 * Contact section shares the Join apply layout, so it reuses that reveal
 * (kicker slide, underline, intro rise, form stage) and adds a staggered
 * rise for the contact cards, matching the Service feature checklist.
 */
export function useContactSectionReveal() {
  const { ref } = useJoinApplyReveal()

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const methods = section.querySelectorAll('.contact-us-touch-method')
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (methods.length) {
          riseOnEnter(methods, { y: 24, duration: 0.65, stagger: 0.1, start: 'top 92%' })
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
