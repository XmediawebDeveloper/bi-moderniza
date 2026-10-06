import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import Counter from "../components/Counter";
import MagneticButton from "../components/MagneticButton";
import AmbientFx from "../components/AmbientFx";
import MiniRobot from "../components/MiniRobot";
import CardIcon, { type IconKind } from "../components/CardIcon";
import { getEnterprisesPage } from "../lib/strapi";

export const revalidate = 60;

const REACTIONS: Array<"wave" | "point" | "cheer" | "wink" | "shrug" | "heart"> = [
  "wave", "point", "cheer", "shrug", "wink", "heart",
];

const INDUSTRY_ICONS: IconKind[] = ["bank", "umbrella", "heart", "flag", "cart", "bolt"];
const BENEFIT_ICONS: IconKind[] = ["doc", "person", "gear", "group"];
const SECURITY_ICONS: IconKind[] = ["shield", "shield", "person", "verify", "bolt", "cloud"];
const COMPLIANCE_ICONS: IconKind[] = ["shield", "verify", "shield", "heart", "bank", "person"];
const ENGAGE_ICONS: IconKind[] = ["pulse", "doc", "blueprint", "gear", "rocket", "cycle"];
const COMMIT_ICONS: IconKind[] = ["clock", "cloud", "rocket", "verify"];

export const metadata: Metadata = {
  title: "For Enterprises — Moderniza",
  description: "Built for serious organisations. Modernise your most important software with a partner you can hand to legal, security, and procurement without flinching.",
};

const HERO_FALLBACK = {
  hero_eyebrow: "/ For Enterprises",
  hero_title: "Built for organisations that can't afford a bad week.",
  hero_lede: "When the app at risk is the one your customers, regulators, and board actually depend on, you need a partner you can hand to legal, security, and procurement without a single follow-up email. That's how we're built.",
  hero_meta: [
    { id: 0, text: "Used by listed and regulated firms" },
    { id: 0, text: "SOC 2 · ISO 27001" },
    { id: 0, text: "NDAs welcome" },
  ],
};

const TRUSTED_BY_FALLBACK = [
  { id: 0, text: "Top-10 European Bank" },
  { id: 0, text: "Global Health Insurer" },
  { id: 0, text: "Fortune 500 Retailer" },
  { id: 0, text: "National Public Body" },
  { id: 0, text: "Listed Logistics Group" },
  { id: 0, text: "Tier-1 Wealth Manager" },
];

const INDUSTRIES_FALLBACK = [
  { no: "01", title: "Banking &amp; finance", body: "Core platforms, settlement systems, customer portals — modernised in pieces, never in one terrifying release.", icon_kind: "bank", tag: "Regulated" },
  { no: "02", title: "Insurance", body: "Policy admin, claims, underwriting tools. We rebuild without losing a single calculation rule.", icon_kind: "umbrella", tag: "Audited" },
  { no: "03", title: "Healthcare", body: "Patient portals, clinic systems, internal admin tools. Privacy and audit trails baked in from day one.", icon_kind: "heart", tag: "HIPAA-ready" },
  { no: "04", title: "Public sector", body: "Government and council services that need to be steady, accessible and easy to support for years.", icon_kind: "flag", tag: "Accessibility" },
  { no: "05", title: "Retail &amp; logistics", body: "Tills, warehouses, freight tools. We modernise without dropping a single transaction or shipment.", icon_kind: "cart", tag: "Zero downtime" },
  { no: "06", title: "Energy &amp; utilities", body: "Field-service tools, customer billing, dispatch systems. Built for people who can't afford a bad Monday.", icon_kind: "bolt", tag: "Mission-critical" },
];

const BENEFITS_FALLBACK = [
  { no: "01", title: "Predictable, in writing.", body: "Fixed scope, fixed price, fixed dates. Anything that changes goes through change control — like the rest of your suppliers.", icon_kind: "doc" },
  { no: "02", title: "One throat to choke.", body: "A single named partner from your side, a single named lead from ours. No daisy-chained vendors, no finger-pointing.", icon_kind: "person" },
  { no: "03", title: "Your existing tools, intact.", body: "Identity, ticketing, single-sign-on, monitoring — we plug into what you already have. No second IT estate.", icon_kind: "gear" },
  { no: "04", title: "Plays well with primes.", body: "We can sub-contract under your existing system integrators, or work directly. Whichever your procurement prefers.", icon_kind: "group" },
];

