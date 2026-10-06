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
import { getWhoPage } from "../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const TEAM_ICONS: IconKind[] = ["analyse", "rocket", "verify", "person"];
const PRINCIPLE_ICONS: IconKind[] = ["pulse", "doc", "flag", "bolt"];
const FOUNDRY_ICONS: IconKind[] = ["cloud", "blueprint", "verify", "shield"];
const ICON_KINDS = new Set<IconKind>([
  "analyse", "convert", "verify", "deploy",
  "chart", "clock", "money", "broken",
  "shield", "doc", "pulse", "cycle", "cloud",
  "bank", "heart", "flag", "cart", "bolt", "umbrella",
  "person", "group", "gear", "rocket", "server", "blueprint",
]);

function iconKind(value: string | undefined, fallback: IconKind) {
  return value && ICON_KINDS.has(value as IconKind) ? (value as IconKind) : fallback;
}

export const metadata: Metadata = {
  title: "Who we are — Moderniza",
  description: "A small, careful team that has spent years rebuilding old software for big businesses. Now we do it as a service.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ The team",
  hero_title: "A small team that has done this before.",
  hero_lede: "We've spent years working on the other side of this — running technology teams, paying for rewrites that didn't ship, watching old apps quietly drag good companies down. Moderniza is the service we wished we could have hired.",
  hero_meta: [
    { id: 0, text: "12 people" },
    { id: 0, text: "3 countries" },
    { id: 0, text: "2 years building this service" },
  ],
};

const TEAM_FALLBACK = [
  { initials: "LM", name: "Lina Marković", role: "Reads code for a living", bio: "Has spent 12 years figuring out how complicated old apps actually work. Leads how we plan every project.", icon_kind: "analyse" },
  { initials: "TR", name: "Theo Ramírez", role: "Makes things go live", bio: "Built the launch process for two well-known platforms. Owns how we put your new app online safely.", icon_kind: "rocket" },
  { initials: "YT", name: "Yuki Tanaka", role: "Quality & testing", bio: "Designs the way we prove the new app behaves the same as the old one — so you can trust the result.", icon_kind: "verify" },
  { initials: "SO", name: "Sam Okafor", role: "Customer side", bio: "Used to run technology at a 200-person company. Makes sure everything we hand over is easy to read and easy to keep.", icon_kind: "person" },
];

const PRINCIPLES_FALLBACK = [
  { no: "01", title: "We show our work.", body: "Nothing happens in the dark. You watch the work as it happens, and you can ask us anything along the way.", icon_kind: "pulse" },
  { no: "02", title: "The old app is the answer key.", body: "We don't guess what your software is supposed to do — we read the original and let it tell us.", icon_kind: "doc" },
  { no: "03", title: "We don't sell a long-term lock-in.", body: "Once your project is done, you don't need us anymore. That's on purpose.", icon_kind: "flag" },
  { no: "04", title: "First it has to work.", body: "If the new app doesn't run, nothing else matters. So that's the first bar we clear, every time.", icon_kind: "bolt" },
];

const STATS_FALLBACK = [
  { value: "12", label: "people on the team" },
  { value: "3", label: "countries we work from" },
  { value: "200+", label: "projects shipped" },
  { value: "0", label: "abandoned projects" },
];

const FOUNDRY_FALLBACK = [
  {
    no: "01",
    title: "AI delivery, not AI theatre.",
    body: "We build around the same discipline expected from serious AI platforms: clear data boundaries, reusable model workflows, fast prototyping, and a path from proof to production.",
    icon_kind: "cloud",
  },
  {
    no: "02",
    title: "Governance is part of the build.",
    body: "Modernization work touches critical business logic. Every decision needs ownership, traceability, and a written reason your legal, security, and operations teams can inspect.",
    icon_kind: "blueprint",
  },
  {
    no: "03",
    title: "Explainable by default.",
    body: "A rebuilt system should not be a mystery. We document how the old app was understood, how the new app was generated, and how parity was tested.",
    icon_kind: "verify",
  },
  {
    no: "04",
    title: "Compliance-ready handover.",
    body: "The output is designed for enterprise review: source, test evidence, deployment notes, access assumptions, and the controls needed to keep teams confident after launch.",
    icon_kind: "shield",
  },
];

