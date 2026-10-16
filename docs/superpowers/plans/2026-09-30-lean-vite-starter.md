# Lean Vite Starter + Architecture Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a Vite + React (JS) + Tailwind + GSAP + React Router starter with `pages/` / `components/` / `hooks/` / `lib/` layout and nine project Cursor skills for component architecture.

**Architecture:** Thin Vite SPA. `App.jsx` is router-only. Route screens live in `src/pages/`. Reusable UI in `src/components/`. Shared React state/effects in `src/hooks/`. Non-UI logic in `src/lib/`. Nine short skills under `.cursor/skills/` encode those boundaries for future agents.

**Tech Stack:** Vite, React 19 (JavaScript), Tailwind CSS v4 (`@tailwindcss/vite`), GSAP + `@gsap/react`, React Router v7, npm

## Global Constraints

- JavaScript only — no TypeScript
- npm as the package manager
- Project skills only under `.cursor/skills/` (not personal skills)
- One skill per architecture topic (exactly 9)
- Manual verification only — no automated test suite in v1
- Do not build DesCom UI clone, auth, CMS, API, or TypeScript
- Preserve existing `docs/superpowers/` content
- Spec: `docs/superpowers/specs/2026-09-30-lean-vite-starter-design.md`

## File Structure

| Path | Responsibility |
|---|---|
| `package.json` | Scripts and dependencies |
| `vite.config.js` | Vite + React + Tailwind plugins |
| `index.html` | SPA HTML entry |
| `src/main.jsx` | React mount |
| `src/index.css` | Tailwind import |
| `src/App.jsx` | BrowserRouter + Routes only |
| `src/lib/formatLabel.js` | Non-UI string helper |
| `src/hooks/useGsapFadeIn.js` | GSAP fade-in on mount |
| `src/components/Button.jsx` | Reusable button |
| `src/components/Navbar.jsx` | Shared nav links |
| `src/pages/HomePage.jsx` | `/` — hero + GSAP demo |
| `src/pages/AboutPage.jsx` | `/about` — page/component demo |
| `.cursor/skills/*/SKILL.md` | Nine architecture skills |
| `README.md` | Install and run instructions |
| `.gitignore` | node_modules, dist, env secrets |

---

### Task 1: Scaffold Vite React app and install stack

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/index.css`, `src/App.jsx`, `src/assets/` (optional vite svg), `.gitignore`
- Preserve: `docs/superpowers/**`

**Interfaces:**
- Consumes: none
- Produces: runnable Vite app with React, Tailwind v4, GSAP, `@gsap/react`, `react-router` installed

- [ ] **Step 1: Scaffold Vite React (JS) without wiping docs**

Because the repo already has `docs/`, scaffold into a temp folder then move app files up:

```powershell
npm create vite@latest _scaffold -- --template react
Copy-Item -Path _scaffold\* -Destination . -Recurse -Force
Remove-Item -Recurse -Force _scaffold
Remove-Item -Recurse -Force src\App.css -ErrorAction SilentlyContinue
# Remove default TS-unrelated cruft if any; keep index.css for rewrite
```

Expected: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx` exist; `docs/superpowers` still present.

- [ ] **Step 2: Install Tailwind, GSAP, React Router**

```powershell
npm install
npm install gsap @gsap/react react-router
npm install -D tailwindcss @tailwindcss/vite
```

Expected: packages appear in `package.json` dependencies/devDependencies.

- [ ] **Step 3: Configure Vite + Tailwind**

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

Ensure `src/main.jsx` imports `./index.css` and mounts `<App />`.

Ensure `.gitignore` includes at least:

```
node_modules
dist
.DS_Store
*.local
.env
.env.*
```

- [ ] **Step 4: Verify install builds**

```powershell
npm run build
```

Expected: Vite build succeeds (exit 0). Temporary default App content is fine until Task 5.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json vite.config.js index.html src .gitignore
git commit -m "chore: scaffold Vite React with Tailwind GSAP and Router"
```

---

### Task 2: Add lib helper and folder skeleton

**Files:**
- Create: `src/lib/formatLabel.js`
- Create: empty keepers if needed — prefer real files over empty dirs: `src/components/.gitkeep` only if no components yet (skip if Task 3 follows immediately in same session; still create `lib` now)
- Modify: none required beyond creating `src/lib/formatLabel.js`

**Interfaces:**
- Consumes: none
- Produces: `formatLabel(value: string) => string` — trims, collapses whitespace, title-cases words

- [ ] **Step 1: Create `src/lib/formatLabel.js`**

```js
/**
 * Non-UI helper: normalize a label for display.
 * Keep business/formatting logic here — not inside components.
 */
