/**
 * CyberMech v3.0 — next-generation humanoid AI unit.
 *
 * Same 400x460 viewBox as RobotMascot so it drops into the hero stage.
 * Posture is upright and observing: slow chest breathing, measured visor
 * scan, calm core rotation. No dance — the unit is online, watching, ready.
 *
 * Reads as "the legacy MK1 robot rebuilt as a modern AI platform".
 *
 * All pure SVG + CSS animations; no client JS needed.
 */

const CYBER_REACTIONS = [
  { txt: "SYS · ONLINE",       delay: "0s"  },
  { txt: "VISION · ACTIVE",    delay: "6s"  },
  { txt: "MODERNIZA · v3.0",   delay: "12s" },
  { txt: "READY",              delay: "18s" },
];
const BUBBLE_CYCLE_S = 24;

export default function CyberMech({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`} role="img">
      {/* Cycling speech-bubble reactions — top-right of the robot */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 pointer-events-none">
        {CYBER_REACTIONS.map((r) => (
          <div
            key={r.txt}
            className="cm-speech absolute right-0 top-0 whitespace-nowrap"
            style={{ animationDelay: r.delay, animationDuration: `${BUBBLE_CYCLE_S}s` }}
          >
            <div className="relative rounded-md bg-[#0a0a0b] text-[#22d3ee] border border-[#22d3ee]/45 px-2.5 py-1 text-[10px] font-mono tracking-[0.18em] uppercase shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-[#22d3ee] align-middle shadow-[0_0_6px_#22d3ee]" />
              {r.txt}
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-[#0a0a0b] border-r border-b border-[#22d3ee]/45" />
            </div>
          </div>
        ))}
      </div>

      {/* halo + ring layer behind the cyber-mech */}
      <svg viewBox="0 0 400 460" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="cm-halo" cx="0.5" cy="0.55" r="0.55">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="250" r="180" fill="url(#cm-halo)" className="cm-halo" />

        {/* outer dashed orbit (neon cyan) */}
        <g className="cm-orbit-1" style={{ transformOrigin: "200px 240px" }}>
          <ellipse cx="200" cy="240" rx="180" ry="130" fill="none" stroke="#22d3ee" strokeOpacity="0.35" strokeDasharray="2 6" />
          <circle cx="380" cy="240" r="3" fill="#22d3ee" />
        </g>
        {/* inner orbit (purple) */}
        <g className="cm-orbit-2" style={{ transformOrigin: "200px 240px" }}>
          <ellipse cx="200" cy="240" rx="140" ry="100" fill="none" stroke="#a855f7" strokeOpacity="0.45" />
          <circle cx="60" cy="240" r="2.5" fill="#a855f7" />
        </g>

        {/* drifting neon code particles */}
        {[
          { cx: 60,  cy: 90,  delay: "0s",   bx: 25,  by: -36, color: "#22d3ee" },
          { cx: 340, cy: 110, delay: "0.5s", bx: -36, by: -18, color: "#a855f7" },
          { cx: 40,  cy: 360, delay: "1s",   bx: 50,  by: 22,  color: "#ff6ec7" },
          { cx: 360, cy: 380, delay: "1.5s", bx: -28, by: 28,  color: "#22d3ee" },
          { cx: 200, cy: 38,  delay: "0.8s", bx: 0,   by: -38, color: "#a855f7" },
        ].map((p, i) => (
          <g
            key={i}
            className="cm-bolt"
            style={{
              ["--bx" as never]: `${p.bx}px`,
              ["--by" as never]: `${p.by}px`,
              animationDelay: p.delay,
              transformOrigin: `${p.cx}px ${p.cy}px`,
              transformBox: "fill-box",
            } as React.CSSProperties}
          >
            <path
              d={`M ${p.cx} ${p.cy - 6} L ${p.cx + 4} ${p.cy} L ${p.cx} ${p.cy + 6} L ${p.cx - 4} ${p.cy} Z`}
              fill={p.color}
              opacity="0.85"
            />
          </g>
        ))}

        {/* ground neon-shadow */}
        <ellipse cx="200" cy="438" rx="80" ry="8" fill="#22d3ee" fillOpacity="0.35" className="cm-shadow" />
      </svg>

      {/* the cyber-mech body inside the same viewBox */}
      <svg viewBox="0 0 400 460" className="relative h-full w-full">
        <defs>
          <linearGradient id="cm-plate-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1a1a22" />
            <stop offset="60%" stopColor="#0c0c12" />
            <stop offset="100%" stopColor="#06060a" />
          </linearGradient>
          <linearGradient id="cm-plate-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ff6ec7" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="cm-chest-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ff6ec7" />
          </linearGradient>
          <linearGradient id="cm-visor-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.55" />
          </linearGradient>
          <filter id="cm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="cm-screen-clip">
            <rect x="138" y="252" width="124" height="20" rx="3" />
          </clipPath>
        </defs>

        {/* whole body — sharp pops on the beat */}
        <g className="cm-body">

          {/* ===== LEGS ===== */}
          <g transform="translate(171 370)">
            <g className="cm-leg-l">
              <path d="M -12 0 L 12 0 L 10 56 L -10 56 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.4" />
              <rect x="-16" y="50" width="32" height="14" rx="3" fill="#0a0a0b" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1.2" />
              <line x1="-10" y1="22" x2="10" y2="22" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1" />
              <circle cx="0" cy="22" r="2.5" fill="#22d3ee" className="cm-pulse" />
            </g>
          </g>
          <g transform="translate(229 370)">
            <g className="cm-leg-r">
              <path d="M -12 0 L 12 0 L 10 56 L -10 56 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.4" />
              <rect x="-16" y="50" width="32" height="14" rx="3" fill="#0a0a0b" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1.2" />
              <line x1="-10" y1="22" x2="10" y2="22" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1" />
              <circle cx="0" cy="22" r="2.5" fill="#22d3ee" className="cm-pulse" />
            </g>
          </g>

          {/* ===== TORSO ===== */}
          <g>
            {/* shoulder pauldrons (angular plates) */}
            <path d="M 122 200 L 152 188 L 168 196 L 168 240 L 122 240 Z"
                  fill="url(#cm-plate-grad)" stroke="#a855f7" strokeOpacity="0.65" strokeWidth="1.6" />
            <path d="M 278 200 L 248 188 L 232 196 L 232 240 L 278 240 Z"
                  fill="url(#cm-plate-grad)" stroke="#a855f7" strokeOpacity="0.65" strokeWidth="1.6" />

            {/* chest housing — angular cut */}
            <path d="M 140 196 L 260 196 L 268 218 L 268 360 L 250 374 L 150 374 L 132 360 L 132 218 Z"
                  fill="url(#cm-plate-grad)" stroke="url(#cm-plate-edge)" strokeWidth="1.8" />

            {/* chest neon panel */}
            <rect x="148" y="226" width="104" height="38" rx="6" fill="#06060a" stroke="#22d3ee" strokeOpacity="0.65" strokeWidth="1.2" />
            <rect x="152" y="230" width="96" height="30" rx="4" fill="url(#cm-chest-grad)" opacity="0.18" />
            <g clipPath="url(#cm-screen-clip)">
              <text className="cm-screen" x="138" y="251" fill="#22d3ee" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="2">
                SYS · v3.0 · OBSERVING · MODERNIZA · ONLINE ·
              </text>
            </g>
            <text x="200" y="244" textAnchor="middle" fill="#22d3ee" fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="3" opacity="0.9">MODERNIZA · AI</text>

            {/* neon equalizer bars */}
            <g transform="translate(166 280)" filter="url(#cm-glow)">
              {[0,1,2,3,4,5,6,7].map((i) => (
                <rect
                  key={i}
                  x={i * 9}
                  y={0}
                  width="6"
                  height="22"
                  rx="1.2"
                  fill="url(#cm-chest-grad)"
                  className={`cm-eq cm-eq-${i % 4}`}
                  style={{ transformOrigin: `${i * 9 + 3}px 22px`, transformBox: "fill-box" }}
                />
              ))}
            </g>

            {/* core reactor */}
            <g transform="translate(200 332)">
              <circle r="22" fill="#06060a" stroke="#a855f7" strokeOpacity="0.6" strokeWidth="1.4" />
              <circle r="22" fill="url(#cm-chest-grad)" opacity="0.18" />
              <g className="cm-core">
                <polygon points="0,-12 10,0 0,12 -10,0" fill="#22d3ee" />
                <polygon points="0,-7 6,0 0,7 -6,0" fill="#fff" opacity="0.85" />
              </g>
              <circle r="16" fill="none" stroke="#a855f7" strokeOpacity="0.7" strokeDasharray="3 3" className="cm-core-ring" style={{ transformOrigin: "center" }} />
            </g>

            {/* angular panel seams */}
            <line x1="140" y1="216" x2="260" y2="216" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="150" y1="368" x2="250" y2="368" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="200" y1="270" x2="200" y2="310" stroke="#a855f7" strokeOpacity="0.4" strokeWidth="1" />
          </g>

          {/* ===== LEFT ARM ===== */}
          <g transform="translate(130 210)">
            <g className="cm-arm-l">
              {/* upper arm — angular */}
              <path d="M -10 2 L 10 2 L 8 60 L -8 60 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.4" />
              {/* shoulder pivot */}
              <circle r="9" fill="#06060a" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" />
              <circle r="4" fill="#22d3ee" className="cm-pulse" style={{ transformOrigin: "center" }} />

              {/* forearm */}
              <g transform="translate(0 60)">
                <g className="cm-forearm-l">
                  <path d="M -9 2 L 9 2 L 7 56 L -7 56 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.4" />
                  <circle r="8" fill="#06060a" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" />
                  <circle r="3" fill="#22d3ee" />
                  <line x1="-6" y1="20" x2="6" y2="20" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1" />

                  {/* hand */}
                  <g transform="translate(0 56)">
                    <g className="cm-hand-l">
                      <rect x="-10" y="-4" width="20" height="8" rx="2" fill="#0a0a0b" stroke="#a855f7" strokeOpacity="0.65" strokeWidth="1" />
                      <path d="M -13 2 L 13 2 L 11 22 L -11 22 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.65" strokeWidth="1.4" />
                      <circle cx="0" cy="13" r="4" fill="#22d3ee" className="cm-pulse" />
                      <rect x="-11" y="20" width="5" height="14" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="-4"  y="22" width="5" height="16" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="3"   y="22" width="5" height="16" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="10"  y="20" width="5" height="14" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="13" y="6" width="10" height="5" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* ===== RIGHT ARM ===== */}
          <g transform="translate(270 210)">
            <g className="cm-arm-r">
              <path d="M -10 2 L 10 2 L 8 60 L -8 60 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.4" />
              <circle r="9" fill="#06060a" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" />
              <circle r="4" fill="#22d3ee" className="cm-pulse" style={{ transformOrigin: "center" }} />

              <g transform="translate(0 60)">
                <g className="cm-forearm-r">
                  <path d="M -9 2 L 9 2 L 7 56 L -7 56 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.4" />
                  <circle r="8" fill="#06060a" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.2" />
                  <circle r="3" fill="#22d3ee" />
                  <line x1="-6" y1="20" x2="6" y2="20" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1" />

                  <g transform="translate(0 56)">
                    <g className="cm-hand-r">
                      <rect x="-10" y="-4" width="20" height="8" rx="2" fill="#0a0a0b" stroke="#a855f7" strokeOpacity="0.65" strokeWidth="1" />
                      <path d="M -13 2 L 13 2 L 11 22 L -11 22 Z" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.65" strokeWidth="1.4" />
                      <circle cx="0" cy="13" r="4" fill="#22d3ee" className="cm-pulse" />
                      <rect x="-11" y="20" width="5" height="14" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="-4"  y="22" width="5" height="16" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="3"   y="22" width="5" height="16" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="10"  y="20" width="5" height="14" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                      <rect x="-23" y="6" width="10" height="5" rx="1.4" fill="url(#cm-plate-grad)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* ===== HEAD ===== */}
          <g className="cm-head">
            {/* neck */}
            <rect x="184" y="178" width="32" height="18" rx="3" fill="#06060a" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1" />
            <line x1="184" y1="186" x2="216" y2="186" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1" />

            {/* antenna with steady signal pulse */}
            <g className="cm-antenna" style={{ transformOrigin: "200px 100px", transformBox: "view-box" } as React.CSSProperties}>
              <line x1="200" y1="100" x2="200" y2="58" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <circle cx="200" cy="56" r="6" fill="#22d3ee" className="cm-pulse" />
              <circle cx="200" cy="56" r="10" fill="none" stroke="#22d3ee" strokeOpacity="0.7" className="cm-signal" />
              <circle cx="200" cy="56" r="14" fill="none" stroke="#22d3ee" strokeOpacity="0.35" className="cm-signal" style={{ animationDelay: "-0.8s" }} />
            </g>

            {/* head shell — angular */}
            <path d="M 142 102 L 200 96 L 258 102 L 264 152 L 254 188 L 146 188 L 136 152 Z"
                  fill="url(#cm-plate-grad)" stroke="url(#cm-plate-edge)" strokeWidth="1.8" />

            {/* visor slit — single horizontal cyan band */}
            <rect x="148" y="132" width="104" height="22" rx="3" fill="#06060a" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.2" />
            <rect x="150" y="134" width="100" height="18" rx="2" fill="url(#cm-visor-grad)" className="cm-visor" filter="url(#cm-glow)" />
            {/* visor scan-line */}
            <rect x="150" y="134" width="20" height="18" rx="2" fill="#fff" opacity="0.5" className="cm-visor-scan" />

            {/* mouth grille (vents) */}
            <g transform="translate(176 168)">
              <rect width="48" height="10" rx="2" fill="#06060a" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="0.8" />
              {[0,1,2,3,4,5].map((i) => (
                <rect key={i} x={4 + i * 8} y="2" width="4" height="6" rx="0.6" fill="#22d3ee" opacity="0.7" className={`cm-vent cm-vent-${i % 3}`} />
              ))}
            </g>

            {/* ear modules */}
            <rect x="132" y="138" width="10" height="22" rx="2" fill="#06060a" stroke="#a855f7" strokeOpacity="0.55" strokeWidth="1" />
            <rect x="258" y="138" width="10" height="22" rx="2" fill="#06060a" stroke="#a855f7" strokeOpacity="0.55" strokeWidth="1" />
            <circle cx="137" cy="149" r="2" fill="#a855f7" className="cm-pulse" />
            <circle cx="263" cy="149" r="2" fill="#a855f7" className="cm-pulse" />
          </g>
        </g>
      </svg>

      {/* HUD label below the modern unit */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#22d3ee]/80 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] cm-pulse" />
        <span className="ai-flicker">moderniza · v3.0</span>
        <span className="text-[#22d3ee]/40">/ humanoid · ai</span>
      </div>
    </div>
  );
}
