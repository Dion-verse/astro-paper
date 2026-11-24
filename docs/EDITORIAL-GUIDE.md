# Fieldnotes — Editorial Guide

This guide is the writing companion for FIELDNOTES. It covers how to choose
topics, structure articles, write clearly, and publish consistently.

The goal is a publication that feels useful, honest, and distinctly yours —
not a template filled with SEO boilerplate.

---

## Choosing Article Topics

**Start with what you have already figured out.**

The best articles come from problems you recently solved, questions you
investigated, or ideas you kept returning to. If you spent two hours figuring
something out, there are probably fifty other people who would benefit from
reading what you learned.

Good topic sources:
- A question you answered in conversation that took effort to explain.
- A tool, workflow, or approach you adopted and refined over time.
- A widely-held assumption you disagree with, with reasons.
- Something you misunderstood for a long time and now understand clearly.
- A step-by-step process that lacks a clear, accurate guide.

**Avoid:**
- Writing on topics because they are trending.
- Covering broad territory thinly just to have content.
- Repeating information already well-covered without adding original perspective.

---

## Writing a Compelling Title

A good title does two things: it accurately describes the article, and it
creates enough interest to earn a click.

**Useful patterns:**
- "How to [accomplish specific outcome]" — clearest, most useful
- "Why [common belief] is wrong (and what to do instead)"
- "[Number] [specific things] that [specific audience] should know about [topic]"
- "[Concept]: a practical guide for [audience]"

**Avoid:**
- Vague titles: "Thoughts on productivity" (too broad)
- Clickbait: "You won't believe this workflow hack" (erodes trust)
- Keyword stuffing: "Best AI tools 2026 for bloggers writing blog posts"

**Test:** Read your title aloud. Would a smart, busy person click it?
If not, rewrite it.

---

## Writing a Useful Introduction

Your introduction has one job: convince the reader that the article is worth
their time.

**A strong introduction:**
1. Opens with the problem or question — not with "In this article, I will..."
2. Tells the reader what they will get from reading.
3. Is honest about scope and limitations.
4. Is under 150 words.

**Example (bad):**
> In this article, I am going to talk about content systems and why they are
> important for bloggers who want to grow their audience...

**Example (better):**
> I spent three months publishing inconsistently before I realised the
> problem wasn't motivation — it was infrastructure. This is what a
> minimal content system looks like in practice.

---

## Structuring H2 and H3 Sections

Each H2 (`##`) is a major section of the article.
Each H3 (`###`) is a sub-topic within a section.

**H2 guidelines:**
- Use 3–7 H2 sections for a typical article.
- Each H2 should address a distinct question or step.
- If a section feels too long, it probably needs an H3 or should be its own article.

**H3 guidelines:**
- Use H3 when a major section has 2+ distinct sub-topics.
- Do not use H3 just to add visual variety.
- Do not go deeper than H3 in most articles.

**Practical structure for a how-to article:**
```
## The problem
## Why [conventional approach] does not work
## A better approach
### Step 1: ...
### Step 2: ...
### Step 3: ...
## Common mistakes
## Summary
```

---

## Using Internal Links

Internal links serve readers (they find related content) and help search
engines understand your site structure.

**Practical rules:**
- Link to 2–5 related articles within every new post.
- Use descriptive anchor text: "see [how to structure your content system]"
  not "see [this post]" or "click here".
- When you publish a new article, go back to 1–2 older articles and add a
  link to the new one where relevant.
- Do not link to every article from every article — only link where genuinely useful.

**In markdown:**
```markdown
See also: [How to Build a Content System](/posts/build-a-content-system/)
```

---

## Adding Supporting Images

Images should add meaning, not decoration.

**Useful image types:**
- Diagrams that explain a concept better than prose.
- Screenshots showing exact steps in a process.
- Charts or tables summarising data.
- Code examples (use fenced code blocks instead where possible).

**How to add images in Pages CMS:**
1. Place the cursor where the image should appear.
2. Click the image icon in the editor toolbar.
3. Upload your file — it is saved to `public/images/posts/`.
4. Add a descriptive `alt` attribute (required for accessibility).

