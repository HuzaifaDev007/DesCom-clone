import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { drawUnderlineOnEnter, riseOnEnter } from './sectionReveal'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Process steps — centered scrubbed watermark, underline draw, steps rising in
 * order while the connector line (page-hero line vocabulary) draws with scroll.
 */
export function useJoinStepsReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const heading = section.querySelector('.join-us-steps-heading')
      const kicker = section.querySelector('.join-us-steps-kicker')
      const underline = section.querySelector('.join-us-steps-underline path')
      const track = section.querySelector('.join-us-steps-track')
      const line = section.querySelector('.join-us-steps-line')
      const items = section.querySelectorAll('.join-us-steps-item')

      const mm = gsap.matchMedia()

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
        if (underline && heading) drawUnderlineOnEnter(underline, heading)
        if (items.length && track) {
          riseOnEnter(items, { trigger: track, stagger: 0.15, start: 'top 88%' })
        }
      })

      mm.add(
        {
          desktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
          compact: '(max-width: 1024px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (!line || !track) return
          const desktop = Boolean(context.conditions?.desktop)

          gsap.fromTo(
            line,
            desktop
              ? { scaleX: 0, transformOrigin: 'left center' }
              : { scaleY: 0, transformOrigin: 'center top' },
            {
              scaleX: 1,
              scaleY: 1,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: track,
                start: desktop ? 'top 85%' : 'top 75%',
                end: desktop ? 'top 45%' : 'bottom 60%',
                scrub: true,
              },
            },
          )
        },
      )

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
