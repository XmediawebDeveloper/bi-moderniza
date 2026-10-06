import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactRobot from "../../components/ContactRobot";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import MagneticButton from "../../components/MagneticButton";
import AmbientFx from "../../components/AmbientFx";
import MiniRobot from "../../components/MiniRobot";
import CardIcon, { type IconKind } from "../../components/CardIcon";
import { getDefinePage } from "../../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const PILLAR_ICONS: IconKind[] = ["rocket", "blueprint", "server", "shield"];
const CONTRACT_ICONS: IconKind[] = ["doc", "flag", "cycle", "verify"];

export const metadata: Metadata = {
  title: "Define — Moderniza",
  description: "We agree the shape of the new app together — before any rebuilding starts. No surprises later.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ Step 02 — Define",
  hero_title: "Agree the shape on paper. First.",
  hero_lede: "Define is where we write down exactly what the new app will be — every screen, every name, every connection — and you sign off before anything is built. So when the work starts, there are no surprises.",
  hero_meta: [
    { id: 0, text: "1 to 2 days" },
    { id: 0, text: "Mostly async, one short call" },
    { id: 0, text: "Signed-off plan" },
  ],
};

const DECISIONS_FALLBACK = [
  { no: "01", title: "How modern do you want it?", body: "We agree on how new the new app should feel — fully fresh, or comfortably familiar to the people who use it today. Both are valid; we'll talk through trade-offs.", icon_kind: "rocket" },
  { no: "02", title: "What shape should it take?", body: "One single app, or a few smaller pieces? We don't push a fashionable answer — we honour how your team already works and supports things.", icon_kind: "blueprint" },
  { no: "03", title: "Where does the data go?", body: "Your records, customers, history — we plan exactly how they move across without losing anything, and how reports keep working on day one.", icon_kind: "server" },
  { no: "04", title: "Who can do what?", body: "We map out who can sign in, what they can see, and what they can do — including the rules around customer data, audits, and compliance.", icon_kind: "shield" },
];

const CONTRACT_FALLBACK = [
  { no: "01", title: "Every screen", body: "We list every page, every form and every report up front. Nothing gets invented later — no surprise screens, no missing buttons.", icon_kind: "doc" },
  { no: "02", title: "Every name", body: "Names of features, fields and reports are agreed first, so what you see in the new app matches what your team already calls things.", icon_kind: "flag" },
  { no: "03", title: "Every connection", body: "Anything the app talks to today — payments, email, your accounting tool — is mapped before we rebuild, so nothing gets dropped.", icon_kind: "cycle" },
  { no: "04", title: "The order of work", body: "We agree what gets rebuilt first, second, third. The riskiest bits get the most care; the easy bits get done first.", icon_kind: "verify" },
];

const SIGNOFF_FALLBACK = "You, your team, and us. Three names, one document, zero room for mix-ups later.";

const NEXT_FALLBACK = {
  next_eyebrow: "Next step →",
  next_title: "03 — Deliver",
  next_body: "We build the new app, prove it works, and put it live — with you watching every step.",
  next_label: "Read Deliver →",
  next_url: "/process/deliver",
};

export default async function DefinePage() {
  const page = await getDefinePage();
  const hero = page ?? HERO_FALLBACK;
  const meta = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const decisions = page?.decisions?.length ? page.decisions : DECISIONS_FALLBACK;
  const contract = page?.contract?.length ? page.contract : CONTRACT_FALLBACK;
  const signoff = page?.signoff_text ?? SIGNOFF_FALLBACK;
  const nextEyebrow = page?.next_eyebrow ?? NEXT_FALLBACK.next_eyebrow;
  const nextTitle = page?.next_title ?? NEXT_FALLBACK.next_title;
  const nextBody = page?.next_body ?? NEXT_FALLBACK.next_body;
  const nextLabel = page?.next_label ?? NEXT_FALLBACK.next_label;
  const nextUrl = page?.next_url ?? NEXT_FALLBACK.next_url;

  return (
    <>
      <PageHero
        crumb={[{ label: "Process", href: "#" }, { label: "Define" }]}
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

      {/* ============ Four decisions ============ */}
      <section className="relative bg-bone text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 01 — Four decisions</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            The choices that shape <span className="text-gradient-ink">the next two years</span>.
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {decisions.map((p, i) => (
              <Reveal key={p.no ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-ink/10 bg-white/80 p-7 lift">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={(p.icon_kind as IconKind) ?? PILLAR_ICONS[i % PILLAR_ICONS.length]}
                        tone="light"
                        className="h-11 w-11"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">{p.no}</span>
                    </div>
                    <h3 className="mt-5 text-xl md:text-[22px] font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">{p.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Plan ledger ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 02 — The plan</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four columns. <span className="text-gradient">No surprises.</span>
          </Reveal>

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {contract.map((c, i) => (
              <Reveal
                key={c.title ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="grid grid-cols-1 md:grid-cols-[3rem_1fr_1.2fr] gap-4 md:gap-8 py-7 md:py-9 items-center"
              >
                <CardIcon
                  kind={(c.icon_kind as IconKind) ?? CONTRACT_ICONS[i % CONTRACT_ICONS.length]}
                  tone="dark"
                  className="h-10 w-10"
                />
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-chalk">{c.title}</h3>
                <p className="text-chalk/70 leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-14 rounded-3xl border border-glow/20 bg-glow/5 p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.18em] text-glow">Signed off by</p>
            <p className="mt-4 text-2xl md:text-3xl font-semibold leading-snug tracking-tight">
              {signoff}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Next phase pointer ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-24">
          <Reveal className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">{nextEyebrow}</p>
              <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{nextTitle}</h3>
              <p className="mt-2 max-w-md text-ink/70">{nextBody}</p>
            </div>
            <MagneticButton href={nextUrl} className="h-12 rounded-full bg-ink px-6 text-sm font-semibold text-chalk hover:bg-graphite transition-colors">
              {nextLabel}
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
