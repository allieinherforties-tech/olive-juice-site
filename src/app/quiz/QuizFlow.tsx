"use client";

// The quiz flow, copy verbatim from the frozen build brief ("Quiz spec v2.0",
// section 3 and 6). The map renders from local state before any form appears;
// nothing is stored or sent unless the form at the gate is completed.

import { useId, useMemo, useState, type FormEvent } from "react";
import {
  firstMoves,
  frameFor,
  paceLine,
  taskReason,
  threeLanes,
  VERDICT_LANES,
  type Board,
  type Energy,
  type Morale,
  type Pace,
  type RatedTask,
  type Stakes,
} from "@/lib/quiz";
import { QUIZ_EVENT_ENDPOINT, QUIZ_SUBMIT_ENDPOINT, SITE } from "@/content/site";

const TASK_OPTIONS = [
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
] as const;

const OTHER_OPTION = "Something else (tell us)";
const MAX_TASKS = 6;

const ENERGY_OPTIONS: ReadonlyArray<{ value: Energy; label: string }> = [
  { value: "drains", label: "It drains me" },
  { value: "fine", label: "It's fine" },
  { value: "like", label: "I like it" },
];

const STAKES_OPTIONS: ReadonlyArray<{ value: Stakes; label: string }> = [
  { value: "low", label: "Not much, I fix it quietly" },
  { value: "recoverable", label: "Noticeable, but recoverable" },
  { value: "hurts", label: "It hurts someone or the mission" },
];

const PACE_OPTIONS: ReadonlyArray<{ value: Pace; label: string }> = [
  { value: "behind", label: "Peers seem ahead of us" },
  { value: "even", label: "We're keeping pace, nothing dramatic" },
  { value: "ahead", label: "We're ahead of our peers" },
  { value: "unclear", label: "Honestly, I can't tell" },
];

const BOARD_OPTIONS: ReadonlyArray<{ value: Board; label: string }> = [
  { value: "none", label: "It hasn't come up" },
  { value: "light", label: "Lightly, a question now and then" },
  { value: "firm", label: "Firmly, they want a plan" },
  { value: "hard", label: "Hard, it's on every agenda" },
];

const MORALE_OPTIONS: ReadonlyArray<{ value: Morale; label: string }> = [
  { value: "worry", label: "Worry: people wonder what it means for their jobs" },
  { value: "resistance", label: "Resistance: not here, not for this" },
  { value: "curiosity", label: "Curiosity: a few are already trying things" },
  { value: "excitement", label: "Excitement: they'd like more of it" },
  { value: "not-discussed", label: "We haven't really talked about it" },
];

const COPY = {
  title: "Is This a Task for AI?",
  intro1:
    "A five-minute sort of your workweek. You'll get a map right away: what to hand to AI, where AI should assist while you lead, and what stays human because it's what makes your organization yours.",
  intro2:
    "The map appears here. The full readout asks for your name and email. That's the whole price.",
  start: "Start the sort",
  pickTasks: "Which of these took up a lot of your time last week? Pick up to six.",
  energyQuestion: "How hard is it to do this job, week after week?",
  stakesQuestion: "What happens when it goes wrong?",
  downstreamHeader:
    "Now the surroundings, because the same task list needs different plans in different rooms.",
  paceQuestion: "How does the AI conversation feel in your field these days?",
  boardQuestion:
    "How hard are the people you answer to (board, funders, investors) pushing on AI?",
  moraleQuestion: "When AI comes up among your staff or teammates, the mood is mostly...",
  dayAWeekQuestion:
    "If you could gain a day a week by leveraging automated workflows, what would you spend it on?",
  slowingDownQuestion: "What's the work that is currently slowing you down?",
  teaser:
    "That's your map. The full readout sits behind the short form below: why each task landed where it did, your situation in a paragraph, and what to try first.",
  formTitle: "Where should the full readout go?",
  name: "Name",
  org: "Organization",
  email: "Email",
  role: "Role",
  roleHint: "Optional",
  submit: "Show my full readout",
  sending: "One moment...",
  consent:
    "We'll keep this for once-in-a-while notes from Allie. No lists, no sharing, and your address never leaves with us.",
  readoutTitle: "Your full readout",
  whyTitle: "Why each task landed where it did",
  situationTitle: "Your situation",
  movesTitle: "What to try first",
  print: "Print the one-pager",
  genericError: `Something went wrong sending your answers. Please try again, or email ${SITE.email}.`,
} as const;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

