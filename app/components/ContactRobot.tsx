/**
 * ContactRobot — chrome humanoid mech holding an animated laptop.
 *
 * Originally built for the contact hero, now reused across every page hero
 * via a `variant` prop. Each variant changes:
 *   - the HUD pill at the top (UNIT · NN / something-bot)
 *   - the cycling speech bubbles
 *   - the laptop's three screen slides (page-relevant content)
 *   - the foot label
 *
 * The body, head, antenna, arms, hands and laptop chassis are identical
 * across variants — only the laptop's screen content and reactions change.
 */

export type RobotVariant =
  | "form"      // contact/start — listening / form / confirmation
  | "chat"      // contact/call  — calendar / pick a slot / confirmed
  | "scan"      // why, process/discover — code analysis
  | "blueprint" // what, process/define — plan / four verbs
  | "ship"      // process/deliver, work/* — deploy / live
  | "team"      // who — meet the crew
  | "shield";   // enterprises — compliance / locked

const VARIANT_META: Record<RobotVariant, {
  hud: string;
  foot: string;
  bubbles: { txt: string; delay: string }[];
}> = {
  form: {
    hud: "UNIT · 04 / contact-bot",
    foot: "moderniza · ready to chat",
    bubbles: [
      { txt: "Hi there 👋", delay: "0s" },
      { txt: "Listening…",  delay: "3s" },
      { txt: "Got it ✓",    delay: "6s" },
      { txt: "On it 🚀",    delay: "9s" },
    ],
  },
  chat: {
    hud: "UNIT · 05 / call-bot",
    foot: "moderniza · on the line",
    bubbles: [
      { txt: "Hello! ☎",     delay: "0s" },
      { txt: "Pick a slot",  delay: "3s" },
      { txt: "Calendar set", delay: "6s" },
      { txt: "See you soon", delay: "9s" },
    ],
  },
  scan: {
    hud: "UNIT · 06 / scan-bot",
    foot: "moderniza · scanning",
    bubbles: [
      { txt: "Reading code…",   delay: "0s" },
      { txt: "1.2k symbols",    delay: "3s" },
      { txt: "Mapped ✓",        delay: "6s" },
      { txt: "Blueprint ready", delay: "9s" },
    ],
  },
  blueprint: {
    hud: "UNIT · 07 / plan-bot",
    foot: "moderniza · drafting",
    bubbles: [
      { txt: "Drafting ✍",  delay: "0s" },
      { txt: "Four verbs",  delay: "3s" },
      { txt: "Stack picked", delay: "6s" },
      { txt: "Plan ready",  delay: "9s" },
    ],
  },
  ship: {
    hud: "UNIT · 08 / ship-bot",
    foot: "moderniza · deploying",
    bubbles: [
      { txt: "Build ✓",       delay: "0s" },
      { txt: "Verified",      delay: "3s" },
      { txt: "Going live 🚀", delay: "6s" },
      { txt: "v4.2.0 live",   delay: "9s" },
    ],
  },
  team: {
    hud: "UNIT · 09 / crew-bot",
    foot: "moderniza · meet the crew",
    bubbles: [
      { txt: "Hi crew 👋",  delay: "0s" },
      { txt: "Senior team", delay: "3s" },
      { txt: "Hands-on",    delay: "6s" },
      { txt: "Let's build", delay: "9s" },
    ],
  },
  shield: {
    hud: "UNIT · 10 / vault-bot",
    foot: "moderniza · enterprise-ready",
    bubbles: [
      { txt: "Locked 🔒",     delay: "0s" },
      { txt: "SOC-2 ✓",       delay: "3s" },
      { txt: "ISO 27001 ✓",   delay: "6s" },
      { txt: "All green",     delay: "9s" },
    ],
  },
};

