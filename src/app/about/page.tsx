import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { SkylineMark } from "@/components/Marks";
import { OWN_WORK, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allie Esslinger: a decade in product and content organizations at Netflix, Google, and Obvious, now building AI tools that fit how clients already work.",
};

// Brief states "a decade in product and content orgs" across these companies;
// it does not give per-company titles, so none are invented here.
const BACKGROUND = [
  { name: "Netflix · Google · Obvious", detail: "A decade in product and content organizations" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`Hi, I'm ${SITE.owner.split(" ")[0]}.`}
        lede="I spent a decade in product and content organizations at Netflix, Google, and Obvious. Olive Juice Digital is what I do with that now: build AI tools for people who already run something well."
      />

      <section className="section">
        <div className="container about-grid">
          <div className="prose">
            <h2>I work alongside you, not at a distance.</h2>
            <p>
              I bring a team-sports mindset to client work. The best teammates don&rsquo;t diagnose you
              from the sidelines and hand you a report — they get on the field. That&rsquo;s the job as I see it:
              sitting next to the GM or the research lead, learning how they actually make decisions, and building
              something that fits.
            </p>
            <p>
              It&rsquo;s also why I don&rsquo;t lead with the technology. The restaurant GM I worked with wanted to
              think about food, not dashboards. A research team wants to accelerate a cure, not learn a new interface.
              My job is to translate — to take what AI can do and turn it into something that feels like the way you
              already work.
            </p>

            <h2>Depth over volume, on purpose.</h2>
            <p>
              I have three young kids at home. That&rsquo;s the honest reason Olive Juice is built around a small
              number of clients, worked with deeply, rather than a big roster worked lightly. It isn&rsquo;t a
              limitation I work around — it&rsquo;s a discipline. It forces every engagement to be scoped tightly,
              to prove itself quickly, and to keep running without me hovering over it. That&rsquo;s exactly the
              shape a small business or nonprofit needs anyway.
            </p>

            <h2>Why &ldquo;Olive Juice&rdquo;?</h2>
            <p>
              Say &ldquo;olive juice&rdquo; without making a sound, and it looks almost exactly like &ldquo;I love
              you.&rdquo; It&rsquo;s a reminder of what good translation does: the words on the surface can be
              different, as long as the meaning lands.
            </p>
          </div>

          <aside>
            <SkylineMark className="about-skyline" />
            <p className="eyebrow">Background</p>
            <ul className="fact-list">
              {BACKGROUND.map((b) => (
                <li key={b.name}>
                  <strong>{b.name}</strong>
                  <span>{b.detail}</span>
                </li>
              ))}
              {OWN_WORK.map((w) => (
                <li key={w.name}>
                  <strong>{w.name}</strong>
                  <span>{w.role}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBand title="Let's see if we're a fit." />
    </>
  );
}
