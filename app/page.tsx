import Link from "next/link";
import HeroIntro from "./components/HeroIntro";
import Reveal from "./components/Reveal";
import Counter from "./components/Counter";
import Tilt from "./components/Tilt";
import MagneticButton from "./components/MagneticButton";
import AnimatedBar from "./components/AnimatedBar";
import PathDraw from "./components/PathDraw";
import AmbientFx from "./components/AmbientFx";
import MiniRobot from "./components/MiniRobot";
import CardIcon, { type IconKind } from "./components/CardIcon";
import IndustriesMarquee from "./components/IndustriesMarquee";
import ImageStripMarquee from "./components/ImageStripMarquee";
import CodeFactory from "./components/CodeFactory";
import {
  getHero, getCta, getWhyPoints, getWhatPillars, getPipeline,
  getComparison, getJourney, getNeed, getBuiltFor, getDifferents,
  getSoundbites, getMetrics, FALLBACK_HERO, mediaUrl,
} from "./lib/strapi";

// Re-validate the homepage every 60 seconds so Strapi edits appear without
// a redeploy. Individual fetches inside ./lib/strapi also use revalidate: 60.
export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const WHY_ICONS: IconKind[] = ["doc", "broken", "shield"];
const WHAT_ICONS: IconKind[] = ["analyse", "convert", "verify", "deploy"];
const WHAT_GIFS = ["/G1.gif", "/G2.gif", "/G3.gif", "/G4.gif"];
const BUILT_FOR_ICONS: IconKind[] = ["person", "group", "blueprint", "shield", "gear"];
const DIFF_ICONS: IconKind[] = ["doc", "chart", "verify", "gear", "shield", "cloud"];

const WHY_FALLBACK = [
  {
    no: "01",
    metric: "Hidden rules",
    title: "Business logic is buried in code that only a few people can read.",
    body: "Decades of rules live inside COBOL programs, JCL batch jobs, stored procedures and ageing desktop apps. The people who wrote them have retired or moved on.",
  },
  {
    no: "02",
    metric: "Risky rewrites",
    title: "Big-bang projects run late, over budget, and break behaviour users depend on.",
    body: "A manual rewrite takes years. It costs more than planned. Worst of all, it quietly drops the rules nobody knew were there.",
  },
  {
    no: "03",
    metric: "Black-box AI",
    title: "Most AI code tools translate file by file and hope the result works.",
    body: "Nobody can prove what was kept — the interest rounding, the exception for one region, the validation added after an audit twenty years ago.",
  },
];

const WHAT_FALLBACK = [
  {
    no: "01",
    h: "Plan first",
    sub: "Understand the whole application, not one file at a time.",
    items: [
      "Every file is scanned and classified by language and role",
      "Your app today, the plan, your screens and app flow — in plain words",
      "Business rules found by code and explained by AI",
      "A ready backlog of epics, stories and acceptance criteria",
    ],
  },
  {
    no: "02",
    h: "Freeze the plan",
    sub: "One contract that every agent must follow.",
    items: [
      "Every service, API, data model, rule, screen and test — frozen",
      "Every name locked in a symbol registry, sealed with a checksum",
      "OpenAPI and database schema files generated from it",
      "A compare view shows anything dropped or added",
    ],
  },
  {
    no: "03",
    h: "Build against it",
    sub: "Parallel AI agents, no drift.",
    items: [
      "Tasks built in dependency-ordered waves",
      "Agents build in parallel against the locked contract",
      "Imports and wiring checked after every wave",
      "Six gates must pass before code leaves this step",
    ],
  },
  {
    no: "04",
    h: "Prove it runs",
    sub: "Started, tested and checked before you see it.",
    items: [
      "Every API called and every screen opened in a real browser",
      "Problems fixed automatically against the live stack",
      "Old vs new compared by business category",
      "Anything not measured is labelled unmeasured — never 100%",
    ],
  },
];

