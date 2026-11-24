import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import Carousel from "@/components/Carousel";
import { formatArticleDate, isByFounder, listArticles, type ArticleMeta } from "@/lib/articles";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";

export const metadata: Metadata = {
  title: "Allie Intelligence",
  description:
    "Essays written by Allie Esslinger, plus studio notes researched and drafted with AI support. No hype, no futurism, just what holds up on a Tuesday morning.",
  alternates: { canonical: "/ideas/", types: FEED_ALTERNATE_TYPES },
};

const CARD_FALLBACK = "/og-card.png";

/** Card art URL for a scrimmed card; the ink scrim itself lives in CSS (.ai-hero/.ai-card::before). */
function cardImage(image?: string): string {
  return `url('${image ?? CARD_FALLBACK}')`;
}

function DraftBadge() {
  return <span className="draft-badge">Draft</span>;
}

/** One card in the Essays medium row or a studio-note carousel: date chip,
 *  label, title, image in background. Founder essays carry the "Essay" label;
 *  studio notes carry the AI label, and series rows the series name. */
function StudioCard({ article, tag = "AI blog post" }: { article: ArticleMeta; tag?: string }) {
  return (
    <a
      data-carousel-card
      href={`/ideas/${article.slug}/`}
      className="ai-card"
      style={{ backgroundImage: cardImage(article.image) }}
    >
      <p className="ai-card__tag">{tag}</p>
      <h3>{article.title}</h3>
      <p className="ai-card__meta">
        {formatArticleDate(article.date)}
        {article.draft ? <DraftBadge /> : null}
      </p>
    </a>
  );
}

export default function ArticlesPage() {
  const articles = listArticles();
  const founderPosts = articles.filter((article) => isByFounder(article));
  const studioPosts = articles.filter((article) => !isByFounder(article));
  // Essays rail: the newest founder essay owns the featured banner, the next
  // three take the medium row, and anything beyond that scrolls in a carousel.
  const [leadPost, ...earlierPosts] = founderPosts;
  const rowPosts = earlierPosts.slice(0, 3);
  const carouselPosts = earlierPosts.slice(3);

  return (
    <>
      <PageHero
        eyebrow="Ideas"
        title="Ideas."
        lede="Essays written by Allie sit up top. Studio notes, researched and drafted with AI, fill the shelves below. No hype. Just some frameworks for how to think about AI when you're sifting through your inbox on any given Tuesday morning."
      />

      {/* The hero tier is reserved for the founder's own writing. */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2>Essays</h2>
            <p>
              <a href="/feed.xml">Subscribe via RSS</a>
            </p>
          </div>
          {leadPost ? (
            <a
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
            </a>
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
          {rowPosts.length > 0 && (
            <div className="ai-row">
              {rowPosts.map((article) => (
                <StudioCard key={article.slug} article={article} tag="Essay" />
              ))}
            </div>
          )}
          {carouselPosts.length > 0 && (
            <Carousel label="Essays">
              {carouselPosts.map((article) => (
                <StudioCard key={article.slug} article={article} tag="Essay" />
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {studioPosts.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <h2>Studio notes</h2>
              <p>Insights about how I approach your work, drafted with AI.</p>
            </div>
            <Carousel label="Studio notes">
              {studioPosts.map((article) => (
                <StudioCard key={article.slug} article={article} />
              ))}
            </Carousel>
          </div>
        </section>
      )}

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