const SECURITY_FALLBACK = [
  { title: "Your code stays yours", body: "We don't keep your code, train on it, or share it. When the project ends, our copies are deleted with proof.", icon_kind: "shield" },
  { title: "Encryption end-to-end", body: "In transit, at rest, in our backups. Industry-standard, audited, and renewed every quarter.", icon_kind: "shield" },
  { title: "Access on a need basis", body: "Only the people working on your project can see your code. Each access is logged with who, when, and why.", icon_kind: "person" },
  { title: "Annual penetration tests", body: "An independent firm tests our service every year. The report is available to your security team on request.", icon_kind: "verify" },
  { title: "Incident response in 4 hours", body: "If anything looks wrong, you hear from a named person within four hours. In writing, with what we know and what we're doing.", icon_kind: "bolt" },
  { title: "Data stays in your region", body: "Hosted in your chosen region — Europe, the United States, the UK, or Australia. Your data doesn't leave it without your sign-off.", icon_kind: "cloud" },
];

const COMPLIANCE_FALLBACK = [
  { id: 0, text: "SOC 2 Type II — Annual" },
  { id: 0, text: "ISO 27001 — Certified" },
  { id: 0, text: "GDPR — By default" },
  { id: 0, text: "HIPAA — On request" },
  { id: 0, text: "DORA-ready — Financial sector" },
  { id: 0, text: "WCAG 2.2 — Public sector" },
];

const ENGAGEMENT_FALLBACK = [
  { no: "01", title: "Initial conversation", body: "A 30-minute call with no obligation. We understand what you need; you understand whether we're a fit.", icon_kind: "pulse" },
  { no: "02", title: "NDA & access", body: "We sign your agreement, or send ours — whichever is easier for your legal team. Then read-only access to a sample.", icon_kind: "doc" },
  { no: "03", title: "Scoped proposal", body: "A short, plain-English document with scope, price, dates, and people. Designed to drop straight into your procurement.", icon_kind: "blueprint" },
  { no: "04", title: "Standard paperwork", body: "We work with master service agreements, statements of work, supplier-onboarding forms, and security questionnaires — same as your other partners.", icon_kind: "gear" },
  { no: "05", title: "Pilot project", body: "If preferred, we start with a small, fixed-price pilot before any larger commitment. Minimum risk, maximum signal.", icon_kind: "rocket" },
  { no: "06", title: "Steady delivery", body: "Weekly steering note, monthly steering call, quarterly business review. The level of formality your governance expects.", icon_kind: "cycle" },
];

const COMMITMENTS_FALLBACK = [
  { value: "4 hr", label: "Maximum response time during business hours" },
  { value: "99.9%", label: "Uptime guarantee on hosted services" },
  { value: "30 days", label: "From contract signature to first delivered milestone" },
  { value: "0", label: "Cancelled enterprise projects, ever" },
];

const TESTIMONIAL_FALLBACK = {
  quote: "We brought Moderniza in because three big names had failed before them. They were live with a working preview before our security review even finished. That's not normal.",
  attribution_role: "Group CTO",
  attribution_sector: "Top-10 European Bank",
};

const CTA_FALLBACK = {
  headline: "Ready when your procurement is.",
  body: "Send us your supplier-onboarding pack, your security questionnaire, or a short project brief. We'll come back the same day with everything pre-filled.",
  primary_label: "Start a project →",
  primary_url: "/contact/start",
  secondary_label: "Start a project",
  secondary_url: "/contact/start",
  status_text: "Active capacity · Q3 / Q4 2026",
};

const TRUSTED_LABEL_FALLBACK = "/ Trusted by";

