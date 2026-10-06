import Link from "next/link";

const COLS = [
  {
    title: "About",
    items: [
      ["Why we exist", "/why"],
      ["What we do", "/what"],
      ["Who we are", "/who"],
    ],
  },
  {
    title: "Process",
    items: [
      ["Discover", "/process/discover"],
      ["Define", "/process/define"],
      ["Deliver", "/process/deliver"],
    ],
  },
  {
    title: "Work",
    items: [
      ["Projects", "/work/projects"],
      ["Outcomes", "/work/outcomes"],
    ],
  },
  {
    title: "Enterprises",
    items: [
      ["Overview", "/enterprises"],
      ["Trust Center", "/trust-center"],
      ["Start a project", "/contact/start"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-chalk text-ink">
      <div className="absolute inset-0 bg-grid-soft opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative inline-block h-7 w-7 rounded-full bg-ink">
                <span className="absolute inset-1 rounded-full bg-chalk" />
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                Moderniza Studio
              </p>
            </div>
            <h3 className="mt-6 text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
              From a clear why,
              <br />
              to a delivered <span className="text-gradient-ink">need</span>.
            </h3>
            <Link
              href="/contact/start"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-5 text-sm font-semibold text-chalk hover:bg-graphite transition-colors"
            >
              Start a project
              <span className="text-base">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-ink/80 hover:text-ember">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Moderniza. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <Link href="/legal/cookies" className="hover:text-ink">Cookies</Link>
            <Link href="/security" className="hover:text-ink">Security</Link>
            <span className="hidden md:inline">·</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ember pulse-dot" />
              Open · accepting Q3 / Q4 2026 projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
