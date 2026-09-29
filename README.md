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

Currently open: sprint price and sprint length (Start a Project page).

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

`public/CNAME` already contains `olivejuice.digital`. At the domain registrar, add:

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
