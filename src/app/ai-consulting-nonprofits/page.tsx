import type { Metadata } from "next";
import { PageHero, StepList } from "@/components/Blocks";
import { InquiryForm } from "@/components/InquiryForm";
import {
  FurtherReading,
  ServiceCta,
  type FurtherLink,
} from "@/components/ServiceBlocks";
import { HeartMark } from "@/components/Marks";
import type { Principle, Step } from "@/content/site";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";

export const metadata: Metadata = {
  title: "AI Consulting for Nonprofits",
  description:
    "AI consulting for nonprofits without the tech project: paid discovery maps your routines, one sprint fixes a nagging problem. No transformation roadmap",
  alternates: {
    canonical: "/ai-consulting-nonprofits/",
    types: FEED_ALTERNATE_TYPES,
  },
};

// Approved Copy v2 ("Five Positioning Pages", Page 1). Local constants hold the
// page's approved copy; nothing here changes copy published on existing pages.
const PITCHES_SOLD = [
  "A chatbot nobody asked for.",
  "A new dashboard to learn.",
  "A six-month transformation program.",
  "Speeches about the post-human future.",
];

// The approved short step bodies. (site.ts ENGAGEMENT_STEPS step 03 carries a
// longer closing sentence; the approved page copy renders the short form.)
const STEPS: readonly Step[] = [
  {
    label: "01",
    title: "Paid discovery",
    body: "We'll start by learning how you already think and work. You'll get a clear map of where AI can improve your workflows, based on your routines and the tools you already use.",
  },
  {
    label: "02",
    title: "Project sprint",
    body: "Our first job is a solution to a nagging problem: a defined scope, set against a turnaround timeline, that gets you results before you're asked to evaluate a transformation roadmap.",
  },
  {
    label: "03",
    title: "Retainer",
    body: "If the tool earns its keep, we keep it running quietly in the background and build the next piece.",
  },
];

// The cleared walk-away list as published on /start/ (kept verbatim there; this
// page carries its own copy of the approved strings — /start was not touched).
const WALK_AWAY_WITH = [
  "A map of how your team already works — the routines, tools, and decisions that eat the week",
  "A short, ranked list of where AI would genuinely lighten the load (and where it wouldn't)",
  "A scoped plan for the first project sprint, with a defined end date",
  "A framework for how to prioritize the capabilities against your goals",
];

const PRINCIPLES: readonly Principle[] = [
  {
    title: "5% of the model is enough",
    body: "You don't need the frontier of what AI can do. A small, well-chosen slice of a model's capability pointed at the right problem does more for a restaurant or a research team than the flashiest demo.",
  },
  {
    title: "No hype",
    body: "A lot of AI consulting is people geeking out about the future and selling a tool nobody asked for. I'd rather talk about your Tuesday mornings.",
  },
  {
    title: "Outcomes > Deliverables",
    body: "Metrics are defined by the outcomes of the tools and workflows we develop: calmer mornings, easier routines, or value generated via time-back and revenue gained.",
  },
  {
    title: "AI supports the business behind the art",
    body: "The first jobs for AI are the ones around the work — the scheduling, the reporting, the admin — so more of the week goes to the work itself.",
  },
];

const FAQ = [
  {
    q: "Do we need to be technical?",
    a: "No. The point is that you shouldn't have to be. I learn your work; you don't have to learn mine.",
  },
  {
    q: "Who is this for?",
    a: "Mission-driven nonprofits that already run something well and want to make sure AI keeps the work at the center of the workweek — not the other way around.",
  },
  {
    q: "Not sure where AI fits yet?",
    a: "That's exactly what discovery is for. You'll get the map — including where AI wouldn't lighten the load.",
  },
];

// Published essays only — draft essays stay unlinked until they publish.
const FURTHER_READING: readonly FurtherLink[] = [
  {
    href: "/ideas/you-only-need-5-percent-of-the-model/",
    label: "5% of the model is enough: the only AI strategy a small team needs",
  },
  {
    href: "/ideas/the-work-behind-the-work/",
    label: "The Work Behind the Work",
  },
];

export default function AiConsultingNonprofitsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI consulting for nonprofits"
        title="Make AI valuable without it becoming a tech project."
        lede="You keep hearing your organization should be using AI. Your staff may already be experimenting (quietly, unevenly…). What's missing isn't another tool. It's a clear map of where AI can lighten the load, and where it probably won't. Every engagement starts by building that map, from how you already work. It's built with small nonprofits in mind — no tech hire to lean on — and nothing about the approach is limited to them."
      />

      <section className="section section--dark">
        <div className="container">
          <div className="prose">
            <h2>What most AI pitches sell you</h2>
            <ul>
              {PITCHES_SOLD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              My pitch isn't to modernize your organization. It's to hand your
              team more time for the work you're already good at.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How it works</h2>
          </div>
          <StepList steps={STEPS} />
        </div>
      </section>

      <section className="section section--tint section--tight">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>
              A defined, paid starting point is a much smaller ask than
              &ldquo;let&rsquo;s transform your business.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>What you walk away with, either way</h2>
            <ul className="check-list">
              {WALK_AWAY_WITH.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>What this looks like in practice</h2>
            <p>
              <a
                href="https://www.usheriii.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Usher III Initiative
              </a>{" "}
              is a rare-disease research nonprofit working toward a cure. A
              compound that can treat more than one disease reaches more
              patients, draws more funding, and has a faster path to a
              treatment. But finding those adjacent diseases is slow,
              specialized research. The team didn't need a chatbot. They needed
              a way to run that search again and again.
            </p>
            <p>
              As an outside consultant, I designed and built a repeatable,
              AI-assisted search process for identifying other diseases the same
              compound might treat. The outcome: a research method the team can
              rerun as the science evolves. A searchable knowledge base for
              humans and agents to pick up work with context. An accelerated
              experiment log for the candidates the team confirm as worth the
              effort.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How I work</h2>
            <p>
              My work starts with learning how you work. I provide you with
              insights on where your tools are more efficient than a new
              workflow and when a system might pull insights out so that you're
              working with a cleaner picture.
            </p>
            <p>Four principles run through everything:</p>
          </div>
          <div className="grid grid--2">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>Straight answers</h2>
            <dl className="faq">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <FurtherReading links={FURTHER_READING} />

      <ServiceCta body="Send a short note about your organization. We talk through whether it's a fit. If it is, we'll get the start date scheduled.">
        <InquiryForm tone="dark" />
      </ServiceCta>
    </>
  );
}
