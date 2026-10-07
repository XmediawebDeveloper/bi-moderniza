/**
 * ImageStripMarquee — film-strip marquee of "screen" panels showcasing
 * the legacy → modern visual journey. Each panel is a self-contained
 * SVG/CSS composition (no external image assets).
 */

function LegacyPanel({ tag }: { tag: string }) {
  const lines = [
    "10 REM legacy.sys v1.0",
    "20 OPEN \"DB.DAT\" FOR INPUT",
    "30 IF ERR THEN GOTO 999",
    "40 LET X = X + 1",
    "50 PRINT \"...\"; X",
    "60 GOSUB 800",
    "70 GOTO 40",
    "999 ON ERROR RESUME NEXT",
  ];
  return (
    <article className="strip-panel strip-legacy">
      <div className="strip-chrome">
        <span className="strip-dot strip-dot-r" />
        <span className="strip-dot strip-dot-y" />
        <span className="strip-dot strip-dot-g" />
        <span className="strip-tag">{tag}</span>
      </div>
      <div className="strip-body strip-legacy-body">
        <div className="strip-rust" aria-hidden />
        <div className="strip-scanlines" aria-hidden />
        {lines.map((l, i) => (
          <div key={i} className="strip-legacy-line">
            <span className="strip-legacy-num">{(i + 1) * 10}</span>
            <span>{l}</span>
          </div>
        ))}
        <span className="strip-legacy-caret" aria-hidden />
      </div>
      <div className="strip-foot">
        <span className="strip-foot-dot strip-foot-dot-amber" />
        <span>cobol · vb6 · perl · pl/sql</span>
      </div>
    </article>
  );
}

function ModernPanel({ tag }: { tag: string }) {
  return (
    <article className="strip-panel strip-modern">
      <div className="strip-chrome">
        <span className="strip-dot strip-dot-r" />
        <span className="strip-dot strip-dot-y" />
        <span className="strip-dot strip-dot-g" />
        <span className="strip-tag strip-tag-glow">{tag}</span>
      </div>
      <div className="strip-body strip-modern-body">
        <div className="strip-grid" aria-hidden />
        <div className="strip-modern-row">
          <span className="strip-tok strip-tok-pun">{"<"}</span>
          <span className="strip-tok strip-tok-tag">App</span>
          <span className="strip-tok strip-tok-attr">target</span>
          <span className="strip-tok strip-tok-pun">=</span>
          <span className="strip-tok strip-tok-str">&quot;aws&quot;</span>
          <span className="strip-tok strip-tok-pun">{"/>"}</span>
        </div>
        <div className="strip-modern-row">
          <span className="strip-tok strip-tok-key">async</span>
          <span className="strip-tok strip-tok-key">function</span>
          <span className="strip-tok strip-tok-fn">verify</span>
          <span className="strip-tok strip-tok-pun">()</span>
        </div>
        <div className="strip-modern-row">
          <span className="strip-tok strip-tok-key">return</span>
          <span className="strip-tok strip-tok-fn">deploy</span>
          <span className="strip-tok strip-tok-pun">(</span>
          <span className="strip-tok strip-tok-str">&quot;prod&quot;</span>
          <span className="strip-tok strip-tok-pun">)</span>
        </div>
        <div className="strip-modern-bars">
          <span className="strip-bar strip-bar-1" />
          <span className="strip-bar strip-bar-2" />
          <span className="strip-bar strip-bar-3" />
          <span className="strip-bar strip-bar-4" />
        </div>
      </div>
      <div className="strip-foot">
        <span className="strip-foot-dot strip-foot-dot-glow" />
        <span>typescript · react · k8s · iac</span>
      </div>
    </article>
  );
}

