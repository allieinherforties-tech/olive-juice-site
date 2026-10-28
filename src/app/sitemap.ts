// Emitted as sitemap.xml by the static export. Draft articles are left out:
// they are review copies hidden from search engines until published.
import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { articleUrl, listArticles } from "@/lib/articles";

// Required for output: "export"; the sitemap is fully static.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: readonly string[] = [
    "/",
    "/case-studies/",
    "/about/",
    "/start/",
    "/ideas/",
    "/shut-the-box/",
    "/ai-consulting-nonprofits/",
    "/ai-training-nonprofits/",
    "/ai-policy-nonprofits/",
    "/ai-consulting-small-business/",
    "/ai-restaurants/",
  ];

  const published = listArticles()
    .filter((article) => !article.draft)
    .map((article) => ({
      url: articleUrl(article.slug),
      lastModified: article.date,
    }));

  return [
    ...staticPaths.map((path) => ({ url: `${SITE.url}${path}` })),
    ...published,
  ];
}
