// All site copy lives here so it can be edited without touching layout code.
// Source of truth for every claim: "Olive Juice Digital — Positioning Brief".
// Do not add claims (metrics, reviews, client results) that are not in the brief.

/**
 * Values still waiting on Allie. Each renders on the live site exactly as written,
 * so a missed swap is visible rather than silently wrong.
 * `npm run placeholders` lists every one still in the codebase.
 */
export const PLACEHOLDERS = {} as const;

export const SITE = {
  name: "Olive Juice Digital",
  domain: "olivejuice.digital",
  url: "https://olivejuice.digital",
  // Public contact inbox. The domain's mail routes through Microsoft 365 (MX record).
  email: "hello@olivejuice.digital",
  owner: "Allie Esslinger",
  tagline: "AI tools built for how you already work.",
  // Under 155 characters so search results keep the closing pitch (technical audit, finding 9).
  description:
    "AI tools and workflows for mission-driven organizations and craft-led local businesses, shaped around how you already work, not the other way around.",
} as const;

/**
 * Contact-form endpoint. The site is a static export, so submissions go to a small
 * hosted service that logs the lead for the Pipeline CRM and emails SITE.email.
 */
export const INQUIRY_ENDPOINT = "https://1v7en6pjqm-8787.hosted.obvious.ai/inquiry";

export type NavItem = { href: string; label: string };

export const NAV: readonly NavItem[] = [
  { href: "/case-studies/", label: "Case studies" },
  { href: "/ideas/", label: "Ideas" },
  { href: "/about/", label: "About" },
];

export const START_CTA: NavItem = { href: "/start/", label: "Start a project" };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  headline: string;
  summary: string;
  problem: string;
  build: string;
  outcome: string;
  stack: readonly string[];
  /** Client's own site, when they've given sign-off to be linked. */
  clientUrl?: string;
  /** Local static asset path for the client's logo, when they've given sign-off to display it. */
  clientLogo?: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "restaurant",
    client: "Oliver’s",
    clientUrl: "https://www.eatatolivers.com/",
    clientLogo: "/logos/olivers.png",
    sector: "Chicago restaurant · Craft-led local business",
    headline: "Calmer mornings for a restaurant GM",
    summary:
      "Connected the restaurant's point-of-sale, reservations, weather, and hotel-occupancy data into a foot-traffic forecast, so the GM could plan staffing and events instead of reacting to them.",
    problem:
      "The general manager didn't need to understand a data pipeline. He needed to know how busy the week was going to be, early enough to staff it and plan around it. The signals already existed, scattered across the systems the restaurant ran on every day and a couple of outside sources.",
    build:
      "A foot-traffic forecast that pulls from the tools the restaurant already used (Toast and OpenTable), alongside a weather feed and a hotel-occupancy tracker. The output was shaped around the GM's existing planning routine, not a new dashboard he'd have to learn.",
    outcome:
      "The GM plans events and staffing ahead of demand instead of reacting to it on the day. AI-shaped on the inside, outcome-shaped on the outside.",
    stack: ["Toast", "OpenTable", "Weather feed", "Hotel-occupancy tracker"],
  },
  {
    slug: "usher-iii",
    client: "Usher III Initiative",
    sector: "Rare-disease research nonprofit · Mission-driven",
    headline: "A repeatable research pipeline toward a cure",
    summary:
      "Built an AI-assisted search process that helps the team identify other diseases their compound might treat.",
    problem:
      "The Usher III Initiative is a rare-disease research nonprofit working toward a cure. A compound that can treat more than one disease reaches more patients, draws more funding, and has a faster path to a treatment. But finding those adjacent diseases is slow, specialized research. The team didn't need a chatbot. They needed a way to run that search again and again.",
    build:
      "As an outside consultant, Allie designed and built a repeatable, AI-assisted search process for identifying other diseases the same compound might treat. The goal was a method the team could own and repeat, not a one-time answer handed over at the end.",
    outcome:
      "A research method the team can rerun as the science moves, instead of a one-off report. A wider disease application means more patients, more funding, and a faster path to a treatment.",
    stack: ["AI-assisted search", "Repeatable research process"],
  },
];

/**
 * A run of body copy that may embed inline links. Plain strings render as text;
 * `{ label, url }` segments render as external anchors.
 */
export type InlineSegment = string | { label: string; url: string };

export type Credential = {
  name: string;
  role: string;
  /** Link for the card title itself (the product's own site), when it has one. */
  url?: string;
  detail: readonly InlineSegment[];
};

/** Work Allie owns outright — cleared to name with specifics. */
export const OWN_WORK: readonly Credential[] = [
  {
    name: "Parent Pep Talks",
    role: "0–1 Ideation & Execution",
    url: "https://parentpeptalks.com",
    detail: [
      "A daily pep talk for parents in the thick of it, with personalized tips based on the age and stage of their kids, when they're ready. Plus ",
      { label: "Shut the Box", url: "https://1hkqjvs18b-8090.hosted.obvious.ai/" },
      ", ",
      { label: "LGBTQueue (Coming Soon)", url: "https://queue.lgbt" },
      ", and ",
      { label: "Comfort & Vice", url: "https://comfort-vice.myshopify.com" },
      ": end-to-end consumer products with revenue, built collaboratively from the ground up.",
    ],
  },
  {
    name: "Oneday",
    role: "Entrepreneur in Residence",
    url: "https://www.oneday.org",
    detail: [
      "Working 1:1 with founders as they shape their businesses (through Olive Juice), helping them make AI product decisions, build AI products, and generate $1,000,000 before graduation.",
    ],
  },
];

export type Step = { label: string; title: string; body: string };

export const ENGAGEMENT_STEPS: readonly Step[] = [
  {
    label: "01",
    title: "Paid discovery",
    body: "We'll start by learning how you already think and work. You'll get a clear map of where AI can improve your workflows, based on your routines and the tools you already use.",
  },
  {
    label: "02",
    title: "Project sprint",
    body: "Our first job is a solution to a nagging problem: a defined scope, set against a turnaround timeline, that gets you results before you're asked to evaluate a transformation roadmap.",
  },
  {
    label: "03",
    title: "Retainer",
    body: "If the tool earns its keep, we keep it running quietly in the background and build the next piece. Either way, you walk away with a map of your tools and workflows; insights about how to build new systems for yourself; and the markdown files to share with your team if you decide to rebuild later.",
  },
];

/** "The difference" section's single centered list. */
export const WHAT_YOU_GET: readonly string[] = [
  "Calmer mornings",
  "A faster, repeatable workflow",
  "Decisions made earlier",
  "More time for the work you're good at",
];

export type Principle = { title: string; body: string };

export const PRINCIPLES: readonly Principle[] = [
  {
    title: "5% of the model is enough",
    body: "You don't need the frontier of what AI can do. A small, well-chosen slice of a model's capability pointed at the right problem does more for a restaurant or a research team than the flashiest demo.",
  },
  {
    title: "No hype",
    body: "A lot of AI consulting is people geeking out about the future and selling a tool nobody asked for. I'd rather talk about your Tuesday mornings and show you what a new way of working means for your week.",
  },
  {
    title: "Outcomes > Deliverables",
    body: "If you want to geek out about the tool stack and token efficiency, we can. But our metrics will be defined by the outcomes of the tools and workflows we develop: calmer mornings, easier routines, or value generated via time-back and revenue gained.",
  },
];
