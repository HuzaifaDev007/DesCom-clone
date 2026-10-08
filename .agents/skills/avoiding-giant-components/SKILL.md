---
name: avoiding-giant-components
description: Prevents oversized React components by splitting responsibilities. Use when a file grows large, hard to scan, or mixes unrelated UI concerns.
---

# Avoiding giant components

## Split signals
- File is hard to understand in one screen
- Multiple unrelated sections, effects, or data concerns
- JSX nests deeply with repeated blocks

## Actions
- Extract sections into components under `components/`
- Extract state/effects into `hooks/`
- Extract pure logic into `lib/`
- Keep pages as orchestrators

## Checklist
- [ ] Page mostly composes, lightly wires
- [ ] No single file owning routing + fetch + animation + three sections of markup
