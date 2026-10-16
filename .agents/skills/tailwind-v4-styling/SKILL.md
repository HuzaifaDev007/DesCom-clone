---
name: tailwind-v4-styling
description: Applies Tailwind CSS v4 styling practices for this Vite app. Use when adding layout, utilities, @apply classes, theme tokens, or CSS in src/css or src/index.css.
---

# Tailwind CSS v4

## Rules
- Put Tailwind utilities in `@apply` inside the route or shared class in `src/css/`. Follow `.cursor/rules/css-structure.mdc` for the file and class name.
- JSX uses that class name only (`className="navbar"`). Do not put utility strings on elements.
- Theme tokens go in `@theme` inside `src/index.css`.
- Entry stays `@import "tailwindcss";` via `@tailwindcss/vite`. Do not add `tailwind.config.js` or the v3 directives `@tailwind base`, `components`, and `utilities`.
- Initial layout and color stay in Tailwind. GSAP owns the values that change over time.
- Use mobile-first responsive prefixes (`sm:`, `md:`, `lg:`) inside `@apply`.

## Checklist
- [ ] Visual styling uses Tailwind utilities inside a `src/css/` class
- [ ] Shared colors, spacing, and fonts are `@theme` tokens, not one-off arbitrary values
- [ ] Animated properties are not also driven by a CSS transition

## Don't
- Add a Tailwind v3 config or PostCSS setup for styles this plugin already handles
- Leave a long utility string in JSX when it belongs in the route class
