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
  { label: "FedRAMP ID", value: "Pending assignment (package ID used today: “Business Integra Technology Solutions, Inc. MODZ”)" },
  { label: "Certification Type", value: "FedRAMP 20x Class C" },
  { label: "Authorization Path", value: "FedRAMP Program (20x) — confirm before publishing" },
  { label: "Service Model", value: "Software as a Service (SaaS)" },
  { label: "Deployment Model", value: "Pending — package says “Public Cloud”, trust_center.json says “Single-tenant cloud, one isolated environment per customer”; must match where it runs on submission day" },
  { label: "Business Category", value: "Development Tools; Artificial Intelligence (AI) — application modernization and legacy code conversion" },
  { label: "FIPS 199 Security Categorization", value: "Moderate" },
  { label: "Digital Identity Level", value: "Pending" },
  { label: "FedRAMP Authorization Status", value: "In progress; not yet FedRAMP authorized" },
  { label: "Fully Operational Since", value: "Pending (owner to confirm the date)" },
  { label: "Hosting Environment", value: "Moderniza-operated servers; encrypted backups in AWS US East (N. Virginia). Move to AWS GovCloud planned" },
  { label: "UEI Number", value: "NBELUNT3NMG3" },
  { label: "CAGE Code", value: "3BGU6" },
  { label: "Independent Assessor", value: "To be engaged" },
  { label: "Next Ongoing Certification Report", value: "2026-12-15 (then every 90 days)" },
  { label: "Company Address", value: "6550 Rock Spring Drive, Suite 600, Bethesda, MD 20817-1185" },
  { label: "Product Website", value: ext("https://bimod.mo.vc") },
  {
    label: "Product Logo",
    value: (
      <>
        <a
          href="/moderniza-logo.png"
          download="moderniza-logo.png"
          className="font-medium text-ink underline decoration-ember decoration-2 underline-offset-2 hover:text-ember break-all"
        >
          https://bimod.mo.vc/moderniza-logo.png
        </a>{" "}
        (PNG download)
      </>
    ),
  },
];

const CONTACTS: { kind: string; icon: IconKind }[] = [
  {
    kind: "Sales Contact",
    icon: "person",
  },
  {
    kind: "Security Contact",
    icon: "shield",
  },
  {
    kind: "Contacts",
    icon: "doc",
  },
];

const SERVICES: { name: string; desc: string; category: string; inScope: "Yes" | "No" }[] = [
  { name: "Blueprint", desc: "Scans the uploaded legacy source (inventory, reading plan, business-rule extraction; unsafe files are quarantined) and produces the target architecture, epics, user stories and screen designs. Code generation does not start until the Blueprint is approved.", category: "Moderate", inScope: "Yes" },
  { name: "Contract", desc: "Defines the entities, APIs, business rules and screens the modern application must honor, built from the approved Blueprint and approved rules.", category: "Moderate", inScope: "Yes" },
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
      "Passwords are stored with PBKDF2-HMAC-SHA256.",
      "Stored secrets are encrypted with AES and protected with HMAC-SHA256.",
      "Web traffic to the platform uses TLS.",
      "Backups are encrypted with AWS Key Management Service.",
      "Not yet done: FIPS 140-validated modules in FIPS mode, and encryption of the database connection. Both are in the POA&M and are solved by the planned AWS GovCloud move.",
    ],
  },
  { title: "Security Awareness and Training", icon: "person", body: "The Security Awareness and Training Policy (AT-1) requires security awareness training for every user and role-based training for administrators and developers. Training records will be published once the first training cycle is complete." },
  { title: "Secure Software Development and Code Reviews", icon: "gear", body: "All platform source code lives in a Git repository. Every change runs through an automated CI pipeline with security checks before it reaches production. AI agents that generate customer code run inside a fence that stops them from changing Moderniza’s own code." },
  { title: "Network Security", icon: "cloud", body: "All traffic enters through one front door that applies TLS, request limits and connection caps. Each customer’s generated application runs in its own containers, separate from the Moderniza platform." },
  { title: "Audit & Logging", icon: "doc", body: "Every sign-in, permission change, data access and administrator action is written to the platform audit log. Customer administrators read it in the app; the log schema is part of the customer documentation. Compliance evidence is kept in a hash-chained ledger." },
  { title: "Role & Attribute-Based Access Control", icon: "verify", body: "Moderniza has built-in roles, custom roles and per-account rights. Higher privileges need a just-in-time elevation confirmed with a passkey. Scripts and integrations use service accounts, never a person’s account. A daily access review revokes sessions that have no second-factor sign-in behind them." },
  { title: "Federated Identity", icon: "group", body: "Users sign in with a password plus one second factor of their choice: passkey, authenticator app (2FA) or fingerprint / face lock. Single sign-on through OIDC is supported. PIV/CAC sign-in is built but off by default; it is turned on per customer." },
  { title: "Moderniza Trust Center API Documentation", icon: "server", body: <>The Trust Center data is open through a read-only API under <code className="font-mono text-[13px]">/api/v1/trust-center</code>: index, cso, certification (per KSI), snapshots, policies, vulnerabilities, changes, access and health. Public calls get the public view; a token with <code className="font-mono text-[13px]">compliance:read</code> unlocks full evidence on the same URLs.</> },
];

