import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_OTHER_BOTS } from "../../components/ContactRobot";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import MagneticButton from "../../components/MagneticButton";
import AmbientFx from "../../components/AmbientFx";
import MiniRobot from "../../components/MiniRobot";
import CardIcon, { type IconKind } from "../../components/CardIcon";
import { getProjectsPage } from "../../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const PROJECT_ICONS: IconKind[] = ["umbrella", "bank", "heart", "rocket", "flag", "cart"];

export const metadata: Metadata = {
  title: "Projects — Moderniza",
  description: "Moderniza project stories, published only with the customer's written permission.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ Selected work",
  hero_title: "Project stories, with permission.",
  hero_lede: "Project stories appear here only with the customer's written permission.",
  hero_meta: [] as { id: number; text: string }[],
};

type Project = {
  no: string;
  sector: string;
  company: string;
  pitch: string;
  body: string;
  icon_kind?: string;
  metrics: { label: string; value: string }[];
};

// Customer stories appear only with the customer's written permission (v2.0 Do NOT claim).
const PROJECTS_FALLBACK: Project[] = [];

const CTA_FALLBACK = {
  headline: "More on request. Quietly.",
  body: "Ask, and we'll talk you through it.",
  primary_label: "Start a project",
  primary_url: "/contact/start",
  secondary_label: "See the numbers",
  secondary_url: "/work/outcomes",
};

export default async function ProjectsPage() {
  const page = await getProjectsPage();
  const hero = page ?? HERO_FALLBACK;
  const projects = page?.projects?.length ? page.projects : PROJECTS_FALLBACK;
  const cta      = page?.cta ?? CTA_FALLBACK;
  const meta     = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const moreTitle = page?.more_title ?? "More on request.";
  const moreBody  = page?.more_body  ?? CTA_FALLBACK.body;

  return (
    <>
      <PageHero
        crumb={[{ label: "Work", href: "#" }, { label: "Projects" }]}
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
        rightSlot={SHOW_PINK_HEART_OTHER_BOTS ? <ContactRobot variant="ship" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_OTHER_BOTS}
      />

      {/* ============ Project grid ============ */}
      {projects.length > 0 && (
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <ul className="grid gap-px md:grid-cols-2 bg-ink/10 border border-ink/10 rounded-3xl overflow-visible">
            {projects.map((p, i) => (
              <Reveal key={p.no ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative bg-white/80 hover:bg-white transition-colors">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-10 right-6 h-20 w-14 z-10"
                />
                <Tilt className="h-full" max={4} glare={0.08}>
                  <article className="h-full p-7 md:p-10">
                    <div className="flex items-center justify-between">
                      <CardIcon
                        kind={(p.icon_kind as IconKind) ?? PROJECT_ICONS[i % PROJECT_ICONS.length]}
                        tone="light"
                        className="h-12 w-12"
                      />
                      <div className="flex items-center gap-3">
                        <span className="chip text-[11px] tracking-[0.18em] text-ink/55">/ {p.no} — {p.sector}</span>
                        <span className={`text-[11px] uppercase tracking-[0.18em] ${i % 2 === 0 ? "text-ember" : "text-ink/40"}`}>
                          Live
                        </span>
                      </div>
                    </div>
                    <h3 className="mt-6 text-3xl md:text-[40px] font-semibold leading-[1.02] tracking-tight">{p.company}</h3>
                    <p className="mt-2 text-base md:text-lg text-ember font-medium">{p.pitch}</p>
                    <p className="mt-5 text-ink/75 leading-relaxed">{p.body}</p>
                    <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4 border-t border-ink/10 pt-6">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-ink/50">{m.label}</dt>
                          <dd className="mt-1 text-xl md:text-2xl font-semibold tracking-tight">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* ============ More on request ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="med" corner="bl" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Reveal as="h2" className="text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            {moreTitle} <span className="text-gradient">Quietly.</span>
          </Reveal>
          <Reveal delay={1} className="space-y-5">
            <p className="text-lg text-chalk/80">
              {moreBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href={cta.primary_url} className="h-12 rounded-full bg-glow px-6 text-sm font-semibold text-ink hover:bg-chalk transition-colors">
                {cta.primary_label}
              </MagneticButton>
              {cta.secondary_label && cta.secondary_url && (
                <MagneticButton href={cta.secondary_url} className="h-12 rounded-full border border-white/15 px-6 text-sm hover:border-chalk/60">
                  {cta.secondary_label}
                </MagneticButton>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
