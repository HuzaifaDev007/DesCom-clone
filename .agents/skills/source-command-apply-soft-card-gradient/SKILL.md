---
name: "source-command-apply-soft-card-gradient"
description: "Apply the soft cyan→navy card wash (--gradient-card-border-soft + translucent body + optional overlay clear) used on home-about-card and #performance-card-home to a selected card. Use when the user runs apply-soft-card-gradient."
---

# source-command-apply-soft-card-gradient

Use this skill when the user asks to run the source command `apply-soft-card-gradient`.

## Command Template

# APPLY SOFT CARD GRADIENT — SELECTED CARD ONLY

Apply the soft gradient card wash used on the home **About** card (`home-about-card`) and the **Home, Auto & Business** performance card (`#performance-card-home`) to the currently selected card.

This is a **card color polish**, not a redesign and not a full-section retheme.

Use the global theme in `src/index.css` (`@theme` + `:root`) as the only color source of truth.

## Scope

- Work **only** on the selected card (and its immediate outer/inner wrappers if needed).
- Prefer the card’s existing class or `id` for CSS selectors — do not restyle sibling cards in the same grid unless the user asked for all of them.
- Do **not** change layout, spacing, typography sizes, images, content, GSAP timing, or interactions.
- Do **not** invent new hex colors. Reuse existing tokens.

## Recipe (mirror About / Home performance card)

### 1. Outer frame

Use the soft mid-fade token (not the hard `--gradient-card-border`):

```css
background-image: var(--gradient-card-border-soft);
box-shadow: var(--shadow-card-border);
```

Structure (Performance-style frame):

- Outer: `overflow-hidden rounded-[30px] p-0.5` + soft gradient + shadow
- Inner body: `rounded-[28px]` so the gradient shows as a thin rim **and** washes through the translucent body

If the selected element is only an inner body, apply the soft gradient to its outer card wrapper and keep the body as the translucent fill.

### 2. Inner body (wash show-through)

```css
@apply bg-bg-card/75 backdrop-blur-[7px];
box-shadow: -2px -2px 10px 0 rgb(255 255 255 / 0.2) inset;
```

- Keep existing padding, radius, and content hierarchy.
- Opaque `bg-bg-card` blocks the wash — prefer `/75` so `--gradient-card-border-soft` reads through.

### 3. Blocking overlays

If the card has a resting `::before` (or similar) that paints a solid cover (`bg-main`, opaque navy, etc.):

- Set that overlay to `opacity: 0` (or transparent) in the resting state so the soft wash is visible.
- Preserve existing hover / reveal behavior if the card already fades that overlay to show a photo.

### 4. Hover / photo cards

If the card already clears the border on hover:

```css
background-image: linear-gradient(180deg, transparent 0%, transparent 100%);
box-shadow: none;
```

Keep that behavior. Do not remove photo hover reveals.

### 5. Token source (do not re-invent)

`--gradient-card-border-soft` and `--shadow-card-border` live in `src/index.css`.

If the soft token is missing, add it once globally (same definition as About), then reference it — do not paste a one-off gradient into the card CSS.

Reference definition:

```css
--gradient-card-border-soft:
  radial-gradient(
    140% 90% at 0% 100%,
    var(--accent-light) 0%,
    var(--accent) 10%,
    transparent 42%
  ),
  linear-gradient(
    230deg,
    var(--primary-light) 0%,
    color-mix(in srgb, var(--primary-light) 42%, var(--bg-section)) 24%,
    color-mix(in srgb, var(--primary-dark) 50%, var(--bg-section)) 52%,
    var(--bg-section) 78%
  );
```

## Do not

- Use hard `--gradient-card-border` for this wash (cyan→navy cut at 30% looks too harsh through translucent bodies)
- Recolor the whole section or sibling cards
- Change structure beyond adding an outer/inner split when required for the `p-0.5` frame
- Hardcode purple / periwinkle / electric-blue values
- Rewrite animation behavior (only adjust overlay opacity if it blocks the wash)

## Verify

1. Soft cyan glow at the highlight edge; mid fade into navy (no hard band).
2. Gold bloom only as the low-opacity corner accent from the token.
3. Layout, type, padding, and hover/photo behavior unchanged.
4. Summarize files + selectors updated.

### Extra context

Any text after this command is additional context (target card, class, id, notes). Use it if provided.