function HologramPanel() {
  return (
    <article className="strip-panel strip-holo">
      <div className="strip-chrome">
        <span className="strip-dot strip-dot-r" />
        <span className="strip-dot strip-dot-y" />
        <span className="strip-dot strip-dot-g" />
        <span className="strip-tag strip-tag-glow">ai.forge</span>
      </div>
      <div className="strip-body strip-holo-body">
        <div className="strip-holo-grid" aria-hidden />
        <svg viewBox="0 0 200 120" className="strip-holo-svg" aria-hidden>
          <defs>
            <linearGradient id="hologrid" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ff6a3d" />
            </linearGradient>
            <radialGradient id="holocore" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="60" r="46" fill="url(#holocore)" />
          <circle cx="100" cy="60" r="40" fill="none" stroke="url(#hologrid)" strokeWidth="1.2" opacity="0.7" />
          <ellipse cx="100" cy="60" rx="48" ry="14" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
          <ellipse cx="100" cy="60" rx="48" ry="14" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5" transform="rotate(60 100 60)" />
          <ellipse cx="100" cy="60" rx="48" ry="14" fill="none" stroke="#ff6a3d" strokeWidth="1" opacity="0.5" transform="rotate(-60 100 60)" />
          <circle cx="100" cy="60" r="4" fill="#fff" />
        </svg>
        <span className="strip-holo-tag">AI · semantic transpile</span>
      </div>
      <div className="strip-foot">
        <span className="strip-foot-dot strip-foot-dot-cyan" />
        <span>analyse · convert · verify · deploy</span>
      </div>
    </article>
  );
}

function DashboardPanel() {
  return (
    <article className="strip-panel strip-dash">
      <div className="strip-chrome">
        <span className="strip-dot strip-dot-r" />
        <span className="strip-dot strip-dot-y" />
        <span className="strip-dot strip-dot-g" />
        <span className="strip-tag strip-tag-glow">dashboard</span>
      </div>
      <div className="strip-body strip-dash-body">
        <div className="strip-dash-row">
          <div className="strip-kpi">
            <span className="strip-kpi-num">5</span>
            <span className="strip-kpi-lbl">steps</span>
          </div>
          <div className="strip-kpi">
            <span className="strip-kpi-num">6</span>
            <span className="strip-kpi-lbl">quality gates</span>
          </div>
          <div className="strip-kpi">
            <span className="strip-kpi-num">12</span>
            <span className="strip-kpi-lbl">repair rounds</span>
          </div>
        </div>
        <svg viewBox="0 0 200 60" className="strip-dash-chart" aria-hidden>
          <defs>
            <linearGradient id="chartgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6ff3a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d6ff3a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 50 L 20 42 L 40 46 L 60 30 L 80 34 L 100 22 L 120 26 L 140 14 L 160 18 L 180 8 L 200 12 L 200 60 L 0 60 Z" fill="url(#chartgrad)" />
          <path d="M 0 50 L 20 42 L 40 46 L 60 30 L 80 34 L 100 22 L 120 26 L 140 14 L 160 18 L 180 8 L 200 12" fill="none" stroke="#d6ff3a" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="strip-foot">
        <span className="strip-foot-dot strip-foot-dot-glow" />
        <span>live · ops · compliance</span>
      </div>
    </article>
  );
}

type PanelKey = "legacy-cobol" | "holo" | "modern-app" | "dash" | "legacy-vb6" | "modern-iac";

function renderPanel(kind: PanelKey, suffix: string) {
  switch (kind) {
    case "legacy-cobol":
      return <LegacyPanel key={`l1-${suffix}`} tag="cobol.legacy" />;
    case "holo":
      return <HologramPanel key={`h1-${suffix}`} />;
    case "modern-app":
      return <ModernPanel key={`m1-${suffix}`} tag="App.tsx" />;
    case "dash":
      return <DashboardPanel key={`d1-${suffix}`} />;
    case "legacy-vb6":
      return <LegacyPanel key={`l2-${suffix}`} tag="vb6.module" />;
    case "modern-iac":
      return <ModernPanel key={`m2-${suffix}`} tag="cloud.iac" />;
  }
}

const SEQUENCE: PanelKey[] = [
  "legacy-cobol",
  "holo",
  "modern-app",
  "dash",
  "legacy-vb6",
  "modern-iac",
];

function Track() {
  return (
    <div className="strip-track marquee-track-slow">
      {SEQUENCE.map((k) => renderPanel(k, "a"))}
      {SEQUENCE.map((k) => renderPanel(k, "b"))}
    </div>
  );
}

export default function ImageStripMarquee() {
  return (
    <section aria-label="Legacy to modern — visual showcase" className="strip-section">
      <div className="strip-bg-glow" aria-hidden />
      <div className="strip-edge strip-edge-l" aria-hidden />
      <div className="strip-edge strip-edge-r" aria-hidden />
      <div className="strip-viewport">
        <Track />
      </div>
    </section>
  );
}
