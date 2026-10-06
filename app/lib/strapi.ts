/**
 * Strapi v5 fetch client + typed accessors.
 *
 * - Base URL: STRAPI_URL env var (default http://127.0.0.1:1337).
 * - All fetches use Next ISR with 60 s revalidation, so edits in Strapi
 *   appear on the live site within a minute without redeploy.
 * - Two layers:
 *   1. Original 12 home-page collection/single types (legacy — still
 *      used by app/page.tsx as fallback).
 *   2. The 12 unified Page Single Types (home, why, what, …) that
 *      contain every section of each page in one editable record.
 * - Failures return null / [] so pages still render with fallback consts.
 */

import type { IconKind } from "../components/CardIcon";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://127.0.0.1:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN ?? "";

type StrapiList<T> = { data: T[]; meta?: unknown };
type StrapiSingle<T> = { data: T | null; meta?: unknown };

async function strapiGet<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  const qs = new URLSearchParams(params).toString();
  const url = `${STRAPI_URL}/api/${path}${qs ? `?${qs}` : ""}`;
  try {
    const res = await fetch(url, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      next: { revalidate: 60, tags: [`strapi:${path}`] },
    });
    if (!res.ok) {
      console.warn(`[strapi] ${path} -> ${res.status}`);
      return null;
    }
    return sanitizeBookingReferences(await res.json()) as T;
  } catch (err) {
    console.warn(`[strapi] ${path} failed`, err);
    return null;
  }
}

function sanitizeBookingReferences(value: unknown): unknown {
  if (typeof value === "string") {
    if (value === "/contact/call") return "/contact/start";
    if (value === "Book a call" || value === "Book a deeper walkthrough") return "Start a project";
    return value.replace("calendar link", "project brief");
  }
  if (Array.isArray(value)) return value.map(sanitizeBookingReferences);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, sanitizeBookingReferences(val)]),
    );
  }
  return value;
}

async function list<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
  const r = await strapiGet<StrapiList<T>>(path, { sort: "order:asc", ...params });
  return r?.data ?? [];
}

async function single<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  const r = await strapiGet<StrapiSingle<T>>(path, params);
  return r?.data ?? null;
}

/* ============================================================ */
/* Media helpers                                                 */
/* ============================================================ */

export type StrapiMedia = {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  url: string;
  mime?: string;
  width?: number;
  height?: number;
};

