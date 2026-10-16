import { Fragment } from "react";
import Link from "next/link";
import { CaseCard, CtaBand, StepList } from "@/components/Blocks";
import { HeartMark, SkylineMark } from "@/components/Marks";
import {
  CASE_STUDIES,
  ENGAGEMENT_STEPS,
  OWN_WORK,
  PRINCIPLES,
  START_CTA,
  WHAT_YOU_GET,
  type InlineSegment,
} from "@/content/site";

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

export default function HomePage() {
  return (
    <>
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
            <Link href={START_CTA.href} className="btn btn--primary">
              {START_CTA.label}
            </Link>
            <Link href="/case-studies/" className="btn btn--ghost">
              See the work
            </Link>
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
              We&rsquo;ll start with how you already make decisions. Then I&rsquo;ll build the tool to fit the way you
              work — and we&rsquo;ll talk through trade-offs and long-term goals without sounding like a robot.
            </p>
          </div>
          <div className="what-you-get">
            <h3>What you get:</h3>
            <ul>
              {WHAT_YOU_GET.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
              The back office at Oliver&rsquo;s, a Chicago restaurant, and the Usher III Initiative&rsquo;s research pipeline. Very
              different work — the same starting point: learn how the client already thinks, then build to fit.
            </p>
          </div>
          <div className="grid grid--2">
            {CASE_STUDIES.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
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
              The strategy and the implementation develop together. That means the plan is constrained by
              what&rsquo;s buildable, and the build reflects the strategy. And it all happens while you keep doing
              the work you&rsquo;re good at.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Beyond a sprint</p>
            <h2>I build my own. I help you build yours.</h2>
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
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>
              Next up: bringing the same hands-on strategy to larger mission-driven institutions, including public
              media and sports organizations.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
