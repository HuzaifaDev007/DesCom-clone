# Lean Vite Starter + React Architecture Skills

Date: 2026-09-30  
Status: Approved for implementation planning

## Goal

Bootstrap `DesCom-clone` as a lean Vite + React (JavaScript) starter with Tailwind, GSAP, and React Router, plus a basic `pages/` / `components/` / `hooks/` layout wired to nine project-scoped Cursor skills for React component architecture.

## Decisions

| Decision | Choice |
|---|---|
| Scope | Starter + folder layout (not DesCom UI clone yet) |
| Stack | Vite + React (JS) + Tailwind CSS v4 + GSAP + React Router |
| Skills location | Project (`.cursor/skills/`) |
| Skills packaging | One skill per topic (9 skills) |
| Routing | React Router with real routes mapped to `pages/` |
| Approach | Lean Vite starter (not feature-sliced, not Next.js) |

## Stack

- Vite + React 19 (JavaScript only — no TypeScript)
- Tailwind CSS v4
- GSAP and `@gsap/react`
- React Router v7
- npm as the package manager

## Project layout

```
src/
  pages/          # Route-level screens only
  components/     # Reusable UI
  hooks/          # Custom hooks
  lib/            # Non-UI helpers / business logic
  App.jsx         # Router shell only
  main.jsx
  index.css       # Tailwind entry
.cursor/skills/   # Nine architecture skills
```

## Starter routes and content

| Route | Page | Purpose |
|---|---|---|
| `/` | `HomePage` | Landing with GSAP entrance via `useGsapFadeIn` |
| `/about` | `AboutPage` | Demonstrates page vs component separation |

**Sample reusable components:** `Navbar`, `Button`  
**Sample hook:** `useGsapFadeIn`  
**Sample lib helper:** small non-UI utility (e.g. format label) to show logic outside components  
**Docs:** README with `npm install` and `npm run dev`

## Architecture skills (project-scoped)

Each skill lives at `.cursor/skills/<name>/SKILL.md`, is auto-invokable, and maps guidance to this repo’s folders.

| Skill folder | Topic |
|---|---|
| `component-based-architecture` | Component-based architecture |
| `page-vs-component-separation` | Page vs component separation |
| `reusable-components` | Reusable components |
| `props-and-composition` | Props and composition |
| `custom-hooks` | Custom hooks |
| `avoiding-giant-components` | Avoiding giant components |
| `when-to-create-a-new-component` | When to create a new component |
| `keeping-business-logic-separate` | Keeping business logic separate from UI |
| `component-naming-conventions` | Component naming conventions |

Skill style: short checklists, do/don’t rules, and explicit mapping to `pages/`, `components/`, `hooks/`, and `lib/`. Not long essays.

## Out of scope (later)

- DesCom UI clone
- Auth
- CMS / API layer
- Tests
- TypeScript migration

## Success criteria

1. `npm install` and `npm run dev` succeed
2. Routes `/` and `/about` render correctly
3. Folder layout matches `pages/`, `components/`, `hooks/`, `lib/`
4. All nine skills exist under `.cursor/skills/`
5. Starter demonstrates composition, a custom hook, and logic outside UI

## Error handling

- Keep the starter minimal; no global error boundary required for v1
- Vite default HMR and console errors are sufficient for this bootstrap

## Testing

- Manual verification only for v1: app boots, routes work, GSAP fade runs on Home
- Automated tests deferred
