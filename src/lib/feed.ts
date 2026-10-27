// RSS 2.0 serialization for the Ideas feed. Pure string building only: the
// route handler (src/app/feed.xml/route.ts) wires this to HTTP. Serialized by
// hand so the dependency surface stays at "marked" alone; article data comes
// from src/lib/articles.ts, so titles, dates, summaries, and draft filtering
// stay single-source with the rest of the site.
import type { ArticleMeta } from "@/lib/articles";
import { articleUrl } from "@/lib/articles";
import { SITE } from "@/content/site";

/** The feed's public URL path, served by src/app/feed.xml/route.ts. */
export const FEED_PATH = "/feed.xml";

/**
 * Shared into every page's `alternates` so reader apps auto-discover the feed
 * sitewide. Page-level metadata replaces the layout's `alternates` wholesale
 * (Next merges segments shallowly), so the layout entry alone never reaches
 * the pages that set their own canonical.
 */
export const FEED_ALTERNATE_TYPES: Record<string, string> = {
  "application/rss+xml": FEED_PATH,
};

/** Escapes text for safe inclusion in XML elements and attributes. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 date (RSS 2.0's required pubDate format) from an ISO yyyy-mm-dd date. */
function rfc822Date(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

/** One <item> per article; link and GUID are absolute, permalink GUIDs. */
function serializeItem(article: ArticleMeta): string {
  const url = articleUrl(article.slug);
  return [
    "    <item>",
    `      <title>${escapeXml(article.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${rfc822Date(article.date)}</pubDate>`,
    `      <description>${escapeXml(article.summary)}</description>`,
    "    </item>",
  ].join("\n");
}

/** The full RSS 2.0 document for the given articles (already filtered and newest first). */
export function buildFeedXml(published: readonly ArticleMeta[]): string {
  // listArticles() sorts newest first, so the first entry is also the last-built.
  const lastBuildDate = published.length > 0 ? `    <lastBuildDate>${rfc822Date(published[0].date)}</lastBuildDate>` : "";

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${SITE.name} — Ideas`)}</title>`,
    `    <link>${SITE.url}/ideas/</link>`,
    `    <description>${escapeXml(`Essays and studio notes from ${SITE.name}'s Ideas blog.`)}</description>`,
    "    <language>en-us</language>",
    lastBuildDate,
    `    <atom:link href="${SITE.url}${FEED_PATH}" rel="self" type="application/rss+xml"/>`,
    ...published.map((article) => serializeItem(article)),
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n");
}