const CTA_FALLBACK = {
  headline: "Want to work with us?",
  body: "Whether you have a project to discuss or you're just curious whether we're the right fit — say hello. We answer every email.",
  primary_label: "Start a project",
  primary_url: "/contact/start",
  secondary_label: "hello@moderniza.dev",
  secondary_url: "mailto:hello@moderniza.dev",
};

export default async function WhoPage() {
  const page = await getWhoPage();
  const hero = page ?? HERO_FALLBACK;
  const meta = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const team = page?.team?.length ? page.team : TEAM_FALLBACK;
  const principles = page?.principles?.length ? page.principles : PRINCIPLES_FALLBACK;
  const stats = page?.stats?.length ? page.stats : STATS_FALLBACK;
  const cta = page?.cta ?? CTA_FALLBACK;

  return (
    <>
      <PageHero
        crumb={[{ label: "About", href: "#" }, { label: "Who we are" }]}
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
        rightSlot={<ContactRobot variant="team" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* ============ Team grid ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 01 — Some of the team</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Small enough to care. <span className="text-gradient-ink">Experienced enough to deliver.</span>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-ink/10 bg-white/70 p-7 lift">
                    <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-ember/30 via-ink/10 to-glow/30 mb-6 grid place-items-center">
                      <span className="text-5xl font-semibold tracking-tight text-ink/80">
                        {m.initials ?? m.name.split(" ").map((s) => s[0]).join("")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={iconKind(m.icon_kind, TEAM_ICONS[i % TEAM_ICONS.length])}
                        tone="light"
                        className="h-10 w-10"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">/ {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight" dangerouslySetInnerHTML={{ __html: m.name }} />
                    <p className="mt-1 text-sm text-ember font-medium" dangerouslySetInnerHTML={{ __html: m.role }} />
                    <p className="mt-4 text-sm text-ink/70 leading-relaxed">{m.bio}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ AI foundry discipline ============ */}
      <section className="relative bg-bone text-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — AI foundry discipline</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal delay={1}>
              <h2 className="max-w-xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
                Built like a serious <span className="text-gradient-ink">GenAI delivery environment.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
                We took cues from enterprise AI foundry thinking: rapid development is useful only when it is paired with governance, explainability, compliance, and a clean deployment path.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {FOUNDRY_FALLBACK.map((item, i) => (
                <Reveal key={item.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <div className="h-full rounded-3xl border border-ink/10 bg-white/70 p-7 lift">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={iconKind(item.icon_kind, FOUNDRY_ICONS[i % FOUNDRY_ICONS.length])}
                        tone="light"
                        className="h-11 w-11"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">/ {item.no}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Principles ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 03 — How we work</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-4xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four things <span className="text-gradient">we mean</span>.
          </Reveal>

          <ol className="mt-14 grid gap-px md:grid-cols-2 bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {principles.map((p, i) => (
              <Reveal key={p.title ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="bg-ink p-7 md:p-10 lift">
                <div className="flex items-center justify-between">
                  <CardIcon
                    kind={iconKind(p.icon_kind, PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length])}
                    tone="dark"
                    className="h-11 w-11"
                  />
                  <span className="chip text-[11px] tracking-[0.18em] text-mist">/ {p.no ?? String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-2xl md:text-[28px] font-semibold leading-tight tracking-tight">{p.title}</h3>
                <p className="mt-3 text-chalk/70 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ Numbers ============ */}
      <section className="relative bg-bone text-ink border-y border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 grid gap-8 grid-cols-2 md:grid-cols-4 text-center md:text-left">
          {stats.map((s, i) => {
            const parsed = parseStat(s.value);
            return (
              <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <p className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                  {parsed ? <Counter to={parsed.num} suffix={parsed.suf} /> : s.value}
                </p>
                <p className="mt-2 text-sm text-ink/60">{s.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl drift" />
        <AmbientFx tone="dark" density="high" corner="bl" />
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