export default function ContactRobot({
  variant = "form",
  className = "",
}: {
  variant?: RobotVariant;
  className?: string;
}) {
  const meta = VARIANT_META[variant];
  return (
    <div aria-hidden className={`cr-wrap ${className}`} role="img">
      {/* aura behind */}
      <div className="cr-aura" />
      <div className="cr-grid" />

      {/* floating data motes */}
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className={`cr-mote cr-mote-${i + 1}`} />
      ))}

      {/* HUD label top */}
      <div className="cr-hud-top">
        <span className="cr-hud-dot" />
        <span>{meta.hud}</span>
      </div>

      {/* Cycling speech bubbles — reactions */}
      <div className="cr-speech-stack">
        {meta.bubbles.map((b) => (
          <div
            key={b.txt}
            className="cr-speech"
            style={{ animationDelay: b.delay }}
          >
            {b.txt}
            <span className="cr-speech-tail" />
          </div>
        ))}
      </div>

      <svg viewBox="0 0 400 540" className="cr-svg hb-svg">
        <defs>
          {/* main body — vibrant cyan-to-teal */}
          <linearGradient id="hb-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#a8f5ff" />
            <stop offset="45%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5b8" />
          </linearGradient>
          {/* belly highlight */}
          <radialGradient id="hb-belly" cx="35%" cy="30%">
            <stop offset="0%"  stopColor="rgba(255, 255, 255, 0.55)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          {/* antenna heart */}
          <linearGradient id="hb-heart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#ffb8de" />
            <stop offset="100%" stopColor="#ff2d6f" />
          </linearGradient>
          {/* hologram surface */}
          <linearGradient id="hb-holo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(34, 211, 238, 0.55)" />
            <stop offset="50%"  stopColor="rgba(124, 58, 237, 0.50)" />
            <stop offset="100%" stopColor="rgba(255, 45, 111, 0.40)" />
          </linearGradient>
          {/* hologram beam */}
          <linearGradient id="hb-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.45)" />
          </linearGradient>
          {/* metal / chassis accent — slightly darker teal for plates */}
          <linearGradient id="hb-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0ea5b8" />
            <stop offset="100%" stopColor="#076b78" />
          </linearGradient>
          {/* clip path for hologram screen content — same coords as before
              so all VariantSlides keep working without modification */}
          <clipPath id="cr-screen-clip">
            <rect x="86" y="350" width="228" height="120" rx="4" />
          </clipPath>
        </defs>

        {/* ground glow + soft shadow */}
        <ellipse cx="200" cy="510" rx="120" ry="10" fill="#22d3ee" opacity="0.30" className="hb-glow" />
        <ellipse cx="200" cy="516" rx="80"  ry="5"  fill="#0a0a0b" opacity="0.45" className="hb-shadow" />

        {/* floating decorations behind the bot — hearts/stars/sparkles */}
        <g aria-hidden>
          {[
            { type: "heart", x:  60, y: 110, c: "#ff79c6", s: 8,  d: 0   },
            { type: "star",  x: 340, y:  90, c: "#d6ff3a", s: 9,  d: 0.6 },
            { type: "spark", x:  44, y: 280, c: "#fff",    s: 5,  d: 1.2 },
            { type: "heart", x: 360, y: 250, c: "#ff2d6f", s: 7,  d: 1.8 },
            { type: "star",  x: 200, y:  20, c: "#fff",    s: 6,  d: 0.3 },
            { type: "spark", x: 360, y: 410, c: "#d6ff3a", s: 6,  d: 0.9 },
            { type: "heart", x:  46, y: 410, c: "#ff79c6", s: 7,  d: 1.5 },
            { type: "star",  x: 350, y: 510, c: "#22d3ee", s: 7,  d: 2.1 },
          ].map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y})`} className={`hb-floater hb-floater-${i + 1}`}>
              {m.type === "heart" && (
                <path
                  d={`M0 ${-m.s * 0.3} C ${-m.s * 0.4} ${-m.s} ${-m.s} ${-m.s * 0.6} ${-m.s * 0.6} ${-m.s * 0.1} L 0 ${m.s * 0.7} L ${m.s * 0.6} ${-m.s * 0.1} C ${m.s} ${-m.s * 0.6} ${m.s * 0.4} ${-m.s} 0 ${-m.s * 0.3} Z`}
                  fill={m.c}
                  stroke="#0a0a0b"
                  strokeWidth="1"
                />
              )}
              {m.type === "star" && (
                <path
                  d={`M0 ${-m.s} L ${m.s * 0.3} ${-m.s * 0.3} L ${m.s} 0 L ${m.s * 0.3} ${m.s * 0.3} L 0 ${m.s} L ${-m.s * 0.3} ${m.s * 0.3} L ${-m.s} 0 L ${-m.s * 0.3} ${-m.s * 0.3} Z`}
                  fill={m.c}
                />
              )}
              {m.type === "spark" && <circle r={m.s * 0.5} fill={m.c} />}
            </g>
          ))}
        </g>

        {/* whole humanoid bot floats slightly */}
        <g className="hb-float">
          {/* ANTENNA + HEART — cute pink heart on top of head */}
          <g className="hb-antenna">
            <line x1="200" y1="60" x2="200" y2="28" stroke="#0a0a0b" strokeWidth="3" strokeLinecap="round" />
            <g className="hb-heart-bob">
              <path
                d="M200 14 C 192 4 174 8 180 22 C 184 32 200 46 200 46 C 200 46 216 32 220 22 C 226 8 208 4 200 14 Z"
                fill="url(#hb-heart)"
                stroke="#0a0a0b"
                strokeWidth="2"
              />
              <ellipse cx="190" cy="16" rx="3" ry="2" fill="#fff" opacity="0.85" />
            </g>
            <circle cx="200" cy="24" r="22" fill="none" stroke="#ff79c6" strokeOpacity="0.45" strokeWidth="1.5" className="hb-heart-ping" />
          </g>

          {/* ===== LEGS (drawn first so torso overlaps top of legs) ===== */}
          <g className="hb-legs">
            {/* left leg */}
            <g className="hb-leg-l">
              <rect x="155" y="320" width="32" height="120" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
              <ellipse cx="171" cy="445" rx="22" ry="11" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="3" />
              <rect x="158" y="356" width="26" height="3" rx="1" fill="#0a0a0b" opacity="0.25" />
            </g>
            {/* right leg */}
            <g className="hb-leg-r">
              <rect x="213" y="320" width="32" height="120" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
              <ellipse cx="229" cy="445" rx="22" ry="11" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="3" />
              <rect x="216" y="356" width="26" height="3" rx="1" fill="#0a0a0b" opacity="0.25" />
            </g>
          </g>

          {/* ===== TORSO ===== */}
          <g className="hb-body">
            {/* main rounded torso — slightly hourglass */}
            <path
              d="M132 218 Q 132 200 158 200 L 242 200 Q 268 200 268 218 L 268 322 Q 268 340 246 340 L 154 340 Q 132 340 132 322 Z"
              fill="url(#hb-body)"
              stroke="#0a0a0b"
              strokeWidth="3"
            />
            {/* belly highlight */}
            <path
              d="M148 218 Q 148 210 162 210 L 232 210 Q 250 210 250 218 L 250 305 Q 250 322 234 322 L 166 322 Q 148 322 148 305 Z"
              fill="url(#hb-belly)"
            />
            {/* shoulder seam */}
            <line x1="132" y1="220" x2="268" y2="220" stroke="#0a0a0b" strokeWidth="2" opacity="0.25" />
            {/* hip seam */}
            <line x1="148" y1="320" x2="252" y2="320" stroke="#0a0a0b" strokeWidth="2" opacity="0.25" />

            {/* CHEST PLATE — dark window with belly heart */}
            <g transform="translate(200 270)">
              <rect x="-30" y="-26" width="60" height="52" rx="10" fill="#0a0a0b" stroke="#0ea5b8" strokeWidth="2" />
              {/* heart medallion */}
              <path
                d="M0 -10 C -7 -18 -20 -14 -14 -2 C -10 6 0 14 0 14 C 0 14 10 6 14 -2 C 20 -14 7 -18 0 -10 Z"
                fill="#ff79c6"
                stroke="#0a0a0b"
                strokeWidth="1.5"
                className="hb-belly-heart"
              />
              {/* tiny LEDs in chest plate */}
              <circle cx="-22" cy="-18" r="2" fill="#d6ff3a" className="hb-led" />
              <circle cx="22"  cy="-18" r="2" fill="#ff6a3d" className="hb-led" style={{ animationDelay: "0.4s" }} />
            </g>
          </g>

          {/* ===== NECK ===== */}
          <g>
            <rect x="178" y="178" width="44" height="26" rx="4" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="2.5" />
            <line x1="178" y1="186" x2="222" y2="186" stroke="#0a0a0b" opacity="0.4" strokeWidth="1" />
            <line x1="178" y1="194" x2="222" y2="194" stroke="#0a0a0b" opacity="0.4" strokeWidth="1" />
          </g>

          {/* ===== HEAD ===== */}
          <g className="hb-head">
            {/* head dome */}
            <ellipse cx="200" cy="115" rx="78" ry="72" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
            {/* head highlight */}
            <ellipse cx="170" cy="78" rx="32" ry="16" fill="rgba(255,255,255,0.55)" />

            {/* ear bolts */}
            <circle cx="124" cy="118" r="9" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="2.5" />
            <circle cx="124" cy="118" r="3" fill="#0a0a0b" />
            <circle cx="276" cy="118" r="9" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="2.5" />
            <circle cx="276" cy="118" r="3" fill="#d6ff3a" className="hb-led" />

            {/* CHEEK BLUSH */}
            <ellipse cx="146" cy="138" rx="14" ry="9"  fill="#ff79c6" opacity="0.55" className="hb-blush" />
            <ellipse cx="254" cy="138" rx="14" ry="9"  fill="#ff79c6" opacity="0.55" className="hb-blush" style={{ animationDelay: "0.3s" }} />

            {/* EYES — huge round shiny */}
            <g className="hb-eyes">
              <g className="hb-eye-pair">
                {/* left eye */}
                <g>
                  <circle cx="172" cy="108" r="20" fill="#fff" stroke="#0a0a0b" strokeWidth="3" />
                  <circle cx="174" cy="111" r="13" fill="#0a0a0b" className="hb-pupil" />
                  <circle cx="178" cy="105" r="6" fill="#fff" className="hb-eye-sparkle" />
                  <circle cx="167" cy="116" r="2.5" fill="#fff" opacity="0.85" />
                  <circle cx="182" cy="119" r="1.5" fill="#fff" opacity="0.6" />
                </g>
                {/* right eye */}
                <g>
                  <circle cx="228" cy="108" r="20" fill="#fff" stroke="#0a0a0b" strokeWidth="3" />
                  <circle cx="230" cy="111" r="13" fill="#0a0a0b" className="hb-pupil" />
                  <circle cx="234" cy="105" r="6" fill="#fff" className="hb-eye-sparkle" style={{ animationDelay: "0.15s" }} />
                  <circle cx="223" cy="116" r="2.5" fill="#fff" opacity="0.85" />
                  <circle cx="238" cy="119" r="1.5" fill="#fff" opacity="0.6" />
                </g>
              </g>
              {/* periodic happy squint — closed-eye smile arcs */}
              <g className="hb-happy-arcs">
                <path d="M150 116 Q 172 92 194 116" stroke="#0a0a0b" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M206 116 Q 228 92 250 116" stroke="#0a0a0b" strokeWidth="5" fill="none" strokeLinecap="round" />
              </g>
            </g>

            {/* SMILE — big curved smile, tongue, tooth */}
            <g className="hb-mouth">
              <path
                d="M170 152 Q 200 188 230 152"
                stroke="#0a0a0b"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hb-smile"
              />
              <path
                d="M180 160 Q 200 184 220 160 Q 200 178 180 160 Z"
                fill="#ff2d6f"
                className="hb-tongue"
              />
              <rect x="197" y="156" width="5" height="7" rx="1.2" fill="#fff" stroke="#0a0a0b" strokeWidth="1" className="hb-tooth" />
            </g>
          </g>

          {/* ===== ARMS — articulated, hands gripping the hologram sides ===== */}
          <g className="hb-arm hb-arm-l">
            {/* shoulder cap */}
            <circle cx="135" cy="218" r="14" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="3" />
            {/* upper arm */}
            <rect x="118" y="220" width="34" height="80" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
            {/* elbow */}
            <circle cx="135" cy="300" r="10" fill="#0a0a0b" />
            <circle cx="135" cy="300" r="4" fill="#d6ff3a" />
            {/* forearm — angled inward toward hologram */}
            <g transform="rotate(-18 135 300)">
              <rect x="118" y="300" width="34" height="78" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
            </g>
            {/* mitten hand — gripping left side of hologram */}
            <g className="hb-hand">
              <circle cx="92" cy="378" r="20" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
              <path d="M82 372 Q 92 382 102 372" stroke="#0a0a0b" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
              <ellipse cx="84" cy="372" rx="3" ry="2" fill="#fff" opacity="0.4" />
            </g>
          </g>
          <g className="hb-arm hb-arm-r">
            <circle cx="265" cy="218" r="14" fill="url(#hb-plate)" stroke="#0a0a0b" strokeWidth="3" />
            <rect x="248" y="220" width="34" height="80" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
            <circle cx="265" cy="300" r="10" fill="#0a0a0b" />
            <circle cx="265" cy="300" r="4" fill="#d6ff3a" />
            <g transform="rotate(18 265 300)">
              <rect x="248" y="300" width="34" height="78" rx="14" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
            </g>
            <g className="hb-hand">
              <circle cx="308" cy="378" r="20" fill="url(#hb-body)" stroke="#0a0a0b" strokeWidth="3" />
              <path d="M298 372 Q 308 382 318 372" stroke="#0a0a0b" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
              <ellipse cx="300" cy="372" rx="3" ry="2" fill="#fff" opacity="0.4" />
            </g>
          </g>
        </g>

        {/* HOLOGRAM BEAM — connects bot to screen */}
        <g aria-hidden className="hb-beam-grp">
          <path
            d="M170 332 L 86 350 L 314 350 L 230 332 Z"
            fill="url(#hb-beam)"
            stroke="rgba(34, 211, 238, 0.55)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </g>

        {/* HOLOGRAM SCREEN — same coords as before so VariantSlides work */}
        <g className="hb-screen">
          <rect x="78" y="346" width="244" height="124" rx="10" fill="rgba(8, 28, 38, 0.85)" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.5" />
          <rect x="86" y="350" width="228" height="100" rx="4" fill="url(#hb-holo)" />
          {[
            { x:  82, y: 350 },
            { x: 318, y: 350 },
            { x:  82, y: 450 },
            { x: 318, y: 450 },
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x} ${c.y})`}>
              <path
                d={
                  i === 0 ? "M0 8 L 0 0 L 8 0" :
                  i === 1 ? "M-8 0 L 0 0 L 0 8" :
                  i === 2 ? "M0 -8 L 0 0 L 8 0" :
                            "M-8 0 L 0 0 L 0 -8"
                }
                stroke="#22d3ee"
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          ))}
          <g clipPath="url(#cr-screen-clip)">
            <VariantSlides variant={variant} />
            <rect x="86" y="350" width="228" height="2" fill="#22d3ee" opacity="0.6" className="cr-scanline" />
          </g>
          <circle cx="92"  cy="462" r="3" fill="#d6ff3a" className="hb-led" />
          <circle cx="308" cy="462" r="3" fill="#ff6a3d" className="hb-led" style={{ animationDelay: "0.4s" }} />
        </g>
      </svg>

      {/* HUD label bottom */}
      <div className="cr-hud-bot">
        <span className="cr-hud-dot cr-hud-dot-orange" />
        <span className="cr-hud-flicker">{meta.foot}</span>
        <span className="cr-hud-mute">/ online</span>
      </div>
    </div>
  );
}

