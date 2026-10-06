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

const WHY_ICONS: IconKind[] = ["money", "chart", "clock", "money", "broken"];
const WHAT_ICONS: IconKind[] = ["analyse", "convert", "verify", "deploy"];
const WHAT_GIFS = ["/G1.gif", "/G2.gif", "/G3.gif", "/G4.gif"];
const BUILT_FOR_ICONS: IconKind[] = ["server", "person", "blueprint", "gear", "group", "rocket"];
const DIFF_ICONS: IconKind[] = ["cycle", "doc", "verify", "shield", "cloud", "pulse"];

const WHY_FALLBACK = [
  {
    no: "01",
    metric: "$1.52T",
    title: "Global technical debt, growing every year.",
    body: "Most of it sits inside legacy systems nobody wants to touch — and nobody can afford to leave alone.",
  },
  {
    no: "02",
    metric: "75%",
    title: "Of enterprise apps still run on legacy.",
    body: "Cloud, AI, and mobile roadmaps stall on the same wall: code older than the people maintaining it.",
  },
  {
    no: "03",
    metric: "12–24 mo",
    title: "Average modernization project, often abandoned.",
    body: "Manual rewrites lose institutional knowledge and ship late. Lift-and-shift just hides the problem in a cloud.",
  },
  {
    no: "04",
    metric: "$200–500",
    title: "Per function point, paid by hand.",
    body: "Manual modernization is slow, error-prone, and burns the senior engineers you need on real work.",
  },
  {
    no: "05",
    metric: "1 in 2",
    title: "Old AI translations don&rsquo;t even compile.",
    body: "Naive LLM rewrites drift on names, signatures and imports — they look right, then break at the build.",
  },
];

const WHAT_FALLBACK = [
  {
    no: "01",
    h: "Analyse",
    sub: "Understand the codebase, deeply.",
    items: [
      "Multi-language semantic parsing across the stack",
      "Functions, classes, APIs, SQL, call-graph, dependencies",
      "Architecture pattern detection — MVC, REST, monolith",
      "A rich blueprint that becomes the AI&rsquo;s source of truth",
    ],
  },
  {
    no: "02",
    h: "Convert",
    sub: "Rewrite — intelligently, not literally.",
    items: [
      "Contract-first: names &amp; paths are declared before code",
      "Adaptive batching — complex files get dedicated AI calls",
      "Stitch pass fixes imports, calls, and remaining stubs",
      "Output is built around your target stack, not pasted into it",
    ],
  },
  {
    no: "03",
    h: "Verify",
    sub: "Prove it behaves like the original.",
    items: [
      "Auto-generated test cases derived from the blueprint",
      "Sandboxed execution against the converted app",
      "Up to 3 auto-fix loops to reach &gt;95% pass rate",
      "Security checks ensure old vulnerabilities don&rsquo;t carry over",
    ],
  },
  {
    no: "04",
    h: "Deploy",
    sub: "Ship to production with one click.",
    items: [
      "AWS (EC2 / ECS / EKS) and Azure (AKS), out of the box",
      "Auto-generated Docker, Terraform and CI pipelines",
      "GitLab integration with first-commit handover",
      "A live URL — not a zip file someone has to figure out",
    ],
  },
];

const PIPELINE_FALLBACK = [
  { i: "P0", h: "Contract", t: "Pre-flight: every file path, class and method signature is declared before a line is written." },
  { i: "P1", h: "Skeleton", t: "A compilable project structure is generated to match the contract — empty bodies, real shape." },
  { i: "P2", h: "Test cases", t: "Behavioural tests are derived from the analysis. No runtime needed; the spec writes itself." },
  { i: "P3", h: "Convert", t: "Code is converted layer-by-layer with adaptive complexity batching. Difficult files get more attention." },
  { i: "P4", h: "Stitch", t: "Imports, callsites and stub fills are reconciled across the project. The build goes green." },
  { i: "P5", h: "Verify", t: "Tests run in a sandbox. Failures trigger up-to-3 automated fix loops until parity is proven." },
];

const COMPARE_FALLBACK = [
  {
    label: "Manual rewrite",
    rows: [
      { l: "20-file project", v: "2–4 weeks", w: 92, t: "ember" as const },
      { l: "Compiles without fix", v: "≈ 50%", w: 50, t: "mist" as const },
      { l: "Functional parity", v: "≈ 65%", w: 65, t: "mist" as const },
    ],
  },
  {
    label: "Old AI translators",
    rows: [
      { l: "20-file project", v: "20–40 min", w: 32, t: "ember" as const },
      { l: "Compiles without fix", v: "≈ 60%", w: 60, t: "mist" as const },
      { l: "Functional parity", v: "≈ 55%", w: 55, t: "mist" as const },
    ],
  },
  {
    label: "Moderniza",
    rows: [
      { l: "20-file project", v: "8–15 min", w: 14, t: "glow" as const },
      { l: "Compiles without fix", v: "&gt; 98%", w: 98, t: "glow" as const },
      { l: "Functional parity", v: "&gt; 95% (verified)", w: 95, t: "glow" as const },
    ],
  },
];

const JOURNEY_FALLBACK = [
  { n: "01", h: "Upload", t: "GitHub URL, ZIP, or single file." },
  { n: "02", h: "Analyse", t: "Blueprint + security findings." },
  { n: "03", h: "Choose", t: "Target stack, validated by AI." },
  { n: "04", h: "Convert", t: "Real-time stream, phase-by-phase." },
  { n: "05", h: "Review", t: "Code, tests, diagnostics, diffs." },
  { n: "06", h: "Deploy", t: "AWS or Azure — one click. Live URL." },
];

