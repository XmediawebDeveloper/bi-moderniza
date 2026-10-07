"use client";

import { useState } from "react";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import CardIcon from "../components/CardIcon";

/* ============================================================================
   Demo request form — fields follow "Moderniza — Website Content" v1.0,
   Page 13 (Contact / Book a demo).
   ========================================================================== */

export const ROLE_OPTIONS = ["CIO/CTO", "Architect", "Application owner", "Security/Compliance", "System integrator", "Other"] as const;
export const LEGACY_OPTIONS = ["COBOL/Mainframe", "IBM i/RPG", ".NET/VB6", "Java", "Salesforce", "Oracle", "PHP", "Other"] as const;
export const SIZE_OPTIONS = ["Under 100K lines", "100K–1M lines", "Over 1M lines", "Not sure"] as const;
export const HOSTING_OPTIONS = ["SaaS", "Self-hosted", "Air-gapped", "GovCloud", "Not sure"] as const;

type DemoForm = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  legacyTech: string[];
  size: string;
  hosting: string;
  message: string;
};

type FormErrors = Partial<Record<keyof DemoForm | "submit", string>>;

const INITIAL: DemoForm = {
  fullName: "",
  email: "",
  company: "",
  role: "",
  legacyTech: [],
  size: "",
  hosting: "",
  message: "",
};

const NEXT_STEPS = [
  ["01", "We talk", "A short call about your system and goals."],
  ["02", "We scan", "We run a Repo Scan on a repository you choose."],
  ["03", "You decide", "You review the blueprint and estimate before anything is built."],
];

const FREE_EMAIL_DOMAINS = [
  "gmail.com", "googlemail.com", "hotmail.co.uk", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "ymail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "aol.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "mail.com", "gmx.com", "rediffmail.com", "yandex.com", "zoho.com",
];

function isWorkEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  const domain = trimmed.split("@")[1];
  return !!domain && !FREE_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

function validate(form: DemoForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) errors.email = "Work email is required.";
  else if (!isWorkEmail(form.email)) errors.email = "Please use your work email address.";
  if (!form.company.trim()) errors.company = "Company is required.";
  return errors;
}

const inputClass =
  "contact-input mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-base text-ink shadow-[0_1px_0_rgba(10,10,11,0.04)] placeholder:text-ink/35 transition-colors focus:border-ember focus:bg-white focus:text-ink focus:outline-none focus:ring-4 focus:ring-ember/10 sm:h-14";
const labelClass =
  "block type-eyebrow text-ink/55";