/** Count-only analytics: event names carry no personal information. */
function countEvent(event: "start" | "complete" | "form"): void {
  try {
    void fetch(QUIZ_EVENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
      keepalive: true,
    });
  } catch {
    // A dropped analytics ping must never break the quiz.
  }
}

type Stage = "intro" | "tasks" | "rate" | "downstream" | "open" | "map" | "form" | "readout";

export function QuizFlow() {
  const [stage, setStage] = useState<Stage>("intro");
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [otherText, setOtherText] = useState("");
  const [rateIndex, setRateIndex] = useState(0);
  const [rated, setRated] = useState<ReadonlyMap<string, { energy: Energy; stakes: Stakes }>>(
    new Map(),
  );
  const [pace, setPace] = useState<Pace | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [morale, setMorale] = useState<Morale | null>(null);
  const [dayAWeek, setDayAWeek] = useState("");
  const [slowingDown, setSlowingDown] = useState("");
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });
  const [taker, setTaker] = useState({ name: "", org: "", email: "", role: "" });
  const idPrefix = useId();

  const selectedTasks = useMemo<ReadonlyArray<string>>(() => {
    const list: string[] = [...TASK_OPTIONS.filter((t) => picked.has(t))];
    if (picked.has(OTHER_OPTION)) {
      const trimmed = otherText.trim();
      list.push(trimmed || OTHER_OPTION);
    }
    return list;
  }, [picked, otherText]);

  const ratedTasks = useMemo<ReadonlyArray<RatedTask>>(
    () =>
      selectedTasks
        .map((label) => {
          const r = rated.get(label);
          return r ? { label, ...r } : null;
        })
        .filter((t): t is RatedTask => t !== null),
    [selectedTasks, rated],
  );

  function toggleTask(label: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else if (next.size < MAX_TASKS) {
        next.add(label);
      }
      return next;
    });
  }

  function rateTask(label: string, field: "energy" | "stakes", value: Energy | Stakes) {
    setRated((prev) => {
      const next = new Map(prev);
      const current = next.get(label) ?? { energy: "drains" as Energy, stakes: "low" as Stakes };
      next.set(label, { ...current, [field]: value });
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmit({ kind: "submitting" });
    countEvent("form");
    const data = new FormData(event.currentTarget);
    if (typeof data.get("website") === "string" && (data.get("website") as string).length > 0) {
      // Honeypot: pretend success, send nothing.
      setStage("readout");
      return;
    }
    const payload = {
      submittedAt: new Date().toISOString(),
      quizVersion: "v1",
      name: taker.name.trim(),
      org: taker.org.trim(),
      role: taker.role.trim() || null,
      email: taker.email.trim(),
      tasks: ratedTasks.map((t) => ({ label: t.label, energy: t.energy, stakes: t.stakes })),
      context: { pace, board, morale },
      dayAWeek: dayAWeek.trim() || null,
      slowingDown: slowingDown.trim() || null,
    };
    try {
      const res = await fetch(QUIZ_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body: unknown = await res.json().catch(() => null);
      if (res.status >= 200 && res.status < 300 && (body as { ok?: boolean })?.ok) {
        setSubmit({ kind: "idle" });
        setStage("readout");
      } else {
        setSubmit({ kind: "error", message: COPY.genericError });
      }
    } catch {
      setSubmit({ kind: "error", message: COPY.genericError });
    }
  }

  const rateTaskLabel = selectedTasks[rateIndex];
  const rateCurrent = rateTaskLabel ? rated.get(rateTaskLabel) : undefined;

  return (
    <div className="quiz">
      {stage === "intro" && (
        <section className="quiz__screen" aria-labelledby="quiz-title">
          <h1 id="quiz-title">{COPY.title}</h1>
          <p>{COPY.intro1}</p>
          <p>{COPY.intro2}</p>
          <button
            type="button"
            className="btn btn--primary quiz__go"
            onClick={() => {
              countEvent("start");
              setStage("tasks");
            }}
          >
            {COPY.start}
          </button>
        </section>
      )}

      {stage === "tasks" && (
        <section className="quiz__screen" aria-labelledby="quiz-tasks-h">
          <h2 id="quiz-tasks-h">{COPY.pickTasks}</h2>
          <div className="quiz__choices" role="group">
            {[...TASK_OPTIONS, OTHER_OPTION].map((label) => (
              <button
                key={label}
                type="button"
                className={`quiz__choice${picked.has(label) ? " is-selected" : ""}`}
                aria-pressed={picked.has(label)}
                onClick={() => toggleTask(label)}
              >
                {label}
              </button>
            ))}
          </div>
          {picked.has(OTHER_OPTION) && (
            <input
              type="text"
              className="quiz__other"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us what it is"
              aria-label="Something else"
            />
          )}
          <button
            type="button"
            className="btn btn--primary quiz__go"
            disabled={picked.size === 0}
            onClick={() => {
              setRateIndex(0);
              setStage("rate");
            }}
          >
            Next
          </button>
        </section>
      )}

      {stage === "rate" && rateTaskLabel && (
        <section className="quiz__screen" aria-labelledby="quiz-rate-h">
          <p className="quiz__step-count">
            {rateIndex + 1} of {selectedTasks.length}
          </p>
          <h2 id="quiz-rate-h">{rateTaskLabel}</h2>
          <fieldset className="quiz__tapset">
            <legend>{COPY.energyQuestion}</legend>
            {ENERGY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz__choice${rateCurrent?.energy === o.value ? " is-selected" : ""}`}
                aria-pressed={rateCurrent?.energy === o.value}
                onClick={() => rateTask(rateTaskLabel, "energy", o.value)}
              >
                {o.label}
              </button>
            ))}
          </fieldset>
          <fieldset className="quiz__tapset">
            <legend>{COPY.stakesQuestion}</legend>
            {STAKES_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz__choice${rateCurrent?.stakes === o.value ? " is-selected" : ""}`}
                aria-pressed={rateCurrent?.stakes === o.value}
                onClick={() => rateTask(rateTaskLabel, "stakes", o.value)}
              >
                {o.label}
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            className="btn btn--primary quiz__go"
            disabled={!rateCurrent}
            onClick={() => {
              if (rateIndex + 1 < selectedTasks.length) setRateIndex(rateIndex + 1);
              else setStage("downstream");
            }}
          >
            Next
          </button>
        </section>
      )}

      {stage === "downstream" && (
        <section className="quiz__screen" aria-labelledby="quiz-down-h">
          <p className="quiz__down-header" id="quiz-down-h">
            {COPY.downstreamHeader}
          </p>
          <fieldset className="quiz__tapset">
            <legend>{COPY.paceQuestion}</legend>
            {PACE_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz__choice${pace === o.value ? " is-selected" : ""}`}
                aria-pressed={pace === o.value}
                onClick={() => setPace(o.value)}
              >
                {o.label}
              </button>
            ))}
          </fieldset>
          <fieldset className="quiz__tapset">
            <legend>{COPY.boardQuestion}</legend>
            {BOARD_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz__choice${board === o.value ? " is-selected" : ""}`}
                aria-pressed={board === o.value}
                onClick={() => setBoard(o.value)}
              >
                {o.label}
              </button>
            ))}
          </fieldset>
          <fieldset className="quiz__tapset">
            <legend>{COPY.moraleQuestion}</legend>
            {MORALE_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz__choice${morale === o.value ? " is-selected" : ""}`}
                aria-pressed={morale === o.value}
                onClick={() => setMorale(o.value)}
              >
                {o.label}
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            className="btn btn--primary quiz__go"
            disabled={!pace || !board || !morale}
            onClick={() => setStage("open")}
          >
            Next
          </button>
        </section>
      )}

      {stage === "open" && (
        <section className="quiz__screen" aria-labelledby="quiz-open-h">
          <h2 id="quiz-open-h">Two optional questions, both skippable.</h2>
          <label className="quiz__textarea-label" htmlFor={`${idPrefix}-day`}>
            {COPY.dayAWeekQuestion}
          </label>
          <textarea
            id={`${idPrefix}-day`}
            rows={3}
            value={dayAWeek}
            onChange={(e) => setDayAWeek(e.target.value)}
          />
          <label className="quiz__textarea-label" htmlFor={`${idPrefix}-slowing`}>
            {COPY.slowingDownQuestion}
          </label>
          <textarea
            id={`${idPrefix}-slowing`}
            rows={3}
            value={slowingDown}
            onChange={(e) => setSlowingDown(e.target.value)}
          />
          <button
            type="button"
            className="btn btn--primary quiz__go"
            onClick={() => {
              countEvent("complete");
              setStage("map");
            }}
          >
            See my map
          </button>
        </section>
      )}

      {stage === "map" && (
        <section className="quiz__screen quiz__map" aria-labelledby="quiz-map-h">
          <h2 id="quiz-map-h">Your map</h2>
          <div className="quiz__lanes">
            {(Object.keys(VERDICT_LANES) as Array<keyof typeof VERDICT_LANES>).map((lane) => (
              <div key={lane} className={`quiz__lane quiz__lane--${lane}`}>
                <h3>{VERDICT_LANES[lane]}</h3>
                {threeLanes(ratedTasks)[lane].length === 0 ? (
                  <p className="quiz__lane-empty">Nothing lands here this week.</p>
                ) : (
                  <ul>
                    {threeLanes(ratedTasks)[lane].map((t) => (
                      <li key={t.label}>{t.label}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="quiz__teaser">{COPY.teaser}</p>
          <button type="button" className="btn btn--primary quiz__go" onClick={() => setStage("form")}>
            {COPY.formTitle}
          </button>
        </section>
      )}

      {stage === "form" && (
        <section className="quiz__screen" aria-labelledby="quiz-form-h">
          <h2 id="quiz-form-h">{COPY.formTitle}</h2>
          <form className="quiz__form" onSubmit={onSubmit} aria-busy={submit.kind === "submitting"}>
            <label htmlFor={`${idPrefix}-name`}>{COPY.name}</label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              required
              autoComplete="name"
              value={taker.name}
              onChange={(e) => setTaker({ ...taker, name: e.target.value })}
            />
            <label htmlFor={`${idPrefix}-org`}>{COPY.org}</label>
            <input
              id={`${idPrefix}-org`}
              type="text"
              required
              autoComplete="organization"
              value={taker.org}
              onChange={(e) => setTaker({ ...taker, org: e.target.value })}
            />
            <label htmlFor={`${idPrefix}-email`}>{COPY.email}</label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              required
              autoComplete="email"
              value={taker.email}
              onChange={(e) => setTaker({ ...taker, email: e.target.value })}
            />
            <label htmlFor={`${idPrefix}-role`}>
              {COPY.role} <span className="quiz__optional-note">({COPY.roleHint})</span>
            </label>
            <input
              id={`${idPrefix}-role`}
              type="text"
              autoComplete="organization-title"
              value={taker.role}
              onChange={(e) => setTaker({ ...taker, role: e.target.value })}
            />

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div className="quiz__trap" aria-hidden="true">
              <label htmlFor={`${idPrefix}-website`}>Website</label>
              <input
                id={`${idPrefix}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {submit.kind === "error" && (
              <p className="quiz__alert" role="alert">
                {submit.message}
              </p>
            )}

            <button
              type="submit"
              className="btn btn--primary quiz__go"
              disabled={submit.kind === "submitting"}
            >
              {submit.kind === "submitting" ? COPY.sending : COPY.submit}
            </button>
            <p className="quiz__consent">{COPY.consent}</p>
          </form>
        </section>
      )}

      {stage === "readout" && pace && board && morale && (
        <FullReadout
          tasks={ratedTasks}
          pace={pace}
          board={board}
          morale={morale}
          dayAWeek={dayAWeek.trim()}
        />
      )}
    </div>
  );
}

