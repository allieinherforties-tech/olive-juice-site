import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Blocks";
import { articleUrl, formatArticleDate, getArticle, listArticles } from "@/lib/articles";
import { articleJsonLd, faqJsonLd } from "@/lib/schema";
import { SITE } from "@/content/site";

export const dynamicParams = false;

type ArticlePageProps = { params: Promise<{ slug: string }> };

/** Prebuild one page per markdown file at build time (static export). */
export function generateStaticParams(): { slug: string }[] {
  return listArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const ogImage = { url: "/og-card.png", width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/articles/${article.slug}/` },
    // Drafts are review copies: reachable by direct link, invisible to search engines.
    robots: article.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: articleUrl(article.slug),
      publishedTime: article.date,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const date = formatArticleDate(article.date);

  return (
    <>
      {/* Structured data only for published articles: drafts are noindexed review copies. */}
      {!article.draft && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }} />
          {article.faq.length > 0 && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(article.faq) }} />
          )}
        </>
      )}

      <section className="page-hero article-hero">
        <div className="container">
          <p className="eyebrow">
            {date} · By {article.author}
            {article.draft ? <span className="draft-badge">Draft</span> : null}
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.summary}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {article.draft ? (
            <p className="draft-note" role="note">
              Draft preview: this article is not published. It is left out of the sitemap and hidden from search
              engines until the draft flag comes off.
            </p>
          ) : null}
          {/* Repo-authored markdown compiled by the build-time loader. */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

          {article.faq.length > 0 && (
            <div className="article-faq">
              <h2>Common questions</h2>
              <dl className="faq">
                {article.faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <p className="article-backlink">
            <Link href="/articles/">More articles →</Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
