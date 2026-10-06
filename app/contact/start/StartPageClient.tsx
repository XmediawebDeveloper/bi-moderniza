"use client";

import { useMemo, useState } from "react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import MagneticButton from "../../components/MagneticButton";
import CardIcon from "../../components/CardIcon";
import ContactRobot from "../../components/ContactRobot";
import type { StartPage } from "../../lib/strapi";

type ContactForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  industry: string;
};

type FormErrors = Partial<Record<keyof ContactForm | "submit", string>>;

const HERO_EYEBROW_FALLBACK = "/ Contact";
const HERO_TITLE_FALLBACK = "Tell us who to contact.";
const HERO_LEDE_FALLBACK =
  "Share your business contact details and a member of the growth team will follow up. Company email and a valid contact number are required.";

const META_FALLBACK = [
  { text: "Company email required" },
  { text: "Sent to growth@businessintegra.com" },
  { text: "No calendar booking required" },
];

const CONFIRMATION_TITLE_FALLBACK = "Thanks - we have your details.";
const CONFIRMATION_BODY_FALLBACK =
  "Your contact details have been sent to the growth team. We will follow up using the company email or phone number you provided.";

const INITIAL_FORM: ContactForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  jobTitle: "",
  industry: "",
};

const FORM_STEPS = [
  ["01", "Identity", "Name and company"],
  ["02", "Reach", "Business email and phone"],
  ["03", "Context", "Role and industry"],
];

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.co.uk",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "rediffmail.com",
  "yandex.com",
  "zoho.com",
]);

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

function isFreeEmailDomain(domain: string) {
  return Array.from(FREE_EMAIL_DOMAINS).some(
    (freeDomain) => domain === freeDomain || domain.endsWith(`.${freeDomain}`),
  );
}

function isCompanyEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  const domain = trimmed.split("@")[1];
  return !!domain && !isFreeEmailDomain(domain);
}

function isSequentialDigits(digits: string) {
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  return ascending.includes(digits) || descending.includes(digits);
}

function isWeakPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) return true;
  if (/^(\d)\1+$/.test(digits)) return true;
  if (isSequentialDigits(digits)) return true;
  return false;
}

function validateField(field: keyof ContactForm, value: string): string | undefined {
  if (field === "firstName" && !value.trim()) return "First name is required.";
  if (field === "lastName" && !value.trim()) return "Last name is required.";
  if (field === "company" && !value.trim()) return "Company is required.";

  if (field === "email") {
    if (!value.trim()) return "Email is required.";
    if (!isCompanyEmail(value)) return "Invalid email.";
  }

  if (field === "phone") {
    if (!value.trim()) return "Phone or contact number is required.";
    if (isWeakPhone(value)) return "Invalid phone number.";
  }

  return undefined;
}

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};

  (["firstName", "lastName", "company", "email", "phone"] as Array<keyof ContactForm>).forEach((field) => {
    const error = validateField(field, form[field]);
    if (error) errors[field] = error;
  });

  return errors;
}

