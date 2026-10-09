---
name: reusable-components
description: Prefers shared reusable React components over one-off copies. Use when duplicating UI, extracting shared controls, or building design-system-like pieces.
---

# Reusable components

## Rules
- If the same UI appears twice, extract to `src/components/`
- Prefer props (`variant`, `children`) over forked copies
- Keep components presentational when possible; call hooks/lib from pages or thin wrappers

## Checklist
- [ ] No copy-pasted JSX blocks across pages
- [ ] Public props are minimal and documented by usage
- [ ] Component name describes UI role (`Button`, `Navbar`)

## Don't
- Encode page-specific copy or routes inside a supposedly generic component (pass via props/children instead)
