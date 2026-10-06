"use client";

/**
 * RobotStage — choreographer for the hero transformation.
 *
 * Loops: legacy MK1 unit (RobotMascot) idle-scans → professional morph
 * transition → modern AI unit (CyberMech) idle-observes → reverse morph
 * → repeat. Each unit occupies the same slot so the visual swap reads
 * as a "modernization upgrade" rather than two robots side-by-side.
 *
 * Reduced-motion: skips the morph and cross-fades cleanly.
 */

import { useEffect, useRef, useState } from "react";
import RobotMascot from "./RobotMascot";
import CyberMech from "./CyberMech";

const PHASE_MS = 8400;        // how long each unit holds before the morph
const TRANSFORM_MS = 1200;    // morph duration (matches CSS)

type Active = "mascot" | "cyber";

export default function RobotStage({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<Active>("mascot");
  const [transforming, setTransforming] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tick = () => {
      setTransforming(true);
      flashRef.current = setTimeout(() => {
        setActive((prev) => (prev === "mascot" ? "cyber" : "mascot"));
        setTransforming(false);
        cycleRef.current = setTimeout(tick, PHASE_MS);
      }, TRANSFORM_MS);
    };

    cycleRef.current = setTimeout(tick, PHASE_MS);
    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current);
      if (flashRef.current) clearTimeout(flashRef.current);
    };
  }, []);

  const label =
    active === "mascot"
      ? transforming
        ? "modernizing →"
        : "legacy · mk1 · 1997"
      : transforming
        ? "← restoring baseline"
        : "moderniza · v3.0 · online";

  return (
    <div className={`robot-stage ${className}`}>
      <div className={`robot-slot ${active === "mascot" ? "is-active" : ""} ${transforming ? "is-transforming" : ""}`}>
        <RobotMascot className="h-full w-full" />
      </div>
      <div className={`robot-slot ${active === "cyber" ? "is-active" : ""} ${transforming ? "is-transforming" : ""}`}>
        <CyberMech className="h-full w-full" />
      </div>

      <div className={`stage-flash ${transforming ? "is-firing" : ""}`} aria-hidden />
      <div className={`stage-scan  ${transforming ? "is-firing" : ""}`} aria-hidden />

      <div className="stage-hud" aria-hidden>
        <span className="stage-hud-dot" />
        <span>{label}</span>
      </div>
    </div>
  );
}
