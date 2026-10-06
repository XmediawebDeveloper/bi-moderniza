/**
 * CodeFactory — animated factory floor section.
 *
 * A wide industrial scene where legacy code files ride a conveyor belt
 * through three processing stations (Analyse → Convert → Verify) and exit
 * as modern code. An operator-bot at a START console oversees the line.
 *
 * Scene composition (viewBox 1200 x 520):
 *   • Dark factory backdrop with perspective vanishing point and ceiling light strips
 *   • Industrial pipes & signage at the top
 *   • Operator robot at a glowing START panel
 *   • Three station bays — each with an overhead robotic arm performing
 *     a different task (scanner beam, hammer/sparks, stamp/tick)
 *   • A conveyor belt with treadles that scroll continuously
 *   • Code crates that travel left → right and visibly change colour as
 *     they pass each station (red → orange → lime → cyan)
 *   • Output bay on the far right where finished crates stack up
 *   • Warning-stripe floor and status panels above the line
 *
 * Pure SVG + CSS keyframes (see globals.css "CODE FACTORY" block).
 * SSR-safe; no client-only APIs used.
 */

const ARMS = [
  // [x, label, color]
  { x: 380, label: "ANALYSE", c: "#22d3ee" },
  { x: 620, label: "CONVERT", c: "#ff6a3d" },
  { x: 860, label: "VERIFY",  c: "#d6ff3a" },
];

