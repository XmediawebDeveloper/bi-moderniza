"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** percentage 0..100 */
  to: number;
  label: string;
  value: string;
  tint?: "glow" | "ember" | "mist";
  delay?: number;
};

const TINT: Record<NonNullable<Props["tint"]>, string> = {
  glow: "bg-glow",
  ember: "bg-ember",
  mist: "bg-mist",
};

export default function AnimatedBar({ to, label, value, tint = "mist", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setW(to), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, delay]);

  return (
    <div ref={ref} className="grid grid-cols-[1fr_auto] items-center gap-4">
      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] uppercase tracking-[0.16em] text-current opacity-70">
            {label}
          </span>
          <span className="font-mono text-[13px] tabular-nums opacity-80">{value}</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-current/10">
          <div
            className={`${TINT[tint]} h-full rounded-full`}
            style={{
              width: `${w}%`,
              transition: "width 1500ms cubic-bezier(0.2,0.7,0.2,1)",
              boxShadow:
                tint === "glow"
                  ? "0 0 24px rgba(214,255,58,0.5)"
                  : tint === "ember"
                  ? "0 0 18px rgba(255,106,61,0.45)"
                  : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