function FullReadout({
  tasks,
  pace,
  board,
  morale,
  dayAWeek,
}: {
  tasks: ReadonlyArray<RatedTask>;
  pace: Pace;
  board: Board;
  morale: Morale;
  dayAWeek: string;
}) {
  const frame = frameFor(board, morale);
  const lanes = threeLanes(tasks);
  const moves = firstMoves(tasks);
  return (
    <section className="quiz__screen quiz__readout" aria-labelledby="quiz-readout-h">
      <h2 id="quiz-readout-h">{COPY.readoutTitle}</h2>

      <h3>{COPY.whyTitle}</h3>
      <ul className="quiz__reasons">
        {tasks.map((t) => (
          <li key={t.label}>
            <strong>{t.label}</strong> &rarr; {laneFor(lanes, t)}
            <span className="quiz__reason">{taskReason(t)}</span>
          </li>
        ))}
      </ul>

      <h3>{COPY.situationTitle}</h3>
      <p className="quiz__situation">
        <strong>{frame.name}</strong> {frame.advice} {paceLine(pace)}
      </p>

      <h3>{COPY.movesTitle}</h3>
      <ul className="quiz__moves">
        {moves.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      {dayAWeek && <p className="quiz__closing">&ldquo;{dayAWeek}&rdquo;</p>}

      <div className="quiz__ask">
        <p>
          Are you up for a quick call to discuss the work that is currently slowing you down? I&rsquo;d
          love to turn around a couple ideas for you to consider.
        </p>
        <a className="btn btn--primary" href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">
          Book a conversation with Allie
        </a>
      </div>

      <button type="button" className="btn quiz__print" onClick={() => window.print()}>
        {COPY.print}
      </button>

      {/* The printable one-pager: only this block survives printing. */}
      <div className="quiz__onepager" aria-hidden="true">
        <h1>{COPY.title}</h1>
        <h2>Your map</h2>
        <div className="quiz__lanes">
          {(Object.keys(VERDICT_LANES) as Array<keyof typeof VERDICT_LANES>).map((lane) => (
            <div key={lane}>
              <h3>{VERDICT_LANES[lane]}</h3>
              <ul>
                {lanes[lane].map((t) => (
                  <li key={t.label}>{t.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h2>{COPY.situationTitle}</h2>
        <p>
          <strong>{frame.name}</strong> {frame.advice} {paceLine(pace)}
        </p>
        <h2>{COPY.movesTitle}</h2>
        <ul>
          {moves.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="quiz__onepager-footer">
          {SITE.name} · {SITE.url}
        </p>
      </div>
    </section>
  );
}

function laneFor(lanes: Record<string, RatedTask[]>, task: RatedTask): string {
  for (const [lane, list] of Object.entries(lanes)) {
    if (list.some((t) => t.label === task.label)) return VERDICT_LANES[lane as keyof typeof VERDICT_LANES];
  }
  return VERDICT_LANES.craft;
}