const PIPELINE_FALLBACK = [
  { i: "Step 1", h: "Blueprint", t: "Every file is scanned and classified. You get your current app explained in plain words: screens, data, batch jobs, business rules, and a ready backlog of epics and stories." },
  { i: "Step 2", h: "Contract", t: "The blueprint becomes a frozen specification of services, APIs, data models, rules, screens, access and tests. Every name is locked so agents cannot drift." },
  { i: "Step 3", h: "Code", t: "The contract is split into tasks and built in dependency-ordered waves by parallel AI agents. Code must pass six gates before it leaves this step." },
  { i: "Step 4", h: "Testing", t: "The new application is started for real. Every API and screen is checked, problems are fixed automatically, and old vs new is compared by business category." },
  { i: "Step 5", h: "Deploy", t: "The verified app goes live on Docker or Kubernetes, with a delivery repository and CI/CD files ready for your team." },
];

const COMPARE_FALLBACK = [
  {
    label: "Manual rewrite",
    rows: [
      { l: "Rules traced to their source line", v: "By hand, if at all", w: 15, t: "mist" as const },
      { l: "Frozen contract before any code", v: "Rarely", w: 20, t: "mist" as const },
      { l: "Started and tested before release", v: "At the end", w: 30, t: "ember" as const },
    ],
  },
  {
    label: "Old AI translators",
    rows: [
      { l: "Rules traced to their source line", v: "No", w: 8, t: "mist" as const },
      { l: "Frozen contract before any code", v: "No — file by file", w: 8, t: "mist" as const },
      { l: "Started and tested before release", v: "Hope it works", w: 12, t: "ember" as const },
    ],
  },
  {
    label: "Moderniza",
    rows: [
      { l: "Rules traced to their source line", v: "Every rule", w: 100, t: "glow" as const },
      { l: "Frozen contract before any code", v: "Yes — symbol registry", w: 100, t: "glow" as const },
      { l: "Started and tested before release", v: "Six gates, live tests", w: 100, t: "glow" as const },
    ],
  },
];

const JOURNEY_FALLBACK = [
  { n: "01", h: "A running application", t: "Deployed and reachable." },
  { n: "02", h: "Source code", t: "In your Git repository." },
  { n: "03", h: "CI/CD files", t: "A Jenkinsfile and Kubernetes manifests for AWS or Azure." },
  { n: "04", h: "Blueprint", t: "The old system, in plain words." },
  { n: "05", h: "Frozen contract", t: "With OpenAPI and database schema files." },
  { n: "06", h: "Business-rules document", t: "Source file and line for each rule." },
  { n: "07", h: "Equivalence and code reports", t: "Old vs new, and a code report." },
  { n: "08", h: "Batch job documentation", t: "For every scheduled job." },
  { n: "09", h: "Cost ledger", t: "Every AI call made on your project." },
];

const BUILT_FOR = [
  ["CIOs and CTOs", "Retire mainframe and legacy platforms with a plan you can show the board."],
  ["Application owners", "Get a new system that behaves like the old one, with proof."],
  ["Enterprise architects", "Choose the target stack and architecture; get a contract, not a guess."],
  ["Public sector and regulated teams", "Strong login, tamper-evident audit, self-hosted and air-gapped options."],
  ["System integrators", "Run many modernization projects with one consistent, measurable process."],
];

const DIFFERENTIATORS = [
  ["Nothing lost", "Rules are found by code, explained by AI, then checked against the original source. Each rule gets one owner in the new code, and the platform asks for proof it was built."],
  ["Nothing hidden", "See the plan before code is written, the cost before each phase, and every AI call with its tokens and cost."],
  ["Runs, not just compiles", "Before release, code must build, start in Docker, pass health checks, answer every API without server errors, and pass its own tests."],
  ["You stay in charge", "Approve budgets, choose the target stack, and run each step by hand or let it flow automatically. Pause and resume any time."],
  ["Secure by default", "Passkeys, tamper-evident audit log, just-in-time admin access, and a one-switch AI kill switch."],
  ["Your infrastructure", "Single-tenant SaaS, self-hosted, fully air-gapped, or AI routed through AWS GovCloud."],
];

const SOUNDBITES = [
  "Modernize legacy systems. Prove nothing was lost.",
  "If something could not be measured, Moderniza says &ldquo;unmeasured&rdquo; — it never fills the gap with 100%.",
  "Plan first. Freeze the plan. Build against it. Prove it runs.",
];