export default async function EnterprisesPage() {
  const page = await getEnterprisesPage();
  const hero = page ?? HERO_FALLBACK;
  const meta = page?.hero_meta?.length ? page.hero_meta : HERO_FALLBACK.hero_meta;
  const trustedLabel = page?.trusted_label ?? TRUSTED_LABEL_FALLBACK;
  const trustedBy = page?.trusted_by?.length ? page.trusted_by : TRUSTED_BY_FALLBACK;
  const industries = page?.industries?.length ? page.industries : INDUSTRIES_FALLBACK;
  const benefits = page?.benefits?.length ? page.benefits : BENEFITS_FALLBACK;
  const security = page?.security?.length ? page.security : SECURITY_FALLBACK;
  const compliance = page?.compliance?.length ? page.compliance : COMPLIANCE_FALLBACK;
  const engagement = page?.engagement?.length ? page.engagement : ENGAGEMENT_FALLBACK;
  const commitments = page?.commitments?.length ? page.commitments : COMMITMENTS_FALLBACK;
  const testimonial = page?.testimonial ?? TESTIMONIAL_FALLBACK;
  const cta = page?.cta ?? CTA_FALLBACK;

  return (
    <>
      <PageHero
        crumb={[{ label: "Enterprises" }]}
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
        rightSlot={<ContactRobot variant="shield" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* ============ TRUSTED BY ============ */}
      <section className="relative bg-chalk text-ink border-b border-ink/10">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-14 md:py-16">
          <Reveal className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
            <span className="font-mono">{trustedLabel}</span>
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4 gap-x-8">
            {trustedBy.map((t, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="text-sm md:text-base text-ink/70 font-medium tracking-tight">
                {t.text}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={1} className="mt-6 text-xs text-ink/45">
            Names anonymised on request. Reference calls available under NDA.
          </Reveal>
        </div>
      </section>

      {/* ============ 02 — INDUSTRIES ============ */}
      <section id="industries" className="relative bg-ink scroll-mt-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-[260px] w-[460px] rounded-full bg-glow/15 blur-3xl drift" />
        <AmbientFx tone="dark" density="med" corner="bl" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 01 — Industries</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Six industries. <span className="text-gradient">One steady hand.</span>
          </Reveal>
          <Reveal delay={2} className="mt-6 max-w-2xl text-lg text-chalk/80">
            Wherever the stakes are high — money, health, citizens, supply chains — we've done this. The shapes change; the discipline doesn't.
          </Reveal>

          <ul className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-white/10 border border-white/10 rounded-3xl overflow-visible">
            {industries.map((it, i) => (
              <Reveal
                key={it.no ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="group bg-ink relative"
              >
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="dark"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="h-full" max={4} glare={0.08}>
                  <div className="h-full p-7 md:p-8 lift">
                    <div className="flex items-center justify-between">
                      <CardIcon kind={(it.icon_kind as IconKind) ?? INDUSTRY_ICONS[i % INDUSTRY_ICONS.length]} tone="dark" className="h-11 w-11" />
                      <div className="flex items-center gap-2">
                        <span className="chip text-[11px] tracking-[0.18em] text-mist">{it.no}</span>
                        {it.tag && (
                          <span className="rounded-full border border-glow/30 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-glow/80">
                            {it.tag}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="mt-6 text-2xl md:text-[26px] font-semibold leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: it.title }} />
                    <p className="mt-3 text-sm text-chalk/70 leading-relaxed">{it.body}</p>
                    <div className="mt-7 h-px w-10 bg-glow/0 group-hover:bg-glow group-hover:w-20 transition-all duration-500" />
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 03 — ENTERPRISE BENEFITS ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 02 — What you actually get</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            The boring things that <span className="text-gradient-ink">make the difference</span>.
          </Reveal>

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.no ?? i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative">
                <MiniRobot
                  variant={REACTIONS[i % REACTIONS.length]}
                  tone="light"
                  className="absolute -top-16 right-5 h-20 w-14 z-10"
                />
                <Tilt className="rounded-3xl">
                  <div className="rounded-3xl border border-ink/10 bg-white/80 p-7 lift h-full">
                    <div className="flex items-center justify-between">
                      <CardIcon kind={(b.icon_kind as IconKind) ?? BENEFIT_ICONS[i % BENEFIT_ICONS.length]} tone="light" className="h-11 w-11" />
                      <span className="chip text-[11px] tracking-[0.18em] text-ink/55">{b.no}</span>
                    </div>
                    <h3 className="mt-5 text-xl md:text-[22px] font-semibold leading-tight tracking-tight">{b.title}</h3>
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">{b.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 04 — SECURITY ============ */}
      <section id="security" className="relative bg-ink scroll-mt-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-[300px] w-[600px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="high" corner="tr" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 03 — Security</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Six promises <span className="text-gradient">we keep in writing</span>.
          </Reveal>

          <div className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {security.map((s, i) => (
              <Reveal key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="bg-ink p-7 md:p-8 lift">
                <div className="flex items-center justify-between">
                  <CardIcon kind={(s.icon_kind as IconKind) ?? SECURITY_ICONS[i % SECURITY_ICONS.length]} tone="dark" className="h-11 w-11" />
                  <div className="flex items-center gap-2 text-glow">
                    <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-glow/40 text-glow text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-glow/80">Promise</span>
                  </div>
                </div>
                <h3 className="mt-5 text-xl md:text-[22px] font-semibold leading-tight tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-chalk/70 leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 05 — COMPLIANCE BADGES ============ */}
      <section className="relative bg-bone text-ink border-y border-ink/10">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-24">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/70">
            <span className="font-mono">/ 04 — Standards we meet</span>
            <span className="h-px flex-1 bg-ink/20" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-3xl md:text-5xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Audited. Certified. <span className="text-gradient-ink">Renewed every year.</span>
          </Reveal>

          <ul className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {compliance.map((c, i) => {
              const parts = c.text.split(/\s*[—-]\s*/);
              const k = parts[0] ?? c.text;
              const v = parts.slice(1).join(" — ");
              return (
                <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="rounded-2xl border border-ink/10 bg-white/80 p-5 text-center">
                  <CardIcon kind={COMPLIANCE_ICONS[i % COMPLIANCE_ICONS.length]} tone="light" className="h-10 w-10 mx-auto mb-3" />
                  <p className="text-base md:text-lg font-semibold tracking-tight">{k}</p>
                  {v && <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/55">{v}</p>}
                </Reveal>
              );
            })}
          </ul>
          <Reveal delay={2} className="mt-10 text-sm text-ink/55">
            Latest audit reports and security questionnaires available to your security team on request.
          </Reveal>
        </div>
      </section>

      {/* ============ 06 — HOW TO ENGAGE ============ */}
      <section id="engage" className="relative bg-ink scroll-mt-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <AmbientFx tone="dark" density="med" corner="br" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
          <Reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
            <span className="font-mono">/ 05 — How to engage</span>
            <span className="h-px flex-1 bg-glow/30" />
          </Reveal>
          <Reveal delay={1} as="h2" className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
            Six steps from <span className="text-gradient">handshake to delivery</span>.
          </Reveal>
          <Reveal delay={2} className="mt-6 max-w-2xl text-lg text-chalk/80">
            Procurement-friendly. Designed to fit inside your existing supplier-onboarding process — not work around it.
          </Reveal>

          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {engagement.map((s, i) => (
              <Reveal
                key={s.no ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                as="li"
                className="rounded-3xl border border-white/10 bg-graphite/40 p-6 lift relative"
              >
                <div className="flex items-center justify-between">
                  <CardIcon kind={(s.icon_kind as IconKind) ?? ENGAGE_ICONS[i % ENGAGE_ICONS.length]} tone="dark" className="h-11 w-11" />
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-glow/15 px-2.5 py-0.5 text-[11px] tracking-[0.18em] text-glow">{s.no}</span>
                    <span className="text-mist text-[11px] uppercase tracking-[0.18em]">Step {s.no}</span>
                  </div>
                </div>
                <h3 className="mt-5 text-xl md:text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 07 — COMMITMENTS NUMBERS ============ */}
      <section className="relative bg-ink border-y border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 grid gap-10 md:grid-cols-4 text-center md:text-left">
          {commitments.map((m, i) => {
            const parsed = parseStat(m.value);
            return (
              <Reveal key={m.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <CardIcon kind={COMMIT_ICONS[i % COMMIT_ICONS.length]} tone="dark" className="h-11 w-11 mb-4 mx-auto md:mx-0" />
                <p className="text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
                  {parsed ? <Counter to={parsed.num} suffix={parsed.suf} /> : m.value}
                </p>
                <p className="mt-3 text-sm text-mist max-w-xs mx-auto md:mx-0">{m.label}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ 08 — TESTIMONIAL ============ */}
      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="pointer-events-none absolute -top-20 left-1/3 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <div className="relative mx-auto max-w-[1100px] px-5 md:px-8 py-24 md:py-32 text-center">
          <Reveal className="text-ember text-6xl leading-none">&ldquo;</Reveal>
          <Reveal delay={1} as="p" className="mt-4 text-3xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.02em]">
            {testimonial.quote}
          </Reveal>
          <Reveal delay={2} className="mt-8 inline-flex flex-col items-center gap-1">
            <span className="h-px w-10 bg-ink/30" />
            <span className="text-sm font-medium tracking-tight">{testimonial.attribution_role}</span>
            {testimonial.attribution_sector && (
              <span className="text-xs uppercase tracking-[0.22em] text-ink/55">{testimonial.attribution_sector}</span>
            )}
          </Reveal>
        </div>
      </section>

      {/* ============ 09 — CTA ============ */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-glow/20 blur-3xl drift" />
        <div className="pointer-events-none absolute -top-24 left-1/3 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
        <AmbientFx tone="dark" density="high" corner="tr" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-36 grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-end">
          <Reveal as="h2" className="text-5xl md:text-7xl lg:text-[96px] font-semibold leading-[0.95] tracking-[-0.03em]">
            {cta.headline}
          </Reveal>
          <Reveal delay={1} className="space-y-6">
            {cta.body && (
              <p className="text-lg text-chalk/80">
                {cta.body}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href={cta.primary_url}
                className="h-12 rounded-full bg-glow px-6 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse"
              >
                {cta.primary_label}
              </MagneticButton>
              {cta.secondary_label && cta.secondary_url && (
                <MagneticButton
                  href={cta.secondary_url}
                  className="h-12 rounded-full border border-white/15 px-6 text-sm hover:border-chalk/60"
                >
                  {cta.secondary_label}
                </MagneticButton>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-mist">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-glow pulse-dot" />
                {cta.status_text ?? "Active capacity · Q3 / Q4 2026"}
              </span>
              <span>·</span>
              <span>Reply within 1 business day</span>
              <span>·</span>
              <span>NDA on request</span>
            </div>
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
