# Cinematic Earth Hero — Design Spec

**Date:** 2026-10-08  
**Status:** Approved in conversation; awaiting user review of this document  
**Primary file:** `src/components/EarthHeroUpdated.tsx`  
**Consumer:** `src/components/Hero.tsx` (unchanged API)

## Goal

Elevate the homepage hero’s first impression from “realistic WebGL Earth” to **Awwwards-grade cinematic planet**: cinema lighting/atmosphere/clouds, soft space depth, a short dramatic entrance (~1.5–2.5s), then a living idle — without breaking DESCOM brand composition or the 60fps budget.

## Constraints (locked)

- Keep the DESCOM **bottom-arc** composition (planet rising from black; title/tagline overlay unchanged).
- Approach: **fullscreen fragment-shader upgrade** only (no Three.js, no DOM star/glow overlays).
- Soft cinematic space: **faint starfield + subtle depth haze** (dark, not busy).
- Motion: **both** short entrance + living idle.
- Do not CSS-transform or filter the WebGL canvas; existing scroll parallax on `.home-hero-planet` stays.
- Respect `prefers-reduced-motion`: final framed still, no entrance/idle animation.
- Keep `EarthHero.tsx` as the older baseline; do not merge/replace it in this pass.
- `Hero.tsx` continues to pass `textureUrl="/textures/earth-day.jpg"`, `speed`, and className.

## Visual design

### Lighting

- Stronger key from upper-right.
- Softer terminator (day → night falloff).
- Richer ocean specular on the day side.
- Slight warm rim on the lit limb; cool fill in shadow.

### Atmosphere

- Thicker blue limb glow.
- Longer outer halo (Rayleigh-ish), stronger on the sun side.
- Subtle depth haze in the void near the planet.

### Clouds

- Two layers: dense base + thin wisps.
- Drift faster than ground rotation.
- More visible over the Blue Marble texture than today (current map path underplays clouds).

### Space

- Sparse, faint starfield (tiny points, low opacity, barely twinkling).
- Soft vignette so stars never compete with the **DesCom** wordmark.
- No busy nebulae or particle clutter.

### Grade

- Mild filmic contrast / teal-shadow lift for stills-grade presence (not flat sRGB).

## Motion design

### Entrance (~2.0–2.2s)

Driven by shader uniform `uIntro` (0 → 1), eased:

1. Planet starts slightly lower, dimmer, atmosphere closed.
2. Rises into the framed arc.
3. Atmosphere blooms; stars fade in; lighting settles.

Starts on mount, slightly ahead of / alongside the existing SplitText title reveal so the sequence reads as one continuous first impression.

### Living idle (after intro)

- Ground rotation: slow, premium (similar magnitude to current).
- Clouds: clearly faster differential drift.
- Light: tiny azimuth drift (breathing highlight, not disco).
- Stars: almost imperceptible twinkle.
- Atmosphere: soft rim intensity pulse (~few percent).

### Out of scope

- Mouse parallax on the GL layer.
- Coupling intro progress into `useHeroTextReveal` (text timing stays independent; visual sync via parallel timing).

## Architecture

### Ownership

| Piece | Responsibility |
|-------|----------------|
| `EarthHeroUpdated.tsx` | Shader look, RAF loop, intro uniforms, idle motion, reduced-motion, offscreen pause |
| `Hero.tsx` | Unchanged composition / props |
| `useHeroTextReveal.ts` | Unchanged title/tagline + planet wrapper parallax |
| `EarthHero.tsx` | Untouched baseline |

### New / used uniforms

- `uIntro` — entrance 0→1 (ease in JS or in-shader smoothstep of a time window).
- Existing `uTime`, `uRes`, `uTex`, `uUseTex` retained.
- Dual cloud layers and light drift derived from `uTime` (no required extra uniforms beyond `uIntro` unless tuning needs them).

### Sync model

- Earth intro: mount → ~2.2s.
- Text reveal: keep current timing (~0.3s delay into stagger).
- Result: planet arrives, brand locks in — one beat.

### Performance guardrails

- Cap device pixel ratio (1.5–2).
- Prefer `powerPreference: "high-performance"` (match hardened path from `EarthHero` where useful).
- Starfield: cheap hash / few samples — not another full fbm stack.
- Dual clouds: at most one extra noise pass, or reuse noise with offset.
- Pause `requestAnimationFrame` when hero is offscreen (`IntersectionObserver`).
- No CSS `filter` / `blur` / layout animation on the canvas.

## Success criteria

1. First ~2 seconds feel intentional and cinematic (not a static planet that “is already there”).
2. Idle never feels frozen: clouds and light read as alive at a glance.
3. Stars + haze add depth without clutter or competing with DesCom.
4. Desktop and mid-tier mobile stay smooth; reduced-motion users get a stable final frame.
5. Brand layout (title, tagline, arc framing) unchanged.

## Non-goals

- Replacing the hero copy layout or typography.
- Adding CTAs, badges, or overlays on the hero media.
- Migrating to Three.js / React Three Fiber.
- Rewriting `EarthHero.tsx` or deleting it.

## Implementation notes (for the plan)

1. Upgrade fragment shader look (lighting, atmosphere, clouds, stars, haze, grade).
2. Add `uIntro` + entrance mapping (center offset, brightness, halo, star opacity).
3. Wire idle differentials (cloud speed, light drift, rim pulse, star twinkle).
4. Harden GL loop (DPR, context attrs, IntersectionObserver pause, reduced motion).
5. Visual QA against homepage hero at desktop and mobile widths.
