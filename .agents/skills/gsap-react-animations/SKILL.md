---
name: gsap-react-animations
description: Applies GSAP and @gsap/react best practices in this repo, with 60fps performance as a requirement. Use when adding or changing animations, timelines, ScrollTrigger, useGSAP, motion, or animation performance in React components and hooks.
---

# GSAP in React

## Rules
- Animate with `useGSAP` from `@gsap/react`, scoped to a ref. Do not put timelines in `useEffect`.
- Keep animation setup in `src/hooks/`, following `useGsapFadeIn`.
- Animate `transform` and `opacity` (`x`, `y`, `scale`, `rotation`, `autoAlpha`). Leave layout (`width`, `height`, `margin`, `top`) to Tailwind.
- Do not run a CSS transition and GSAP on the same property.
- Register real plugins once (`ScrollTrigger`, and similar). `useGSAP` is a hook, so it does not need `gsap.registerPlugin`.
- Respect `prefers-reduced-motion`: skip or shorten motion when the user has asked for reduced motion.

## 60fps
Performance is a requirement. Every animation must stay on the compositor and avoid extra work per frame.

- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, `filter`, `blur`, or `box-shadow`.
- Use one timeline per component. Set `overwrite: "auto"` so leftover tweens do not stack.
- Keep `useGSAP` dependencies stable so the timeline is not rebuilt on every render.
- Pause or kill tweens that are off-screen. For lists, use `ScrollTrigger.batch` instead of one ScrollTrigger per item.
- Do not read layout (`getBoundingClientRect`, `offsetWidth`, `offsetHeight`) inside `onUpdate` or a ticker callback.
- Do not set `will-change` in CSS. GSAP promotes the layer for the tween and releases it after.
- Stagger large groups. Do not start dozens of tweens on the same frame.
- Drive custom loops with `gsap.ticker`, not a second `requestAnimationFrame` loop.

## Checklist
- [ ] Animation lives in a hook, not copied into each page
- [ ] `useGSAP` uses `{ scope: ref }` and targets elements inside that ref
- [ ] Motion uses transform and opacity only
- [ ] One timeline, `overwrite: "auto"`, stable `useGSAP` dependencies
- [ ] Off-screen tweens are paused or batched
- [ ] Reduced-motion users are handled

## Don't
- Query the document with selectors that can hit elements outside the component
- Leave ScrollTrigger instances without the cleanup `useGSAP` provides
- Animate layout or paint-heavy properties to "smooth" a transition
