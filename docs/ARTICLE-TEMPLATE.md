# Fieldnotes Article Template & Style Guide

A practical blueprint for crafting clear, evidence-based, high-value editorial articles for **Fieldnotes**.

---

## 1. Frontmatter Reference

Every article in `src/content/posts/` must start with a YAML frontmatter block:

```yaml
---
title: "A Clear, Specific Headline Explaining the Core Outcome"
description: "A concise 1-2 sentence summary explaining who this is for and what problem it solves (40–160 characters)."
pubDatetime: 2026-11-24T10:00:00Z
modDatetime: 2026-11-24T12:00:00Z # Optional: update when making substantive revisions
author: "Dawda Mbowe" # Defaults to site author in astro-paper.config.ts
featured: false # Set to true to highlight on the homepage
draft: false # Set to true to prevent publication during drafting
tags:
  - architecture
  - workflow
  - engineering
ogImage: /images/posts/cover-image.png # Optional: if omitted, an OG card is dynamically generated
canonicalURL: https://example.com/original-article # Optional: only if cross-posting
timezone: UTC # Optional: defaults to site timezone
hideToc: false # Optional: set true for short essays with < 2 headings
hideEditPost: false # Optional: hide GitHub edit link for this article
---
```

---

## 2. Recommended Editorial Structure

A great Fieldnotes guide is defined by whether a reader leaves with clearer mental models, actionable steps, and less uncertainty.

### Section I: The Hook & Framing (Introduction)
- **The Core Problem**: Describe the friction or question directly in the opening paragraph.
- **The Premise**: State what the reader will be able to do or understand upon finishing.
- *Tip*: Avoid lengthy preamble or personal digressions before stating the topic.

### Section II: Context & Architecture
- Provide the minimum necessary background to make sense of the recommendation.
- Use a code snippet, diagram, or table to establish terminology.

### Section III: Step-by-Step Implementation
- Break the workflow into logical `## Heading 2` and `### Heading 3` subsections.
- Walk through decisions in sequential order.
- Provide tested, annotated code examples with filename headers.

### Section IV: Trade-Offs, Constraints & Edge Cases
- When does this pattern fail or break down?
- What are the operational, performance, or financial costs?
- What alternative approaches exist, and why were they not chosen here?

### Section V: Summary & Further Reading
- Conclude with a clean takeaway checklist.
- Link internally to related Fieldnotes guides.
- Attribute primary sources and official documentation.

---

## 3. Formatting Standards

- **Code Blocks**: Specify language syntax for Shiki (`ts`, `bash`, `yaml`, `css`, `astro`).
- **Images**: Always use descriptive `alt` text. Store images in `public/images/posts/`.
- **Blockquotes**: Reserve blockquotes for citations, caveats, or important rules.
- **Headings**: Use sentence or title case consistently; avoid skipping heading levels (e.g. going from `h2` to `h4`).
