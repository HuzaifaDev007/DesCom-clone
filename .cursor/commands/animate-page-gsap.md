---
name: animate-page-gsap
description: Design and implement GSAP page/section animations that match the homepage motion language. Use when animating pages or sections that have no direct reference-site animation.
---

# Animate page with GSAP (match site motion language)

I need you to design and implement the animations for this page using **GSAP**, while making them feel completely consistent with the animation language already established across my website.

Also follow the project's GSAP React skill (`.agents/skills/gsap-react-animations` / `.cursor/skills/gsap-react-animations`) for `useGSAP`, hooks, performance, and reduced motion.

## Important Context

This website is being recreated from a reference website.

The **homepage is based directly on the reference website**, including its animation style, pacing, transitions, scroll behavior, and overall visual feeling.

However, the page I am currently working on **does not exist on the reference website**, so there is no direct animation reference for this page.

Your job is NOT to invent a completely new animation style.

Instead, study the animations already implemented throughout my homepage and existing sections, understand the website's overall **motion language**, and then create animations for this page that feel like they naturally belong to the same website.

The final result should make it difficult to tell which animations came from the reference and which ones were designed specifically for my additional pages.

---

## STEP 1 — Analyze the Existing Animation System First

Before implementing anything, inspect the homepage and other already animated sections in the project.

Also inspect the existing GSAP animation components/utilities I created.

Study things such as:

- How sections enter the viewport
- How headings appear
- How paragraphs/body text appear
- How images appear
- How cards appear
- Whether elements move vertically, horizontally, scale, fade, clip, mask, rotate, etc.
- ScrollTrigger behavior
- Trigger positions
- Scrubbed vs non-scrubbed animations
- Pinning behavior
- Parallax behavior
- Stagger patterns
- Animation duration
- Animation delays
- Easing curves
- Transform distances
- Scale ranges
- Opacity transitions
- Reveal masks / overflow clipping
- Image zoom effects
- Section transitions
- Decorative/background movement
- Interaction between text and visual elements
- Whether animations reverse when scrolling upward
- How animations behave when scrolling quickly
- How animation intensity changes across desktop/tablet/mobile

Do not only inspect one animation.

Look across the homepage and identify the **repeating animation principles** used throughout the site.

Think of this as extracting a small internal design system for motion.

---

## STEP 2 — Determine the Website's Motion Language

Before choosing animations for this page, internally determine things like:

- Is the website animation style subtle or dramatic?
- Is it elegant, cinematic, playful, editorial, premium, futuristic, minimal, energetic, etc.?
- Are animations generally slow and smooth or fast and responsive?
- Are large movements common, or are transforms restrained?
- Does the site rely more on opacity, transforms, masks, scale, parallax, or combinations of them?
- Does scrolling directly control animations or mainly trigger them?
- How much stagger is normally used?
- How are headings treated compared with supporting text?
- How are images treated?
- How do sections visually transition into one another?

Use these observations as the rules for all animations you add.

---

## STEP 3 — Analyze the Current Page

Now inspect the page/section I have selected.

Understand its:

- Layout hierarchy
- Headings
- Paragraphs
- Images
- Cards
- Lists
- Buttons
- Decorative graphics
- Backgrounds
- Containers
- Repeated elements
- Section boundaries
- Visual focal points

Decide which elements actually benefit from animation.

Do **not** animate everything simply because it is possible.

Animations should support hierarchy, storytelling, and scrolling flow.

---

## STEP 4 — Design Animations That Feel Native to the Existing Website

Create animations for this page by reusing the motion principles discovered from the homepage.

The new animations do not need to be exact copies of existing animations.

They should be **new compositions built from the same visual vocabulary**.

For example, if the homepage frequently uses:

- masked heading reveals
- subtle upward text movement
- staggered elements
- image scale-down reveals
- scroll-linked parallax
- smooth section transitions

then use those same concepts intelligently on this page.

Avoid suddenly introducing animation styles that do not exist elsewhere, such as:

- unnecessary bouncing
- aggressive elastic effects
- random rotations
- exaggerated scaling
- arbitrary horizontal movement
- excessive animation
- flashy effects that conflict with the existing aesthetic

Every animation should feel intentional.

---

## STEP 5 — Maintain Visual Rhythm Across the Page

Do not treat every section independently.

Think about how the **whole page flows while scrolling**.

Animations should create rhythm:

section enters → hierarchy is revealed → visual settles → user continues scrolling → next section begins.

