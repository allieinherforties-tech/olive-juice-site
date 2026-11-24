// "Is This a Task for AI?" — scoring, in full.
// Every verdict and frame below is the printed table from the frozen build brief
// ("Quiz spec v2.0", section 4). No hidden weights: what renders here is what
// the taker can check on the page.

export type Energy = "drains" | "fine" | "like";
export type Stakes = "low" | "recoverable" | "hurts";
export type Verdict = "hand-to-ai" | "assists" | "craft";
export type Pace = "behind" | "even" | "ahead" | "unclear";
export type Board = "none" | "light" | "firm" | "hard";
export type Morale = "worry" | "resistance" | "curiosity" | "excitement" | "not-discussed";

export type RatedTask = {
  label: string;
  energy: Energy;
  stakes: Stakes;
};

export type QuizContext = {
  pace: Pace;
  board: Board;
  morale: Morale;
};

export const VERDICT_LANES = {
  "hand-to-ai": "Hand to AI",
  assists: "AI assists, human leads",
  craft: "Human craft",
} as const;

/** The one-line reason a verdict lands where it does, in words a taker can check. */
export const LANE_REASONS: Record<Verdict, string> = {
  "hand-to-ai":
    "Low-stakes work that drains or bores you goes over the wall entirely.",
  assists:
    "Draining work with real stakes is the sweet spot for AI-assisted, human-led.",
  craft:
    "Anything you like stays human at any stakes, because it feeds you and it's part of what makes your organization yours.",
};

/**
 * The scoring table, as a function. Like it at any stakes: human craft.
 * Low stakes and drained: over the wall. Everything else: assist.
 */
export function verdictFor(energy: Energy, stakes: Stakes): Verdict {
  if (energy === "like") return "craft";
  if (stakes === "low") return "hand-to-ai";
  return "assists";
}

export type FrameKey = "pressure-worry" | "room-to-run" | "mandate" | "quiet-drift";

export type Frame = {
  key: FrameKey;
  name: string;
  advice: string;
};

// The four frames, verbatim from the spec's frame table. The table prints four
// rows over a larger cross-product, so the uncovered cells map to the nearest
// frame: an eager team under a firm board gets Room to run (they can act now);
// a worried team without board pressure still gets Pressure meets worry (the
// advice addresses the worry directly); a quiet team without pressure is where
// nothing happens, which is Quiet drift's exact diagnosis.
const FRAMES: Record<FrameKey, Frame> = {
  "pressure-worry": {
    key: "pressure-worry",
    name: "Pressure meets worry.",
    advice:
      "Start in the least-loved low-stakes corner, say out loud what stays human, bring the team one working example before the next board update.",
  },
  "room-to-run": {
    key: "room-to-run",
    name: "Room to run.",
    advice:
      "Pick one hand-to-AI task, run a two-week try, keep a named human check on anything that leaves the building.",
  },
  mandate: {
    key: "mandate",
    name: "Mandate without movement.",
    advice:
      "Translate the push into one concrete first task. A policy nobody can act on builds the resistance it fears.",
  },
  "quiet-drift": {
    key: "quiet-drift",
    name: "Quiet drift.",
    advice: "The risk isn't hype or resistance, it's nothing happening. Smallest possible start.",
  },
};

export function frameFor(board: Board, morale: Morale): Frame {
  const push = board === "firm" || board === "hard";
  const worried = morale === "worry" || morale === "resistance";
  const eager = morale === "curiosity" || morale === "excitement";
  if (push && worried) return FRAMES["pressure-worry"];
  if (eager) return FRAMES["room-to-run"];
  if (push) return FRAMES.mandate;
  if (worried) return FRAMES["pressure-worry"];
  return FRAMES["quiet-drift"];
}

/** One appended line, verbatim from the spec's pace table. */
export function paceLine(pace: Pace): string {
  switch (pace) {
    case "behind":
      return "Being behind the curve is recoverable; being wrong about which tasks to hand over is what costs trust, and the map keeps you on the right side of that.";
    case "even":
      return "You have time to do this well rather than fast.";
    case "ahead":
      return "You've moved fast; the human craft column is where quality control lives.";
    case "unclear":
      return "A normal answer, and your own task list is a better guide than anyone's forecast.";
  }
}

/** The three-lane map: tasks placed under each lane, empty lanes included. */
export function threeLanes(tasks: readonly RatedTask[]): Record<Verdict, RatedTask[]> {
  const lanes: Record<Verdict, RatedTask[]> = { "hand-to-ai": [], assists: [], craft: [] };
  for (const task of tasks) lanes[verdictFor(task.energy, task.stakes)].push(task);
  return lanes;
}

/** The reason line for a single task, keyed to its scoring cell. */
export function taskReason(task: RatedTask): string {
  return LANE_REASONS[verdictFor(task.energy, task.stakes)];
}

/** Up to three concrete first moves, one per lane in order. */
export function firstMoves(tasks: readonly RatedTask[]): string[] {
  const lanes = threeLanes(tasks);
  const moves: string[] = [];
  const first = (lane: RatedTask[]) => lane[0]?.label;
  const hand = first(lanes["hand-to-ai"]);
  const assist = first(lanes.assists);
  const craft = first(lanes.craft);
  if (hand) moves.push(`Give ${hand.toLowerCase()} to AI this week.`);
  if (assist) moves.push(`Run ${assist.toLowerCase()} AI-assisted, with your name on the send.`);
  if (craft) moves.push(`Say out loud that ${craft.toLowerCase()} stays human.`);
  return moves;
}
