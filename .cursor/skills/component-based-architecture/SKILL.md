---
name: component-based-architecture
description: Structures React UI as focused components with clear boundaries. Use when creating or refactoring React components, layouts, or feature UI in this repo.
---

# Component-based architecture

## Folder map
- `src/pages/` — route screens
- `src/components/` — reusable UI
- `src/hooks/` — shared React logic
- `src/lib/` — non-UI helpers

## Checklist
- [ ] One component = one clear UI responsibility
- [ ] Parents compose children; avoid monolith screens
- [ ] Shared UI extracted to `components/`
- [ ] Route-only wiring stays in `pages/`

## Do
- Split by responsibility (nav, button, section), not by file size alone
- Keep `App.tsx` as shell/router only

## Don't
- Dump unrelated UI into one file
- Put reusable UI only inside a page file
