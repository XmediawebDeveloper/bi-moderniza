import CardIcon, { type IconKind } from "./CardIcon";

const INDUSTRIES: Array<{ label: string; icon: IconKind }> = [
  { label: "Healthcare", icon: "heart" },
  { label: "Manufacturing", icon: "gear" },
  { label: "Logistics", icon: "rocket" },
  { label: "Retail", icon: "cart" },
  { label: "Telecom", icon: "pulse" },
  { label: "Aviation", icon: "flag" },
  { label: "Utilities", icon: "bolt" },
  { label: "Pharma", icon: "shield" },
  { label: "Banking", icon: "bank" },
  { label: "Insurance", icon: "umbrella" },
  { label: "Government", icon: "blueprint" },
  { label: "Energy", icon: "cloud" },
];

function Pill({ label, icon }: { label: string; icon: IconKind }) {
  return (
    <span className="industry-pill">
      <CardIcon kind={icon} tone="dark" className="industry-pill-icon h-8 w-8" />
      <span className="industry-pill-label">{label}</span>
    </span>
  );
}

function Track({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`industries-track ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
      {[...INDUSTRIES, ...INDUSTRIES].map((it, i) => (
        <Pill key={`${reverse ? "r" : "f"}-${i}`} label={it.label} icon={it.icon} />
      ))}
    </div>
  );
}

export default function IndustriesMarquee() {
  return (
    <section aria-label="Industries we modernize" className="industries-section">
      <div className="industries-bg-glow" aria-hidden />
      <div className="industries-edge industries-edge-l" aria-hidden />
      <div className="industries-edge industries-edge-r" aria-hidden />

      <p className="industries-eyebrow">Built for the industries that can&apos;t afford to break</p>

      <div className="industries-viewport">
        <Track />
      </div>
    </section>
  );
}
