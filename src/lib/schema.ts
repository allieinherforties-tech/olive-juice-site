// Schema.org structured data (JSON-LD) for the whole site, built from copy in
// src/content/site.ts. Rendered as <script type="application/ld+json"> blocks
// by the pages that own each entity:
//   home → Organization + WebSite, about → Person, articles → Article + FAQPage.
import { SITE } from "@/content/site";
import { articleUrl, type ArticleFaq, type ArticleMeta } from "./articles";

/** Entity for the studio itself. Rendered on the homepage. */
export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.owner, jobTitle: "Founder" },
  });
}

/** Entity for the site as a whole. Rendered on the homepage. */
export function websiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
  });
}

/** Entity for Allie. Rendered on the About page. */
export function personJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.owner,
    jobTitle: "Founder",
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/about/`,
  });
}

/** Article structured data. Only rendered for published articles (drafts are noindexed). */
export function articleJsonLd(article: ArticleMeta): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: { "@type": "Person", name: SITE.owner },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl(article.slug) },
    url: articleUrl(article.slug),
  });
}

/** FAQPage structured data. Answers must also be visible on the page; the article renders them as a definition list. */
export function faqJsonLd(faq: readonly ArticleFaq[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}
