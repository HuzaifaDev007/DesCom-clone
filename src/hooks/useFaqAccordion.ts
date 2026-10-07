import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Animates the FAQ `<details>` open/close. Native toggling hides the answer
 * instantly on close, so summary clicks are intercepted and `open` is only
 * removed once the collapse finishes. Reduced-motion users keep native toggling.
 */
export function useFaqAccordion(ref: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      const section = ref.current
      if (!section || !contextSafe) return

      const reduceMotion = window.matchMedia(REDUCED_MOTION)
      const timelines = new WeakMap<HTMLDetailsElement, gsap.core.Timeline>()

      // Reads the CSS padding for a given open state without painting it.
      const paddingFor = (item: HTMLDetailsElement, summary: HTMLElement, open: boolean) => {
        const wasOpen = item.open
        const inline = summary.style.paddingBottom
        item.open = open
        summary.style.paddingBottom = ''
        const value = getComputedStyle(summary).paddingBottom
        item.open = wasOpen
        summary.style.paddingBottom = inline
        return value
      }

      const toggle = contextSafe((item: HTMLDetailsElement) => {
        const summary = item.querySelector<HTMLElement>('.faq-section-question')
        const panel = item.querySelector<HTMLElement>('.faq-section-answer-panel')
        const answer = item.querySelector<HTMLElement>('.faq-section-answer')
        const bar = item.querySelector<HTMLElement>('.faq-section-icon-bar')
        if (!summary || !panel || !answer || !bar) return

        const closing = item.open && item.dataset.faqState !== 'closing'
        const fromPadding = getComputedStyle(summary).paddingBottom
        const toPadding = paddingFor(item, summary, !closing)

        timelines.get(item)?.kill()

        const finish = () => {
          delete item.dataset.faqState
          if (closing) {
            item.open = false
            gsap.set(bar, { clearProps: 'transform' })
          }
          gsap.set([summary, panel], { clearProps: 'paddingBottom,height' })
          ScrollTrigger.refresh()
        }

        if (closing) {
          item.dataset.faqState = 'closing'
          gsap.set(summary, { paddingBottom: fromPadding })
          gsap.set(panel, { height: panel.offsetHeight })

          const tl = gsap
            .timeline({
              defaults: { duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' },
              onComplete: finish,
            })
            .to(answer, { y: -12, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0)
            .to(panel, { height: 0 }, 0)
            .to(summary, { paddingBottom: toPadding }, 0)
            .to(bar, { rotation: 0 }, 0)
          timelines.set(item, tl)
          return
        }

        const wasClosed = !item.open
        item.dataset.faqState = 'opening'
        item.open = true
        gsap.set(summary, { paddingBottom: fromPadding })
        if (wasClosed) {
          gsap.set(panel, { height: 0 })
          gsap.set(answer, { y: 16, autoAlpha: 0 })
          gsap.set(bar, { rotation: 0 })
        }

        const tl = gsap
          .timeline({
            defaults: { duration: 0.6, ease: 'power2.out', overwrite: 'auto' },
            onComplete: finish,
          })
          .to(panel, { height: 'auto' }, 0)
          .to(summary, { paddingBottom: toPadding }, 0)
          .to(bar, { rotation: 90 }, 0)
          .to(answer, { y: 0, autoAlpha: 1, duration: 0.55 }, 0.12)
        timelines.set(item, tl)
      })

      const onClick = (event: MouseEvent) => {
        if (reduceMotion.matches) return

        const summary = (event.target as Element | null)?.closest('.faq-section-question')
        const item = summary?.parentElement
        if (!summary || !(item instanceof HTMLDetailsElement) || !section.contains(item)) return

        event.preventDefault()
        toggle(item)
      }

      section.addEventListener('click', onClick)

      return () => {
        section.removeEventListener('click', onClick)
      }
    },
    { scope: ref },
  )
}
