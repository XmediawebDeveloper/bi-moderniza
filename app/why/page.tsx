import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import Tilt from "../components/Tilt";
import MagneticButton from "../components/MagneticButton";
import AmbientFx from "../components/AmbientFx";
import MiniRobot from "../components/MiniRobot";
import CardIcon, { type IconKind } from "../components/CardIcon";
import { getWhyPage } from "../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const REASON_ICONS: IconKind[] = ["money", "clock", "cloud", "broken"];

export const metadata: Metadata = {
  title: "Why we exist — Moderniza",
  description: "Old software quietly drains time, money and confidence. Moderniza exists to fix that — without the multi-year project nobody finishes.",
};

const REASONS_FALLBACK = [
  { no: "01", title: "Old software costs you every day.", body: "It runs slower. It breaks more often. The team that knows it is shrinking. And every new idea takes twice as long to ship because of it.", icon_kind: "money" },
  { no: "02", title: "Rebuilding by hand takes years.", body: "Big rewrites lose people, lose budget, and lose momentum. Most never make it to launch. The ones that do arrive late and look like the old thing anyway.", icon_kind: "clock" },
  { no: "03", title: "Just moving it doesn't fix it.", body: "Putting old software in the cloud doesn't make it modern. It just makes the same problems more expensive to host.", icon_kind: "cloud" },
  { no: "04", title: "Most AI tools don't really work.", body: "Half of what they produce won't even start. It looks correct on screen, then falls apart the moment your team tries to actually run it.", icon_kind: "broken" },
];

const STATS_FALLBACK = [
  { value: "75%", label: "of business apps run on software that's now considered old." },
  { value: "24 mo", label: "is the average time a hand-rebuild takes — when it finishes." },
  { value: "1 in 2", label: "rebuilds done by hand never make it to launch." },
  { value: "95%+", label: "of Moderniza projects ship and behave just like the original." },
];

const VALUES_FALLBACK = [
  { no: "01", title: "Plan first, build second.", body: "We agree the shape of the new app on paper before we touch a single file. No surprises, no drift." },
  { no: "02", title: "Prove it works.", body: "Every change is checked against how the old app behaved. We don't guess — we show you." },
  { no: "03", title: "You can see everything.", body: "There's no black box. You watch the work happen in real time and ask questions as it goes." },
  { no: "04", title: "You own it forever.", body: "When we're done, the new app is yours. Code, setup, instructions — all in your hands. Nothing locked behind us." },
];

const HERO_FALLBACK = {
  hero_eyebrow: "/ Our story",
  hero_title: "Old software is quietly costing you a fortune.",
  hero_lede: "Most companies are running on software that's older than the people maintaining it. It still works — but it's slow to change, expensive to host, and a constant worry. Moderniza exists to fix that, without the multi-year project nobody finishes.",
  hero_meta: [
    { id: 0, text: "Founded 2024" },
    { id: 0, text: "For business leaders" },
    { id: 0, text: "Used in 12 countries" },
  ],
};

const CTA_FALLBACK = {
  headline: "Ready to see what we mean?",
  body: "Show us your old app. We'll come back with a clear plan, an honest timeline, and a small live preview — all inside one short call.",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "See what we do",
  secondary_url: "/what",
};

export default async function WhyPage() {
  const page = await getWhyPage();
  const hero = page ?? HERO_FALLBACK;
  const reasons = page?.reasons?.length ? page.reasons : REASONS_FALLBACK;
  const stats   = page?.stats?.length   ? page.stats   : STATS_FALLBACK;
  const values  = page?.values?.length  ? page.values  : VALUES_FALLBACK;
  const cta     = page?.cta ?? CTA_FALLBACK;
  const meta    = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;

  return (
    <>
      <PageHero
        crumb={[{ label: "About", href: "#" }, { label: "Why we exist" }]}
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
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* ============ The four reasons ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 01 — Why nothing moves</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four reasons your old app is still here. <span className="text-gradient-ink">And still slowing you down.</span>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal
                key={r.no ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="relative"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-ink/10 bg-white/70 p-7 md:p-9 lift">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={(r.icon_kind as IconKind) ?? REASON_ICONS[i % REASON_ICONS.length]}
                        tone="light"
                        className="h-11 w-11"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">{r.no}</span>
                    </div>
                    <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">{r.title}</h3>
                    <p className="mt-3 text-ink/75 leading-relaxed">{r.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Big numbers ============ */}
      <section className="relative bg-ink border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="low" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20 grid gap-10 md:grid-cols-4 text-center md:text-left">
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

      {/* ============ Our values ============ */}
      <section className="relative bg-bone text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — How we work with you</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-4xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four promises, in <span className="text-gradient-ink">plain English</span>.
          </Reveal>

          <ul className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-4 bg-ink/10 border border-ink/10 rounded-3xl overflow-hidden">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="bg-bone hover:bg-white transition-colors p-7 md:p-8">
                <span className="chip text-[11px] tracking-[0.18em] text-ink/55">/ {v.no ?? String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl md:text-[22px] font-semibold leading-tight tracking-tight">{v.title}</h3>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">{v.body}</p>
                <div className="mt-7 h-px w-10 bg-ember/40" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl drift" />
        <AmbientFx tone="dark" density="med" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-36">
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
