"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

type MenuKey = "about" | "process" | "work" | "enterprises" | "contact";

type MenuItem = {
  title: string;
  href: string;
  blurb: string;
  icon: string;
};

type Featured = { eyebrow: string; title: string; body: string; cta: string; href: string };

const MENU: Record<
  MenuKey,
  { label: string; tagline: string; items: MenuItem[]; featured: Featured }
> = {
  about: {
    label: "About",
    tagline: "The story behind Moderniza.",
    items: [
      { title: "Why we exist", href: "/why", blurb: "The problem we set out to solve.", icon: "✶" },
      { title: "What we do", href: "/what", blurb: "Our craft, in plain language.", icon: "◇" },
      { title: "Who we are", href: "/who", blurb: "The team and the principles.", icon: "◎" },
    ],
    featured: { eyebrow: "Manifesto", title: "Tech debt is a balance-sheet problem.", body: "Read why we started this — and what we plan to leave behind.", cta: "Read the manifesto", href: "/why" },
  },
  process: {
    label: "Process",
    tagline: "How a project moves from idea to launch.",
    items: [
      { title: "Discover", href: "/process/discover", blurb: "Listen, audit, align.", icon: "❶" },
      { title: "Define", href: "/process/define", blurb: "Strategy, scope, story.", icon: "❷" },
      { title: "Deliver", href: "/process/deliver", blurb: "Build, ship, refine.", icon: "❸" },
    ],
    featured: { eyebrow: "Quick start", title: "Start with a brief.", body: "Send the app, the pain point, or the question. We'll reply with the cleanest next step.", cta: "Start a project", href: "/contact/start" },
  },
  work: {
    label: "Work",
    tagline: "What we’ve made and what it changed.",
    items: [
      { title: "Projects", href: "/work/projects", blurb: "Selected case studies.", icon: "▤" },
      { title: "Outcomes", href: "/work/outcomes", blurb: "The numbers behind the work.", icon: "▥" },
    ],
    featured: { eyebrow: "Latest", title: "Six legacy stacks. Six live URLs.", body: "From insurance monoliths to retail tills — six modernization stories in plain numbers.", cta: "See projects", href: "/work/projects" },
  },
  enterprises: {
    label: "Enterprises",
    tagline: "Built for serious organisations.",
    items: [
      { title: "Overview", href: "/enterprises", blurb: "Why large teams choose Moderniza.", icon: "◈" },
      { title: "Industries we serve", href: "/enterprises#industries", blurb: "Banking, insurance, healthcare, public sector.", icon: "◫" },
      { title: "Security & compliance", href: "/enterprises#security", blurb: "How we handle your code and data.", icon: "▣" },
      { title: "Trust Center", href: "/trust-center", blurb: "FedRAMP evidence, policies, certification status.", icon: "▦" },
      { title: "How to engage", href: "/enterprises#engage", blurb: "Procurement, NDAs, paperwork.", icon: "✱" },
    ],
    featured: { eyebrow: "FedRAMP 20x", title: "Live security evidence, published.", body: "Certification status, policies and Key Security Indicators — updated every six hours.", cta: "Open Trust Center", href: "/trust-center" },
  },
  contact: {
    label: "Contact",
    tagline: "Start the conversation.",
    items: [
      { title: "Start a project", href: "/contact/start", blurb: "Send us a brief.", icon: "➜" },
    ],
    featured: { eyebrow: "Available", title: "Q3 / Q4 2026 capacity.", body: "Reply within one business day. NDA on request, references happily provided.", cta: "Start a project", href: "/contact/start" },
  },
};

