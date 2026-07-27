# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx tsc --noEmit     # Type-check without emitting
```

## Architecture

**Next.js 16 App Router** site for DripDome, a set design and experiential design studio (NYC/LA). Deployed on Vercel.

### Rendering & Layout Stack

`app/layout.tsx` (server) loads Google Fonts (Source Sans 3), JSON-LD, Vercel Analytics, and the GTM container (conditional on `NEXT_PUBLIC_GTM_ID`). It wraps children in:
- `ThemeRegistry.tsx` - MUI Emotion cache + ThemeProvider
- `ClientLayout.tsx` - renders the Navbar on every route (sticky, in normal flow, so no spacer hacks)

The home page (`app/page.tsx`) is a single scroll of section components imported from `app/components/`.

### Styling

Hybrid approach: **MUI sx prop** for component-level styles, **Tailwind** for utility classes, **Emotion** under the hood for MUI. The `cn()` helper in `lib/utils.ts` merges clsx + tailwind-merge.

**Neobrutalist design system (current direction)** lives in `lib/theme.ts`. The entire palette is centralized in the `NB_COLORS` object, currently a dark-mode white/black/silver scheme: near-black `paper` page background, off-white `ink` for text/borders/inverted bands, `silver` accents. Semantic tokens keep inversion safe: `paperOnInk` (text on ink bands), `onSilver` (text on silver fills, always dark), `mutedOnInk` (muted text/rules on ink bands), and `well` (media backdrop that must stay dark in ANY theme because the brand/press logo PNGs are white artwork). To retheme the site, edit `NB_COLORS` (plus `NB_BORDER_WIDTH` / `NB_SHADOW_OFFSET` for chunkier hardware). Never hardcode hex values in components; always import tokens.

Derived tokens: `NB_RULE` (2px ink border used everywhere), `nbShadow()` (hard zero-blur offset shadow), `NB_DISPLAY_SX` (Archivo Black headline type), `NB_MONO_SX` (IBM Plex Mono spec-sheet labels), `NB_OUTLINE_TEXT_SX` (stroke-only display text), `NB_BUTTON_SX` / `NB_BUTTON_OUTLINE_SX` (press-down mechanic buttons), `NB_TAG_SX` (square chips). Fonts are registered in `app/layout.tsx` via next/font CSS variables (`--font-display`, `--font-mono`).

Visual grammar: flat colors, 2px ink rules dividing full-width section bands, hard offset shadows, zero border radius, uppercase display type, mono metadata labels (job numbers, figure captions, indexes), inverted ink bands, marquee tickers (`nb-ticker` keyframe in `globals.css`).

Every active route is converted to this system. The legacy champagne-gold tokens (`BRAND_ACCENT`, `BRAND_GRADIENT*` at the bottom of `lib/theme.ts`) are referenced only by dead components that are not imported anywhere (`HomeBlurb`, `Chatbot`, `ProjectsContributed`, `WorkReel`, `OurServices`); never use them in new work. Swiper card/fade carousels have been replaced site-wide with scroll-snap filmstrips (frame counter + square arrow controls, pattern in `JobFile.tsx`).

### Routes

The site is organized around three specialty verticals (podcast studios, brand activations, interior/office design) with the home page acting as the master work archive. Set design and music videos are sunset services: kept in the archive index and taken "for the right project," but not promoted with dedicated pages or nav items. `/portfolio`, `/services`, and `/rentals` remain live but are intentionally out of the nav.

| Route | Purpose |
|-------|---------|
| `/` | Home: hero, specialties router ("What do you need built?"), master work archive (featured job files + full index) |
| `/podcast-studios` | Vertical landing page for podcasters/networks. Hero, proof band, build spec sheet, shipped builds, intake |
| `/brand-activations` | Vertical landing page + Google Ads LP. Budget-qualified inquiry form fires `generate_lead` conversion |
| `/interior-office-design` | Vertical landing page for offices/interiors. Hero (Seismic HQ image), proof band, scope spec sheet, shipped builds, intake |
| `/blog` | Blog listing with category filtering |
| `/blog/[slug]` | Dynamic blog post pages |
| `/blog/feed.xml` | RSS feed (route handler) |
| `/portfolio` | Photography gallery |
| `/services` | Services page |
| `/rentals` | Equipment rental grid + inquiry form |
| `/about-us` | About page |
| `/video-photo` | Video/photo gallery |
| `/privacy` | Privacy policy |

### Data Pattern

Blog, portfolio, rentals, and services data live in co-located `data.ts` files (e.g., `app/blog/data.ts`). No database. Blog posts store full HTML content as template literal strings in the `content` field.

**Project registry**: `lib/projects.ts` is the single source of truth for build projects. Each `Project` has a `vertical` key (`podcast`, `activation`, `interior`, `setDesign`, `musicVideo` — the latter two flagged `legacy`), images, stats, and a `featured` flag. The home archive renders featured projects as full job files plus a complete index table; vertical pages filter with `projectsByVertical()`. Add a project there and it flows to every surface.

### API

Single API route at `pages/api/contact.ts` (Pages Router, not App Router). Validates reCAPTCHA server-side then routes on `formType`:
- `"rental"` — rental form (`app/rentals/RentalForm.tsx`)
- `"brandActivation"` — brand activation inquiry form (`app/brand-activations/BrandActivationForm.tsx`), includes company/projectDate/budgetRange/brief and marks source as "Google Ads landing page"
- default (unset) — general contact form (`app/components/ContactForm.tsx`)

All three variants email the user and BCC the team via SendGrid.

### Analytics & Tracking

GTM + GA4 + Google Ads conversions are wired through a single GTM container loaded in `app/layout.tsx` (conditional on `NEXT_PUBLIC_GTM_ID`). GA4 loads inside the GTM container, not separately — avoids double-tagging.

Client-side event helpers live in `lib/analytics.ts`:
- `pushDataLayer(event, payload)` — SSR-safe primitive
- `trackGenerateLead({ form, value })` — called on successful form submit; pushes `generate_lead` with `form_type`, `currency: 'USD'`, `value` (default 500)
- `trackPageView({ page })` — called from `PageViewTracker` components on landing pages (e.g., `app/brand-activations/PageViewTracker.tsx`)

Required env vars (populate in Vercel before launch):
- `NEXT_PUBLIC_GTM_ID` (format: `GTM-XXXXXXX`) — gates the whole tracking stack
- `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` — documented for future direct-tag use if needed

### Images

All project/blog images hosted on S3: `dripdome-site.s3.us-east-2.amazonaws.com`. Configured as a remote pattern in `next.config.ts`. Logo assets in `public/assets/`.

### Component Registries

`components.json` configures shadcn CLI with registries for aceternity, magicui, fab-ui, and einui. Shared UI components live in `components/ui/`.

### SEO

Every page route exports `metadata` with Open Graph, Twitter cards, and canonical URLs. `app/sitemap.ts` generates a dynamic sitemap including all blog slugs. `app/components/JsonLd.tsx` provides site-wide `LocalBusiness` structured data. Pages with distinct service offerings add per-page schemas (e.g., `app/brand-activations/BrandActivationsServiceJsonLd.tsx` emits a `Service` schema). Blog post pages add per-post `Article` structured data.

### Reusable Section Components

`app/components/` holds sections reused across multiple pages:
- `JobFile` — project case sheet (ink header bar with job no./vertical tag/client, scroll-snap filmstrip with frame counter, title + stat chips + blurb). Consumes a `Project` from `lib/projects.ts`. Used on home archive and vertical pages
- `Specialties` — "What do you need built?" two-panel intent router (podcast studios / brand activations) with sunset-services strip
- `SocialProofBar` — 4-stat animated counter row (used on home and `/brand-activations`)
- `TrustWall` (default) — "Trusted By" + logo marquee. `TrustPress` (named export) — "In the Press" link list. Originally one component, split so each page can place them independently
- `FeaturedProjects` — Swiper card-effect carousel of project case studies
- `HowWeWork` — 3-step numbered process timeline with CTA

## Writing Rules

- Never use em dashes in written content. Use periods, commas, or restructure the sentence. Em dashes read as AI-generated.
- All new pages must include structured data, semantic HTML, and sitemap entries from the start.

## Custom Commands

- `/blog-reporter` - Interview-driven blog post creator. Conducts a 4-phase structured interview, then outputs a complete SEO-optimized blog post with a ready-to-paste `BlogPost` data entry for `app/blog/data.ts`.
