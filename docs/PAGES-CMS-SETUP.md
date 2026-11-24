# Fieldnotes — Pages CMS Setup Guide

Pages CMS is a free, open-source headless CMS that authenticates directly
against your GitHub repository. No database, no server, no subscription.
You edit markdown files through a clean web interface; Pages CMS commits them
directly to your repository, triggering the GitHub Actions deployment.

Official documentation: [pagescms.org/docs](https://pagescms.org/docs)

---

## How it works

```
Your browser
     │
     ▼
 pagescms.org  ──GitHub OAuth──▶  GitHub API
                                       │
                                  Commits .md
                                  to your repo
                                       │
                                  GitHub Actions
                                  builds & deploys
                                       │
                                  Live on GitHub Pages
```

No build server or CMS server is needed. Pages CMS runs entirely in the browser.

---

## 1. Prerequisites

- Your repository is on GitHub and has the `.pages.yml` file at the root.
- GitHub Pages is enabled on the repository.
- You have push access to the repository.

---

## 2. Connect Pages CMS to Your Repository

1. Go to [app.pagescms.org](https://app.pagescms.org).
2. Click **Sign in with GitHub**.
3. Authorize Pages CMS (it only requests access to repositories you choose).
4. After authorising, click **Add site**.
5. Select your `YOUR_USERNAME.github.io` repository.
6. Pages CMS reads the `.pages.yml` file at the root and sets up the editor automatically.

> [!NOTE]
> Pages CMS uses GitHub OAuth and reads your `.pages.yml` to build its interface.
> It never stores your content — everything stays in your GitHub repository.

---

## 3. What `.pages.yml` Configures

The [`.pages.yml`](../.pages.yml) at the root of this repository defines:

| Section | What it does |
|---|---|
| `media.input` | Where uploaded images are stored (`public/images/posts`) |
| `media.output` | The URL path images are served from (`/images/posts`) |
| `content[0]` (posts) | The Articles & Notes collection |
| `content[1]` (pages) | Standalone pages (About, Privacy) |

### Posts collection fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Article heading |
| `description` | string | ✅ | Used in meta tags and card previews |
| `pubDatetime` | date | ✅ | Publication date |
| `modDatetime` | date | — | Update date (shown as "Last updated") |
| `author` | string | — | Defaults to Dawda Mbowe |
| `tags` | list | — | Comma-separated topics |
| `featured` | boolean | — | Appears in Homepage featured section |
| `draft` | boolean | — | Excluded from builds when `true` |
| `ogImage` | image | — | Custom social/OG image; leave blank for auto-generated |
| `canonicalURL` | string | — | Override canonical URL |
| `timezone` | string | — | Author's timezone for date display |
| `hideToc` | boolean | — | Hides table of contents on this article |
| `hideEditPost` | boolean | — | Hides "Edit this post" link |

---

## 4. Publishing an Article

1. Open [app.pagescms.org](https://app.pagescms.org) and select your site.
2. Click **Articles & Notes → New entry**.
3. Fill in the title, description, date and body.
4. Toggle **Save as Draft** to `false` when ready to publish.
5. Click **Save** — Pages CMS commits the markdown file to `main`.
6. GitHub Actions builds and deploys automatically (takes ~2 minutes).

> [!TIP]
> Leave `ogImage` blank. Fieldnotes generates a branded social image
> automatically for every article using Satori.

---

## 5. Uploading Images

When you add an image in the article body editor:
- Click the image icon in the rich-text toolbar.
- Upload your image — Pages CMS saves it to `public/images/posts/`.
- The image path in the markdown becomes `/images/posts/your-image.jpg`.
- Astro serves it from that path at build time.

> [!IMPORTANT]
> Avoid putting spaces in image filenames. Use hyphens: `my-chart.png`.

---

## 6. Mobile Publishing

Pages CMS works in mobile browsers:
1. Open [app.pagescms.org](https://app.pagescms.org) in Safari or Chrome on your phone.
2. Sign in with GitHub.
3. Use the rich-text editor to draft and publish articles.

For the most comfortable mobile experience, add Pages CMS to your home screen
(Safari: share → Add to Home Screen).

---

## 7. Draft Articles

Set `draft: true` in frontmatter (or toggle the **Save as Draft** switch in Pages CMS) to prevent an article from appearing in the public build.

Draft articles are **completely excluded** from `pnpm run build` output — they
will not appear on the live site until `draft` is removed or set to `false`.

---

## 8. Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Pages CMS shows "config not found" | `.pages.yml` missing or not at root | Check the file is in the repository root |
| Fields missing in editor | `.pages.yml` schema mismatch | Compare `.pages.yml` fields to `src/content.config.ts` schema |
| Image not showing after upload | Path mismatch | Confirm image is in `public/images/posts/` and path in markdown matches |
| Article not appearing after save | Still in draft | Set `draft: false` in the entry |
| Build fails after CMS edit | Validation error in frontmatter | Run `pnpm astro check` locally to find the offending field |

---

## 9. Configuration Validation

The `.pages.yml` fields are validated against the Zod schema in
[`src/content.config.ts`](../src/content.config.ts).

Fieldnotes' schema accepts:
- `pubDatetime` as a `Date` object **or** an ISO 8601 date string
  (Pages CMS writes dates as strings like `2026-11-24`).
- `ogImage` as an Astro image import **or** a plain string path.
- All optional fields are genuinely optional — missing them will not break the build.
