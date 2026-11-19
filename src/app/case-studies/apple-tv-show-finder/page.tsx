import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { SITE } from "@/content/site";
import { caseStudyArticleJsonLd, finderJsonLd } from "@/lib/schema";

// Live finder, owned product. The finder reads ?q= on load and runs the search
// immediately, so the embed below lands with results already on screen.
const FINDER_URL = "https://finder.parentpeptalks.com/";
const PREFILLED_EMBED = `${FINDER_URL}?q=stop%20the%20pre-dinner%20meltdown`;

// The rendered headline is the product name; the metadata <title> stays descriptive
// so search results and browser tabs keep the fuller context.
const HEADLINE = "Show Finder";
const METADATA_TITLE = "Show Finder — case study: the Apple TV+ kids catalog finder";
const DESCRIPTION =
  "How Olive Juice Digital built a finder that turns a parent moment into the right Apple TV+ episode: curation over algorithm, proven live.";
const DATE_PUBLISHED = "2026-11-19";

export const metadata: Metadata = {
  title: METADATA_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/case-studies/apple-tv-show-finder/" },
  openGraph: {
    type: "article",
    title: METADATA_TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/case-studies/apple-tv-show-finder/`,
    publishedTime: DATE_PUBLISHED,
    images: [
      { url: "/og-card.png", width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` },
    ],
  },
};

export default function AppleTvShowFinderCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: finderJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: caseStudyArticleJsonLd({
            headline: HEADLINE,
            description: DESCRIPTION,
            url: `${SITE.url}/case-studies/apple-tv-show-finder/`,
            datePublished: DATE_PUBLISHED,
          }),
        }}
      />

      <PageHero
        eyebrow="Case study · Apple TV+ show finder"
        title={HEADLINE}
        lede="The right episode for the moment you're standing in. A kid asks for a show while dinner boils over, and the parent on duty has half an attention span to spend. The finder turns that moment into one episode. This page is how it was built, and why it runs on curation instead of an algorithm."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Curation over algorithm</h2>
            <p>
              Every streaming platform answers a kid's show request the same way: an
              algorithm ranks a wall of posters, autoplay fills the silence, and the parent
              supervises. Those systems optimize for watch time, because watch time is what
              the platforms sell. User research from a previous kids-media strategy project
              named the gap in that deal: &ldquo;parents don&rsquo;t want more choice, they
              want more confidence in the choices presented.&rdquo;
            </p>
            <p>
              Confidence comes from a person who watched the episode and can say what it
              does to a kid. That standard shaped every choice in the build, starting with
              the catalog: Apple TV+ holds, pound for pound, the best kids collection
              outside PBS, and nobody had curated it for the parent standing in the
              kitchen. The finder maps that catalog by moments rather than genres, because
              the parent's question is about tonight, and no poster wall answers it.
            </p>
            {/* TODO(spec beat 3): a real dead end from the build belongs here, named
                and dropped in a short paragraph. Supply it from firsthand memory of
                the build; do not invent one. */}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>How it works</h2>
            <p>
              Three screens do the work. Each one meets the parent at a different distance
              from the couch.
            </p>

            <h3>Browse the map when you have a minute</h3>
            <p>
              The Browse by show rail lays every series out as posters, and the rails
              beneath it gather episodes around what's happening in a house right now, like
              a season of gratitude or a string of cozy bedtimes. Every episode carries
              tags for age range, feelings, and vibe, so the map reads at a glance.
            </p>
            <figure>
              <img
                src="/case-studies/apple-tv-show-finder/rail.webp"
                alt="The finder's Browse by show rail of Apple TV+ series posters, with a seasonal rail of episode cards beneath it"
                width={1360}
                height={818}
                loading="lazy"
              />
            </figure>

            <h3>Search in your own words when you have thirty seconds</h3>
            <p>
              The query box takes plain parent language: stop the pre-dinner meltdown,
              scared of the dark, big feelings. Filters for feeling, age, and vibe sit
              beside the box, and none of it needs special syntax.
            </p>
            <figure>
              <img
                src="/case-studies/apple-tv-show-finder/search.webp"
                alt="The finder's search box with the words stop the pre-dinner meltdown typed in"
                width={1360}
                height={956}
                loading="lazy"
              />
            </figure>

            <h3>Get an episode, with its story attached</h3>
            <p>
              Each result names the show, the season and episode, the age range, and the
              feelings it works through. The top hit for stop the pre-dinner meltdown is
              Stillwater's Waiting, tagged frustrated and impatient, and its synopsis opens
              on a wait at a train station that tips a kid into a full meltdown. One
              sentence tells the parent the episode fits the moment, and the Watch button
              hands over the link.
            </p>
            <figure>
              <img
                src="/case-studies/apple-tv-show-finder/result.webp"
                alt="The finder's result card for Stillwater, Waiting, season 3 episode 1, tagged ages 5 to 7, frustrated and impatient"
                width={1360}
                height={956}
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Use it</h2>
            <p>
              The finder is live below, preloaded with the meltdown query. Change the words
              and the results follow. If the embed ever misbehaves, the finder runs on its
              own at{" "}
              <a href={FINDER_URL} target="_blank" rel="noopener noreferrer">
                finder.parentpeptalks.com
              </a>
              .
            </p>
            <iframe
              src={PREFILLED_EMBED}
              title="Apple TV+ show finder, preloaded with a parent-moment query"
              loading="lazy"
              style={{ width: "100%", height: 780, border: 0, borderRadius: 12 }}
            />
            {/* TODO(spec beat 5): two honest limitations of the finder belong here,
                written in the site's candid register. Needs firsthand input; no
                placeholder ships in the visible page. */}
            <p>
              The finder came out of a bigger argument about what the paywall owes
              parents. Allie makes it in{" "}
              <a href="/ideas/the-streamers-sold-us-out/">The Streamers Sold Us Out</a>,
              the first essay in the Apple TV+ portfolio.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Have a product shaped like this one?" />

      <section className="section--tight">
        <div className="container">
          <p className="article-backlink">
            <a href="/case-studies/">More case studies →</a>
          </p>
        </div>
      </section>
    </>
  );
}
