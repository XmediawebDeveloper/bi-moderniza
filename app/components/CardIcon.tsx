/**
 * CardIcon — content-relevant animated icon for cards.
 *
 * Renders a small animated SVG inside a coloured rounded square, themed
 * for the card's meaning. Tone-aware (dark / light card backgrounds).
 *
 * Available kinds:
 *   analyse · convert · verify · deploy   — pipeline verbs
 *   chart · clock · money · broken         — data / cost / time
 *   shield · doc · pulse · cycle · cloud   — assurance / process
 *   bank · heart · flag · cart · bolt · umbrella  — industries
 *   person · group · gear · rocket · server · blueprint  — audiences
 */

export type IconKind =
  | "analyse" | "convert" | "verify" | "deploy"
  | "chart" | "clock" | "money" | "broken"
  | "shield" | "doc" | "pulse" | "cycle" | "cloud"
  | "bank" | "heart" | "flag" | "cart" | "bolt" | "umbrella"
  | "person" | "group" | "gear" | "rocket" | "server" | "blueprint";

export default function CardIcon({
  kind,
  tone = "dark",
  className = "",
}: {
  kind: IconKind;
  tone?: "dark" | "light";
  className?: string;
}) {
  const fg = tone === "dark" ? "#d6ff3a" : "#ff6a3d";
  const fg2 = tone === "dark" ? "#ff6a3d" : "#d6ff3a";
  const stroke = tone === "dark" ? "#f5f1ea" : "#0a0a0b";
  const bg = tone === "dark"
    ? "bg-glow/[0.08] border border-glow/30"
    : "bg-ember/[0.08] border border-ember/30";

  return (
    <span
      aria-hidden
      className={`relative inline-grid place-items-center rounded-xl ${bg} ${className}`}
    >
      <svg viewBox="0 0 48 48" className="h-7 w-7" overflow="visible">
        {renderIcon(kind, fg, fg2, stroke)}
      </svg>
    </span>
  );
}

