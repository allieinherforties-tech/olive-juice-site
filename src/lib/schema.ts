// Schema.org structured data (JSON-LD) for the whole site, built from copy in
// src/content/site.ts. Rendered as <script type="application/ld+json"> blocks
// by the pages that own each entity:
//   home → Organization + WebSite, about → Person, articles → Article + FAQPage.
import { SITE } from "@/content/site";
import { articleUrl, isByFounder, type ArticleFaq, type ArticleMeta } from "./articles";

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
    // Authorship is honest by design: the founder's own posts name her as a
    // Person; studio notes name the studio as author.
    author: isByFounder(article)
      ? { "@type": "Person", name: SITE.owner, jobTitle: "Founder", url: `${SITE.url}/about/` }
      : { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl(article.slug) },
    url: articleUrl(article.slug),
    ...(article.image ? { image: `${SITE.url}${article.image}` } : {}),
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

/**
 * SoftwareApplication entity for the show finder. Rendered on the case-study page,
 * whose Article JSON-LD sits beside it (the page is both a build story and the app's
 * product record). The description mirrors the finder's own meta description.
 */
export function finderJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Apple TV+ Show Finder",
    url: "https://finder.parentpeptalks.com/",
    applicationCategory: "Entertainment",
    operatingSystem: "Web",
    description:
      "Search the Apple TV+ Kids and Family catalog by what your kid is going through tonight.",
    author: { "@type": "Person", name: SITE.owner, jobTitle: "Founder", url: `${SITE.url}/about/` },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  });
}

/** Article structured data for a case-study page. Authored by the founder: her own build stories. */
export function caseStudyArticleJsonLd(study: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.headline,
    description: study.description,
    datePublished: study.datePublished,
    author: { "@type": "Person", name: SITE.owner, jobTitle: "Founder", url: `${SITE.url}/about/` },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": study.url },
    url: study.url,
  });
}
