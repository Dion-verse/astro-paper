# Fieldnotes — Changelog

This file documents Fieldnotes-specific customizations applied on top of the
upstream [AstroPaper v7.2.1](https://github.com/satnaing/astro-paper/releases/tag/v7.2.1) base.

The upstream codebase is preserved as-is wherever possible. Changes are
intentional, documented, and reversible.

---

## Fieldnotes 1.0.0 — 2026-11-24

### Foundation
- Cloned from `satnaing/astro-paper` tag `v7.2.1`.
- Upstream MIT license and author attribution preserved in `LICENSE`.
- Upstream `pnpm-lock.yaml` maintained; no lockfile mixing.

### Branding

**`src/styles/theme.css`** — New file (upstream uses only Tailwind defaults)
- Added light-theme paper-and-ink palette:
  - Background `#F7F5EF`, foreground `#24231F`, accent `#B65F49`
  - Muted `#EFEBE2`, muted-foreground `#77736B`, border `#DED9CF`
- Added dark-theme obsidian palette:
  - Background `#191A18`, foreground `#EEEAE2`, accent `#D58A70`
  - Muted `#252723`, muted-foreground `#AAA69D`, border `#373832`
- Registered custom font stacks: `--font-serif` (Charter/Georgia fallback),
  `--font-sans` (system UI stack), `--font-mono` (JetBrains Mono / Fira Code).

**`src/styles/typography.css`** — New file
- Applied `font-serif tracking-tight` to `h1`–`h4` and `th`.
- Applied `font-sans` to body text, `font-mono` to `code` / `pre`.
- Set comfortable article line-height and prose measure.

**`src/components/Wordmark.astro`** — New component
- Inline SVG editorial wordmark: "FIELDNOTES" with accent mark.
- Used in `Header.astro` in place of a plain text logo.
- Works on both light and dark backgrounds; no external font dependency.

**`public/favicon.svg`** — Replaced upstream placeholder
- Responsive SVG favicon with `F.` monogram.
- Uses CSS `prefers-color-scheme` media query for dark/light backgrounds.

### Configuration

**`astro-paper.config.ts`** — Customized
- `site.title`: `"FIELDNOTES"`
- `site.description`: `"Notes, ideas, and things worth sharing."`
- `site.author`: `"Dawda Mbowe"`
- `site.profile`: `"https://github.com/Dion-verse"`
- `features.dynamicOgImage`: `true` (Satori auto-generates OG cards)
- `features.editPost.url`: GitHub edit URL for each post
- `features.search`: `"pagefind"`
- `features.toc`: `true`
- `socials`: GitHub and email links
- `shareLinks`: X, LinkedIn, WhatsApp, email

**`src/content.config.ts`** — Extended upstream schema
- `pubDatetime`: accepts `z.date()` **or** `z.string().transform(s => new Date(s))`
  to support Pages CMS date strings without breaking upstream Date objects.
- All other fields match the upstream schema exactly.

### Pages & Routes

**`src/pages/index.astro`** — Redesigned homepage
- Hero section: Fieldnotes wordmark, tagline, editorial statement, About link, RSS link.
- Featured articles section (shown only when `featured: true` posts exist).
- Recent articles section (paginated via `posts.perIndex`).
- Topic discovery strip: top 10 tags, "All topics" link.
- Existing AstroPaper Card, Tag, and LinkButton components reused throughout.

**`src/content/pages/about.md`** — Replaced upstream placeholder
- Customized editorial mission and About copy for Fieldnotes.

**`src/content/pages/privacy.md`** — New page
- Privacy policy: no cookies, no cross-site tracking, localStorage theme pref only.

**`src/pages/privacy.astro`** — New route (`/privacy`)
- Renders the privacy page at a stable URL referenced in the footer.

**`src/components/Footer.astro`** — Customized
- Added Privacy Policy link.
- Updated copyright to Dawda Mbowe.
- Retained AstroPaper upstream attribution.

### OG Image Generation

**`src/pages/og.png.ts`** and **`src/pages/posts/[...slug]/index.png.ts`** — Customized
- Updated Satori templates to use Fieldnotes paper-and-ink colors.
- Light background `#F7F5EF`, ink text `#24231F`, accent `#B65F49`.

### Analytics

**`src/custom/BodyEnd.astro`** — New analytics injection point
- Cloudflare Web Analytics beacon conditionally injected when
  `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is set.
- When the token is absent, **zero tracking scripts are loaded**.

### Accessibility

**`src/styles/global.css`** — Extended
- Added `@media (prefers-reduced-motion: reduce)` block.
- Disables all CSS animations and transitions for users who request it.
- Satisfies WCAG 2.2 SC 2.3.3.
- Existing skip-to-content link in upstream `Header.astro` retained.

### Content

Migrated three articles from the legacy Fieldnotes starter:
- `src/content/posts/build-a-content-system.md`
- `src/content/posts/choosing-a-blog-niche.md`
- `src/content/posts/write-guides-people-use.md`

Migrated media assets to `public/images/`.

### CI/CD

**`.github/workflows/deploy.yml`** — New (overwrites upstream placeholder)
- Node 24, pnpm, `pnpm install --frozen-lockfile`
- `pnpm run build` → `pagefind --site dist` → `copy-pagefind.mjs`
- GitHub Pages deployment via `actions/deploy-pages@v4`
- `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` passed from repository secret

**`.github/workflows/ci.yml`** — New
- Runs `pnpm run build` on pull requests to `main`

### CMS

**`.pages.yml`** — New
- Pages CMS configuration for Posts and Pages collections.
- Media upload: `public/images/posts` → `/images/posts`
- All frontmatter fields mapped to their correct Pages CMS types.

### Documentation

New files in `docs/`:
- `DEPLOYMENT.md` — GitHub Pages deployment walkthrough
- `PAGES-CMS-SETUP.md` — Pages CMS authentication and publishing guide
- `EDITORIAL-GUIDE.md` — Writing and editorial standards
- `PUBLISHING-GUIDE.md` — Step-by-step publishing workflow
- `ARTICLE-TEMPLATE.md` — Frontmatter and body template
- `SEO-GUIDE.md` — Ethical SEO and organic growth practices
- `GROWTH-SETUP.md` — Analytics, sitemap, and RSS distribution setup
- `CHANGELOG.md` — This file

### Environment

- **`.nvmrc`** — Declares Node 24 as the required runtime.
- **`.env.example`** — Documents `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`.
- **`.gitignore`** — Upstream `.gitignore` retained; `.env` already listed.

---

## What Was Not Changed

The following upstream components were left completely unchanged to ensure
compatibility with future AstroPaper updates:

- All Astro integrations in `astro.config.ts` (sitemap, rss, mdx, tailwind, pagefind)
- `src/components/Card.astro` — article card layout
- `src/components/Header.astro` — navigation and skip-to-content
- `src/components/Pagination.astro`
- `src/components/Tag.astro`
- `src/components/Datetime.astro`
- `src/layouts/PostLayout.astro` — article reading layout
- `src/pages/posts/` — article routing
- `src/pages/tags/` — tag pages
- `src/pages/archives/` — archive pages
- `src/pages/search/` — Pagefind search interface
- `src/scripts/` — theme toggle scripts
- `src/utils/` — all upstream utilities
- `src/i18n/` — translation system
- `pnpm-lock.yaml` — lockfile unchanged
