import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import MagneticButton from "../components/MagneticButton";
import AnimatedBar from "../components/AnimatedBar";
import AmbientFx from "../components/AmbientFx";
import MiniRobot from "../components/MiniRobot";
import CardIcon, { type IconKind } from "../components/CardIcon";
import { getWhatPage } from "../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const VERB_ICONS: IconKind[] = ["analyse", "convert", "verify", "deploy"];

export const metadata: Metadata = {
  title: "What we do — Moderniza",
  description: "We turn old, slow software into a modern app that runs faster, costs less, and keeps everything that already worked.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ What we do",
  hero_title: "Four steps. One new app.",
  hero_lede: "We take the software you've been putting off rebuilding and turn it into a modern app — without the multi-year project. Same features. Same business rules. Faster, cheaper to run, and easy to keep changing.",
  hero_meta: [
    { id: 0, text: "Most projects take 1 to 12 weeks" },
    { id: 0, text: "Behaves like the original" },
    { id: 0, text: "Works on day one" },
  ],
};

const STEPS_FALLBACK = [
  {
    no: "01",
    title: "Understand",
    sub: "We get to know your app.",
    icon_kind: "analyse",
    items: [
      { id: 1, text: "We read every screen, every form, every report." },
      { id: 2, text: "We figure out what each part does — in plain English." },
      { id: 3, text: "We map the bits that talk to each other." },
      { id: 4, text: "You get a clear summary of how your app works today." },
    ],
  },
  {
    no: "02",
    title: "Rebuild",
    sub: "We make a modern version.",
    icon_kind: "convert",
    items: [
      { id: 1, text: "We write down the new shape on paper first." },
      { id: 2, text: "We rebuild it piece by piece, the same way you'd renovate a house." },
      { id: 3, text: "Every piece keeps doing what the old one did — only faster." },
      { id: 4, text: "Tricky bits get extra care, not less." },
    ],
  },
  {
    no: "03",
    title: "Test",
    sub: "We prove the new one matches.",
    icon_kind: "verify",
    items: [
      { id: 1, text: "We compare the new app to the old one, side by side." },
      { id: 2, text: "If anything behaves differently, we fix it before you see it." },
      { id: 3, text: "We re-run the same checks until it all lines up." },
      { id: 4, text: "Old security holes don't get carried over." },
    ],
  },
  {
    no: "04",
    title: "Launch",
    sub: "We put it live for you.",
    icon_kind: "deploy",
    items: [
      { id: 1, text: "Hosted on a major cloud — your choice." },
      { id: 2, text: "Set up to scale up or down as your traffic moves." },
      { id: 3, text: "Connected to your team's tools so updates are easy." },
      { id: 4, text: "A working website, not a folder someone has to figure out." },
    ],
  },
];

const QUESTIONS_FALLBACK = [
  { question: "What kinds of apps?", answer: "Anything you currently use as a business — websites, internal tools, customer portals, billing systems, scheduling apps, reporting tools." },
  { question: "How old is too old?", answer: "We work happily with apps from the early 2000s. We've also rebuilt apps from the 1990s. If it still runs, we can usually rebuild it." },
  { question: "Where does the new one live?", answer: "Wherever you'd like — Amazon, Microsoft, or your own setup. We'll explain the pros and cons in plain language." },
  { question: "What about our team?", answer: "Your team stays in charge. We hand over the new app fully — code, documents, instructions — so anyone can pick it up later." },
];

const COMPARISON_FALLBACK = [
  {
    label: "Hand-rebuild",
    is_ours: false,
    metric_1_label: "Time", metric_1_value: "Months", metric_1_weight: 92,
    metric_2_label: "Works on day one", metric_2_value: "About half", metric_2_weight: 50,
    metric_3_label: "Behaves like original", metric_3_value: "Roughly", metric_3_weight: 65,
  },
  {
    label: "Other AI tools",
    is_ours: false,
    metric_1_label: "Time", metric_1_value: "Hours", metric_1_weight: 32,
    metric_2_label: "Works on day one", metric_2_value: "Most of the time", metric_2_weight: 60,
    metric_3_label: "Behaves like original", metric_3_value: "Often not", metric_3_weight: 55,
  },
  {
    label: "Moderniza",
    is_ours: true,
    metric_1_label: "Time", metric_1_value: "Days to weeks", metric_1_weight: 14,
    metric_2_label: "Works on day one", metric_2_value: "Almost always", metric_2_weight: 98,
    metric_3_label: "Behaves like original", metric_3_value: "Proven", metric_3_weight: 95,
  },
];