export function formatLabel(value) {
  if (value == null) return ''
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
```

- [ ] **Step 2: Smoke-check the helper in Node**

```powershell
node --input-type=module -e "import { formatLabel } from './src/lib/formatLabel.js'; console.log(formatLabel('  hello   world '))"
```

Expected stdout: `Hello World`

- [ ] **Step 3: Commit**

```powershell
git add src/lib/formatLabel.js
git commit -m "feat: add formatLabel lib helper outside UI"
```

---

### Task 3: Reusable `Button` and `Navbar` components

**Files:**
- Create: `src/components/Button.jsx`
- Create: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `react-router` `Link` (Navbar)
- Produces:
  - `Button({ children, variant = 'primary', type = 'button', onClick, className = '' })`
  - `Navbar()` — links to `/` and `/about`

- [ ] **Step 1: Create `src/components/Button.jsx`**

```jsx
const variants = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
}

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
}) {
  const styles = variants[variant] ?? variants.primary

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/Navbar.jsx`**

```jsx
import { Link, NavLink } from 'react-router'

export function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'
    }`

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-sm font-semibold tracking-tight text-zinc-900">
          DesCom
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Commit**

```powershell
git add src/components/Button.jsx src/components/Navbar.jsx
git commit -m "feat: add reusable Button and Navbar components"
```

---

### Task 4: Custom GSAP fade-in hook

**Files:**
- Create: `src/hooks/useGsapFadeIn.js`

**Interfaces:**
- Consumes: `gsap`, `@gsap/react` (`useGSAP`), `react` (`useRef`)
- Produces: `useGsapFadeIn()` → `{ ref }` where `ref` is attached to the animated element

- [ ] **Step 1: Create `src/hooks/useGsapFadeIn.js`**

```js
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function useGsapFadeIn() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      )
    },
    { scope: ref },
  )

  return { ref }
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/hooks/useGsapFadeIn.js
git commit -m "feat: add useGsapFadeIn custom hook"
```

---

### Task 5: Pages, router shell, and wire composition

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/AboutPage.jsx`
- Modify: `src/App.jsx` (replace default Vite content)
- Modify: `index.html` title to `DesCom` if still default

**Interfaces:**
- Consumes: `Navbar`, `Button`, `useGsapFadeIn`, `formatLabel`, `react-router` (`BrowserRouter`, `Routes`, `Route`)
- Produces: `/` → `HomePage`, `/about` → `AboutPage`

- [ ] **Step 1: Create `src/pages/HomePage.jsx`**

```jsx
import { Link } from 'react-router'
import { Button } from '../components/Button'
import { useGsapFadeIn } from '../hooks/useGsapFadeIn'
import { formatLabel } from '../lib/formatLabel'

export function HomePage() {
  const { ref } = useGsapFadeIn()
  const headline = formatLabel('descom starter')

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div ref={ref} className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          DesCom
        </p>
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-zinc-900">
          {headline}
        </h1>
        <p className="max-w-lg text-base text-zinc-600">
          Lean Vite + React starter with Tailwind, GSAP, and clear page/component
          boundaries.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Link to="/about">View about</Link>
          </Button>
          <Button variant="secondary" type="button">
            Secondary action
          </Button>
        </div>
      </div>
    </main>
  )
}
```

Note: If nesting `Link` inside `button` causes a11y lint issues, switch to `Button` as a styled `Link` via `className` on `Link` instead — prefer:

```jsx
<Link
  to="/about"
  className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
>
  View about
</Link>
```

