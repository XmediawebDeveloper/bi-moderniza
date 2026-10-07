"use client";

/**
 * HeroIntro — wgb.agency-style hero, choreographed off the IntroLoader curtain.
 *
 * Reveal happens when one of these is true:
 *   • A `intro:done` event fires (dispatched by IntroLoader when curtain lifts).
 *   • Reduced-motion (curtain skipped) — fire on mount.
 *   • Safety fallback: 4 s after mount even if no event fires.
 *
 * Until then the headline lines and supporting copy stay parked in their
 * "before" state. After, they rise/fade in via Framer Motion variants.
 *
 * Background (orbital ring, drifting blobs, soft grid) is always-on; only
 * the foreground content waits for the curtain.
 */

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AmbientFx from "./AmbientFx";
import HeroOverlay from "./HeroOverlay";
import RobotStage from "./RobotStage";

const lineMask: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.05, ease: [0.2, 0.7, 0.1, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0.7, 0.1, 1] },
  },
};

type Pill = { label: string; tone?: "live" | "neutral" };
export type HeroIntroProps = {
  eyebrow?: string;
  headline_line1?: string;
  headline_line2?: string;
  italic_word?: string;
  subheading?: string;
  primary_cta_label?: string;
  primary_cta_url?: string;
  secondary_cta_label?: string;
  secondary_cta_url?: string;
  scroll_note?: string;
  pills?: Pill[];
};

const DEFAULT_PILLS: Pill[] = [
  { label: "blueprint", tone: "live" },
  { label: "contract", tone: "neutral" },
  { label: "code", tone: "neutral" },
  { label: "testing · deploy", tone: "neutral" },
];