/* ===========================================================
   VARIANT SLIDES — page-specific 3-slide cycler for the laptop
   =========================================================== */
function VariantSlides({ variant }: { variant: RobotVariant }) {
  switch (variant) {
    case "form":      return <FormSlides />;
    case "chat":      return <ChatSlides />;
    case "scan":      return <ScanSlides />;
    case "blueprint": return <BlueprintSlides />;
    case "ship":      return <ShipSlides />;
    case "team":      return <TeamSlides />;
    case "shield":    return <ShieldSlides />;
  }
}

/* — original contact form slides, unchanged — */
function FormSlides() {
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="380" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="16" fontWeight="700">Hi there 👋</text>
        <text x="98" y="400" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8.5" letterSpacing="2" opacity="0.92">CONTACT · MODERNIZA</text>
        <rect x="98" y="412" width="160" height="5" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="422" width="100" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="432" width="78" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="442" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Send it →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0e1622" />
        <text x="98" y="370" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ TELL US ABOUT IT</text>
        <rect x="98" y="378" width="204" height="14" rx="3" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.25)" />
        <rect x="103" y="384" width="120" height="3" rx="1" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="398" width="60"  height="14" rx="7" fill="rgba(214,255,58,0.15)" stroke="#d6ff3a" />
        <text x="106" y="408" fill="#d6ff3a" fontFamily="var(--font-geist-sans)" fontSize="7.5" fontWeight="700">website</text>
        <rect x="162" y="398" width="58"  height="14" rx="7" fill="rgba(255,255,255,0.10)" />
        <text x="170" y="408" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="7.5">portal</text>
        <rect x="98" y="418" width="100" height="3" rx="1" fill="rgba(255,255,255,0.35)" />
        <rect x="98" y="426" width="140" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="98" y="434" width="78" height="14" rx="7" fill="#ff6a3d" />
        <text x="106" y="444" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Send it →</text>
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="384" r="14" fill="#d6ff3a" />
        <path d="M193 384 L 198 389 L 208 379" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">Got it — we&apos;ll reply</text>
        <text x="124" y="430" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">WITHIN 1 BUSINESS DAY</text>
      </g>
    </>
  );
}

