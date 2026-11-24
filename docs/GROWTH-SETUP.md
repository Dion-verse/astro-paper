# Fieldnotes — Growth & Analytics Setup Guide

> This guide covers every step needed to connect Fieldnotes to the major
> discovery and analytics platforms. None of these steps are required to publish
> — the site works perfectly without them. Analytics tools give you data; they
> do not cause rankings.

---

## 1. Google Search Console

Google Search Console lets you see which queries bring people to your site,
monitor indexing health, and submit your sitemap directly to Google.

### Steps

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add property** → choose **URL prefix**.
3. Enter your site URL: `https://<username>.github.io/`
4. Choose the **HTML tag** verification method and copy the `content` value
   (a string like `abc123…`).
5. Open `astro-paper.config.ts` and set:
   ```ts
   site: {
     googleVerification: "abc123…",   // paste your token here
   }
   ```
6. Push to `main` and wait for GitHub Actions to deploy.
7. Back in Search Console, click **Verify**.
8. Submit your sitemap: in Search Console → **Sitemaps** → enter
   `sitemap-index.xml` → **Submit**.

> [!NOTE]
> Verification is handled natively in `src/layouts/Layout.astro` via the
> `site.googleVerification` config key — no manual template edits needed.

---

## 2. Bing Webmaster Tools

Bing Webmaster Tools covers Bing and DuckDuckGo search indexing.

### Steps

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Add your site URL.
3. Choose **XML file verification** (simplest for a static site):
   - Download the XML file Bing provides.
   - Place it in the `public/` folder of this repository so it is served at
     the root of your site.
   - Commit and push.
4. Click **Verify** in Bing Webmaster Tools.
5. Navigate to **Sitemaps** → submit `https://<username>.github.io/sitemap-index.xml`.

---

## 3. Sitemap Submission

Fieldnotes generates a sitemap automatically via
[`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/).
The file is available at `https://<username>.github.io/sitemap-index.xml`.

### Where to submit

| Platform | Sitemap submission |
|---|---|
| Google Search Console | Sitemaps section → paste `sitemap-index.xml` |
| Bing Webmaster Tools | Sitemaps section → paste full URL |
| IndexNow (Bing) | Automatic via Bing Webmaster API (optional) |

---

## 4. Cloudflare Web Analytics

Cloudflare Web Analytics is privacy-first (no cookies, GDPR-friendly) and free
on all Cloudflare plans, including the free tier.

### Steps

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Navigate to **Analytics & Logs → Web Analytics**.
3. Click **Add a site** → enter your GitHub Pages URL.
4. Copy the **beacon token** (32-character hex string from the JS snippet).

### Enabling it in Fieldnotes

Create or edit `.env` in the project root:

```env
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your32hextoken
```

For GitHub Actions deployment, add it as a repository secret:

1. GitHub → your repo → **Settings → Secrets and variables → Actions**.
2. Click **New repository secret**.
3. Name: `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`
4. Value: your 32-character token.
5. Update `.github/workflows/deploy.yml` to pass the secret as an environment
   variable during the build step:

```yaml
- name: Build
  run: pnpm run build
  env:
    PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN: ${{ secrets.PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN }}
```

> [!IMPORTANT]
> When the environment variable is not set, **no analytics script is loaded**.
> The beacon script is injected only when the token is present. This keeps the
> site tracking-free by default.

---

## 5. RSS Distribution

Fieldnotes generates a standard RSS 2.0 feed at `/rss.xml` via
[`@astrojs/rss`](https://docs.astro.build/en/guides/rss/).

### Where to submit your feed

| Service | URL |
|---|---|
| Feedly (self-submit) | [feedly.com/i/subscription/feed/…](https://feedly.com) |
| Feedburner (optional) | Paste feed URL at feedburner.google.com |
| Newsblur | Paste feed URL in app settings |

Sharing your feed link openly (`/rss.xml`) is usually sufficient — feed
readers discover it automatically via the `<link rel="alternate">` tag in
every page's `<head>`.

---

## 6. Internal-Link Strategy

Internal links pass authority between your pages and help readers explore
related content.

### Principles

- **Link to your best content** from your homepage and high-traffic posts.
- **Use descriptive anchor text** — avoid "click here" or "read more."
- **Link to related posts** within article bodies using MDX or plain markdown:
  ```md
  Related: [How to Build a Content System](/posts/build-a-content-system/)
  ```
- Use the **tag system** — posts sharing tags are auto-linked in the topic
  explorer. Add 2–4 accurate tags per post.
- Review your archives page periodically and update older posts to link to
  newer, more authoritative content.

---

## 7. Content Updates

Fresh, accurate content signals to search engines that your site is actively
maintained.

### Practices

- **Update the `modDatetime` frontmatter field** when you substantially revise
  a post:
  ```yaml
  modDatetime: 2026-11-24
  ```
  AstroPaper renders a "Last updated" date automatically when this is set.

- **Review top posts annually** — check for broken links, outdated
  information, or new angles to cover.

- **Publish consistently** — even a modest cadence (1–2 posts per month)
  outperforms irregular bursts. Use Pages CMS for quick edits on mobile.

- **Don't delete old URLs** — if you reorganise content, add redirects or
  update the article in-place. Lost URLs lose accumulated link equity.

---

> [!TIP]
> The most reliable growth lever for a personal publication is publishing
> genuinely useful, original content that answers real questions. Analytics
> tools and sitemap submissions accelerate discovery of content that already
> deserves to rank — they cannot substitute for it.