export default function ContactForm() {
  const [form, setForm] = useState<DemoForm>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof DemoForm>(field: K, value: DemoForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, submit: undefined }));
  };

  const toggleLegacy = (value: string) => {
    set(
      "legacyTech",
      form.legacyTech.includes(value) ? form.legacyTech.filter((v) => v !== value) : [...form.legacyTech, value],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setErrors({ submit: body?.error ?? "We could not send the form. Please try again." });
        return;
      }
      setSubmitted(true);
      setForm(INITIAL);
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (field: keyof DemoForm) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-sm font-medium leading-snug text-ember">{errors[field]}</p>
    ) : null;

  const selectNode = (field: "role" | "size" | "hosting", label: string, options: readonly string[]) => (
    <label className="block min-w-0">
      <span className={labelClass}>{label}</span>
      <select
        value={form[field]}
        onChange={(e) => set(field, e.target.value)}
        className={inputClass}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );

  return (
    <section className="relative bg-chalk text-ink">
      <div className="absolute inset-0 bg-grid-soft opacity-60" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 sec-pad">
        {submitted ? (
          <Reveal className="rounded-2xl border border-ember/30 bg-white/80 p-6 sm:p-8 md:rounded-3xl md:p-14">
            <span className="rounded-full bg-ember/15 px-3 py-1 type-eyebrow text-ember">Sent</span>
            <h2 className="mt-6 type-h2">Thanks — we have your request.</h2>
            <p className="mt-5 type-lede text-ink/75">
              We will reply shortly to set up your demo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton href="/" className="h-12 w-full rounded-full bg-ink px-6 text-sm font-semibold text-chalk sm:w-auto">Back home</MagneticButton>
              <button type="button" onClick={() => setSubmitted(false)} className="h-12 w-full rounded-full border border-ink/25 px-6 text-sm sm:w-auto">Send another</button>
            </div>
          </Reveal>
        ) : (
          <div className="grid min-w-0 gap-5 md:gap-8 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-start">
            {/* What happens next */}
            <Reveal className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink text-chalk shadow-[0_24px_80px_rgba(10,10,11,0.22)] md:rounded-3xl">
                <div className="relative p-5 sm:p-6 md:p-7">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative">
                    <CardIcon kind="analyse" tone="dark" className="h-11 w-11 sm:h-12 sm:w-12" />
                    <p className="mt-6 type-eyebrow text-glow">What happens next</p>
                    <h2 className="mt-3 type-h3">Three steps, nothing built until you say so.</h2>
                  </div>
                </div>
                <div className="border-t border-white/10 p-4 sm:p-5">
                  <ol className="grid gap-3 sm:grid-cols-3 lg:block lg:space-y-3">
                    {NEXT_STEPS.map(([no, label, body]) => (
                      <li key={no} className="flex min-w-0 items-start gap-3 rounded-2xl bg-white/[0.04] px-3 py-3 sm:px-4">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-glow/30 type-eyebrow !tracking-normal text-glow">{no}</span>
                        <span className="min-w-0">
                          <span className="block type-h4">{label}</span>
                          <span className="block type-small text-chalk/55">{body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <form onSubmit={handleSubmit} className="min-w-0 space-y-5" noValidate>
              <Reveal className="overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-[0_22px_70px_rgba(10,10,11,0.12)] md:rounded-3xl">
                <div className="border-b border-ink/10 bg-white/70 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                  <div className="flex items-center gap-3">
                    <CardIcon kind="person" tone="light" className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
                    <div className="min-w-0">
                      <p className="type-eyebrow text-ink/55">About you</p>
                      <h2 className="mt-1 type-h3">Request my demo</h2>
                    </div>
                  </div>
                </div>

                <div className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-6 md:grid-cols-2 md:p-8">
                  <label className="block min-w-0">
                    <span className={labelClass}>Full name <span className="text-ember">*</span></span>
                    <input type="text" required value={form.fullName} autoComplete="name" placeholder="Your name"
                      onChange={(e) => set("fullName", e.target.value)}
                      className={`${inputClass} ${errors.fullName ? "border-ember" : ""}`} aria-invalid={!!errors.fullName} />
                    {fieldError("fullName")}
                  </label>
                  <label className="block min-w-0">
                    <span className={labelClass}>Work email <span className="text-ember">*</span></span>
                    <input type="email" required value={form.email} autoComplete="email" placeholder="name@company.com"
                      onChange={(e) => set("email", e.target.value)}
                      className={`${inputClass} ${errors.email ? "border-ember" : ""}`} aria-invalid={!!errors.email} />
                    {fieldError("email")}
                  </label>
                  <label className="block min-w-0">
                    <span className={labelClass}>Company <span className="text-ember">*</span></span>
                    <input type="text" required value={form.company} autoComplete="organization" placeholder="Company name"
                      onChange={(e) => set("company", e.target.value)}
                      className={`${inputClass} ${errors.company ? "border-ember" : ""}`} aria-invalid={!!errors.company} />
                    {fieldError("company")}
                  </label>
                  {selectNode("role", "Role", ROLE_OPTIONS)}
                </div>
              </Reveal>

              <Reveal delay={1} className="overflow-hidden rounded-2xl border border-ink/10 bg-white/65 shadow-[0_14px_50px_rgba(10,10,11,0.08)] md:rounded-3xl">
                <div className="border-b border-ink/10 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                  <div className="flex items-center gap-3">
                    <CardIcon kind="blueprint" tone="light" className="h-10 w-10 shrink-0" />
                    <div className="min-w-0">
                      <p className="type-eyebrow text-ink/55">About your system</p>
                      <h3 className="mt-1 type-h3">Legacy technology, size and hosting</h3>
                    </div>
                  </div>
                </div>
                <div className="grid min-w-0 gap-5 p-4 sm:p-6 md:p-8">
                  <fieldset className="min-w-0">
                    <legend className={labelClass}>Legacy technology</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {LEGACY_OPTIONS.map((opt) => {
                        const on = form.legacyTech.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleLegacy(opt)}
                            className={[
                              "rounded-full border px-4 py-2 type-small transition-colors",
                              on ? "border-ink bg-ink text-chalk" : "border-ink/20 bg-white text-ink hover:border-ink/50",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    {selectNode("size", "Approximate size", SIZE_OPTIONS)}
                    {selectNode("hosting", "Hosting need", HOSTING_OPTIONS)}
                  </div>
                  <label className="block min-w-0">
                    <span className={labelClass}>Message</span>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Tell us about your system and what you want to achieve."
                      className="contact-input mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-ember focus:outline-none focus:ring-4 focus:ring-ember/10"
                    />
                  </label>
                </div>
              </Reveal>

              {errors.submit && (
                <Reveal className="rounded-2xl border border-ember/30 bg-ember/10 px-4 py-4 text-sm font-medium text-ember sm:px-5">{errors.submit}</Reveal>
              )}

              <Reveal delay={2} className="rounded-2xl border border-ink/10 bg-white/70 p-4 sm:p-5 md:rounded-3xl md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <span className="max-w-xl type-small text-ink/60">
                    Full name, work email and company are required.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={[
                      "inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors md:w-auto",
                      submitting ? "bg-ink/30 text-ink/50 cursor-not-allowed" : "bg-ink text-chalk hover:bg-graphite",
                    ].join(" ")}
                  >
                    {submitting ? "Sending…" : "Request my demo"}
                  </button>
                </div>
              </Reveal>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
