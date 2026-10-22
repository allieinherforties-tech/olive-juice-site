import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import { formatArticleDate, listArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Short, practical pieces on AI, tools, and workflows, written from real engagements. No hype, no futurism, just what holds up on a Tuesday morning.",
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  const articles = listArticles();

  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="Notes on putting AI to work."
        lede="Short, practical pieces on AI, tools, and workflows, written from real engagements. No hype, no futurism, just what holds up on a Tuesday morning."
      />

      <section className="section">
        <div className="container">
          {articles.length === 0 ? (
            <p className="lede">No articles yet. The first ones are being drafted.</p>
          ) : (
            <div className="grid grid--2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}/`}
                  className="card card--link article-card"
                >
                  <p className="card__meta">
                    {formatArticleDate(article.date)}
                    {article.draft ? <span className="draft-badge">Draft</span> : null}
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <span className="card__more">Read the article →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
