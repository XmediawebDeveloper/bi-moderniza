import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, CtaBand, Arrow } from "../components/content";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Moderniza Security — Passkeys, Tamper-Evident Audit, Signed Builds" },
  description:
    "Review Moderniza sign-in controls, audit records, build scans, signing requirements and FedRAMP 20x readiness evidence for your deployment.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Security", href: "/security" }, { label: "Security & trust" }]}
        eyebrow="/ Security & trust"
        title={<>Security built in, <span className="text-gradient">not bolted on</span>.</>}
        lede="Your source code is one of your most sensitive assets. Review sign-in controls, audit records and build-security evidence for the deployment you use."
        meta={<><span>Passkeys</span><span>·</span><span>Hash-chained audit</span><span>·</span><span>Signed builds</span><span>·</span><span>FedRAMP 20x readiness</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="identity" eyebrow="/ 01 — Sign-in and identity" title={<>Phishing-resistant <span className="text-gradient-ink">by default</span>.</>}>
        <Table tone="light" head={["Control", "Detail"]} rows={[
          ["Strong passwords", "Stored with PBKDF2-HMAC-SHA256 at 600,000 iterations. 12-character minimum. Screened against breached-password lists. Account locks for 30 minutes after 5 failed attempts. New accounts must set their own password at first sign-in."],
          ["Second factor — your choice", "Passkey (WebAuthn / FIDO2), authenticator-app code (TOTP) with recovery codes, or fingerprint / Face Lock on a linked phone. No SMS codes. Passkeys and phone sign-in can be switched off and on again without losing the keys."],
          ["Passwordless sign-in", "Sign in with a passkey alone. Cloned keys are detected and refused."],
          ["Single sign-on", "Confirm identity-provider compatibility and sign-in requirements for your deployment before relying on single sign-on."],
          ["CAC / PIV smart cards", "Confirm smart-card compatibility and deployment requirements with the security team."],
          ["Two-step sign-in for everyone", "Required for every person. Service accounts used by scripts cannot sign in as a person."],
        ]} />
      </Section>

      <Section tone="dark" id="access" eyebrow="/ 02 — Access control" title={<>No standing <span className="text-gradient">admin rights</span>.</>}>
        <Bullets items={[
          { title: "Two clear roles —", body: "Engineers do the work; Super Admins manage and approve. Engineers see only their own projects and the ones shared with them." },
          { title: "Super Admin power on demand —", body: "off by default, switched on with a passkey and a reason, runs out on its own (the limit is set by your security policy), and needs the passkey again to drop." },
          { title: "Feature switches —", body: "any page, step or button can be switched off for a role or one person, enforced by the server." },
          { title: "Service accounts —", body: "for automation and integrations. They can never be raised to Super Admin." },
          { title: "Session controls —", body: "concurrent-session limit, idle sign-out (20 minutes by default), sign in again every 12 hours, re-sign-in for sensitive actions, and server-side revocation of any session." },
          { title: "Dormant accounts —", body: "disabled after 90 days of inactivity (35 days for privileged accounts)." },
          { title: "Access reviews —", body: "a daily automated check and a monthly signed review of who has access." },
        ]} />
      </Section>

      <Section tone="light" id="audit" eyebrow="/ 03 — Tamper-evident audit log" title={<>Every record linked to <span className="text-gradient-ink">the one before it</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Audit event coverage —", body: "sign-ins and sign-outs, MFA and passkey events, permission denials, role and privilege changes, policy approvals, downloads, configuration changes, deployments, and every project and conversion step." },
          { title: "Hash-chained and append-only —", body: "every record is linked to the one before it with SHA-256, and the database refuses to change or delete a record. One click verifies the whole chain, or a single record." },
          { title: "Never lost with the request —", body: "each record is written in its own transaction." },
          { title: "Privacy-aware —", body: "sensitive fields are removed before writing." },
          { title: "Export —", body: "JSON, CSV or PDF. Forwarding to the SIEM (Splunk and Wazuh) is available." },
          { title: "Readable —", body: "open any record in a side panel: what happened in one sentence, who, from where, what it touched, and what else that account did around the same time." },
          { title: "Full audit log only for the few —", body: "reading everyone’s records needs a separate tick on top of the Super Admin role. Every person can read their own activity." },
        ]} />
      </Section>

      <Section tone="dark" id="data" eyebrow="/ 04 — Data protection" title={<>Data protection <span className="text-gradient">and deployment requirements</span>.</>}>
        <Bullets items={[
          { body: "Secrets encrypted at rest with a rotating key ring. No built-in fallback key." },
          { body: "Algorithm selection alone does not establish FIPS module validation or operation in FIPS mode." },
          { title: "Token signing —", body: "Request the signing algorithm, implementation evidence and enabled configuration for your deployment." },
          { title: "Controlled AI traffic —", body: "Confirm the approved endpoints, processing locations and data sent to each provider for your deployment." },
          { title: "Database and backup evidence —", body: "Request deployment-specific evidence for TLS certificate verification, the backup schedule, retention and last successful backup, encryption and key management, and a dated restore-drill record showing what was restored, the result and unresolved failures. A completed backup is not proof that a restore works." },
          { title: "A separate key for sign-in codes —", body: "authenticator secrets are sealed with their own key, apart from integration secrets." },
          { body: "Every generated app gets its own database login — never the platform’s." },
          { title: "Outbound requests checked —", body: "imports from a URL can only reach public addresses; internal and cloud-metadata addresses are refused, including after a redirect." },
          { title: "Malware scanning of every upload —", body: "files are scanned in batches; a scan that cannot finish refuses the upload." },
        ]} />
      </Section>

      <Section tone="light" id="supply-chain" eyebrow="/ 05 — Secure supply chain" title={<>Review build scans, <span className="text-gradient-ink">checks and signatures</span>.</>}>
        <Table tone="light" head={["Stage", "Documented tools — confirm enabled configuration"]} rows={[
          ["Secrets", "gitleaks"],
          ["Code", "Semgrep — request the scan result for the relevant commit"],
          ["Dependencies", "OSV-Scanner + CISA Known Exploited Vulnerabilities list"],
          ["Infrastructure as code", "Checkov, KICS"],
          ["Container images", "Grype, Trivy, ClamAV"],
          ["Policy gate", "Open Policy Agent (conftest)"],
          ["Signing", "cosign signatures and attestations with a cloud KMS key"],
          ["Bill of materials", "CycloneDX and SPDX SBOMs, with OpenVEX statements — request the artifacts for the relevant build"],
        ]} />
        <Prose tone="light"><p>Confirm scanner execution, displayed results and deployment-blocking rules for the exact commit and pipeline run. A tool listed here is not proof that it ran or that a failing result blocks deployment.</p></Prose>
      </Section>

      <Section tone="dark" id="runtime" eyebrow="/ 06 — Runtime protection (Kubernetes deployments)" title={<>Protected <span className="text-gradient">while it runs</span>.</>}>
        <Bullets cols={2} items={[
          { body: "Network policies between every service" },
          { body: "Falco runtime threat detection" },
          { body: "ClamAV anti-malware on every node" },
          { body: "Secrets from AWS Secrets Manager" },
        ]} />
      </Section>

      <Section tone="light" bone id="fedramp" eyebrow="/ 07 — FedRAMP 20x readiness" title={<>Built for the <span className="text-gradient-ink">public sector</span>.</>}>
        <Prose tone="light">
          <p>Review FedRAMP 20x indicator evidence, CIS benchmark results and snapshot timestamps for your deployment. Measurements do not constitute authorization. See the Compliance &amp; evidence page for the review workflow.</p>
        </Prose>
        <Reveal delay={3} className="mt-6 flex flex-wrap gap-6">
          <Arrow href="/compliance" tone="light">Compliance &amp; evidence</Arrow>
          <Arrow href="/trust-center" tone="light">Open the Trust Center</Arrow>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
