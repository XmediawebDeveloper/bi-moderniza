"use client";

/**
 * CookieConsent — first-visit cookie banner.
 *
 * - Shows once the intro loader finishes (or after a fallback delay) when no
 *   choice has been stored yet.
 * - The choice is stored in a first-party cookie (`moderniza_consent`, 1 year)
 *   so it is also readable server-side, mirrored to localStorage.
 * - Fires `cookie:consent` with the stored preferences whenever they change.
 * - `<CookieSettingsButton />` (or dispatching `cookie:open`) reopens it.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const COOKIE_NAME = "moderniza_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const FALLBACK_MS = 4500;

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function readConsent(): ConsentPrefs | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  try {
    if (raw) return JSON.parse(decodeURIComponent(raw));
    const ls = window.localStorage.getItem(COOKIE_NAME);
    return ls ? JSON.parse(ls) : null;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean, marketing: boolean) {
  const prefs: ConsentPrefs = {
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  const value = encodeURIComponent(JSON.stringify(prefs));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  try {
    window.localStorage.setItem(COOKIE_NAME, JSON.stringify(prefs));
  } catch {}
  window.dispatchEvent(new CustomEvent("cookie:consent", { detail: prefs }));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const reopen = () => {
      const prev = readConsent();
      setAnalytics(prev?.analytics ?? false);
      setMarketing(prev?.marketing ?? false);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("cookie:open", reopen);

    if (readConsent()) return () => window.removeEventListener("cookie:open", reopen);

    const show = () => setOpen(true);
    const t = window.setTimeout(show, FALLBACK_MS);
    window.addEventListener("intro:done", show, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("intro:done", show);
      window.removeEventListener("cookie:open", reopen);
    };
  }, []);

  const save = (a: boolean, m: boolean) => {
    writeConsent(a, m);
    setOpen(false);
    setCustom(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-chalk/10 bg-char/95 p-5 text-chalk shadow-2xl backdrop-blur sm:left-auto sm:right-6 sm:bottom-6 sm:mx-0"
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-mist">
            <span className="flex h-2 w-2 rounded-full bg-glow" />
            Cookies
          </div>
          <p className="mt-3 text-sm leading-relaxed text-bone/90">
            We use essential cookies to run this site, and — with your permission — analytics and
            marketing cookies to understand usage and improve our content.
          </p>

          {custom && (
            <div className="mt-4 space-y-2">
              <Toggle label="Strictly necessary" hint="Always on" checked disabled />
              <Toggle label="Analytics" hint="Usage statistics" checked={analytics} onChange={setAnalytics} />
              <Toggle label="Marketing" hint="Personalised content" checked={marketing} onChange={setMarketing} />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => save(true, true)}
              className="rounded-full bg-glow px-4 py-2 text-sm font-medium text-ink transition hover:brightness-110"
            >
              Accept all
            </button>
            <button
              onClick={() => save(false, false)}
              className="rounded-full border border-chalk/20 px-4 py-2 text-sm text-chalk transition hover:border-chalk/50"
            >
              Reject non-essential
            </button>
            {custom ? (
              <button
                onClick={() => save(analytics, marketing)}
                className="rounded-full border border-glow/40 px-4 py-2 text-sm text-glow transition hover:border-glow"
              >
                Save preferences
              </button>
            ) : (
              <button
                onClick={() => setCustom(true)}
                className="px-2 py-2 text-sm text-mist underline-offset-4 transition hover:text-chalk hover:underline"
              >
                Customize
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toggle({
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-center justify-between rounded-xl border border-chalk/10 px-3 py-2 ${
        disabled ? "opacity-60" : "cursor-pointer"
      }`}
    >
      <span>
        <span className="block text-sm text-chalk">{label}</span>
        <span className="block text-xs text-mist">{hint}</span>
      </span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="relative h-5 w-9 rounded-full bg-graphite transition peer-checked:bg-glow peer-focus-visible:ring-2 peer-focus-visible:ring-glow/60 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-chalk after:transition peer-checked:after:translate-x-4 peer-checked:after:bg-ink" />
    </label>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("cookie:open"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
