/**
 * MiniRobot — cute small robot mascot that perches on cards.
 *
 * Variants (different arm poses + accessories):
 *   wave   — one arm waving                       👋
 *   point  — one arm pointing down at the card    👇
 *   cheer  — both arms thrown up                  🙌
 *   wink   — one eye closed, peace sign           😉
 *   shrug  — both arms slightly out               🤷
 *   heart  — holding a small heart over chest     💚
 *
 * Pure SVG + the .mini-* CSS keyframes in globals.css.
 * Idle motion (body bob, antenna, eye blink, mouth pulse) runs always;
 * the variant only changes the arm choreography (and adds an accessory).
 *
 * Sized via the wrapper element (default ~56px tall).
 */

type Variant = "wave" | "point" | "cheer" | "wink" | "shrug" | "heart";

export default function MiniRobot({
  variant = "wave",
  className = "",
  tone = "dark",
}: {
  variant?: Variant;
  className?: string;
  tone?: "dark" | "light";
}) {
  const bodyFill = tone === "dark" ? "#f5f1ea" : "#0a0a0b";
  const bodyStroke = tone === "dark" ? "#0a0a0b" : "#0a0a0b";
  const faceFill = tone === "dark" ? "#0a0a0b" : "#0a0a0b";
  const eyeFill = "#d6ff3a";
  const accent = "#ff6a3d";

  const armLClass =
    variant === "wave"  ? "mini-arm-wave"  :
    variant === "cheer" ? "mini-arm-cheer-l" :
    variant === "point" ? "mini-arm-rest-l" :
    variant === "shrug" ? "mini-arm-shrug-l" :
    variant === "heart" ? "mini-arm-rest-l" :
    "mini-arm-rest-l";

  const armRClass =
    variant === "point" ? "mini-arm-point" :
    variant === "cheer" ? "mini-arm-cheer-r" :
    variant === "shrug" ? "mini-arm-shrug-r" :
    variant === "wave"  ? "mini-arm-rest-r" :
    "mini-arm-rest-r";

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg viewBox="0 0 100 130" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`mini-body-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bodyFill} />
            <stop offset="100%" stopColor={bodyFill} stopOpacity="0.92" />
          </linearGradient>
        </defs>

        {/* whole robot bobs */}
        <g className="mini-bob">
          {/* antenna */}
          <g transform="translate(50 22)">
            <g className="mini-antenna">
              <line x1="0" y1="0" x2="0" y2="-14" stroke={bodyStroke} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="0" cy="-16" r="3" fill={accent} />
            </g>
          </g>

          {/* head */}
          <rect x="22" y="22" width="56" height="44" rx="12" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.6" />
          {/* face plate */}
          <rect x="28" y="30" width="44" height="28" rx="8" fill={faceFill} />

          {/* eyes — wink variant has right eye closed */}
          {variant === "wink" ? (
            <>
              <circle cx="40" cy="44" r="4" fill={eyeFill} className="mini-blink" />
              <path d="M 56 44 Q 60 41 64 44" stroke={eyeFill} strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="40" cy="44" r="4" fill={eyeFill} className="mini-blink" />
              <circle cx="60" cy="44" r="4" fill={eyeFill} className="mini-blink" style={{ animationDelay: "0.1s" }} />
            </>
          )}

          {/* mouth */}
          <rect x="44" y="51" width="12" height="3" rx="1.5" fill={accent} className="mini-mouth" />

          {/* ear bolts */}
          <circle cx="22" cy="44" r="3" fill={bodyStroke} />
          <circle cx="78" cy="44" r="3" fill={bodyStroke} />

          {/* body / chest */}
          <rect x="32" y="66" width="36" height="32" rx="8" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.6" />
          {/* chest detail (heart for heart variant, otherwise small panel) */}
          {variant === "heart" ? (
            <path
              d="M 50 88 C 42 80 36 78 38 74 C 40 70 50 72 50 78 C 50 72 60 70 62 74 C 64 78 58 80 50 88 Z"
              fill={accent}
              className="mini-heart"
            />
          ) : (
            <>
              <rect x="40" y="74" width="20" height="6" rx="1" fill={faceFill} />
              <circle cx="46" cy="77" r="1.5" fill={eyeFill} />
              <circle cx="54" cy="77" r="1.5" fill={accent} />
            </>
          )}

          {/* LEFT arm — outer translates to shoulder, inner animates */}
          <g transform="translate(28 70)">
            <g className={armLClass}>
              <rect x="-3" y="0" width="6" height="22" rx="3" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.4" />
              <circle cx="0" cy="22" r="4" fill={faceFill} />
              {variant === "cheer" && <circle cx="0" cy="-2" r="3" fill={eyeFill} />}
            </g>
          </g>

          {/* RIGHT arm */}
          <g transform="translate(72 70)">
            <g className={armRClass}>
              <rect x="-3" y="0" width="6" height="22" rx="3" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.4" />
              <circle cx="0" cy="22" r="4" fill={faceFill} />
              {variant === "cheer" && <circle cx="0" cy="-2" r="3" fill={eyeFill} />}
              {variant === "point" && <path d="M -2 26 L -2 32 L 2 32 L 2 26" fill={faceFill} />}
              {variant === "wink" && (
                <>
                  <rect x="-1.5" y="22" width="3" height="6" rx="1" fill={faceFill} />
                  <rect x="2" y="22" width="3" height="6" rx="1" fill={faceFill} />
                </>
              )}
            </g>
          </g>

          {/* LEFT leg — outer translates to hip, inner dangles */}
          <g transform="translate(42 98)">
            <g className="mini-leg-l">
              <rect x="-4" y="0" width="8" height="18" rx="2.5" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.4" />
              <rect x="-6" y="16" width="12" height="6" rx="1.5" fill={faceFill} />
            </g>
          </g>

          {/* RIGHT leg */}
          <g transform="translate(58 98)">
            <g className="mini-leg-r">
              <rect x="-4" y="0" width="8" height="18" rx="2.5" fill={`url(#mini-body-${variant})`} stroke={bodyStroke} strokeWidth="1.4" />
              <rect x="-6" y="16" width="12" height="6" rx="1.5" fill={faceFill} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
