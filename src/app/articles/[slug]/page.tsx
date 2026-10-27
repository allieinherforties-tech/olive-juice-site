import type { Metadata } from "next";
import Link from "next/link";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";

// The essay routes moved to /ideas/. Only the essays that were public before
// the rename get a shim: the chatbot draft never had a public URL, and
// anything published after the rename starts life at /ideas/, so this list is
// frozen at rename time and needs no upkeep.
const MOVED_SLUGS = ["you-only-need-5-percent-of-the-model", "the-work-behind-the-work"] as const;

export const dynamicParams = false;

type ArticlePageProps = { params: Promise<{ slug: string }> };

/** Prebuild one shim per pre-rename public essay URL (static export). */
export function generateStaticParams(): { slug: string }[] {
  return MOVED_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Ideas",
    alternates: { canonical: `/ideas/${slug}/`, types: FEED_ALTERNATE_TYPES },
  };
}

export default async function ArticleRedirect({ params }: ArticlePageProps) {
  const { slug } = await params;
  return (
    <section className="section">
      <div className="container">
        {/* React 19 hoists rendered metadata into <head>, so the refresh lands in the
            exported HTML; the visible link covers no-JS readers and crawlers. */}
        <meta httpEquiv="refresh" content={`0; url=/ideas/${slug}/`} />
        <p className="lede">
          This essay moved. Read it at <Link href={`/ideas/${slug}/`}>olivejuice.digital/ideas/{slug}/</Link>.
        </p>
      </div>
    </section>
  );
}
