import { Fragment } from "react";
import type { Metadata } from "next";
import { CaseCard, CtaBand, StepList } from "@/components/Blocks";
import { HeartMark, SkylineMark } from "@/components/Marks";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";
import {
  CASE_STUDIES,
  ENGAGEMENT_STEPS,
  OWN_WORK,
  PRINCIPLES,
  START_CTA,
  WHAT_YOU_GET,
  type InlineSegment,
} from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: FEED_ALTERNATE_TYPES },
};

const WHAT_YOU_GET_SOLD = [
  "A chatbot nobody asked for",
  "A new dashboard to learn",
  "A six-month transformation program",
  "Speeches about the post-human future",
];

/** Renders copy segments, linking out where a segment carries a URL. */
function InlineSegments({ segments }: { segments: readonly InlineSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === "string" ? (
          <Fragment key={i}>{segment}</Fragment>
        ) : (
          <a key={i} href={segment.url} target="_blank" rel="noopener noreferrer">
            {segment.label}
          </a>
        ),
      )}
    </>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 56 24" aria-hidden="true">
      <path d="M2 12h48M40 3l10 9-10 9" fill="none" stroke="var(--olive)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Site-level entities (technical audit, finding 4). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd() }} />

      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">AI for mission-driven organizations &amp; craft-led local businesses</p>
          <h1>
            Built for how you <em>already</em> work.
          </h1>
          <p className="lede">
            You&rsquo;d rather spend your time doing the work you love than learning a new AI tool. Olive Juice Digital
            makes AI to support your mission, your passion, and your way of life.
          </p>
          <div className="btn-row">
            <a href={START_CTA.href} className="btn btn--primary">
              {START_CTA.label}
            </a>
            <a href="/case-studies/" className="btn btn--ghost">
              See the work
            </a>
          </div>
          <SkylineMark className="hero__skyline" />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The difference</p>
            <h2>I&rsquo;m really good at speaking your language.</h2>
            <p>
              We&rsquo;ll start with how you already make decisions. Then I&rsquo;ll build out ways to make it faster,
              easier and more valuable. We&rsquo;ll talk through the trade-offs of a tool v a system and pull in your
              long-term goals without sounding like a robot.
            </p>
          </div>
          <div className="translation">
            <div className="translation__col translation__col--muted">
              <h3>What most AI pitches sell you</h3>
              <ul>
                {WHAT_YOU_GET_SOLD.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="translation__arrow">
              <ArrowRight />
            </div>
            <div className="translation__col">
              <h3>What you get:</h3>
              <ul>
                {WHAT_YOU_GET.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>What I believe about AI for small, serious teams.</h2>
          </div>
          <div className="grid grid--3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Proof</p>
            <h2>Two engagements, one method.</h2>
            <p className="lede">
              The back office at Oliver&rsquo;s, a Chicago restaurant, and the Usher III Initiative&rsquo;s research pipeline.
            </p>
          </div>
          <div className="grid grid--2">
            {CASE_STUDIES.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </div>
          <div className="section-head section-head--sub">
            <h3>Beyond a sprint</h3>
          </div>
          <div className="grid grid--2">
            {OWN_WORK.map((item) => (
              <div key={item.name} className="card">
                <p className="card__meta">{item.role}</p>
                <h3>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p>
                  <InlineSegments segments={item.detail} />
                </p>
              </div>
            ))}
          </div>
          <div className="pull pull--in-section">
            <HeartMark className="pull__heart" />
            <p>
              Next up: bringing the same hands-on strategy to larger mission-driven institutions, including public
              media and sports organizations.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it starts</p>
            <h2>A small, paid first yes.</h2>
            <p className="lede">
              A contained discovery and build is the best way to prove value fast. It keeps running in the background
              while we work on strategy and systems change.
            </p>
          </div>
          <StepList steps={ENGAGEMENT_STEPS} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>
              The strategy and the implementation develop together. And it all happens while you keep doing the work
              you&rsquo;re good at.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
