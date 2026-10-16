# Cinematic Earth Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `EarthHeroUpdated` into an Awwwards-grade cinematic hero planet (look + entrance + living idle) without changing hero layout or adding Three.js.

**Architecture:** Single fullscreen WebGL fragment shader with new `uIntro` uniform and richer look/motion derived from `uTime`. Harden the GL loop (DPR, gsap.ticker, IntersectionObserver, reduced motion) to match `EarthHero` performance patterns. `Hero.tsx` and `useHeroTextReveal.ts` stay unchanged.

**Tech Stack:** React, WebGL1 GLSL, GSAP ticker (already in repo), existing Blue Marble texture at `/textures/earth-day.jpg`.

## Global Constraints

- Keep DESCOM bottom-arc composition; no title/tagline layout changes.
- No Three.js / DOM star overlays / CSS filter on canvas.
- Soft starfield + depth haze; entrance ~2.0–2.2s then living idle.
- `prefers-reduced-motion` → final framed still (`uIntro = 1`, `uTime = 0`).
- Do not modify `EarthHero.tsx` in this pass.
- Animate only via shader uniforms / gsap.ticker draw — no CSS transform on canvas.

## File map

| File | Role |
|------|------|
| `src/components/EarthHeroUpdated.tsx` | Only file modified — shader + GL loop |
| `src/components/Hero.tsx` | Unchanged consumer |
| `docs/superpowers/specs/2026-10-08-cinematic-earth-hero-design.md` | Spec source |

### Task 1: Cinematic shader look + intro/idle uniforms

**Files:**
- Modify: `src/components/EarthHeroUpdated.tsx` (FRAGMENT_SRC + uniforms + draw loop)

**Interfaces:**
- Consumes: existing props `speed`, `textureUrl`, `mode`, `className`, `style`, `children`
- Produces: shader uniforms `uTime`, `uRes`, `uTex`, `uUseTex`, `uIntro` (0→1 over ~2.1s)

- [x] **Step 1: Replace FRAGMENT_SRC with cinematic pass**

Include in the fragment shader:

1. `uniform float uIntro;`
2. Light with tiny azimuth drift: `L = normalize(vec3(0.18 + 0.04*sin(uTime*0.11), 0.48, 0.86))`
3. Softer terminator: `day = smoothstep(-0.28, 0.55, ndl)`
4. Dual clouds: dense `fbm` layer + thin `noise` wisp layer; cloud opacity over texture ~0.55 (not 0.28)
5. Thicker fresnel rim + longer halo (`exp(-d * radius * 16.0)`), sun-side bias, soft rim pulse `1.0 + 0.04*sin(uTime*0.7)`
6. Near-planet depth haze: `exp(-d * radius * 6.0)` cool blue at low alpha behind/around limb
7. Starfield outside planet: cheap cell hash on `floor(uv * vec2(90, 50))`, faint, twinkle via `sin(uTime + id)`, multiply by `uIntro` and screen vignette
8. Intro mapping: `center.y` offset by `(1.0 - uIntro) * -0.08`; brightness `mix(0.35, 1.0, uIntro)`; halo/star gain × `uIntro`
9. Filmic grade: slightly stronger contrast + teal lift in shadows; keep dither
10. Cap `fbm` at 5 octaves (was 6) for fill-rate

- [x] **Step 2: Wire `uIntro` in the JS loop**

```ts
const uIntro = gl.getUniformLocation(program, "uIntro");
const INTRO_DUR = 2.1;
// in draw:
const elapsed = (now - start) / 1000;
const intro = reducedMotion
  ? 1
  : Math.min(1, elapsed / INTRO_DUR);
// ease out cubic
const u = 1 - Math.pow(1 - intro, 3);
gl.uniform1f(uIntro, u);
```

- [x] **Step 3: Harden GL loop (match EarthHero patterns)**

- Context: `powerPreference: "high-performance"`, try `desynchronized`
- DPR: `min(devicePixelRatio, 1.5)` × quality `0.55` desktop / `0.45` mobile (CSS upscale already in `home.css`)
- Drive draws with `gsap.ticker` when animating; skip if offscreen or `document.hidden`
- `IntersectionObserver` + `visibilitychange`
- `speed === 0` or reduced motion: draw once at `uIntro = 1`, `uTime = 0`
- Import `gsap` like `EarthHero.tsx`

- [ ] **Step 4: Visual QA**

Run: `npm run dev` — open homepage hero

Expected:
- ~2s planet rise + atmosphere bloom + stars fade in
- Then living clouds / light drift
- DesCom title/tagline composition unchanged
- Scroll parallax still works
- With reduced motion: static final frame

- [ ] **Step 5: Commit only if user requests**

Do not commit unless explicitly asked.