and keep `Button` for the secondary control only. Implementer should use the Link-styled approach for navigation CTAs (no interactive nesting).

Updated Home CTA block to use:

```jsx
<div className="flex flex-wrap gap-3">
  <Link
    to="/about"
    className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
  >
    View about
  </Link>
  <Button variant="secondary" type="button">
    Secondary action
  </Button>
</div>
```

- [ ] **Step 2: Create `src/pages/AboutPage.jsx`**

```jsx
import { Button } from '../components/Button'
import { formatLabel } from '../lib/formatLabel'

export function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        {formatLabel('about this starter')}
      </h1>
      <p className="max-w-lg text-zinc-600">
        This page owns the route. Reusable pieces like Button live in
        components/. Formatting logic lives in lib/.
      </p>
      <Button variant="secondary" type="button">
        Sample button
      </Button>
    </main>
  )
}
```

- [ ] **Step 3: Replace `src/App.jsx` with router shell**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
```

Set `index.html` `<title>` to `DesCom`.

- [ ] **Step 4: Manual verify**

```powershell
npm run build
npm run dev
```

Expected:
- Build exit 0
- Dev server serves `/` with fade-in headline “Descom Starter” (from `formatLabel`)
- Navbar navigates to `/about` and back
- No console errors related to GSAP/React Router

Stop the dev server after checking.

- [ ] **Step 5: Commit**

```powershell
git add src/pages src/App.jsx index.html
git commit -m "feat: wire pages, router, and composition demo"
```

---

### Task 6: Add nine project architecture skills

**Files:**
- Create: `.cursor/skills/component-based-architecture/SKILL.md`
- Create: `.cursor/skills/page-vs-component-separation/SKILL.md`
- Create: `.cursor/skills/reusable-components/SKILL.md`
- Create: `.cursor/skills/props-and-composition/SKILL.md`
- Create: `.cursor/skills/custom-hooks/SKILL.md`
- Create: `.cursor/skills/avoiding-giant-components/SKILL.md`
- Create: `.cursor/skills/when-to-create-a-new-component/SKILL.md`
- Create: `.cursor/skills/keeping-business-logic-separate/SKILL.md`
- Create: `.cursor/skills/component-naming-conventions/SKILL.md`

**Interfaces:**
- Consumes: folder conventions from this plan
- Produces: auto-invokable skills (no `disable-model-invocation`) mapping each topic to `pages/`, `components/`, `hooks/`, `lib/`

- [ ] **Step 1: Write each SKILL.md** (create all nine files with the contents below)

#### `.cursor/skills/component-based-architecture/SKILL.md`

```markdown
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
- Keep `App.jsx` as shell/router only

## Don't
- Dump unrelated UI into one file
- Put reusable UI only inside a page file
```

#### `.cursor/skills/page-vs-component-separation/SKILL.md`

```markdown
---
name: page-vs-component-separation
description: Keeps route pages separate from reusable components. Use when adding routes, pages, or deciding where new React UI should live.
---

# Page vs component separation

## Rules
- Pages live in `src/pages/` and own the route, page-level layout, and data wiring for that screen
- Components live in `src/components/` and stay reusable across pages
- `App.jsx` only mounts router + shared chrome (e.g. Navbar)

## Checklist
- [ ] New route → new `*Page.jsx` under `pages/`
- [ ] UI reused on 2+ pages → `components/`
- [ ] Page does not export generic controls for other routes

## Don't
- Import one page from another page
- Put `BrowserRouter` / route table inside a page
```

#### `.cursor/skills/reusable-components/SKILL.md`

```markdown
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
```

#### `.cursor/skills/props-and-composition/SKILL.md`

```markdown
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
```

#### `.cursor/skills/custom-hooks/SKILL.md`

```markdown
---
name: custom-hooks
description: Extracts shared React state and effects into custom hooks. Use when duplicating useEffect/useState logic or integrating libraries like GSAP in React.
---

# Custom hooks

## Rules
- Shared stateful logic → `src/hooks/useSomething.js`
- Hooks start with `use` and return a small, stable API (e.g. `{ ref }`)
- Example in this repo: `useGsapFadeIn`

