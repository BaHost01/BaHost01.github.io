# Component Architecture Blueprint — `BAHOST01` Portfolio

> Cybernetic portfolio for a **Systems Architect & Low-Level Engineer**.
> Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Framer Motion · Lucide.

---

## 1. Design System (Tokens)

### Color Palette (`tailwind.config.ts → theme.extend.colors`)
| Token | Value | Usage |
|---|---|---|
| `obsidian.950` | `#070709` | Page substrate / base |
| `obsidian.900` | `#0D0E12` | Panels, glass base |
| `obsidian.800/700/600` | `#121319 …` | Elevation steps |
| `cyan` (`#00F0FF`) | accent primary | Live systems, primary CTA, links |
| `violet` (`#7000FF`) | accent secondary | Runtime/engine surfaces |
| `status.live` (`#22E58B`) | emerald | Operational |
| `status.exp` (`#FFB020`) | amber | Experimental |
| `status.idle` (`#5A6172`) | slate | Standby |
| `hairline` | `rgba(255,255,255,.08)` | Borders / dividers |

### Typography
- **Sans (headers/body):** Inter → `--font-sans`
- **Mono (metrics/code):** JetBrains Mono → `--font-mono`
- Loaded at runtime via `<link>` (no build-time font fetch → robust static export).

### Motion & Status
- Keyframes: `pulse-dot`, `sweep`, `flicker`, `blink`, `ticker`.
- All entrance animations are **transform/opacity only ⇒ zero layout shift (CLS = 0)**.
- `prefers-reduced-motion` globally neutralized.

---

## 2. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 App Router | RSC + static export for GitHub Pages |
| UI | React 19 | Concurrent features, modern API |
| Language | TypeScript (strict + `noUncheckedIndexedAccess`) | Safety at the bare-metal boundary |
| Styling | Tailwind CSS v3 | Design-token-driven, zero-runtime |
| Animation | Framer Motion v11 | Layout morphing, `whileInView` reveals |
| Icons | Lucide React | Consistent stroke geometry |
| Output | `output: "export"` | Pure static HTML/CSS/JS → Pages |

---

## 3. Directory Structure

```
.
├── app/
│   ├── layout.tsx          # Fonts, <head>, providers, overlays, Header/Footer
│   ├── page.tsx            # Section composition (server)
│   ├── globals.css         # Substrate, grid/scanline overlays, utilities
│   ├── icon.svg            # Favicon (node-net mark)
│   ├── robots.ts           # SEO robots (force-static)
│   └── sitemap.ts          # SEO sitemap (force-static)
├── components/
│   ├── providers/UIProvider.tsx     # scanline + command-palette state (context)
│   ├── background/
│   │   ├── NodeNet.tsx              # Interactive canvas vector field
│   ├── layout/
│   │   ├── Header.tsx               # Fixed nav, scanline toggle, ⌘K
│   │   └── Footer.tsx
│   ├── hero/
│   │   ├── Hero.tsx                 # Headline + actions (client, motion)
│   │   └── TelemetryHUD.tsx         # Live simulated metrics + sparkline
│   ├── about/Principles.tsx         # Engineering-principle cards
│   ├── skills/SkillMatrix.tsx       # Filterable category cards (NO bars/stars)
│   ├── projects/
│   │   ├── ProjectShowcase.tsx      # Grid + Reveal
│   │   └── ProjectCard.tsx          # Execution-flow + benchmarks
│   ├── timeline/TechTimeline.tsx    # Selectable capability trace
│   ├── research/Research.tsx        # Research & benchmarks
│   ├── contact/ContactCTA.tsx       # Channel open
│   ├── terminal/CommandPalette.tsx  # ⌘K / ~ interactive CLI
│   └── ui/
│       ├── Section.tsx              # Standard section shell
│       ├── Badge.tsx                # Status badge
│       └── Reveal.tsx               # Scroll reveal (transform-only)
├── lib/
│   ├── data.ts               # Typed single-source content model
│   └── utils.ts              # cn(), clamp(), seededRandom()
└── .github/workflows/deploy.yml   # Build + deploy to Pages
```

---

## 4. Component Tree (render-time)

```
<UIProvider>
 ├─ .bg-grid-overlay            (fixed CSS grid, fades at edges)
 ├─ <NodeNet/>                  (fixed canvas, pointer-reactive)
 ├─ .bg-scan-overlay            (fixed CRT scanlines, toggle via --scan-opacity)
 ├─ <Header/>                   (nav, scanline toggle, terminal trigger)
 ├─ <main>
 │   ├─ <Hero/>                 id=top
 │   │   └─ <TelemetryHUD/>
 │   ├─ <Principles/>           id=about
 │   ├─ <Section id=skills><SkillMatrix/></Section>
 │   ├─ <Section id=projects><ProjectShowcase/></Section>
 │   ├─ <Section id=timeline><TechTimeline/></Section>
 │   ├─ <Research/>             id=research
 │   └─ <ContactCTA/>           id=contact
 ├─ <Footer/>
 └─ <CommandPalette/>           (⌘K / ~ overlay)
```

