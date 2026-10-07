"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

type MenuKey = "platform" | "solutions" | "security" | "about";

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
  platform: {
    label: "Platform",
    tagline: "Blueprint, Contract, Code, Testing, Deploy.",
    items: [
      { title: "How it works", href: "/how-it-works", blurb: "Five steps, two approval gates, one hand-back loop.", icon: "❶" },
      { title: "Features", href: "/platform", blurb: "The full feature catalog, grouped by the job it does.", icon: "◇" },
      { title: "Business rules", href: "/business-rules", blurb: "Every rule traced to its source line.", icon: "◎" },
      { title: "Verification", href: "/verification", blurb: "Six gates, live tests and an honest equivalence report.", icon: "▣" },
    ],
    featured: { eyebrow: "Cost", title: "Know the cost before you spend it.", body: "Budget gates, Tokenomics and a ledger of every AI call.", cta: "Cost & transparency", href: "/pricing-transparency" },
  },
  solutions: {
    label: "Solutions",
    tagline: "By role and by legacy platform.",
    items: [
      { title: "By role", href: "/solutions#by-role", blurb: "CIOs, application owners, architects, security teams, integrators.", icon: "◈" },
      { title: "By legacy platform", href: "/solutions#by-platform", blurb: "Mainframe, IBM i, Microsoft, Salesforce, Oracle, 4GL, web.", icon: "◫" },
    ],
    featured: { eyebrow: "Languages", title: "What we modernize — and what we build.", body: "Honest support levels for every language.", cta: "Languages & stacks", href: "/languages" },
  },
  security: {
    label: "Security",
    tagline: "Built in, not bolted on.",
    items: [
      { title: "Security & trust", href: "/security", blurb: "Passkeys, tamper-evident audit, signed builds, FedRAMP 20x readiness.", icon: "▣" },
      { title: "AI governance", href: "/ai-governance", blurb: "Kill switch, agent fence, agent limits, AI ledger.", icon: "◎" },
      { title: "Trust Center", href: "/trust-center", blurb: "Security posture, policies, vulnerabilities and change notices.", icon: "▦" },
    ],
    featured: { eyebrow: "FedRAMP 20x", title: "Readiness tracked with automated checks.", body: "Every Key Security Indicator shows the evidence behind it.", cta: "Open Trust Center", href: "/trust-center" },
  },
  about: {
    label: "About",
    tagline: "The story behind Moderniza.",
    items: [
      { title: "Why we exist", href: "/why", blurb: "The problem we set out to solve.", icon: "✶" },
      { title: "What we do", href: "/what", blurb: "Our craft, in plain language.", icon: "◇" },
      { title: "Who we are", href: "/who", blurb: "The team and the principles.", icon: "◎" },
      { title: "Process", href: "/process/discover", blurb: "Discover, Define, Deliver.", icon: "❶" },
      { title: "Work", href: "/work/projects", blurb: "Projects and outcomes.", icon: "▤" },
      { title: "Enterprises", href: "/enterprises", blurb: "Why large teams choose Moderniza.", icon: "◈" },
    ],
    featured: { eyebrow: "Start", title: "Send us a brief.", body: "Start a project with a short brief.", cta: "Start a project", href: "/contact/start" },
  },
};

type NavEntry = { kind: "menu"; key: MenuKey } | { kind: "link"; label: string; href: string };

const NAV: NavEntry[] = [
  { kind: "menu", key: "platform" },
  { kind: "link", label: "Languages", href: "/languages" },
  { kind: "menu", key: "solutions" },
  { kind: "menu", key: "security" },
  { kind: "menu", key: "about" },
  { kind: "link", label: "Deployment", href: "/deployment" },
  { kind: "link", label: "FAQ", href: "/faq" },
];


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<MenuKey | null>(null);
  // After a submenu link is clicked the panel is kept closed until the pointer
  // leaves that menu item; otherwise :hover / :focus-within keep it open.
  const [closedMenu, setClosedMenu] = useState<MenuKey | null>(null);
  const closeMenu = (k: MenuKey) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
    setClosedMenu(k);
  };

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

        <nav className="hidden xl:flex items-center gap-1">
          {NAV.map((entry, kIdx) => {
            if (entry.kind === "link") {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-chalk/85 hover:text-chalk transition-colors"
                >
                  <span className="term-trig-dot h-1.5 w-1.5 rounded-full bg-glow" />
                  <span className="type-nav">{entry.label}</span>
                </Link>
              );
            }
            const k = entry.key;
            return (
            <div key={k} className={`menu-trigger relative ${closedMenu === k ? "menu-closed" : ""}`} onMouseLeave={() => setClosedMenu((c) => (c === k ? null : c))}>
              <button
                className="flex items-center gap-2 rounded-md px-3 py-2 text-chalk/85 hover:text-chalk transition-colors"
                aria-haspopup="true"
              >
                <span className="term-trig-dot h-1.5 w-1.5 rounded-full bg-glow" />
                <span className="type-nav">{MENU[k].label}</span>
              </button>

              {/* `hidden` removes the panel outright once a link is clicked, so neither
                  :hover nor the open animation can keep it on screen. */}
              <div className={`mega-wrap absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${closedMenu === k ? "hidden" : ""}`}>
              <div className="mega w-[440px] rounded-md border border-glow/25 bg-[#0b0b0d] shadow-[0_30px_70px_-12px_rgba(0,0,0,0.7),inset_0_0_60px_rgba(214,255,58,0.04)] overflow-hidden font-mono">
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
                            onClick={closeMenu(k)}
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
                    onClick={closeMenu(k)}
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
            </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex h-9 md:h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-glow px-3.5 md:px-4 text-[13px] font-semibold text-ink hover:bg-chalk transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-ink pulse-dot" />
            Book a demo
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
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
        className={`xl:hidden border-b border-white/5 bg-ink transition-[max-height] duration-500 ${
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-5 py-4">
          {NAV.map((entry) => {
            if (entry.kind === "link") {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="block border-b border-white/5 py-4 type-h4 text-chalk"
                  onClick={() => setMobileOpen(false)}
                >
                  {entry.label}
                </Link>
              );
            }
            const k = entry.key;
            return (
            <div key={k} className="border-b border-white/5 last:border-b-0">
              <button
                onClick={() => setOpenMobile(openMobile === k ? null : k)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="type-h4 text-chalk">{MENU[k].label}</span>
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
                        className="block rounded-xl px-3 py-2 type-body text-chalk/80 hover:bg-white/[0.04]"
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenMobile(null);
                        }}
                      >
                        {item.title}
                        <span className="ml-2 type-small text-mist">{item.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            );
          })}
          <Link
            href="/contact"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-glow py-3 text-sm font-semibold text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Book a demo →
          </Link>
        </div>
      </div>
    </header>
  );
}