## Checklist
- [ ] Hook has no JSX
- [ ] Hook is reusable from multiple components/pages
- [ ] Animation/library setup lives in the hook, not copied per page

## Don't
- Put GSAP timelines inline in every page when a hook can own them
- Return unstable new object identities unnecessarily when callers depend on referential equality (keep API small)
```

#### `.cursor/skills/avoiding-giant-components/SKILL.md`

```markdown
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
```

#### `.cursor/skills/when-to-create-a-new-component/SKILL.md`

```markdown
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
```

#### `.cursor/skills/keeping-business-logic-separate/SKILL.md`

```markdown
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
```

#### `.cursor/skills/component-naming-conventions/SKILL.md`

```markdown
---
name: component-naming-conventions
description: Enforces React naming conventions for components, pages, and hooks in this repo. Use when creating files, exporting components, or renaming UI modules.
---

# Component naming conventions

## Rules
- Components/pages: PascalCase files and exports — `Button.jsx`, `HomePage.jsx`
- Pages end with `Page` — `HomePage`, `AboutPage`
- Hooks: `use` camelCase — `useGsapFadeIn.js`
- Lib helpers: camelCase named exports — `formatLabel.js`
- Prefer named exports for components/hooks/helpers; `App.jsx` may use default export as the app shell

## Checklist
- [ ] Filename matches primary export
- [ ] No ambiguous names like `Item`, `Stuff`, `Helper1`
```

- [ ] **Step 2: Verify nine skill folders exist**

```powershell
Get-ChildItem .cursor\skills -Directory | Select-Object -ExpandProperty Name
```

Expected names (exactly these nine):

```
avoiding-giant-components
component-based-architecture
component-naming-conventions
custom-hooks
keeping-business-logic-separate
page-vs-component-separation
props-and-composition
reusable-components
when-to-create-a-new-component
```

- [ ] **Step 3: Commit**

```powershell
git add .cursor/skills
git commit -m "docs: add nine React architecture project skills"
```

---

### Task 7: README and final verification

**Files:**
- Create or replace: `README.md`

**Interfaces:**
- Consumes: working app from Tasks 1–5
- Produces: documented install/run commands

- [ ] **Step 1: Write `README.md`**

```markdown
# DesCom Clone

Lean Vite + React (JavaScript) starter with Tailwind CSS, GSAP, and React Router.

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Structure

- `src/pages/` — route screens
- `src/components/` — reusable UI
- `src/hooks/` — custom hooks
- `src/lib/` — non-UI helpers
- `.cursor/skills/` — React architecture skills for agents

## Routes

- `/` — Home
- `/about` — About
```

- [ ] **Step 2: Final verification checklist**

```powershell
npm run build
Test-Path src/pages/HomePage.jsx, src/pages/AboutPage.jsx, src/components/Button.jsx, src/components/Navbar.jsx, src/hooks/useGsapFadeIn.js, src/lib/formatLabel.js
(Get-ChildItem .cursor\skills -Directory).Count
```

Expected:
- Build succeeds
- All listed paths `True`
- Skill directory count `9`

- [ ] **Step 3: Commit**

```powershell
git add README.md
git commit -m "docs: add starter README with setup and structure"
```

---

## Spec coverage self-review

| Spec requirement | Task |
|---|---|
| Vite + React JS + Tailwind v4 + GSAP + Router | Task 1 |
| `pages/`, `components/`, `hooks/`, `lib/` | Tasks 2–5 |
| Routes `/` and `/about` | Task 5 |
| `Navbar`, `Button` | Task 3 |
| `useGsapFadeIn` | Task 4 |
| `formatLabel` lib helper | Task 2 |
| Nine project skills | Task 6 |
| README | Task 7 |
| Manual verify / no automated tests | Tasks 5 & 7 |
| Out of scope items not built | Honored globally |

## Placeholder / consistency notes

- Home CTA uses styled `Link` (not `Button` wrapping `Link`) to avoid nested interactives
- React Router imports from `react-router` (v7 single package) consistently
- Hook export name `useGsapFadeIn` matches filename and HomePage import
