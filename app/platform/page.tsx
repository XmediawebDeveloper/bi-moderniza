import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Cards, SubHead, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Moderniza Platform Features — Understand, Plan, Build, Verify, Deliver" },
  description:
    "Repo scan, plain-language blueprint, frozen contract, symbol registry, parallel AI agents, six-gate verification, rule tracing and cost control in one platform.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Features" }]}
        eyebrow="/ Platform features"
        title={<>One platform for the <span className="text-gradient">whole modernization</span>.</>}
        lede="Moderniza covers the full journey — from reading code nobody understands to running the new application in production. Features are grouped by the job they do."
        meta={<><span>Understand</span><span>·</span><span>Plan</span><span>·</span><span>Build</span><span>·</span><span>Verify</span><span>·</span><span>Deliver</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="understand" eyebrow="/ 01 — Understand" title={<>Read the code <span className="text-gradient-ink">nobody understands</span>.</>}>
        <Cards tone="light" cols={2} items={[
          { title: "Repo Scan", body: "Every file is classified by language and role, with an honest support level for each language. You see the shape of your estate in minutes, before any spend on planning.", icon: "analyse" },
          { title: "Legacy Explain", body: "A plain inventory of COBOL programs, JCL jobs, copybooks and screen maps — built by code, not guessed by AI. Ask for a walkthrough of any program, or ask questions about it. The legacy code stays read-only to the AI.", icon: "doc" },
          { title: "Plain-language Blueprint", body: "“Your app today”, “The plan”, “Your screens” and “App flow” explain the system for business owners, not just engineers. Old screens are mapped to new screens.", icon: "blueprint" },
          { title: "Epics & stories backlog", body: "A Jira-style backlog generated from your code: epics, user stories and Given/When/Then acceptance criteria. Add your own items; they flow into the contract.", icon: "flag" },
        ]} />
      </Section>

      <Section tone="dark" id="plan" eyebrow="/ 02 — Plan" title={<>One frozen plan, <span className="text-gradient">no drift</span>.</>}>
        <Cards cols={2} items={[
          { title: "Frozen Contract", body: "The single source of truth for the build: services, APIs, data models, rules, screens, access and tests. Simple and technical views, plus a compare view that shows anything dropped or added.", icon: "blueprint" },
          { title: "Symbol Registry", body: "One locked master list of names and signatures, sealed with a checksum. Generates OpenAPI and DDL. Stops parallel agents from drifting apart.", icon: "shield" },
          { title: "Wave Plan", body: "A dependency graph of every build task, grouped into waves that run in order, with tasks inside a wave running in parallel. The critical path is highlighted.", icon: "chart" },
          { title: "Modernization Dossier", body: "Eight sheets in one place for reviewers: overview, contract, master plan, dependency graph, symbol lock, wave execution, verification and delivery.", icon: "doc" },
        ]} />
      </Section>

      <Section tone="light" id="build" eyebrow="/ 03 — Build" title={<>Parallel agents, <span className="text-gradient-ink">purpose-built handling</span>.</>}>
        <Cards tone="light" cols={2} items={[
          { title: "Parallel AI agents", body: "Specialised agents — architecture, contract, engineering, verification, deployment — each own one step. Engineering agents build tasks in parallel, all against the same locked contract.", icon: "group" },
          { title: "Batch documentation", body: "Every delivery includes a written guide to its scheduled batch jobs.", icon: "clock" },
        ]} />
        <SubHead tone="light">Legacy construct handling</SubHead>
        <Prose tone="light"><p>Purpose-built handling for the parts of legacy systems that generic AI tools miss:</p></Prose>
        <Bullets tone="light" cols={2} items={[
          { title: "CICS —", body: "pseudo-conversational state, COMMAREA, HANDLE AID and BMS screen attributes" },
          { title: "IBM MQ —", body: "queue names resolved and mapped to a modern message broker" },
          { title: "VSAM —", body: "EBCDIC unloads decoded and loaded into PostgreSQL tables" },
          { title: "Copybooks and COMP-3 —", body: "record layouts and packed decimals" },
          { title: "JCL batch —", body: "job graphs turned into Kubernetes CronJob, Argo or Airflow schedules" },
          { title: "Stored procedures —", body: "DB2 SQL PL, Oracle PL/SQL, T-SQL, MySQL and PL/pgSQL" },
          { title: "Embedded SQL —", body: "in COBOL, PL/I, RPG and C, across nine SQL dialects" },
          { title: "Reports —", body: "12 legacy report kinds, including COBOL Report Writer, Easytrieve, SSRS, Jasper, Oracle Reports and SQR" },
          { title: "ETL —", body: "SSIS packages" },
        ]} />
      </Section>

      <Section tone="dark" id="verify" eyebrow="/ 04 — Verify" title={<>Proof, <span className="text-gradient">not promises</span>.</>}>
        <Cards cols={3} items={[
          { title: "Six-gate exit check", body: "Completeness, wiring, navigation, Docker build and start, API smoke, and live tests, with up to 12 automatic repair rounds.", icon: "verify" },
          { title: "Run & Fix", body: "Automatic fixing against the live running stack, with hand-back to earlier steps when a problem belongs there.", icon: "cycle" },
          { title: "Live checks", body: "API pass/fail, screen screenshots, schema and migration checks, mutation testing, traffic replay.", icon: "pulse" },
          { title: "Equivalence view", body: "Old vs new by business category, with the measurement basis on every row.", icon: "chart" },
          { title: "Business-rule tests", body: "Given/When/Then tests generated from priority rules.", icon: "doc" },
        ]} />
      </Section>

      <Section tone="light" id="deliver" eyebrow="/ 05 — Deliver" title={<>From verified code to <span className="text-gradient-ink">production</span>.</>}>
        <Cards tone="light" cols={3} items={[
          { title: "Docker and Kubernetes deployment", body: "Live URL, preview, service status and smoke checks.", icon: "deploy" },
          { title: "Delivery repository", body: "Source code, Jenkinsfile and Kubernetes manifests for AWS and Azure, pushed to Git.", icon: "cloud" },
          { title: "Error tracking", body: "A Sentry project per conversion, wired into the delivered app.", icon: "broken" },
        ]} />
      </Section>

      <Section tone="dark" id="control" eyebrow="/ 06 — Control and insight" title={<>Every dollar and every agent, <span className="text-gradient">on the page</span>.</>}>
        <Cards cols={3} items={[
          { title: "Budget gates", body: "Approve the planning cost; set the build budget.", icon: "money" },
          { title: "Tokenomics", body: "Estimate, live spend, cost per task, ROI.", icon: "chart" },
          { title: "Model usage and agent ledger", body: "Every AI call, by conversion, stage and model.", icon: "doc" },
          { title: "Agent board", body: "Every orchestrator and sub-agent, with its instructions, report, files, tokens and cost.", icon: "group" },
          { title: "Insights", body: "Common problems and lessons learned across conversions, in plain words.", icon: "pulse" },
          { title: "Continuous change tracking", body: "Watches for CVEs, regulation and policy changes, assesses impact, and regenerates only what is affected.", icon: "cycle" },
          { title: "Pause, resume, retry", body: "Stop at any time and continue from the same point.", icon: "clock" },
        ]} />
      </Section>

      <CtaBand />
    </>
  );
}