function renderIcon(kind: IconKind, fg: string, fg2: string, stroke: string) {
  switch (kind) {
    case "analyse":
      return (
        <g>
          <circle cx="20" cy="20" r="10" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="28" y1="28" x2="40" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2.5" fill={fg} className="ai-core" style={{ transformOrigin: "20px 20px" }} />
          <circle cx="20" cy="20" r="6" fill="none" stroke={fg} strokeOpacity="0.5" className="signal-ping" style={{ transformOrigin: "20px 20px" }} />
        </g>
      );
    case "convert":
      return (
        <g>
          <g className="icon-spin-fast" style={{ transformOrigin: "24px 24px" }}>
            <path d="M 8 24 A 16 16 0 0 1 32 12" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 28 8 L 32 12 L 28 16" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 40 24 A 16 16 0 0 1 16 36" stroke={fg2} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 20 40 L 16 36 L 20 32" stroke={fg2} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      );
    case "verify":
      return (
        <g>
          <path d="M 24 6 L 38 12 L 38 24 C 38 32 32 38 24 42 C 16 38 10 32 10 24 L 10 12 Z"
                fill={fg} fillOpacity="0.18" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M 17 24 L 22 29 L 31 18"
                stroke={fg} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                className="icon-tick" />
        </g>
      );
    case "deploy":
    case "rocket":
      return (
        <g className="icon-launch">
          <path d="M 16 32 L 32 16 L 36 16 L 36 20 L 20 36 Z" fill={fg} stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="29" cy="22" r="2" fill={stroke} />
          <path d="M 14 34 L 8 40 L 12 38 L 10 42 L 14 38 Z" fill={fg2} className="ai-core" style={{ transformOrigin: "11px 38px" }} />
          <line x1="34" y1="14" x2="40" y2="8" stroke={fg2} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="12" x2="36" y2="6" stroke={fg2} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </g>
      );
    case "chart":
      return (
        <g>
          <line x1="8" y1="40" x2="40" y2="40" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <rect x="12" y="28" width="6" height="12" rx="1" fill={fg} className="icon-bar-grow" />
          <rect x="22" y="20" width="6" height="20" rx="1" fill={fg} className="icon-bar-grow" style={{ animationDelay: "0.2s" }} />
          <rect x="32" y="14" width="6" height="26" rx="1" fill={fg2} className="icon-bar-grow" style={{ animationDelay: "0.4s" }} />
        </g>
      );
    case "clock":
      return (
        <g>
          <circle cx="24" cy="24" r="14" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="24" y1="24" x2="24" y2="14" stroke={fg} strokeWidth="2.5" strokeLinecap="round" className="icon-spin-fast" style={{ transformOrigin: "24px 24px" }} />
          <line x1="24" y1="24" x2="32" y2="24" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" className="icon-spin" style={{ transformOrigin: "24px 24px" }} />
          <circle cx="24" cy="24" r="2" fill={stroke} />
        </g>
      );
    case "money":
      return (
        <g>
          <circle cx="24" cy="24" r="14" fill={fg} stroke={stroke} strokeWidth="2" />
          <text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="800" fill={stroke} fontFamily="sans-serif">$</text>
          <circle cx="34" cy="14" r="2" fill={fg2} className="ai-core" style={{ transformOrigin: "34px 14px" }} />
          <circle cx="36" cy="20" r="1" fill={fg2} className="ai-core" style={{ transformOrigin: "36px 20px", animationDelay: "0.4s" }} />
        </g>
      );
    case "broken":
      return (
        <g>
          <line x1="10" y1="38" x2="38" y2="10" stroke={fg2} strokeWidth="3" strokeLinecap="round" className="ai-flicker" />
          <line x1="10" y1="10" x2="20" y2="20" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="28" y1="28" x2="38" y2="38" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3" fill={fg2} className="ai-core" style={{ transformOrigin: "20px 20px" }} />
          <circle cx="28" cy="28" r="3" fill={fg2} className="ai-core" style={{ transformOrigin: "28px 28px", animationDelay: "0.4s" }} />
        </g>
      );
    case "shield":
      return (
        <g>
          <path d="M 24 6 L 38 12 L 38 24 C 38 32 32 38 24 42 C 16 38 10 32 10 24 L 10 12 Z"
                fill={fg} fillOpacity="0.2" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="24" cy="22" r="6" fill="none" stroke={fg} strokeWidth="2" />
          <circle cx="24" cy="22" r="2" fill={fg} className="ai-core" style={{ transformOrigin: "24px 22px" }} />
        </g>
      );
    case "doc":
      return (
        <g>
          <path d="M 14 8 L 30 8 L 36 14 L 36 40 L 14 40 Z" fill={fg} fillOpacity="0.15" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <line x1="18" y1="18" x2="32" y2="18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="24" x2="28" y2="24" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 19 32 L 22 35 L 30 27" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="icon-tick" />
        </g>
      );
    case "pulse":
      return (
        <g>
          <path d="M 6 24 L 14 24 L 18 14 L 24 34 L 28 18 L 32 24 L 42 24" stroke={fg} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="42" cy="24" r="3" fill={fg2} className="ai-core" style={{ transformOrigin: "42px 24px" }} />
          <circle cx="6" cy="24" r="2" fill={fg2} />
        </g>
      );
    case "cycle":
      return (
        <g className="icon-spin-fast" style={{ transformOrigin: "24px 24px" }}>
          <circle cx="24" cy="24" r="14" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="24" cy="10" r="3" fill={fg} />
          <circle cx="38" cy="24" r="2.5" fill={fg2} />
        </g>
      );
    case "cloud":
      return (
        <g>
          <path d="M 14 30 C 8 30 8 22 14 22 C 14 14 26 14 28 22 C 36 22 38 30 32 30 Z"
                fill={fg} fillOpacity="0.25" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <line x1="24" y1="32" x2="24" y2="40" stroke={fg2} strokeWidth="2.5" strokeLinecap="round" className="ai-core" style={{ transformOrigin: "24px 36px" }} />
          <path d="M 20 36 L 24 40 L 28 36" stroke={fg2} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "bank":
      return (
        <g>
          <path d="M 8 18 L 24 8 L 40 18 L 40 22 L 8 22 Z" fill={fg} fillOpacity="0.2" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <line x1="14" y1="26" x2="14" y2="36" stroke={stroke} strokeWidth="2.5" />
          <line x1="22" y1="26" x2="22" y2="36" stroke={stroke} strokeWidth="2.5" />
          <line x1="34" y1="26" x2="34" y2="36" stroke={stroke} strokeWidth="2.5" />
          <line x1="6" y1="40" x2="42" y2="40" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="16" r="2" fill={fg} className="ai-core" style={{ transformOrigin: "24px 16px" }} />
        </g>
      );
    case "heart":
      return (
        <g className="ai-core" style={{ transformOrigin: "24px 26px" }}>
          <path d="M 24 38 C 14 30 8 24 12 18 C 16 12 24 16 24 22 C 24 16 32 12 36 18 C 40 24 34 30 24 38 Z"
                fill={fg2} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      );
    case "flag":
      return (
        <g>
          <line x1="12" y1="6" x2="12" y2="42" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
          <g className="icon-wave">
            <path d="M 14 8 L 38 12 L 30 18 L 38 24 L 14 22 Z" fill={fg} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          </g>
        </g>
      );
    case "cart":
      return (
        <g>
          <path d="M 8 10 L 12 10 L 16 30 L 36 30" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 14 14 L 38 14 L 34 26 L 16 26 Z" fill={fg} fillOpacity="0.3" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="20" cy="36" r="3" fill={fg} stroke={stroke} strokeWidth="1.5" />
          <circle cx="32" cy="36" r="3" fill={fg} stroke={stroke} strokeWidth="1.5" />
          <circle cx="22" cy="20" r="1.5" fill={fg2} className="ai-core" style={{ transformOrigin: "22px 20px" }} />
        </g>
      );
    case "bolt":
      return (
        <g>
          <path d="M 26 6 L 12 26 L 22 26 L 18 42 L 36 20 L 26 20 Z"
                fill={fg} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" className="ai-flicker" />
        </g>
      );
    case "umbrella":
      return (
        <g>
          <path d="M 24 8 C 14 8 8 16 8 22 L 40 22 C 40 16 34 8 24 8 Z"
                fill={fg} fillOpacity="0.3" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <line x1="16" y1="22" x2="16" y2="14" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="32" y1="22" x2="32" y2="14" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="24" y1="22" x2="24" y2="40" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M 24 40 C 24 42 26 42 26 40" stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="24" y1="6" x2="24" y2="2" stroke={fg2} strokeWidth="2.5" strokeLinecap="round" className="ai-core" style={{ transformOrigin: "24px 4px" }} />
        </g>
      );
    case "person":
      return (
        <g>
          <circle cx="24" cy="14" r="6" fill={fg} stroke={stroke} strokeWidth="2" />
          <path d="M 12 40 C 12 30 18 26 24 26 C 30 26 36 30 36 40" stroke={stroke} strokeWidth="2" fill={fg} fillOpacity="0.3" strokeLinejoin="round" />
        </g>
      );
    case "group":
      return (
        <g>
          <circle cx="16" cy="16" r="5" fill={fg} stroke={stroke} strokeWidth="1.5" />
          <circle cx="32" cy="16" r="5" fill={fg2} stroke={stroke} strokeWidth="1.5" />
          <path d="M 6 38 C 6 30 11 26 16 26 C 21 26 26 30 26 38" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <path d="M 22 38 C 22 30 27 26 32 26 C 37 26 42 30 42 38" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        </g>
      );
    case "gear":
      return (
        <g className="icon-spin" style={{ transformOrigin: "24px 24px" }}>
          <circle cx="24" cy="24" r="6" fill={fg} stroke={stroke} strokeWidth="2" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = i * 45;
            return <rect key={i} x="22.5" y="6" width="3" height="5" rx="1" fill={stroke} transform={`rotate(${a} 24 24)`} />;
          })}
          <circle cx="24" cy="24" r="2" fill={stroke} />
        </g>
      );
    case "server":
      return (
        <g>
          <rect x="10" y="9" width="28" height="9" rx="1.5" fill={fg} fillOpacity="0.18" stroke={stroke} strokeWidth="1.5" />
          <rect x="10" y="20" width="28" height="9" rx="1.5" fill={fg} fillOpacity="0.18" stroke={stroke} strokeWidth="1.5" />
          <rect x="10" y="31" width="28" height="9" rx="1.5" fill={fg} fillOpacity="0.18" stroke={stroke} strokeWidth="1.5" />
          <circle cx="33" cy="13.5" r="1.5" fill={fg} className="pulse-dot" />
          <circle cx="33" cy="24.5" r="1.5" fill={fg} className="pulse-dot" style={{ animationDelay: "0.5s" }} />
          <circle cx="33" cy="35.5" r="1.5" fill={fg} className="pulse-dot" style={{ animationDelay: "1s" }} />
        </g>
      );
    case "blueprint":
      return (
        <g>
          <rect x="8" y="10" width="32" height="28" rx="1.5" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="8" y1="20" x2="40" y2="20" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="8" y1="30" x2="40" y2="30" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="20" y1="10" x2="20" y2="38" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="30" y1="10" x2="30" y2="38" stroke={stroke} strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="14" y="16" width="14" height="14" fill={fg} fillOpacity="0.3" stroke={fg} strokeWidth="1.5" className="ai-flicker" />
        </g>
      );
  }
}