**In raw markdown:**
```markdown
![A diagram showing three boxes connected by arrows](/images/posts/my-diagram.png)
*Caption text goes here if needed.*
```

**Guidelines:**
- Use `.webp` or `.jpg` for photos; `.svg` for diagrams and icons.
- Keep file sizes under 400 KB. Use [Squoosh](https://squoosh.app) to compress.
- Always write a meaningful `alt` description.

---

## Using Source References

When you cite data, research, tools or other people's work, link to the source.

```markdown
According to the [2026 State of JS survey](https://stateofjs.com), 68% of
developers now use TypeScript as their primary language.
```

**Rules:**
- Do not invent statistics. If you cannot find the source, say "in my experience" instead.
- Do not quote people without attribution.
- Link to primary sources where possible (the original paper or report, not a
  summary of a summary).

---

## Updating Old Content

Old articles can accumulate inaccuracies as tools and practices evolve.
Updating them is more valuable than publishing new thin content.

**When to update:**
- A tool, API or practice described in the article has changed significantly.
- Readers are pointing out outdated information in comments or messages.
- You have new, better examples or explanations.

**How to update:**
1. Edit the article body with the new information.
2. Set `modDatetime` in the frontmatter to today's date.
3. Add a brief note at the top of the article if the changes are significant:
   > *Updated November 2026 to reflect AstroPaper v7.*
4. Publish via Pages CMS (commit to `main` → auto-deploy).

AstroPaper automatically shows a "Last updated" date when `modDatetime` is set.

---

## Writing Descriptions and Social Previews

The `description` frontmatter field is used in:
- Google search result snippets.
- Open Graph previews (LinkedIn, Slack, iMessage, etc.).
- The article card on your homepage and posts page.
- The Pagefind search index.

**Guidelines:**
- 120–160 characters.
- Describe what the reader will learn or gain.
- Do not repeat the title verbatim.
- Do not keyword-stuff.

**Example:**
```yaml
title: "How to Build a Content System for a Personal Blog"
description: "A minimal, sustainable system for planning, writing, and publishing
  without burning out — built around your actual workflow."
```

---

## Writing the Frontmatter

Every article needs at minimum:

```yaml
---
title: "Your Article Title"
description: "One or two sentences describing what this article is about."
pubDatetime: 2026-11-24
tags: ["writing", "workflow"]
draft: false
---
```

Optional but recommended:

```yaml
modDatetime: 2026-11-24       # Set when you update an article
featured: true                # Show in the homepage featured section
author: "Dawda Mbowe"         # Defaults to site author if omitted
hideToc: false                # Set true for short articles where ToC adds no value
```

---

## Publishing Through Pages CMS

1. Open [app.pagescms.org](https://app.pagescms.org).
2. Select your site → **Articles & Notes → New entry**.
3. Fill in title, description, date, tags and body.
4. Leave **ogImage** blank (auto-generated from title + site colours).
5. Set **Save as Draft** to `false`.
6. Click **Save**.
7. GitHub Actions deploys automatically. Live in ~2 minutes.

For a detailed walkthrough, see [PUBLISHING-GUIDE.md](PUBLISHING-GUIDE.md).

---

## Editorial Standards

**Write for one person, not an audience.**
Imagine a specific reader who has the exact problem your article addresses.
Write to them.

**Be honest about what you know.**
Say "in my experience" when you are sharing an opinion.
Say "I am not certain" when you are not.
Never fabricate data, quotes or first-hand experiences.

**Edit before publishing.**
Read the article aloud before publishing. If a sentence is hard to say,
it is probably hard to read. Cut it or rewrite it.

**Short sentences, plain words.**
Prefer "use" over "utilise". Prefer "find" over "ascertain".
Prefer "because" over "due to the fact that".

**Publish when it is useful, not when it is perfect.**
A complete, honest, 600-word article helps readers more than a 2,000-word
piece you never finish.
