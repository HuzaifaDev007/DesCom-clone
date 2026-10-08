---
name: page-vs-component-separation
description: Keeps route pages separate from reusable components. Use when adding routes, pages, or deciding where new React UI should live.
---

# Page vs component separation

## Rules
- Pages live in `src/pages/` and own the route, page-level layout, and data wiring for that screen
- Components live in `src/components/` and stay reusable across pages
- `App.tsx` only mounts router + shared chrome (e.g. Navbar)

## Checklist
- [ ] New route → new `*Page.tsx` under `pages/`
- [ ] UI reused on 2+ pages → `components/`
- [ ] Page does not export generic controls for other routes

## Don't
- Import one page from another page
- Put `BrowserRouter` / route table inside a page
