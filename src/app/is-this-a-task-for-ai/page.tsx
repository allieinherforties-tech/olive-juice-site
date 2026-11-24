// Alias for the launch post's long link. The quiz lives at /quiz/; this page
// serves the same title and forwards people and crawlers there. Static export
// has no server redirects, so this is a meta refresh with a JS push and a plain
// link as the no-JS fallback.
import type { Metadata } from "next";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";

export const metadata: Metadata = {
  title: "Is This a Task for AI?",
  description:
    "A five-minute sort of your workweek: what to hand to AI, where AI should assist while you lead, and what stays human because it's what makes your organization yours.",
  alternates: { canonical: "/quiz/", types: FEED_ALTERNATE_TYPES },
};

export default function QuizAliasPage() {
  return (
    <section className="section">
      <meta httpEquiv="refresh" content="0; url=/quiz/" />
      <script
        dangerouslySetInnerHTML={{ __html: 'window.location.replace("/quiz/");' }}
      />
      <div className="container">
        <h1>Is This a Task for AI?</h1>
        <p>
          This quiz moved to{" "}
          <a href="/quiz/">olivejuice.digital/quiz/</a>.
        </p>
      </div>
    </section>
  );
}
