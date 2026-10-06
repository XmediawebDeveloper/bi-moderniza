import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactRobot from "../../components/ContactRobot";
import Reveal from "../../components/Reveal";
import Counter from "../../components/Counter";
import AnimatedBar from "../../components/AnimatedBar";
import MagneticButton from "../../components/MagneticButton";
import AmbientFx from "../../components/AmbientFx";
import MiniRobot from "../../components/MiniRobot";
import CardIcon, { type IconKind } from "../../components/CardIcon";
import { getOutcomesPage } from "../../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const HEAD_ICONS: IconKind[] = ["rocket", "verify", "pulse", "money"];
const COMPARE_ICONS: IconKind[] = ["clock", "verify", "rocket"];
const QUOTE_ICONS: IconKind[] = ["umbrella", "bank", "heart"];
const BAR_TINTS: Array<"glow" | "ember" | "mist"> = ["ember", "mist", "glow"];

export const metadata: Metadata = {
  title: "Outcomes — Moderniza",
  description: "What changes when you work with us — in time, money, confidence, and how the whole team feels about their tools.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ Receipts",
  hero_title: "The numbers behind the work.",
  hero_lede: "What changes when you actually finish a modernization project — measured across more than two hundred customer projects. Methodology on request.",
  hero_meta: [
    { id: 0, text: "Last updated: Q2 2026" },
    { id: 0, text: "Methodology on request" },
  ],
};

const HEADLINE_STATS_FALLBACK = [
  { value: "200+", label: "Projects delivered to date" },
  { value: "98%", label: "Work on day one with no extra fixes" },
  { value: "95%+", label: "Behave the same as the original" },
  { value: "$38M", label: "Saved across customer projects" },
];

const MEASURES_FALLBACK = [
  {
    title: "How long it takes",
    row_1_label: "Hand-rebuild",     row_1_value: "Months",         row_1_weight: 92,
    row_2_label: "Other AI tools",   row_2_value: "Hours",          row_2_weight: 32,
    row_3_label: "Moderniza",        row_3_value: "Days to weeks",  row_3_weight: 14,
  },
  {
    title: "Behaves like the old one",
    row_1_label: "Hand-rebuild",     row_1_value: "Roughly the same", row_1_weight: 65,
    row_2_label: "Other AI tools",   row_2_value: "Often not",        row_2_weight: 55,
    row_3_label: "Moderniza",        row_3_value: "Proven the same",  row_3_weight: 95,
  },
  {
    title: "Works on day one",
    row_1_label: "Hand-rebuild",     row_1_value: "About half",       row_1_weight: 50,
    row_2_label: "Other AI tools",   row_2_value: "Most of the time", row_2_weight: 60,
    row_3_label: "Moderniza",        row_3_value: "Almost always",    row_3_weight: 98,
  },
];

const QUOTES_FALLBACK = [
  { quote: "We'd had three failed attempts before this. Moderniza had a working preview in our first call.", attribution_role: "Head of Technology", attribution_sector: "Insurance" },
  { quote: "Our nightly process used to take four and a half hours. Now it's done before breakfast.",        attribution_role: "Operations Director", attribution_sector: "Banking" },
  { quote: "What sealed it for us is that we got the new app fully — code, instructions, the lot. No long-term lock-in.", attribution_role: "Platform Lead", attribution_sector: "Healthcare" },
];

const CTA_FALLBACK = {
  headline: "Run it on your app. See your number.",
  body: "",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "Read project stories",
  secondary_url: "/work/projects",
};

