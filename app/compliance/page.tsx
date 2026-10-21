import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "FedRAMP 20x Evidence, CIS Benchmarks and App Security — Moderniza" },
  description:
    "All 46 FedRAMP 20x Key Security Indicators measured on the live platform every six hours, plain-English proof for every result, daily CIS benchmark scans, app security scans and a public Trust Center.",
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

      <Section tone="light" id="fedramp" eyebrow="/ 01 — FedRAMP 20x" title={<>All 46 indicators, <span className="text-gradient-ink">measured live</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Every six hours", body: "the platform measures all 46 FedRAMP 20x Key Security Indicators and saves a snapshot." },
          { title: "Live checks, live tests and code checks.", body: "Each indicator is graded from what the running system shows — settings, records, listening ports, certificates, database rows — plus live tests against the running platform. Code checks are shown for reference." },
          { title: "Graded against FedRAMP's own control list.", body: "A measurement counts only for the indicators FedRAMP lists its control under." },
          { title: "Honest tiers.", body: "An indicator is only as strong as its weakest claim. A claim backed only by source code is labelled as such." },
          { title: "Could not check is never a pass.", body: "Old or missing evidence is shown as “could not check”." },
        ]} />
      </Section>

      <Section tone="dark" id="run-now" eyebrow="/ 02 — Run now — a real re-test" title={<>Press Run now. <span className="text-gradient">Everything behind the result runs again</span>.</>}>
        <Prose>
          <p>Run now does not just re-read old records. It finds the jobs that produce the indicator&rsquo;s evidence, runs them, runs the indicator&rsquo;s live tests, captures fresh proof, and then grades. Records that cannot be re-made on demand are listed with the time they were made and why.</p>
          <p><span className="font-semibold text-chalk">Re-test all 46</span> runs the whole set in one go with a live log on screen — evidence jobs, tests, proof and every indicator&rsquo;s verdict as it happens. Pause it, resume it or stop it. When it finishes it is published as a new snapshot, everywhere a six-hourly snapshot appears.</p>
        </Prose>
      </Section>

      <Section tone="light" id="proof" eyebrow="/ 03 — Proof behind every result" title={<>From plain English <span className="text-gradient-ink">to a verifier</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Plain-English view first.", body: "For each indicator: the question, the answer, what is wrong and what to do — or, for a pass, the evidence that makes it a pass." },
          { title: "One card per measurement —", body: "what we checked, where we looked, the rule, what the test did, what we expected, what we found, the result and why, with the proof file." },
          { title: "What was tested table —", body: "under every run log: what was tested, expected, got and the result, with each test case's steps." },
          { title: "Proof PDF —", body: "one indicator or all of them, with e-mails and server paths masked for sharing." },
          { title: "Evidence package —", body: "one zip with the snapshot, records, proof, run logs, ledgers and a verifier the assessor runs themselves. A masked copy is available for sharing." },
          { title: "JSON evidence —", body: "all 46 in one file and one file per indicator, for every snapshot and live." },
          { title: "Hash-chained ledgers —", body: "every run, snapshot and proof capture is chained; one check proves nothing was changed afterwards." },
        ]} />
      </Section>

      <Section tone="dark" id="policies" eyebrow="/ 04 — Policies — read, then approve" title={<>Approved only <span className="text-gradient">after reading to the end</span>.</>}>
        <Prose>
          <p>The 17 security policy documents can be read in full on the page. The named approving authority can approve a document only after reading it to the end, and signs with a passkey. Every approval is tied to the exact text that was read.</p>
        </Prose>
      </Section>

      <Section tone="light" id="cis" eyebrow="/ 05 — CIS Benchmark — how safe is our setup?" title={<>The whole stack, scanned against <span className="text-gradient-ink">CIS every day</span>.</>}>
        <Table tone="light" head={["Area", "Benchmark", "Scanner"]} rows={[
          ["AWS account", "CIS AWS Foundations", "Prowler"],
          ["Server", "CIS Amazon Linux 2023 Level 1", "OpenSCAP with the SCAP Security Guide"],
          ["Docker containers", "CIS Docker", "docker-bench-security"],
          ["Database (PostgreSQL)", "CIS PostgreSQL", "pgdsat"],
          ["Web server (NGINX)", "CIS NGINX", "Moderniza's own checker"],
        ]} />
        <Bullets tone="light" items={[
          { title: "Daily scans", body: "on the server itself, with the last and next run shown on every card." },
          { title: "Plain words —", body: "each card answers a question, shows “X of Y checks passed”, what is wrong grouped by topic, and what to fix first." },
          { title: "Every check —", body: "filter by failed, passed, needs a person or does not apply, with the rule, what it must be, what was found and how to fix it." },
          { title: "A person confirms —", body: "items a scanner cannot judge are reviewed by a Super Admin, signed with a passkey, valid for 90 days, and marked “look again” if the scan changes." },
          { title: "Accepted exceptions —", body: "a failed check that is an accepted risk can be signed as an exception with a reason and proof. The scanner's result is never changed; the exception is shown beside it and expires." },
          { title: "Does not apply here —", body: "checks that cannot apply on this server are shown with the reason, never hidden." },
          { title: "Evidence for an assessor —", body: "one zip with every area's raw scanner output, the normalised report, every check as CSV, the review ledger and a verifier. A full readable scan report per area." },
        ]} />
      </Section>

      <Section tone="dark" id="app-security" eyebrow="/ 06 — App Security" title={<>Are our code, website and <span className="text-gradient">delivery safe?</span></>}>
        <Table head={["Card", "What it checks"]} rows={[
          ["App code — security review", "OWASP ASVS Level 2, item by item"],
          ["App code — automatic tool scan", "Semgrep (code), Gitleaks (secrets), Trivy (container images and libraries)"],
          ["Website — live attack scan", "OWASP ZAP baseline scan of the live site"],
          ["Website — encryption", "TLS versions, ciphers, certificate and headers (testssl.sh)"],
          ["What the internet can reach", "Every TCP port of the public address, confirmed twice (nmap)"],
          ["Code delivery", "Branch protection, approvals and access on the code repository (Legitify)"],
        ]} />
      </Section>

      <Section tone="light" id="siem" eyebrow="/ 07 — Security monitoring with a SIEM" title={<>Every change on <span className="text-gradient-ink">every layer</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Every change on every layer —", body: "application actions, container events, server changes (logins, sudo, packages, audit rules) and runtime alerts from Falco — reaches the SIEM." },
          { title: "Splunk and Wazuh —", body: "every event goes to both. If one is down, the other keeps receiving and the missed events are sent later." },
          { title: "Change monitoring dashboard", body: "with an hourly PDF kept as evidence." },
          { title: "FedRAMP and CIS pages inside the SIEM —", body: "results, proof and evidence packages, readable in the SIEM itself." },
        ]} />
      </Section>

      <Section tone="dark" id="trust-center" eyebrow="/ 08 — Trust Center" title={<>Our posture, <span className="text-gradient">published</span>.</>}>
        <Bullets items={[
          { title: "Public Trust Center —", body: "security posture, policies, sub-processors, contacts, report dates and change notices." },
          { title: "Machine-readable package overview —", body: "published in FedRAMP's own JSON format and readable by FedRAMP's online validator." },
          { title: "Secure Configuration Guide —", body: "a public page that shows the live value of every security setting next to the recommended value." },
          { title: "Vulnerability disclosure —", body: "a public reporting page and a security.txt file on every door; every report opens an incident that is tracked to closure." },
        ]} />
        <Callout>
          Assessors do not take our word for it. They open the snapshot, read the proof, run the verifier and see the same result.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