---

## 5. Component Responsibility Matrix

| Component | Type | Responsibility | Key Props/State |
|---|---|---|---|
| `UIProvider` | client/context | Global toggles: `scanlines`, `paletteOpen` (drives `--scan-opacity`) | — |
| `NodeNet` | client | Canvas node-mesh; pointer gather; DPR/resize safe; reduced-motion | internal rAF loop |
| `Hero` | client | Entrance orchestration (stagger), CTA routing, opens palette | uses `useUI` |
| `TelemetryHUD` | client | Live clock/uptime/heap/req-sim + SVG sparkline | internal intervals |
| `SkillMatrix` | client | `active` filter; `AnimatePresence` card swap; tier legend | `active: string` |
| `ProjectCard` | server | Complexity tags, execution-flow callout, benchmark tiles, links | `project` |
| `TechTimeline` | client | `active` phase selection; animated detail panel | `active: number` |
| `CommandPalette` | client | Fuzzy command filter, keyboard nav, live output console | `query`, `output[]` |
| `Reveal` | client | `whileInView` transform-only reveal | `delay` |

---

## 6. Data Model (`lib/data.ts`)

Single typed source of truth — components stay declarative:
- `PROFILE` — handle, tagline, contact, status.
- `SKILL_CATEGORIES: SkillCategory[]` — `SkillTier` (`INTERNAL|EXPERT|ADVANCED|OPERATIONAL`) + `note` descriptors. **No numeric ratings.**
- `PROJECTS: Project[]` — `ComplexityTag[]`, `architecture: string[]` (flow), `highlights: ProjectMilestone[]`, `stack`, links.
- `TIMELINE: TimelineNode[]` — capability evolution phases.
- `RESEARCH: ResearchEntry[]` — research/OSS/protocol/bench with benchmarks.
- `TERMINAL_COMMANDS` — palette command registry.

---

## 7. Interaction & State Architecture

- **Global UI state** lives in `UIProvider` (scanlines + palette open). Overlay visibility is driven by a CSS custom property (`--scan-opacity`) so toggling never re-renders the overlay tree.
- **Command Palette** shortcuts: `Ctrl/⌘ + K` toggles; `` ` `` (Backquote) opens when not focused in an input; `Esc` closes; `↑/↓` navigate; `Enter` runs. Commands route to section scroll, GitHub, scanline toggle, or print to the live console (help / whoami / fetch-stats / contact / projects / skills / timeline / research / matrix / scanlines / clear).
- **Skill Matrix** filters by domain via local `active` state with layout-animated card swaps.
- **Timeline** uses local `active` index + `AnimatePresence` for the detail panel.

---

## 8. Animation Strategy (CLS-safe)

- React Server Components for static content; only interactive shells are client.
- Framer Motion used for: Hero stagger, `Reveal` (`whileInView`), `SkillMatrix`/`TechTimeline` layout morphing, palette mount.
- **Only `transform` & `opacity` animate** → no reflow, CLS = 0.
- `NodeNet` uses a single `requestAnimationFrame` loop with capped node count and `devicePixelRatio` clamping.

---

## 9. Rendering & Performance

- `next build` → `output: "export"` → pure static `out/`.
- First Load JS ≈ **154 kB** (React + Framer Motion + Lucide).
- Fonts via `<link>` (no blocking build fetch), `display=swap`.
- `images.unoptimized` (static export cannot run the optimizer).
- Targets: sub-second TTI, 100 Lighthouse Performance/Accessibility/SEO/Best-Practices.

---

## 10. Accessibility & SEO

- Semantic landmarks (`header`/`main`/`footer`/`section`), labelled controls.
- `prefers-reduced-motion` respected globally.
- Full `metadata` (OG, Twitter, keywords), `robots.ts`, `sitemap.ts`, `themeColor`.
- Visible focus rings; `aria-modal` on the command palette; decorative canvases `aria-hidden`.

---

## 11. Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes `out/` via `actions/deploy-pages`.
Local equivalents:
```bash
npm run build      # → out/
npx serve out      # preview
```

---

## 12. Extension Guide

- **Add a project:** push an object into `PROJECTS` in `lib/data.ts`.
- **Add a skill:** append to the relevant `SKILL_CATEGORIES` entry (tier + note).
- **Add a timeline phase / research entry:** extend `TIMELINE` / `RESEARCH`.
- **Add a terminal command:** append to `TERMINAL_COMMANDS` and handle it in `CommandPalette.run()`.
- **Recolor:** edit `tailwind.config.ts → theme.extend.colors`.
```