export default async function OutcomesPage() {
  const page = await getOutcomesPage();
  const hero = page ?? HERO_FALLBACK;
  const headlineStats = page?.headline_stats?.length ? page.headline_stats : HEADLINE_STATS_FALLBACK;
  const measures      = page?.measures?.length       ? page.measures       : MEASURES_FALLBACK;
  const quotes        = page?.quotes?.length         ? page.quotes         : QUOTES_FALLBACK;
  const cta           = page?.cta ?? CTA_FALLBACK;
  const meta          = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;

  return (
    <>
      <PageHero
        crumb={[{ label: "Work", href: "#" }, { label: "Outcomes" }]}
        eyebrow={hero.hero_eyebrow}
        title={<>{hero.hero_title}</>}
        lede={hero.hero_lede}
        meta={
          <>
            {meta.map((m, i) => (
              <span key={i}>
                {m.text}
                {i < meta.length - 1 && <span> · </span>}
              </span>
            ))}
          </>
        }
        rightSlot={<ContactRobot variant="ship" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* ============ Headline numbers ============ */}
      <section className="relative bg-chalk text-ink border-b border-ink/10">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20 grid gap-10 md:grid-cols-4 text-center md:text-left">
          {headlineStats.map((m, i) => {
            const parsed = parseStat(m.value);
            return (
              <Reveal key={m.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <CardIcon kind={HEAD_ICONS[i % HEAD_ICONS.length]} tone="light" className="h-11 w-11 mb-4 mx-auto md:mx-0" />
                <p className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                  {parsed ? <>{parsed.pre}<Counter to={parsed.num} suffix={parsed.suf} /></> : m.value}
                </p>
                <p className="mt-3 text-sm text-ink/60 max-w-xs mx-auto md:mx-0">{m.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ Triple comparison ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 01 — Three measures</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Time. Sameness. <span className="text-gradient">Day-one fit.</span>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {measures.map((c, i) => {
              const rows = [
                { l: c.row_1_label, v: c.row_1_value, w: c.row_1_weight },
                { l: c.row_2_label, v: c.row_2_value, w: c.row_2_weight },
                { l: c.row_3_label, v: c.row_3_value, w: c.row_3_weight },
              ];
              return (
                <Reveal
                  key={c.title}
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                  className="rounded-3xl border border-white/10 bg-graphite/40 p-7"
                >
                  <div className="flex items-center justify-between">
                    <CardIcon kind={COMPARE_ICONS[i % COMPARE_ICONS.length]} tone="dark" className="h-11 w-11" />
                    <span className="chip text-[11px] tracking-[0.18em] text-mist">/ {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{c.title}</h3>
                  <div className="mt-7 space-y-7">
                    {rows.map((r, ri) => (
                      <AnimatedBar key={r.l} to={r.w} label={r.l} value={r.v} tint={BAR_TINTS[ri % BAR_TINTS.length]} delay={i * 120} />
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={2} className="mt-10 text-sm text-mist">
            Numbers based on 200+ projects we've shipped, with industry comparisons taken from public reports.
          </Reveal>
        </div>
      </section>

      {/* ============ Pull quotes ============ */}
      <section className="relative bg-bone text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — In their words</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {quotes.map((q, i) => (
              <Reveal key={q.quote} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <div className="rounded-3xl border border-ink/10 bg-white/80 p-7 lift h-full">
                  <div className="flex items-center justify-between">
                    <CardIcon kind={QUOTE_ICONS[i % QUOTE_ICONS.length]} tone="light" className="h-10 w-10" />
                    <span className="text-ember text-3xl leading-none">&ldquo;</span>
                  </div>
                  <p className="mt-4 text-base md:text-lg leading-snug font-medium">{q.quote}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ink/55">
                    {q.attribution_role}{q.attribution_sector ? ` · ${q.attribution_sector}` : ""}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl drift" />
        <AmbientFx tone="dark" density="high" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-32">
          <Reveal as="h2" className="max-w-4xl text-5xl md:text-7xl font-semibold leading-[0.96] tracking-[-0.03em]">
            {cta.headline}
          </Reveal>
          {cta.body && (
            <Reveal delay={1} className="mt-8 max-w-xl text-lg text-chalk/80">
              {cta.body}
            </Reveal>
          )}
          <Reveal delay={2} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={cta.primary_url} className="h-12 rounded-full bg-glow px-6 text-sm font-semibold text-ink hover:bg-chalk transition-colors">
              {cta.primary_label}
            </MagneticButton>
            {cta.secondary_label && cta.secondary_url && (
              <MagneticButton href={cta.secondary_url} className="h-12 rounded-full border border-white/15 px-6 text-sm hover:border-chalk/60">
                {cta.secondary_label}
              </MagneticButton>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Parse "75%", "24 mo", "$38M", "1 in 2", "95%+" → { pre, num, suf } for animated Counter. */
function parseStat(value: string): { pre: string; num: number; suf: string } | null {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { pre: match[1], num: Number(match[2]), suf: match[3] };
}
