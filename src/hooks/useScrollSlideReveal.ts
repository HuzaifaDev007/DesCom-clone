import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export type ScrollSlideRevealConfig = {
  /** Element whose scroll position drives the scrub. */
  trigger: Element
  /** Element(s) that slide on the x axis. */
  targets: gsap.TweenTarget
  start: string
  end: string
  /** Starting xPercent (negative = from the left). Default: -10 */
  xPercent?: number
  /** Ending xPercent. Default: 0. Use -50 when the target is center-anchored. */
  xPercentTo?: number
  /** Kept for the whole tween (e.g. -50 for vertically centered elements). */
  yPercent?: number
  stagger?: number | gsap.StaggerVars
  markers?: boolean
}

/** Shared scrubbed x-slide — same motion as the About kicker. */
export function createScrollSlideReveal({
  trigger,
  targets,
  start,
  end,
  xPercent = -10,
  xPercentTo = 0,
  yPercent,
  stagger,
  markers = false,
}: ScrollSlideRevealConfig) {
  gsap.set(targets, {
    xPercent,
    ...(yPercent != null ? { yPercent } : {}),
  })

  return gsap.to(targets, {
    xPercent: xPercentTo,
    overwrite: 'auto',
    ease: 'none',
    ...(stagger != null ? { stagger } : {}),
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
      markers,
    },
  })
}

export type UseScrollSlideRevealOptions = {
  /** Child selector within the ref. If omitted, the ref element itself animates. */
  target?: string
  start?: string
  end?: string
  xPercent?: number
  xPercentTo?: number
  yPercent?: number
  stagger?: number | gsap.StaggerVars
  markers?: boolean
}

/**
 * Reusable scroll-scrubbed slide reveal (About kicker pattern).
 *
 * @example
 * // Animate the element that receives the ref
 * const { ref } = useScrollSlideReveal({ start: '20% bottom', end: '70% bottom' })
 * <p ref={ref}>About</p>
 *
 * @example
 * // Center-anchored watermark (e.g. Why Us)
 * const { ref } = useScrollSlideReveal({
 *   target: '.home-trusted-kicker',
 *   xPercent: -60,
 *   xPercentTo: -50,
 *   yPercent: -50,
 * })
 */
export function useScrollSlideReveal({
  target,
  start = '20% bottom',
  end = '70% bottom',
  xPercent = -10,
  xPercentTo = 0,
  yPercent,
  stagger,
  markers = false,
}: UseScrollSlideRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = target ? root.querySelectorAll(target) : root
        if (target && (targets as NodeListOf<Element>).length === 0) return

        createScrollSlideReveal({
          trigger: root,
          targets,
          start,
          end,
          xPercent,
          xPercentTo,
          yPercent,
          stagger,
          markers,
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const targets = target ? root.querySelectorAll(target) : root
        if (yPercent != null) {
          gsap.set(targets, { xPercent: xPercentTo, yPercent })
        } else {
          gsap.set(targets, { clearProps: 'transform' })
        }
      })

      return () => {
        mm.revert()
      }
    },
    {
      scope: ref,
      dependencies: [
        target,
        start,
        end,
        xPercent,
        xPercentTo,
        yPercent,
        stagger,
        markers,
      ],
      revertOnUpdate: true,
    },
  )

  return { ref }
}
