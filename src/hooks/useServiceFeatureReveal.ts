import { useRef } from 'react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createScrollSlideReveal } from './useScrollSlideReveal'

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin)

/**
 * Service feature scroll motion — homepage vocabulary:
 * scrubbed watermark slide (About kicker), once-triggered underline + copy rise,
 * desktop scrubbed media enters (Performance / Trusted cards).
 * The heading rise itself comes from AboutTitleMotion.
 *
 * @param reversed Media sits on the right on desktop, so it enters from the right.
 */
export function useServiceFeatureReveal(reversed = false) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const copy = section.querySelector<HTMLElement>('.service-feature-copy')
      const watermark = section.querySelector<HTMLElement>(
        '.service-feature-watermark',
      )
      const underline = section.querySelector('.service-feature-underline path')
      const text = section.querySelector<HTMLElement>('.service-feature-text')
      const items = section.querySelectorAll<HTMLElement>(
        '.service-feature-item',
      )
      const featured = section.querySelector<HTMLElement>(
        '.service-feature-featured',
      )
      const gallery = section.querySelector<HTMLElement>(
        '.service-feature-gallery-wrap',
      )
      const media = [featured, gallery].filter(
        (el): el is HTMLElement => el != null,
      )

      // Images have no intrinsic size in markup, so trigger positions shift as they load.
      let active = true
      let refresh: gsap.core.Tween | null = null
      const queueRefresh = () => {
        if (!active) return
        refresh?.kill()
        refresh = gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
      }
      const pendingImages = Array.from(
        section.querySelectorAll<HTMLImageElement>('img'),
      ).filter((img) => !img.complete)
      pendingImages.forEach((img) =>
        img.addEventListener('load', queueRefresh, { once: true }),
      )

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (underline) gsap.set(underline, { drawSVG: '0% 100%' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (watermark && copy) {
          createScrollSlideReveal({
            trigger: copy,
            targets: watermark,
            start: 'top bottom',
            end: 'center center',
            xPercent: -10,
          })
        }

        if (underline) {
          gsap.set(underline, { drawSVG: '0% 0%' })
          gsap.to(underline, {
            drawSVG: '0% 100%',
            duration: 0.8,
            delay: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: underline.closest('h2') ?? section,
              start: 'top 88%',
              once: true,
            },
          })
        }

        if (text) {
          gsap.from(text, {
            y: 36,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
              once: true,
            },
          })
        }

        if (items.length) {
          gsap.from(items, {
            y: 24,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: items[0],
              start: 'top 92%',
              once: true,
            },
          })
        }
      })

      mm.add(
        '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (featured) {
            gsap.from(featured, {
              xPercent: reversed ? 10 : -10,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: '45% bottom',
                scrub: true,
              },
            })
          }

          if (gallery) {
            gsap.from(gallery, {
              yPercent: 10,
              ease: 'none',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: gallery,
                start: 'top bottom',
                end: 'top 35%',
                scrub: true,
              },
            })
          }
        },
      )

      // Tablet/mobile: no scrubbed travel, just the same rise + fade as body copy.
      mm.add(
        '(max-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          media.forEach((el) => {
            gsap.from(el, {
              y: 36,
              autoAlpha: 0,
              duration: 0.75,
              ease: 'power2.out',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
            })
          })
        },
      )

      return () => {
        active = false
        refresh?.kill()
        pendingImages.forEach((img) =>
          img.removeEventListener('load', queueRefresh),
        )
        mm.revert()
      }
    },
    { scope: ref, dependencies: [reversed], revertOnUpdate: true },
  )

  return { ref }
}
