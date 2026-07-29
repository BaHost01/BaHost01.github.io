# ⌁ BAHOST01 — Systems Architect & Low-Level Engineer Portfolio

A cybernetic, telemetry-grade developer portfolio built near the bare metal.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Framer Motion · Lucide.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export → ./out
npm run typecheck  # tsc --noEmit (strict)
npx serve out      # preview the production export
```

> Requires Node ≥ 18.18 (Node 20+ recommended for CI).

---

## What's Inside

| Section | Component | Signature Feature |
|---|---|---|
| Hero | `components/hero/Hero.tsx` | Cursor-reactive node-net + live **Telemetry HUD** |
| About | `components/about/Principles.tsx` | Engineering principles, not a bio |
| Skills | `components/skills/SkillMatrix.tsx` | Filterable matrix — **no bars, no stars** (tier descriptors) |
| Projects | `components/projects/ProjectCard.tsx` | Execution-flow callout + benchmark tiles |
| Timeline | `components/timeline/TechTimeline.tsx` | Selectable capability trace |
| Research | `components/research/Research.tsx` | Research / OSS / protocol / benchmarks |
| Terminal | `components/terminal/CommandPalette.tsx` | `⌘K` / `` ` `` interactive CLI |
| Background | `components/background/NodeNet.tsx` | Canvas vector field reacting to pointer |

---

## Commands (Command Palette — `⌘K` / `` ` ``)

`help` · `projects` · `skills` · `fetch-stats` · `timeline` · `research` · `contact` · `matrix` · `scanlines` · `whoami` · `clear`

Try toggling **CRT scanlines** from the header (or run `scanlines` in the terminal).

---

## Customization

All content lives in **`lib/data.ts`** (typed single source of truth):

- `PROFILE` — identity, contact, status.
- `SKILL_CATEGORIES` — domains, tiers, descriptors.
- `PROJECTS` — showcase cards (classification, architecture flow, benchmarks).
- `TIMELINE` / `RESEARCH` — evolution + signals.
- `TERMINAL_COMMANDS` — palette registry.

Theme tokens (colors, fonts, motion) live in **`tailwind.config.ts`**.

---

## Deploy to GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) builds and publishes `out/`:

1. Push to `main`.
2. Enable **Settings → Pages → Source: GitHub Actions**.
3. The workflow builds, exports, and deploys automatically.

For a manual/branch-root publish, run `npm run build` and serve the `out/` directory.

---

## Project Structure

```
app/          layout, page, globals.css, icon, robots, sitemap
components/   providers, background, layout, hero, about, skills,
              projects, timeline, research, contact, terminal, ui
lib/          data.ts (content model), utils.ts (cn/clamp/random)
```

---

## Performance & A11y

- Static export → sub-second TTI, zero server.
- Animations are transform/opacity only → **CLS = 0**.
- `prefers-reduced-motion` respected; full metadata/OG/robots/sitemap.
- Lighthouse targets: 100 Performance / Accessibility / SEO / Best-Practices.

---

*The previous static site is preserved under `archive/` for reference.*
