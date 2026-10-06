import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";
import AmbientFx from "../components/AmbientFx";
import CardIcon, { type IconKind } from "../components/CardIcon";
import MagneticButton from "../components/MagneticButton";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FedRAMP Trust Center — Moderniza",
  description:
    "Security, compliance and certification information for Moderniza, the legacy modernization SaaS offering from Business Integra. FedRAMP 20x Class C — not yet FedRAMP certified.",
};

/* ============================================================================
   TRUST CENTER — STATIC CONTENT
   ----------------------------------------------------------------------------
   Content mirrors the live reference Trust Center (go.moderniza.mo.vc).
   Data is kept as plain consts so it maps 1:1 onto Strapi content types when
   this page is later wired to the CMS.
   ========================================================================== */

const META = {
  verified: "Aug 2026",
  evidenceUpdated: "2026-10-06 06:36 UTC",
  packageVersion: "1.0 (draft for approval)",
  packageUpdated: "2026-10-03 10:01 UTC",
  nextUpdate: "2026-10-17",
  ksiTotal: 46,
  ksiCadence: "every 6 hours",
};

const SECTION_MENU: { id: string; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Service List" },
  { id: "configuration", label: "Configuration" },
  { id: "certification-package", label: "Certification Package" },
  { id: "security", label: "Security Monitoring" },
  { id: "subprocessors", label: "Sub-processors" },
  { id: "resources", label: "Resources" },
  { id: "access", label: "Access" },
  { id: "contacts", label: "Contacts" },
];

type Spec = { label: string; value: ReactNode; wide?: boolean };

const FEDRAMP_SPEC: Spec[] = [
  { label: "FedRAMP ID", value: "Pending FedRAMP assignment" },
  { label: "Certification Type", value: "FedRAMP 20x Class C" },
  { label: "Certification Path", value: "FedRAMP 20x" },
  { label: "FIPS 199 Security Categorization", value: "Moderate" },
  { label: "Independent Assessor", value: "To be engaged" },
  { label: "Next Ongoing Certification Report", value: "2026-12-15" },
  { label: "Next Quarterly Review", value: "2026-12-15" },
  { label: "FedRAMP Certification Status", value: "FedRAMP 20x Class C certification in progress; not yet FedRAMP certified", wide: true },
  { label: "Agency Use Case", value: "Direct use: agencies use Moderniza directly as part of a federal information system that will receive an agency Authorization to Operate.", wide: true },
];

const ORG_SPEC: Spec[] = [
  { label: "Provider", value: "Business Integra Technology Solutions, Inc." },
  { label: "UEI Number", value: "NBELUNT3NMG3" },
  { label: "CAGE Code", value: "3BGU6" },
  { label: "Company Address", value: "6550 Rock Spring Drive, Suite 600, Bethesda, MD 20817-1185", wide: true },
];