const NEED_FALLBACK: { n: string; items: [string, string][] }[] = [
  {
    n: "From you",
    items: [
      ["Your code, as it is", "A Git repository URL, a folder upload, or a .zip, .war or .ear archive. We start with what you have."],
      ["A target stack — or a question", "Python with FastAPI, React or Angular and PostgreSQL is the most proven. Java Spring Boot, C# .NET and Go are ready. Many more can be selected."],
      ["A 30-minute window", "One stakeholder, one screen-share, one decision. That&rsquo;s the whole demo."],
      ["Permission to ship", "When the tests are green and the build is signed, we&rsquo;ll want to deploy. You decide where."],
    ],
  },
  {
    n: "From us",
    items: [
      ["A blueprint, before any code", "Your current app explained in plain words, and a frozen contract every agent must follow. No drift, no surprises."],
      ["Proof, not promises", "Six gates, live API and screen checks, and an old-vs-new equivalence report that marks what was not measured."],
      ["Every step, live", "The live console, the running app, and every agent&rsquo;s instructions, files, tokens and cost."],
      ["A delivery, not a black box", "Source, Jenkinsfile, Kubernetes manifests, blueprint, rules document and reports — in your own repository."],
    ],
  },
];

const METRICS_FALLBACK = [
  { num: 0, suf: "", label: "Rule-level traceability — every rule linked to its source file and line", title: "Traced" },
  { num: 6, suf: " gates", label: "Code must build, start and answer its APIs before release", title: "" },
  { num: 0, suf: "", label: "You approve the spend — cost estimate shown before each phase", title: "Approved" },
  { num: 0, suf: "", label: "Runs where you need it — single-tenant SaaS, self-hosted, air-gapped or GovCloud", title: "Anywhere" },
];

const CTA_FALLBACK = {
  eyebrow: "/ 09 — Next",
  headline_line1: "See your own code",
  headline_line2: "modernized.",
  headline_line3: "Before anything is built.",
  body: "Bring a repository. We will scan it and show you the blueprint, the plan and the cost estimate — before anything is built.",
  primary_label: "Book a demo →",
  primary_url: "/contact",
  secondary_label: "See how it works",
  secondary_url: "/how-it-works",
  status_text: "Open · Q3 / Q4 2026 capacity",
};

