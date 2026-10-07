import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/**
 * Home hero entrance + planet parallax.
 *
 * Intentionally flat (no matchMedia + contextSafe nesting). Calling the outer
 * useGSAP contextSafe() from inside a matchMedia callback created a circular
 * GSAP Context tree; Context.getTweens then overflowed on SPA remount.
 */
export function useHeroTextReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const planet = root.querySelector('.home-hero-planet')
      const video = root.querySelector('.home-hero-video')
      const title = root.querySelector('.home-hero-title-text')
      const tagline = root.querySelector('.home-hero-tagline')
      if (!planet || !video || !title || !tagline) return

      const desktop = window.matchMedia('(min-width: 1025px)').matches
      const taglineTravel = desktop ? 28 : 16
      const settle = desktop ? 20 : 12
      const parallax = desktop ? 0.32 : 0.18

      gsap.set(video, { y: settle })
      gsap.set(title, { autoAlpha: 0 })
      gsap.set(tagline, { y: taglineTravel, autoAlpha: 0 })

      gsap.to(planet, {
        y: () => window.innerHeight * parallax,
        ease: 'none',
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
      let split: SplitText | null = null

      const play = () => {
        if (cancelled || !title.isConnected) return

        const titleEl = title as HTMLElement
        split = SplitText.create(titleEl, {
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

        entrance = gsap.timeline()

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
        if (split) {
          title.classList.remove('is-split')
          split.revert()
          split = null
        }
      }
    },
    { scope: ref },
  )

  return { ref }
}