Avoid having every section use exactly the same reveal.

Use subtle variations while keeping the same motion language.

For example:

- Hero sections can have stronger/more cinematic motion.
- Supporting sections can have simpler reveals.
- Repeated cards/items can use stagger.
- Large imagery can use controlled parallax or scale.
- Text-heavy sections should remain easy to read.
- CTA sections can use slightly stronger emphasis.

The page should feel designed as one continuous animated experience.

---

## STEP 6 — GSAP Implementation Requirements

Use **GSAP** and the same GSAP patterns already established in this project.

Reuse existing animation utilities/components where appropriate instead of unnecessarily recreating logic.

I already follow a pattern where GSAP logic for a section is separated into a dedicated animation component/module.

Continue that architecture.

For each substantial section that needs custom animation:

- keep the UI/layout component clean
- place complex GSAP animation logic inside its own animation component/hook/module
- use clear refs/scoping
- keep selectors local to the section
- avoid fragile global selectors
- properly clean up GSAP timelines and ScrollTriggers when components unmount
- make the implementation safe for React lifecycle behavior
- avoid creating duplicate ScrollTriggers
- avoid memory leaks
- avoid animation conflicts during re-renders

Prefer the same architecture already used by the animated homepage sections.

Do not refactor unrelated parts of the application.

---

## ScrollTrigger

When ScrollTrigger is appropriate:

- choose trigger positions based on how similar homepage sections behave
- maintain the same scroll pacing as the existing website
- use scrub only where scroll-linked movement actually improves the experience
- don't convert every reveal into a scrubbed animation
- avoid excessive pinning
- make sure triggers behave correctly after layout/image loading
- prevent abrupt snapping or jumps
- make fast scrolling behave gracefully

The experience should remain smooth when scrolling both slowly and quickly.

---

## Animation Timing

Do not choose arbitrary numbers.

First inspect the timing/easing conventions already used on the homepage.

Reuse similar:

- durations
- staggers
- easing functions
- ScrollTrigger start/end ranges
- transform distances
- scale values

Small variation is fine when required by the new layout, but the animation should still feel like it came from the same motion designer.

---

## Responsive Behavior

Animations must work properly on:

- desktop
- tablet
- mobile

Do not blindly reuse desktop transform distances on mobile.

Reduce or simplify effects where necessary.

Ensure that:

- content never becomes inaccessible
- elements don't animate outside the viewport incorrectly
- text doesn't overlap
- horizontal overflow isn't introduced
- pinned/scrubbed animations remain usable
- performance remains good on mobile devices

If a sophisticated desktop animation does not translate well to mobile, create a simplified version that preserves the same feeling.

---

## Performance

Prioritize transform-based properties where possible:

- transform
- opacity
- scale
- translate
- rotation when appropriate

Avoid unnecessary layout-triggering animations.

Do not create excessive ScrollTriggers.

Do not attach expensive continuous listeners unnecessarily.

Reuse timelines where sensible.

Animations should remain smooth and should not make scrolling feel heavy.

---

## Reduced Motion

Respect `prefers-reduced-motion`.

Users requesting reduced motion should still see all content without depending on animations to reveal it.

---

## Important Design Rule

Do NOT try to prove that GSAP is being used by adding complicated effects.

The goal is not "more animation."

The goal is:

**the correct animation for this website.**

Subtle animation that perfectly matches the homepage is better than a technically impressive effect that feels out of place.

---

## Workflow

Follow this process:

1. Inspect the existing homepage.
2. Inspect its animated sections.
3. Inspect the existing GSAP animation components/hooks/utilities.
4. Identify the recurring motion patterns.
5. Inspect the structure of the current page.
6. Decide which elements should animate and why.
7. Design the page animation using the existing motion vocabulary.
8. Implement it with GSAP.
9. Keep section-specific animation logic separated using the existing architecture.
10. Check desktop/tablet/mobile behavior.
11. Check scrolling both downward and upward.
12. Check slow and fast scrolling.
13. Clean up all GSAP contexts/timelines/ScrollTriggers correctly.
14. Verify that the animations feel visually connected to the homepage.

---

## Most Important Requirement

When making any animation decision, ask:

> "If the original designers of the reference website had created this missing page themselves, what animation would they most likely have used?"

Use the homepage as the source of truth.

Do not create a separate animation identity for this page.

Extend the existing one.

### Extra context

Any text after this command is additional context (target page, selected section, component name, notes). Use it if provided.
