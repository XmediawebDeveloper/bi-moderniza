"use client";

/**
 * RobotLottie — replaces the rectangular SVG mascot with a real
 * motion-captured Lottie animation for genuine human-like dancing.
 *
 * Drop a Lottie JSON at `public/robot-dance.json` (or pass `src`).
 * If the file is missing or fails to load, this component falls back
 * to the existing CSS-animated SVG mascot so the hero never breaks.
 *
 * Surrounding extras (speech bubbles, orbital rings, HUD label) are
 * preserved on top of the Lottie so the personality of the section
 * carries over.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RobotMascot from "./RobotMascot";

// lottie-react touches `window` on import — keep it client-only.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BUBBLE_CYCLE_S = 7.2;
const REACTIONS = [
  { txt: "Vibing 🎧", delay: "0s" },
  { txt: "Two-step",  delay: "1.8s" },
  { txt: "Groove",    delay: "3.6s" },
  { txt: "Bounce",    delay: "5.4s" },
];

type LottieJSON = Record<string, unknown>;

export default function RobotLottie({
  className = "",
  src = "/robot-dance.json",
}: {
  className?: string;
  src?: string;
}) {
  const [data, setData] = useState<LottieJSON | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((json: LottieJSON) => { if (!cancelled) setData(json); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [src]);

  // No file yet → keep the site working with the existing SVG mascot.
  if (failed || !data) return <RobotMascot className={className} />;

  return (
    <div aria-hidden className={`relative ${className}`} role="img">
      {/* Cycling speech-bubble reactions */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 pointer-events-none">
        {REACTIONS.map((r) => (
          <div
            key={r.txt}
            className="robo-speech absolute right-0 top-0 whitespace-nowrap"
            style={{ animationDelay: r.delay, animationDuration: `${BUBBLE_CYCLE_S}s` }}
          >
            <div className="relative rounded-2xl bg-ink text-chalk px-3 py-1.5 text-[11px] font-semibold tracking-tight shadow-md">
              {r.txt}
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-ink" />
            </div>
          </div>
        ))}
      </div>

      {/* Orbital ring + code particles behind the dancer */}
      <svg viewBox="0 0 400 460" className="absolute inset-0 h-full w-full">
        <g className="ai-orbit-1" style={{ transformOrigin: "200px 230px" }}>
          <ellipse cx="200" cy="230" rx="180" ry="130" fill="none" stroke="#0a0a0b" strokeOpacity="0.18" strokeDasharray="2 6" />
          <circle cx="380" cy="230" r="3" fill="#ff6a3d" />
        </g>
        <g className="ai-orbit-2" style={{ transformOrigin: "200px 230px" }}>
          <ellipse cx="200" cy="230" rx="140" ry="100" fill="none" stroke="#0a0a0b" strokeOpacity="0.22" />
          <circle cx="60" cy="230" r="2.5" fill="#0a0a0b" />
        </g>
        {[
          { cx: 50,  cy: 70,  delay: "0s",   bx: 30,  by: -40 },
          { cx: 350, cy: 90,  delay: "0.5s", bx: -40, by: -20 },
          { cx: 30,  cy: 360, delay: "1s",   bx: 60,  by: 20 },
          { cx: 370, cy: 380, delay: "1.5s", bx: -30, by: 30 },
          { cx: 200, cy: 30,  delay: "0.8s", bx: 0,   by: -40 },
        ].map((p, i) => (
          <g
            key={i}
            className="robo-bolt"
            style={{
              ["--bx" as never]: `${p.bx}px`,
              ["--by" as never]: `${p.by}px`,
              animationDelay: p.delay,
              transformOrigin: `${p.cx}px ${p.cy}px`,
              transformBox: "fill-box",
            } as React.CSSProperties}
          >
            <path d={`M ${p.cx} ${p.cy - 6} L ${p.cx + 4} ${p.cy} L ${p.cx} ${p.cy + 6} L ${p.cx - 4} ${p.cy} Z`} fill="#d6ff3a" />
          </g>
        ))}
      </svg>

      {/* The dancer itself — real captured motion */}
      <div className="relative h-full w-full flex items-center justify-center">
        <Lottie
          animationData={data}
          loop
          autoplay
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* HUD label below */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink/55 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
        <span className="ai-flicker">moderniza · unit 04</span>
        <span className="text-ink/30">/ live capture</span>
      </div>
    </div>
  );
}
