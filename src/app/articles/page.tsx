import type { Metadata } from "next";
import Link from "next/link";

// The page moved to /ideas/. This shim keeps the old /articles/ URL working for
// anyone who shared it before the rename; it canonicalizes to the new URL.
export const metadata: Metadata = {
  title: "Ideas",
  description: "Essays written by Allie Esslinger, plus studio notes researched and drafted with AI support.",
  alternates: { canonical: "/ideas/" },
};

export default function ArticlesRedirect() {
  return (
    <section className="section">
      <div className="container">
        {/* React 19 hoists rendered metadata into <head>, so the refresh lands in the
            exported HTML; the visible link covers no-JS readers and crawlers. */}
        <meta httpEquiv="refresh" content="0; url=/ideas/" />
        <p className="lede">
          This page moved. Read it at <Link href="/ideas/">olivejuice.digital/ideas/</Link>.
        </p>
      </div>
    </section>
  );
}
