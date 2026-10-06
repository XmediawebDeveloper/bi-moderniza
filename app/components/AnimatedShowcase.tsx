/**
 * AnimatedShowcase — cinematic split-screen forge marquee.
 *
 * Left  : rusty grunge "OLD CODE" panel — corrupted legacy lines, dust.
 * Center: lightning energy bolt + horizontal scanner beam sweeping right.
 * Right : neon "NEW CODE" hologram — colorful tokens reform from particles.
 *
 * Whole panel tiles twice inside a horizontal marquee; hover pauses.
 */

const OLD_LINES = [
  "<html>",
  "  <head>",
  "    <title>Old Code</title>",
  "  </head>",
  "  <body>",
  "    <h1>Legacy System</h1>",
  "    <p>Outdated &amp; Inefficient</p>",
  "    <div class=\"old\">",
  "      <span>Hard to Maintain</span>",
  "    </div>",
  "  </body>",
  "</html>",
];

const NEW_LINES = [
  "<html>",
  "  <head>",
  "    <title>New Code</title>",
  "  </head>",
  "  <body>",
  "    <h1>Modern Solution</h1>",
  "    <p>Optimized &amp; Efficient</p>",
  "    <div class=\"modern\">",
  "      <span>Easy to Maintain</span>",
  "    </div>",
  "  </body>",
  "</html>",
];

function highlightModern(line: string, idx: number) {
  // colorize tags / attrs / strings for the neon side
  return (
    <span
      key={idx}
      className="t-new-slide"
      dangerouslySetInnerHTML={{
        __html: line
          .replace(/(&amp;)/g, '<span class="nm-amp">&amp;</span>')
          .replace(/(&lt;\/?)([a-z0-9]+)/gi, '<span class="nm-pun">$1</span><span class="nm-tag">$2</span>')
          .replace(/(&gt;)/g, '<span class="nm-pun">$1</span>')
          .replace(/(class)(=)("[^"]*")/g, '<span class="nm-attr">$1</span><span class="nm-pun">$2</span><span class="nm-str">$3</span>')
          .replace(/&lt;/g, "&lt;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;"),
      }}
    />
  );
}

function TransformPanel() {
  return (
    <div className="showcase-panel showcase-transform">
      <div className="showcase-panel-bg" aria-hidden />
      <div className="transform-vignette" aria-hidden />

      {/* horizontal scanner beam sweeping the whole stage */}
      <span className="tx-scanner" aria-hidden />

      <div className="showcase-panel-chrome">
        <span className="showcase-dot showcase-dot-r" />
        <span className="showcase-dot showcase-dot-y" />
        <span className="showcase-dot showcase-dot-g" />
        <span className="showcase-panel-tag">legacy.html</span>
        <span className="tx-arrow-tag">→</span>
        <span className="showcase-panel-tag tag-glow">modern.html</span>
      </div>

      <div className="transform-stage">
        {/* ═══ OLD CODE — rusty metal plate, corrupted ═══ */}
        <div className="transform-old" aria-hidden>
          <div className="tx-side-label tx-side-label-old">OLD CODE</div>
          <div className="tx-metal" />
          <div className="tx-dust" />
          <div className="transform-old-stream">
            {[...OLD_LINES, ...OLD_LINES].map((l, i) => (
              <div key={i} className="t-line t-old" data-text={l}>
                {l}
              </div>
            ))}
          </div>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className={`tx-rust tx-rust-${i + 1}`} />
          ))}
          {/* dissolving particles flying right toward the bolt */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={`d${i}`} className={`tx-dissolve td-${i + 1}`} />
          ))}
          <div className="transform-fade transform-fade-l" />
        </div>

        {/* ═══ CENTER — LIGHTNING BOLT energy convert ═══ */}
        <div className="transform-fire" aria-hidden>
          <span className="bolt-glow" />
          <span className="bolt-ring bolt-ring-1" />
          <span className="bolt-ring bolt-ring-2" />
          <span className="bolt-ring bolt-ring-3" />

          <svg viewBox="0 0 80 140" className="bolt-svg">
            <defs>
              <linearGradient id="bolt-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#fff7d6" />
                <stop offset="30%" stopColor="#ffd14a" />
                <stop offset="55%" stopColor="#ff6a3d" />
                <stop offset="80%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="bolt-grad-inner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fff7d6" />
              </linearGradient>
            </defs>
            <path
              d="M 46 4 L 14 70 L 38 70 L 28 136 L 70 56 L 44 56 Z"
              fill="url(#bolt-grad)"
              stroke="#fff"
              strokeWidth="1.2"
              className="bolt-shape"
            />
            <path
              d="M 44 14 L 22 68 L 36 68 L 30 120 L 60 60 L 42 60 Z"
              fill="url(#bolt-grad-inner)"
              opacity="0.9"
              className="bolt-inner"
            />
          </svg>

          {/* electric arcs radiating */}
          {Array.from({ length: 6 }).map((_, i) => (
            <svg
              key={`arc${i}`}
              viewBox="0 0 100 60"
              className={`bolt-arc ba-${i + 1}`}
            >
              <path
                d="M 6 30 Q 28 8 50 30 T 94 30"
                stroke="#d6ff3a"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          ))}

          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`fire-spark fs-${i + 1}`} />
          ))}

          {Array.from({ length: 8 }).map((_, i) => (
            <svg
              key={`g${i}`}
              viewBox="0 0 12 12"
              className={`tx-glitter tg-${i + 1}`}
            >
              <path d="M6 0 L 7 5 L 12 6 L 7 7 L 6 12 L 5 7 L 0 6 L 5 5 Z" fill="#fff" />
            </svg>
          ))}
        </div>

        {/* ═══ NEW CODE — neon hologram, glass morphism ═══ */}
        <div className="transform-new" aria-hidden>
          <div className="tx-side-label tx-side-label-new">NEW CODE</div>
          <div className="tx-holo" />
          <div className="transform-new-stream">
            {[...NEW_LINES, ...NEW_LINES].map((l, i) => (
              <div key={i} className="t-line">
                <span className="t-prompt">›</span>
                {highlightModern(l, i)}
              </div>
            ))}
          </div>
          {/* particles reforming into code on the new side */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={`r${i}`} className={`tx-reform tr-${i + 1}`} />
          ))}
          <div className="transform-fade transform-fade-r" />
        </div>
      </div>

      <div className="showcase-panel-foot">
        <span className="showcase-pulse" />
        <span>forge · legacy → modern · live</span>
      </div>
    </div>
  );
}

function Track() {
  return (
    <div className="showcase-track">
      <TransformPanel />
      <TransformPanel />
    </div>
  );
}

export default function AnimatedShowcase() {
  return (
    <section
      aria-label="Legacy → Modern — cinematic code transformation"
      className="showcase-section"
    >
      <div className="showcase-bg-glow" aria-hidden />
      <div className="showcase-edge showcase-edge-l" aria-hidden />
      <div className="showcase-edge showcase-edge-r" aria-hidden />

      <div className="showcase-viewport">
        <div className="showcase-marquee">
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
