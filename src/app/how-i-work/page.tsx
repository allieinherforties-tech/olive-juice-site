import type { Metadata } from "next";
import { CtaBand, PageHero, StepList } from "@/components/Blocks";
import { HeartMark } from "@/components/Marks";
import { ENGAGEMENT_STEPS, PRINCIPLES } from "@/content/site";

export const metadata: Metadata = {
  title: "How I work",
  description:
    "An anti-hype approach to AI: start from how you already work, use the small slice of AI that matters, and prove it with a paid discovery sprint before anything bigger.",
};

export default function HowIWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How I work"
        title="Learn how you think. Then build to fit."
        lede="Most AI projects start with the technology and ask you to rearrange your work around it. I start with your work — the routines, the tools, the decisions — and shape the technology around that."
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>What I believe about AI for small, serious teams.</h2>
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

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The engagement</p>
            <h2>Discovery, sprint, retainer.</h2>
            <p>
              A craft business or a small nonprofit doesn&rsquo;t want a six-month transformation program. So every
              engagement starts small and paid, and only grows if it earns it.
            </p>
          </div>
          <StepList steps={ENGAGEMENT_STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pull">
            <HeartMark className="pull__heart" />
            <p>You keep doing the work you&rsquo;re good at. I make the grind around it lighter.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
