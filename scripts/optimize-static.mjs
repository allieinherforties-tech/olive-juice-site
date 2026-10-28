#!/usr/bin/env node
/**
 * Post-build optimizer for the static export (technical audit, finding 6).
 *
 * The audit's mobile LCP trace showed the homepage transferring ~925 KB, over half
 * of it React framework chunks that a mostly-static marketing site never uses, plus
 * a render-blocking stylesheet request. This script runs after `next build` and:
 *
 *   1. Inlines each page's stylesheet <link> as a single <style> block, removing the
 *      last render-blocking request from every page.
 *   2. Strips React hydration scripts (framework chunks, bootstrap, RSC flight data)
 *      from pages with no client components, so they ship zero JavaScript.
 *
 * Routes listed in HYDRATED keep their runtime: /start/ uses the inquiry form and
 * /ideas/ uses the carousel arrows. Everything else is plain HTML by design.
 *
 * Safety net: a stripped page that references any chunk beyond the shared set used
 * by all stripped pages fails the build — that shape is what a client component on
 * a stripped page looks like. Add the route to HYDRATED instead. (A client
 * component added to every page — e.g. the root layout — would land in the shared
 * set and bypass this check, so add the route to HYDRATED explicitly in that case.)
 *
 * npm and bun both run this because it is chained into the `build` script itself.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname;

/** Routes that ship client components and must keep their React runtime. */
const HYDRATED = new Set(["/start/", "/ideas/", "/about/"]);

/** Collect every generated HTML page as a route path ("/", "/about/", ...). */
function listHtmlPages(dir = OUT, prefix = "") {
  const pages = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      pages.push(...listHtmlPages(full, `${prefix}${entry}/`));
    } else if (entry.endsWith(".html")) {
      pages.push({
        path: entry === "index.html" ? `/${prefix}` : `/${prefix}${entry}`,
        file: full,
      });
    }
  }
  return pages;
}

function chunkRefs(html) {
  return new Set([...html.matchAll(/\/_next\/static\/chunks\/[a-z0-9._-]+\.js/g)].map((m) => m[0]));
}

const pages = listHtmlPages();
let cssKb = 0;
let strippedKb = 0;
const strippedPages = pages.filter(({ path }) => !HYDRATED.has(path));

// Shared chunk set = intersection across stripped pages. Anything a single stripped
// page references beyond it is app code that would be silently disabled by stripping.
// Pages referencing no chunks at all are inert hand-written HTML copied from public/
// (e.g. the /how-i-work/ redirect stub) — exempt from both the math and the strip.
function chunkRefsOf(file) {
  return chunkRefs(readFileSync(file, "utf8"));
}

let shared = null;
for (const { file } of strippedPages) {
  const refs = chunkRefsOf(file);
  if (refs.size === 0) continue;
  if (!shared) {
    shared = refs;
  } else {
    shared = new Set([...shared].filter((c) => refs.has(c)));
  }
}

let failed = false;
for (const { path, file } of pages) {
  let html = readFileSync(file, "utf8");
  const original = html;

  // 1. Inline the stylesheet (every page, hydrated or not).
  const linkMatch = html.match(/<link rel="stylesheet" href="(\/_next\/static\/chunks\/[^"]+\.css)"[^>]*>/);
  if (linkMatch) {
    const cssPath = join(OUT, linkMatch[1]);
    if (!existsSync(cssPath)) {
      console.error(`optimize-static: CSS file missing for ${path}: ${linkMatch[1]}`);
      failed = true;
      continue;
    }
    const css = readFileSync(cssPath, "utf8");
    if (css.includes("</style")) {
      console.error(`optimize-static: CSS contains </style>; refusing to inline for ${path}`);
      failed = true;
      continue;
    }
    // The stylesheet's own URL was /_next/static/chunks/<file>.css, so its relative
    // font urls (../media/...) resolved against /_next/static/. Once inlined into a
    // page they would resolve against the page URL and 404 — make them absolute.
    const cssInlined = css.replaceAll("url(../media/", "url(/_next/static/media/");
    html = html.replace(linkMatch[0], `<style>${cssInlined}</style>`);
    cssKb += Buffer.byteLength(cssInlined);
  }

  // 2. Strip hydration runtime from non-hydrated pages.
  if (!HYDRATED.has(path)) {
    const refs = chunkRefsOf(file);
    const extra = [...refs].filter((c) => !shared?.has(c));
    if (extra.length > 0) {
      console.error(
        `optimize-static: ${path} references app chunk(s) outside the shared set (${extra.join(", ")}).` +
          ` If this page has a client component, add "${path}" to HYDRATED in scripts/optimize-static.mjs.`,
      );
      failed = true;
      continue;
    }
    const before = Buffer.byteLength(html);
    html = html
      .replace(/<script src="\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>\s*/g, "")
      .replace(/<script>\s*\(?\s*self\.__next_f[\s\S]*?<\/script>\s*/g, "")
      .replace(/<link rel="preload"[^>]*as="script"[^>]*>\s*/g, "");
    strippedKb += before - Buffer.byteLength(html);
  }

  if (html !== original) writeFileSync(file, html);
}

if (failed) process.exit(1);

console.log(
  `optimize-static: inlined ${(cssKb / 1024).toFixed(1)} KB of CSS across ${pages.length} pages;` +
    ` stripped ${(strippedKb / 1024).toFixed(1)} KB of hydration runtime from ${strippedPages.length} non-hydrated pages` +
    ` (kept: ${[...HYDRATED].join(", ")})`,
);
