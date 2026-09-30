import Link from "next/link";
import { CaseCard, CtaBand, StepList } from "@/components/Blocks";
import { HeartMark, SkylineMark } from "@/components/Marks";
import { CASE_STUDIES, ENGAGEMENT_STEPS, OWN_WORK, PRINCIPLES, START_CTA } from "@/content/site";

const WHAT_YOU_GET_SOLD = [
  "A chatbot nobody asked for",
  "A new dashboard to learn",
  "A six-month transformation program",
  "Speeches about the post-human future",
];

const WHAT_YOU_ACTUALLY_NEED = [
  "Calmer mornings",
  "A faster, repeatable search",
  "Decisions made earlier",
  "More time for the work you're good at",
];

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
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow">AI for mission-driven organizations &amp; craft-led local businesses</p>
          <h1>
            Built for how you <em>already</em> work.
          </h1>
          <p className="lede">
            You didn&rsquo;t get into this to run software. Olive Juice Digital builds AI-powered tools and workflows
            that fit the way you already think — so you keep doing the work you&rsquo;re good at, and the operational
            and research grind around it gets lighter.
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
            <h2>I don&rsquo;t sell AI. I translate it.</h2>
            <p>
              Almost every AI consultant says some version of &ldquo;I help you use AI.&rdquo; I start somewhere else:
              with how you already make decisions. Then I build the tool to fit that — AI-shaped on the inside,
              outcome-shaped on the outside.
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
              <h3>What you actually needed</h3>
              <ul>
                {WHAT_YOU_ACTUALLY_NEED.map((item) => (
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
              Not a transformation program. A contained discovery and build that proves itself fast, then keeps running
              quietly in the background.
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
            <p className="eyebrow">Beyond client work</p>
            <h2>Building AI products, and helping founders build theirs.</h2>
          </div>
          <div className="grid grid--2">
            {OWN_WORK.map((item) =>
              item.url ? (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card--link"
                >
                  <p className="card__meta">{item.role}</p>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </a>
              ) : (
                <div key={item.name} className="card">
                  <p className="card__meta">{item.role}</p>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>
              Next up: bringing the same approach to larger mission-driven institutions, including public media.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
