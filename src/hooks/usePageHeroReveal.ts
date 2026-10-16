import { useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, DrawSVGPlugin)

/**
 * Inner-page hero entrance — same vocabulary as the home hero and section titles:
 * rise + fade for copy, DrawSVG underline, light decorative settle.
 *
 * No ScrollTriggers: creating them during SPA route changes races
 * ScrollTrigger.refresh() in useSmoothScroll and can overflow GSAP's call stack.
 */
export function usePageHeroReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const underline = root.querySelector('.page-hero-underline path')
        if (underline) gsap.set(underline, { drawSVG: '0% 100%' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const kicker = root.querySelector('.page-hero-kicker')
        const title = root.querySelector('.page-hero-title')
        const cta = root.querySelector('.page-hero-cta')
        const underline = root.querySelector('.page-hero-underline path')
        const orbs = root.querySelectorAll('.page-hero-orb')
        const line = root.querySelector('.page-hero-line')
        const desktop = window.matchMedia('(min-width: 1025px)').matches
        const titleTravel = desktop ? 56 : 36

        if (kicker) gsap.set(kicker, { y: 16, autoAlpha: 0 })
        if (title) gsap.set(title, { y: titleTravel, autoAlpha: 0 })
        if (cta) gsap.set(cta, { y: 20, autoAlpha: 0 })
        if (underline) gsap.set(underline, { drawSVG: '0% 0%' })
        if (orbs.length) gsap.set(orbs, { autoAlpha: 0, scale: 0.92 })
        if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

        let cancelled = false
        let entrance: gsap.core.Timeline | null = null

        const play = () => {
          if (cancelled || !root.isConnected) return

          entrance = gsap.timeline()

          if (kicker) {
            entrance.to(
              kicker,
              { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power2.out' },
              0,
            )
          }

          if (title) {
            entrance.to(
              title,
              { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power2.out' },
              0.08,
            )
          }

          if (underline) {
            entrance.to(
              underline,
              { drawSVG: '0% 100%', duration: 0.8, ease: 'power2.out' },
              0.45,
            )
          }

          if (cta) {
            entrance.to(
              cta,
              { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' },
              0.35,
            )
          }

          if (orbs.length) {
            entrance.to(
              orbs,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power2.out',
              },
              0.2,
            )
          }

          if (line) {
            entrance.to(
              line,
              { scaleX: 1, duration: 0.9, ease: 'power2.out' },
              0.28,
            )
          }
        }

        if (document.fonts.status === 'loaded') {
          play()
        } else {
          void document.fonts.ready.then(() => {
            if (!cancelled) play()
          })
        }

        return () => {
          cancelled = true
          entrance?.kill()
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
