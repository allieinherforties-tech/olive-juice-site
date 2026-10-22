# How to publish an article

Everything on **Allie Intelligence** (`/articles/`) is a markdown file in this
folder. The filename becomes the URL slug: `my-post.md` publishes at
`/articles/my-post/`. There is no CMS and no database: a file here is the
whole post.

## The two tiers (how the index decides where a post goes)

- **`author: Allie Esslinger`** → the **hero tier**. The most recent
  founder-authored post becomes the big hero card at the top of the index;
  the next one becomes the "Also by Allie" feature block. These are the
  posts written in Allie's own voice.
- **Any other author, or no author key** → a **studio note**. These resolve
  to "Olive Juice Digital" and fill the carousel rows (date chip, AI blog
  post label, title, image in background). The machine never takes the hero.

Optional `series: <name>` groups studio notes into a named carousel row.

## Publishing a post

1. Start from the template at the bottom of this file.
2. Save it as `content/articles/<your-slug>.md` (lowercase, hyphens, no dates
   in the filename; the slug is permanent once published).
3. Add a hero image to `public/articles/<your-slug>-hero.png` and point the
   `image` key at it (see below).
4. Either edit the file directly on GitHub (open
   `content/articles/`, click **Add file**, paste, commit to `main`), or
   hand the draft to the Allie Intelligence thread and it will be committed
   through a pull request for review.
5. Pushing to `main` runs the deploy. About a minute later the post is live.

## Frontmatter reference

Every key is a single line of `key: value`. Unknown keys or malformed lines
**fail the build loudly** (a broken post should stop the deploy, not publish
quietly).

| Key | Required | Rules |
|---|---|---|
| `title` | yes | One line. Becomes the H1 and the metadata title. |
| `date` | yes | `yyyy-mm-dd`. |
| `summary` | yes | One line. The deck under the headline and the description for search results. |
| `draft` | yes | `true` or `false`. Drafts show a badge, are noindexed, left out of the sitemap, and get no structured data. |
| `author` | no | `Allie Esslinger` for founder posts; omit (or use `Olive Juice Digital`) for studio notes. |
| `series` | no | Groups the post into a named carousel on the index (e.g. `Built with AI`). |
| `image` | no | Card art path under `public/`, e.g. `/articles/my-post-hero.png`. Falls back to the first image in the body, then the brand card. |
| `faq` | no | List of `question` / `answer` pairs (2-space indent, see template). Renders as "Common questions" and emits FAQPage structured data on published posts. |

## Authorship and structured data (why the author key matters)

Published posts emit `Article` structured data. Founder posts name **Allie
Esslinger as a Person** (linked to the about page); studio notes name **Olive
Juice Digital**. Attribution is never borrowed: search and AI engines see
exactly who wrote what, which is what makes the hero tier count as *her*
writing. The article page shows a matching byline line.

## Linking out to Allie's other ventures

The "Built with AI" series and similar posts may link to Allie's ventures
naturally, in body copy, where they genuinely illustrate the point. Approved
destinations:

- parentpeptalks.com
- comfort-vice.myshopify.com
- queue.lgbt
- oneday.org
- blockpartysupply.co
- barclaystonight.com

Rules of thumb: link once per mention, inside a sentence that earns it
("built for X, and here is how it was made"), never as a promo block, link
list, or call to action. The reading experience always comes first.

## House style

- No em dashes in body copy (en dashes are fine).
- Internal links point at real sections: `/case-studies/`, `/start/`,
  `/about/`, and other articles.
- Claims trace to published site copy or approved briefs. No invented
  metrics, client results, or testimonials.
- Add FAQs when the post answers questions a real buyer would ask; they
  double as FAQPage structured data for search and AI engines.

## Template

```markdown
---
title: The working title of the post
date: 2026-10-22
summary: One line that sells the read without hyping it.
draft: true
author: Allie Esslinger
series: Built with AI
image: /articles/my-post-hero.png
faq:
  - question: The question a real reader would ask?
    answer: The direct answer, in one or two sentences.
---

The body, in markdown. The hero image renders first if embedded:

![Alt text](/articles/my-post-hero.png)
```