export default async function Home() {
  // Fetch everything in parallel. Each accessor returns [] / null on
  // failure, so missing Strapi data just falls back to the constants below.
  const [
    heroRow, ctaRow, whyRows, whatRows, pipelineRows, compareRows,
    journeyRows, needRows, builtForRows, diffRows, soundbiteRows, metricRows,
  ] = await Promise.all([
    getHero(), getCta(), getWhyPoints(), getWhatPillars(), getPipeline(),
    getComparison(), getJourney(), getNeed(), getBuiltFor(), getDifferents(),
    getSoundbites(), getMetrics(),
  ]);

  const hero = heroRow ?? FALLBACK_HERO;
  const why          = whyRows.length         ? whyRows         : WHY_FALLBACK;
  const whatPillars  = whatRows.length        ? whatRows.map((p) => ({ ...p, items: p.items?.map((it) => it.text) ?? [] })) : WHAT_FALLBACK;
  const pipeline     = pipelineRows.length    ? pipelineRows    : PIPELINE_FALLBACK;
  const compare      = compareRows.length     ? compareRows.map((c) => ({ label: c.label, rows: c.rows })) : COMPARE_FALLBACK;
  const journey      = journeyRows.length     ? journeyRows     : JOURNEY_FALLBACK;
  const need         = needRows.length        ? needRows.map((c) => ({ n: c.n, items: c.items.map((i) => [i.title, i.body] as [string, string]) })) : NEED_FALLBACK;
  const builtForList = builtForRows.length    ? builtForRows.map((b) => [b.who, b.why] as [string, string]) : BUILT_FOR;
  const builtForIcons: IconKind[] = builtForRows.length ? builtForRows.map((b) => b.icon_kind) : BUILT_FOR_ICONS;
  const differentList = diffRows.length       ? diffRows.map((d) => [d.h, d.b] as [string, string]) : DIFFERENTIATORS;
  const diffIcons: IconKind[] = diffRows.length ? diffRows.map((d) => d.icon_kind) : DIFF_ICONS;
  const soundbites    = soundbiteRows.length  ? soundbiteRows.map((s) => s.text) : SOUNDBITES;
  const metrics       = metricRows.length     ? metricRows.map((m) => ({ num: m.num, suf: m.suffix, label: m.label, title: "" })) : METRICS_FALLBACK;
  const whyIcons: IconKind[] = whyRows.length ? whyRows.map((w) => w.icon_kind) : WHY_ICONS;
  const whatIcons: IconKind[] = whatRows.length ? whatRows.map((w) => w.icon_kind) : WHAT_ICONS;
  const whatGifs = whatRows.length
    ? whatRows.map((w) => mediaUrl(w.gif) ?? w.gif_url)
    : WHAT_GIFS;
  const cta = ctaRow ?? CTA_FALLBACK;

  return (
    <>
      {/* ============ 01 · HERO  (Framer Motion intro) ============ */}
      <HeroIntro
        eyebrow={hero.eyebrow}
        headline_line1={hero.headline_line1}
        headline_line2={hero.headline_line2}
        italic_word={hero.italic_word}
        subheading={hero.subheading}
        primary_cta_label={hero.primary_cta_label}
        primary_cta_url={hero.primary_cta_url}
        secondary_cta_label={hero.secondary_cta_label}
        secondary_cta_url={hero.secondary_cta_url}
        scroll_note={hero.scroll_note}
        pills={hero.pills}
      />

      {/* ============ 02 · WHY  (DARK) — animated giant numbers ============ */}
      <section className="relative bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="br" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 01 — Why</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>

          <div className="mt-8 grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <Reveal delay={1}>
              <h2 className="text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
                Your legacy systems run the business.
                <br />
                <em className="not-italic text-gradient">Nobody wants to touch them</em>.
              </h2>
            </Reveal>
            <Reveal delay={2} className="text-chalk/80 text-lg leading-relaxed">
              <p>
                Decades of business logic live inside COBOL programs, JCL batch jobs, stored procedures
                and ageing desktop apps. The people who wrote them have retired or moved on. The
                documentation is missing, or describes a system that no longer exists.
              </p>
              <p className="mt-4 text-mist">
                A manual rewrite takes years. It costs more than planned. Worst of all, it quietly drops
                the rules nobody knew were there — the interest rounding, the exception for one region,
                the validation added after an audit twenty years ago.
              </p>
            </Reveal>
          </div>

          <ul className={`mt-14 grid gap-px md:grid-cols-2 ${why.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-3"} bg-white/10 border border-white/10 rounded-3xl overflow-visible`}>
            {why.map((p, i) => (
              <Reveal
                key={p.no}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="group bg-ink relative"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="dark"
                  className="absolute -top-16 right-4 h-20 w-14 z-10"
                />
                <Tilt className="h-full" max={5} glare={0.12}>
                  <div className="h-full p-7 md:p-8 lift rounded-3xl">
                    <div className="flex items-center justify-between">
                      <CardIcon kind={whyIcons[i % whyIcons.length]} tone="dark" className="h-11 w-11" />
                      <span className="chip text-[11px] tracking-[0.16em] text-mist">{p.no}</span>
                    </div>
                    <p className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight text-glow digit-rise">
                      {p.metric}
                    </p>
                    <h3
                      className="mt-4 text-base md:text-lg font-semibold leading-snug tracking-tight text-chalk"
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
                    <p
                      className="mt-3 text-sm text-mist leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
                    <div className="mt-7 h-px w-10 bg-glow/0 group-hover:bg-glow group-hover:w-20 transition-all duration-500" />
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ stacked marquees: industries + image strip ============ */}
      <IndustriesMarquee />
      <ImageStripMarquee />

      {/* ============ 03 · WHAT  (LIGHT) — 4 pillars w/ Tilt ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-70" />
        <div className="pointer-events-none absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-ember/15 blur-3xl drift" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — What</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <div className="mt-8 grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-end">
            <Reveal delay={1}>
              <h2 className="text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
                Plan first. Freeze the plan.
                <br />
                Build against it. <span className="text-gradient-ink">Prove it runs.</span>
              </h2>
            </Reveal>
            <Reveal delay={2} className="text-lg text-ink/75 leading-relaxed">
              <p>
                Moderniza does not translate files one by one. It first builds a complete picture of
                what your application does. It turns that picture into a frozen contract — every
                service, API, data model, rule, screen and test. Then AI agents build against that
                contract in parallel, and the result is started, tested and checked before you ever
                see it.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatPillars.map((p, i) => (
              <Reveal
                key={p.no}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="relative flex"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="flex w-full rounded-3xl">
                  <div className="group relative flex w-full flex-col rounded-3xl border border-ink/10 bg-white/70 p-7 lift">
                    <div className="relative flex flex-1 flex-col">
                      <div className="relative -mx-7 -mt-7 mb-6 aspect-square overflow-hidden rounded-t-3xl border-b border-ink/10 bg-ink/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={whatGifs[i % whatGifs.length]}
                          alt={`${p.h} animation`}
                          className="absolute inset-0 h-full w-full object-contain object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardIcon kind={whatIcons[i % whatIcons.length]} tone="light" className="h-11 w-11" />
                        <span className="chip text-[11px] tracking-[0.18em] text-ink/60">
                          {p.no}
                        </span>
                      </div>
                      <h3 className="mt-6 text-3xl font-semibold tracking-tight">{p.h}</h3>
                      <p className="mt-1 text-sm text-ember font-medium">{p.sub}</p>
                      <ul className="mt-6 space-y-2 text-sm text-ink/80">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
                            <span dangerouslySetInnerHTML={{ __html: it }} />
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

      {/* ============ 04 · PIPELINE  (DARK) — 6 phases progress rail ============ */}
      <section className="relative bg-ink">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="low" corner="tl" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 03 — How</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            From legacy code to a running application <span className="text-gradient">in five steps.</span>
          </Reveal>

          <Reveal delay={2} className="mt-6 max-w-2xl text-lg text-chalk/80">
            Moderniza follows the same five steps for every project. Each step has a clear output
            you can review. Each step is checked before the next one starts. And you decide when
            the next one starts.
          </Reveal>

          <ol className="mt-14 relative">
            <span aria-hidden className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-glow/0 via-glow/40 to-glow/0" />
            {pipeline.map((s, i) => (
              <Reveal
                key={s.i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="relative grid gap-6 md:grid-cols-2 md:gap-12 py-7"
              >
                <div className={`pl-12 md:pl-0 ${i % 2 === 1 ? "md:text-right md:pr-12 md:order-2" : "md:pr-12"}`}>
                  <span className="chip text-[11px] tracking-[0.18em] text-mist">{s.i}</span>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{s.h}</h3>
                </div>
                <div className={`pl-12 md:pl-12 text-chalk/80 leading-relaxed ${i % 2 === 1 ? "md:pl-0 md:pr-0" : ""}`}>
                  <span aria-hidden className="absolute left-2 md:left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full bg-ink ring-2 ring-glow" />
                  <p>{s.t}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={2} className="mt-10">
            <Link href="/how-it-works" className="group inline-flex items-center gap-2 text-sm font-semibold text-glow">
              Explore the full process
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ FACTORY · animated assembly line ============ */}
      <CodeFactory />

      {/* ============ 05 · COMPARISON  (LIGHT) — animated bars ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="pointer-events-none absolute -top-32 left-0 h-72 w-72 rounded-full bg-ember/15 blur-3xl drift" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 04 — Proof</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Manual. Old&nbsp;AI. Moderniza. <span className="text-gradient-ink">The same project, three ways.</span>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {compare.map((c, i) => (
              <Reveal
                key={c.label}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className={[
                  "rounded-3xl border p-7",
                  c.label === "Moderniza"
                    ? "border-ink bg-ink text-chalk"
                    : "border-ink/10 bg-white/80 text-ink",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {c.label}
                  </h3>
                  {c.label === "Moderniza" && (
                    <span className="rounded-full bg-glow px-2.5 py-0.5 text-[11px] uppercase tracking-[0.16em] text-ink">
                      ours
                    </span>
                  )}
                </div>
                <div className="mt-7 space-y-7">
                  {c.rows.map((r) => (
                    <AnimatedBar
                      key={r.l}
                      to={r.w}
                      label={r.l}
                      value={r.v.replace("&gt;", ">").replace("&lt;", "<")}
                      tint={r.t}
                      delay={i * 120}
                    />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-10 text-sm text-ink/55">
            A comparison of process, not of measured numbers. Moderniza shows what it could not
            measure — anything unmeasured is labelled unmeasured, never 100%.
          </Reveal>
        </div>
      </section>

      {/* ============ 06 · JOURNEY (DARK) — animated arrows + step cards ============ */}
      <section className="relative bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="br" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 05 — Journey</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            What every modernization <span className="text-gradient">delivers</span>.
          </Reveal>

          <PathDraw className="mt-16 hidden md:block" duration={1700}>
            <svg viewBox="0 0 1280 80" className="w-full h-12 text-glow">
              <line x1="40" y1="40" x2="1240" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0 0" />
              {/* arrow heads at every step */}
              {[210, 410, 610, 810, 1010, 1210].map((x, idx) => (
                <g key={idx}>
                  <circle cx={x} cy="40" r="6" fill="#0a0a0b" stroke="currentColor" strokeWidth="1.5" />
                  <polyline
                    points={`${x - 8},34 ${x},40 ${x - 8},46`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </svg>
          </PathDraw>

          <ul className={`mt-6 grid gap-4 md:grid-cols-2 ${journey.length > 6 ? "lg:grid-cols-3" : "lg:grid-cols-6"}`}>
            {journey.map((s, i) => (
              <Reveal
                key={s.n}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="rounded-3xl border border-white/10 bg-graphite/40 p-5 lift"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-glow/15 px-2.5 py-0.5 text-[11px] tracking-[0.18em] text-glow">
                    {s.n}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-glow pulse-dot" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.h}</h3>
                <p className="mt-1 text-sm text-mist">{s.t}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2} className="mt-10 text-sm text-mist">
            Every deliverable is yours to keep — source, documents and reports, in your own repository.
          </Reveal>
        </div>
      </section>

      {/* ============ 07 · NEED  (LIGHT) — two-column ledger ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 06 — Need</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <div className="mt-8 grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-end">
            <Reveal delay={1}>
              <h2 className="text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
                A great project
                <br />
                <span className="text-gradient-ink">needs both sides</span> showing up.
              </h2>
            </Reveal>
            <Reveal delay={2} className="text-lg text-ink/75 leading-relaxed">
              <p>
                Here&rsquo;s what we ask of you on day one — and what you can ask of us in
                return. No fine print, no hidden assumptions, no &ldquo;you should have known.&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {need.map((col, c) => (
              <Reveal
                key={col.n}
                delay={((c + 1) % 4) as 1 | 2 | 3}
                className="rounded-3xl border border-ink/10 bg-white/70 p-7 md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ink/90 text-chalk px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                    {col.n}
                  </span>
                  <span className="text-xs text-ink/55">{col.items.length} things</span>
                </div>
                <ul className="mt-7 divide-y divide-ink/10">
                  {col.items.map(([title, body], i) => (
                    <li key={title} className="grid grid-cols-[2.4rem_1fr] gap-4 py-4">
                      <span className="chip text-[11px] tabular-nums text-ink/55 pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p
                          className="text-base font-semibold text-ink leading-tight"
                          dangerouslySetInnerHTML={{ __html: title }}
                        />
                        <p
                          className="mt-1 text-sm text-ink/70 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: body }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 08 · BUILT FOR  (DARK) — rotating chips ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[340px] w-[680px] rounded-full bg-glow/15 blur-3xl drift" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="med" corner="tr" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 07 — Built for</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            For the people <span className="text-gradient">who own the risk</span>.
          </Reveal>

          <ul className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-white/10 border border-white/10 rounded-3xl overflow-visible">
            {builtForList.map(([who, why], i) => (
              <Reveal
                key={who}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="group bg-ink relative"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="dark"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <div className="h-full p-7 lift transition-colors group-hover:bg-graphite/40">
                  <div className="flex items-center justify-between">
                    <CardIcon kind={builtForIcons[i % builtForIcons.length]} tone="dark" className="h-11 w-11" />
                    <span className="chip text-[11px] tracking-[0.18em] text-mist">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="mt-5 text-2xl md:text-[28px] font-semibold leading-tight tracking-tight"
                    dangerouslySetInnerHTML={{ __html: who }}
                  />
                  <p
                    className="mt-3 text-sm text-mist leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: why }}
                  />
                  <div className="mt-7 h-px w-10 bg-glow/0 group-hover:bg-glow group-hover:w-20 transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 09 · DIFFERENTIATORS  (LIGHT) ============ */}
      <section className="relative bg-bone text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 08 — Why we win</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>

          <Reveal delay={1} as="h2" className="mt-8 max-w-4xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Built for systems you <span className="text-gradient-ink">cannot afford</span> to get wrong.
          </Reveal>

          <ul className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-ink/10 border border-ink/10 rounded-3xl overflow-visible">
            {differentList.map(([h, b], i) => (
              <Reveal
                key={h}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="group bg-bone hover:bg-white transition-colors relative"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="h-full" max={4} glare={0.08}>
                  <div className="h-full p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <CardIcon kind={diffIcons[i % diffIcons.length]} tone="light" className="h-11 w-11" />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className="mt-5 text-xl md:text-[22px] font-semibold leading-tight tracking-tight text-ink"
                      dangerouslySetInnerHTML={{ __html: h }}
                    />
                    <p
                      className="mt-3 text-sm text-ink/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: b }}
                    />
                    <div className="mt-7 h-px w-10 bg-ember/0 group-hover:bg-ember group-hover:w-20 transition-all duration-500" />
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2} className="mt-14 grid gap-6 md:grid-cols-3">
            {soundbites.slice(0, 3).map((q) => (
              <Reveal key={q} className="rounded-3xl border border-ink/10 bg-white/80 p-6 lift">
                <span className="text-ember text-3xl leading-none">&ldquo;</span>
                <p
                  className="mt-2 text-base md:text-lg leading-snug font-medium"
                  dangerouslySetInnerHTML={{ __html: q }}
                />
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ 10 · METRICS  (DARK) ============ */}
      <section className="relative bg-ink border-y border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 grid gap-10 md:grid-cols-4 text-center md:text-left">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <p className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                {m.num > 0 ? <Counter to={m.num} suffix={m.suf} /> : m.title}
              </p>
              <p className="mt-3 text-sm text-mist max-w-xs mx-auto md:mx-0">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 11 · CTA  (DARK with light tail) ============ */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-glow/20 blur-3xl drift" />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="high" corner="tr" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-40">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">{cta.eyebrow}</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>

          <div className="mt-10 grid gap-12 md:grid-cols-[1.6fr_1fr] md:items-end">
            <Reveal delay={1}>
              <h2 className="text-5xl md:text-7xl lg:text-[120px] font-semibold leading-[0.92] tracking-[-0.03em]">
                {cta.headline_line1}
                <br />
                <span className="text-gradient">{cta.headline_line2}</span>
                <br />
                <span className="text-chalk/60">{cta.headline_line3}</span>
              </h2>
            </Reveal>
            <Reveal delay={2} className="space-y-6">
              <p className="text-lg text-chalk/80">{cta.body}</p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  href={cta.primary_url}
                  className="h-12 rounded-full bg-glow px-6 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse"
                >
                  {cta.primary_label}
                </MagneticButton>
                <MagneticButton
                  href={cta.secondary_url}
                  className="h-12 rounded-full border border-white/15 px-6 text-sm hover:border-chalk/60"
                >
                  {cta.secondary_label}
                </MagneticButton>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-mist">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-glow pulse-dot" />
                  {cta.status_text}
                </span>
                <span>·</span>
                <span>Reply within 1 business day</span>
                <span>·</span>
                <span>NDA on request</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
