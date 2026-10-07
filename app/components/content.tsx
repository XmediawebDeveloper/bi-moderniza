import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import AmbientFx from "./AmbientFx";
import MagneticButton from "./MagneticButton";
import CardIcon, { type IconKind } from "./CardIcon";

/* ============================================================================
   Content primitives
   ----------------------------------------------------------------------------
   Small, server-safe building blocks used by every content page so that the
   copy in app/*\/page.tsx stays close to the source document
   (Moderniza_Website_Content_v1.0.docx) and the layout stays consistent.
   ========================================================================== */

export type Tone = "dark" | "light";

type Delay = 0 | 1 | 2 | 3 | 4;
const d = (i: number): Delay => (((i % 4) + 1) as Delay);

/* ---------------------------------------------------------------- Section */

export function Section({
  tone = "dark",
  id,
  eyebrow,
  title,
  lede,
  children,
  bone = false,
}: {
  tone?: Tone;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  /** light tone only — use the warmer "bone" background */
  bone?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={[
        "relative overflow-hidden scroll-mt-20",
        dark ? "bg-ink text-chalk" : bone ? "bg-bone text-ink" : "bg-chalk text-ink",
      ].join(" ")}
    >
      <div className={`pointer-events-none absolute inset-0 ${dark ? "bg-grid opacity-30" : "bg-grid-soft opacity-60"}`} />
      {dark && <AmbientFx tone="dark" density="low" corner="br" />}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 sec-pad">
        {eyebrow && (
          <Reveal className={`flex items-center gap-3 type-eyebrow ${dark ? "text-glow" : "text-ink/70"}`}>
            <span>{eyebrow}</span>
            <span className={`h-px flex-1 ${dark ? "bg-glow/30" : "bg-ink/20"}`} />
          </Reveal>
        )}
        {title && (
          <Reveal delay={1} as="h2" className="mt-8 max-w-4xl type-h2">
            {title}
          </Reveal>
        )}
        {lede && (
          <Reveal delay={2} className={`mt-6 max-w-[68ch] type-lede ${dark ? "text-chalk/80" : "text-ink/75"}`}>
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Prose */

export function Prose({ tone = "dark", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <Reveal
      delay={2}
      className={[
        "mt-6 max-w-[68ch] space-y-4 type-lede",
        tone === "dark" ? "text-chalk/80" : "text-ink/75",
        className,
      ].join(" ")}
    >
      {children}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Cards */

export type Card = { title: ReactNode; body: ReactNode; icon?: IconKind; tag?: string };

export function Cards({
  items,
  tone = "dark",
  cols = 3,
  className = "",
}: {
  items: Card[];
  tone?: Tone;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const dark = tone === "dark";
  const grid = cols === 4 ? "lg:grid-cols-4 md:grid-cols-2" : cols === 2 ? "md:grid-cols-2" : "lg:grid-cols-3 md:grid-cols-2";
  return (
    <ul className={`mt-12 grid gap-5 ${grid} ${className}`}>
      {items.map((c, i) => (
        <Reveal
          key={i}
          delay={d(i)}
          as="li"
          className={[
            "group rounded-3xl border p-6 md:p-7 lift",
            dark ? "border-white/10 bg-graphite/40" : "border-ink/10 bg-white/75",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            {c.icon ? (
              <CardIcon kind={c.icon} tone={tone} className="h-11 w-11" />
            ) : (
              <span className={`chip type-eyebrow ${dark ? "text-mist" : "text-ink/55"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            {c.tag && (
              <span className={`rounded-full px-2.5 py-0.5 type-eyebrow !text-[10px] ${dark ? "bg-glow/15 text-glow" : "bg-ember/10 text-ember"}`}>
                {c.tag}
              </span>
            )}
          </div>
          <h3 className="mt-5 type-h3">{c.title}</h3>
          <div className={`mt-3 type-body ${dark ? "text-mist" : "text-ink/70"}`}>{c.body}</div>
          <div className={`mt-6 h-px w-10 transition-all duration-500 group-hover:w-20 ${dark ? "bg-glow/0 group-hover:bg-glow" : "bg-ember/0 group-hover:bg-ember"}`} />
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- Bullets */

export type Bullet = { title?: ReactNode; body: ReactNode };

export function Bullets({
  items,
  tone = "dark",
  numbered = false,
  cols = 1,
  className = "",
}: {
  items: Bullet[];
  tone?: Tone;
  numbered?: boolean;
  cols?: 1 | 2;
  className?: string;
}) {
  const dark = tone === "dark";
  const Tag = numbered ? "ol" : "ul";
  return (
    <Reveal
      as={Tag}
      delay={2}
      className={[
        "mt-10 grid gap-x-10 gap-y-4",
        cols === 2 ? "md:grid-cols-2" : "max-w-[72ch]",
        className,
      ].join(" ")}
    >
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-4">
          {numbered ? (
            <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border type-eyebrow !tracking-normal ${dark ? "border-glow/40 text-glow" : "border-ember/40 text-ember"}`}>
              {i + 1}
            </span>
          ) : (
            <span className={`mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full ${dark ? "bg-glow" : "bg-ember"}`} />
          )}
          <span className={`type-body md:text-base ${dark ? "text-chalk/80" : "text-ink/75"}`}>
            {b.title && <span className={`font-semibold ${dark ? "text-chalk" : "text-ink"}`}>{b.title} </span>}
            {b.body}
          </span>
        </li>
      ))}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Table */

export function Table({
  head,
  rows,
  tone = "dark",
  className = "",
}: {
  head: string[];
  rows: ReactNode[][];
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal delay={2} className={`mt-10 overflow-x-auto rounded-3xl border ${dark ? "border-white/10 bg-graphite/30" : "border-ink/10 bg-white/70"} ${className}`}>
      <table className="w-full min-w-[560px] text-left type-body">
        <thead>
          <tr className={`type-eyebrow ${dark ? "text-glow" : "text-ink/60"}`}>
            {head.map((h) => (
              <th key={h} className={`px-5 py-4 font-medium border-b ${dark ? "border-white/10" : "border-ink/10"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`align-top ${dark ? "border-white/5" : "border-ink/5"} ${i < rows.length - 1 ? "border-b" : ""}`}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={[
                    "px-5 py-4 leading-relaxed",
                    j === 0
                      ? `font-semibold whitespace-nowrap ${dark ? "text-chalk" : "text-ink"}`
                      : dark ? "text-chalk/75" : "text-ink/75",
                  ].join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Callout */

export function Callout({ children, tone = "dark", label = "Why it matters" }: { children: ReactNode; tone?: Tone; label?: string }) {
  const dark = tone === "dark";
  return (
    <Reveal delay={2} className={`mt-12 rounded-3xl border p-7 md:p-10 ${dark ? "border-glow/25 bg-glow/[0.05]" : "border-ember/25 bg-ember/[0.05]"}`}>
      <p className={`type-eyebrow ${dark ? "text-glow" : "text-ember"}`}>{label}</p>
      <blockquote className={`mt-4 max-w-[60ch] type-h3 !font-medium ${dark ? "text-chalk" : "text-ink"}`}>
        {children}
      </blockquote>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Steps */

export type Step = { no: string; title: ReactNode; body: ReactNode; icon?: IconKind };

export function Steps({ items, tone = "dark" }: { items: Step[]; tone?: Tone }) {
  const dark = tone === "dark";
  return (
    <ol className="mt-12 relative">
      <span aria-hidden className={`absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b ${dark ? "from-glow/0 via-glow/40 to-glow/0" : "from-ink/0 via-ink/30 to-ink/0"}`} />
      {items.map((s, i) => (
        <Reveal key={s.no} delay={d(i)} as="li" className="relative grid gap-4 md:grid-cols-2 md:gap-12 py-6">
          <div className={`pl-12 md:pl-0 ${i % 2 === 1 ? "md:text-right md:pr-12 md:order-2" : "md:pr-12"}`}>
            <div className={`flex items-center gap-3 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
              {s.icon && <CardIcon kind={s.icon} tone={tone} className="h-10 w-10" />}
              <span className={`chip type-eyebrow ${dark ? "text-mist" : "text-ink/55"}`}>{s.no}</span>
            </div>
            <h3 className="mt-3 type-h3 md:!text-[28px]">{s.title}</h3>
          </div>
          <div className={`pl-12 md:pl-12 type-body md:text-base ${dark ? "text-chalk/80" : "text-ink/75"} ${i % 2 === 1 ? "md:pl-0 md:pr-0" : ""}`}>
            <span aria-hidden className={`absolute left-2 md:left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full ring-2 ${dark ? "bg-ink ring-glow" : "bg-chalk ring-ember"}`} />
            <div>{s.body}</div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Sub-heading inside a section */

export function SubHead({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <Reveal delay={1} as="h3" className={`mt-14 type-h3 md:!text-[28px] ${tone === "dark" ? "text-chalk" : "text-ink"} ${className}`}>
      {children}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- Owner note */

/** A small, visible placeholder for a fact only the company can supply. */
export function OwnerNote({ children, tone = "dark" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p className={`mt-6 max-w-[68ch] type-small ${tone === "dark" ? "text-mist" : "text-ink/55"}`}>{children}</p>
  );
}

/* ---------------------------------------------------------------- CTA band */

export function CtaBand({
  eyebrow = "Next step",
  title = "See your own code modernized.",
  body = "Bring a repository. We will scan it and show you the blueprint, the plan and the cost estimate — before anything is built.",
  primary = { label: "Book a demo", href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-chalk">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-glow/20 blur-3xl drift" />
      <AmbientFx tone="dark" density="high" corner="tr" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 sec-pad">
        <Reveal className="flex items-center gap-3 type-eyebrow text-glow">
          <span>/ {eyebrow}</span>
          <span className="h-px flex-1 bg-glow/30" />
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Reveal delay={1}>
            <h2 className="type-h1">{title}</h2>
          </Reveal>
          <Reveal delay={2} className="space-y-6">
            <p className="type-lede text-chalk/80">{body}</p>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href={primary.href} className="h-12 rounded-full bg-glow px-6 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse">
                {primary.label}
              </MagneticButton>
              {secondary && (
                <MagneticButton href={secondary.href} className="h-12 rounded-full border border-white/15 px-6 text-sm hover:border-chalk/60">
                  {secondary.label}
                </MagneticButton>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Inline link */

export function Arrow({ href, children, tone = "dark" }: { href: string; children: ReactNode; tone?: Tone }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 type-body font-semibold ${tone === "dark" ? "text-glow" : "text-ember"}`}>
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
    </Link>
  );
}
