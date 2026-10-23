import type { Metadata } from "next";
import type { ReactNode } from "react";
import Reveal from "../components/Reveal";
import CardIcon, { type IconKind } from "../components/CardIcon";
import MagneticButton from "../components/MagneticButton";
import SectionTabs from "./SectionTabs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GoModerniza Trust Center",
  description:
    "Moderniza is a Software as a Service (SaaS) offering that converts legacy estates (COBOL, VB6, PHP, Java, .NET and others) into modern, tested, containerised applications.",
};

/* ============================================================================
   TRUST CENTER — STATIC CONTENT
   ----------------------------------------------------------------------------
   Content follows "Moderniza Trust Center — Page Content" v1.0 (6 October 2026).
   Data is kept as plain consts so it maps 1:1 onto Strapi content types when
   this page is later wired to the CMS.
   ========================================================================== */

const SECTION_MENU: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "contacts", label: "Contacts" },
  { id: "services", label: "Service List" },
  { id: "configuration", label: "Secure Configuration Guidance" },
  { id: "authorization-package", label: "Authorization Package" },
  { id: "security", label: "Security & Continuous Monitoring" },
  { id: "subprocessors", label: "Sub-processors" },
  { id: "resources", label: "Resources" },
  { id: "access", label: "Access" },
];

type Spec = { label: string; value: ReactNode };

const ext = (href: string, text = href) => (
  <a href={href} className="font-medium text-ink underline decoration-ember decoration-2 underline-offset-2 hover:text-ember break-all">{text}</a>
);
const extDark = (href: string, text = href) => (
  <a href={href} className="text-glow hover:underline break-all">{text}</a>
);

const GENERAL_INFO: Spec[] = [
  { label: "Provider", value: "Business Integra Technology Solutions, Inc." },
  { label: "Cloud Service Offering", value: "Moderniza (acronym MODZ)" },
  { label: "FedRAMP program details", value: "Request the current program record and approved scope from the security team." },
  { label: "Program focus", value: "FedRAMP 20x evidence and readiness" },
  { label: "Authorization Path", value: "FedRAMP Program (20x)" },
  { label: "Service Model", value: "Software as a Service (SaaS)" },
  { label: "Deployment Model", value: "Public Cloud" },
  { label: "Business Category", value: "Development Tools; Artificial Intelligence (AI) — application modernization and legacy code conversion" },
  { label: "Security categorization", value: "Request the approved deployment-specific categorization." },
  { label: "Digital identity assurance", value: "Request the identity assurance assessment for your deployment." },
  { label: "FedRAMP Authorization Status", value: "Indicator measurement does not constitute authorization. Request current status and supporting evidence." },
  { label: "Hosting Environment", value: "Request the current hosting locations and backup configuration for your deployment." },
  { label: "UEI Number", value: "NBELUNT3NMG3" },
  { label: "CAGE Code", value: "3BGU6" },
  { label: "Assessment evidence", value: "Request the current assessment scope and any completed report." },
  { label: "Company Address", value: "6550 Rock Spring Drive, Suite 600, Bethesda, MD 20817-1185" },
  { label: "Product Website", value: ext("https://platform.gomoderniza.ai") },
  {
    label: "Product Logo",
    value: (
      <>
        <a
          href="/moderniza-logo.png"
          download="moderniza-logo.png"
          className="font-medium text-ink underline decoration-ember decoration-2 underline-offset-2 hover:text-ember break-all"
        >
          https://platform.gomoderniza.ai/moderniza-logo.png
        </a>{" "}
        (PNG download)
      </>
    ),
  },
];

const CONTACTS: { kind: string; icon: IconKind; details?: Spec[] }[] = [
  {
    kind: "Sales Contact",
    icon: "person",
    details: [
      { label: "", value: "Selva Jayaraman" },
      { label: "Email", value: extDark("mailto:growth@businessintegra.com", "growth@businessintegra.com") },
    ],
  },
  {
    kind: "Security Contact",
    icon: "shield",
    details: [
      { label: "", value: "Prathiba Ramadoss" },
      { label: "Email", value: extDark("mailto:Security@businessintegra.com", "Security@businessintegra.com") },
    ],
  },
  {
    kind: "Contacts",
    icon: "doc",
    details: [
      { label: "Office", value: "6550 Rock Spring Dr., Suite 600, Bethesda, MD 20817" },
    ],
  },
];

