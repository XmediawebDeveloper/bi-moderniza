import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "FedRAMP 20x Evidence, CIS Benchmarks and App Security — Moderniza" },
  description:
    "Review FedRAMP 20x indicator evidence, proof cards, assessor exports, CIS benchmark reviews and app security checks. Measurements do not constitute authorization.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Security", href: "/security" }, { label: "Compliance & evidence" }]}
        eyebrow="/ Compliance & evidence"
        title={<>Evidence you can hand <span className="text-gradient">to an assessor</span>.</>}
        lede="Moderniza does not describe its security in a document and hope it stays true. It measures the running platform, keeps the proof, and shows the result — pass, fail or could not check — with the reason in plain English."
        meta={<><span>FedRAMP 20x</span><span>·</span><span>CIS Benchmark</span><span>·</span><span>App Security</span><span>·</span><span>SIEM</span><span>·</span><span>Trust Center</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="fedramp" eyebrow="/ 01 — FedRAMP 20x" title={<>Security indicators, <span className="text-gradient-ink">with evidence</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Indicator snapshots —", body: "Review the current indicator inventory, evidence timestamps and snapshot history for your deployment. Measurement does not constitute FedRAMP authorization." },
          { title: "Live checks, live tests and code checks.", body: "Each indicator is graded from what the running system shows — settings, records, listening ports, certificates, database rows — plus live tests against the running platform. Code checks are shown for reference." },
          { title: "Graded against FedRAMP's own control list.", body: "A measurement counts only for the indicators FedRAMP lists its control under." },
          { title: "Honest tiers.", body: "An indicator is only as strong as its weakest claim. A claim backed only by source code is labelled as such." },
          { title: "Could not check is never a pass.", body: "Old or missing evidence is shown as “could not check”." },
        ]} />
      </Section>

      <Section tone="dark" id="run-now" eyebrow="/ 02 — Run now — a real re-test" title={<>Press Run now. <span className="text-gradient">Review the jobs, tests and proof</span>.</>}>
        <Prose>
          <p>The documented Run now workflow requests fresh evidence jobs and tests for an indicator. Review which jobs ran, their timestamps and any records that could not be recreated on demand.</p>
          <p><span className="font-semibold text-chalk">Re-test all</span> covers the configured indicator set. Review the live run log, test results and proof captures, then confirm that the completed run was published as a new snapshot. Check the snapshot identifier and publication time before sharing it with an assessor.</p>
        </Prose>
      </Section>

      <Section tone="light" id="proof" eyebrow="/ 03 — Proof behind every result" title={<>From plain English <span className="text-gradient-ink">to a verifier</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Plain-English view first.", body: "For each indicator: the question, the answer, what is wrong and what to do — or, for a pass, the evidence that makes it a pass." },
          { title: "Failing items first —", body: "Use failed results to prioritize review, then inspect missing or stale evidence. Confirm the ordering and filters available in your deployed indicator view." },
          { title: "One card per measurement —", body: "what we checked, where we looked, the rule, what the test did, what we expected, what we found, the result and why, with the proof file." },
          { title: "What was tested table —", body: "under every run log: what was tested, expected, got and the result, with each test case's steps." },
          { title: "Proof PDF —", body: "The documented exports cover an individual indicator or the full set. Review the exported results and masking of email addresses and server paths before sharing." },
          { title: "Evidence package —", body: "Request the snapshot, records, proof, run logs, ledgers and assessor-run verifier script and instructions together. Check the masked copy before sharing it outside your team." },
          { title: "JSON evidence —", body: "Request the combined indicator JSON and an individual JSON file for each indicator, tied to the same snapshot." },
          { title: "Per-file SHA-256 manifest —", body: "Ask for a manifest listing each package file and its SHA-256 digest, and the verifier instructions. Confirm that missing or modified files are reported; a checksum alone does not establish who produced the evidence." },
          { title: "Hash-chained ledgers —", body: "Review the ledger for runs, snapshots and proof captures alongside the verifier result. Chain integrity does not by itself establish that the underlying measurements are correct." },
        ]} />
      </Section>

      <Section tone="dark" id="policies" eyebrow="/ 04 — Policies — read, then approve" title={<>Approved only <span className="text-gradient">after reading to the end</span>.</>}>
        <Prose>
          <p>The 17 security policy documents can be read in full on the page. The named approving authority can approve a document only after reading it to the end, and signs with a passkey. Every approval is tied to the exact text that was read.</p>
        </Prose>
      </Section>

      <Section tone="light" id="cis" eyebrow="/ 05 — CIS Benchmark — how safe is our setup?" title={<>Review the stack against <span className="text-gradient-ink">CIS benchmarks</span>.</>}>
        <Table tone="light" head={["Area", "Benchmark", "Scanner"]} rows={[
          ["AWS account", "CIS AWS Foundations", "Prowler"],
          ["Server", "CIS Amazon Linux 2023 Level 1", "OpenSCAP with the SCAP Security Guide"],
          ["Docker containers", "CIS Docker", "docker-bench-security"],
          ["Database (PostgreSQL)", "CIS PostgreSQL", "pgdsat"],
          ["Web server (NGINX)", "CIS NGINX", "Moderniza's own checker"],
        ]} />
        <Bullets tone="light" items={[
          { title: "Scan schedule —", body: "Review the configured schedule, last completed scan and next run for each area. Confirm which scanners are enabled on your deployment." },
          { title: "Plain words —", body: "each card answers a question, shows “X of Y checks passed”, what is wrong grouped by topic, and what to fix first." },
          { title: "Every check —", body: "filter by failed, passed, needs a person or does not apply, with the rule, what it must be, what was found and how to fix it." },
          { title: "A person confirms —", body: "The documented workflow calls for Super Admin review and passkey sign-off where a scanner needs human judgment. Check the review expiry and whether a changed scan requires a new review." },
          { title: "Accepted exceptions —", body: "Review the signed exception, its reason, supporting evidence and expiry alongside the original failed result. An accepted risk is not a passing scan." },
          { title: "Does not apply here —", body: "checks that cannot apply on this server are shown with the reason, never hidden." },
          { title: "Evidence for an assessor —", body: "one zip with every area's raw scanner output, the normalised report, every check as CSV, the review ledger and a verifier. A full readable scan report per area." },
        ]} />
      </Section>

      <Section tone="dark" id="app-security" eyebrow="/ 06 — App Security" title={<>Are our code, website and <span className="text-gradient">delivery safe?</span></>}>
        <Table head={["Card", "What it checks"]} rows={[
          ["App code — security review", "OWASP ASVS Level 2, item by item"],
          ["App code — automatic tool scan", "Semgrep (code), Gitleaks (secrets), Trivy (container images and libraries)"],
          ["Website — passive baseline scan", "Signed-out OWASP ZAP baseline scan; not a full authenticated, active attack test"],
          ["Website — encryption", "TLS versions, ciphers, certificate and headers (testssl.sh)"],
          ["What the internet can reach", "Every TCP port of the public address, confirmed twice (nmap)"],
          ["Code delivery", "Branch protection, approvals and access on the code repository (Legitify)"],
        ]} />
      </Section>

      <Section tone="light" id="siem" eyebrow="/ 07 — Security monitoring with a SIEM" title={<>Review events across <span className="text-gradient-ink">the monitored layers</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Event coverage —", body: "Review forwarding of application actions, container events, server changes and runtime alerts. Confirm source coverage and timestamps in the receiving SIEM." },
          { title: "Splunk and Wazuh —", body: "Confirm enabled forwarding, licensing and receipt of events for your deployment. Request delivery and retry evidence before relying on either destination." },
          { title: "Change monitoring dashboard", body: "Review available reports and their timestamps; confirm the configured export schedule and retention." },
          { title: "FedRAMP and CIS pages inside the SIEM —", body: "results, proof and evidence packages, readable in the SIEM itself." },
        ]} />
      </Section>

      <Section tone="dark" id="trust-center" eyebrow="/ 08 — Trust Center" title={<>Our posture, <span className="text-gradient">published</span>.</>}>
        <Bullets items={[
          { title: "Public Trust Center —", body: "Read security information and request current policies, the approved provider inventory and dated evidence." },
          { title: "Machine-readable package overview —", body: "Request the package JSON, schema version and validation result for the submission being reviewed." },
          { title: "Secure Configuration Guide —", body: "Request the current approved guide and compare recommended values with the settings enabled in your deployment." },
          { title: "Vulnerability disclosure —", body: "Contact the security team through the Trust Center for the current reporting channel and incident follow-up process." },
        ]} />
        <Callout>
          Assessors do not take our word for it. They open the snapshot, read the proof, run the verifier and see the same result.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
