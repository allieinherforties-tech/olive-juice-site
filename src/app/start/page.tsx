import type { Metadata } from "next";
import { Fill, PageHero } from "@/components/Blocks";
import { HeartMark } from "@/components/Marks";
import { PLACEHOLDERS, SITE } from "@/content/site";
import { buildInquiryMailto } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Start with a paid discovery sprint: a defined scope, a defined end date, and a working answer on where AI helps your organization.",
};

const WALK_AWAY_WITH = [
  "A map of how your team already works — the routines, tools, and decisions that eat the week",
  "A short, ranked list of where AI would genuinely lighten the load (and where it wouldn't)",
  "A scoped plan for the first project sprint, with a defined end date",
  "An honest recommendation — including \u201cdon't build this\u201d if that's the right answer",
];

const FAQ = [
  {
    q: "Do I need to be technical?",
    a: "No. The point is that you shouldn't have to be. I learn your work; you don't have to learn mine.",
  },
  {
    q: "What happens after discovery?",
    a: "If there's a problem worth solving, we scope a project sprint to build it. If the tool earns its keep, it can roll into a retainer that keeps it running and builds the next piece. Every step is optional.",
  },
  {
    q: "Who is this for?",
    a: "Mission-driven nonprofits and local, craft-led businesses — teams that already run something well and want the grind around it to get lighter.",
  },
];

export default function StartPage() {
  const mailto = buildInquiryMailto(SITE.email);
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Start with a paid discovery sprint."
        lede="A small, defined first step. No six-month commitment, no transformation roadmap — just a clear answer on where AI actually helps you, and a plan to build the first piece."
      />

      <section className="section">
        <div className="container offer">
          <div>
            <h2>What you walk away with, either way.</h2>
            <ul className="check-list">
              {WALK_AWAY_WITH.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <dl className="faq">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="offer__card" aria-labelledby="offer-title">
            <p className="eyebrow" id="offer-title">
              Discovery sprint
            </p>
            <p className="offer__price">
              <Fill value={PLACEHOLDERS.sprintPrice} />
            </p>
            <p className="offer__terms">
              <Fill value={PLACEHOLDERS.sprintLength} /> · fixed scope · defined end date
            </p>
            <ol className="check-list">
              <li>Send a short note about your organization</li>
              <li>We talk through whether it&rsquo;s a fit</li>
              <li>If it is, the sprint starts</li>
            </ol>
            <a href={mailto} className="btn btn--primary">
              Email to start
            </a>
            <p className="offer__terms offer__terms--after">
              Or write directly: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--tint section--tight">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>A defined, paid starting point is a much smaller ask than &ldquo;let&rsquo;s transform your business.&rdquo;</p>
          </div>
        </div>
      </section>
    </>
  );
}
