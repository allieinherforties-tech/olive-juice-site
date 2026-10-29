import type { ReactNode } from "react";
import { HeartMark } from "./Marks";
import { SITE } from "@/content/site";

/**
 * Shared sections for the five positioning pages (approved Copy v2). Every page
 * closes with the same CTA band — the inquiry form plus the write-directly line —
 * and a compact links block back to the published Ideas essays.
 */

/**
 * The closing CTA band. `body` is the page's own "tell me" line from the approved
 * copy; the headline, form, and direct line are identical across the five pages.
 */
export function ServiceCta({ body, children }: { body: string; children: ReactNode }) {
  return (
    <section className="cta-band cta-band--form">
      <HeartMark className="cta-band__heart" />
      <div className="container">
        <h2>Start with a short note.</h2>
        <p>{body}</p>
        {/* Form passed as children so only pages that render it pull the
            InquiryForm module into their client graph (same pattern as CtaBand). */}
        {children}
        <p>
          Or write directly: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ·
          Fixed Scope · Defined End Date
        </p>
      </div>
    </section>
  );
}

export type FurtherLink = { href: string; label: string };

/**
 * The page's internal links to the Ideas blog. Only published essays may appear
 * here (Positioning Pages Plan: draft essays are noindexed and stay unlinked
 * until they publish).
 */
export function FurtherReading({ links }: { links: readonly FurtherLink[] }) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="prose">
          <h2>Further reading</h2>
          <ul className="further-reading">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
