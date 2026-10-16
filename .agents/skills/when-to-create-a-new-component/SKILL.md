---
name: when-to-create-a-new-component
description: Decides when to extract a new React component. Use when unsure whether to split JSX, add a file, or leave markup inline.
---

# When to create a new component

## Create a new component when
- UI is reused (or clearly will be) in more than one place
- A block has its own nameable responsibility (Navbar, Button, Hero)
- Extracting it makes the parent easier to read
- The block needs its own props API or local state/hooks

## Keep inline when
- One-off markup with no reuse and no clear name
- Extraction would only add indirection without clarity

## Placement
- Reusable → `src/components/`
- Route screen → `src/pages/`