/* — call/chat: calendar slot picker — */
function ChatSlides() {
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="380" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="16" fontWeight="700">Start project</text>
        <text x="98" y="400" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8.5" letterSpacing="2" opacity="0.92">30 MIN · ZOOM · NDA</text>
        <rect x="98" y="412" width="170" height="5" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="422" width="120" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="432" width="92" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="442" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Pick a slot →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0c1220" />
        <text x="98" y="368" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ THIS WEEK · 5 SLOTS</text>
        {[0,1,2,3,4,5,6].map((d, i) => (
          <g key={d}>
            <rect x={98 + i*30} y="378" width="26" height="22" rx="3" fill={i === 2 ? "#d6ff3a" : "rgba(255,255,255,0.08)"} stroke={i === 2 ? "#d6ff3a" : "rgba(255,255,255,0.18)"} />
            <text x={98 + i*30 + 13} y="386" textAnchor="middle" fill={i === 2 ? "#0a0a0b" : "#fff"} fontFamily="var(--font-geist-mono)" fontSize="6" opacity="0.85">{["MO","TU","WE","TH","FR","SA","SU"][i]}</text>
            <text x={98 + i*30 + 13} y="396" textAnchor="middle" fill={i === 2 ? "#0a0a0b" : "#fff"} fontFamily="var(--font-geist-sans)" fontSize="9" fontWeight="700">{12 + i}</text>
          </g>
        ))}
        <rect x="98"  y="408" width="62" height="14" rx="3" fill="rgba(214,255,58,0.18)" stroke="#d6ff3a" />
        <text x="106" y="418" fill="#d6ff3a" fontFamily="var(--font-geist-sans)" fontSize="7.5" fontWeight="700">10:00 AM</text>
        <rect x="164" y="408" width="60" height="14" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" />
        <text x="172" y="418" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="7.5">2:30 PM</text>
        <rect x="98" y="430" width="80" height="14" rx="7" fill="#d6ff3a" />
        <text x="105" y="440" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Confirm →</text>
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="384" r="14" fill="#d6ff3a" />
        <path d="M193 384 L 198 389 L 208 379" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="125" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">Wed · 14 · 10:00 AM</text>
        <text x="135" y="430" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">CALENDAR INVITE SENT</text>
      </g>
    </>
  );
}

