# Fieldnotes — Deployment Guide

This guide explains how to deploy Fieldnotes to GitHub Pages using the
included GitHub Actions workflow.

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 24+ | Build runtime |
| pnpm | 10+ | Package manager |
| GitHub account | — | Hosting and CMS |

---

## 1. Create the GitHub Repository

Fieldnotes is designed as a **GitHub Pages user site**.

1. Log in to [github.com](https://github.com).
2. Click **New repository**.
3. Set the name to exactly `<your-username>.github.io`.
   - Example: if your GitHub username is `janedoe`, name it `janedoe.github.io`.
4. Set visibility to **Public** (required for GitHub Pages on free accounts).
5. Do **not** add a README, .gitignore, or licence — the repository has these.
6. Click **Create repository**.

> [!IMPORTANT]
> The repository name must be `<username>.github.io` exactly. Any other name
> creates a project site at `/<repo-name>/`, which requires changing the Astro
> `base` path.

---

## 2. Update the Site URL

Open [`astro-paper.config.ts`](../astro-paper.config.ts) and change the
`website` to your real GitHub Pages URL:

```ts
site: {
  website: "https://your-username.github.io/",
  // ...
}
```

Also update `astro.config.ts` if `site` is set there separately.

---

## 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

---

## 4. Enable GitHub Pages

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Click **Save**.

GitHub Pages is now configured to deploy from the Actions workflow.

---

## 5. First Deployment

The Actions workflow triggers automatically on every push to `main`.

After your first push:
1. Go to your repository → **Actions** tab.
2. Watch the **Deploy Fieldnotes to GitHub Pages** workflow run.
3. When it completes, your site is live at `https://YOUR_USERNAME.github.io/`.

> [!NOTE]
> The first deployment can take 2–5 minutes. Subsequent deployments are faster
> because the Astro image cache is reused across runs.

---

## 6. Deployment Workflow Details

The workflow at [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):

1. **Checkout** the repository at `main`.
2. **Install pnpm** via the official `pnpm/action-setup@v4` action.
3. **Set up Node 24** with pnpm caching.
4. **Configure GitHub Pages** — detects the correct `site` and `base` settings.
5. **Install dependencies** — `pnpm install --frozen-lockfile`.
6. **Build** — `pnpm run build` (runs `astro check && astro build && pagefind && copy-pagefind`).
7. **Upload artifact** — the `dist/` folder is uploaded as a Pages artifact.
8. **Deploy** — artifact is deployed to GitHub Pages.

### Permissions

```yaml
permissions:
  contents: read   # read the repo
  pages: write     # deploy to Pages
  id-token: write  # OIDC token for Pages deployment
```

### Concurrency

Only one deployment runs at a time. If a second push arrives while a deploy
is in progress, the second run waits rather than cancelling.

---

## 7. Optional: Cloudflare Web Analytics

To enable analytics, add your Cloudflare beacon token as a **repository secret**:

1. GitHub → your repo → **Settings → Secrets and variables → Actions**.
2. Click **New repository secret**.
3. Name: `PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`
4. Value: your 32-character Cloudflare beacon token.

The workflow passes this automatically to the build.

> When the secret is not set, **no analytics script is injected**.

---

## 8. Manual Deployment

You can trigger a deployment manually:

1. GitHub → your repo → **Actions**.
2. Select **Deploy Fieldnotes to GitHub Pages**.
3. Click **Run workflow** → **Run workflow**.

---

## 9. Local Preview

To preview the production build locally before pushing:

```bash
pnpm run build
pnpm preview
```

The preview server starts at `http://localhost:4321`.

---

## 10. CI Checks

Pull requests trigger the CI workflow at [`.github/workflows/ci.yml`](../.github/workflows/ci.yml), which runs `pnpm run build` to verify the build passes before merging.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| 404 on all pages | Pages source not set to GitHub Actions | Settings → Pages → Source → GitHub Actions |
| Images missing | Wrong `site` URL in config | Update `website` in `astro-paper.config.ts` |
| Build fails on `astro check` | TypeScript error in edited file | Run `pnpm astro check` locally and fix the error |
| Old content still showing | CDN cache | Wait 5 minutes or hard-refresh (`Ctrl+Shift+R`) |
