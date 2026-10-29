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
  title: "AI Policy for Nonprofits",
  description:
    "A plain-language AI policy for your nonprofit — governance without the binder: which tools are allowed, what data stays out, who reviews output",
  alternates: {
    canonical: "/ai-policy-nonprofits/",
    types: FEED_ALTERNATE_TYPES,
  },
};

// Approved Copy v2 ("Five Positioning Pages", Page 3).
const POLICY_QUESTIONS = [
  "Which tools are allowed, and for what.",
  "What data stays out.",
  "Who reviews the output — and what happens when something looks wrong.",
];

// Published essays only — draft essays stay unlinked until they publish.
const FURTHER_READING: readonly FurtherLink[] = [
  {
    href: "/ideas/the-work-behind-the-work/",
    label: "The Work Behind the Work",
  },
];

export default function AiPolicyNonprofitsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI policy for nonprofits"
        title="An AI policy your staff will actually follow."
        lede="If your board — or a funder — asked for an AI policy, that's normal now. Public guidance treats it as a standing governance need for nonprofits (Nonprofit Risk Management Center, 2026). The question isn't whether to have one. It's whether anyone will follow it. Call it policy or call it governance — the point is the same: rules sized to a team that has real work to do."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Why most policies fail</h2>
            <p>
              They're written to be shown, not followed. A forty-page document
              nobody reads protects nobody. The policy that works is short,
              plain, and built from how your people actually work.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>What goes in it</h2>
            <p>Three questions, answered in plain language:</p>
            <ul>
              {POLICY_QUESTIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Public guidance for nonprofits points to a one-to-three-page
              policy, not a binder (Nonprofit Risk Management Center;
              GrantBoost). The length isn't the achievement. The follow-through
              is.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>How we'd write it together</h2>
            <p>
              The policy is drafted with you, in plain language, sized to a
              small or mid-sized organization — its own engagement, starting
              from paid discovery: the map of how your team actually works is
              what keeps the policy real instead of generic.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>What the policy is for — plain-language governance</h2>
            <p>
              A policy exists to protect the work, not to perform governance.
              The point is a team that can make good decisions without asking
              permission for every prompt — and a board that can see the
              decisions were considered.
            </p>
          </div>
        </div>
      </section>

      <FurtherReading links={FURTHER_READING} />

      <ServiceCta body="Tell me what your board or funder asked for, and how your team uses AI today. We talk through whether it's a fit. If it is, we'll get the start date scheduled.">
        <InquiryForm tone="dark" />
      </ServiceCta>
    </>
  );
}
