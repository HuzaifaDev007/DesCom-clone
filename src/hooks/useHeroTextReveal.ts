import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, SplitText)

export function useHeroTextReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.home-hero-title-text, .home-hero-tagline', { autoAlpha: 0 })

        let revertSplits = () => {}

        const play = contextSafe(() => {
          const title = SplitText.create('.home-hero-title-text', {
            type: 'chars',
            tag: 'span',
            smartWrap: true,
            charsClass: 'home-hero-char',
            aria: 'auto',
          })
          const tagline = SplitText.create('.home-hero-tagline', {
            type: 'chars',
            tag: 'span',
            smartWrap: true,
            charsClass: 'home-hero-char',
            aria: 'auto',
          })

          gsap.set('.home-hero-title-text, .home-hero-tagline', { autoAlpha: 1 })

          const tl = gsap.timeline({ defaults: { overwrite: 'auto' } })

          tl.from(
            title.chars,
            {
              autoAlpha: 0,
              duration: 3.06,
              ease: 'sine.inOut',
              stagger: { each: 0.05, from: 'start' },
            },
            0.18,
          )

          tl.fromTo(
            tagline.chars,
            { autoAlpha: 0, scaleX: 2 },
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 4.64,
              ease: 'sine.inOut',
              transformOrigin: '50% 50%',
              stagger: { each: 0.005, from: 'center' },
            },
            2.17,
          )

          tl.fromTo(
            tagline.elements,
            { scaleX: 0.5 },
            {
              scaleX: 1,
              duration: 5.89,
              ease: 'sine.inOut',
              transformOrigin: '50% 50%',
            },
            2.17,
          )

          revertSplits = () => {
            title.revert()
            tagline.revert()
          }
        })

        void document.fonts.ready.then(play)

        return () => {
          revertSplits()
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
