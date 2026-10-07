"use client";

import { useEffect, useRef, useState } from "react";

/* Sticky Trust Center section menu. Highlights the tab of the section currently
   on screen and keeps that tab scrolled into view on narrow screens. */
export default function SectionTabs({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [fade, setFade] = useState({ left: false, right: false });
  const barRef = useRef<HTMLDivElement | null>(null);

  // Edge fades hint that more tabs are off-screen when the bar has to scroll.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const check = () =>
      setFade({
        left: bar.scrollLeft > 2,
        right: bar.scrollLeft + bar.clientWidth < bar.scrollWidth - 2,
      });
    check();
    bar.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      bar.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      // Site header (64px) + this bar; a section becomes active once its top passes below them.
      const offset = 64 + (barRef.current?.offsetHeight ?? 48) + 24;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = items[0]?.id;
      if (atBottom) {
        current = items[items.length - 1]?.id;
      } else {
        for (const it of items) {
          const el = document.getElementById(it.id);
          if (el && el.getBoundingClientRect().top - offset <= 0) current = it.id;
        }
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  useEffect(() => {
    const bar = barRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !tab) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className="sticky top-16 z-40 border-b border-white/10 bg-ink/95 backdrop-blur-xl">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div
          ref={barRef}
          className="flex flex-nowrap items-center gap-1 overflow-x-auto py-2.5 text-[12px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:justify-between lg:gap-0.5 lg:text-[11px] xl:text-[13px]"
        >
          {items.map((s) => {
            const on = s.id === active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-tab={s.id}
                aria-current={on ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition-colors lg:px-2 xl:px-3.5 ${
                  on
                    ? "bg-glow font-semibold text-ink"
                    : "text-chalk/85 hover:bg-white/10 hover:text-glow"
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </div>
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-5 w-10 bg-gradient-to-r from-ink to-transparent transition-opacity md:left-8 ${fade.left ? "opacity-100" : "opacity-0"}`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-5 w-10 bg-gradient-to-l from-ink to-transparent transition-opacity md:right-8 ${fade.right ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </nav>
  );
}
