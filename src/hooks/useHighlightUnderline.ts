import { useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin)

/**
 * Draws the highlight scribble once when the phrase enters the viewport.
 * The stroke is held after it finishes so a static phrase keeps the mark.
 */
export function useHighlightUnderline() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const path = root.querySelector('.highlight-underline-path')
      if (!path) return

      const motion = gsap.matchMedia()

      motion.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { drawSVG: '0% 100%' })
      })

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(path, { drawSVG: '0% 0%' })

        const timeline = gsap.timeline({
          defaults: { overwrite: 'auto' },
          scrollTrigger: {
            trigger: root,
            start: 'top 88%',
            once: true,
          },
        })

        timeline.to(path, {
          drawSVG: '0% 100%',
          duration: 0.8,
          ease: 'power2.out',
        }, 0.35)
      })

      return () => {
        motion.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
