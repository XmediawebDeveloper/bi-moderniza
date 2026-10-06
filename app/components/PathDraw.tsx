"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** ms */
  duration?: number;
};

/**
 * Wraps an inline SVG. When the wrapper enters the viewport, every <path>,
 * <line>, <polyline> and <circle> inside it gets its stroke-dasharray
 * computed and animated from full offset to 0 — i.e. it "draws itself".
 */
export default function PathDraw({ children, className = "", duration = 1800 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<SVGGeometryElement>("path,line,polyline,circle,rect")
    );

    targets.forEach((node) => {
      try {
        const len = (node as SVGPathElement).getTotalLength
          ? (node as SVGPathElement).getTotalLength()
          : 400;
        node.style.strokeDasharray = `${len}`;
        node.style.strokeDashoffset = `${len}`;
        node.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.77,0,0.175,1)`;
      } catch {
        /* getTotalLength not supported on some shapes — skip silently */
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !drawn) {
            targets.forEach((node, i) => {
              setTimeout(() => {
                node.style.strokeDashoffset = "0";
              }, i * 80);
            });
            setDrawn(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration, drawn]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
