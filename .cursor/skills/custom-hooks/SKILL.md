---
name: custom-hooks
description: Extracts shared React state and effects into custom hooks. Use when duplicating useEffect/useState logic or integrating libraries like GSAP in React.
---

# Custom hooks

## Rules
- Shared stateful logic → `src/hooks/useSomething.ts`
- Hooks start with `use` and return a small, stable API (e.g. `{ ref }`)
- Example in this repo: `useGsapFadeIn`

## Checklist
- [ ] Hook has no JSX
- [ ] Hook is reusable from multiple components/pages
- [ ] Animation/library setup lives in the hook, not copied per page

## Don't
- Put GSAP timelines inline in every page when a hook can own them
- Return unstable new object identities unnecessarily when callers depend on referential equality (keep API small)
