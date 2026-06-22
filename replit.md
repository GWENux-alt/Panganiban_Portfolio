# Gwen Panganiban Portfolio

A world-class personal portfolio website for Jezimiel Gwen T. Panganiban, IT Graduate — built as a premium, award-level single-page application.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Build: esbuild (CJS bundle for API), Vite (frontend)

## Where things live

- `artifacts/portfolio/` — The portfolio frontend (React + Vite)
- `artifacts/portfolio/src/components/sections/` — All section components (Hero, About, Skills, Experience, Education, Projects, Certifications, Achievements, Testimonials, Contact)
- `artifacts/portfolio/src/components/` — Shared components (Navbar, Footer, LoadingScreen, ThemeProvider)
- `artifacts/portfolio/src/pages/Portfolio.tsx` — Main page orchestrator
- `artifacts/portfolio/src/index.css` — Theme (lavender-purple / soft-pink / rose-gold palette)
- `attached_assets/GWEN_1782097772662.jpeg` — Gwen's professional photo (used in Hero + About)
- `artifacts/api-server/` — Express backend

## Architecture decisions

- Presentation-first SPA: no backend needed for the portfolio itself; all sections are static with rich Framer Motion animations
- Contact form currently simulates API call (2s delay + success state) — wire to a real API/EmailJS for production
- Dark mode via `ThemeProvider` toggling `.dark` class on `<html>` + `localStorage` persistence
- Photo imported via `@assets/` Vite alias pointing to `attached_assets/`
- Particle canvas uses requestAnimationFrame for performant background animation

## Product

A full personal portfolio with:
- **Loading screen** with animated logo + progress bar
- **Hero** with typing animation, particle canvas, floating stats, professional photo
- **About** with photo, bio, timeline, interests, contact info
- **Skills** with animated progress bars across 6 categories + soft skills
- **Experience** timeline (Pangan Law Office + Lazada)
- **Education** (BSIT — Pamantasan ng Cabuyao)
- **Projects** with filter + detail modal (Vigilare, Resort Mgmt, Patient Records, Cashify)
- **Certifications** (3 Google certifications)
- **Achievements** animated stats
- **Testimonials** with carousel
- **Contact** with form validation + simulated submission
- **Footer** with all links + scroll-to-top
- Full dark/light mode toggle

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Photo path uses `@assets/GWEN_1782097772662.jpeg` (Vite alias to `attached_assets/`)
- Contact form submission is simulated — needs real backend/EmailJS integration for production
- `index.css` must have Google Fonts `@import url(...)` as the very first line
- Always run `pnpm run typecheck:libs` after changing lib/* packages

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
