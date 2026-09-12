# AGENTS.md — PortfolioZinFacundo

Single-page Next.js 15 portfolio (App Router, Tailwind CSS 4, pnpm).

## Commands

```bash
pnpm dev        # dev server (http://localhost:3000)
pnpm build      # next build
pnpm lint       # next lint
pnpm start      # next start
```

No `typecheck` script — README lists it but it's not in package.json. Use `npx tsc --noEmit` directly if needed.

## Non-obvious config

- `@/*` path alias maps to repo root (e.g. `@/components/...`).
- Tailwind CSS v4 with `@tailwindcss/postcss` (NOT v3 PostCSS plugin). CSS variables use `oklch()`.
- pnpm, not npm. Lockfile is `pnpm-lock.yaml`.
- `next.config.mjs` sets `poweredByHeader: false` plus security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS). Deliberately NO CSP — remote images and inline JSON-LD would break without careful authoring.
- Uses `next/image` (`<Image>`) in IntroSection and ExperienceSection; external CDN images go through `components/ExternalImage.tsx` (client `<img>` with an `onError` placeholder).
- `middleware.ts` sets a default `locale` cookie on first visit. The root layout (`app/layout.tsx`) reads that cookie, which makes every route dynamic (`/_not-found` included) — an accepted trade-off for cookie-based SSR i18n with no hydration flash.

## Architecture

- **`app/`** — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`, `sitemap.ts`), plus `error.tsx` / `global-error.tsx` / `loading.tsx` boundaries
- **`app/opengraph-image.tsx` / `app/twitter-image.tsx` / `app/apple-icon.tsx`** — PNG icons generated at request time via `next/og` from the shared `lib/og-image.tsx`. SVG is NOT used for social previews (platforms refuse to render it).
- **`app/api/contributions/route.ts`** — GitHub contributions calendar proxy (multi-provider fallback, no auth needed)
- **`app/api/github-activity/route.ts`** — GitHub public events proxy
- **`components/`** — TopBar, SideNav, Terminal, TechTicker, CommandPalette, ThemeProvider, LanguageToggle, HtmlLang, SectionObserver, FooterInteractive, GitHubActivity, GitHubContributions, ExternalImage
- **`components/sections/`** — IntroSection, ExperienceSection, EducationSection, PostsSection, ConnectSection, GitHubSection, GitHubStats
- **`lib/`** — `i18n.ts` (dictionaries + types), `language-context.tsx` (provider + hook), `commands.ts` (CommandPalette command definitions), `og-image.tsx` (social preview renderer)

### i18n

Context-based (no next-intl). Dictionaries in `lib/i18n.ts` with `es` and `en` locales, including nested `terminal`, `activity`, `contributionCalendar`, `commandGroups` and `commandHints` objects. `LanguageProvider` wraps in `app/layout.tsx` and receives `initialLocale` from the server-read cookie, so the first client render matches SSR (no language flash). Toggle via `LanguageToggle` using the `useLanguage()` hook. Locale persists in a **cookie** (`locale`), not localStorage. `LanguageToggle` calls `router.refresh()` after toggling so the server-rendered content updates.

Every key in `DictionaryFields` MUST exist in both `es` and `en` — `tsc` enforces it.

### Theme

`ThemeProvider` wraps in `app/page.tsx` (client component). Theme persists in `localStorage` (key `theme`, values `"dark"` / `"light"`, default dark). A blocking inline script in `app/layout.tsx` applies the `dark` class before first paint (no flash), and the provider derives its initial state from the applied DOM class. Exposes `useTheme()` → `{ isDark, toggleTheme }`. `TopBar` has the toggle button.

### Content

All copy lives in `lib/i18n.ts` dictionaries — not in page.tsx. To update text (experience, education, posts), edit the dictionaries there.

CV files: `public/cv/cv-facundozin-es.pdf` and `cv-facundozin-en.pdf`.

### Terminal

Interactive command-based widget. Commands: about, projects, skills, cv, goto (navigate sections), palette, clear, help. Fully localized via the nested `terminal` dictionary (output re-seeds on locale change); `cv` opens the locale-appropriate PDF. `palette` dispatches a `window` CustomEvent `open-command-palette` that `TopBar` listens for (single palette instance, no direct prop).

### CommandPalette

Cmd+K command palette, lazy-loaded from TopBar (`next/dynamic`, `ssr: false`) and mounted only while open. Commands defined in `lib/commands.ts` with fuzzy matching and a stable `category` discriminator; the visible group labels are resolved from the dictionary. Modal dialog semantics (`role="dialog"`, focus trap, focus restore, body scroll lock, combobox/listbox ARIA).

### HtmlLang

Client component that syncs `<html lang>` attribute with the current locale. Renders nothing.

### TechTicker

Marquee-style scrolling icons. Icons loaded from local SVGs in `public/icons/`. Animation starts only when visible (IntersectionObserver). Pauses on hover. Uses `noRadius` and custom `size` props for non-standard icon shapes.

## Key gotchas

- `TechTicker` loads local SVGs from `public/icons/`. Some icons use `customSvg` (JWT, n8n, DDD, SDD, LLMs, RAG, Antigravity) with inline SVGs.
- `GitHubStats` loads images from `githubstats-livid.vercel.app` — a SELF-HOSTED github-readme-stats instance on the owner's own Vercel account (migrated because the public instance rate-limited). If slow/down, `ExternalImage` shows a placeholder instead of a broken image. Keep the `<link rel="preconnect">` in `app/layout.tsx` pointed at this host.
- `GitHubContributions` and `GitHubActivity` fetch from the local API routes (`/api/contributions`, `/api/github-activity`), which proxy external GitHub data with a validated `username` and `Cache-Control: s-maxage=3600`.
- Animation keyframes (marquee, fade-in-up) are in `app/globals.css`; the global `:focus-visible` outline and reduced-motion overrides live there too.
- `TopBar` lazy-loads `CommandPalette` with `next/dynamic({ ssr: false })` and mounts it only when open.
- `SectionObserver` manages scroll-triggered section animations (sections start with `opacity-0`). Each animated wrapper carries `data-reveal`, and a `<noscript>` style forces them visible without JS.
- Social previews are generated PNGs from `lib/og-image.tsx` — update THAT (not an SVG) when changing the preview. `public/og-image.svg` no longer exists.
- The Argentine flag next to the profile photo is a local **Twemoji** asset at `public/emoji/flag-ar.svg` (Twemoji graphics are CC-BY 4.0), NOT the native 🇦🇷 character: Windows does not render flag emoji and shows the letters "AR" instead.