const SERVICES: { name: string; desc: string; category: string; inScope: "Yes" | "No" }[] = [
  { name: "Blueprint", desc: "Scans the uploaded legacy source (inventory, reading plan, business-rule extraction; unsafe files are quarantined) and produces the target architecture, epics, user stories and screen designs.", category: "Moderate", inScope: "Yes" },
  { name: "Contract", desc: "Defines the entities, APIs, business rules and screens the modern application must honor, built from the Blueprint and extracted rules.", category: "Moderate", inScope: "Yes" },
  { name: "Code", desc: "Splits the work into tasks and generates the application; accepted only after it builds, starts, answers API smoke tests, navigates correctly and passes its generated tests.", category: "Moderate", inScope: "Yes" },
  { name: "Testing", desc: "Runs the generated application, records every defect in an issue ledger and repairs it (Run & Fix), then produces the fidelity, maintainability and security code report.", category: "Moderate", inScope: "Yes" },
  { name: "Deploy", desc: "Deploys the delivery into the customer’s containers after the pre-deploy gates pass.", category: "Moderate", inScope: "Yes" },
  { name: "Business Rules", desc: "Review, editing and export of the extracted business rules.", category: "Moderate", inScope: "Yes" },
  { name: "Demo evidence page", desc: "Public, human-readable rendering of live control evidence.", category: "Moderate", inScope: "No" },
];

const BASELINE_GUIDES: { title: string; body: string; href: string }[] = [
  { title: "CIS PostgreSQL 16 Benchmark", body: "CIS consensus hardening baseline for PostgreSQL 16, the version Moderniza runs.", href: "https://www.cisecurity.org/benchmark/postgresql" },
  { title: "CIS Docker Benchmark", body: "CIS consensus hardening baseline for Docker, used for the customer delivery containers.", href: "https://www.cisecurity.org/benchmark/docker" },
];

const PACKAGE_CONTENTS: [string, string][] = [
  ["01", "Certification Package Overview"],
  ["02", "Policies and Procedures (17 NIST family policies, topic policies, plans and procedures)"],
  ["03", "Cryptographic Modules"],
  ["04", "Security Decision Record"],
  ["05", "KSI Implementation and Validation"],
  ["06", "KSI Evidence"],
  ["07", "Inventory"],
  ["08", "Minimum Assessment Scope"],
  ["09", "Architecture and Data Flow Diagrams"],
  ["10", "Subprocessors"],
  ["11", "Secure Configuration"],
  ["12", "Change Management"],
  ["13", "Vulnerability and Detection"],
  ["14", "Incident Response"],
  ["15", "Continuous Validation"],
  ["16", "Plan of Action and Milestones (POA&M)"],
  ["17", "Security Decision Log"],
];

const SECURITY_CARDS: { title: string; body: ReactNode; icon: IconKind; wide?: boolean }[] = [
  { title: "Internal Security", icon: "shield", body: "Moderniza’s security program is written down in 17 NIST SP 800-53 family policies (Access Control to System and Information Integrity) plus a Vulnerability Disclosure Program. Approval of the policies by the policy owner is in progress. A Security Lead owns the program; the CTO is the security reviewer and the CEO the policy owner." },
  {
    title: "Encryption",
    icon: "bolt",
    body: [
      "Request the deployed password-hashing configuration and its implementation evidence.",
      "Request the encryption and signing algorithms, key-management configuration and verification tests for your deployment.",
      "Request the current external TLS configuration and scan results.",
      "Request the backup schedule, retention, encryption and key-management configuration, last successful backup and a dated restore-drill result.",
      "Request deployment-specific evidence for database TLS and certificate verification.",
      "FIPS-approved algorithms do not establish module validation or operation in FIPS mode. Request the current cryptographic module inventory and assessment evidence.",
    ],
  },
  { title: "Security Awareness and Training", icon: "person", body: "The Security Awareness and Training Policy (AT-1) requires security awareness training for every user and role-based training for administrators and developers. Training records will be published once the first training cycle is complete." },
  { title: "Secure Software Development and Code Reviews", icon: "gear", body: "Review the CI security results for the relevant commit and confirm which checks block deployment. Request pipeline configuration, retained scanner reports and a failing-run demonstration of the blocking rule." },
  { title: "Network Security", icon: "cloud", body: "Request the deployed network-boundary configuration, TLS evidence, request-limit settings and isolation tests for customer application containers." },
  { title: "Audit & Logging", icon: "doc", body: "Every sign-in, permission change, data access and administrator action is written to the platform audit log. Customer administrators read it in the app; the log schema is part of the customer documentation. Compliance evidence is kept in a hash-chained ledger." },
  { title: "Role & Attribute-Based Access Control", icon: "verify", body: "Moderniza has two roles, Super Admin and Engineer, plus per-account feature switches. Higher privileges need a just-in-time elevation confirmed with a passkey. Scripts and integrations use service accounts, never a person’s account. A daily access review revokes sessions that have no second-factor sign-in behind them." },
  { title: "Federated Identity", icon: "group", body: "Users sign in with a password plus one second factor of their choice: passkey, authenticator app (2FA) or fingerprint / face lock. Confirm identity-provider and CAC/PIV compatibility, configuration and test evidence for your deployment." },
  { title: "Moderniza Trust Center API Documentation", icon: "server", body: <>Request the current Trust Center API documentation, available endpoints, access requirements and a sample snapshot from the security team. Confirm which data is public and which evidence requires assessor access.</> },
];