/** Resolve a Strapi media object (or relative `/uploads/x.gif` path) to an absolute URL. */
export function mediaUrl(media: StrapiMedia | string | null | undefined): string | null {
  if (!media) return null;
  const rel = typeof media === "string" ? media : media.url;
  if (!rel) return null;
  if (/^https?:\/\//i.test(rel)) return rel;
  return `${STRAPI_URL}${rel.startsWith("/") ? "" : "/"}${rel}`;
}

/* ============================================================ */
/* Legacy home-page types (original 12 content types)            */
/* ============================================================ */

export type HeroPill = { id: number; label: string; tone?: "live" | "neutral" };

export type Hero = {
  id: number;
  eyebrow: string;
  headline_line1: string;
  headline_line2: string;
  italic_word: string;
  subheading: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  scroll_note: string;
  pills?: HeroPill[];
};

export type WhyPoint = {
  id: number;
  no: string;
  metric: string;
  title: string;
  body: string;
  icon_kind: IconKind;
  order: number;
};

export type WhatItem = { id: number; text: string };
export type WhatPillar = {
  id: number;
  no: string;
  h: string;
  sub: string;
  icon_kind: IconKind;
  gif_url: string;
  gif?: StrapiMedia | null;
  items: WhatItem[];
  order: number;
};

export type PipelinePhase = { id: number; i: string; h: string; t: string; order: number };

export type ComparisonRow = { id: number; l: string; v: string; w: number; t: "ember" | "mist" | "glow" };
export type ComparisonCard = { id: number; label: string; is_ours: boolean; rows: ComparisonRow[]; order: number };

export type JourneyStep = { id: number; n: string; h: string; t: string; order: number };

export type NeedItem = { id: number; title: string; body: string };
export type NeedColumn = { id: number; n: string; items: NeedItem[]; order: number };

export type BuiltForCard = { id: number; who: string; why: string; icon_kind: IconKind; order: number };

export type Differentiator = { id: number; h: string; b: string; icon_kind: IconKind; order: number };

export type Soundbite = { id: number; text: string; order: number };

export type Metric = { id: number; num: number; suffix: string; label: string; order: number };

export type Cta = {
  id: number;
  eyebrow: string;
  headline_line1: string;
  headline_line2: string;
  headline_line3: string;
  body: string;
  primary_label: string;
  primary_url: string;
  secondary_label: string;
  secondary_url: string;
  status_text: string;
};

/* Legacy section fetchers (still used by app/page.tsx) */
export const getHero        = () => single<Hero>("hero", { populate: "pills" });
export const getCta         = () => single<Cta>("cta");
export const getWhyPoints   = () => list<WhyPoint>("why-points");
export const getWhatPillars = () => list<WhatPillar>("what-pillars", { "populate[items]": "true", "populate[gif]": "true" });
export const getPipeline    = () => list<PipelinePhase>("pipeline-phases");
export const getComparison  = () => list<ComparisonCard>("comparison-cards", { populate: "rows" });
export const getJourney     = () => list<JourneyStep>("journey-steps");
export const getNeed        = () => list<NeedColumn>("need-columns", { populate: "items" });
export const getBuiltFor    = () => list<BuiltForCard>("built-for-cards");
export const getDifferents  = () => list<Differentiator>("differentiators");
export const getSoundbites  = () => list<Soundbite>("soundbites");
export const getMetrics     = () => list<Metric>("metrics");

/* ============================================================ */
/* Page · X — unified Single Type response shapes                */
/* ============================================================ */

type IdComponent = { id: number };
export type StringItem = IdComponent & { text: string };
export type HeroMeta = IdComponent & { text: string };
export type CardItem = IdComponent & { no?: string; title: string; body: string; icon_kind?: string; tag?: string };
export type StatItem = IdComponent & { value: string; label: string };
export type QaItem = IdComponent & { question: string; answer: string; icon_kind?: string };
export type CtaBlock = IdComponent & {
  eyebrow?: string;
  headline: string;
  body?: string;
  primary_label: string;
  primary_url: string;
  secondary_label?: string;
  secondary_url?: string;
  status_text?: string;
};
export type TestimonialItem = IdComponent & {
  quote: string;
  attribution_role: string;
  attribution_sector?: string;
};
export type ProjectMetricItem = IdComponent & { label: string; value: string };
export type ProjectCardItem = IdComponent & {
  no: string;
  sector: string;
  company: string;
  pitch: string;
  body: string;
  icon_kind: string;
  metrics: ProjectMetricItem[];
};
export type WhatStepItem = IdComponent & {
  no: string;
  title: string;
  sub: string;
  icon_kind: string;
  items: StringItem[];
};
export type CompareColItem = IdComponent & {
  label: string;
  is_ours: boolean;
  metric_1_label: string; metric_1_value: string; metric_1_weight: number;
  metric_2_label: string; metric_2_value: string; metric_2_weight: number;
  metric_3_label: string; metric_3_value: string; metric_3_weight: number;
};
export type TeamMemberItem = IdComponent & {
  initials: string;
  name: string;
  role: string;
  bio: string;
  icon_kind: string;
};
export type FormOptionItem = IdComponent & { value: string; label: string };
export type FormQuestionItem = IdComponent & {
  no: string;
  question: string;
  kind: "text" | "single" | "multi";
  placeholder?: string;
  options?: FormOptionItem[];
};
export type AgendaItem = IdComponent & {
  time: string;
  title: string;
  body: string;
  icon_kind: string;
};
export type MeasureGroupItem = IdComponent & {
  title: string;
  row_1_label: string; row_1_value: string; row_1_weight: number;
  row_2_label: string; row_2_value: string; row_2_weight: number;
  row_3_label: string; row_3_value: string; row_3_weight: number;
};

/* Home page (Page · Home) */
export type HomeWhyItem = IdComponent & { no: string; metric: string; title: string; body?: string; icon_kind: IconKind };
export type HomeWhatItem = IdComponent & {
  no: string; h: string; sub: string; icon_kind: IconKind;
  gif_url?: string;
  gif?: StrapiMedia | null;
  items: StringItem[];
};
export type HomePipelineItem = IdComponent & { i: string; h: string; t: string };
export type HomeCompareItem = IdComponent & { label: string; is_ours: boolean; rows: ComparisonRow[] };
export type HomeJourneyItem = IdComponent & { n: string; h: string; t: string };
export type HomeNeedItem = IdComponent & { n: string; items: NeedItem[] };
export type HomeBuiltItem = IdComponent & { who: string; why: string; icon_kind: IconKind };
export type HomeDiffItem = IdComponent & { h: string; b: string; icon_kind: IconKind };
export type HomeMetricItem = IdComponent & { num: number; suffix: string; label: string };

export type HomePage = {
  id: number;
  hero_eyebrow: string;
  hero_headline_line1: string;
  hero_headline_line2: string;
  hero_italic_word: string;
  hero_subheading: string;
  hero_primary_cta_label: string;
  hero_primary_cta_url: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_url: string;
  hero_scroll_note?: string;
  hero_pills?: HeroPill[];

  why_points?: HomeWhyItem[];
  what_pillars?: HomeWhatItem[];
  pipeline?: HomePipelineItem[];
  comparison?: HomeCompareItem[];
  journey?: HomeJourneyItem[];
  need?: HomeNeedItem[];
  built_for?: HomeBuiltItem[];
  differentiators?: HomeDiffItem[];
  soundbites?: StringItem[];
  metrics?: HomeMetricItem[];

  cta_eyebrow?: string;
  cta_headline_line1: string;
  cta_headline_line2: string;
  cta_headline_line3: string;
  cta_body: string;
  cta_primary_label: string;
  cta_primary_url: string;
  cta_secondary_label: string;
  cta_secondary_url: string;
  cta_status_text?: string;
};

type PageHeroShared = {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_lede: string;
  hero_meta?: HeroMeta[];
};

export type WhyPage = PageHeroShared & {
  reasons?: CardItem[];
  stats?: StatItem[];
  values?: CardItem[];
  cta?: CtaBlock;
};

export type WhatPage = PageHeroShared & {
  steps?: WhatStepItem[];
  questions?: QaItem[];
  comparison_title?: string;
  comparison?: CompareColItem[];
  cta?: CtaBlock;
};

export type WhoPage = PageHeroShared & {
  team?: TeamMemberItem[];
  principles?: CardItem[];
  stats?: StatItem[];
  cta?: CtaBlock;
};

export type EnterprisesPage = PageHeroShared & {
  trusted_label?: string;
  trusted_by?: StringItem[];
  industries?: CardItem[];
  benefits?: CardItem[];
  security?: CardItem[];
  compliance?: StringItem[];
  engagement?: CardItem[];
  commitments?: StatItem[];
  testimonial?: TestimonialItem;
  cta?: CtaBlock;
};

export type DiscoverPage = PageHeroShared & {
  moves?: CardItem[];
  takeaways?: CardItem[];
  next_eyebrow?: string;
  next_title?: string;
  next_body?: string;
  next_label?: string;
  next_url?: string;
};

export type DefinePage = PageHeroShared & {
  decisions?: CardItem[];
  contract?: CardItem[];
  signoff_text?: string;
  next_eyebrow?: string;
  next_title?: string;
  next_body?: string;
  next_label?: string;
  next_url?: string;
};

export type DeliverPage = PageHeroShared & {
  stages?: CardItem[];
  handover?: CardItem[];
  stats?: StatItem[];
  cta?: CtaBlock;
};

export type ProjectsPage = PageHeroShared & {
  projects?: ProjectCardItem[];
  more_title?: string;
  more_body?: string;
  cta?: CtaBlock;
};

export type OutcomesPage = PageHeroShared & {
  headline_stats?: StatItem[];
  measures?: MeasureGroupItem[];
  quotes?: TestimonialItem[];
  cta?: CtaBlock;
};

export type StartPage = PageHeroShared & {
  questions?: FormQuestionItem[];
  extra_label?: string;
  extra_placeholder?: string;
  submit_label?: string;
  submit_helper?: string;
  confirmation_title?: string;
  confirmation_body?: string;
};

/* ============================================================ */
/* Page fetchers                                                 */
/* ============================================================ */

/** Build the populate query for a page so all sections/media come back in one call. */
function pagePopulate(spec: Record<string, "*" | true | string[]>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(spec)) {
    if (val === true) {
      out[`populate[${key}]`] = "true";
    } else if (val === "*") {
      out[`populate[${key}][populate]`] = "*";
    } else if (Array.isArray(val)) {
      val.forEach((sub, i) => {
        out[`populate[${key}][populate][${i}]`] = sub;
      });
    }
  }
  return out;
}

