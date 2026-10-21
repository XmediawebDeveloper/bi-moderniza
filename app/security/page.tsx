import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, CtaBand, Arrow } from "../components/content";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Moderniza Security — Passkeys, Tamper-Evident Audit, Signed Builds" },
  description:
    "Phishing-resistant login, just-in-time admin access, a hash-chained audit log, encrypted secrets, a scanned and signed supply chain, and FedRAMP 20x readiness.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Security", href: "/security" }, { label: "Security & trust" }]}
        eyebrow="/ Security & trust"
        title={<>Security built in, <span className="text-gradient">not bolted on</span>.</>}
        lede="Your source code is one of your most sensitive assets. Moderniza is built to protect it — from the way people sign in to the way every build is scanned and signed."
        meta={<><span>Passkeys</span><span>·</span><span>Hash-chained audit</span><span>·</span><span>Signed builds</span><span>·</span><span>FedRAMP 20x readiness</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="identity" eyebrow="/ 01 — Sign-in and identity" title={<>Phishing-resistant <span className="text-gradient-ink">by default</span>.</>}>
        <Table tone="light" head={["Control", "Detail"]} rows={[
          ["Strong passwords", "Stored with PBKDF2-HMAC-SHA256 at 600,000 iterations. 12-character minimum. Screened against breached-password lists. Account locks for 30 minutes after 5 failed attempts. New accounts must set their own password at first sign-in."],
          ["Second factor — your choice", "Passkey (WebAuthn / FIDO2), authenticator-app code (TOTP) with recovery codes, or fingerprint / Face Lock on a linked phone. No SMS codes. Passkeys and phone sign-in can be switched off and on again without losing the keys."],
          ["Passwordless sign-in", "Sign in with a passkey alone. Cloned keys are detected and refused."],
          ["Single sign-on", "Available: OpenID Connect with Okta, Microsoft Entra ID (Azure AD), Keycloak or Login.gov. New SSO users start with least privilege."],
          ["CAC / PIV smart cards", "Available for government deployments, including DoD EDIPI identities."],
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
          { title: "About 80 kinds of events —", body: "sign-ins and sign-outs, MFA and passkey events, permission denials, role and privilege changes, policy approvals, downloads, configuration changes, deployments, and every project and conversion step." },
          { title: "Hash-chained and append-only —", body: "every record is linked to the one before it with SHA-256, and the database refuses to change or delete a record. One click verifies the whole chain, or a single record." },
          { title: "Never lost with the request —", body: "each record is written in its own transaction." },
          { title: "Privacy-aware —", body: "sensitive fields are removed before writing." },
          { title: "Export —", body: "JSON, CSV or PDF. Forwarding to the SIEM (Splunk and Wazuh) is available." },
          { title: "Readable —", body: "open any record in a side panel: what happened in one sentence, who, from where, what it touched, and what else that account did around the same time." },
          { title: "Full audit log only for the few —", body: "reading everyone’s records needs a separate tick on top of the Super Admin role. Every person can read their own activity." },
        ]} />
      </Section>

      <Section tone="dark" id="data" eyebrow="/ 04 — Data protection" title={<>Encrypted, FIPS-approved, <span className="text-gradient">post-quantum ready</span>.</>}>
        <Bullets items={[
          { body: "Secrets encrypted at rest with a rotating key ring. No built-in fallback key." },
          { body: "FIPS-approved algorithms for password hashing and signatures." },
          { title: "Post-quantum ready —", body: "session tokens can be signed with ML-DSA (FIPS 204)." },
          { title: "Controlled AI traffic —", body: "source code is only sent to approved AI hosts. AWS GovCloud (Bedrock) available." },
          { title: "Encrypted database connections —", body: "the platform database requires TLS with full certificate checks, and keeps a write-ahead log archive and daily base backups." },
          { title: "A separate key for sign-in codes —", body: "authenticator secrets are sealed with their own key, apart from integration secrets." },
          { body: "Every generated app gets its own database login — never the platform’s." },
          { title: "Outbound requests checked —", body: "imports from a URL can only reach public addresses; internal and cloud-metadata addresses are refused, including after a redirect." },
          { title: "Malware scanning of every upload —", body: "files are scanned in batches; a scan that cannot finish refuses the upload." },
        ]} />
      </Section>

      <Section tone="light" id="supply-chain" eyebrow="/ 05 — Secure supply chain" title={<>Every build scanned, <span className="text-gradient-ink">checked and signed</span>.</>}>
        <Table tone="light" head={["Stage", "Tools"]} rows={[
          ["Secrets", "gitleaks"],
          ["Code", "Semgrep — a real full scan on every pipeline, findings kept as evidence"],
          ["Dependencies", "OSV-Scanner + CISA Known Exploited Vulnerabilities list"],
          ["Infrastructure as code", "Checkov, KICS"],
          ["Container images", "Grype, Trivy, ClamAV"],
          ["Policy gate", "Open Policy Agent (conftest)"],
          ["Signing", "cosign signatures and attestations with a cloud KMS key"],
          ["Bill of materials", "CycloneDX and SPDX SBOMs, with OpenVEX statements — pulled from each pipeline and kept as evidence"],
        ]} />
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
          <p>Moderniza measures all 46 FedRAMP 20x Key Security Indicators on its own running platform every six hours, scans the whole stack against CIS benchmarks every day, and publishes its posture in a Trust Center and in FedRAMP&rsquo;s machine-readable package format. See the Compliance &amp; evidence page.</p>
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
