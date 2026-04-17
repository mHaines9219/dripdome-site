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
- `ClientLayout.tsx` - hides Navbar on the home route (`/`) only; all other routes show it

The home page (`app/page.tsx`) is a single scroll of section components imported from `app/components/`.

### Styling

Hybrid approach: **MUI sx prop** for component-level styles, **Tailwind** for utility classes, **Emotion** under the hood for MUI. The `cn()` helper in `lib/utils.ts` merges clsx + tailwind-merge.

Brand colors defined in `app/theme.ts`: surface `#FFFFFF`, ink `#111111`, accent `#E5C767` (champagne gold). MUI palette uses `#FCF5EC` (brown/cream) as primary and `#DD9F28` (gold) as secondary.

Shared brand tokens live in `lib/theme.ts`:
- `BRAND_ACCENT` (`#E5C767`) and `BRAND_ACCENT_DEEP` (`#C9A227`) — solid colors for icons, pill borders, active-nav underline, hover states, and any UI under ~20px where a gradient would read as muddy
- `BRAND_GRADIENT` — `linear-gradient(135deg, #E5C767 → #E89B3C)`
- `BRAND_GRADIENT_TEXT_SX` — spread into an sx object on big accent text (hero H1 spans, section H2 accent words, the huge case-study numbers)
- `BRAND_GRADIENT_BUTTON_SX` — spread into an sx object on primary CTA buttons (uses `filter: brightness(0.92)` on hover)

**Rule of thumb for the gradient**: apply only to hero-scale text and primary CTAs. Keep icons, tiny borders, navbar underline, and body-copy accents on the solid `BRAND_ACCENT` color.

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Home (scroll sections) |
| `/brand-activations` | Google Ads landing page. Budget-qualified inquiry form fires `generate_lead` conversion |
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
- `SocialProofBar` — 4-stat animated counter row (used on home and `/brand-activations`)
- `TrustWall` (default) — "Trusted By" + logo marquee. `TrustPress` (named export) — "In the Press" link list. Originally one component, split so each page can place them independently
- `FeaturedProjects` — Swiper card-effect carousel of project case studies
- `HowWeWork` — 3-step numbered process timeline with CTA

## Writing Rules

- Never use em dashes in written content. Use periods, commas, or restructure the sentence. Em dashes read as AI-generated.
- All new pages must include structured data, semantic HTML, and sitemap entries from the start.

## Custom Commands

- `/blog-reporter` - Interview-driven blog post creator. Conducts a 4-phase structured interview, then outputs a complete SEO-optimized blog post with a ready-to-paste `BlogPost` data entry for `app/blog/data.ts`.
