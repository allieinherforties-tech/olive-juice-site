import type { Metadata } from "next";
import { CtaBand, Fill, PageHero } from "@/components/Blocks";
import { CASE_STUDIES } from "@/content/site";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "A foot-traffic forecast for Oliver\u2019s, a Chicago restaurant, and an AI-assisted research process for the Usher III Initiative.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Problem, build, outcome."
        lede="Two engagements with very different clients. Same method in both: start from how the team already works, then build the tool to fit."
      />

      <section className="section">
        <div className="container">
          {CASE_STUDIES.map((study) => (
            <article key={study.slug} id={study.slug} className="case">
              <div className="case__aside">
                {study.clientLogo ? (
                  study.clientUrl ? (
                    <a href={study.clientUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={study.clientLogo}
                        alt={`${study.client} logo`}
                        className="case__logo"
                        width={180}
                        height={42}
                      />
                    </a>
                  ) : (
                    <img
                      src={study.clientLogo}
                      alt={`${study.client} logo`}
                      className="case__logo"
                      width={180}
                      height={42}
                    />
                  )
                ) : null}
                <p className="card__meta">{study.sector}</p>
                <h2>
                  {study.clientUrl ? (
                    <a href={study.clientUrl} target="_blank" rel="noopener noreferrer">
                      <Fill value={study.client} />
                    </a>
                  ) : (
                    <Fill value={study.client} />
                  )}
                </h2>
                <ul className="tag-list" aria-label="What it connects">
                  {study.stack.map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="case-headline">{study.headline}</h3>
                <div className="case__block">
                  <h3>The problem</h3>
                  <p>{study.problem}</p>
                </div>
                <div className="case__block">
                  <h3>The build</h3>
                  <p>{study.build}</p>
                </div>
                <div className="case__block case__outcome">
                  <h3>The outcome</h3>
                  <p>{study.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Have a problem shaped like one of these?" />
    </>
  );
}
