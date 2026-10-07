"use client";

/**
 * IntroLoader — robot runs across, text reveals in its wake, flip + jump.
 *
 * Phases:
 *   1. RUN  (1.8 s) — robot dashes from x=-30vw to x=+22vw on the dark
 *                     curtain, with pumping legs/arms (.robot-running) and
 *                     speed-lines streaming behind. The headline
 *                     "Modernize with confidence." reveals via clip-path
 *                     in lock-step with the robot's x position, so the
 *                     text appears in the robot's wake.
 *   2. FLIP (0.7 s) — robot rotates 360° in place (front-flip), small lift.
 *   3. JUMP (0.5 s) — robot jumps up in an arc and lands.
 *   4. FADE (0.4 s) — curtain opacity 1 → 0; intro:done fires; hero appears
 *                     with its own RobotMascot already in the right column.
 *
 * Reduced-motion: skips everything, dispatches intro:done immediately.
 */

import { motion, useReducedMotion, type Easing } from "motion/react";
import { useEffect, useState } from "react";
import RobotMascot from "./RobotMascot";

const RUN_EASE: Easing = [0.45, 0, 0.55, 1];
const FLIP_EASE: Easing = [0.6, 0, 0.4, 1];
const JUMP_EASE: Easing = [0.2, 0.7, 0.3, 1];

const RUN_MS = 1800;
const FLIP_MS = 700;
const JUMP_MS = 500;
const FADE_MS = 400;
const TOTAL_MS = RUN_MS + FLIP_MS + JUMP_MS + FADE_MS;

type Phase = "run" | "flip" | "jump" | "fade" | "done";

export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("run");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) {
      setPhase("done");
      window.dispatchEvent(new CustomEvent("intro:done"));
      return;
    }

    document.body.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setPhase("flip"), RUN_MS);
    const t2 = window.setTimeout(() => setPhase("jump"), RUN_MS + FLIP_MS);
    const t3 = window.setTimeout(() => {
      setPhase("fade");
      window.dispatchEvent(new CustomEvent("intro:done"));
    }, RUN_MS + FLIP_MS + JUMP_MS);
    const t4 = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, TOTAL_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (phase === "done") return null;

  // robot trajectory
  const robotAnimate =
    phase === "run"  ? { x: "22vw", y: 0, rotate: 0 } :
    phase === "flip" ? { x: "22vw", y: -30, rotate: 360 } :
    phase === "jump" ? { x: "22vw", y: -120, rotate: 360 } :
                       { x: "22vw", y: 0, rotate: 360 };

  const robotTransition =
    phase === "run"
      ? { x: { duration: RUN_MS / 1000, ease: RUN_EASE } }
      : phase === "flip"
      ? { rotate: { duration: FLIP_MS / 1000, ease: FLIP_EASE }, y: { duration: FLIP_MS / 1000 } }
      : phase === "jump"
      ? { y: { duration: JUMP_MS / 1000, ease: JUMP_EASE } }
      : { y: { duration: 0.3 } };

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: "easeOut" }}
      className="fixed inset-0 z-[100] overflow-hidden bg-ink text-chalk select-none"
    >
      {/* dark grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl" />

      {/* corner labels */}
      <div className="absolute left-5 top-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-mist">
        <span className="relative inline-block h-5 w-5 rounded-full bg-glow">
          <span className="absolute inset-1 rounded-full bg-ink" />
        </span>
        Moderniza
      </div>
      <div className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.22em] text-mist">v 26 · 04</div>
      <div className="absolute left-5 bottom-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-mist">
        <span className="flex h-2 w-2 rounded-full bg-glow pulse-dot" />
        <span className="ai-flicker">
          {phase === "run"  && "loading experience"}
          {phase === "flip" && "executing"}
          {phase === "jump" && "deploying"}
          {phase === "fade" && "ready"}
        </span>
      </div>
      <div className="absolute right-5 bottom-5 text-[11px] uppercase tracking-[0.22em] text-mist">Blueprint · Contract · Code · Testing · Deploy</div>

      {/* Headline that reveals in the robot's wake (clip-path follows robot x) */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: phase === "run" ? "inset(0 0% 0 0)" : "inset(0 0% 0 0)" }}
        transition={{ duration: RUN_MS / 1000, ease: RUN_EASE }}
        className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
      >
        <h1
          aria-label="Modernize legacy systems. Prove nothing was lost."
          className="text-center text-[40px] sm:text-[64px] md:text-[92px] lg:text-[112px] font-semibold leading-[0.95] tracking-[-0.04em] text-chalk"
        >
          Modernize legacy systems. <span className="italic text-glow">Prove nothing was lost.</span>
        </h1>
      </motion.div>

      {/* ground line — robot runs along this line, below the text */}
      <div
        aria-hidden
        className="absolute left-0 right-0 h-px bg-glow/15"
        style={{ bottom: "12%" }}
      />

      {/* Speed-lines trail behind the robot during run (at robot mid-height) */}
      {phase === "run" && (
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ bottom: "calc(12% + 110px)" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="intro-speedline absolute h-px bg-gradient-to-r from-glow/0 via-glow/50 to-glow/0"
              style={{
                top: `${-40 + i * 20}px`,
                width: "30vw",
                left: "60%",
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Dust puff on landing — at robot's feet on the ground line */}
      {phase === "fade" && (
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "calc(12% - 6px)",
            left: "calc(50% + 22vw - 60px)",
          }}
        >
          <div className="intro-dust h-3 w-32 rounded-full bg-glow/40 blur-md" />
          <div className="intro-dust absolute inset-0 h-3 w-24 rounded-full bg-chalk/20 blur-sm" style={{ animationDelay: "0.05s" }} />
        </div>
      )}

      {/* The robot — runs along ground line below the headline */}
      <motion.div
        initial={{ x: "-30vw", y: 0, rotate: 0 }}
        animate={robotAnimate}
        transition={robotTransition}
        className="absolute left-1/2 w-[220px] h-[280px] sm:w-[260px] sm:h-[340px] lg:w-[300px] lg:h-[380px]"
        style={{ bottom: "12%", translate: "-50% 0", transformOrigin: "center" }}
      >
        <RobotMascot
          className={[
            "h-full w-full",
            phase === "run" ? "robot-running" : "",
          ].join(" ")}
        />
      </motion.div>
    </motion.div>
  );
}