/* — scan: code analysis (used by /why and /process/discover) — */
function ScanSlides() {
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="#0a1a14" />
        <text x="98" y="370" fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ READING SOURCE</text>
        {[0,1,2,3,4,5,6].map((i) => (
          <rect key={i} x="98" y={378 + i*7} width={Math.floor(60 + (i*23 + 17) % 100)} height="3" rx="1" fill="rgba(255,140,90,0.55)" />
        ))}
        <rect x="98" y="430" width="140" height="14" rx="3" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" />
        <text x="105" y="440" fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="8" fontWeight="700">parsing 24 files…</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0e1622" />
        <text x="98" y="370" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ CALL GRAPH</text>
        {/* simple node graph */}
        <line x1="120" y1="400" x2="160" y2="388" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="120" y1="400" x2="160" y2="412" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="160" y1="388" x2="220" y2="380" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="160" y1="388" x2="220" y2="396" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="160" y1="412" x2="220" y2="404" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="160" y1="412" x2="220" y2="424" stroke="#22d3ee" strokeWidth="1.2" />
        <circle cx="120" cy="400" r="6" fill="#ff6a3d" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="160" cy="388" r="5" fill="#d6ff3a" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="160" cy="412" r="5" fill="#d6ff3a" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="220" cy="380" r="4" fill="#22d3ee" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="220" cy="396" r="4" fill="#22d3ee" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="220" cy="404" r="4" fill="#22d3ee" stroke="#0a0a0b" strokeWidth="1.2" />
        <circle cx="220" cy="424" r="4" fill="#22d3ee" stroke="#0a0a0b" strokeWidth="1.2" />
        <text x="98" y="442" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="7.5" opacity="0.7">1.2k symbols · 312 fns · 86 modules</text>
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="384" r="14" fill="#22d3ee" />
        <path d="M193 384 L 198 389 L 208 379" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">Blueprint ready</text>
        <text x="118" y="430" fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">SHARED WITH YOUR TEAM</text>
      </g>
    </>
  );
}

