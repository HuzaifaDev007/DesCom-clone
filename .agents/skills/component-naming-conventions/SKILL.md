---
name: component-naming-conventions
description: Enforces React naming conventions for components, pages, and hooks in this repo. Use when creating files, exporting components, or renaming UI modules.
---

# Component naming conventions

## Rules
- Components/pages: PascalCase files and exports — `Button.tsx`, `HomePage.tsx`
- Pages end with `Page` — `HomePage`, `AboutPage`
- Hooks: `use` camelCase — `useGsapFadeIn.ts`
- Lib helpers: camelCase named exports — `formatLabel.ts`
- Prefer named exports for components/hooks/helpers; `App.tsx` may use default export as the app shell

## Checklist
- [ ] Filename matches primary export
- [ ] No ambiguous names like `Item`, `Stuff`, `Helper1`