export const getHomePage = () =>
  single<HomePage>(
    "home-page",
    pagePopulate({
      hero_pills: true,
      why_points: true,
      what_pillars: "*",
      pipeline: true,
      comparison: "*",
      journey: true,
      need: "*",
      built_for: true,
      differentiators: true,
      soundbites: true,
      metrics: true,
    }),
  );

export const getWhyPage = () =>
  single<WhyPage>("why-page", pagePopulate({ hero_meta: true, reasons: true, stats: true, values: true, cta: true }));

export const getWhatPage = () =>
  single<WhatPage>(
    "what-page",
    pagePopulate({ hero_meta: true, steps: "*", questions: true, comparison: true, cta: true }),
  );

export const getWhoPage = () =>
  single<WhoPage>("who-page", pagePopulate({ hero_meta: true, team: true, principles: true, stats: true, cta: true }));

export const getEnterprisesPage = () =>
  single<EnterprisesPage>(
    "enterprises-page",
    pagePopulate({
      hero_meta: true,
      trusted_by: true,
      industries: true,
      benefits: true,
      security: true,
      compliance: true,
      engagement: true,
      commitments: true,
      testimonial: true,
      cta: true,
    }),
  );

export const getDiscoverPage = () =>
  single<DiscoverPage>("discover-page", pagePopulate({ hero_meta: true, moves: true, takeaways: true }));

