# Fieldnotes Publishing Guide — Pages CMS & GitHub Pages

Fieldnotes is designed for effortless publishing from a laptop, tablet, or smartphone without touching code or running local terminal commands.

---

## 1. Publishing Architecture

```
[ Author on Phone or Laptop ]
              │
              ▼
    [ Pages CMS Web UI ]  (pagescms.org)
              │
              ▼ (Direct Git Commit)
   [ GitHub Repository ]  (main branch)
              │
              ▼ (Trigger Webhook)
  [ GitHub Actions CI ]   (.github/workflows/deploy.yml)
              │  - Runs `pnpm install`
              │  - Runs `astro check && astro build`
              │  - Generates Pagefind search index
              ▼
   [ GitHub Pages CDN ]   (Published globally)
```

---

## 2. Setting Up Pages CMS (One-Time Setup)

1. Open your mobile browser or desktop browser and navigate to **[pagescms.org](https://pagescms.org)**.
2. Click **Get Started** and sign in using your **GitHub account**.
3. Authorize the **Pages CMS GitHub App** to access your repositories.
4. Select your **Fieldnotes repository** (e.g. `Dion-verse/fieldnotes`).
5. Pages CMS will automatically detect the [`.pages.yml`](../.pages.yml) configuration in your repository root.

---

## 3. How to Publish a New Article

### From Desktop or Mobile:
1. Open **[pagescms.org](https://pagescms.org)** and click your `fieldnotes` project.
2. Under the sidebar, select **Articles & Notes**.
3. Click **New item** (or the **+** button).
4. Fill in the fields:
   - **Title**: The headline of your piece.
   - **Description**: A 1-2 sentence preview.
   - **Published Date**: Set to today or schedule a timestamp.
   - **Author**: Automatically defaults to `Dawda Mbowe`.
   - **Tags**: Enter relevant categories (e.g., `guides`, `architecture`, `workflow`).
   - **Feature on Homepage**: Toggle on if you want this post pinned to the hero/featured section.
   - **Save as Draft**: Toggle off to publish, or leave on while working on an unfinished draft.
   - **Article Body**: Use the rich Markdown editor to write paragraphs, add headings (`##`), lists, tables, and code snippets.
5. **Adding Media**: Click the image button in the editor. Upload images from your phone camera or files—Pages CMS will automatically commit them to `public/images/posts/` and insert the clean Markdown link.
6. Click **Save** in the top right.

---

## 4. Automatic Build & Deployment

As soon as you click **Save**:
1. Pages CMS makes an authenticated Git commit to the `main` branch of your GitHub repository.
2. GitHub Actions detects the new commit and launches the **Deploy Fieldnotes to GitHub Pages** workflow.
3. In under 90 seconds, the workflow validates the frontmatter, pre-renders the HTML, compiles WebP images, indexes the full-text search database, and publishes the update to GitHub Pages.
4. Your new article is live!

---

## 5. Editing Standalone Pages

You can also edit static pages like the **About** page directly through Pages CMS:
1. In Pages CMS, select **Standalone Pages**.
2. Click **about.md**.
3. Update your biography, publication mission, or contact information.
4. Click **Save** to deploy the changes.
