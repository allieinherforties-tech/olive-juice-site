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
        lede="I've spent a decade at the intersection of Product, Content and Culture at organizations like Netflix, Google and Obvious. I've consulted for new ventures at Vice and Major League Baseball."
      />

      <section className="section">
        <div className="container about-grid">
          <div className="prose">
            <h2>Depth over volume, on purpose.</h2>
            <p>
              Olive Juice is built around an intentional roster of clients that I can invest into with my time and
              resources. With a wife and three sons at home, I think of growth as a discipline within the practice.
              I scope every engagement tightly, so that it will prove itself quickly.
            </p>
            <p>
              I bring a team-sports mindset to client work. The best teammates don&rsquo;t diagnose from the
              sidelines. We&rsquo;re going to work together to make sure that everything works as you need it to.
              Nothing is out of the box because the idea that AI consulting comes from a playbook is ridiculous.
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
