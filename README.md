# ITZFIZZ — Scroll-Driven Hero Section

A premium scroll-driven hero that recreates the *Paraschaturvedi car-scroll-animation* effect with a light/agency theme. Built with **Vite + React (plain JavaScript)**, **Tailwind CSS (v4)** and **GSAP + ScrollTrigger**.

> **Note:** This project is intentionally independent from the original `car-scroll-animation/` (Next.js) implementation in this repository. Both deliverables remain untouched.

## Live Demo

https://jayasimha45.github.io/itzfizz-scroll-hero/

## GitHub Repository

https://github.com/jayasimha45/itzfizz-scroll-hero

## Getting Started

### Prerequisites

- Node.js 20+ (v24.14.0 was used during development)
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:5173` by default.

### Build

```bash
npm run build
```

This outputs a production build to the `dist/` directory. The build uses the `VITE_BASE` environment variable for GitHub Pages sub-path deployments (`VITE_BASE=/<repo-name>/`).

### Preview

```bash
npm run preview
```

Serves the `dist/` build locally at `http://localhost:4173`.

## Architecture

- `src/components/Navbar.jsx` — fixed header with mobile hamburger menu (closes on Escape, navigation and viewport resize)
- `src/components/Hero.jsx` — pinned scroll-driven hero with intro timeline and scrubbed drive (GSAP ScrollTrigger)
- `src/components/CarVisual.jsx` — hand-authored inline SVG coupe (wheels use `.wheel` for rotation, charge port uses `.car-port`)
- `src/components/BatteryGauge.jsx` — charge gauge at the bottom-left of the stage; drains while driving, refills at the charger
- `src/components/ChargeStation.jsx` — the charger the car parks in front of at the end of the scrub
- `src/components/Stats.jsx` — impact metrics in a semantic `dl` grid
- `src/components/ScrollIndicator.jsx` — bottom scroll indicator with bob animation
- `src/components/ScrollProgress.jsx` — thin right-edge vertical progress bar driven by document scroll
- `src/components/TransitionSection.jsx` — "Built for digital growth" transition with capabilities grid
- `src/components/Footer.jsx` — About + Contact sections with reveal-on-scroll
- `src/data/content.js` — single source of truth for all copy, stats and captions
- `src/lib/gsap.js` — GSAP + ScrollTrigger registration
- `src/lib/ui.js` — shared button class helpers
- `src/hooks/usePrefersReducedMotion.js` — `prefers-reduced-motion` tracking
- `src/hooks/useRevealOnScroll.js` — reveal-on-scroll animations

## Design

- Background: `#f6f6f4` (canvas), white panels, black text
- Type: [Manrope](https://fonts.google.com/specimen/Manrope) (display/headings) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- Motion: transforms and opacity only; `prefers-reduced-motion` parks the car, hides the drive captions and keeps all content visible
- Responsive: fits inside a single viewport (100svh) across breakpoints; tuned for short/landscape viewports
- Accessibility: skip link, semantic HTML, focus-visible states, `aria-expanded`/`aria-controls` on mobile menu

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included for GitHub Pages. It:

1. Installs dependencies with `npm ci`
2. Builds with `VITE_BASE` derived from `vars.VITE_BASE` or the repository name
3. Creates `dist/.nojekyll` and uploads the artifact
4. Deploys to GitHub Pages

To deploy, push to the default branch and configure Pages to use "GitHub Actions".

## Notes

- The car SVG is hand-authored path data. A human visual pass is recommended to confirm the exact shape matches the intended reference.
- No console errors or horizontal overflow in the audited breakpoints.
- Animations are driven by ScrollTrigger (`scrub: 1`, `pin: true`) over ~300vh of scroll distance.
- Counters were intentionally omitted (no number animations) per this build.

## Scroll Story

The hero scrub tells a short narrative in three beats:

| Progress | Beat |
| --- | --- |
| `0.00 – 0.78` | The car drives left → right. The gauge drains from 100% to 15%, the wheels spin, the road markings drift, and the copy fades out as three captions cross-fade in turn. |
| `0.78` | The car pulls up at the charger and settles level. |
| `0.84 – 1.00` | It plugs in: the charger fades up, the halo pulses, the front-fender charge port lights up, the gauge stripes animate and refills to 100%. |

Everything reverses on scroll-up. Under `prefers-reduced-motion` the pin, drive and charger are all skipped, and the gauge rests at 100%.
