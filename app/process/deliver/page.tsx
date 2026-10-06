import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactRobot from "../../components/ContactRobot";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import Counter from "../../components/Counter";
import MagneticButton from "../../components/MagneticButton";
import PathDraw from "../../components/PathDraw";
import AmbientFx from "../../components/AmbientFx";
import MiniRobot from "../../components/MiniRobot";
import CardIcon, { type IconKind } from "../../components/CardIcon";
import { getDeliverPage } from "../../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const PHASE_ICONS: IconKind[] = ["blueprint", "doc", "verify", "convert", "cycle", "rocket"];
const HANDOVER_ICONS: IconKind[] = ["rocket", "doc", "gear", "shield", "verify", "person"];

export const metadata: Metadata = {
  title: "Deliver — Moderniza",
  description: "We build the new app, prove it behaves like the old one, and put it live — all while you watch every step.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ Step 03 — Deliver",
  hero_title: "Build. Prove. Launch.",
  hero_lede: "Deliver is the busy part. Six clear stages turn the agreed plan into a working, modern app, hosted on the cloud you chose — with the work visible to you the whole way.",
  hero_meta: [
    { id: 0, text: "Days, not months" },
    { id: 0, text: "Watch it happen" },
    { id: 0, text: "One-step launch" },
  ],
};

const STAGES_FALLBACK = [
  { no: "01", title: "Plan", body: "We start from the agreed plan: every screen, every name, every connection. Nothing is left to be invented later.", icon_kind: "blueprint" },
  { no: "02", title: "Outline", body: "We sketch out the new app's bones — the empty rooms, before any furniture. You can see it taking shape from day one.", icon_kind: "doc" },
  { no: "03", title: "Tests first", body: "We write down how to check the new app behaves the same as the old one — before we even start building it.", icon_kind: "verify" },
  { no: "04", title: "Rebuild", body: "We rebuild the app piece by piece. The harder pieces get more attention, not less. Every change is visible to you.", icon_kind: "convert" },
  { no: "05", title: "Connect", body: "We hook all the pieces together — payments, email, your existing tools — making sure nothing's missed.", icon_kind: "cycle" },
  { no: "06", title: "Prove", body: "We compare the new app to the old one. If anything behaves differently, we fix it on the spot, until everything lines up.", icon_kind: "rocket" },
];

const HANDOVER_FALLBACK = [
  { no: "01", title: "The new app", body: "Live, working, hosted on a major cloud — yours to use immediately. No setup tasks left for someone to figure out.", icon_kind: "rocket" },
  { no: "02", title: "The full source", body: "Every line we wrote, in your account, on day one. Not licensed back to you — yours.", icon_kind: "doc" },
  { no: "03", title: "Setup instructions", body: "Step-by-step notes on how to host the app, deploy updates, and bring it back if anything goes wrong.", icon_kind: "gear" },
  { no: "04", title: "A runbook", body: "What to do when X happens — written for the people who'll own this after we leave. In plain English.", icon_kind: "shield" },
  { no: "05", title: "A test pack", body: "All the tests we wrote, set up so anyone can run them again next month, next year, anytime.", icon_kind: "verify" },
  { no: "06", title: "A short walkthrough", body: "A recorded screen-share of us showing your team around the new app. Watch once, refer to forever.", icon_kind: "person" },
];

const STATS_FALLBACK = [
  { value: "98%", label: "of our projects work on day one with no extra fixes." },
  { value: "95%+", label: "behave the same as the original — proven, not promised." },
  { value: "90 min", label: "is the average time from start to a live preview." },
  { value: "200+", label: "projects we've already shipped this way." },
];

const CTA_FALLBACK = {
  headline: "See a live preview before the call ends.",
  body: "",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "See past projects",
  secondary_url: "/work/projects",
};

export default async function DeliverPage() {
  const page = await getDeliverPage();
  const hero = page ?? HERO_FALLBACK;
  const stages   = page?.stages?.length   ? page.stages   : STAGES_FALLBACK;
  const handover = page?.handover?.length ? page.handover : HANDOVER_FALLBACK;
  const stats    = page?.stats?.length    ? page.stats    : STATS_FALLBACK;
  const cta      = page?.cta ?? CTA_FALLBACK;
  const meta     = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;

  return (
    <>
      <PageHero
        crumb={[{ label: "Process", href: "#" }, { label: "Deliver" }]}
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

      {/* ============ Pipeline ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 01 — Six stages</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            The path, <span className="text-gradient">in plain steps</span>.
          </Reveal>

          <PathDraw className="mt-12 hidden md:block" duration={1700}>
            <svg viewBox="0 0 1280 80" className="w-full h-12 text-glow">
              <line x1="40" y1="40" x2="1240" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {[210, 410, 610, 810, 1010, 1210].map((x, idx) => (
                <g key={idx}>
                  <circle cx={x} cy="40" r="6" fill="#0a0a0b" stroke="currentColor" strokeWidth="1.5" />
                  <polyline points={`${x - 8},34 ${x},40 ${x - 8},46`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              ))}
            </svg>
          </PathDraw>

          <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal
                key={s.no ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="rounded-3xl border border-white/10 bg-graphite/40 p-6 lift"
              >
                <div className="flex items-center justify-between">
                  <CardIcon
                    kind={(s.icon_kind as IconKind) ?? PHASE_ICONS[i % PHASE_ICONS.length]}
                    tone="dark"
                    className="h-11 w-11"
                  />
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-glow/15 px-2.5 py-0.5 text-[11px] tracking-[0.18em] text-glow">{s.no ?? String(i + 1).padStart(2, "0")}</span>
                    <span className="h-2 w-2 rounded-full bg-glow pulse-dot" />
                  </div>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ What we hand over ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — What you receive</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Six things, all yours. <span className="text-gradient-ink">Nothing locked away.</span>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {handover.map((h, i) => (
              <Reveal key={h.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-ink/10 bg-white/80 p-7 lift h-full">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={(h.icon_kind as IconKind) ?? HANDOVER_ICONS[i % HANDOVER_ICONS.length]}
                        tone="light"
                        className="h-11 w-11"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">/ {h.no ?? String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">{h.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Receipts ============ */}
      <section className="relative bg-ink border-y border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 grid gap-10 md:grid-cols-4 text-center md:text-left">
          {stats.map((m, i) => {
            const parsed = parseStat(m.value);
            return (
              <Reveal key={m.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <p className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                  {parsed ? <Counter to={parsed.num} suffix={parsed.suf} /> : m.value}
                </p>
                <p className="mt-3 text-sm text-mist max-w-xs mx-auto md:mx-0">{m.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl drift" />
        <AmbientFx tone="dark" density="high" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
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

/** Parse "75%", "24 mo", "1 in 2", "95%+" → { num, suf } for animated Counter. */
function parseStat(value: string): { num: number; suf: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { num: Number(match[1]), suf: match[2] };
}