export default function StartPageClient({ data }: { data: StartPage | null }) {
  const eyebrow = data?.hero_eyebrow ?? HERO_EYEBROW_FALLBACK;
  const title = data?.hero_title ?? HERO_TITLE_FALLBACK;
  const lede = data?.hero_lede ?? HERO_LEDE_FALLBACK;
  const meta = data?.hero_meta?.length ? data.hero_meta : META_FALLBACK;
  const confirmationTitle = data?.confirmation_title ?? CONFIRMATION_TITLE_FALLBACK;
  const confirmationBody = data?.confirmation_body ?? CONFIRMATION_BODY_FALLBACK;

  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const titleNode = useMemo(() => {
    const words = title.split(" ");
    if (words.length < 3) return <>{title}</>;
    const head = words.slice(0, -2).join(" ");
    const tail = words.slice(-2).join(" ");
    return (
      <>
        {head} <span className="text-gradient">{tail}</span>
      </>
    );
  }, [title]);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, submit: undefined }));
  };

  const validateInput = (field: keyof ContactForm) => {
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error, submit: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact/start", {
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
      setForm(INITIAL_FORM);
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "contact-input mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-base text-ink shadow-[0_1px_0_rgba(10,10,11,0.04)] placeholder:text-ink/35 transition-colors focus:border-ember focus:bg-white focus:text-ink focus:outline-none focus:ring-4 focus:ring-ember/10 sm:h-14";

  const renderInput = (
    field: keyof ContactForm,
    label: string,
    options: {
      required?: boolean;
      type?: string;
      placeholder?: string;
      autoComplete?: string;
      className?: string;
    } = {},
  ) => (
    <label className={`block min-w-0 ${options.className ?? ""}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/55 sm:text-[11px] sm:tracking-[0.18em]">
        {label}
        {options.required && <span className="text-ember"> *</span>}
      </span>
      <input
        type={options.type ?? "text"}
        required={options.required}
        value={form[field]}
        placeholder={options.placeholder}
        autoComplete={options.autoComplete}
        onChange={(e) => updateField(field, e.target.value)}
        onBlur={() => validateInput(field)}
        className={[
          inputClass,
          errors[field] ? "border-ember focus:border-ember" : "",
        ].join(" ")}
        aria-invalid={!!errors[field]}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
      />
      {errors[field] && (
        <p id={`${field}-error`} className="mt-2 text-sm font-medium leading-snug text-ember">
          {errors[field]}
        </p>
      )}
    </label>
  );

  return (
    <>
      <PageHero
        crumb={[{ label: "Contact", href: "#" }, { label: "Start a project" }]}
        eyebrow={eyebrow}
        title={titleNode}
        lede={lede}
        meta={
          <>
            {meta.map((m, i) => (
              <span key={i}>
                {m.text}
                {i < meta.length - 1 && <span> · </span>}
              </span>
            ))}
          </>
        }
        rightSlot={<ContactRobot className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <section className="relative bg-chalk text-ink">
        <div className="absolute inset-0 bg-grid-soft opacity-60" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-5 sm:py-18 md:px-8 md:py-24 lg:py-32">
          {submitted ? (
            <Reveal className="rounded-2xl border border-ember/30 bg-white/80 p-6 sm:p-8 md:rounded-3xl md:p-14">
              <span className="rounded-full bg-ember/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ember">
                Sent
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {confirmationTitle}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">
                {confirmationBody}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticButton href="/" className="h-12 w-full rounded-full bg-ink px-6 text-sm font-semibold text-chalk sm:w-auto">
                  Back home
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="h-12 w-full rounded-full border border-ink/25 px-6 text-sm sm:w-auto"
                >
                  Send another
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="grid min-w-0 gap-5 md:gap-8 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-start">
              <Reveal className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink text-chalk shadow-[0_24px_80px_rgba(10,10,11,0.22)] md:rounded-3xl">
                  <div className="relative p-5 sm:p-6 md:p-7">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="relative">
                      <CardIcon kind="shield" tone="dark" className="h-11 w-11 sm:h-12 sm:w-12" />
                      <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-glow sm:mt-6 sm:text-[11px] sm:tracking-[0.22em]">
                        Secure intake
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                        Send the right details to the growth team.
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-chalk/70">
                        This form only accepts business contact information. Free email providers and weak phone numbers are rejected before submission.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-4 sm:p-5">
                    <ol className="grid gap-3 sm:grid-cols-3 lg:block lg:space-y-3">
                      {FORM_STEPS.map(([no, label, body]) => (
                        <li key={no} className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-3 sm:px-4">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-glow/30 font-mono text-xs text-glow">
                            {no}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold">{label}</span>
                            <span className="block text-xs leading-snug text-chalk/55">{body}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="break-words border-t border-white/10 bg-white/[0.03] px-5 py-4 text-xs leading-relaxed text-chalk/60 sm:px-7 sm:py-5">
                    Destination: <span className="font-mono text-glow">growth@businessintegra.com</span>
                  </div>
                </div>
              </Reveal>

              <form onSubmit={handleSubmit} className="min-w-0 space-y-5" noValidate>
                <Reveal className="overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-[0_22px_70px_rgba(10,10,11,0.12)] md:rounded-3xl">
                  <div className="border-b border-ink/10 bg-white/70 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <CardIcon kind="person" tone="light" className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-ink/55 sm:text-[11px] sm:tracking-[0.22em]">
                            Required
                          </p>
                          <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                            Contact details
                          </h2>
                        </div>
                      </div>
                      <span className="w-fit rounded-full bg-ember/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">
                        * Required
                      </span>
                    </div>
                  </div>

                  <div className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-6 md:grid-cols-2 md:p-8">
                    {renderInput("firstName", "First Name", {
                      required: true,
                      placeholder: "First name",
                      autoComplete: "given-name",
                    })}
                    {renderInput("lastName", "Last Name", {
                      required: true,
                      placeholder: "Last name",
                      autoComplete: "family-name",
                    })}
                    {renderInput("company", "Company", {
                      required: true,
                      placeholder: "Company name",
                      autoComplete: "organization",
                      className: "md:col-span-2",
                    })}
                    {renderInput("email", "Email (Required)", {
                      required: true,
                      type: "email",
                      placeholder: "name@company.com",
                      autoComplete: "email",
                    })}
                    {renderInput("phone", "Phone / Contact Number (Required)", {
                      required: true,
                      type: "tel",
                      placeholder: "+1 555 234 7890",
                      autoComplete: "tel",
                    })}
                  </div>
                </Reveal>

                <Reveal delay={1} className="overflow-hidden rounded-2xl border border-ink/10 bg-white/65 shadow-[0_14px_50px_rgba(10,10,11,0.08)] md:rounded-3xl">
                  <div className="border-b border-ink/10 px-4 py-4 sm:px-6 sm:py-5 md:px-8">
                    <div className="flex items-center gap-3">
                      <CardIcon kind="blueprint" tone="light" className="h-10 w-10 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-ink/55 sm:text-[11px] sm:tracking-[0.22em]">
                          Optional
                        </p>
                        <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                          Context
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="grid min-w-0 gap-4 p-4 sm:gap-5 sm:p-6 md:grid-cols-2 md:p-8">
                    {renderInput("jobTitle", "Job Title", {
                      placeholder: "Chief Technology Officer",
                      autoComplete: "organization-title",
                    })}
                    {renderInput("industry", "Industry", {
                      placeholder: "Federal, Healthcare, Finance...",
                    })}
                  </div>
                </Reveal>

                {errors.submit && (
                  <Reveal className="rounded-2xl border border-ember/30 bg-ember/10 px-4 py-4 text-sm font-medium text-ember sm:px-5">
                    {errors.submit}
                  </Reveal>
                )}

                <Reveal delay={2} className="rounded-2xl border border-ink/10 bg-white/70 p-4 sm:p-5 md:rounded-3xl md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <span className="max-w-xl text-sm leading-relaxed text-ink/60">
                      Required fields are checked before submission.
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={[
                        "inline-flex h-12 w-full shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors md:w-auto",
                        submitting
                          ? "bg-ink/30 text-ink/50 cursor-not-allowed"
                          : "bg-ink text-chalk hover:bg-graphite",
                      ].join(" ")}
                    >
                      {submitting ? "Sending..." : "Submit details"}
                    </button>
                  </div>
                </Reveal>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
