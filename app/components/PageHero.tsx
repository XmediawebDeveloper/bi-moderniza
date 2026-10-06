import Reveal from "./Reveal";
import AmbientFx from "./AmbientFx";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  crumb: Crumb[];
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function PageHero({ crumb, eyebrow, title, lede, meta, rightSlot }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[340px] w-[680px] rounded-full bg-glow/15 blur-3xl drift" />
      <div className="pointer-events-none absolute bottom-0 -left-20 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />
      <AmbientFx tone="dark" density="med" corner="tr" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
        <div className={rightSlot ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center" : ""}>
          <div>
            <Reveal className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-mist">
              {crumb.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <a href={c.href} className="hover:text-glow transition-colors">{c.label}</a>
                  ) : (
                    <span className="text-chalk">{c.label}</span>
                  )}
                  {i < crumb.length - 1 && <span className="text-mist/50">/</span>}
                </span>
              ))}
            </Reveal>

            <Reveal delay={1} className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
              <span aria-hidden className="h-2 w-2 rounded-full bg-glow pulse-dot" />
              <span className="font-mono">{eyebrow}</span>
              <span className="h-px flex-1 bg-glow/30" />
            </Reveal>

            <Reveal delay={2} as="h1" className="mt-8 max-w-[18ch] text-5xl md:text-7xl lg:text-[112px] font-semibold leading-[0.95] tracking-[-0.035em]">
              {title}
            </Reveal>

            {lede && (
              <Reveal delay={3} className="mt-8 max-w-[60ch] text-lg md:text-xl text-chalk/80 leading-relaxed">
                {lede}
              </Reveal>
            )}

            {meta && (
              <Reveal delay={4} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-mist">
                {meta}
              </Reveal>
            )}
          </div>

          {rightSlot && (
            <Reveal delay={2} className="relative flex justify-center lg:justify-end">
              {rightSlot}
            </Reveal>
          )}
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
    </section>
  );
}