export const getDefinePage = () =>
  single<DefinePage>("define-page", pagePopulate({ hero_meta: true, decisions: true, contract: true }));

export const getDeliverPage = () =>
  single<DeliverPage>(
    "deliver-page",
    pagePopulate({ hero_meta: true, stages: true, handover: true, stats: true, cta: true }),
  );

export const getProjectsPage = () =>
  single<ProjectsPage>(
    "projects-page",
    pagePopulate({ hero_meta: true, projects: "*", cta: true }),
  );

export const getOutcomesPage = () =>
  single<OutcomesPage>(
    "outcomes-page",
    pagePopulate({ hero_meta: true, headline_stats: true, measures: true, quotes: true, cta: true }),
  );

export const getStartPage = () =>
  single<StartPage>(
    "start-page",
    pagePopulate({ hero_meta: true, questions: "*" }),
  );

/* ============================================================ */
/* Fallback constants — used if Strapi is unreachable.           */
/* ============================================================ */

export const FALLBACK_HERO: Hero = {
  id: 0,
  eyebrow: "AI-powered code modernization",
  headline_line1: "Modernize legacy code",
  headline_line2: "with",
  italic_word: "confidence.",
  subheading:
    "An AI platform that analyses, converts, verifies and deploys legacy code — to AWS or Azure, in 30 to 90 minutes.",
  primary_cta_label: "Talk to us",
  primary_cta_url: "/contact/start",
  secondary_cta_label: "Explore cases",
  secondary_cta_url: "/work/projects",
  scroll_note: "Why → What → Need",
  pills: [
    { id: 1, label: "analysing", tone: "live" },
    { id: 2, label: "compiling", tone: "neutral" },
    { id: 3, label: "verified", tone: "neutral" },
    { id: 4, label: "uptime · 99.97%", tone: "neutral" },
  ],
};