const SUBPROCESSORS: (string | ReactNode)[][] = [
  ["Anthropic, PBC (Claude)", "San Francisco, California, USA; processed in the United States", "Main AI model. Reads legacy code, plans the new system, writes and fixes code, writes reports. Receives parts of customer source code and prompts. Not FedRAMP authorized for this use."],
  ["OpenRouter, Inc.", "United States, then a model host OpenRouter selects", "Backup AI provider, used only when the Claude account hits its usage limit. Receives the same data for the step it re-runs. Not FedRAMP authorized."],
  ["OpenAI, Inc.", "San Francisco, California, USA; processed in the United States", "Optional AI tool (Codex), used only when a user picks it in Settings. Not FedRAMP authorized for this use."],
  ["Amazon Web Services, Inc.", "Seattle, Washington, USA; AWS US East (N. Virginia)", "Encrypted nightly backups of the database and customer workspace (AWS S3 + KMS). FedRAMP authorized, Moderate."],
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
        lede="Moderniza is a Software as a Service (SaaS) offering that converts legacy estates (COBOL, VB6, PHP, Java, .NET and others) into modern, tested, containerised applications. Work runs through five steps — Blueprint, Contract, Code, Testing and Deploy — and every step leaves a ledger the customer can audit. Moderniza is offered to government customers by Business Integra Technology Solutions, Inc."
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
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 03 SERVICE LIST ============ */}
      <Section id="services" bg="chalk" title="Service List (CDS-CSO-SVC)">
        <SubHead tone="chalk" first>Services &amp; Security Categories</SubHead>
        <Prose tone="chalk" paras={["All services below are offered together under one certification. Each service has a Moderate FIPS 199 security categorization."]} />
        <Table
          tone="chalk"
          head={["Service", "Description", "Security Category", "In Minimum Assessment Scope"]}
          rows={SERVICES.map((s) => [
            s.name,
            s.desc,
            <Badge key="c" kind="warn">{s.category}</Badge>,
            <Badge key="s" kind={s.inScope === "Yes" ? "pos" : "neutral"}>{s.inScope}</Badge>,
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
            <>The Moderniza Secure Configuration Guide v1.0 (2 October 2026, draft for approval) tells customer administrators how to run Moderniza safely: first steps, roles and privileges, privilege elevation, service accounts, inactive accounts, removing an administrator, second factors, passwords and lockout, sessions, single sign-on, AI use and customer code (stop all AI, agent limits, which AI vendor sees your code), uploads and data classification, audit records and retention, integrations and secrets.</>,
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
              <a href={g.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 self-start text-sm font-medium text-ink hover:text-ember transition-colors">
                View Document <span aria-hidden>→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 05 AUTHORIZATION PACKAGE ============ */}
      <Section id="authorization-package" bg="ink" title="Authorization Package">
        <SubHead tone="ink" first>Authorization Package Overview</SubHead>
        <Prose tone="ink" paras={["Moderniza is pursuing a FedRAMP 20x Class C certification. The whole package sits in one folder with 17 numbered sections, from the Certification Package Overview to the Security Decision Log."]} />

        <SubHead tone="ink">Submission Rationale</SubHead>
        <Prose tone="ink" paras={["Federal agencies hold large legacy estates (COBOL, VB6, .NET, Java) that are costly to run and hard to staff. Moderniza converts them to modern, containerised applications and proves each step: the business rules found in the old code, the contract the new code must honor, the tests it passes, and the deploy. That evidence trail is what makes the service a good fit for agencies that must show how a system was changed."]} />

        <SubHead tone="ink">Submission Approach</SubHead>
        <Prose tone="ink" paras={["Moderniza follows the FedRAMP 20x model: automated checks and machine-readable evidence instead of static documents and point-in-time reviews. Every Key Security Indicator (KSI) is measured by a script against the running platform. A snapshot is taken every 6 hours and added to a hash-chained ledger, so any edited or missing snapshot is detected. The checks themselves are mutation-tested, so a check that always passes is caught."]} />

        <SubHead tone="ink">Security Package Contents</SubHead>
        <Table tone="ink" head={["#", "Folder"]} rows={PACKAGE_CONTENTS} minWidth={560} firstStrong={false} />
        <p className="mt-5 text-sm text-chalk/80">Most documents are version 1.0, issued 2 October 2026, as drafts for approval.</p>

        <SubHead tone="ink">Minimum Assessment Scope</SubHead>
        <Prose tone="ink" paras={["The scope covers the six customer-facing services in the Service List (Blueprint, Contract, Code, Testing, Deploy, Business Rules), the platform that runs them, its database and backups, and the five outside companies in the Sub-processors section. The Demo evidence page is outside the scope."]} />

        <SubHead tone="ink">Continuous KSI Validation Reporting</SubHead>
        <Prose tone="ink" paras={["KSI results are published live on the Moderniza Trust Center and refreshed every 6 hours. Failing items are tracked in the POA&M. Agency customers and assessors with a read-only account see the evidence behind each measurement and the snapshot history."]} />

        <SubHead tone="ink">Machine-Readable Package Data Schema</SubHead>
        <Prose tone="ink" paras={[<>The package overview follows the official FedRAMP Certification Package Overview JSON schema (2026-06-24), and is served by the Trust Center API. KSI rules follow the FedRAMP Consolidated Rules for 2026 (version 2026.07.14.01).</>]} />
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
        <Prose tone="ink" paras={["A sub-processor is an outside company that receives or stores customer data so Moderniza can deliver its service. Moderniza lists them from what the platform actually did (its own model-call ledger), not only from its settings. Five companies receive or may receive customer data; only Amazon Web Services holds a FedRAMP authorization. Customers can mark a project public, internal, confidential or CUI, and can stop all AI work at any time."]} />

        <SubHead tone="ink">Sub-processor Table</SubHead>
        <Table tone="ink" head={["Sub-processor", "Headquarters / Processing Location", "Services Provided"]} rows={SUBPROCESSORS} minWidth={900} />
      </Section>

      {/* ============ 08 RESOURCES ============ */}
      <Section id="resources" bg="bone" title="Resources (CDS-CSO-IRP)">
        <SubHead tone="bone" first>Resources Table</SubHead>
        <Prose tone="bone" paras={["Policies and related documents, with version, status, length and how to get them."]} />
        <Table
          tone="bone"
          head={["Policy / Procedure", "Summary", "Version", "Status", "Words", "Availability"]}
          rows={POLICIES.map((p) => [
            p.name,
            p.summary,
            p.version,
            <Badge key="s" kind={p.status.startsWith("Approved") ? "pos" : "warn"}>{p.status}</Badge>,
            p.words,
            p.availability,
          ])}
          minWidth={1100}
        />
      </Section>

      {/* ============ 09 ACCESS ============ */}
      <Section id="access" bg="ink" title="Access">
        <SubHead tone="ink" first>Accessing Trust Center Information</SubHead>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            { h: "Public Information", b: <>This page is public and needs no account. It is updated whenever certification details change, and KSI results refresh every 6 hours.</> },
            { h: "Machine-Readable Data", b: <>The same data is available as JSON from the Trust Center API, for example {extDark("https://bimod.mo.vc/api/v1/trust-center/cso")} (package overview) and {extDark("https://bimod.mo.vc/api/v1/trust-center/certification")} (KSI results).</> },
            { h: "Full Certification Package", b: <>Federal agencies, assessors and other authorized parties can ask the Security Contact for the full package. Approved requesters receive a read-only account with the compliance:read permission, which unlocks per-measurement evidence and snapshot history on the same pages and API.</> },
            { h: "Trust Center Navigation Instructions", b: <>The Moderniza Trust Center is the central place for security, privacy, compliance and FedRAMP 20x Class C information. Open it from the website’s Resources menu or at {extDark("https://bimod.mo.vc/trust-center")}. Restricted documents are shown in the list with a request link; they open after the request is verified.</> },
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
          <MagneticButton href="mailto:chandrakumar@xmedia.in" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-glow px-5 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse">
            Contact Us → chandrakumar@xmedia.in
          </MagneticButton>
        </Reveal>
      </Section>
    </>
  );
}
