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
  description:
    "Olive Juice Digital builds AI-powered tools and workflows for mission-driven organizations and craft-led local businesses — shaped around how you already think and work, not the other way around.",
} as const;

/**
 * Contact-form endpoint. The site is a static export, so submissions go to a small
 * hosted service that logs the lead for the Pipeline CRM and emails SITE.email.
 */
export const INQUIRY_ENDPOINT = "https://1v7en6pjqm-8787.hosted.obvious.ai/inquiry";

export type NavItem = { href: string; label: string };

export const NAV: readonly NavItem[] = [
  { href: "/case-studies/", label: "Case studies" },
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
      "The general manager didn't need to understand a data pipeline. He needed to know how busy the week was going to be — early enough to staff it and plan around it. The signals already existed, scattered across the systems the restaurant ran on every day and a couple of outside sources.",
    build:
      "A foot-traffic forecast that pulls from the tools the restaurant already used — Toast and OpenTable — alongside a weather feed and a hotel-occupancy tracker. The output was shaped around the GM's existing planning routine, not a new dashboard he'd have to learn.",
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
      "The Usher III Initiative is a rare-disease research nonprofit working toward a cure. A compound that can treat more than one disease reaches more patients, draws more funding, and has a faster path to a treatment — but finding those adjacent diseases is slow, specialized research. The team didn't need a chatbot. They needed a way to run that search again and again.",
    build:
      "As an outside consultant, Allie designed and built a repeatable, AI-assisted search process for identifying other diseases the same compound might treat. The goal was a method the team could own and repeat, not a one-time answer handed over at the end.",
    outcome:
      "A research method the team can rerun as the science moves, instead of a one-off report. A wider disease application means more patients, more funding, and a faster path to a treatment.",
    stack: ["AI-assisted search", "Repeatable research process"],
  },
];

export type Credential = {
  name: string;
  role: string;
  detail: string;
  /** External link, when there's somewhere to send the click. */
  url?: string;
};

/** Work Allie owns outright — cleared to name with specifics. */
export const OWN_WORK: readonly Credential[] = [
  {
    name: "Shut the Box",
    role: "Built from scratch",
    url: "https://1hkqjvs18b-8091.hosted.obvious.ai/",
    detail:
      "A daily pub game, built for night friends staying in touch during the day. A fun consumer product build, end to end.",
  },
  {
    name: "Oneday",
    role: "Entrepreneur in Residence",
    url: "https://oneday.org",
    detail:
      "Working with founders as they shape their businesses; through Olive Juice, helping them make AI product decisions and build AI products.",
  },
];

export type Step = { label: string; title: string; body: string };

export const ENGAGEMENT_STEPS: readonly Step[] = [
  {
    label: "01",
    title: "Paid discovery",
    body: "We start by learning how you already think and work — the routines, the tools you already pay for, the decisions that eat your week. You get a clear map of where AI would actually lighten the load, and where it wouldn't.",
  },
  {
    label: "02",
    title: "Project sprint",
    body: "A contained build against the one problem worth solving first. Defined scope, defined end date, a working tool at the finish — not a transformation roadmap.",
  },
  {
    label: "03",
    title: "Retainer",
    body: "If the tool earns its keep, we keep it running quietly in the background and build the next piece. If it doesn't, you've spent a sprint, not a year.",
  },
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
