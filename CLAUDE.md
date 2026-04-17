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

`app/layout.tsx` (server) loads Google Fonts (Source Sans 3), JSON-LD, and Vercel Analytics. It wraps children in:
- `ThemeRegistry.tsx` - MUI Emotion cache + ThemeProvider
- `ClientLayout.tsx` - conditionally hides Navbar on the home page

The home page (`app/page.tsx`) is a single scroll of section components imported from `app/components/`.

### Styling

Hybrid approach: **MUI sx prop** for component-level styles, **Tailwind** for utility classes, **Emotion** under the hood for MUI. The `cn()` helper in `lib/utils.ts` merges clsx + tailwind-merge.

Brand colors defined in `app/theme.ts`: surface `#FFFFFF`, ink `#111111`, accent `#E5C767` (champagne gold). MUI palette uses `#FCF5EC` (brown/cream) as primary and `#DD9F28` (gold) as secondary.

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Home (scroll sections) |
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

Single API route at `pages/api/contact.ts` (Pages Router, not App Router). Handles contact and rental form submissions via SendGrid. Validates reCAPTCHA server-side.

### Images

All project/blog images hosted on S3: `dripdome-site.s3.us-east-2.amazonaws.com`. Configured as a remote pattern in `next.config.ts`. Logo assets in `public/assets/`.

### Component Registries

`components.json` configures shadcn CLI with registries for aceternity, magicui, fab-ui, and einui. Shared UI components live in `components/ui/`.

### SEO

Every page route exports `metadata` with Open Graph, Twitter cards, and canonical URLs. `app/sitemap.ts` generates a dynamic sitemap including all blog slugs. `app/components/JsonLd.tsx` provides site-wide structured data. Blog post pages add per-post Article structured data.

## Writing Rules

- Never use em dashes in written content. Use periods, commas, or restructure the sentence. Em dashes read as AI-generated.
- All new pages must include structured data, semantic HTML, and sitemap entries from the start.

## Custom Commands

- `/blog-reporter` - Interview-driven blog post creator. Conducts a 4-phase structured interview, then outputs a complete SEO-optimized blog post with a ready-to-paste `BlogPost` data entry for `app/blog/data.ts`.
