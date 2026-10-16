---
name: apply-section-brand-accents
description: Apply the refined home About-section brand accent recipe (panel navy + low-opacity metallic gradient, champagne gold icons/borders/kickers, Performance gradient card border tokens, blue highlights) to the currently selected section only.
---

# APPLY SECTION BRAND ACCENTS — SELECTED SECTION ONLY

Apply the same brand accent treatment used on the home **About** section to the currently selected section.

This is a **color polish pass**, not a redesign and not a full-page retheme.

Use the global theme in `src/index.css` (`@theme` + `:root`) as the only color source of truth.

## Scope

- Work **only** on the selected section (its component + its route CSS, e.g. `src/css/home.css`).
- Do **not** change layout, spacing, typography sizes, images, content, GSAP timing, or interactions.
- Do **not** recolor the whole site or shared global components unless the selection is specifically those components.
- Prefer existing tokens (`bg-bg-section`, `text-accent`, `fill-accent`, `border-accent`, `text-primary-light`, `var(--gradient-*)`, etc.). Do not invent new hex colors when a token exists.

## Recipe (mirror the About section)

Apply these patterns where the selected section has equivalent elements:

### 1. Section / panel background

- Base: `bg-bg-section` (`#08111F`) or keep `bg-ink` / `bg-bg-main` if that is already the section shell.
- Optional metallic wash (like About panel): a `::before` overlay with **low opacity (about 15–25%)** using the DESCOM metallic stops:

```css
background-image: linear-gradient(
  180deg,
  var(--bg-section) 0%,
  var(--primary-dark) 38%,
  var(--primary) 62%,
  var(--primary-light) 82%,
  var(--text-blue) 100%
);
```

- Keep content above the overlay with `relative z-10`.
- Soft ambient glows: `var(--glow-blue-soft)` — never old electric blue / purple (`#1d52e5`, `#afc2f6`, violet, fuchsia).

### 2. Watermark / kicker labels (large faded words)

- Champagne gold at low opacity: `text-accent/30` (or about `/25`–`/30`).
- Do not leave them as gray/white watermarks if the section uses this pattern.

### 3. Titles and body

- Main headings: `text-text-primary` (`#F8FAFC`)
- Body / supporting copy: `text-text-secondary` (`#B9C5CE`)
- Highlighted phrase in a title (italic mark): `text-primary-light` (`#4CB8DF`)
- Hand-drawn / SVG underline under highlights: champagne gold (`text-accent` / `fill-accent` on the underline mark). Scope underline gold to this section/page if needed so other pages are not affected.

### 4. Cards / featured boxes

- Background: `bg-bg-card` or `bg-bg-card/75` (`#0C1B2E`)
- Keep existing radius, padding, blur, and inset highlight shadows
- Optional stronger CTA card: `background-image: var(--gradient-brand)` — only if the selected card is meant to feel like a primary feature block

**Choose the border style that matches the section’s existing card pattern:**

#### A. Solid premium edge (About-style)

- Border: `border-accent` (champagne gold) — e.g. `border-2 border-accent`

#### B. Gradient frame (Performance-style) — reuse for service / feature cards with `p-0.5` gradient borders

Use the global tokens from `src/index.css` (do not re-invent the gradient):

```css
background-image: var(--gradient-card-border);
box-shadow: var(--shadow-card-border);
```

- Technique: outer wrapper `rounded-[30px] p-0.5` + inner body `rounded-[28px] bg-bg-card` (or `bg-ink`) so the gradient shows as a thin frame
- Recipe: cyan/primary-light highlight on the top-right edge + champagne gold bloom at the bottom-left + **low-opacity** gold outer glow (`--shadow-card-border`, ~12% accent)
- Photo / media frames that use the same pattern: `var(--gradient-card-border-photo)` + `var(--shadow-card-border)`
- On hover, if the section already clears the border, also clear the glow (`box-shadow: none`)
- Replace legacy periwinkle frames (`#afc2f6` / `#1d52e5` gradients) with these tokens

### 5. Icons (checks, bullets, small SVG icons)

- Fill / stroke: champagne gold — `fill-accent` or `text-accent`
- Do not leave silver/mist (`fill-mist`) on role/list icons when applying this recipe

### 6. Interactive blues (keep limited)

- Buttons, orbs, active UI: `primary` / `primary-dark` / `join` / `join-hover` tokens
- Gold stays limited to accents (kickers, icons, borders, underlines, small highlights)

## Do not

- Add gold everywhere — keep the ~3% accent balance
- Change structure or invent new UI
- Hardcode old purple/periwinkle/electric-blue values
- Rewrite animation behavior (only swap color values if GSAP animates a color)

## Verify

1. Search the selected section for `purple`, `violet`, `fuchsia`, `#1d52e5`, `#afc2f6`, and other legacy colors.
2. Confirm icons, borders, kickers, panel wash, and text use the tokens above.
3. Confirm layout/spacing/animation are unchanged.
4. Summarize files + which accent properties were updated.

### Extra context

Any text after this command is additional context (target section, component name, notes). Use it if provided.
