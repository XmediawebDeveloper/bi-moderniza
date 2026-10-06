/**
 * AmbientFx — drop-in scientific/AI ambient layer for any section.
 *
 * Composition (all positioned absolute, pointer-events: none):
 *   • Drifting grid (relies on .bg-grid in globals.css)
 *   • Two slow horizontal beam sweeps (different timings)
 *   • Three columns of falling binary "rain" (data stream, small, dim)
 *   • Mini orbital decoration (3 concentric rings + center node) in a corner
 *   • Connected-node neural net SVG dispersed across the panel
 *   • A pulsing "core" ring in the corner
 *
 * Usage:
 *   <section className="relative ...">
 *     <AmbientFx tone="dark" />     // uses glow / yellow on dark backgrounds
 *     <AmbientFx tone="light" />    // uses ember / orange on light backgrounds
 *     <AmbientFx tone="dark" density="low" />
 *     ...content...
 *   </section>
 *
 * Section must be position: relative; AmbientFx fills inset:0.
 */

type Tone = "dark" | "light";
type Density = "low" | "med" | "high";

const RAIN_GLYPHS = ["10110", "01001", "11010", "00111", "10101", "01110", "11100", "00010"];

export default function AmbientFx({
  tone = "dark",
  density = "med",
  corner = "tr",
  className = "",
}: {
  tone?: Tone;
  density?: Density;
  corner?: "tr" | "tl" | "br" | "bl";
  className?: string;
}) {
  const stroke = tone === "dark" ? "#d6ff3a" : "#0a0a0b";
  const strokeOp = tone === "dark" ? 0.55 : 0.4;
  const dimText = tone === "dark" ? "rgba(214,255,58,0.35)" : "rgba(10,10,11,0.25)";
  const beamClass = tone === "dark" ? "ai-beam" : "ai-beam ai-beam-soft";
  const cols = density === "low" ? 2 : density === "high" ? 5 : 3;

  const cornerPos = {
    tr: "top-6 right-6",
    tl: "top-6 left-6",
    br: "bottom-6 right-6",
    bl: "bottom-6 left-6",
  }[corner];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* horizontal beam sweeps */}
      <span className={beamClass} style={{ animationDuration: "14s", animationDelay: "0s" }} />
      <span
        className={beamClass}
        style={{ animationDuration: "22s", animationDelay: "-7s", opacity: 0.6 }}
      />

      {/* falling binary rain columns */}
      <div className="absolute inset-y-0 left-[8%] w-[2ch] overflow-hidden opacity-70">
        {Array.from({ length: cols }).map((_, i) => (
          <span
            key={i}
            className="ai-rain-col block"
            style={{
              ["--rain-dur" as never]: `${8 + i * 1.6}s`,
              ["--rain-delay" as never]: `${i * 1.4}s`,
              color: dimText,
            }}
          >
            {Array.from({ length: 14 })
              .map((_, j) => RAIN_GLYPHS[(i * 7 + j) % RAIN_GLYPHS.length])
              .join("\n")}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 right-[12%] w-[2ch] overflow-hidden opacity-50">
        {Array.from({ length: cols }).map((_, i) => (
          <span
            key={i}
            className="ai-rain-col block"
            style={{
              ["--rain-dur" as never]: `${10 + i * 1.4}s`,
              ["--rain-delay" as never]: `${i * 1.8 + 1}s`,
              color: dimText,
            }}
          >
            {Array.from({ length: 14 })
              .map((_, j) => RAIN_GLYPHS[(i * 5 + j + 3) % RAIN_GLYPHS.length])
              .join("\n")}
          </span>
        ))}
      </div>

      {/* neural-net SVG: nodes + animated connecting strokes */}
      <svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="ai-node-grad">
            <stop offset="0%" stopColor={stroke} stopOpacity="1" />
            <stop offset="60%" stopColor={stroke} stopOpacity="0.4" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* connecting lines */}
        {[
          [80, 80, 320, 200],
          [320, 200, 600, 110],
          [600, 110, 880, 220],
          [880, 220, 1120, 90],
          [80, 480, 280, 360],
          [280, 360, 540, 470],
          [540, 470, 820, 380],
          [820, 380, 1100, 480],
          [320, 200, 280, 360],
          [600, 110, 540, 470],
          [880, 220, 820, 380],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="1"
            strokeOpacity={strokeOp}
            className="ai-trace"
            style={{ animationDelay: `${(i * 0.18).toFixed(2)}s` }}
          />
        ))}
        {/* nodes */}
        {[
          [80, 80],
          [320, 200],
          [600, 110],
          [880, 220],
          [1120, 90],
          [80, 480],
          [280, 360],
          [540, 470],
          [820, 380],
          [1100, 480],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="14" fill="url(#ai-node-grad)" opacity="0.9" />
            <circle
              cx={cx}
              cy={cy}
              r="3"
              fill={stroke}
              className="ai-node"
              style={{ animationDelay: `${(i * 0.22).toFixed(2)}s`, transformOrigin: `${cx}px ${cy}px` }}
            />
          </g>
        ))}
      </svg>

      {/* corner orbital + readout */}
      <div className={`absolute ${cornerPos} h-32 w-32 md:h-44 md:w-44`}>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {/* outer ring */}
          <g className="ai-orbit-1" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke={stroke} strokeOpacity={0.35} strokeWidth="0.8" strokeDasharray="2 6" />
            <circle cx="100" cy="8"  r="3" fill={stroke} />
          </g>
          {/* middle ring */}
          <g className="ai-orbit-2" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="64" fill="none" stroke={stroke} strokeOpacity={0.45} strokeWidth="1" />
            <circle cx="36"  cy="100" r="2.5" fill={stroke} />
          </g>
          {/* inner ring */}
          <g className="ai-orbit-3" style={{ transformOrigin: "100px 100px" }}>
            <circle cx="100" cy="100" r="40" fill="none" stroke={stroke} strokeOpacity={0.5} strokeWidth="1" strokeDasharray="1 3" />
            <circle cx="100" cy="60" r="2" fill={stroke} />
          </g>
          {/* radar ripples + core */}
          <circle cx="100" cy="100" r="20" fill="none" stroke={stroke} strokeOpacity={0.6} strokeWidth="0.8" className="ai-ripple" style={{ transformOrigin: "100px 100px" }} />
          <circle cx="100" cy="100" r="20" fill="none" stroke={stroke} strokeOpacity={0.4} strokeWidth="0.8" className="ai-ripple-2" style={{ transformOrigin: "100px 100px" }} />
          <circle cx="100" cy="100" r="6" fill={stroke} className="ai-core" style={{ transformOrigin: "100px 100px" }} />
        </svg>
      </div>

      {/* HUD readouts */}
      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] opacity-50"
           style={{ color: tone === "dark" ? "rgba(214,255,58,0.7)" : "rgba(10,10,11,0.5)" }}>
        <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ background: stroke }} />
        <span>signal · steady</span>
        <span className="opacity-60">/ 0x42a7</span>
      </div>
      <div className="absolute top-3 right-4 font-mono text-[9px] uppercase tracking-[0.22em] opacity-50"
           style={{ color: tone === "dark" ? "rgba(214,255,58,0.7)" : "rgba(10,10,11,0.5)" }}>
        <span className="ai-flicker">streaming · ok</span>
      </div>
    </div>
  );
}
