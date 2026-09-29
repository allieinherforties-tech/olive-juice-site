import Link from "next/link";
import type { ReactNode } from "react";
import { PLACEHOLDERS, START_CTA, type CaseStudy, type Step } from "@/content/site";
import { HeartMark } from "./Marks";

const PLACEHOLDER_VALUES: ReadonlySet<string> = new Set(Object.values(PLACEHOLDERS));

/**
 * Renders copy that may still be an unfilled placeholder. Placeholders get a visible
 * highlight so an un-swapped value can never pass as finished copy on the live site.
 */
export function Fill({ value }: { value: string }) {
  return PLACEHOLDER_VALUES.has(value) ? (
    <mark className="placeholder" title="Placeholder — awaiting final copy">
      {value}
    </mark>
  ) : (
    <>{value}</>
  );
}

export function PageHero({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </section>
  );
}

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/#${study.slug}`} className="card card--link">
      <p className="card__meta">{study.sector}</p>
      <p className="card__client">
        <Fill value={study.client} />
      </p>
      <h3>{study.headline}</h3>
      <p>{study.summary}</p>
      <span className="card__more">Read the case study →</span>
    </Link>
  );
}

export function StepList({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="steps">
      {steps.map((s) => (
        <li key={s.label} className="step">
          <p className="step__label">{s.label}</p>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function CtaBand({
  title = "Tell me what's eating your week.",
  body = "Start with a paid discovery sprint: a defined scope, a defined end date, and a clear answer on where AI actually helps — and where it doesn't.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta-band">
      <HeartMark className="cta-band__heart" />
      <div className="container">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="btn-row">
          <Link href={START_CTA.href} className="btn btn--primary">
            {START_CTA.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