const SUBPROCESSORS: (string | ReactNode)[][] = [
  ["Anthropic, PBC (Claude)", "Requires deployment-specific confirmation", "Reference AI provider; active use, data received and authorization scope require confirmation."],
  ["OpenRouter, Inc.", "Requires deployment-specific confirmation", "Reference AI routing provider; active use, downstream model hosts and data received require confirmation."],
  ["OpenAI, Inc.", "Requires deployment-specific confirmation", "Reference AI provider; active use, data received and authorization scope require confirmation."],
  ["Amazon Web Services, Inc.", "Requires deployment-specific confirmation", "Reference infrastructure provider; services, backup configuration and authorization scope require confirmation."],
];

const POLICIES: { name: string; summary: string; version: string; status: string; words: string; availability: string }[] = [
  { name: "Access Control Policy (AC-1)", summary: "Who may access the platform, account types, roles, sessions and remote access", version: "1.2", status: "Approved (last reviewed 2026-09-09)", words: "5,134", availability: "Available on request (NDA)" },
  { name: "Audit and Accountability Policy (AU-1)", summary: "What is logged, how long it is kept, and who reviews it", version: "1.1", status: "Approved (2026-08-27)", words: "9,198", availability: "Available on request (NDA)" },
  { name: "Security Awareness and Training Policy (AT-1)", summary: "Security awareness and role-based training for every user", version: "1.0", status: "Draft", words: "1,732", availability: "Public" },
  { name: "Assessment, Authorization and Monitoring Policy (CA-1)", summary: "How controls are assessed, authorized and continuously monitored", version: "1.0", status: "Draft", words: "2,005", availability: "Public" },
  { name: "Configuration Management Policy (CM-1)", summary: "Baselines, change control and secure settings", version: "1.0", status: "Draft", words: "2,247", availability: "Available on request (NDA)" },
  { name: "Identification and Authentication Policy (IA-1)", summary: "Sign-in, second factors, passkeys and service accounts", version: "1.0", status: "Draft", words: "2,294", availability: "Available on request (NDA)" },
  { name: "Incident Response Policy (IR-1)", summary: "Detecting, reporting, containing and resolving security incidents", version: "1.0", status: "Draft", words: "2,144", availability: "Available on request (NDA)" },
  { name: "Maintenance Policy (MA-1)", summary: "Controlled maintenance of platform systems", version: "1.0", status: "Draft", words: "2,064", availability: "Available on request (NDA)" },
  { name: "Media Protection Policy (MP-1)", summary: "Handling, storage, transport and sanitization of media", version: "1.0", status: "Draft", words: "1,730", availability: "Public" },
  { name: "Planning Policy (PL-1)", summary: "Security planning and rules of behavior", version: "1.0", status: "Draft", words: "1,738", availability: "Public" },
  { name: "Personnel Security Policy (PS-1)", summary: "Screening, onboarding and offboarding of staff", version: "1.0", status: "Draft", words: "1,806", availability: "Public" },
  { name: "Privacy Policy (PT-1)", summary: "How personal information is processed and kept transparent", version: "1.0", status: "Draft", words: "1,903", availability: "Public" },
  { name: "Risk Assessment Policy (RA-1)", summary: "How security risks are found, rated and treated", version: "1.0", status: "Draft", words: "1,557", availability: "Public" },
  { name: "System and Services Acquisition Policy (SA-1)", summary: "Secure development and outside-provider requirements", version: "1.0", status: "Draft", words: "1,852", availability: "Public" },
  { name: "System and Communications Protection Policy (SC-1)", summary: "Network protection, encryption and boundary rules", version: "1.0", status: "Draft", words: "2,274", availability: "Available on request (NDA)" },
  { name: "System and Information Integrity Policy (SI-1)", summary: "Flaw fixing, malicious-code protection and monitoring", version: "1.0", status: "Draft", words: "2,064", availability: "Available on request (NDA)" },
  { name: "Vulnerability Disclosure Program (RA-5(11))", summary: "How anyone can report a security weakness to Moderniza", version: "1.1", status: "Draft", words: "1,595", availability: "Public" },
  { name: "Secure Configuration Guide", summary: "Safe settings for customer administrators", version: "1.0", status: "Draft (2026-10-02)", words: "3,316", availability: "Public" },
  { name: "Subprocessor Inventory", summary: "Outside companies that receive customer data", version: "1.0", status: "Draft (2026-10-02)", words: "2,565", availability: "Available on request" },
  { name: "Cryptographic Module Inventory", summary: "Every use of cryptography and its FIPS 140 status", version: "1.0", status: "Draft (2026-10-02)", words: "2,594", availability: "Available on request (NDA)" },
];

