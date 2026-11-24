# Fieldnotes 📓

> **Ideas worth keeping. Notes worth sharing.**  
> A production-grade personal blogging platform built on the official [AstroPaper v7](https://github.com/satnaing/astro-paper) foundation with premium editorial styling, Pages CMS integration, and automated GitHub Pages deployment.

---

## 🏛️ Final Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Foundation** | [satnaing/astro-paper](https://github.com/satnaing/astro-paper) (v7.2.1) | Clean, accessible, SEO-optimized blog architecture |
| **Framework** | **Astro 7** | Static Site Generation (SSG) with zero runtime JS overhead |
| **Styling** | **Tailwind CSS v4** (`@tailwindcss/vite`) | Custom warm vellum editorial palette and typography tokens |
| **Content** | **Markdown & MDX** (`astro:content`) | Type-safe frontmatter schema, code highlighting via Shiki |
| **CMS** | **Pages CMS** (`.pages.yml`) | Headless web-based Git CMS for posts and pages |
| **Search** | **Pagefind** | Fast, client-side, static full-text search indexed at build time |
| **Hosting** | **GitHub Pages** | Free, zero-maintenance global static CDN hosting |
| **CI / CD** | **GitHub Actions** | Automated build, Pagefind indexing, and artifact deployment |
| **Runtime** | **Node 24** & **pnpm** | Modern Node.js engine and fast deterministic lockfile |

---

## 🎨 Editorial Branding & Palette

Fieldnotes adopts a warm literary, editorial publication aesthetic:

- **Light Mode (Vellum)**:
  - Background: `#fbf9f5` (warm editorial paper)
  - Foreground: `#1c1917` (rich ink)
  - Accent: `#9a3412` (warm terracotta / rust)
  - Muted: `#f0ebe1` / `#78716c`
  - Border: `#e7e0d3`
- **Dark Mode (Espresso)**:
  - Background: `#171513` (deep espresso)
  - Foreground: `#f5f0eb` (warm ivory)
  - Accent: `#ea580c` (burnished amber-orange)
  - Muted: `#292522` / `#a8a29e`
  - Border: `#38332e`

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v22.23.4+` (Node 24 recommended)
- **pnpm**: `v10.x`

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Local Development Server
```bash
pnpm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Production Build & Pagefind Indexing
```bash
pnpm run build
```
This runs type-checking (`astro check`), builds static pages (`astro build`), generates the search index (`pagefind --site dist`), and syncs the Pagefind assets (`node copy-pagefind.mjs`).

### 4. Preview Build
```bash
pnpm run preview
```

---

## 📝 Content Management (Pages CMS)

Fieldnotes is pre-configured with [Pages CMS](https://pagescms.org) via [`.pages.yml`](./.pages.yml).

1. Log into [Pages CMS](https://pagescms.org) with your GitHub account.
2. Select your `fieldnotes` repository.
3. Manage **Posts** (`src/content/posts/`) and **Pages** (`src/content/pages/`) with a rich visual editor directly committed to your Git branch.

---

## 🚢 Deploying to GitHub Pages

1. Push this repository to GitHub under your user/organization (e.g. `Dion-verse/fieldnotes` or `username.github.io`).
2. Go to **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment**, select **GitHub Actions** as the Source.
4. Push a commit to the `main` branch or trigger the **Deploy Fieldnotes to GitHub Pages** workflow manually.
5. The workflow automatically computes your site origin and subpath base URL, builds the site, indexes Pagefind, and publishes to GitHub Pages!

---

## 📜 Attribution & License

- Built on the official open-source [AstroPaper](https://github.com/satnaing/astro-paper) theme by [Sat Naing](https://satna.ing).
- Licensed under the [MIT License](./LICENSE). Original attribution and copyright have been retained in full.