export default function HeroIntro({
  eyebrow = "AI-powered legacy modernization platform",
  headline_line1 = "Modernize legacy systems.",
  headline_line2 = "Prove",
  italic_word = "nothing was lost.",
  subheading = "Moderniza reads your legacy code, explains it in plain words, freezes a plan you approve, builds the new application with parallel AI agents, runs it for real, and deploys it. Every business rule is traced back to the exact file and line it came from.",
  primary_cta_label = "Book a demo",
  primary_cta_url = "/contact",
  secondary_cta_label = "See how it works",
  secondary_cta_url = "/how-it-works",
  scroll_note = "Blueprint → Contract → Code → Testing → Deploy",
  pills = DEFAULT_PILLS,
}: HeroIntroProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }

    const onDone = () => setRevealed(true);
    window.addEventListener("intro:done", onDone);

    // safety fallback in case the event is missed
    const fallback = window.setTimeout(() => setRevealed(true), 4000);

    return () => {
      window.removeEventListener("intro:done", onDone);
      clearTimeout(fallback);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yShift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const state = revealed ? "show" : "hidden";

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y: yShift, scale: heroScale }}
      className="relative min-h-[92vh] overflow-hidden bg-chalk text-ink"
    >
      {/* === BACKGROUND ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,250,240,0.9) 0%, rgba(245,241,234,1) 60%, rgba(235,230,221,1) 100%)",
        }}
      />

      <motion.div
        aria-hidden
        animate={{ x: [0, 24, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -right-32 h-[480px] w-[480px] rounded-full bg-ember/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -22, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-glow/10 blur-3xl"
      />

      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-50" />

      <AmbientFx tone="light" density="med" corner="tr" />
      <HeroOverlay />

      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ rotate: ringRotate }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.10]"
      >
        <g className="orbit-spin" style={{ transformOrigin: "400px 400px" }}>
          <circle cx="400" cy="400" r="380" stroke="#0a0a0b" strokeWidth="1" fill="none" />
          <circle cx="400" cy="400" r="300" stroke="#0a0a0b" strokeWidth="1" fill="none" strokeDasharray="2 8" />
          <circle cx="400" cy="20" r="6" fill="#ff6a3d" />
        </g>
        <g className="orbit-spin-rev" style={{ transformOrigin: "400px 400px" }}>
          <circle cx="400" cy="400" r="220" stroke="#0a0a0b" strokeWidth="1" fill="none" strokeDasharray="1 12" />
          <circle cx="180" cy="400" r="4" fill="#0a0a0b" />
        </g>
      </motion.svg>

      {/* === FOREGROUND HERO ======================================= */}
      <div className="relative mx-auto grid min-h-[92vh] max-w-[1400px] grid-cols-1 lg:grid-cols-[7fr_5fr] lg:items-center gap-12 lg:gap-16 px-6 md:px-10 lg:px-14 py-16 lg:py-20">
       <div className="flex flex-col justify-center max-w-[640px]">
        {/* Status pill row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          transition={{ delay: 0.0 }}
          className="flex flex-wrap items-center gap-1.5 mb-5"
        >
          {pills.map((p, idx) => (
            <span
              key={`${p.label}-${idx}`}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/50 backdrop-blur-md px-2.5 py-1 type-eyebrow !text-[10px] text-ink/70",
                idx === 3 ? "hidden md:inline-flex font-mono" : "",
              ].join(" ")}
            >
              <span className={`h-1 w-1 rounded-full bg-ember ${p.tone === "live" ? "pulse-dot" : ""}`} />
              <span className={p.tone === "live" ? "ai-flicker" : ""}>{p.label}</span>
            </span>
          ))}
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 type-eyebrow text-ink/55"
        >
          <span aria-hidden className="flex h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
          <span>{eyebrow}</span>
        </motion.div>

        {/* Headline — clip-mask line rise + bracket lock-on */}
        <div className="relative mt-5">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute -inset-3 md:-inset-4 h-[calc(100%+1.5rem)] md:h-[calc(100%+2rem)] w-[calc(100%+1.5rem)] md:w-[calc(100%+2rem)] text-ember"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
          >
            <path d="M 0 12 L 0 0 L 12 0" className="bracket-draw" />
            <path d="M 100 12 L 100 0 L 88 0" className="bracket-draw" style={{ animationDelay: "0.7s" }} />
            <path d="M 0 88 L 0 100 L 12 100" className="bracket-draw" style={{ animationDelay: "0.9s" }} />
            <path d="M 100 88 L 100 100 L 88 100" className="bracket-draw" style={{ animationDelay: "1.1s" }} />
          </svg>
          <h1 className="relative max-w-[16ch] type-h1">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={lineMask}
              initial="hidden"
              animate={state}
              transition={{ delay: 0.15 }}
              className="block"
            >
              {headline_line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={lineMask}
              initial="hidden"
              animate={state}
              transition={{ delay: 0.3 }}
              className="block"
            >
              {headline_line2} <span className="italic text-ember">{italic_word}</span>
            </motion.span>
          </span>
        </h1>
        </div>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={state}
          transition={{ delay: 0.55 }}
          className="mt-6 max-w-[56ch] type-lede text-ink/75"
        >
          {subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          transition={{ delay: 0.7 }}
          className="mt-7 flex flex-wrap items-center gap-2.5"
        >
          <Link
            href={primary_cta_url}
            aria-label={primary_cta_label}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-chalk transition-colors hover:bg-graphite"
          >
            {primary_cta_label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href={secondary_cta_url}
            aria-label={secondary_cta_label}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink/25 px-5 text-sm font-medium text-ink transition-colors hover:border-ink/60 hover:bg-ink/[0.04]"
          >
            {secondary_cta_label}
            <span aria-hidden className="text-ink/60 transition-transform group-hover:translate-x-0.5">↗</span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={state}
          transition={{ delay: 0.9 }}
          className="mt-10 md:mt-14 flex items-center gap-3 type-eyebrow text-ink/55"
        >
          <span>Scroll</span>
          <span aria-hidden className="h-px w-12 bg-ink/25" />
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-ember text-base"
          >
            ↓
          </motion.span>
          <span className="hidden md:inline text-ink/35">{scroll_note}</span>
        </motion.div>
       </div>

       {/* === RIGHT COLUMN — LEGACY → MODERN TRANSFORMATION ============= */}
       <div className="relative flex items-center justify-center">
         <div className="relative w-full max-w-[440px] aspect-[4/5]">
           {/* soft halo behind the robot */}
           <div aria-hidden className="pointer-events-none absolute inset-6 rounded-[40%] bg-ember/15 blur-3xl" />
           {/* faint frame ring */}
           <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[36px] border border-ink/8" />
           <RobotStage className="absolute inset-0 h-full w-full" />
         </div>
       </div>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
    </motion.section>
  );
}