const KEYS: MenuKey[] = ["about", "process", "work", "enterprises", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<MenuKey | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full backdrop-blur-xl transition-colors duration-300",
        scrolled
          ? "bg-ink/90 border-b border-white/5"
          : "bg-ink/70",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Moderniza home">
          <LogoMark size={32} />
          <span className="text-[15px] font-semibold tracking-tight ai-flicker">
            Moderniza<span className="text-glow">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {KEYS.map((k, kIdx) => (
            <div key={k} className="menu-trigger relative">
              <button
                className="flex items-center gap-2 rounded-md px-4 py-2 text-chalk/85 hover:text-chalk transition-colors"
                aria-haspopup="true"
              >
                <span className="term-trig-dot h-1.5 w-1.5 rounded-full bg-glow" />
                <span className="uppercase tracking-[0.06em]">{MENU[k].label}</span>
              </button>

              <div className="mega absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-md border border-glow/25 bg-[#0b0b0d] shadow-[0_30px_70px_-12px_rgba(0,0,0,0.7),inset_0_0_60px_rgba(214,255,58,0.04)] overflow-hidden font-mono">
                {/* CRT scanline overlay */}
                <div aria-hidden className="term-scanlines pointer-events-none absolute inset-0" />
                {/* vertical scan line that crosses on open */}
                <span aria-hidden className="term-scan-vert pointer-events-none absolute left-0 right-0 h-12 bg-gradient-to-b from-glow/0 via-glow/20 to-glow/0" />

                {/* Console title bar */}
                <div className="relative flex items-center justify-between border-b border-glow/15 px-4 py-2.5 bg-glow/[0.03]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f] term-led-green" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-glow/70">
                    /// {MENU[k].label.toUpperCase()}_INDEX
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-mist">
                    <span>0x{(kIdx + 1).toString(16).padStart(2, "0")}</span>
                    <span className="text-glow/60 ai-flicker">●</span>
                  </div>
                </div>

                {/* Body */}
                <div className="relative px-4 py-4">
                  {/* Prompt line */}
                  <div className="flex items-baseline gap-2 text-[11px] mb-3">
                    <span className="text-ember">moderniza@nav</span>
                    <span className="text-mist/60">:~$</span>
                    <span className="text-chalk">list --section={k}</span>
                    <span className="term-cursor inline-block h-3 w-1.5 bg-glow translate-y-0.5" />
                  </div>
                  <p className="mb-4 text-[11.5px] text-mist leading-relaxed">
                    <span className="text-glow/70">// </span>
                    {MENU[k].tagline}
                  </p>

                  {/* Items */}
                  <ul className="grid grid-cols-1">
                    {MENU[k].items.map((item, i) => {
                      const ledClass = i === 0 ? "term-led-green bg-glow" : i === 1 ? "term-led-amber bg-ember" : "term-led-red bg-[#ff5f56]";
                      return (
                        <li key={item.href} className="term-row">
                          <Link
                            href={item.href}
                            className="term-row-link group/row flex items-start gap-3 px-3 py-2.5"
                          >
                            <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ledClass}`} />
                            <span className="flex-1 min-w-0">
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="flex items-baseline gap-2 min-w-0">
                                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-glow/70 shrink-0">
                                    [N{String(i + 1).padStart(2, "0")}]
                                  </span>
                                  <span
                                    className="block text-[13.5px] font-semibold tracking-tight text-chalk truncate"
                                    style={{ fontFamily: "var(--font-geist-sans)" }}
                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                  />
                                </span>
                                <span aria-hidden className="term-row-arrow text-glow text-xs">▶</span>
                              </span>
                              <span
                                className="mt-0.5 block text-[11.5px] text-mist leading-snug"
                                dangerouslySetInnerHTML={{ __html: item.blurb }}
                              />
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Featured callout */}
                  <Link
                    href={MENU[k].featured.href}
                    className="mt-4 group/cta flex items-center justify-between gap-3 rounded-sm border border-glow/25 bg-glow/[0.06] px-3 py-2.5 hover:bg-glow/[0.1] transition-colors"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-glow shrink-0">
                        {MENU[k].featured.eyebrow}
                      </span>
                      <span className="h-3 w-px bg-glow/30 shrink-0" />
                      <span
                        className="text-[12px] text-chalk leading-snug truncate"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
                        {MENU[k].featured.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-glow shrink-0">
                      {MENU[k].featured.cta}
                      <span className="transition-transform group-hover/cta:translate-x-0.5">▸</span>
                    </span>
                  </Link>
                </div>

                {/* Console footer */}
                <div className="relative flex items-center justify-between border-t border-glow/15 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-mist bg-glow/[0.03]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-[2px] h-3 text-glow">
                      <span className="term-eq w-[2px] h-full bg-current" />
                      <span className="term-eq w-[2px] h-full bg-current" style={{ animationDelay: "0.2s" }} />
                      <span className="term-eq w-[2px] h-full bg-current" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <span className="text-glow/70">link · ready</span>
                  </div>
                  <span className="text-mist/60">[ENTER]: navigate</span>
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact/start"
            className="hidden md:inline-flex h-10 items-center gap-2 rounded-full bg-glow px-4 text-sm font-semibold text-ink hover:bg-chalk transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-ink pulse-dot" />
            Start a project
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full bg-chalk transition-transform ${
                  mobileOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-full bg-chalk transition-transform ${
                  mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={`lg:hidden overflow-hidden border-b border-white/5 bg-ink transition-[max-height] duration-500 ${
          mobileOpen ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4">
          {KEYS.map((k) => (
            <div key={k} className="border-b border-white/5 last:border-b-0">
              <button
                onClick={() => setOpenMobile(openMobile === k ? null : k)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-base font-medium text-chalk">{MENU[k].label}</span>
                <span
                  className={`text-glow transition-transform ${
                    openMobile === k ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openMobile === k && (
                <ul className="grid grid-cols-1 gap-1 pb-3">
                  {MENU[k].items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-3 py-2 text-sm text-chalk/80 hover:bg-white/[0.04]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                        <span className="ml-2 text-[11px] text-mist">{item.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link
            href="/contact/start"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-glow py-3 text-sm font-semibold text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Start a project →
          </Link>
        </div>
      </div>
    </header>
  );
}
