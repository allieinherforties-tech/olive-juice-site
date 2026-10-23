import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Blocks";
import Carousel from "@/components/Carousel";
import { formatArticleDate, isByFounder, listArticles, type ArticleMeta } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Allie Intelligence",
  description:
    "Essays written by Allie Esslinger, plus studio notes researched and drafted with AI support. No hype, no futurism, just what holds up on a Tuesday morning.",
  alternates: { canonical: "/ideas/" },
};

const CARD_FALLBACK = "/og-card.png";

/** Card art URL for a scrimmed card; the ink scrim itself lives in CSS (.ai-hero/.ai-card::before). */
function cardImage(image?: string): string {
  return `url('${image ?? CARD_FALLBACK}')`;
}

function DraftBadge() {
  return <span className="draft-badge">Draft</span>;
}

/** One studio note in the carousel: date chip, AI label, title, image in background. */
function StudioCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      data-carousel-card
      href={`/ideas/${article.slug}/`}
      className="ai-card"
      style={{ backgroundImage: cardImage(article.image) }}
    >
      <p className="ai-card__tag">AI blog post</p>
      <h3>{article.title}</h3>
      <p className="ai-card__meta">
        {formatArticleDate(article.date)}
        {article.draft ? <DraftBadge /> : null}
      </p>
    </Link>
  );
}

export default function ArticlesPage() {
  const articles = listArticles();
  const founderPosts = articles.filter((article) => isByFounder(article));
  const studioPosts = articles.filter((article) => !isByFounder(article));
  const [leadPost, secondPost] = founderPosts;
  const seriesNames = [
    ...new Set(articles.map((article) => article.series).filter((series): series is string => Boolean(series))),
  ];

  return (
    <>
      <PageHero
        eyebrow="Ideas"
        title="Ideas."
        lede="Essays written by Allie sit up top; studio notes, researched and drafted with AI support and edited before they ship, fill the shelves below. No hype, no futurism, just what holds up on a Tuesday morning."
      />

      {/* The hero tier is reserved for the founder's own writing. */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2>Allie Intelligence</h2>
          </div>
          {leadPost ? (
            <Link
              href={`/ideas/${leadPost.slug}/`}
              className="ai-hero"
              style={{ backgroundImage: cardImage(leadPost.image) }}
            >
              <p className="ai-hero__kicker">
                {formatArticleDate(leadPost.date)}
                {leadPost.draft ? <DraftBadge /> : null}
              </p>
              <h2>{leadPost.title}</h2>
              <p className="ai-hero__sub">{leadPost.summary}</p>
              <span className="card__more">Read the essay →</span>
            </Link>
          ) : (
            <div className="ai-hero ai-hero--empty">
              <p className="ai-hero__kicker">Latest from Allie</p>
              <h2>The next essay in Allie’s own voice is on the drafting table.</h2>
              <p className="ai-hero__sub">
                Everything published below carries the studio’s byline until it is ready. When Allie publishes, it
                takes this spot.
              </p>
            </div>
          )}
        </div>
      </section>

      {studioPosts.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <h2>Studio notes</h2>
              <p>AI-supported drafts, edited and approved by a human before they publish.</p>
            </div>
            <Carousel label="Studio notes">
              {studioPosts.map((article) => (
                <StudioCard key={article.slug} article={article} />
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {secondPost && (
        <section className="section section--tight">
          <div className="container">
            <Link href={`/ideas/${secondPost.slug}/`} className="ai-feature">
              <div>
                <p className="ai-hero__kicker ai-hero__kicker--ink">
                  Also by Allie · {formatArticleDate(secondPost.date)}
                  {secondPost.draft ? <DraftBadge /> : null}
                </p>
                <h2>{secondPost.title}</h2>
                <p className="lede">{secondPost.summary}</p>
                <span className="card__more">Read the essay →</span>
              </div>
              <div
                className="ai-feature__media"
                style={{ backgroundImage: `url('${secondPost.image ?? CARD_FALLBACK}')` }}
              />
            </Link>
          </div>
        </section>
      )}

      {seriesNames.map((series) => (
        <section key={series} className="section section--tight">
          <div className="container">
            <div className="section-head">
              <h2>{series}</h2>
            </div>
            <Carousel label={series}>
              {articles
                .filter((article) => article.series === series)
                .map((article) => (
                  <StudioCard key={article.slug} article={article} />
                ))}
            </Carousel>
          </div>
        </section>
      ))}

      {articles.length === 0 && (
        <section className="section">
          <div className="container">
            <p className="lede">No articles yet. The first ones are being drafted.</p>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