/* ============================================================================
   RENDER HELPERS
   ========================================================================== */

type Bg = "ink" | "chalk" | "bone";
const isDark = (bg: Bg) => bg === "ink";

function Badge({ kind, children }: { kind: "pos" | "warn" | "neutral"; children: ReactNode }) {
  const map = {
    pos: "border-glow bg-glow text-ink",
    warn: "border-ember bg-ember text-ink",
    neutral: "border-mist bg-mist text-ink",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${map[kind]}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink" />
      {children}
    </span>
  );
}

function Table({
  head,
  rows,
  tone,
  minWidth = 760,
  firstStrong = true,
}: {
  head: string[];
  rows: (string | ReactNode)[][];
  tone: Bg;
  minWidth?: number;
  firstStrong?: boolean;
}) {
  const dark = isDark(tone);
  return (
    <div className={`mt-10 overflow-x-auto rounded-2xl border ${dark ? "border-white/10 bg-white/[0.02]" : "border-ink/10 bg-white/60"}`}>
      <table className="w-full border-collapse text-sm" style={{ minWidth }}>
        <thead>
          <tr className={dark ? "bg-white/[0.04]" : "bg-ink/[0.04]"}>
            {head.map((h, i) => (
              <th
                key={i}
                className={`px-5 py-3.5 text-left align-bottom font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] ${dark ? "text-glow" : "text-ink/75"} ${i === 0 ? "w-[24%]" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={ri}
              className={`border-t ${dark ? "border-white/[0.07] hover:bg-white/[0.03]" : "border-ink/[0.07] hover:bg-ink/[0.02]"} transition-colors`}
            >
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={`px-5 py-4 align-top leading-relaxed ${
                    ci === 0 && firstStrong
                      ? dark ? "font-medium text-chalk" : "font-medium text-ink"
                      : dark ? "text-chalk/90" : "text-ink/85"
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SpecGrid({ items, tone }: { items: Spec[]; tone: Bg }) {
  const dark = isDark(tone);
  const card = dark ? "border-white/10 bg-graphite/40" : "border-ink/10 bg-white/70";
  const labelCls = dark ? "text-glow" : "text-ink/65";
  const valueCls = dark ? "text-chalk" : "text-ink";
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((it, i) => (
        <Reveal
          key={it.label}
          delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
          className={`h-full rounded-2xl border p-5 ${card}`}
        >
          <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${labelCls}`}>{it.label}</p>
          <p className={`mt-2 text-[15px] leading-relaxed ${valueCls}`}>{it.value}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Section({
  id, title, lede, bg, children,
}: {
  id: string; title: ReactNode; lede?: ReactNode; bg: Bg; children: ReactNode;
}) {
  const dark = isDark(bg);
  const bgClass = bg === "ink" ? "bg-ink" : bg === "chalk" ? "bg-chalk text-ink" : "bg-bone text-ink";
  return (
    <section id={id} className={`relative scroll-mt-28 ${bgClass} ${!dark ? "border-t border-ink/10" : ""}`}>
      <div className={`absolute inset-0 ${dark ? "bg-grid opacity-30" : "bg-grid-soft opacity-50"}`} />
      <div className="relative mx-auto max-w-[1400px] px-5 pt-5 pb-12 md:px-8 md:pt-7 md:pb-16">
        <Reveal className={`flex items-center gap-3 type-eyebrow ${dark ? "text-glow" : "text-ink/60"}`}>
          <span className={`h-px flex-1 ${dark ? "bg-glow/30" : "bg-ink/15"}`} />
        </Reveal>
        <Reveal delay={1} as="h2" className="mt-7 max-w-4xl type-h2">
          {title}
        </Reveal>
        {lede && (
          <Reveal delay={2} as="p" className={`mt-6 text-base md:text-lg leading-relaxed ${dark ? "text-chalk/80" : "text-ink/70"}`}>
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function Prose({ paras, tone }: { paras: ReactNode[]; tone: Bg }) {
  const dark = isDark(tone);
  return (
    <div className={`mt-6 space-y-5 text-[15px] leading-relaxed ${dark ? "text-chalk/80" : "text-ink/75"}`}>
      {paras.map((p, i) => (
        <Reveal key={i} delay={1} as="p">{p}</Reveal>
      ))}
    </div>
  );
}

function SubHead({ children, tone, first = false }: { children: ReactNode; tone: Bg; first?: boolean }) {
  const dark = isDark(tone);
  return (
    <Reveal as="h3" className={`${first ? "mt-10" : "mt-14"} text-xl md:text-2xl font-semibold tracking-tight ${dark ? "text-chalk" : "text-ink"}`}>
      {children}
    </Reveal>
  );
}

/* ============================================================================
   PAGE
   ========================================================================== */

export default function TrustCenterPage() {
  return (
    <>
      {/* ============ HERO / HEADER BANNER ============ */}
      <section className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="pointer-events-none absolute -top-32 right-1/4 h-[340px] w-[680px] rounded-full bg-glow/15 blur-3xl drift" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-[260px] w-[460px] rounded-full bg-ember/15 blur-3xl float-y" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="max-w-4xl">

            <Reveal delay={2} as="h1" className="max-w-[20ch] type-h1">
              GoModerniza <span className="text-gradient">Trust Center</span>
            </Reveal>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </section>

      {/* ============ STICKY SECTION MENU ============ */}
      <SectionTabs items={SECTION_MENU} />

      {/* ============ 01 OVERVIEW ============ */}
      <Section
        id="overview" bg="chalk"
        title="Overview"
        lede="BI’s AI Moderniza is a Software as a Service (SaaS) offering that converts legacy estates (COBOL, VB6, PHP, Java, .NET and others) into modern, tested, containerised applications. Work runs through five steps — Blueprint, Contract, Code, Testing and Deploy — and every step leaves a ledger the customer can audit. Moderniza is offered to government customers by Business Integra Technology Solutions, Inc."
      >
        <SubHead tone="chalk" first>General Information</SubHead>
        <SpecGrid tone="chalk" items={GENERAL_INFO} />
      </Section>

      {/* ============ 02 CONTACTS ============ */}
      <Section id="contacts" bg="ink" title="Contacts">
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.kind} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-3xl border border-white/10 bg-graphite/40 p-7 lift h-full">
              <CardIcon kind={c.icon} tone="dark" className="h-11 w-11" />
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">{c.kind}</h3>
              {c.details && (
                <dl className="mt-5 space-y-4">
                  {c.details.map((d, di) => (
                    <div key={d.label || di}>
                      {d.label && (
                        <dt className="text-xs font-semibold uppercase tracking-wider text-chalk/50">{d.label}</dt>
                      )}
                      <dd className={`${d.label ? "mt-1 text-chalk/85" : "font-semibold text-chalk"} text-sm leading-relaxed`}>{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 03 SERVICE LIST ============ */}
      <Section id="services" bg="chalk" title="Service List (CDS-CSO-SVC)">
        <SubHead tone="chalk" first>Services &amp; Security Categories</SubHead>
        <Prose tone="chalk" paras={["The services below describe the product workflow. Request the approved assessment scope and security categorization; this list does not establish certification or authorization."]} />
        <Table
          tone="chalk"
          head={["Service", "Description", "Security Category", "Assessment Scope"]}
          rows={SERVICES.map((s) => [
            s.name,
            s.desc,
            <Badge key="c" kind="neutral">Request assessment</Badge>,
            <Badge key="s" kind="neutral">Confirm scope</Badge>,
          ])}
          minWidth={960}
        />
      </Section>

      {/* ============ 04 SECURE CONFIGURATION GUIDANCE ============ */}
      <Section id="configuration" bg="bone" title="Secure Configuration Guidance">
        <SubHead tone="bone" first>User Guide</SubHead>
        <Prose
          tone="bone"
          paras={[
            <>Request the current approved Moderniza Secure Configuration Guide for customer administrators. Its topics include first steps, roles and privileges, privilege elevation, service accounts, inactive accounts, removing an administrator, second factors, passwords and lockout, sessions, single sign-on, AI use and customer code (stop all AI, agent limits, which AI vendor sees your code), uploads and data classification, audit records and retention, integrations and secrets.</>,
          ]}
        />

        <SubHead tone="bone">Baseline Configuration Guides</SubHead>
        <Prose tone="bone" paras={["Platform hardening follows the Configuration Management Policy (CM-1), available on request. The CIS benchmarks below are the reference baselines."]} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {BASELINE_GUIDES.map((g, i) => (
            <Reveal key={g.title} delay={((i % 2) + 1) as 1 | 2} className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/70 p-6 lift">
              <div className="flex items-center gap-4">
                <CardIcon kind="doc" tone="light" className="h-10 w-10" />
                <h4 className="text-base font-semibold tracking-tight text-ink">{g.title}</h4>
              </div>
              <p className="mt-3 flex-1 text-sm text-ink/70 leading-relaxed">{g.body}</p>
              <a href="/contact" className="mt-4 inline-flex items-center gap-2 self-start text-sm font-medium text-ink hover:text-ember transition-colors">
                Request Access <span aria-hidden>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 05 AUTHORIZATION PACKAGE ============ */}
      <Section id="authorization-package" bg="ink" title="Authorization Package">
        <SubHead tone="ink" first>Authorization Package Overview</SubHead>
        <Prose tone="ink" paras={["Request the current security package and approved program scope. The catalogue below describes the documents to review and does not establish authorization or a completed assessment."]} />

        <SubHead tone="ink">Submission Rationale</SubHead>
        <Prose tone="ink" paras={["Federal agencies hold large legacy estates (COBOL, VB6, .NET, Java) that are costly to run and hard to staff. Moderniza converts them to modern, containerised applications and proves each step: the business rules found in the old code, the contract the new code must honor, the tests it passes, and the deploy. That evidence trail is what makes the service a good fit for agencies that must show how a system was changed."]} />

        <SubHead tone="ink">Submission Approach</SubHead>
        <Prose tone="ink" paras={["Review automated checks and machine-readable evidence alongside policy documents. Request the current indicator inventory, snapshot schedule, hash-chain verifier results and tests showing how checks respond to missing or failing evidence."]} />

        <SubHead tone="ink">Security Package Contents</SubHead>
        <Table tone="ink" head={["#", "Folder", "Availability"]} rows={PACKAGE_CONTENTS.map((r) => [...r, "Available on Request"])} minWidth={560} firstStrong={false} />
        <p className="mt-5 text-sm text-chalk/80">Request the current approved versions and publication dates before using these documents for an assessment.</p>

        <SubHead tone="ink">Minimum Assessment Scope</SubHead>
        <Prose tone="ink" paras={["Request the approved assessment boundary, including the applicable services, platform infrastructure, database, backups and third-party processing. The service and provider reference lists on this page do not establish assessment scope."]} />

        <SubHead tone="ink">Continuous KSI Validation Reporting</SubHead>
        <Prose tone="ink" paras={["Request the latest KSI snapshot, publication timestamp, supporting proof and tracked remediation items. Confirm access to the evidence and snapshot history for your assessor."]} />

        <SubHead tone="ink">Machine-Readable Package Data Schema</SubHead>
        <Prose tone="ink" paras={[<>Request the machine-readable package, its schema version and validation result for the submission being reviewed.</>]} />
      </Section>

      {/* ============ 06 SECURITY & CONTINUOUS MONITORING ============ */}
      <Section id="security" bg="chalk" title="Security & Continuous Monitoring">
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SECURITY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="group rounded-3xl border border-ink/10 bg-white/75 p-6 lift h-full">
              <CardIcon kind={c.icon} tone="light" className="h-10 w-10" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{c.title}</h3>
              {Array.isArray(c.body) ? (
                <ul className="mt-2.5 space-y-2 text-sm text-ink/70 leading-relaxed">
                  {c.body.map((b: string) => (
                    <li key={b} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">{c.body}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 07 SUB-PROCESSORS ============ */}
      <Section id="subprocessors" bg="ink" title="Sub-processors">
        <SubHead tone="ink" first>Third-Party Service Providers (Sub-processors)</SubHead>
        <Prose tone="ink" paras={["A sub-processor is an outside company that receives or stores customer data so Moderniza can deliver its service. The reference entries below are not a verified inventory of current processing. Request the approved sub-processor inventory, processing locations and data flows for your deployment. Customers can mark a project public, internal, confidential or CUI, and can stop all AI work at any time."]} />

        <SubHead tone="ink">Sub-processor Table</SubHead>
        <Table tone="ink" head={["Sub-processor", "Headquarters / Processing Location", "Services Provided"]} rows={SUBPROCESSORS} minWidth={900} />
      </Section>

      {/* ============ 08 RESOURCES ============ */}
      <Section id="resources" bg="bone" title="Resources (CDS-CSO-IRP)">
        <SubHead tone="bone" first>Resources Table</SubHead>
        <Prose tone="bone" paras={["Policies and related documents to request. Confirm approved versions and availability with the security team."]} />
        <Table
          tone="bone"
          head={["Policy / Procedure", "Summary", "Availability"]}
          rows={POLICIES.map((p) => [
            p.name,
            p.summary,
            "Request current approved copy",
          ])}
          minWidth={1100}
        />
      </Section>

      {/* ============ 09 ACCESS ============ */}
      <Section id="access" bg="ink" title="Access">
        <SubHead tone="ink" first>Accessing Trust Center Information</SubHead>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            { h: "Public Information", b: <>This page is public and needs no account. It describes the evidence to request; it is not a live indicator dashboard. Confirm current status and snapshot timestamps with the security team.</> },
            { h: "Machine-Readable Data", b: <>Confirm current availability and access requirements for the reference Trust Center API endpoints: {extDark("https://platform.gomoderniza.ai/api/v1/trust-center/package-overview")} (package overview) and {extDark("https://bimod.mo.vc/api/v1/trust-center/certification")} (KSI results).</> },
            { h: "Full Certification Package", b: <>Federal agencies, assessors and other authorized parties can ask the Security Contact for the full package. The security team can confirm the approval process, available documents and read-only evidence access for your assessment.</> },
            { h: "Trust Center Navigation Instructions", b: <>The Moderniza Trust Center is the central place for security, privacy, compliance and FedRAMP 20x readiness information. Open it from the website’s Security menu or at {extDark("https://bimod.mo.vc/api/v1/trust-center/cso")}. Request restricted documents and confirm access with the security team.</> },
          ].map((item, i) => (
            <Reveal key={item.h} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-3xl border border-white/10 bg-graphite/40 p-6 lift">
              <h4 className="text-lg font-semibold tracking-tight text-chalk">{item.h}</h4>
              <p className="mt-2.5 text-sm text-chalk/75 leading-relaxed">{item.b}</p>
            </Reveal>
          ))}
        </div>

        {/* Contact Banner */}
        <Reveal delay={2} className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-glow/25 bg-glow/[0.05] p-7 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-chalk">Questions about our FedRAMP program or security posture?</h3>
          <MagneticButton href="mailto:info@businessintegra.com" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-glow px-5 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse">
            Contact Us → info@businessintegra.com
          </MagneticButton>
        </Reveal>
      </Section>
    </>
  );
}