const BUILT_FOR = [
  ["Enterprise IT", "Modernise legacy monoliths to microservices."],
  ["CTOs &amp; Tech Leaders", "Accelerate digital-transformation roadmaps."],
  ["Software Architects", "Evaluate and execute migrations end-to-end."],
  ["DevOps Engineers", "Auto-generate cloud-native deployment pipelines."],
  ["Consulting Firms", "Deliver modernization at scale, with proof."],
  ["Startups", "Pivot the stack without a year-long rewrite."],
];

const DIFFERENTIATORS = [
  ["End-to-end automation", "From upload to a deployed app — no manual steps in between."],
  ["Contract-first methodology", "Eliminates broken imports, drifted method names, half-finished files."],
  ["Behavioural verification", "Test-proven parity, not just translation that &ldquo;looks right.&rdquo;"],
  ["Security-embedded", "Vulnerabilities flagged before conversion and not replicated after."],
  ["Multi-cloud out of the box", "AWS &amp; Azure, with the IaC generated for you."],
  ["Real-time visibility", "Watch every phase stream, live — no &lsquo;trust me&rsquo; black box."],
];

const SOUNDBITES = [
  "It doesn&rsquo;t just translate code — it understands it, secures it, verifies it, and deploys it.",
  "From legacy zip to a live URL — in 30 to 90 minutes, end-to-end.",
  "Compiles &gt; 98% of the time. Verified parity &gt; 95%.",
  "Twenty files in fifteen minutes. A hundred in under an hour.",
  "Watch every phase stream live. No &ldquo;come back tomorrow.&rdquo;",
  "Modernize with confidence — finally, a process you can show your board.",
];

const NEED_FALLBACK: { n: string; items: [string, string][] }[] = [
  {
    n: "From you",
    items: [
      ["A repo or a zip", "GitHub URL, archive, or even a single file. We start with what you have."],
      ["A target stack — or a question", "We&rsquo;ll guide you through Python / Java / Node / .NET, React / Vue, Postgres / Mongo."],
      ["A 30-minute window", "One stakeholder, one screen-share, one decision. That&rsquo;s the whole demo."],
      ["Permission to ship", "When the tests are green and the build is signed, we&rsquo;ll want to deploy. You decide where."],
    ],
  },
  {
    n: "From us",
    items: [
      ["A blueprint, before any code", "Every name and path declared up front. No drift, no surprises."],
      ["Tests written before the rewrite", "We prove parity, not just produce output."],
      ["A live stream of every phase", "You see what&rsquo;s happening — and what isn&rsquo;t — in real time."],
      ["A bundle, not a black box", "Source, IaC, Dockerfiles, docs — yours forever, vendor-locked to nobody."],
    ],
  },
];

const METRICS_FALLBACK = [
  { num: 98,  suf: "%",   label: "of Moderniza builds compile without a manual fix" },
  { num: 95,  suf: "%+",  label: "verified functional parity, against original tests" },
  { num: 90,  suf: " min", label: "median end-to-end time, upload to deployed app" },
  { num: 200, suf: "+",   label: "conversions completed across enterprise pilots" },
];

const CTA_FALLBACK = {
  eyebrow: "/ 09 — Next",
  headline_line1: "Bring a repo.",
  headline_line2: "Leave with a build.",
  headline_line3: "In 30 minutes.",
  body: "Drop us a GitHub URL or a zip. We’ll run a live blueprint, walk you through every phase, and ship a deployed sandbox before the call ends.",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "Start a project",
  secondary_url: "/contact/start",
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
  const metrics       = metricRows.length     ? metricRows.map((m) => ({ num: m.num, suf: m.suffix, label: m.label })) : METRICS_FALLBACK;
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
                The legacy crisis,
                <br />
                <em className="not-italic text-gradient">in five numbers</em>.
              </h2>
            </Reveal>
            <Reveal delay={2} className="text-chalk/80 text-lg leading-relaxed">
              <p>
                Tech debt isn&rsquo;t an engineering anecdote. It&rsquo;s a balance-sheet item that
                grows every quarter — and quietly blocks every cloud, AI and mobile programme
                that depends on the code beneath.
              </p>
              <p className="mt-4 text-mist">
                These are the five numbers that show up on every modernization slide we see:
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-5 bg-white/10 border border-white/10 rounded-3xl overflow-visible">
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
                    <p className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-glow font-mono digit-rise">
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
                One platform.
                <br />
                Four <span className="text-gradient-ink">verbs</span>.
              </h2>
            </Reveal>
            <Reveal delay={2} className="text-lg text-ink/75 leading-relaxed">
              <p>
                Moderniza doesn&rsquo;t just translate code — it understands it, secures it,
                verifies it and deploys it. Four verbs share one workspace, one stream and one
                bar. Tilt the cards to feel the shape.
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
            The six-phase pipeline. <span className="text-gradient">In plain English.</span>
          </Reveal>

          <Reveal delay={2} className="mt-6 max-w-2xl text-lg text-chalk/80">
            Every conversion runs through the same six phases. Each phase has a streamed
            artefact, a date, and an automated gate. You always know what&rsquo;s done, what&rsquo;s
            next, and what&rsquo;s blocked.
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
            Sources: internal benchmarks across 200+ conversions; baseline metrics from
            CISQ 2022 industry estimates. Naive AI baseline taken from public translator tools.
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
            Six steps from a legacy zip <span className="text-gradient">to a live URL</span>.
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

          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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
            Total time, end-to-end: <span className="text-glow font-semibold">30 – 90 minutes</span>.
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
            Built for the people <span className="text-gradient">who own the roadmap</span>.
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
            Six things <span className="text-gradient-ink">nobody else</span> does in one workspace.
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
                <Counter to={m.num} suffix={m.suf} />
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
