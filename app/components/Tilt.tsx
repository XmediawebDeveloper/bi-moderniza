"use client";

import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** max tilt in deg */
  max?: number;
  /** glare overlay opacity at edge */
  glare?: number;
};

export default function Tilt({ children, className = "", max = 8, glare = 0.18 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * max * 2;
    const ry = (x - 0.5) * max * 2;
    el.style.setProperty("--tilt-rx", `${rx}deg`);
    el.style.setProperty("--tilt-ry", `${ry}deg`);
    el.style.setProperty("--tilt-mx", `${x * 100}%`);
    el.style.setProperty("--tilt-my", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-rx", `0deg`);
    el.style.setProperty("--tilt-ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform:
          "perspective(900px) rotateX(var(--tilt-rx,0deg)) rotateY(var(--tilt-ry,0deg))",
        transition: "transform 200ms ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at var(--tilt-mx,50%) var(--tilt-my,50%), rgba(214,255,58,${glare}) 0%, transparent 55%)`,
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      />
    </div>
  );
}
