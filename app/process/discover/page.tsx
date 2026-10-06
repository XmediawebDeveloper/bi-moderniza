import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactRobot from "../../components/ContactRobot";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import MagneticButton from "../../components/MagneticButton";
import AmbientFx from "../../components/AmbientFx";
import MiniRobot from "../../components/MiniRobot";
import CardIcon, { type IconKind } from "../../components/CardIcon";
import { getDiscoverPage } from "../../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const STEP_ICONS: IconKind[] = ["pulse", "analyse", "doc", "flag"];
const ARTEFACT_ICONS: IconKind[] = ["doc", "shield", "blueprint", "verify"];

export const metadata: Metadata = {
  title: "Discover — Moderniza",
  description: "The first short call where we listen, look at your app and agree on the shape of the project.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ Step 01 — Discover",
  hero_title: "Listen. Look. Agree.",
  hero_lede: "Most modernization projects go off the rails because nobody really looked at the old app before someone priced the work. The first 30 minutes with us fix that — you'll leave with a clear picture and an honest plan.",
  hero_meta: [
    { id: 0, text: "30 minutes" },
    { id: 0, text: "Live walkthrough" },
    { id: 0, text: "NDA on request" },
  ],
};

const MOVES_FALLBACK = [
  { no: "01", title: "We listen.", body: "A 30-minute call. No slides. We ask three things: what's painful today, what's blocking you, and what 'fixed' would look like for your business.", icon_kind: "pulse" },
  { no: "02", title: "We look at the app.", body: "We take a look at the software you'd like to rebuild. Anything goes — a website link, a folder, even one file. We do the heavy lifting from there.", icon_kind: "analyse" },
  { no: "03", title: "We share what we found.", body: "Live, on screen. We walk you through how the app is built, what's risky, what's safe, and what's likely to need extra care.", icon_kind: "doc" },
  { no: "04", title: "We agree what's next.", body: "By the end of the call you'll know the shape of the project, an honest timeline, and the cost. No follow-up needed unless you want one.", icon_kind: "flag" },
];

const TAKEAWAYS_FALLBACK = [
  { no: "01", title: "A clear summary", body: "A short, plain-English document explaining how your app works today — the bits, the connections, the risky corners.", icon_kind: "doc" },
  { no: "02", title: "A risk list", body: "Anything we spotted that's worth knowing — old security issues, parts that depend on outdated services, surprises hidden in the code.", icon_kind: "shield" },
  { no: "03", title: "A roadmap", body: "A simple timeline showing how long each part will take, in weeks. With dependencies, so you know what blocks what.", icon_kind: "blueprint" },
  { no: "04", title: "A record of decisions", body: "Every choice we discussed, written down. If anything changes later, you'll know exactly when and why.", icon_kind: "verify" },
];

const NEXT_FALLBACK = {
  next_eyebrow: "Next step →",
  next_title: "02 — Define",
  next_body: "Agree the new shape of the app — together — before any rebuilding starts.",
  next_label: "Read Define →",
  next_url: "/process/define",
};

export default async function DiscoverPage() {
  const page = await getDiscoverPage();
  const hero = page ?? HERO_FALLBACK;
  const meta = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const moves = page?.moves?.length ? page.moves : MOVES_FALLBACK;
  const takeaways = page?.takeaways?.length ? page.takeaways : TAKEAWAYS_FALLBACK;
  const nextEyebrow = page?.next_eyebrow ?? NEXT_FALLBACK.next_eyebrow;
  const nextTitle = page?.next_title ?? NEXT_FALLBACK.next_title;
  const nextBody = page?.next_body ?? NEXT_FALLBACK.next_body;
  const nextLabel = page?.next_label ?? NEXT_FALLBACK.next_label;
  const nextUrl = page?.next_url ?? NEXT_FALLBACK.next_url;

  return (
    <>
      <PageHero
        crumb={[{ label: "Process", href: "#" }, { label: "Discover" }]}
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

      {/* ============ Steps ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 01 — On the call</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four moves, in <span className="text-gradient-ink">thirty minutes</span>.
          </Reveal>

          <ol className="mt-14 relative">
            <span aria-hidden className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-ink/0 via-ink/30 to-ink/0" />
            {moves.map((s, i) => (
              <Reveal
                key={s.no ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="relative grid gap-6 md:grid-cols-2 md:gap-12 py-7"
              >
                <div className={`pl-12 md:pl-0 ${i % 2 === 1 ? "md:text-right md:pr-12 md:order-2" : "md:pr-12"}`}>
                  <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                    <CardIcon
                      kind={(s.icon_kind as IconKind) ?? STEP_ICONS[i % STEP_ICONS.length]}
                      tone="light"
                      className="h-10 w-10"
                    />
                    <span className="chip text-[11px] tracking-[0.18em] text-ink/55">{s.no}</span>
                  </div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{s.title}</h3>
                </div>
                <div className={`pl-12 md:pl-12 text-ink/75 leading-relaxed ${i % 2 === 1 ? "md:pl-0 md:pr-0" : ""}`}>
                  <span aria-hidden className="absolute left-2 md:left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full bg-chalk ring-2 ring-ember" />
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ What you walk away with ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="br" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 02 — What you take away</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Four things, <span className="text-gradient">yours to keep</span>.
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {takeaways.map((t, i) => (
              <Reveal key={t.title ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="dark"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-white/10 bg-graphite/40 p-7 md:p-9 lift">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={(t.icon_kind as IconKind) ?? ARTEFACT_ICONS[i % ARTEFACT_ICONS.length]}
                        tone="dark"
                        className="h-11 w-11"
                      />
                      <span className="chip text-[11px] tracking-[0.18em] text-mist">/ {t.no ?? String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-3 text-chalk/70 leading-relaxed">{t.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
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
