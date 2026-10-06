"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** strength of the pull, in px */
  strength?: number;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 14,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inner = useRef<HTMLSpanElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    const lab = inner.current;
    if (!el || !lab) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    lab.style.transform = `translate(${(x / rect.width) * (strength * 0.6)}px, ${(y / rect.height) * (strength * 0.6)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    const lab = inner.current;
    if (!el || !lab) return;
    el.style.transform = "translate(0,0)";
    lab.style.transform = "translate(0,0)";
  };

  return (
    <Link
      href={href}
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 320ms cubic-bezier(0.2,0.7,0.2,1)" }}
      className={`inline-flex items-center justify-center will-change-transform ${className}`}
    >
      <span ref={inner} style={{ transition: "transform 320ms cubic-bezier(0.2,0.7,0.2,1)" }} className="will-change-transform inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
