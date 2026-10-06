/**
 * RobotMascot — legacy industrial unit, standing at attention.
 *
 * Themed for code modernization: a vintage industrial robot running
 * self-diagnostics. Chest screen scrolls "ANALYSE · CONVERT · VERIFY ·
 * DEPLOY", its core pulses steadily, status LEDs sweep in a slow
 * diagnostic rotation, head performs a measured left-right scan.
 *
 * The mood is *serious* — this is "v1.0 legacy hardware running pre-flight
 * checks before transformation", not a dancer.
 *
 * All pure SVG + CSS keyframes (see globals.css "LEGACY ROBOT" block).
 * No client-side JS needed; SSR-safe.
 */

const BUBBLE_CYCLE_S = 24;
const REACTIONS = [
  { txt: "SCAN · 100%",        delay: "0s"  },
  { txt: "LEGACY · v1.0",      delay: "6s"  },
  { txt: "PRE-FLIGHT · OK",    delay: "12s" },
  { txt: "READY TO MODERNIZE", delay: "18s" },
];

export default function RobotMascot({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`} role="img">
      {/* Cycling speech-bubble reactions — top-right of the robot */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 pointer-events-none">
        {REACTIONS.map((r, i) => (
          <div
            key={r.txt}
            className="robo-speech absolute right-0 top-0 whitespace-nowrap"
            style={{ animationDelay: r.delay, animationDuration: `${BUBBLE_CYCLE_S}s` }}
          >
            <div className="relative rounded-md border border-ink/80 bg-ink text-chalk px-2.5 py-1 text-[10px] font-mono tracking-[0.18em] uppercase shadow-md">
              <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-ember align-middle" />
              {r.txt}
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-ink border-r border-b border-ink/80" />
            </div>
          </div>
        ))}
      </div>

      {/* orbital + sparks layer behind the robot */}
      <svg viewBox="0 0 400 460" className="absolute inset-0 h-full w-full">
        {/* outer dashed orbit */}
        <g className="ai-orbit-1" style={{ transformOrigin: "200px 230px" }}>
          <ellipse cx="200" cy="230" rx="180" ry="130" fill="none" stroke="#0a0a0b" strokeOpacity="0.18" strokeDasharray="2 6" />
          <circle cx="380" cy="230" r="3" fill="#ff6a3d" />
        </g>
        {/* inner orbit */}
        <g className="ai-orbit-2" style={{ transformOrigin: "200px 230px" }}>
          <ellipse cx="200" cy="230" rx="140" ry="100" fill="none" stroke="#0a0a0b" strokeOpacity="0.22" />
          <circle cx="60" cy="230" r="2.5" fill="#0a0a0b" />
        </g>

        {/* drifting code particles around the robot */}
        {[
          { cx: 50,  cy: 70,  delay: "0s",   bx: 30,  by: -40 },
          { cx: 350, cy: 90,  delay: "0.5s", bx: -40, by: -20 },
          { cx: 30,  cy: 360, delay: "1s",   bx: 60,  by: 20 },
          { cx: 370, cy: 380, delay: "1.5s", bx: -30, by: 30 },
          { cx: 200, cy: 30,  delay: "0.8s", bx: 0,   by: -40 },
        ].map((p, i) => (
          <g key={i} className="robo-bolt" style={{ ["--bx" as never]: `${p.bx}px`, ["--by" as never]: `${p.by}px`, animationDelay: p.delay, transformOrigin: `${p.cx}px ${p.cy}px`, transformBox: "fill-box" } as React.CSSProperties}>
            <path d={`M ${p.cx} ${p.cy - 6} L ${p.cx + 4} ${p.cy} L ${p.cx} ${p.cy + 6} L ${p.cx - 4} ${p.cy} Z`} fill="#d6ff3a" />
          </g>
        ))}

        {/* ground shadow */}
        <ellipse cx="200" cy="438" rx="80" ry="8" fill="#0a0a0b" className="robo-shadow" />
      </svg>

      {/* the robot itself — composited inside an SVG */}
      <svg viewBox="0 0 400 460" className="relative h-full w-full">
        <defs>
          <linearGradient id="robo-body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f1ea" />
            <stop offset="100%" stopColor="#dcd5c8" />
          </linearGradient>
          <linearGradient id="robo-screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0b" />
            <stop offset="100%" stopColor="#1c1c20" />
          </linearGradient>
          <radialGradient id="robo-heart-grad">
            <stop offset="0%" stopColor="#ff6a3d" stopOpacity="1" />
            <stop offset="60%" stopColor="#ff6a3d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6a3d" stopOpacity="0" />
          </radialGradient>
          <clipPath id="robo-screen-clip">
            <rect x="138" y="252" width="124" height="20" rx="3" />
          </clipPath>
        </defs>

        {/* whole robot body sways together */}
        <g className="robo-body">
          {/* ===== LEGS (outer translate to hip, inner animates) ===== */}
          <g transform="translate(171 370)">
            <g className="robo-leg-l">
              <rect x="-11" y="0" width="22" height="56" rx="4" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
              <rect x="-16" y="50" width="32" height="14" rx="3" fill="#0a0a0b" />
              <circle cx="0" cy="25" r="3" fill="#0a0a0b" />
            </g>
          </g>
          <g transform="translate(229 370)">
            <g className="robo-leg-r">
              <rect x="-11" y="0" width="22" height="56" rx="4" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
              <rect x="-16" y="50" width="32" height="14" rx="3" fill="#0a0a0b" />
              <circle cx="0" cy="25" r="3" fill="#0a0a0b" />
            </g>
          </g>

          {/* ===== TORSO / BODY ===== */}
          <g>
            {/* chest housing */}
            <rect x="130" y="190" width="140" height="180" rx="20" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="2" />
            {/* shoulder bolts */}
            <circle cx="135" cy="206" r="4" fill="#0a0a0b" />
            <circle cx="265" cy="206" r="4" fill="#0a0a0b" />

            {/* chest screen with scrolling text */}
            <rect x="138" y="252" width="124" height="20" rx="3" fill="url(#robo-screen-grad)" />
            <g clipPath="url(#robo-screen-clip)">
              <text className="robo-screen" x="138" y="266" fill="#d6ff3a" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="2">
                ANALYSE · CONVERT · VERIFY · DEPLOY ·
              </text>
            </g>

            {/* LED status panel */}
            <g transform="translate(150 285)">
              <rect width="100" height="12" rx="3" fill="#0a0a0b" />
              <circle cx="14" cy="6" r="3" fill="#ff6a3d" className="robo-led-a" />
              <circle cx="32" cy="6" r="3" fill="#d6ff3a" className="robo-led-b" />
              <circle cx="50" cy="6" r="3" fill="#d6ff3a" className="robo-led-c" />
              <rect x="62" y="3" width="32" height="6" rx="1" fill="#1c1c20" />
              <rect x="64" y="4" width="14" height="4" rx="0.5" fill="#d6ff3a" />
            </g>

            {/* industrial core — gear emblem, not a heart */}
            <g transform="translate(200 330)">
              <circle r="22" fill="url(#robo-heart-grad)" />
              <circle r="14" fill="#0a0a0b" stroke="#ff6a3d" strokeOpacity="0.7" strokeWidth="1" />
              <g className="robo-heart">
                {/* gear teeth */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <rect
                    key={a}
                    x="-1.5"
                    y="-15"
                    width="3"
                    height="4"
                    fill="#ff6a3d"
                    transform={`rotate(${a})`}
                  />
                ))}
                <circle r="6" fill="#ff6a3d" />
                <circle r="2" fill="#0a0a0b" />
              </g>
            </g>

            {/* version plate — adds "legacy hardware" character */}
            <g transform="translate(200 360)" opacity="0.65">
              <rect x="-30" y="0" width="60" height="10" rx="1.5" fill="#0a0a0b" />
              <text x="0" y="7" textAnchor="middle" fill="#dcd5c8" fontFamily="var(--font-geist-mono), monospace" fontSize="6" letterSpacing="2">
                MDRZ-MK1 · 1997
              </text>
            </g>

            {/* rivets — industrial detailing on the chest plate */}
            {[
              [142, 200], [258, 200], [142, 360], [258, 360],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#0a0a0b" opacity="0.5" />
            ))}

            {/* small panel grid lines */}
            <line x1="138" y1="222" x2="262" y2="222" stroke="#0a0a0b" strokeOpacity="0.15" strokeWidth="1" />
            <line x1="138" y1="240" x2="262" y2="240" stroke="#0a0a0b" strokeOpacity="0.15" strokeWidth="1" />
          </g>

          {/* ===== LEFT ARM (outer: positions shoulder, inner: animates) ===== */}
          <g transform="translate(130 210)">
            <g className="robo-arm-l">
              {/* upper arm */}
              <rect x="-9" y="0" width="18" height="60" rx="6" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
              {/* shoulder joint */}
              <circle r="9" fill="#0a0a0b" />
              <circle r="4" fill="#d6ff3a" className="ai-core" style={{ transformOrigin: "center" }} />

              {/* forearm: outer translates to elbow, inner animates */}
              <g transform="translate(0 60)">
                <g className="robo-forearm-l">
                  {/* forearm */}
                  <rect x="-9" y="0" width="18" height="56" rx="6" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
                  {/* elbow joint */}
                  <circle r="8" fill="#0a0a0b" />
                  <circle r="3" fill="#d6ff3a" />

                  {/* HAND — palm + 4 fingers + thumb. Wrist articulates inside .robo-hand-l */}
                  <g transform="translate(0 56)">
                    <g className="robo-hand-l">
                      {/* wrist cuff */}
                      <rect x="-10" y="-4" width="20" height="8" rx="2" fill="#0a0a0b" />
                      {/* palm */}
                      <rect x="-13" y="2" width="26" height="22" rx="9" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
                      {/* glow center on palm */}
                      <circle cx="0" cy="13" r="4" fill="#d6ff3a" />
                      {/* four fingers */}
                      <rect x="-11" y="20" width="5" height="14" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="-4"  y="22" width="5" height="16" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="3"   y="22" width="5" height="16" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="10"  y="20" width="5" height="14" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      {/* thumb — sticks out toward the body (to the right of left hand) */}
                      <rect x="13" y="6" width="10" height="5" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* ===== RIGHT ARM ===== */}
          <g transform="translate(270 210)">
            <g className="robo-arm-r">
              <rect x="-9" y="0" width="18" height="60" rx="6" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
              <circle r="9" fill="#0a0a0b" />
              <circle r="4" fill="#d6ff3a" className="ai-core" style={{ transformOrigin: "center" }} />

              <g transform="translate(0 60)">
                <g className="robo-forearm-r">
                  <rect x="-9" y="0" width="18" height="56" rx="6" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
                  <circle r="8" fill="#0a0a0b" />
                  <circle r="3" fill="#d6ff3a" />

                  <g transform="translate(0 56)">
                    <g className="robo-hand-r">
                      <rect x="-10" y="-4" width="20" height="8" rx="2" fill="#0a0a0b" />
                      <rect x="-13" y="2" width="26" height="22" rx="9" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.6" />
                      <circle cx="0" cy="13" r="4" fill="#d6ff3a" />
                      <rect x="-11" y="20" width="5" height="14" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="-4"  y="22" width="5" height="16" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="3"   y="22" width="5" height="16" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      <rect x="10"  y="20" width="5" height="14" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                      {/* thumb on right arm — sticks out to the LEFT (toward body) */}
                      <rect x="-23" y="6" width="10" height="5" rx="2" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="1.4" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* ===== HEAD ===== */}
          <g className="robo-head">
            {/* neck */}
            <rect x="184" y="178" width="32" height="18" rx="4" fill="#1c1c20" />
            <line x1="184" y1="186" x2="216" y2="186" stroke="#0a0a0b" strokeOpacity="0.6" strokeWidth="1" />

            {/* antenna */}
            <g className="robo-antenna" style={{ transformOrigin: "200px 100px", transformBox: "view-box" } as React.CSSProperties}>
              <line x1="200" y1="100" x2="200" y2="60" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" />
              <circle cx="200" cy="56" r="6" fill="#ff6a3d" className="ai-core" style={{ transformOrigin: "200px 56px", transformBox: "view-box" } as React.CSSProperties} />
              <circle cx="200" cy="56" r="10" fill="none" stroke="#ff6a3d" strokeOpacity="0.6" className="signal-ping" style={{ transformOrigin: "200px 56px", transformBox: "view-box" } as React.CSSProperties} />
            </g>

            {/* head shell */}
            <rect x="140" y="100" width="120" height="90" rx="22" fill="url(#robo-body-grad)" stroke="#0a0a0b" strokeWidth="2" />
            {/* face plate */}
            <rect x="148" y="118" width="104" height="58" rx="14" fill="url(#robo-screen-grad)" />

            {/* eyes */}
            <g>
              <ellipse cx="174" cy="146" rx="11" ry="11" fill="#d6ff3a" className="robo-eye" />
              <circle cx="174" cy="146" r="4" fill="#0a0a0b" />
              <ellipse cx="226" cy="146" rx="11" ry="11" fill="#d6ff3a" className="robo-eye" style={{ animationDelay: "0.1s" }} />
              <circle cx="226" cy="146" r="4" fill="#0a0a0b" />
            </g>

            {/* status indicator slot — serious, machine-like */}
            <g transform="translate(186 166)">
              <rect width="28" height="6" rx="1.5" fill="#0a0a0b" />
              <rect x="2" y="1.5" width="24" height="3" rx="0.5" fill="#ff6a3d" className="robo-mouth" />
            </g>

            {/* ear bolts */}
            <circle cx="142" cy="145" r="4" fill="#0a0a0b" />
            <circle cx="258" cy="145" r="4" fill="#0a0a0b" />
          </g>
        </g>
      </svg>

      {/* HUD label below robot */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink/55 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
        <span className="ai-flicker">legacy · unit 04</span>
        <span className="text-ink/30">/ awaiting upgrade</span>
      </div>
    </div>
  );
}
