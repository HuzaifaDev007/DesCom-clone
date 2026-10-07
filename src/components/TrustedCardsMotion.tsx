import type { ReactNode } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type TrustedCardsMotionProps = {
  children: ReactNode
  /** Defaults to the homepage trusted grid. */
  className?: string
  /** Cards that opt in with `data-trusted-enter`. */
  cardSelector?: string
}

/**
 * Trusted card scroll motion on desktop (whole card, so border + body stay together).
 * Health (`data-trusted-enter="top"`) starts 10% above and scrubs down into place.
 * Life and carrier partners (`data-trusted-enter="bottom"`) start below and scrub up.
 */
export function TrustedCardsMotion({
  children,
  className = 'home-trusted-grid',
  cardSelector = '.home-trusted-card[data-trusted-enter]',
}: TrustedCardsMotionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const grid = ref.current
      if (!grid) return

      const cards = grid.querySelectorAll<HTMLElement>(cardSelector)
      if (cards.length === 0) return

      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          cards.forEach((card) => {
            const fromTop = card.dataset.trustedEnter === 'top'

            gsap.from(card, {
              yPercent: fromTop ? -10 : 10,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'top 35%',
                scrub: true,
              },
            })
          })
        },
      )

      mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { clearProps: 'transform' })
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref, dependencies: [cardSelector], revertOnUpdate: true },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
