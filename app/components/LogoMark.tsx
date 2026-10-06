/**
 * LogoMark — animated AI-style mark.
 *
 * Composition:
 *   • Outer dashed orbital ring, slowly rotating CW
 *   • Middle solid ring, rotating CCW
 *   • Inner pulsing core (concentric ring + dot)
 *   • Conic "scanning sweep" overlay rotating like a radar
 *   • Pulsing dot orbiting the outer ring (the "signal")
 *
 * Sized via the wrapper element.
 */

export default function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full">
        {/* radar sweep — conic gradient via mask */}
        <defs>
          <radialGradient id="logo-core-grad">
            <stop offset="0%" stopColor="#d6ff3a" stopOpacity="1" />
            <stop offset="60%" stopColor="#d6ff3a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d6ff3a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="logo-sweep-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d6ff3a" stopOpacity="0" />
            <stop offset="100%" stopColor="#d6ff3a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* outer dashed ring rotating CW */}
        <g className="ai-orbit-1" style={{ transformOrigin: "32px 32px" }}>
          <circle cx="32" cy="32" r="28" fill="none" stroke="#d6ff3a" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="32" cy="4" r="2.4" fill="#d6ff3a" />
        </g>

        {/* middle solid ring rotating CCW */}
        <g className="ai-orbit-2" style={{ transformOrigin: "32px 32px" }}>
          <circle cx="32" cy="32" r="20" fill="none" stroke="#d6ff3a" strokeOpacity="0.7" strokeWidth="1" />
          <circle cx="12" cy="32" r="1.6" fill="#ff6a3d" />
        </g>

        {/* radar sweep wedge */}
        <g className="logo-sweep" style={{ transformOrigin: "32px 32px" }}>
          <path
            d="M 32 32 L 60 32 A 28 28 0 0 0 51 14 Z"
            fill="url(#logo-sweep-grad)"
            opacity="0.6"
          />
        </g>

        {/* core glow + pulsing dot */}
        <circle cx="32" cy="32" r="10" fill="url(#logo-core-grad)" />
        <circle cx="32" cy="32" r="4" fill="#0a0a0b" />
        <circle cx="32" cy="32" r="1.8" fill="#d6ff3a" className="ai-core" style={{ transformOrigin: "32px 32px" }} />

        {/* corner brackets */}
        <g stroke="#d6ff3a" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="square" fill="none">
          <path d="M 4 12 L 4 4 L 12 4" />
          <path d="M 60 12 L 60 4 L 52 4" />
          <path d="M 4 52 L 4 60 L 12 60" />
          <path d="M 60 52 L 60 60 L 52 60" />
        </g>
      </svg>
    </span>
  );
}
