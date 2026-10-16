---
name: props-and-composition
description: Uses props and composition instead of inheritance for React UI. Use when designing component APIs, children slots, or nesting layouts.
---

# Props and composition

## Rules
- Compose with `children` and small props; do not use component inheritance
- Prefer explicit props over poking into children
- Variant props (`variant="primary"`) beat parallel near-duplicate components

## Checklist
- [ ] Parent passes data down; child does not reach into page globals
- [ ] Slots via `children` (or named props) for flexible layout
- [ ] No deep prop drilling when a page-level compose is clearer

## Don't
- Create `BaseButton` class hierarchies
- Hide critical behavior behind unclear boolean soup (`isSpecialAltNew`)
