import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, OwnerNote, CtaBand, Arrow } from "../components/content";
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
        rightSlot={<ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="identity" eyebrow="/ 01 — Sign-in and identity" title={<>Phishing-resistant <span className="text-gradient-ink">by default</span>.</>}>
        <Table tone="light" head={["Control", "Detail"]} rows={[
          ["Strong passwords", "Stored with PBKDF2-HMAC-SHA256 at 600,000 iterations. 12-character minimum. Screened against breached-password lists. Account locks for 30 minutes after 5 failed attempts."],
          ["Second factor — your choice", "Passkey (WebAuthn / FIDO2), authenticator-app code (TOTP) with recovery codes, or fingerprint / Face Lock on a linked phone. No SMS codes."],
          ["Passwordless sign-in", "Sign in with a passkey alone. Cloned keys are detected and refused."],
          ["Single sign-on", "Available: OpenID Connect with Okta, Microsoft Entra ID (Azure AD), Keycloak or Login.gov. New SSO users start with least privilege."],
          ["CAC / PIV smart cards", "Available for government deployments, including DoD EDIPI identities."],
          ["MFA for admins", "Required for privileged accounts. Can be required for everyone."],
        ]} />
      </Section>

      <Section tone="dark" id="access" eyebrow="/ 02 — Access control" title={<>No standing <span className="text-gradient">admin rights</span>.</>}>
        <Bullets items={[
          { title: "Roles and permissions —", body: "admin, member and viewer roles, plus custom roles and per-user permissions. Members see only their own data." },
          { title: "Just-in-time admin access —", body: "admin rights are not standing. They are borrowed for up to one hour and need a fresh passkey." },
          { title: "Service accounts —", body: "for automation and integrations. They can never be raised to admin." },
          { title: "Session controls —", body: "concurrent-session limit, 30-minute idle timeout, 24-hour token life, re-sign-in within 15 minutes for sensitive actions, and server-side revocation." },
          { title: "Dormant accounts —", body: "disabled after 90 days of inactivity (35 days for privileged accounts)." },
          { title: "Access reviews —", body: "automated reviews flag standing privilege, admins without MFA, dormant admins and misused accounts." },
        ]} />
      </Section>

      <Section tone="light" id="audit" eyebrow="/ 03 — Tamper-evident audit log" title={<>Every record linked to <span className="text-gradient-ink">the one before it</span>.</>}>
        <Bullets tone="light" items={[
          { title: "About 80 kinds of events —", body: "sign-ins and sign-outs, MFA and passkey events, permission denials, role and privilege changes, policy approvals, downloads, configuration changes, deployments, and every project and conversion step." },
          { title: "Hash-chained —", body: "every record is linked to the one before it with SHA-256. One click verifies the whole chain." },
          { title: "Never lost with the request —", body: "each record is written in its own transaction." },
          { title: "Privacy-aware —", body: "sensitive fields are removed before writing." },
          { title: "Export —", body: "JSON, CSV or PDF. Forwarding to Splunk available." },
        ]} />
      </Section>

      <Section tone="dark" id="data" eyebrow="/ 04 — Data protection" title={<>Encrypted, FIPS-approved, <span className="text-gradient">post-quantum ready</span>.</>}>
        <Bullets items={[
          { body: "Secrets encrypted at rest with a rotating key ring. No built-in fallback key." },
          { body: "FIPS-approved algorithms for password hashing and signatures." },
          { title: "Post-quantum ready —", body: "session tokens can be signed with ML-DSA (FIPS 204)." },
          { title: "Controlled AI traffic —", body: "source code is only sent to approved AI hosts. AWS GovCloud (Bedrock) available." },
        ]} />
      </Section>

      <Section tone="light" id="supply-chain" eyebrow="/ 05 — Secure supply chain" title={<>Every build scanned, <span className="text-gradient-ink">checked and signed</span>.</>}>
        <Table tone="light" head={["Stage", "Tools"]} rows={[
          ["Secrets", "gitleaks"],
          ["Code", "Semgrep"],
          ["Dependencies", "OSV-Scanner + CISA Known Exploited Vulnerabilities list"],
          ["Infrastructure as code", "Checkov, KICS"],
          ["Container images", "Grype, Trivy, ClamAV"],
          ["Policy gate", "Open Policy Agent (conftest)"],
          ["Signing", "cosign signatures and attestations with a cloud KMS key"],
          ["Bill of materials", "CycloneDX and SPDX SBOMs, with OpenVEX statements"],
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
          <p>Moderniza tracks the FedRAMP 20x Key Security Indicators with automated checks. Every check shows the kind of evidence behind it — a running system, an artifact, or source code. Our Trust Center publishes our security posture, approved policies, vulnerabilities and change notices.</p>
        </Prose>
        <OwnerNote tone="light">FedRAMP authorization is in progress. The FedRAMP ID is pending today; authorization status will be published here when it exists.</OwnerNote>
        <Reveal delay={3} className="mt-6">
          <Arrow href="/trust-center" tone="light">Open the Trust Center</Arrow>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
