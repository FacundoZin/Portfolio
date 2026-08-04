# AGENTS.md — PortfolioZinFacundo

Single-page Next.js 15 portfolio (App Router, Tailwind CSS 4, pnpm).

## Commands

```bash
pnpm dev        # dev server (http://localhost:3000)
pnpm build      # next build
pnpm lint       # next lint
pnpm start      # next start
```

## Non-obvious config

- `@/*` path alias maps to repo root (e.g. `@/components/...`).
- Tailwind CSS v4 with `@tailwindcss/postcss` (NOT v3 PostCSS plugin). CSS variables use `oklch()`.
- pnpm, not npm. Lockfile is `pnpm-lock.yaml`.
- `next.config.mjs` is empty — image optimization is enabled by default. Uses `next/image` (`<Image>`) in IntroSection and ExperienceSection.

## Architecture

- **`app/`** — Next.js App Router entry (layout.tsx, page.tsx, globals.css)
- **`components/`** — LanguageToggle, TechTicker, Terminal, HtmlLang, ThemeProvider, TopBar, SideNav, SectionObserver, FooterInteractive
- **`components/sections/`** — IntroSection, ExperienceSection, EducationSection, PostsSection, ConnectSection, GitHubSection, GitHubStats
- **`lib/`** — i18n, language context

### i18n

Simple context-based (no next-intl). Dictionaries in `lib/i18n.ts` with `es` and `en` locales. `LanguageProvider` wraps in `app/layout.tsx`. Toggle via `LanguageToggle` component using `useLanguage()` hook. Locale persists in `localStorage`.

### Theme

Manual `isDark` state + class toggle in `app/page.tsx`. No theme library.

### Content

All copy lives in `lib/i18n.ts` dictionaries — not in page.tsx. To update text (experience, education, posts), edit the dictionaries there.

CV files: `public/cv/cv-facundozin-es.pdf` and `cv-facundozin-en.pdf`.

### Terminal

Interactive command-based widget. Commands: about, projects, skills, cv, clear, help. Uses i18n for welcome messages and labels.

### HtmlLang

Client component that syncs `<html lang>` attribute with the current locale. Renders nothing.

### TechTicker

Marquee-style scrolling icons. Icons loaded from local SVGs in `public/icons/`. Animation starts only when visible (IntersectionObserver). Pauses on hover. Uses `noRadius` and custom `size` props for non-standard icon shapes.

## Key gotchas

- `TechTicker` loads local SVGs from `public/icons/`. Some icons use `customSvg` (JWT, n8n, DDD, SDD, LLMs, RAG, Antigravity) with inline SVGs.
- `GitHubStats` loads images from external service `github-readme-stats-sigma-five.vercel.app` — if slow/down, stats won't render.
- Animation keyframes (marquee, fade-in-up) are in `app/globals.css`.
- No error boundaries or loading fallbacks for external CDN images.
