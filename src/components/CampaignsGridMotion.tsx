import type { ReactNode } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type CampaignsGridMotionProps = {
  children: ReactNode
}

/**
 * Elementor scrolling translateX on the two campaign rows (desktop only, 1025px and up).
 * Both rows share the grid's viewport progress. Speed 5:
 * px = -(percent - 50) * speed, so the row rests at 0 when the grid is
 * centered and travels ±250px from enter to exit. The bottom row is reversed.
 */
const TRANSLATE_SPEED = 5
const TRAVEL = 50 * TRANSLATE_SPEED

export function CampaignsGridMotion({ children }: CampaignsGridMotionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const grid = ref.current
      if (!grid) return

      const topRow = grid.querySelectorAll<HTMLElement>(
        '.home-campaigns-card[data-campaigns-row="top"]',
      )
      const bottomRow = grid.querySelectorAll<HTMLElement>(
        '.home-campaigns-card[data-campaigns-row="bottom"]',
      )
      if (topRow.length === 0 || bottomRow.length === 0) return

      const mm = gsap.matchMedia()
      let active = true

      document.fonts?.ready.then(() => {
        if (active) ScrollTrigger.refresh()
      })

      mm.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          const timeline = gsap.timeline({
            defaults: { ease: 'none', overwrite: 'auto' },
            scrollTrigger: {
              trigger: grid,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })

          timeline.fromTo(topRow, { x: TRAVEL }, { x: -TRAVEL }, 0)
          timeline.fromTo(bottomRow, { x: -TRAVEL }, { x: TRAVEL }, 0)
        },
      )

      mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
        gsap.set([...topRow, ...bottomRow], { clearProps: 'transform' })
      })

      return () => {
        active = false
        mm.revert()
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="home-campaigns-grid">
      {children}
    </div>
  )
}
