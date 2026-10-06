import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useHeroTextReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return

      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 1025px)',
        },
        (context) => {
          const { reduceMotion, motion, desktop } = context.conditions as {
            reduceMotion: boolean
            motion: boolean
            desktop: boolean
          }

          if (!motion || reduceMotion) return

          const planet = root.querySelector('.home-hero-planet')
          const video = root.querySelector('.home-hero-video')
          const title = root.querySelector('.home-hero-title-text')
          const tagline = root.querySelector('.home-hero-tagline')
          if (!planet || !video || !title || !tagline) return

          const taglineTravel = desktop ? 28 : 16
          const settle = desktop ? 20 : 12
          const parallax = desktop ? 0.32 : 0.18

          gsap.set(video, { y: settle })
          gsap.set(title, { autoAlpha: 0 })
          gsap.set(tagline, { y: taglineTravel, autoAlpha: 0 })

          gsap.to(planet, {
            y: () => window.innerHeight * parallax,
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })

          let cancelled = false
          let entrance: gsap.core.Timeline | null = null
          let revertSplit = () => {}

          const play = contextSafe(() => {
            if (cancelled) return

            const titleEl = title as HTMLElement
            const split = SplitText.create(titleEl, {
              type: 'chars',
              mask: 'chars',
              tag: 'span',
              smartWrap: true,
              charsClass: 'home-hero-char',
              aria: 'auto',
            })

            titleEl.classList.add('is-split')

            const masks = split.masks as HTMLElement[]

            gsap.set(masks, { opacity: 0 })
            gsap.set(titleEl, { autoAlpha: 1 })

            revertSplit = () => {
              titleEl.classList.remove('is-split')
              split.revert()
            }

            entrance = gsap.timeline({ defaults: { overwrite: 'auto' } })

            entrance.to(
              video,
              {
                y: 0,
                duration: 1.15,
                ease: 'power2.out',
              },
              0,
            )

            entrance.fromTo(
              masks,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 4,
                stagger: 0.12,
                ease: 'power1.out',
              },
              0.3,
            )

            entrance.to(
              tagline,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                ease: 'power2.out',
              },
              0.16,
            )

            ScrollTrigger.refresh()
          })

          if (document.fonts.status === 'loaded') play()
          else void document.fonts.ready.then(play)

          return () => {
            cancelled = true
            entrance?.kill()
            revertSplit()
          }
        },
        root,
      )

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
