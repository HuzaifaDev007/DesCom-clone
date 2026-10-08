---
name: keeping-business-logic-separate
description: Keeps business and formatting logic out of React UI files. Use when writing formatters, data transforms, or non-visual helpers alongside components.
---

# Keeping business logic separate from UI

## Placement
- Pure transforms/helpers → `src/lib/`
- React state/effects → `src/hooks/`
- JSX and styling → `src/components/` or `src/pages/`

## Checklist
- [ ] Components call helpers; they do not embed complex algorithms
- [ ] `formatLabel`-style utilities live in `lib/`
- [ ] UI files stay readable as structure + composition

## Don't
- Bury parsing, pricing, or formatting rules inside JSX
- Import React into `lib/` helpers