/* — blueprint: planning & four verbs (used by /what and /process/define) — */
function BlueprintSlides() {
  const verbs: { l: string; c: string }[] = [
    { l: "Analyse", c: "#22d3ee" },
    { l: "Convert", c: "#ff6a3d" },
    { l: "Verify",  c: "#d6ff3a" },
    { l: "Deploy",  c: "#7c3aed" },
  ];
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="378" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="15" fontWeight="700">One platform.</text>
        <text x="98" y="396" fill="#d6ff3a" fontFamily="var(--font-geist-sans)" fontSize="15" fontWeight="700">Four verbs.</text>
        <rect x="98" y="408" width="160" height="4" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="418" width="120" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="430" width="80" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="440" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">See plan →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0e1622" />
        <text x="98" y="370" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ DRAFTING PLAN</text>
        {verbs.map((v, i) => (
          <g key={v.l}>
            <rect x={98 + i*54} y="380" width="48" height="26" rx="4" fill="rgba(255,255,255,0.06)" stroke={v.c} strokeWidth="1.2" />
            <circle cx={98 + i*54 + 10} cy="393" r="4" fill={v.c} />
            <text x={98 + i*54 + 18} y="396" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="7" fontWeight="700">{v.l}</text>
          </g>
        ))}
        <rect x="98" y="412" width="204" height="3" rx="1" fill="rgba(255,255,255,0.18)" />
        <rect x="98" y="412" width="138" height="3" rx="1" fill="#d6ff3a" />
        <text x="98" y="430" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="7.5" opacity="0.7">phase 03 / 04 · stack confirmed</text>
        <rect x="248" y="424" width="56" height="14" rx="7" fill="#ff6a3d" />
        <text x="255" y="434" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8" fontWeight="700">Approve</text>
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="384" r="14" fill="#d6ff3a" />
        <path d="M193 384 L 198 389 L 208 379" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="128" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">Plan signed off</text>
        <text x="120" y="430" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">SCOPE LOCKED · MOVING TO BUILD</text>
      </g>
    </>
  );
}