const CSO_SPEC: Spec[] = [
  { label: "Cloud Service Offering", value: "Moderniza (MODZ)" },
  { label: "Service Model", value: "Software as a Service (SaaS)" },
  { label: "Deployment Model", value: "Own Server" },
  { label: "Business Category", value: "Development Tools, Artificial Intelligence (AI)" },
  { label: "Fully Operational Since", value: "2026-03-21" },
  { label: "Product Website", value: <a href="https://bimod.mo.vc" className="text-glow hover:underline">https://bimod.mo.vc</a> },
  { label: "Hosting Environment", value: "Business Integra-operated servers (USA), backups in AWS us-east-1", wide: true },
];

const SERVICES: { name: string; desc: string }[] = [
  { name: "Blueprint", desc: "Scans the uploaded legacy source: an inventory of the files, a reading plan, and the business rules pulled out of the code. Executable programs and unsafe file types are moved to quarantine; Office macros and suspicious scripts are flagged for review. It then produces the target architecture, epics, user stories and screen designs. Code generation does not start until the Blueprint is approved, either by a reviewer or automatically when autopilot is enabled." },
  { name: "Contract", desc: "Defines the entities, APIs, business rules and screens the modern application must honor. It is built from the approved Blueprint and the approved business rules." },
  { name: "Code", desc: "Splits the work into tasks and generates the modern application. The code is accepted only after it builds, starts, answers API smoke tests, navigates correctly and passes its generated tests." },
  { name: "Testing", desc: "Runs the generated application, records every defect in an issue ledger and repairs it. It then produces a code report on fidelity, maintainability and security." },
  { name: "Deploy", desc: "Deploys the delivered application into the customer's containers once the pre-deploy security and quality gates pass." },
  { name: "Business Rules & Drools Workbench", desc: "Lets you review and edit the extracted business rules and export them in Drools format." },
];

const ADMIN_ACCOUNTS: (string | ReactNode)[][] = [
  ["Top-level administrative account", "An account with the Administrator role. It controls access to the whole platform, including user accounts and the audit log."],
  ["Privileged account", "An Administrator who has elevated (confirmed with a passkey and a written reason), and any custom role given rights to manage accounts, roles or deployments."],
];

const GUIDE_TOPICS: (string | ReactNode)[][] = [
  ["First steps for a new administrator: first sign-in, passkey, second factor, creating accounts", "3"],
  ["Built-in roles, custom roles, privilege elevation, service accounts, inactive accounts", "4.1 – 4.5"],
  ["Removing an administrator safely: change role, disable or delete, with the audit check", "4.6"],
  ["Sign-in and sessions: second factors, passwords, lockout, session limits, single sign-on", "5"],
  ["AI use and customer code: Stop all AI switch, AI agent limits, choice of AI vendor, pipeline auto-pilot, data classification at upload", "6"],
  ["Audit records and how long data is kept", "7"],
  ["Integrations and secrets", "8"],
  ["Settings managed by Moderniza, with the current and recommended value of each", "9"],
  ["Known limitations and safe workarounds", "10"],
];

const GUIDE_DOC: (string | ReactNode)[][] = [
  ["Moderniza Secure Configuration Guide", "1.0", "2 October 2026", "Draft, awaiting approval"],
];

const CONFIG_CAPS: (string | ReactNode)[][] = [
  ["SCG-CSO-RSC (1)", "MUST", "Top-Level Administrative Accounts Guidance — how to sign in to, set up, run and remove top-level administrative accounts safely", "Available on request. Sections 3 and 4 of the guide."],
  ["SCG-CSO-RSC (2)", "MUST", "Top-Level Administrative Accounts Security Settings — each security setting only an Administrator can change, and what it means for security", "Available on request. Sections 5 to 9 of the guide."],
  ["SCG-CSO-RSC (3)", "SHOULD", "Privileged Accounts Security Settings — each security setting a privileged account can change, and what it means for security", "Available on request. Sections 4.1 – 4.5 and 9 of the guide."],
  ["SCG-CSO-SDF", "SHOULD", "Secure Defaults on Provisioning — recommended settings applied when an account is first set up", "Partly. Several platform values still differ from our recommendation: pipeline auto-pilot starts at Full (we recommend Hybrid), an elevation lasts 9 hours (we recommend 1 hour), and sign-out after inactivity is 120 minutes (we recommend 15–30 minutes). Section 9 lists every such setting."],
  ["SCG-ENH-CMP", "SHOULD", "Comparison Capability — compare current settings with the recommended values", "Not available as a feature. Section 9 shows both values side by side."],
  ["SCG-ENH-EXP", "SHOULD", "Export Capability — export all security settings in machine-readable form", "Not available yet"],
  ["SCG-ENH-API", "SHOULD", "API Capability — view and change security settings through an API or similar", "In the administrator screens (Users, Roles, Settings, Auto-pilot, AI Control). There is no single security-settings API yet."],
  ["SCG-ENH-MRG", "SHOULD", "Machine-Readable Guidance — machine-readable copy of the guide (JSON)", "Not available yet; planned"],
  ["SCG-CSO-PUB", "SHOULD", "Publish Guidance — guide available to the public", "Not public. Shared on request with agency customers, evaluating agencies and FedRAMP assessors."],
  ["SCG-ENH-VRH", "SHOULD", "Versioning and Release History — version history of recommended settings", "In the guide's Document Control section"],
];

const PACKAGE_CONTENTS: string[] = [
  "Certification Package Overview",
  "17 security policies",
  "Contingency Plan",
  "Incident Response Plan",
  "Configuration Management Plan",
  "Business Continuity Plan",
  "Business Impact Analysis",
  "Plan of Action and Milestones",
  "AI model inventory",
];

const PACKAGE_META: Spec[] = [
  { label: "Package version", value: "1.0 (draft for approval)" },
  { label: "Package last updated", value: "2026-10-03 10:01 UTC" },
  { label: "Evidence last updated", value: "2026-10-06 06:36 UTC (KSI snapshot, refreshed every 6 hours)" },
  { label: "Next update due", value: "2026-10-17 (updated at least every 2 weeks)" },
  { label: "Source of update", value: "Automated package build plus the 6-hourly KSI snapshot" },
  { label: "Responsible official", value: "Name, title, company email and phone of the one official accountable for the package — decision pending (CEO recommended; must be a company email, not Gmail)", wide: true },
];

const INFO_FLOWS: { flow: string; travels: string; leaves: "yes" | "no"; leavesText: string }[] = [
  { flow: "Signing in", travels: "Email, password, second factor", leaves: "no", leavesText: "Stays inside" },
  { flow: "Bringing in the old code", travels: "Legacy source code (may be CUI)", leaves: "no", leavesText: "Comes in" },
  { flow: "Converting with AI", travels: "Instructions and parts of the code", leaves: "yes", leavesText: "To AI provider" },
  { flow: "Run, test, fix", travels: "New code, test results, libraries", leaves: "yes", leavesText: "Code excerpts to AI" },
  { flow: "Delivering the result", travels: "New code, tests, reports", leaves: "yes", leavesText: "To GitLab & download" },
  { flow: "Audit and monitoring", travels: "Audit records, security events, evidence", leaves: "no", leavesText: "No customer code leaves" },
  { flow: "Backups", travels: "Database and project storage copies", leaves: "yes", leavesText: "To AWS us-east-1" },
];

const CRYPTO_MODULES: (string | ReactNode)[][] = [
  ["OpenSSL (Ubuntu)", "3.0.2", "Password hashing, HMAC, outbound TLS, database driver", "Not validated in this build", "None yet"],
  ["OpenSSL inside Python cryptography", "50.0.1", "Stored secrets, passkeys, signatures", "Not validated, FIPS mode off", "None yet"],
  ["Node.js OpenSSL", "3.0.17 (Node 22.19.0)", "TLS at the front door", "Not validated, FIPS mode off", "None yet"],
  ["Debian OpenSSL (container image)", "python:3.12-slim", "Container deployments", "Not validated", "None yet"],
  ["AWS KMS", "Managed", "Backup encryption in S3", "AWS states FIPS 140 validated", "To be confirmed by 16 Oct 2026"],
  ["Linux kernel", "6.8", "Random numbers", "FIPS mode off", "None yet"],
];

const ASSESSMENT_ROWS: (string | ReactNode)[][] = [
  ["Independent assessor", "FedRAMP Recognized assessor name and FedRAMP ID — not yet chosen (open item O-1)"],
  ["Assessor's overall summary", "Overall summary of the verification and validation results, supplied by the assessor, published without modification"],
  ["Assessment results per KSI", "Assessor's summary of process and findings for each Key Security Indicator"],
  ["Use of representative samples", "How and where samples were used during the assessment (IVV-CSO-DUS)"],
  ["FedRAMP Certification Reports", "Reports received from FedRAMP, published within 2 weeks of receipt — none yet"],
];

const SECURITY_CARDS: { title: string; body: string; icon: IconKind }[] = [
  { title: "Internal security", body: "Business Integra maintains an information security program for Moderniza made up of 17 documented policies aligned to NIST SP 800-53 Rev. 5. Each policy has a named owner, an approving authority and a security reviewer, and each is linked to the KSIs that measure it.", icon: "shield" },
  { title: "Encryption", body: "All traffic to and from the service is protected with TLS. Passwords are hashed with FIPS-approved key derivation. Container images and releases are cryptographically signed.", icon: "shield" },
  { title: "Security awareness & training", body: "All personnel complete security awareness and role-based training during onboarding and at regular intervals afterwards, through Business Integra's learning management system.", icon: "person" },
  { title: "Secure software development", body: "Source code is kept in a controlled version-control repository. Every change passes automated CI checks before release: unit tests, static analysis, dependency and container scanning, secret scanning and policy gates. Builds produce a CycloneDX SBOM and sign container images with cosign.", icon: "gear" },
  { title: "AI governance", body: "AI model calls are limited to an approved provider allowlist. An administrator can stop all AI processing instantly with a passkey-protected kill switch. All AI models in use are recorded in an AI model inventory.", icon: "pulse" },
  { title: "Audit & logging", body: "Every security-relevant action is written to a tamper-evident, hash-chained audit trail and forwarded to a Splunk SIEM for correlation and alerting.", icon: "doc" },
  { title: "Role-based access control", body: "Access is granted by role with least privilege. Every human account requires multi-factor authentication. Elevated actions require a passkey. Automated jobs use dedicated service accounts, never personal accounts. Access is reviewed daily, and sessions without a verified second-factor login are revoked.", icon: "verify" },
  { title: "Federated identity", body: "Moderniza supports OpenID Connect single sign-on for agency users. PIV/CAC smart-card login is supported on request.", icon: "group" },
  { title: "Future plans", body: "Business Integra will engage a FedRAMP-recognized independent assessor to formally assess Moderniza. The certification decision will be published on this Trust Center and through its API.", icon: "rocket" },
];

const MILESTONES: { date: string; text: string; state: "Done" | "In progress" | "Planned" }[] = [
  { date: "2026-09-23", text: "Trust Center published with offering profile and KSI status", state: "Done" },
  { date: "2026-10-15", text: "FedRAMP Marketplace listing requested (Initial Implementation)", state: "In progress" },
  { date: "2026-11-30", text: "All 46 Key Security Indicators passing", state: "Planned" },
  { date: "2026-12-15", text: "First Ongoing Certification Report published", state: "Planned" },
  { date: "2027-01-15", text: "FedRAMP Recognized assessor selected and assessment scheduled", state: "Planned" },
  { date: "2027-03-01", text: "Six months of Key Security Indicator history complete", state: "Planned" },
  { date: "2027-04-15", text: "Independent assessment completed", state: "Planned" },
  { date: "2027-05-15", text: "FedRAMP Certification application submitted", state: "Planned" },
];

const SUBPROCESSORS: (string | ReactNode)[][] = [
  ["Anthropic", "San Francisco, California, USA", "AI model processing for code analysis and generation. Receives source code excerpts during processing.", "Why we use it, how it is configured, how impact on federal data is reduced, and compensating controls"],
  ["Amazon Web Services (AWS)", "Seattle, Washington, USA (us-east-1)", "Encrypted backup storage, evidence storage, container image registry and signing key.", "Why we use it, how it is configured, how impact on federal data is reduced, and compensating controls"],
  ["OpenAI", "San Francisco, California, USA", "AI model processing for code analysis and generation. Receives source code excerpts during processing.", "Why we use it, how it is configured, how impact on federal data is reduced, and compensating controls"],
  ["OpenRouter", "New York, New York, USA", "AI model routing for code analysis and generation. Passes source code excerpts to the selected model provider during processing.", "Why we use it, how it is configured, how impact on federal data is reduced, and compensating controls"],
];

const POLICIES: { name: string; desc: string; version: string; words: string; updated: string; status: "Approved" | "Draft"; availability: "Public" | "On request" }[] = [
  { name: "Access Control Policy", desc: "Who can access the system, how access is granted, and how it is reviewed and removed.", version: "1.2", words: "~5,100", updated: "2026-08-10", status: "Approved", availability: "On request" },
  { name: "Audit and Accountability Policy", desc: "Which events are logged, how logs are protected, and how they are reviewed.", version: "1.1", words: "~9,200", updated: "2026-08-26", status: "Approved", availability: "On request" },
  { name: "Vulnerability Disclosure Program", desc: "How to report a security vulnerability to Business Integra, and how reports are handled.", version: "1.1", words: "~1,600", updated: "2026-08-31", status: "Draft", availability: "On request" },
  { name: "Privacy Policy (PT-1)", desc: "How personal information in the service is collected, used, protected and retained.", version: "1.0", words: "~1,900", updated: "2026-08-29", status: "Draft", availability: "Public" },
  { name: "Incident Response Policy", desc: "How security incidents are detected, reported, contained and resolved.", version: "1.0", words: "~2,100", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Configuration Management Policy", desc: "How system baselines are set, and how changes are approved and tracked.", version: "1.0", words: "~2,200", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Security Awareness and Training Policy (AT-1)", desc: "How staff are trained on security and their responsibilities.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Assessment, Authorization and Monitoring Policy (CA-1)", desc: "How security controls are assessed, authorized and continuously monitored.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Identification and Authentication Policy (IA-1)", desc: "How users and services prove who they are before gaining access.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Maintenance Policy (MA-1)", desc: "How system maintenance is planned, controlled and recorded.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Media Protection Policy (MP-1)", desc: "How storage media holding system data is protected, transported and sanitized.", version: "1.0", words: "~1,700", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Planning Policy (PL-1)", desc: "How security plans and rules of behavior are written and kept current.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Personnel Security Policy (PS-1)", desc: "How staff are screened, onboarded and offboarded.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "Risk Assessment Policy (RA-1)", desc: "How risks and vulnerabilities are identified, assessed and addressed.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "System and Services Acquisition Policy (SA-1)", desc: "How systems, components and services are acquired and developed securely.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "System and Communications Protection Policy (SC-1)", desc: "How system boundaries and data in transit are protected.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
  { name: "System and Information Integrity Policy (SI-1)", desc: "How flaws are fixed, malicious code is blocked and the system is monitored.", version: "1.0", words: "—", updated: "2026-08-29", status: "Draft", availability: "On request" },
];

const CONTACTS: { kind: string; name: string; email: string; phone: string; icon: IconKind }[] = [
  { kind: "Security", name: "Chandra Kumar", email: "chandrakumar@xmedia.in", phone: "security phone", icon: "shield" },
  { kind: "Sales", name: "Leelairajan", email: "leelairajan@gmail.com", phone: "sales phone", icon: "person" },
];

const ACCESS_MAILTO =
  "mailto:chandrakumar@xmedia.in?subject=Moderniza%20FedRAMP%20Trust%20Center%3A%20read-only%20access%20request";

/* ============================================================================
   RENDER HELPERS
   ========================================================================== */

type Bg = "ink" | "chalk" | "bone";
const isDark = (bg: Bg) => bg === "ink";

function Badge({ kind, children }: { kind: "pos" | "warn" | "neutral"; children: ReactNode }) {
  const map = {
    pos: "border-glow/40 bg-glow/10 text-glow",
    warn: "border-ember/40 bg-ember/10 text-ember",
    neutral: "border-current/20 bg-current/5 opacity-70",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${map[kind]}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${kind === "pos" ? "bg-glow" : kind === "warn" ? "bg-ember" : "bg-current"}`} />
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
                className={`px-5 py-3.5 text-left align-bottom font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] ${dark ? "text-glow/80" : "text-ink/55"} ${i === 0 ? "w-[24%]" : ""}`}
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
                      : dark ? "text-chalk/80" : "text-ink/75"
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
  const labelCls = dark ? "text-glow/70" : "text-ink/45";
  const valueCls = dark ? "text-chalk" : "text-ink";
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal
          key={it.label}
          delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
          className={`rounded-2xl border p-5 ${card} ${it.wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
        >
          <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${labelCls}`}>{it.label}</p>
          <p className={`mt-2 text-[15px] leading-relaxed ${valueCls}`}>{it.value}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Section({
  id, n, label, title, lede, bg, children,
}: {
  id: string; n: string; label: string; title: ReactNode; lede?: ReactNode; bg: Bg; children: ReactNode;
}) {
  const dark = isDark(bg);
  const bgClass = bg === "ink" ? "bg-ink" : bg === "chalk" ? "bg-chalk text-ink" : "bg-bone text-ink";
  return (
    <section id={id} className={`relative scroll-mt-28 ${bgClass} ${!dark ? "border-t border-ink/10" : ""}`}>
      <div className={`absolute inset-0 ${dark ? "bg-grid opacity-30" : "bg-grid-soft opacity-50"}`} />
      {dark && <AmbientFx tone="dark" density="med" corner="tr" />}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
        <Reveal className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] ${dark ? "text-glow" : "text-ink/60"}`}>
          <span className="font-mono">/ {n} — {label}</span>
          <span className={`h-px flex-1 ${dark ? "bg-glow/30" : "bg-ink/15"}`} />
        </Reveal>
        <Reveal delay={1} as="h2" className="mt-7 max-w-4xl text-3xl md:text-5xl font-semibold leading-[1.04] tracking-[-0.02em]">
          {title}
        </Reveal>
        {lede && (
          <Reveal delay={2} as="p" className={`mt-6 max-w-3xl text-base md:text-lg leading-relaxed ${dark ? "text-chalk/80" : "text-ink/70"}`}>
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
    <div className={`mt-8 max-w-3xl space-y-5 text-[15px] leading-relaxed ${dark ? "text-chalk/80" : "text-ink/75"}`}>
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
        <AmbientFx tone="dark" density="high" corner="tr" />

        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <Reveal className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-mist">
              <Link href="/enterprises" className="hover:text-glow transition-colors">Enterprises</Link>
              <span className="text-mist/50">/</span>
              <span className="text-chalk">Trust Center</span>
            </Reveal>

            <Reveal delay={1} className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-glow">
              <span aria-hidden className="h-2 w-2 rounded-full bg-glow pulse-dot" />
              <span className="font-mono">/ FedRAMP Trust Center</span>
              <span className="h-px flex-1 bg-glow/30" />
            </Reveal>

            <Reveal delay={2} as="h1" className="mt-8 max-w-[20ch] text-5xl md:text-7xl font-semibold leading-[0.96] tracking-[-0.035em]">
              FedRAMP Trust Center <span className="text-gradient">— Moderniza</span>
            </Reveal>

            <Reveal delay={3} as="p" className="mt-7 max-w-[62ch] text-lg text-chalk/80 leading-relaxed">
              Security, compliance and certification information for Moderniza, the legacy
              modernization SaaS offering from Business Integra.
            </Reveal>

            <Reveal delay={4} className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-glow/40 bg-glow/10 px-4 py-1.5 text-xs font-medium text-glow">
                <span className="h-2 w-2 rounded-full bg-glow pulse-dot" />
                FedRAMP 20x Class C
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-medium text-ember">
                Not yet FedRAMP certified
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 px-4 py-1.5 text-xs text-mist">
                Verified {META.verified}
              </span>
            </Reveal>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </section>

      {/* ============ STICKY SECTION MENU ============ */}
      <nav className="sticky top-16 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2.5 text-[12px] [scrollbar-width:none] [-ms-overflow-style:none]">
            {SECTION_MENU.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-mist hover:bg-glow/10 hover:text-glow transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ============ 01 OVERVIEW ============ */}
      <Section
        id="overview" n="01" label="Overview" bg="chalk"
        title={<>System <span className="text-gradient-ink">overview</span>.</>}
        lede="Moderniza is a Software as a Service (SaaS) offering from Business Integra that modernizes legacy software applications. Agencies upload legacy source code (COBOL, VB6, PHP, Java, .NET and other languages), and Moderniza converts it into a modern, tested, containerised application through an evidence-driven pipeline."
      >
        <Prose
          tone="chalk"
          paras={[
            "Each stage must pass automated quality and security gates before the next stage begins. Every business rule found in the legacy code is traced to the new code that implements it, so the agency can audit what was converted and how.",
            "Users access Moderniza through a web browser. Nothing is installed on the agency side.",
            <><strong className="font-semibold text-ink">Status.</strong> Moderniza is pursuing FedRAMP 20x Class C certification and is not yet FedRAMP certified.</>,
          ]}
        />

        <SubHead tone="chalk" first>FedRAMP details</SubHead>
        <SpecGrid tone="chalk" items={FEDRAMP_SPEC} />

        <SubHead tone="chalk">Organization</SubHead>
        <SpecGrid tone="chalk" items={ORG_SPEC} />

        <SubHead tone="chalk">Cloud service offering</SubHead>
        <SpecGrid tone="chalk" items={CSO_SPEC} />
        <Reveal delay={1} as="p" className="mt-6 max-w-3xl text-sm text-ink/65 leading-relaxed">
          Customer documentation covers deployment (Kubernetes and Docker Compose), identity integration (OIDC, PIV/CAC,
          passkeys), the audit log schema, the conversion evidence pack, and the acceptance plan delivered with every conversion.
        </Reveal>
      </Section>

      {/* ============ 02 SERVICE LIST ============ */}
      <Section
        id="services" n="02" label="Public Service List" bg="ink"
        title={<>The services <span className="text-gradient">in scope</span>.</>}
        lede="Every service below is part of the Moderniza hosted offering and has a FIPS 199 security categorization of Moderate."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-3xl border border-white/10 bg-graphite/40 p-6 lift h-full">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-chalk">{s.name}</h3>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge kind="neutral">Moderate</Badge>
                  <Badge kind="pos">In scope</Badge>
                </div>
              </div>
              <p className="mt-3 text-sm text-chalk/70 leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 03 CONFIGURATION GUIDANCE ============ */}
      <Section
        id="configuration" n="03" label="Secure Configuration Guidance" bg="bone"
        title={<>Secure configuration <span className="text-gradient-ink">guidance</span>.</>}
        lede="Moderniza gives every customer a Secure Configuration Guide. It explains how to set up, use and remove administrator accounts safely, and lists every security setting with its current value, our recommended value and why it matters."
      >
        <SubHead tone="bone">Administrator accounts in Moderniza</SubHead>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ADMIN_ACCOUNTS.map(([type, def], i) => (
            <Reveal key={i} delay={((i % 2) + 1) as 1 | 2} className="rounded-2xl border border-ink/10 bg-white/70 p-6 lift h-full">
              <h4 className="text-base font-semibold tracking-tight text-ink">{type}</h4>
              <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">{def}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={1} as="p" className="mt-6 max-w-3xl text-sm text-ink/70 leading-relaxed">
          An Administrator works with normal Member rights until they elevate. Service accounts used by scripts can never
          hold the Administrator role or elevate.
        </Reveal>

        <SubHead tone="bone">Secure Configuration Guide topics</SubHead>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {GUIDE_TOPICS.map(([topic, sec], i) => (
            <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 bg-white/70 p-4">
              <span className="text-sm text-ink/80 leading-snug">{topic}</span>
              <span className="shrink-0 rounded-full border border-ink/15 bg-ink/[0.03] px-2.5 py-1 font-mono text-[11px] text-ink/55">§ {sec}</span>
            </Reveal>
          ))}
        </div>

        <SubHead tone="bone">How to get the guide</SubHead>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { h: "Who can get it", b: "Agency customers, agencies evaluating Moderniza, and FedRAMP assessors." },
            { h: "How to ask", b: "Email the Security contact listed in Contacts. Name your agency and your role. We reply with the guide within 5 business days." },
            { h: "Why it is not public", b: "The guide describes our platform settings and known limitations in detail, so we share it only with the people who need to configure or assess the platform." },
          ].map((c, i) => (
            <Reveal key={c.h} delay={((i % 3) + 1) as 1 | 2 | 3} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
              <h4 className="text-sm font-semibold tracking-tight text-ink">{c.h}</h4>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{c.b}</p>
            </Reveal>
          ))}
        </div>

        <SubHead tone="bone">Current version</SubHead>
        {GUIDE_DOC.map((d, i) => (
          <Reveal key={i} className="mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white/70 p-6">
            <div className="flex items-center gap-4">
              <CardIcon kind="doc" tone="light" className="h-10 w-10" />
              <div>
                <p className="font-semibold tracking-tight text-ink">{d[0]}</p>
                <p className="mt-1 font-mono text-[11px] text-ink/55">v{d[1]} · {d[2]}</p>
              </div>
            </div>
            <Badge kind="warn">{d[3]}</Badge>
          </Reveal>
        ))}

        <SubHead tone="bone">Configuration capabilities</SubHead>
        <Table
          tone="bone"
          head={["Requirement", "Level", "Capability", "Status in Moderniza today"]}
          rows={CONFIG_CAPS.map((r) => [
            r[0],
            <Badge key="l" kind={r[1] === "MUST" ? "pos" : "neutral"}>{r[1]}</Badge>,
            r[2],
            r[3],
          ])}
          minWidth={1040}
        />
      </Section>

      {/* ============ 04 CERTIFICATION PACKAGE ============ */}
      <Section
        id="certification-package" n="04" label="Certification Package" bg="ink"
        title={<>The certification <span className="text-gradient">package</span>.</>}
        lede="FedRAMP 20x Class C certification package information for Moderniza, including the submission approach and rationale and Key Security Indicator (KSI) validation."
      >
        <SubHead tone="ink">Submission rationale</SubHead>
        <Prose tone="ink" paras={["Federal agencies run mission systems on legacy code that few people can still maintain. Moderniza converts that code into modern, supportable applications and gives the agency evidence for every step: what was found in the legacy code, what was built, which tests proved it, and which security gates it passed. FedRAMP certification lets agencies use this service with confidence that their source code is protected to federal standards."]} />

        <SubHead tone="ink">Submission approach</SubHead>
        <Prose
          tone="ink"
          paras={[
            "Moderniza is pursuing FedRAMP 20x Class C certification through automation and machine-readable evidence. Moderniza does not use a third-party GRC tool. It runs its own automated validators for each of the 46 FedRAMP Key Security Indicators every six hours. Each result is recorded in a hash-chained ledger, so any change to past evidence is detectable. The same evidence is published on this Trust Center in human-readable and machine-readable form.",
            "Security is built into the service: generated applications must pass security and quality gates before delivery, and every pipeline stage leaves an auditable record.",
          ]}
        />

        <SubHead tone="ink">Minimum assessment scope</SubHead>
        <Prose tone="ink" paras={["The assessment boundary covers the Moderniza web application, API, conversion workers, PostgreSQL database, evidence ledger, AI model connections and AWS backup storage, and every person or service account that signs in to them."]} />

        <SubHead tone="ink">Security package contents</SubHead>
        <p className="mt-4 max-w-3xl text-sm text-chalk/70">The 17 security policies cover one for each NIST SP 800-53 control family, plus a Vulnerability Disclosure Program.</p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGE_CONTENTS.map((c, i) => (
            <Reveal key={c} delay={1} as="li" className="flex items-center gap-3 rounded-xl border border-white/10 bg-graphite/40 px-4 py-3 text-sm text-chalk/80">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />
              {c}
            </Reveal>
          ))}
        </ul>

        <SubHead tone="ink">Continuous KSI validation reporting</SubHead>
        <Prose tone="ink" paras={[<>All 46 KSIs are measured automatically every six hours. Current status for each indicator and the full history of snapshots are published at <a href="https://bimod.mo.vc/trust-center" className="text-glow hover:underline">https://bimod.mo.vc/trust-center</a>.</>]} />

        <SubHead tone="ink">Machine-readable package data schema</SubHead>
        <Prose tone="ink" paras={[<>The machine-readable package overview published at <a href="https://bimod.mo.vc/api/v1/trust-center/package-overview" className="text-glow hover:underline">https://bimod.mo.vc/api/v1/trust-center/package-overview</a> conforms to the official FedRAMP Certification Package Overview JSON schema.</>]} />

        <SubHead tone="ink">Package metadata</SubHead>
        <SpecGrid tone="ink" items={PACKAGE_META} />

        <SubHead tone="ink">Information flows &amp; security categories</SubHead>
        <p className="mt-4 max-w-3xl text-sm text-chalk/70 leading-relaxed">
          How information moves through the Moderniza minimum assessment scope. FIPS 199 categorization has not been
          approved yet, so every category is shown as proposed Moderate. The data-flow diagrams and the list of known
          weaknesses are shared with read-only account holders, not publicly.
        </p>
        <Table
          tone="ink"
          head={["Flow", "What travels", "Leaves the boundary?", "Security category"]}
          rows={INFO_FLOWS.map((f) => [
            f.flow,
            f.travels,
            <Badge key="b" kind={f.leaves === "yes" ? "warn" : "pos"}>{f.leavesText}</Badge>,
            "Moderate (proposed)",
          ])}
          minWidth={900}
        />

        <SubHead tone="ink">Cryptographic modules</SubHead>
        <Prose tone="ink" paras={["Moderniza uses NIST-approved algorithms for 14 of its 16 cryptographic uses: PBKDF2-SHA256, AES/Fernet, HMAC-SHA256, ECDSA P-256, Ed25519, SHA-256, and TLS 1.2/1.3. These do not yet run in FIPS 140 validated modules. Our plan is to move to a FIPS 140-3 validated OpenSSL provider (decision by 31 Oct 2026). Backup encryption uses AWS KMS."]} />
        <Table tone="ink" head={["Module", "Version", "Used for", "FIPS status", "Certificate"]} rows={CRYPTO_MODULES} minWidth={960} />
        <p className="mt-5 text-sm text-mist">Summary from the inventory: 16 uses of cryptography, 14 with approved algorithms, 0 in a validated module.</p>

        <SubHead tone="ink">Independent assessment results</SubHead>
        <Reveal delay={1} className="mt-6 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-medium text-ember">
          <span className="h-2 w-2 rounded-full bg-ember pulse-dot" /> Independent assessment: Pending
        </Reveal>
        <p className="mt-4 max-w-3xl text-sm text-chalk/70">No FedRAMP-recognized assessor has been engaged yet. The assessor's overall summary will be published here unchanged when it is received.</p>
        <Table tone="ink" head={["Item", "Value"]} rows={ASSESSMENT_ROWS} minWidth={640} />

        <SubHead tone="ink">Also part of this package</SubHead>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { code: "CDS-CSO-PUB", label: "Public information", href: "#overview", target: "01 Overview" },
            { code: "CDS-CSO-SVC", label: "Service list", href: "#services", target: "02 Service List" },
            { code: "MAS-CSO-TPR", label: "Third-party resources", href: "#subprocessors", target: "06 Sub-processors" },
            { code: "CDS-CSO-IRP", label: "Policies and procedures", href: "#resources", target: "07 Resources" },
          ].map((l, i) => (
            <Reveal key={l.code} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li">
              <a href={l.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-graphite/40 px-5 py-4 hover:border-glow/40 transition-colors">
                <span className="min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-glow/70">{l.code}</span>
                  <span className="mt-1 block text-sm font-medium text-chalk">{l.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-xs text-mist">
                  {l.target}
                  <span aria-hidden className="text-glow transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ============ 05 SECURITY & CONTINUOUS MONITORING ============ */}
      <Section
        id="security" n="05" label="Security & Continuous Monitoring" bg="chalk"
        title={<>How Moderniza is <span className="text-gradient-ink">secured & monitored</span>.</>}
        lede="Our security program is built on 17 policies aligned to NIST SP 800-53 Rev. 5, with continuous monitoring, signed builds and tamper-evident evidence."
      >
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SECURITY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="group rounded-3xl border border-ink/10 bg-white/75 p-6 lift h-full">
              <CardIcon kind={c.icon} tone="light" className="h-10 w-10" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">{c.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://bimod.mo.vc/api/v1/trust-center/access" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm text-ink hover:border-ink/40 transition-colors">
            <span aria-hidden>↗</span> API documentation
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm text-ink/70">
            <span aria-hidden>▦</span> KSI Validation Workbook (Excel) — on request
          </span>
        </div>

        <SubHead tone="chalk">Progress toward certification</SubHead>
        <p className="mt-4 text-sm text-ink/60">Goal: FedRAMP 20x Class C Certification. Last updated 2026-09-23; next update due 2026-12-22 (at least quarterly).</p>
        <ol className="mt-8 relative border-l border-ink/15 pl-8">
          {MILESTONES.map((m, i) => {
            const dot = m.state === "Done" ? "bg-glow border-glow" : m.state === "In progress" ? "bg-ember border-ember" : "bg-chalk border-ink/30";
            const kind = m.state === "Done" ? "pos" : m.state === "In progress" ? "warn" : "neutral";
            return (
              <Reveal key={m.date} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative pb-8 last:pb-0">
                <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 ${dot}`} />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs tracking-wide text-ink/55">{m.date}</span>
                  <Badge kind={kind as "pos" | "warn" | "neutral"}>{m.state}</Badge>
                </div>
                <p className="mt-1.5 text-[15px] font-medium text-ink">{m.text}</p>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal className="rounded-3xl border border-ink/10 bg-white/75 p-6 lift">
            <h3 className="text-lg font-semibold tracking-tight text-ink">Ongoing Certification Reports</h3>
            <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">A report every 3 months covering changes, vulnerabilities, incidents and lessons learned, shared with all necessary parties. Each report carries its own reference ID.</p>
            <p className="mt-4 text-xs"><span className="rounded-full bg-ink/5 px-3 py-1 text-ink/70">Next report: 2026-12-15</span></p>
            <p className="mt-3 text-xs text-ink/50">Latest report: none published yet.</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">CCM-OCR-AVL · NRD · FBM · AFS</p>
          </Reveal>
          <Reveal delay={1} className="rounded-3xl border border-ink/10 bg-white/75 p-6 lift">
            <h3 className="text-lg font-semibold tracking-tight text-ink">Quarterly Reviews</h3>
            <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">Class C providers host a live quarterly review open to all necessary parties. Recordings or transcripts are shared with necessary parties after each review.</p>
            <p className="mt-4 text-xs"><span className="rounded-full bg-ink/5 px-3 py-1 text-ink/70">Next review: 2026-12-15</span></p>
            <p className="mt-3 text-xs text-ink/50">Registration link or calendar file: to follow.</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">CCM-QTR-MTG · REG · NRD · RTR</p>
          </Reveal>
          <Reveal delay={2} className="rounded-3xl border border-ink/10 bg-white/75 p-6 lift">
            <h3 className="text-lg font-semibold tracking-tight text-ink">Service Availability</h3>
            <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">Current and historical availability for at least the last 30 days, including incidents, hosted so it stays up even if Moderniza is down.</p>
            <p className="mt-4 text-xs"><span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-ember"><span className="h-1.5 w-1.5 rounded-full bg-ember" />Status page: not set up yet</span></p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">CDS-CSO-AVR (MUST for Class C)</p>
          </Reveal>
        </div>
      </Section>

      {/* ============ 06 SUB-PROCESSORS ============ */}
      <Section
        id="subprocessors" n="06" label="Sub-processors" bg="ink"
        title={<>Third-party service <span className="text-gradient">providers</span>.</>}
        lede="Business Integra reviews each vendor before use, limits the data it receives, and binds it by contract. The vendors below process customer data for Moderniza."
      >
        <Table tone="ink" head={["Sub-processor", "Location", "Services provided", "Risk handling"]} rows={SUBPROCESSORS} minWidth={960} />
      </Section>

      {/* ============ 07 RESOURCES ============ */}
      <Section
        id="resources" n="07" label="Resources" bg="bone"
        title={<>Policies, statements & <span className="text-gradient-ink">procedures</span>.</>}
        lede="Policies, statements and related documents for the offering. Word counts are approximate. Policies marked Draft are not yet approved. Each policy's file reference is listed in the machine-readable policies feed."
      >
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {POLICIES.map((p, i) => (
            <Reveal key={p.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-2xl border border-ink/10 bg-white/75 p-5 lift h-full">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight text-ink">{p.name}</h3>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Badge kind={p.status === "Approved" ? "pos" : "warn"}>{p.status}</Badge>
                </div>
              </div>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-ink/10 pt-3 font-mono text-[11px] text-ink/55">
                <span>v{p.version}</span>
                <span>{p.words} words</span>
                <span>{p.updated}</span>
                <span className={p.availability === "Public" ? "text-ink/80" : ""}>{p.availability}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 08 ACCESS INSTRUCTIONS ============ */}
      <Section
        id="access" n="08" label="Access Instructions" bg="ink"
        title={<>Accessing Trust Center <span className="text-gradient">information</span>.</>}
      >
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { h: "Public information", b: <>This page is public and does not require authentication.</> },
            { h: "Machine-readable data", b: <>The same data as this page, in machine-readable form: <a href="https://bimod.mo.vc/api/v1/trust-center" className="text-glow hover:underline">machine-readable version (JSON)</a>.</> },
            { h: "Full certification package", b: <>Federal agencies and other necessary parties can request a read-only account from the security contact. The account unlocks full evidence and historical snapshots at the same URLs.</> },
            { h: "Trust Center navigation", b: <>Open <span className="font-mono text-chalk/85">bimod.mo.vc</span> → trust-center → FedRAMP Trust Center. For the full package, email the security contact to request a read-only account.</> },
          ].map((item, i) => (
            <Reveal key={item.h} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-3xl border border-white/10 bg-graphite/40 p-6 lift">
              <h3 className="text-lg font-semibold tracking-tight text-chalk">{item.h}</h3>
              <p className="mt-2.5 text-sm text-chalk/75 leading-relaxed">{item.b}</p>
            </Reveal>
          ))}

          <Reveal delay={2} className="flex flex-col justify-center rounded-3xl border border-glow/25 bg-glow/[0.05] p-6 md:col-span-2">
            <h3 className="text-lg font-semibold tracking-tight text-chalk">Request read-only access</h3>
            <p className="mt-2.5 max-w-2xl text-sm text-chalk/75 leading-relaxed">
              Federal agencies, FedRAMP and assessors — request a read-only account to unlock the full certification
              package, full evidence and every historical snapshot.
            </p>
            <MagneticButton href={ACCESS_MAILTO} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-glow px-5 text-sm font-semibold text-ink hover:bg-chalk transition-colors ring-pulse self-start">
              Request read-only access →
            </MagneticButton>
          </Reveal>
        </div>
      </Section>

      {/* ============ 09 CONTACTS ============ */}
      <Section
        id="contacts" n="09" label="Contacts" bg="chalk"
        title={<>Who to <span className="text-gradient-ink">contact</span>.</>}
      >
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.kind} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="rounded-3xl border border-ink/10 bg-white/75 p-7 lift h-full">
              <div className="flex items-center justify-between">
                <CardIcon kind={c.icon} tone="light" className="h-11 w-11" />
                <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink/55">{c.kind} contact</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{c.name}</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-14 shrink-0 text-ink/45">Email</dt>
                  <dd><a href={`mailto:${c.email}`} className="text-ink/80 hover:text-ember">{c.email}</a></dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-14 shrink-0 text-ink/45">Phone</dt>
                  <dd className="text-ink/75">{c.phone}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-ink/10 bg-bone/80 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">Need the full certification package?</h3>
            <p className="mt-1.5 text-sm text-ink/70">Request a read-only account from the security contact, or start with a scoped pilot.</p>
          </div>
          <MagneticButton href="/contact/start" className="h-12 shrink-0 rounded-full bg-ink px-6 text-sm font-semibold text-chalk hover:bg-graphite transition-colors">
            Request a pilot →
          </MagneticButton>
        </Reveal>
      </Section>
    </>
  );
}
