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
        lede="Most AI projects start with the technology and ask you to rearrange your work around it. I'm not selling a system or asking you to adopt a tool. I start with your work and shape the technology around the routines, the tools and the decisions your business requires."
      />

      <section className="section">
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

      <section className="section section--dark">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The engagement</p>
            <h2>Discovery, sprint, retainer.</h2>
            <p>Every engagement starts small and paid. It only grows after I earn it.</p>
          </div>
          <StepList steps={ENGAGEMENT_STEPS} />
        </div>
      </section>

      <section className="section">
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

      <CtaBand
        title="Let's make a plan."
        body="Start with a paid discovery sprint: a defined scope, a defined end date, and a clear answer on where AI workflows can help your business."
        withForm
      />
    </>
  );
}
