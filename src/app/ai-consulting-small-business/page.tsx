import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import { InquiryForm } from "@/components/InquiryForm";
import {
  FurtherReading,
  ServiceCta,
  type FurtherLink,
} from "@/components/ServiceBlocks";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";

export const metadata: Metadata = {
  title: "AI Consulting for Small Businesses",
  description:
    "AI consulting for small businesses: one workflow, fixed scope, on the tools you already use. You keep the map of your workflows either way",
  alternates: {
    canonical: "/ai-consulting-small-business/",
    types: FEED_ALTERNATE_TYPES,
  },
};

// Approved Copy v2 ("Five Positioning Pages", Page 4).
const WALK_AWAY_WITH = [
  "A map of how your team already works — the routines, tools, and decisions that eat the week",
  "A short, ranked list of where AI would genuinely lighten the load (and where it wouldn't)",
  "A scoped plan for the first project sprint, with a defined end date",
  "A framework for how to prioritize the capabilities against your goals",
];

// Published essays only — draft essays stay unlinked until they publish.
const FURTHER_READING: readonly FurtherLink[] = [
  {
    href: "/ideas/you-only-need-5-percent-of-the-model/",
    label: "5% of the model is enough: the only AI strategy a small team needs",
  },
];

export default function AiConsultingSmallBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="AI consulting for small businesses"
        title="One workflow, fixed scope, built on tools you already run."
        lede="Is AI worth it for a business your size? Sometimes yes, sometimes no — and the honest answer starts with how your place already runs, not with a vendor demo. One nagging problem. A defined scope. A defined end date."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Start with one nagging problem</h2>
            <p>
              Our first job is a solution to a nagging problem: a defined scope,
              set against a turnaround timeline, that gets you results before
              you're asked to evaluate a transformation roadmap.
            </p>
            <p>
              A defined, paid starting point is a much smaller ask than
              &ldquo;let&rsquo;s transform your business.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>Why fixed scope</h2>
            <p>
              You're not buying a roadmap. You're buying one working thing — and
              the judgment to know what's next. The offer reads: Fixed Scope ·
              Defined End Date.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Who this is for</h2>
            <p>
              Local businesses that already run something well and want to make
              sure AI keeps the work at the center of the workweek — not the
              other way around. You don't need a tech person: I learn your work;
              you don't have to learn mine.
            </p>
            <p>
              That's what craft-led means here: owner-operated businesses where
              the product is the owner's craft — restaurants, furniture makers,
              designers, CPG brands.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>What this looks like in practice: Oliver's</h2>
            <p>
              <a
                href="https://eatatolivers.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oliver's
              </a>{" "}
              is a Chicago restaurant. Its general manager didn't need to
              understand a data pipeline. He needed to know how busy the week
              was going to be, early enough to staff it and plan around it. The
              signals already existed, scattered across the systems the
              restaurant ran on every day and a couple of outside sources.
            </p>
            <p>
              We connected them — Toast and OpenTable, alongside a weather feed
              and a hotel-occupancy tracker — into a foot-traffic forecast
              shaped around the GM's existing planning routine, not a new
              dashboard he'd have to learn. Now the GM plans events and staffing
              ahead of demand instead of reacting to it on the day.
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
            <p>And the tool is yours to keep.</p>
          </div>
        </div>
      </section>

      <FurtherReading links={FURTHER_READING} />

      <ServiceCta body="Tell me how your place runs and what keeps slowing Tuesday morning down. We talk through whether it's a fit. If it is, we'll get the start date scheduled.">
        <InquiryForm tone="dark" />
      </ServiceCta>
    </>
  );
}
