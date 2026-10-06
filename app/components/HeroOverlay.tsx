"use client";

/**
 * HeroOverlay — heavy AI/robotic overlay for the hero only.
 *
 * Layers (positioned absolute, pointer-events:none):
 *   • Hexagonal scanner overlay (subtle pattern drifting)
 *   • Single vertical scan line crossing top-to-bottom
 *   • Particle dot field (24 small drifting dots)
 *   • Three corner crosshair / lock-on markers + brackets
 *   • Top-right "live status" panel with auto-cycling metric ticker + eq bars
 *   • Floating mini "data card" with pulsing connection ring
 *   • Bottom typing terminal stripe with caret
 *   • Floating geometric icons (triangle, hexagon, diamond) bobbing
 *   • Constellation SVG with lines drawing in/out repeatedly
 *
 * Mounted under the hero foreground content; designed for the chalk
 * (light) hero — uses ember + ink ink and dark-on-cream contrast.
 */

import { useEffect, useState } from "react";

const EQ_DELAYS = [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84];

const TERMINAL_LINES = [
  "$ moderniza analyse --target=prod",
  "$ scanning legacy modules ........... ok",
  "$ blueprint generated · 1,247 nodes",
  "$ verifying behavioural parity ....... 96.4%",
  "$ deploy plan ready · awaiting signoff",
];

// 24 particles: pre-computed positions / drift vectors so SSR + client match
const PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const left = ((i * 173) % 100);
  const top = ((i * 257) % 100);
  const dx = ((i * 41) % 60) - 30;
  const dy = -(((i * 31) % 70) + 20);
  const dur = 6 + ((i * 7) % 8);
  const delay = (i * 0.35) % 6;
  return { left, top, dx, dy, dur, delay };
});

export default function HeroOverlay() {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setLine((n) => (n + 1) % TERMINAL_LINES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-ink">
      {/* hexagonal pattern overlay */}
      <div className="hex-grid absolute inset-0 opacity-30" />

      {/* vertical radar scan line */}
      <span className="scan-vert" style={{ animationDelay: "1.2s" }} />

      {/* particle dot field */}
      <div className="absolute inset-0 text-ink/55">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              ["--dx" as never]: `${p.dx}px`,
              ["--dy" as never]: `${p.dy}px`,
              ["--p-dur" as never]: `${p.dur}s`,
              ["--p-delay" as never]: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* constellation lines + nodes */}
      <svg
        viewBox="0 0 1400 800"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        {[
          [120, 140, 320, 320],
          [320, 320, 540, 200],
          [540, 200, 740, 380],
          [740, 380, 980, 240],
          [980, 240, 1240, 360],
          [1240, 360, 1080, 580],
          [1080, 580, 820, 660],
          [820, 660, 540, 540],
          [540, 540, 240, 600],
          [240, 600, 320, 320],
          [120, 140, 540, 200],
          [740, 380, 540, 540],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#0a0a0b"
            strokeWidth="1"
            className="constellation-line"
            style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }}
          />
        ))}
        {[
          [120, 140],
          [320, 320],
          [540, 200],
          [740, 380],
          [980, 240],
          [1240, 360],
          [1080, 580],
          [820, 660],
          [540, 540],
          [240, 600],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3" fill="#ff6a3d" className="ai-node" style={{ animationDelay: `${(i * 0.18).toFixed(2)}s`, transformOrigin: `${cx}px ${cy}px` }} />
            <circle cx={cx} cy={cy} r="10" fill="none" stroke="#ff6a3d" strokeOpacity="0.4" className="signal-ping" style={{ animationDelay: `${(i * 0.4).toFixed(2)}s`, transformOrigin: `${cx}px ${cy}px` }} />
          </g>
        ))}
      </svg>

      {/* crosshair markers in three corners */}
      <CrosshairMarker className="top-6 left-6" />
      <CrosshairMarker className="top-6 right-6" />
      <CrosshairMarker className="bottom-6 left-6" />

      {/* (robot now lives in HeroIntro grid right column) */}

      {/* floating geometric icons */}
      <Geometric className="left-[6%] top-[28%]" shape="triangle" delay="0s" />
      <Geometric className="left-[12%] top-[68%]" shape="diamond" delay="2.2s" />
      <Geometric className="right-[18%] bottom-[18%]" shape="hexagon" delay="3.6s" />
      <Geometric className="right-[8%] top-[18%]" shape="diamond" delay="1.4s" small />

      {/* bottom typing terminal stripe */}
      <div className="absolute bottom-3 left-5 md:left-12 hidden md:flex items-center gap-3 font-mono text-[12px] text-ink/70">
        <span className="rounded-full border border-ink/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-ink/55">
          terminal
        </span>
        <span className="text-ink/85 max-w-[36ch] inline-flex items-center">
          <span key={line} className="term-line">{TERMINAL_LINES[line]}</span>
          <span className="term-caret ml-1 text-ember">▍</span>
        </span>
      </div>
    </div>
  );
}

function CrosshairMarker({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute h-12 w-12 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-full w-full text-ember crosshair-lock">
        <path d="M 4 4 L 4 14 M 4 4 L 14 4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M 44 4 L 44 14 M 44 4 L 34 4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M 4 44 L 4 34 M 4 44 L 14 44" stroke="currentColor" strokeWidth="1.4" />
        <path d="M 44 44 L 44 34 M 44 44 L 34 44" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="3" fill="currentColor" className="ai-core" style={{ transformOrigin: "24px 24px" }} />
        <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

function Geometric({
  className = "",
  shape,
  delay = "0s",
  small = false,
}: {
  className?: string;
  shape: "triangle" | "diamond" | "hexagon";
  delay?: string;
  small?: boolean;
}) {
  const size = small ? 24 : 36;
  return (
    <div
      aria-hidden
      className={`absolute shape-bob ${className}`}
      style={{ ["--bob-dur" as never]: "7s", animationDelay: delay }}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} className="text-ink/40">
        {shape === "triangle" && (
          <path d="M 24 6 L 42 38 L 6 38 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        )}
        {shape === "diamond" && (
          <path d="M 24 6 L 42 24 L 24 42 L 6 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        )}
        {shape === "hexagon" && (
          <path d="M 24 4 L 42 14 L 42 34 L 24 44 L 6 34 L 6 14 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  );
}
