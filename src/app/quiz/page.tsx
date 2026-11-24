// /quiz — "Is This a Task for AI?"
// Server-rendered explainer and lane definitions so crawlers and no-JS visitors
// get real content; the questions sit in static markup below for search. The
// interactive flow mounts over it client-side. Copy follows the frozen build
// brief (spec v2.0, sections 2 and 3).
import type { Metadata } from "next";
import { FEED_ALTERNATE_TYPES } from "@/lib/feed";
import { QuizFlow } from "./QuizFlow";

export const metadata: Metadata = {
  title: "Is This a Task for AI?",
  description:
    "A five-minute sort of your workweek: what to hand to AI, where AI should assist while you lead, and what stays human because it's what makes your organization yours.",
  alternates: { canonical: "/quiz/", types: FEED_ALTERNATE_TYPES },
};

const LANES = [
  {
    name: "Hand to AI",
    reason: "Anything low-stakes that drains or bores you goes over the wall entirely.",
  },
  {
    name: "AI assists, human leads",
    reason: "What's left, draining work with real stakes, is the sweet spot for AI-assisted, human-led.",
  },
  {
    name: "Human craft",
    reason:
      "Anything you like stays human at any stakes, because it feeds you and it's part of what makes your organization yours.",
  },
] as const;

const QUESTIONS = [
  {
    q: "Which of these took up a lot of your time last week? Pick up to six.",
    options: [
      "Donor thank-yous and acknowledgments",
      "Grant drafts and funder reports",
      "Board decks and meeting prep",
      "Scheduling and calendar wrangling",
      "Bookkeeping, invoices, receipts",
      "Social posts and newsletters",
      "Volunteer or customer coordination",
      "Event planning and logistics",
      "Website updates and data entry",
      "Writing: appeals, stories, updates",
      "Something else (tell us)",
    ],
  },
  {
    q: "How hard is it to do this job, week after week?",
    options: ["It drains me", "It's fine", "I like it"],
  },
  {
    q: "What happens when it goes wrong?",
    options: ["Not much, I fix it quietly", "Noticeable, but recoverable", "It hurts someone or the mission"],
  },
  {
    q: "Now the surroundings, because the same task list needs different plans in different rooms. How does the AI conversation feel in your field these days?",
    options: ["Peers seem ahead of us", "We're keeping pace, nothing dramatic", "We're ahead of our peers", "Honestly, I can't tell"],
  },
  {
    q: "How hard are the people you answer to (board, funders, investors) pushing on AI?",
    options: ["It hasn't come up", "Lightly, a question now and then", "Firmly, they want a plan", "Hard, it's on every agenda"],
  },
  {
    q: "When AI comes up among your staff or teammates, the mood is mostly...",
    options: [
      "Worry: people wonder what it means for their jobs",
      "Resistance: not here, not for this",
      "Curiosity: a few are already trying things",
      "Excitement: they'd like more of it",
      "We haven't really talked about it",
    ],
  },
] as const;

export default function QuizPage() {
  return (
    <section className="section">
      <div className="container quiz-page">
        <QuizFlow />

        <div className="quiz-static">
          <h2>What the quiz measures</h2>
          <p>
            Two layers, and both are genuine inputs to your readout. First, the work: the recurring
            tasks that took up a lot of your time last week, rated on energy and stakes. Each task
            lands in one of three lanes. Second, the surroundings: how the AI conversation feels in
            your field, how hard your board, funders, or investors are pushing, and the mood among
            your staff or teammates. The task verdicts never move; the advice around them does.
          </p>

          <h2>The three lanes</h2>
          <dl className="quiz-static__lanes">
            {LANES.map((lane) => (
              <div key={lane.name}>
                <dt>{lane.name}</dt>
                <dd>{lane.reason}</dd>
              </div>
            ))}
          </dl>

          <h2>The questions, up front</h2>
          <p>
            The interactive quiz needs JavaScript. Here is every question it asks, so you can see the
            whole shape before you start.
          </p>
          <ol className="quiz-static__questions">
            {QUESTIONS.map((item) => (
              <li key={item.q}>
                <p>{item.q}</p>
                <ul>
                  {item.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p>
            Two optional text boxes close the quiz: what you would spend a gained day a week on, and
            the work that is currently slowing you down.
          </p>
        </div>
      </div>
    </section>
  );
}
