# Olive Juice Digital — olivejuice.digital

Marketing site for Olive Juice Digital. Next.js (App Router) with a fully static export:
`npm run build` writes plain HTML/CSS to `out/`, which GitHub Pages serves. No server to maintain.

## Editing copy

All site copy lives in **`src/content/site.ts`** — case studies, engagement steps, principles,
contact email, and nav. Page layouts in `src/app/*/page.tsx` read from it.

Every claim traces to the *Olive Juice Digital — Positioning Brief*. Don't add metrics, reviews,
or client results that aren't in the brief.

### Placeholders

Unfilled values live in the `PLACEHOLDERS` object in `src/content/site.ts` and render on the
site with a yellow highlight, so a missed swap is visible rather than silently wrong.

```bash
npm run placeholders   # lists what's left; exits 1 while any remain
```

Currently none open.

## Articles

Articles are markdown files in **`content/articles/`**. The filename becomes the URL
slug (`my-post.md` → `/articles/my-post/`). The frontmatter block drives the page,
the list card, and the JSON-LD schema:

```
---
title: You only need 5% of the model
date: 2026-10-19
summary: One paragraph, shown in list cards and search results.
draft: true
faq:
  - question: Who is this for?
    answer: One or two sentences.
---
```

Rules: `title`, `date` (`yyyy-mm-dd`), `summary`, and `draft` are required; `faq` is
optional; values are single-line, double quotes optional. Anything the parser does not
understand fails the build with the file and line number.

- **`draft: true`** shows a visible Draft badge, sets `noindex`, and keeps the article
  out of `sitemap.xml`. Flip to `draft: false` to publish.
- **`faq`** entries render at the end of the article and emit FAQPage structured data
  (Article structured data is emitted for every published article).
- The body is regular markdown (compiled by `marked` at build time; no runtime cost).
  Site copy rules apply to articles too: every claim traces to the Positioning Brief.

Discoverability plumbing (technical audit, October 2026): `src/app/sitemap.ts` emits
`sitemap.xml` from the routes plus published articles; `public/robots.txt` points
crawlers at it; every page sets a canonical URL; `public/og-card.png` is the shared
social-share image (replace the file to change it).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static output in ./out
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

**One-time setup (repo admin):** Settings → Pages → Build and deployment → Source: **GitHub Actions**.

### Custom domain: olivejuice.digital

`public/CNAME` already contains `olivejuice.digital`.

**Before adding records:** as of 2026-09-29 the apex has two existing A records
(`76.223.105.230`, `13.248.243.5`) and `www` is a CNAME to the apex. Delete those A records
(and any registrar domain forwarding/parking) and edit the `www` record. GitHub Pages fails its
DNS check if other A records remain on `@`.

**Do not touch the MX record** (`olivejuice-digital.mail.protection.outlook.com`) or any
TXT/CNAME records for email (SPF, DKIM, autodiscover). They carry mail for
`hello@olivejuice.digital`.

At the domain registrar, set:

| Type  | Host / Name | Value                                  |
|-------|-------------|----------------------------------------|
| A     | `@`         | `185.199.108.153`                      |
| A     | `@`         | `185.199.109.153`                      |
| A     | `@`         | `185.199.110.153`                      |
| A     | `@`         | `185.199.111.153`                      |
| CNAME | `www`       | `allieinherforties-tech.github.io`     |

Optional IPv6 (AAAA on `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

Then in Settings → Pages: enter `olivejuice.digital` as the custom domain, wait for the DNS
check to pass, and tick **Enforce HTTPS** once the certificate is issued (can take up to 24h).

Source: GitHub Docs, "Managing a custom domain for your GitHub Pages site".