/* — ship: deploy + outcome (used by /process/deliver, /work/*) — */
function ShipSlides() {
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="380" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="16" fontWeight="700">Going live 🚀</text>
        <text x="98" y="400" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8.5" letterSpacing="2" opacity="0.92">DEPLOY · v4.2.0</text>
        <rect x="98" y="412" width="160" height="5" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="422" width="100" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="432" width="80" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="442" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Deploy →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0e1622" />
        <text x="98" y="370" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ PIPELINE · v4.2.0</text>
        {["build","stage","prod"].map((s, i) => (
          <g key={s}>
            <text x="98" y={388 + i*16} fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8" opacity="0.7">{s}</text>
            <rect x="138" y={381 + i*16} width="160" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
            <rect x="138" y={381 + i*16} width={[160, 130, 70][i]} height="6" rx="3" fill="#d6ff3a" />
          </g>
        ))}
        <text x="98" y="438" fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="7.5" opacity="0.85">3 regions · 0 errors · -18% latency</text>
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="382" r="14" fill="#d6ff3a" />
        <path d="M196 376 L 196 388 M 200 374 L 200 388 M 204 376 L 204 388" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M193 388 L 207 388 L 200 396 Z" fill="#0a0a0b" />
        <text x="120" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">Live in 3 regions</text>
        <text x="124" y="430" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">v4.2.0 · 312 FNS · 100% VERIFIED</text>
      </g>
    </>
  );
}

