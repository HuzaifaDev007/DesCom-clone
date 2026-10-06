import type { ReactNode } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type AboutTitleMotionProps = {
  children: ReactNode
  className?: string
  id?: string
}

/**
 * Section heading entrance (rise + fade on scroll).
 * ScrollTrigger only starts the timeline once the heading enters;
 * the rise itself is a timed tween, not scrubbed to scroll.
 */
export function AboutTitleMotion({
  children,
  className = 'home-about-title',
  id = 'home-about-title',
}: AboutTitleMotionProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const title = ref.current
      if (!title) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          defaults: { overwrite: 'auto' },
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            once: true,
          },
        })

        timeline.from(title, {
          y: 88,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power2.out',
        })
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return (
    <h2 ref={ref} className={className} id={id}>
      {children}
    </h2>
  )
}
