import Link from "next/link";

const COLS = [
  {
    title: "Product",
    items: [
      ["How it works", "/how-it-works"],
      ["Features", "/platform"],
      ["Languages", "/languages"],
      ["Business rules", "/business-rules"],
      ["Verification", "/verification"],
      ["Cost & transparency", "/pricing-transparency"],
    ],
  },
  {
    title: "Solutions",
    items: [
      ["For CIOs", "/solutions#cios"],
      ["For architects", "/solutions#architects"],
      ["For security teams", "/solutions#security-teams"],
      ["Mainframe", "/solutions#mainframe"],
      [".NET", "/solutions#microsoft"],
      ["Salesforce", "/solutions#salesforce"],
    ],
  },
  {
    title: "Trust",
    items: [
      ["Security", "/security"],
      ["AI governance", "/ai-governance"],
      ["Trust Center", "/trust-center"],
      ["Deployment", "/deployment"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Why we exist", "/why"],
      ["What we do", "/what"],
      ["Who we are", "/who"],
      ["Process", "/process/discover"],
      ["Work", "/work/projects"],
      ["Enterprises", "/enterprises"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-chalk text-ink">
      <div className="absolute inset-0 bg-grid-soft opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 sec-pad-sm md:!py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative inline-block h-7 w-7 rounded-full bg-ink">
                <span className="absolute inset-1 rounded-full bg-chalk" />
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" />
              </span>
              <p className="type-eyebrow text-ink/60">
                Moderniza
              </p>
            </div>
            <h3 className="mt-6 type-h2">
              Modernize legacy systems.
              <br />
              <span className="text-gradient-ink">Prove nothing was lost.</span>
            </h3>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-5 text-sm font-semibold text-chalk hover:bg-graphite transition-colors"
            >
              Book a demo
              <span className="text-base">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="type-eyebrow text-ink/55">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="type-body text-ink/80 hover:text-ember">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-6 type-small text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Moderniza. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/security" className="hover:text-ink">Security</Link>
            <Link href="/ai-governance" className="hover:text-ink">AI governance</Link>
            <Link href="/trust-center" className="hover:text-ink">Trust Center</Link>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