/* — team: meet the crew (used by /who) — */
function TeamSlides() {
  const colors = ["#ff6a3d", "#d6ff3a", "#22d3ee", "#7c3aed", "#ff2d6f", "#fff"];
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="380" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="16" fontWeight="700">Hi crew 👋</text>
        <text x="98" y="400" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8.5" letterSpacing="2" opacity="0.92">MEET · MODERNIZA</text>
        <rect x="98" y="412" width="170" height="5" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="422" width="120" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="432" width="78" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="442" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Meet us →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0e1622" />
        <text x="98" y="370" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ CORE CREW · 6</text>
        {colors.map((c, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const cx = 110 + col * 70;
          const cy = 396 + row * 26;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill={c} stroke="#0a0a0b" strokeWidth="1.2" />
              <circle cx={cx} cy={cy - 2} r="3" fill="#0a0a0b" />
              <path d={`M${cx-6} ${cy+4} Q ${cx} ${cy+8} ${cx+6} ${cy+4}`} stroke="#0a0a0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <rect x={cx + 12} y={cy - 6} width="34" height="3" rx="1" fill="rgba(255,255,255,0.55)" />
              <rect x={cx + 12} y={cy - 1} width="22" height="3" rx="1" fill="rgba(255,255,255,0.3)" />
            </g>
          );
        })}
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <text x="200" y="385" textAnchor="middle" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="22" fontWeight="700">12+</text>
        <text x="200" y="402" textAnchor="middle" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="7.5" letterSpacing="1.6">YEARS · MEDIAN EXPERIENCE</text>
        <text x="200" y="424" textAnchor="middle" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="10" opacity="0.85">Senior · hands-on · accountable</text>
      </g>
    </>
  );
}

/* — shield: enterprise / compliance (used by /enterprises) — */
function ShieldSlides() {
  return (
    <>
      <g className="cr-slide cr-slide-a">
        <rect x="86" y="350" width="228" height="100" fill="url(#cr-screen)" opacity="0.95" />
        <text x="98" y="380" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="16" fontWeight="700">Enterprise-ready</text>
        <text x="98" y="400" fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="8.5" letterSpacing="2" opacity="0.92">SECURE · COMPLIANT</text>
        <rect x="98" y="412" width="170" height="5" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="98" y="422" width="120" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
        <rect x="98" y="432" width="84" height="14" rx="7" fill="#d6ff3a" />
        <text x="106" y="442" fill="#0a0a0b" fontFamily="var(--font-geist-sans)" fontSize="8.5" fontWeight="700">Read more →</text>
      </g>
      <g className="cr-slide cr-slide-b">
        <rect x="86" y="350" width="228" height="100" fill="#0a1622" />
        <text x="98" y="368" fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">/ COMPLIANCE</text>
        {/* center shield */}
        <g transform="translate(120 410)">
          <path d="M0 -22 L 22 -16 L 22 -2 C 22 8 12 16 0 18 C -12 16 -22 8 -22 -2 L -22 -16 Z" fill="#22d3ee" stroke="#0a0a0b" strokeWidth="1.2" />
          <path d="M-9 -2 L -3 4 L 9 -8" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {[
          { l: "SOC 2 Type II",  d: "audited" },
          { l: "ISO 27001",       d: "certified" },
          { l: "GDPR · HIPAA",    d: "ready" },
          { l: "SSO · SAML",      d: "supported" },
        ].map((c, i) => (
          <g key={c.l}>
            <rect x="156" y={376 + i*16} width="14" height="14" rx="3" fill="#d6ff3a" />
            <path d={`M159 ${383 + i*16} L 162 ${386 + i*16} L 167 ${381 + i*16}`} stroke="#0a0a0b" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="176" y={386 + i*16} fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="8" fontWeight="700">{c.l}</text>
            <text x="176" y={394 + i*16} fill="#22d3ee" fontFamily="var(--font-geist-mono)" fontSize="6.5" letterSpacing="1">{c.d.toUpperCase()}</text>
          </g>
        ))}
      </g>
      <g className="cr-slide cr-slide-c">
        <rect x="86" y="350" width="228" height="100" fill="#072018" />
        <circle cx="200" cy="384" r="14" fill="#d6ff3a" />
        <path d="M193 384 L 198 389 L 208 379" stroke="#0a0a0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="124" y="416" fill="#fff" fontFamily="var(--font-geist-sans)" fontSize="11" fontWeight="700">All checks pass</text>
        <text x="118" y="430" fill="#d6ff3a" fontFamily="var(--font-geist-mono)" fontSize="8" letterSpacing="1.6">SECURITY POSTURE · GREEN</text>
      </g>
    </>
  );
}
