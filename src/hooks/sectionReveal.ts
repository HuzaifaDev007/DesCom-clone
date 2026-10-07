import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

/** Title scribble — drawn once, trailing the AboutTitleMotion rise. */
export function drawUnderlineOnEnter(path: Element, trigger: Element) {
  gsap.set(path, { drawSVG: '0% 0%' })

  return gsap.to(path, {
    drawSVG: '0% 100%',
    duration: 0.8,
    delay: 0.35,
    ease: 'power2.out',
    overwrite: 'auto',
    scrollTrigger: {
      trigger,
      start: 'top 88%',
      once: true,
    },
  })
}

export type RiseOnEnterOptions = {
  trigger?: Element
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

/** Once-triggered rise + fade used for body copy, list items, and mobile media. */
export function riseOnEnter(
  targets: Element | Element[] | NodeListOf<Element>,
  {
    trigger,
    y = 36,
    duration = 0.75,
    stagger,
    start = 'top 90%',
  }: RiseOnEnterOptions = {},
) {
  const first =
    targets instanceof Element ? targets : (Array.from(targets)[0] ?? null)
  if (!first) return null

  return gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration,
    ease: 'power2.out',
    overwrite: 'auto',
    ...(stagger != null ? { stagger } : {}),
    scrollTrigger: {
      trigger: trigger ?? first,
      start,
      once: true,
    },
  })
}

/** Desktop scrubbed settle (Trusted cards / Service gallery). */
export function scrubIntoPlace(
  target: Element,
  from: { xPercent?: number; yPercent?: number },
  trigger: Element = target,
) {
  return gsap.from(target, {
    ...from,
    ease: 'none',
    overwrite: 'auto',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'top 35%',
      scrub: true,
    },
  })
}