const CTA_FALLBACK = {
  headline: "See it on your app.",
  body: "",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "How we work",
  secondary_url: "/process/discover",
};

export default async function WhatPage() {
  const page = await getWhatPage();
  const hero = page ?? HERO_FALLBACK;
  const meta = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const steps = page?.steps?.length ? page.steps : STEPS_FALLBACK;
  const questions = page?.questions?.length ? page.questions : QUESTIONS_FALLBACK;
  const comparison = page?.comparison?.length ? page.comparison : COMPARISON_FALLBACK;
  const cta = page?.cta ?? CTA_FALLBACK;

  return (
    <>
      <PageHero
        crumb={[{ label: "About", href: "#" }, { label: "What we do" }]}
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
        rightSlot={<ContactRobot variant="blueprint" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* ============ Four steps ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 01 — How it works</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Same input. Same result. <span className="text-gradient-ink">A much better middle.</span>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((p, i) => (
              <Reveal key={p.no ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="group relative rounded-3xl border border-ink/10 bg-white/70 p-7 lift">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ember/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <CardIcon
                          kind={(p.icon_kind as IconKind) ?? VERB_ICONS[i % VERB_ICONS.length]}
                          tone="light"
                          className="h-11 w-11"
                        />
                        <span className="chip text-[11px] tracking-[0.18em] text-ink/60">{p.no}</span>
                      </div>
                      <h3 className="mt-8 text-3xl font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-1 text-sm text-ember font-medium">{p.sub}</p>
                      <ul className="mt-6 space-y-2 text-sm text-ink/80">
                        {p.items.map((it) => (
                          <li key={it.id ?? it.text} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
                            <span>{it.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Common questions ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="br" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 02 — Common questions</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Whatever you have. <span className="text-gradient">Wherever you want it.</span>
          </Reveal>

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {questions.map((q, i) => (
              <Reveal
                key={q.question ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-12 py-7 md:py-9 items-baseline"
              >
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-chalk">{q.question}</h3>
                <p className="text-base md:text-lg text-chalk/80 leading-relaxed">{q.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Comparison ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 03 — How we compare</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            {page?.comparison_title ? page.comparison_title : <>The same project, <span className="text-gradient-ink">three ways</span>.</>}
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {comparison.map((c, i) => {
              const rows: Array<{ l: string; v: string; w: number; t: "ember" | "mist" | "glow" }> = [
                { l: c.metric_1_label, v: c.metric_1_value, w: c.metric_1_weight, t: c.is_ours ? "glow" : "ember" },
                { l: c.metric_2_label, v: c.metric_2_value, w: c.metric_2_weight, t: c.is_ours ? "glow" : "mist" },
                { l: c.metric_3_label, v: c.metric_3_value, w: c.metric_3_weight, t: c.is_ours ? "glow" : "mist" },
              ];
              return (
                <Reveal
                  key={c.label}
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                  className={[
                    "rounded-3xl border p-7",
                    c.is_ours ? "border-ink bg-ink text-chalk" : "border-ink/10 bg-white/80",
                  ].join(" ")}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{c.label}</h3>
                    {c.is_ours && (
                      <span className="rounded-full bg-glow px-2.5 py-0.5 text-[11px] uppercase tracking-[0.16em] text-ink">ours</span>
                    )}
                  </div>
                  <div className="mt-7 space-y-7">
                    {rows.map((r) => (
                      <AnimatedBar key={r.l} to={r.w} label={r.l} value={r.v} tint={r.t} delay={i * 120} />
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/3 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="high" corner="tr" />
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