export default function CodeFactory({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Moderniza code factory — assembly line"
      className={`relative overflow-hidden bg-ink text-chalk ${className}`}
    >
      {/* ambient gradients */}
      <div className="cf-bg-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-8 py-20 md:py-28">
        {/* eyebrow + title */}
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
          <span aria-hidden className="h-2 w-2 rounded-full bg-glow pulse-dot" />
          <span className="font-mono">/ Live · The Factory</span>
          <span className="h-px flex-1 bg-glow/30" />
        </div>

        <h2 className="mt-8 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.02em]">
          Legacy in, modern out — <span className="text-gradient">on a moving belt.</span>
        </h2>

        <p className="mt-6 max-w-[60ch] text-lg text-chalk/75 leading-relaxed">
          Every project rides the same line. Files enter on the left, get scanned, rewritten and verified
          by three stations, and roll off the other end as production-ready code.
        </p>

        {/* THE FACTORY SVG */}
        <div className="cf-stage">
          <svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" className="cf-svg">
            <defs>
              <linearGradient id="cf-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#1a1f28" />
                <stop offset="100%" stopColor="#0a0a0b" />
              </linearGradient>
              <linearGradient id="cf-wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#10151c" />
                <stop offset="100%" stopColor="#1a1f28" />
              </linearGradient>
              <linearGradient id="cf-belt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#3a4250" />
                <stop offset="50%" stopColor="#2a323e" />
                <stop offset="100%" stopColor="#1a1f28" />
              </linearGradient>
              <linearGradient id="cf-arm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#ff8b5a" />
                <stop offset="60%" stopColor="#ff6a3d" />
                <stop offset="100%" stopColor="#c14a25" />
              </linearGradient>
              <linearGradient id="cf-chrome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#f5f8fc" />
                <stop offset="50%" stopColor="#9aa3b0" />
                <stop offset="100%" stopColor="#5a6470" />
              </linearGradient>
              <radialGradient id="cf-warn" cx="50%" cy="50%">
                <stop offset="0%"  stopColor="#fff" />
                <stop offset="40%" stopColor="#d6ff3a" />
                <stop offset="100%" stopColor="#d6ff3a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cf-spark" cx="50%" cy="50%">
                <stop offset="0%"  stopColor="#fff" />
                <stop offset="40%" stopColor="#ff6a3d" />
                <stop offset="100%" stopColor="#ff2d6f" stopOpacity="0" />
              </radialGradient>
              <pattern id="cf-stripe" width="32" height="14" patternUnits="userSpaceOnUse">
                <rect width="32" height="14" fill="#0a0a0b" />
                <path d="M0 14 L 14 0 L 32 0 L 18 14 Z" fill="#d6ff3a" opacity="0.6" />
              </pattern>
            </defs>

            {/* BACK WALL */}
            <rect x="0" y="0" width="1200" height="380" fill="url(#cf-wall)" />

            {/* perspective vanishing lines */}
            <g opacity="0.18">
              <line x1="0"    y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="200"  y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="400"  y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="800"  y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="1000" y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="1200" y1="0"   x2="600" y2="380" stroke="#3a4250" strokeWidth="1" />
              <line x1="0"    y1="100" x2="1200" y2="100" stroke="#3a4250" strokeWidth="1" />
              <line x1="0"    y1="200" x2="1200" y2="200" stroke="#3a4250" strokeWidth="1" />
            </g>

            {/* CEILING LIGHT STRIPS */}
            <g>
              <rect x="100" y="40"  width="220" height="14" rx="3" fill="#1a1f28" stroke="#3a4250" />
              <rect x="105" y="44"  width="210" height="6"  rx="2" fill="#fff" opacity="0.85" className="cf-light cf-light-1" />
              <rect x="450" y="40"  width="300" height="14" rx="3" fill="#1a1f28" stroke="#3a4250" />
              <rect x="455" y="44"  width="290" height="6"  rx="2" fill="#fff" opacity="0.85" className="cf-light cf-light-2" />
              <rect x="880" y="40"  width="220" height="14" rx="3" fill="#1a1f28" stroke="#3a4250" />
              <rect x="885" y="44"  width="210" height="6"  rx="2" fill="#fff" opacity="0.85" className="cf-light cf-light-3" />
            </g>

            {/* CEILING PIPES */}
            <g>
              <rect x="0" y="68" width="1200" height="6" fill="#3a4250" />
              <circle cx="220" cy="71" r="6" fill="#5a6470" />
              <circle cx="600" cy="71" r="6" fill="#5a6470" />
              <circle cx="980" cy="71" r="6" fill="#5a6470" />
              <rect x="0" y="82" width="1200" height="3" fill="#1a1f28" />
            </g>

            {/* TOP SIGNAGE — moved into the ceiling band so it doesn't clash with station labels */}
            <g transform="translate(440 12)">
              <rect x="0" y="0" width="320" height="22" rx="4" fill="#0a0a0b" stroke="#d6ff3a" strokeWidth="1.2" />
              <text x="160" y="15" textAnchor="middle" fill="#d6ff3a" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fontWeight="700" letterSpacing="2.4">
                MODERNIZA · CODE LINE 04
              </text>
              <circle cx="14"  cy="11" r="3" fill="#d6ff3a" className="cf-led cf-led-a" />
              <circle cx="306" cy="11" r="3" fill="#ff6a3d" className="cf-led cf-led-b" />
            </g>

            {/* STATION ARM RAILS — overhead frame holding robotic arms */}
            <rect x="0" y="160" width="1200" height="6" fill="#3a4250" />
            <rect x="0" y="156" width="1200" height="2" fill="#1a1f28" />

            {/* STATUS PANELS above each station */}
            {ARMS.map((a) => (
              <g key={a.label} transform={`translate(${a.x - 60} 116)`}>
                <rect x="0" y="0" width="120" height="28" rx="4" fill="#0e1622" stroke="#3a4250" />
                <text x="60" y="12" textAnchor="middle" fill={a.c} fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="2.4" fontWeight="700">
                  {a.label}
                </text>
                {/* mini bar chart */}
                <g transform="translate(8 16)">
                  {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
                    <rect
                      key={i}
                      x={i * 8}
                      y={0}
                      width="6"
                      height="10"
                      rx="1"
                      fill={a.c}
                      opacity="0.4"
                      className={`cf-bar cf-bar-${(i % 4) + 1}`}
                    />
                  ))}
                </g>
              </g>
            ))}

            {/* ROBOTIC ARMS — three overhead, each at a station */}
            {ARMS.map((a, idx) => (
              <g key={a.label + "arm"} transform={`translate(${a.x} 162)`}>
                {/* arm mount on rail */}
                <rect x="-22" y="-6" width="44" height="14" rx="3" fill="#1a1f28" stroke="#3a4250" />
                <circle cx="0" cy="6" r="6" fill="#3a4250" />
                {/* arm — pivoting */}
                <g className={`cf-arm-pivot cf-arm-${idx + 1}`}>
                  {/* upper arm */}
                  <rect x="-10" y="6" width="20" height="78" rx="6" fill="url(#cf-arm)" stroke="#0a0a0b" strokeWidth="1.5" />
                  <circle cx="0" cy="84" r="9" fill="#1a1f28" stroke="#0a0a0b" />
                  {/* forearm w/ tool */}
                  <g transform="translate(0 84)">
                    <g className={`cf-forearm cf-forearm-${idx + 1}`}>
                      <rect x="-8" y="0" width="16" height="62" rx="5" fill="url(#cf-arm)" stroke="#0a0a0b" strokeWidth="1.5" />
                      {/* tool tip — different per station */}
                      {idx === 0 && (
                        <g transform="translate(0 64)">
                          {/* scanner head — emits beam */}
                          <rect x="-14" y="0" width="28" height="14" rx="3" fill="#1a1f28" stroke="#22d3ee" strokeWidth="1.5" />
                          <circle cx="0" cy="7" r="3" fill="#22d3ee" />
                          <rect x="-2" y="14" width="4" height="120" fill="#22d3ee" opacity="0.4" className="cf-beam" />
                        </g>
                      )}
                      {idx === 1 && (
                        <g transform="translate(0 62)">
                          {/* hammer / forge head */}
                          <rect x="-16" y="0" width="32" height="18" rx="3" fill="#1a1f28" stroke="#ff6a3d" strokeWidth="1.5" />
                          <rect x="-22" y="14" width="44" height="10" rx="2" fill="#5a6470" stroke="#0a0a0b" />
                          <circle cx="0" cy="9" r="3" fill="#ff6a3d" className="cf-led cf-led-c" />
                        </g>
                      )}
                      {idx === 2 && (
                        <g transform="translate(0 62)">
                          {/* stamp head with tick */}
                          <rect x="-14" y="0" width="28" height="14" rx="3" fill="#1a1f28" stroke="#d6ff3a" strokeWidth="1.5" />
                          <rect x="-12" y="14" width="24" height="14" rx="2" fill="#d6ff3a" />
                          <path d="M-7 21 L-2 26 L7 17" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      )}
                    </g>
                  </g>
                </g>
                {/* station floor markers */}
                <rect x="-60" y="220" width="120" height="3" fill={a.c} opacity="0.45" />
              </g>
            ))}

            {/* FORGE SPARKS at CONVERT station */}
            <g transform="translate(620 320)" aria-hidden>
              {Array.from({ length: 10 }).map((_, i) => (
                <circle
                  key={i}
                  cx={0}
                  cy={0}
                  r="2.5"
                  fill="url(#cf-spark)"
                  className={`cf-spark cf-spark-${i + 1}`}
                />
              ))}
              {/* glow halo */}
              <circle cx="0" cy="0" r="22" fill="url(#cf-spark)" opacity="0.55" className="cf-forge-glow" />
            </g>

            {/* SCAN BEAM at ANALYSE station — wide cyan rectangle */}
            <rect x="356" y="244" width="48" height="80" fill="#22d3ee" opacity="0.18" className="cf-beam-wide" />

            {/* TICK STAMP shadow at VERIFY */}
            <ellipse cx="860" cy="328" rx="22" ry="4" fill="#d6ff3a" opacity="0.35" className="cf-stamp-shadow" />

            {/* CONVEYOR BELT — main track */}
            <g>
              {/* belt body */}
              <rect x="60" y="320" width="1080" height="44" rx="4" fill="url(#cf-belt)" stroke="#0a0a0b" strokeWidth="1.5" />
              {/* belt rollers */}
              <circle cx="80"   cy="342" r="14" fill="#5a6470" stroke="#0a0a0b" />
              <circle cx="80"   cy="342" r="6"  fill="#1a1f28" />
              <circle cx="1120" cy="342" r="14" fill="#5a6470" stroke="#0a0a0b" />
              <circle cx="1120" cy="342" r="6"  fill="#1a1f28" />
              {/* moving treadle pattern — uses pattern shifted via animation */}
              <g className="cf-belt-treadles">
                {Array.from({ length: 60 }).map((_, i) => (
                  <rect key={i} x={70 + i * 22} y="332" width="12" height="20" rx="2" fill="#0a0a0b" opacity="0.55" />
                ))}
              </g>
              {/* belt support legs */}
              <rect x="110" y="362" width="14" height="58" fill="#3a4250" />
              <rect x="380" y="362" width="14" height="58" fill="#3a4250" />
              <rect x="620" y="362" width="14" height="58" fill="#3a4250" />
              <rect x="860" y="362" width="14" height="58" fill="#3a4250" />
              <rect x="1080" y="362" width="14" height="58" fill="#3a4250" />
            </g>

            {/* FLOOR — warning stripes */}
            <rect x="0" y="380" width="1200" height="140" fill="url(#cf-floor)" />
            <rect x="0" y="380" width="1200" height="14" fill="url(#cf-stripe)" />
            <rect x="0" y="506" width="1200" height="14" fill="url(#cf-stripe)" />

            {/* OPERATOR ROBOT — beside the belt, scaled down so the line stays visible */}
            <g transform="translate(180 280) scale(0.7)">
              {/* console body */}
              <rect x="-46" y="40" width="92" height="74" rx="6" fill="#1a1f28" stroke="#3a4250" strokeWidth="1.5" />
              {/* console top — angled */}
              <path d="M-46 40 L 46 40 L 46 28 L -34 28 Z" fill="#0a0a0b" stroke="#3a4250" strokeWidth="1.5" />
              {/* START button */}
              <circle cx="0" cy="56" r="14" fill="#0a0a0b" stroke="#d6ff3a" strokeWidth="1.5" />
              <circle cx="0" cy="56" r="10" fill="#d6ff3a" className="cf-start-btn" />
              <text x="0" y="60" textAnchor="middle" fill="#0a0a0b" fontFamily="var(--font-geist-mono), monospace" fontSize="9" fontWeight="900" letterSpacing="1.5">START</text>
              {/* console mini-screen */}
              <rect x="-40" y="76" width="32" height="20" rx="2" fill="url(#cf-belt)" />
              <rect x="-37" y="80" width="22" height="2" rx="1" fill="#22d3ee" className="cf-led cf-led-a" />
              <rect x="-37" y="84" width="14" height="2" rx="1" fill="#d6ff3a" />
              <rect x="-37" y="88" width="18" height="2" rx="1" fill="#ff6a3d" />
              {/* indicator LEDs */}
              <circle cx="22" cy="80" r="3" fill="#d6ff3a" className="cf-led cf-led-b" />
              <circle cx="32" cy="80" r="3" fill="#ff6a3d" className="cf-led cf-led-c" />

              {/* worker robot body — sits behind console */}
              <g className="cf-worker">
                {/* body */}
                <rect x="-30" y="-50" width="60" height="60" rx="10" fill="#f5f8fc" stroke="#0a0a0b" strokeWidth="1.5" />
                {/* hi-vis vest */}
                <path d="M-30 -28 L -30 10 L 30 10 L 30 -28 L 14 -28 L 0 -22 L -14 -28 Z" fill="#ff6a3d" stroke="#0a0a0b" strokeWidth="1.5" />
                <rect x="-30" y="-12" width="60" height="3" fill="#fff" />
                {/* head */}
                <ellipse cx="0" cy="-58" rx="22" ry="22" fill="#f5f8fc" stroke="#0a0a0b" strokeWidth="1.5" />
                {/* hard hat */}
                <path d="M-22 -64 Q -22 -88 0 -88 Q 22 -88 22 -64 L 22 -58 L -22 -58 Z" fill="#d6ff3a" stroke="#0a0a0b" strokeWidth="1.5" />
                <rect x="-26" y="-60" width="52" height="4" rx="1" fill="#d6ff3a" stroke="#0a0a0b" strokeWidth="1.2" />
                {/* face — eyes blink */}
                <ellipse cx="-7" cy="-55" rx="2.5" ry="3" fill="#0a0a0b" className="cf-worker-eye" />
                <ellipse cx="7"  cy="-55" rx="2.5" ry="3" fill="#0a0a0b" className="cf-worker-eye" style={{ animationDelay: "0.05s" }} />
                {/* mouth */}
                <path d="M-5 -47 Q 0 -44 5 -47" stroke="#0a0a0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* arm — points to button */}
                <g className="cf-worker-arm">
                  <rect x="20" y="-20" width="14" height="34" rx="6" fill="#f5f8fc" stroke="#0a0a0b" strokeWidth="1.5" />
                  <circle cx="34" cy="14" r="6" fill="#f5f8fc" stroke="#0a0a0b" strokeWidth="1.5" />
                </g>
              </g>
            </g>

            {/* INPUT BAY (left) — stack of legacy files */}
            <g transform="translate(96 280)">
              <rect x="-28" y="0" width="56" height="40" rx="3" fill="#0a0a0b" stroke="#ff6a3d" strokeWidth="1.5" />
              <text x="0" y="16" textAnchor="middle" fill="#ff6a3d" fontFamily="var(--font-geist-mono), monospace" fontSize="7" fontWeight="700" letterSpacing="1.4">LEGACY</text>
              <rect x="-22" y="22" width="44" height="4" fill="#ff8b5a" />
              <rect x="-22" y="28" width="44" height="4" fill="#ff8b5a" opacity="0.7" />
              <rect x="-22" y="34" width="44" height="4" fill="#ff8b5a" opacity="0.5" />
            </g>

            {/* OUTPUT BAY (right) — stack of modern files */}
            <g transform="translate(1100 280)">
              <rect x="-28" y="0" width="56" height="40" rx="3" fill="#0a0a0b" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="0" y="16" textAnchor="middle" fill="#22d3ee" fontFamily="var(--font-geist-mono), monospace" fontSize="7" fontWeight="700" letterSpacing="1.4">MODERN</text>
              <rect x="-22" y="22" width="44" height="4" fill="#d6ff3a" />
              <rect x="-22" y="28" width="44" height="4" fill="#22d3ee" />
              <rect x="-22" y="34" width="44" height="4" fill="#7c3aed" />
              {/* output pulse */}
              <circle cx="0" cy="20" r="32" fill="url(#cf-warn)" opacity="0.45" className="cf-output-pulse" />
            </g>

            {/* STEAM/SMOKE rising from convert station */}
            <g transform="translate(620 240)" aria-hidden>
              {Array.from({ length: 4 }).map((_, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="0"
                  r="14"
                  fill="#fff"
                  opacity="0.18"
                  className={`cf-smoke cf-smoke-${i + 1}`}
                />
              ))}
            </g>

            {/* CODE CRATES — rendered last so they always sit on top of the belt
                regardless of operator/bay z-order. Six crates with staggered
                negative animation-delays so they're visible across the whole line. */}
            <g className="cf-crate-track">
              {Array.from({ length: 6 }).map((_, i) => (
                <CodeCrate key={i} index={i} />
              ))}
            </g>

            {/* HUD bottom — operator metrics */}
            <g transform="translate(60 460)" opacity="0.95">
              <text x="0" y="0" fill="#d6ff3a" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="2" fontWeight="700">
                ● ONLINE
              </text>
              <text x="100" y="0" fill="#f5f1ea" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="1.5" opacity="0.7">
                throughput · 312 fns / min
              </text>
              <text x="380" y="0" fill="#f5f1ea" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="1.5" opacity="0.7">
                drift · 0
              </text>
              <text x="500" y="0" fill="#22d3ee" fontFamily="var(--font-geist-mono), monospace" fontSize="11" letterSpacing="1.5">
                verified · 100%
              </text>
            </g>
          </svg>
        </div>

        {/* legend below */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 font-mono">Station 01</div>
            <div className="mt-2 font-semibold text-chalk">Analyse</div>
            <p className="mt-1 text-chalk/65">Each crate is scanned for intent, types and call-graph before it moves on.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ember font-mono">Station 02</div>
            <div className="mt-2 font-semibold text-chalk">Convert</div>
            <p className="mt-1 text-chalk/65">The forge rewrites it in your target stack — sparks visible, contracts honoured.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-glow font-mono">Station 03</div>
            <div className="mt-2 font-semibold text-chalk">Verify</div>
            <p className="mt-1 text-chalk/65">A stamping arm signs off only when behaviour matches the original — no exceptions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A single code crate riding the conveyor belt — six are spawned with staggered delays. */
function CodeCrate({ index }: { index: number }) {
  return (
    <g
      className={`cf-crate cf-crate-${index + 1}`}
      style={{ ["--cf-d" as never]: `${-index * 2.5}s` } as React.CSSProperties}
    >
      {/* glow halo */}
      <ellipse cx="0" cy="22" rx="28" ry="5" className="cf-crate-glow" />
      {/* crate body — larger and bolder */}
      <rect x="-26" y="-22" width="52" height="42" rx="5" className="cf-crate-body" stroke="#0a0a0b" strokeWidth="2" />
      {/* lid stripe */}
      <rect x="-26" y="-22" width="52" height="8" className="cf-crate-lid" />
      {/* dark file area */}
      <rect x="-12" y="-10" width="24" height="24" rx="2" fill="#0a0a0b" opacity="0.55" />
      {/* file lines */}
      <rect x="-9" y="-6" width="18" height="2" rx="1" fill="#fff" opacity="0.85" />
      <rect x="-9" y="-2" width="14" height="2" rx="1" fill="#fff" opacity="0.65" />
      <rect x="-9" y="2"  width="16" height="2" rx="1" fill="#fff" opacity="0.65" />
      <rect x="-9" y="6"  width="10" height="2" rx="1" fill="#fff" opacity="0.55" />
      {/* lang label on lid */}
      <text className="cf-crate-tag" x="0" y="-15" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="7" fontWeight="800" letterSpacing="1.2">SRC</text>
    </g>
  );
}
