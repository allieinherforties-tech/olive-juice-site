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
  title: "AI Training for Nonprofits",
  description:
    "Hands-on AI training for nonprofit staff, built on your real workflows — grants, donor comms, program ops. Working habits that stick, not a binder",
  alternates: {
    canonical: "/ai-training-nonprofits/",
    types: FEED_ALTERNATE_TYPES,
  },
};

// Approved Copy v2 ("Five Positioning Pages", Page 2).
const FAQ = [
  {
    q: "Do our staff need to be technical?",
    a: "No. The point is that you shouldn't have to be. I learn your work; you don't have to learn mine.",
  },
];

// Published essays only — draft essays stay unlinked until they publish.
const FURTHER_READING: readonly FurtherLink[] = [
  {
    href: "/ideas/the-work-behind-the-work/",
    label: "The Work Behind the Work",
  },
];

export default function AiTrainingNonprofitsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI training for nonprofits"
        title="Training built on the work your staff already does."
        lede="Most of your staff already use AI a little — differently, unsafely, invisibly. Training doesn't fix that by introducing tools. It fixes it by building shared, confident habits on the workflows you already run: grants, donor communications, program operations."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>The gap isn't awareness</h2>
            <p>
              In 2026, 91% of organizations are using AI, but only 29% are
              operationalizing it. (Momentive Software, 2026)
            </p>
            <p>
              Your team doesn't need to be told AI exists. It needs shared
              practice: what's allowed, what's smart, what's worth automating —
              and what isn't. That's the gap training closes.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>Training from someone who builds the tools</h2>
            <p>
              A trainer who has never shipped anything teaches features. Allie
              builds end-to-end consumer products with revenue, built
              collaboratively from the ground up — and advises founders
              one-to-one on AI product decisions. The training comes from
              shipping and maintaining, not just the slides.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>How a training engagement works</h2>
            <p>
              It starts the way everything does: paid discovery. We'll learn how
              your people already think and work — the map comes first, the
              sessions second. Then the sessions are hands-on and specific to
              your organization: your grant pipeline, your donor communications,
              your program ops. Not generic prompt worksheets.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>What your team leaves with</h2>
            <p>
              Working habits they'll actually keep — and the judgment to know
              where AI helps their work and where it doesn't. Plus a short
              working policy in plain language, one your staff will actually
              follow.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>How the sessions sound</h2>
            <p>
              &ldquo;I&rsquo;d rather talk about your Tuesday mornings.&rdquo;
              No futurism, no fear, no jargon. The test for every habit we
              teach: does it make next Tuesday calmer? If a habit only sounds
              impressive, it doesn't make the session.
            </p>
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

      <ServiceCta body="Tell me what your staff is already doing with AI — even the messy parts. We talk through whether it's a fit. If it is, we'll get the start date scheduled.">
        <InquiryForm tone="dark" />
      </ServiceCta>
    </>
  );
}
