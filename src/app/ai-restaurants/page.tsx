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
  title: "AI Consulting for Restaurants",
  description:
    "AI for independent restaurants: planning help built from your POS, reservations, and weather data — shaped around your routine. No new dashboard to learn.",
  alternates: { canonical: "/ai-restaurants/", types: FEED_ALTERNATE_TYPES },
};

// Approved Copy v2 ("Five Positioning Pages", Page 5).
// Published essays only — draft essays stay unlinked until they publish.
const FURTHER_READING: readonly FurtherLink[] = [
  {
    href: "/ideas/you-only-need-5-percent-of-the-model/",
    label: "5% of the model is enough: the only AI strategy a small team needs",
  },
];

export default function AiRestaurantsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI consulting for restaurants"
        title="Calmer mornings, built on systems you already run."
        lede="You've seen the vendor demos. You don't have a tech person, and you don't want another dashboard to learn. Here's the honest version: AI can't cook, and it can't run your restaurant. It can help you see the week coming — using the systems you already run."
      />

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>What it looks like: Oliver's</h2>
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
            <p>
              A second engagement: helping a national restaurant chain link its
              corporate office with its franchise operations more easily.
              Engagement details are private.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="prose">
            <h2>Why this works without a tech hire</h2>
            <p>
              The forecast runs on systems Oliver's already paid for. That's the
              whole pattern: your routines and the tools you already use — no
              rip-and-replace, no new dashboard to learn, no &ldquo;AI
              transformation.&rdquo;
            </p>
            <p>
              Do you need to be technical? No. The point is that you shouldn't
              have to be. I learn your work; you don't have to learn mine.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>What you'd get first</h2>
            <p>
              Paid discovery maps your routines and your tools. The first sprint
              solves one nagging problem — a defined scope, a defined end date.
              If the tool earns its keep, a retainer keeps it running quietly in
              the background.
            </p>
          </div>
        </div>
      </section>

      <FurtherReading links={FURTHER_READING} />

      <ServiceCta body="Tell me what mornings look like at your restaurant right now. We talk through whether it's a fit. If it is, we'll get the start date scheduled.">
        <InquiryForm tone="dark" />
      </ServiceCta>
    </>
  );
}
