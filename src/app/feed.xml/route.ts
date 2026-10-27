// Emits the Ideas RSS feed as feed.xml in the static export. Serialization
// lives in src/lib/feed.ts; this module is only the build-time wiring.
import { buildFeedXml } from "@/lib/feed";
import { listArticles } from "@/lib/articles";

// Required for output: "export"; the feed is fully static.
export const dynamic = "force-static";

export function GET(): Response {
  // The same !draft filter the sitemap applies: drafts never reach the feed.
  const published = listArticles().filter((article) => !article.draft);
  return new Response(buildFeedXml(published), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
