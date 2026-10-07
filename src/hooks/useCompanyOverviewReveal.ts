import { useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin)

/**
 * Company Overview scroll motion — same vocabulary as homepage Performance /
 * Trusted / About: scrubbed watermark, once-triggered title underline + copy,
 * desktop scrubbed card enters.
 */
export function useCompanyOverviewReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const heading = section.querySelector<HTMLElement>(
        '.about-us-overview-heading',
      )
      const kicker = section.querySelector<HTMLElement>(
        '.about-us-overview-kicker',
      )
      const underline = section.querySelector(
        '.about-us-overview-underline path',
      )
      const introText = section.querySelector<HTMLElement>(
        '.about-us-overview-text',
      )
      const mission = section.querySelector<HTMLElement>(
        '.about-us-overview-mission',
      )
      const valuesTitle = section.querySelector<HTMLElement>(
        '.about-us-overview-values-title',
      )

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (kicker) gsap.set(kicker, { xPercent: -50, yPercent: -50 })
        if (underline) gsap.set(underline, { drawSVG: '0% 100%' })
        gsap.set(
          [introText, mission, valuesTitle].filter(Boolean),
          { clearProps: 'transform,opacity,visibility' },
        )
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (kicker && heading) {
          createScrollSlideReveal({
            trigger: heading,
            targets: kicker,
            start: 'top bottom',
            end: 'bottom top',
            xPercent: -60,
            xPercentTo: -50,
            yPercent: -50,
          })
        }

        if (underline) {
          gsap.set(underline, { drawSVG: '0% 0%' })

          const underlineTl = gsap.timeline({
            defaults: { overwrite: 'auto' },
            scrollTrigger: {
              trigger: heading ?? section,
              start: 'top 88%',
              once: true,
            },
          })

          underlineTl.to(
            underline,
            {
              drawSVG: '0% 100%',
              duration: 0.8,
              ease: 'power2.out',
            },
            0.35,
          )
        }

        if (introText) {
          gsap.from(introText, {
            y: 36,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: introText,
              start: 'top 90%',
              once: true,
            },
          })
        }

        if (mission) {
          gsap.from(mission, {
            y: 48,
            autoAlpha: 0,
            duration: 0.85,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: mission,
              start: 'top 88%',
              once: true,
            },
          })
        }

        if (valuesTitle) {
          gsap.from(valuesTitle, {
            y: 40,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: valuesTitle,
              start: 'top 90%',
              once: true,
            },
          })
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
