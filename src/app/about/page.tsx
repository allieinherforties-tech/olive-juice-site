import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { SkylineMark } from "@/components/Marks";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allie Esslinger: a decade in product and content organizations at Netflix, Google, and Obvious, now building AI tools that fit how clients already work.",
};

type BackgroundSegment = { label: string; url: string };
type BackgroundEntry = { segments: readonly BackgroundSegment[]; detail: string };

// Background/credentials list, per Copyedit Review sheet (wb_xX7wcmOV/sh_QUBD9S6D,
// About/Background list row). Brief states "a decade in product and content orgs"
// across Netflix/Google/Obvious; it does not give per-company titles, so none are invented.
const BACKGROUND: readonly BackgroundEntry[] = [
  {
    segments: [
      {
        label: "Netflix",
        url: "https://www.latimes.com/entertainment-arts/business/story/2024-05-30/why-netflix-is-featuring-its-reality-stars-in-games",
      },
      { label: "Google", url: "https://families.google/familylink/" },
      { label: "Obvious", url: "https://obvious.ai/blog/the-work-behind-the-work" },
    ],
    detail: "A decade leading innovation teams inside of product & content organizations.",
  },
  {
    segments: [{ label: "Shut the Box", url: "https://1hkqjvs18b-8091.hosted.obvious.ai/" }],
    detail: "Built from scratch",
  },
  {
    segments: [{ label: "Oneday", url: "https://oneday.org" }],
    detail: "Entrepreneur in Residence",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`Hi, I'm ${SITE.owner.split(" ")[0]}.`}
        lede="I've spent a decade at the intersection of Product, Content and Culture at organizations like Netflix, Google and Hatch. I've consulted for new ventures at Vice, Obvious and Major League Baseball. And I've helped half a dozen founders launch their businesses as an Entrepreneur-in-Residence at Oneday."
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
              {BACKGROUND.map((entry) => (
                <li key={entry.segments.map((s) => s.label).join("-")}>
                  <strong>
                    {entry.segments.map((segment, i) => (
                      <span key={segment.label}>
                        {i > 0 ? " · " : ""}
                        <a href={segment.url} target="_blank" rel="noopener noreferrer">
                          {segment.label}
                        </a>
                      </span>
                    ))}
                  </strong>
                  <span>{entry.detail}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Let's see if we're a fit."
        body="Start with a paid discovery sprint: a defined scope, a defined end date, and a clear answer on where AI can help you."
      />
    </>
  );
}
