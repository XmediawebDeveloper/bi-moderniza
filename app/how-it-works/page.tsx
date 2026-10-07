import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import { Section, Bullets, Table, Cards, SubHead, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "How Moderniza Works — Blueprint, Contract, Code, Testing, Deploy" },
  description:
    "A fixed, checked five-step process that turns legacy code into a verified, running application, with human approval at every cost decision.",
};

const FLOW = [
  { no: "0", label: "Bring your code", gate: "" },
  { no: "1", label: "Blueprint", gate: "Approval gate · planning cost" },
  { no: "2", label: "Contract", gate: "Approval gate · build budget" },
  { no: "3", label: "Code", gate: "Automatic · six-gate exit check" },
  { no: "4", label: "Testing", gate: "Automatic · hand-back loop" },
  { no: "5", label: "Deploy", gate: "Pre-deploy gates fail closed" },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "How it works" }]}
        eyebrow="/ Moderniza process"
        title={<>A process you can follow, <span className="text-gradient">check and control</span>.</>}
        lede="Moderniza follows the same five steps for every project. Each step has a clear output you can review. Each step is checked before the next one starts. And you decide when the next one starts."
        meta={<><span>5 steps</span><span>·</span><span>2 approval gates</span><span>·</span><span>1 hand-back loop</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {/* Process graphic */}
      <section className="relative bg-ink border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 sec-pad-sm">
          <Reveal className="type-eyebrow text-glow">
            Moderniza process · 5 steps, 2 approval gates, 1 hand-back loop
          </Reveal>
          <ol className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {FLOW.map((f, i) => (
              <Reveal key={f.no} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="relative rounded-2xl border border-white/10 bg-graphite/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="type-eyebrow text-glow">STEP {f.no}</span>
                  {i < FLOW.length - 1 && <span aria-hidden className="text-glow/60 hidden lg:inline">→</span>}
                </div>
                <p className="mt-2 type-h4">{f.label}</p>
                {f.gate && <p className="mt-1 type-small text-mist">{f.gate}</p>}
              </Reveal>
            ))}
          </ol>
          <Reveal delay={2} className="mt-5 type-body text-mist">
            Two approval gates up front, automatic gates in the middle, and a hand-back loop so Testing findings return to the step that owns them.
          </Reveal>
        </div>
      </section>

      {/* Step 0 */}
      <Section tone="light" eyebrow="/ Step 0 — Bring your code" title={<>Start with the code <span className="text-gradient-ink">you have</span>.</>} lede="Connect your application in one of three ways:">
        <Bullets tone="light" items={[
          { title: "Git repository URL —", body: "paste the link to your repository and Moderniza clones it." },
          { title: "Folder upload —", body: "upload a project folder; the full folder structure is kept." },
          { title: "Archive upload —", body: "upload a .zip, .war or .ear file." },
        ]} />
        <SubHead tone="light">Then choose the kind of modernization:</SubHead>
        <Cards tone="light" cols={2} items={[
          { title: "Full modernization", body: "Move the application to a new technology stack.", icon: "convert" },
          { title: "Pipeline modernization", body: "Keep the code as it is and give it a modern CI/CD pipeline. Four steps: Read, Choose, Write & check, Push & run.", icon: "cycle" },
        ]} />
      </Section>

      {/* Step 1 */}
      <Section tone="dark" eyebrow="/ Step 1 — Blueprint: understand what you have" title={<>See your application clearly — <span className="text-gradient">maybe for the first time</span>.</>}>
        <Bullets numbered items={[
          { title: "Repo Scan.", body: "Every file is read and classified by language and role. Each language gets an honest support level: full, supported or detected. Nothing is skipped silently." },
          { title: "Approve planning.", body: "You see an estimated cost for the planning phase and approve it before any planning starts." },
          { title: "Choose your target stack.", body: "Pick the backend language and framework, frontend framework, database, and monolith or microservices. The blueprint waits until you choose." },
          { title: "The Blueprint.", body: "Moderniza explains your application in plain words, in five views:" },
        ]} />
        <Table head={["View", "What you see"]} rows={[
          ["Your app today", "What the old system does, including its batch job schedules"],
          ["The plan", "How the new app will be built, with a map from old screens to new screens"],
          ["Your screens", "Every feature with its screens, fields, buttons, endpoints and rules"],
          ["App flow", "How users move through the application"],
          ["Epics & stories", "A ready backlog: epics, “As a…” user stories and Given/When/Then acceptance criteria. Add your own epics, stories and links."],
        ]} />
        <Prose>
          <p><strong className="text-chalk">Built-in checks:</strong> the blueprint must cover the full source inventory and pass field-fidelity and logic-fidelity checks before it is accepted.</p>
          <p><strong className="text-chalk">You get:</strong> a plain-language description of your current system and a ready-made backlog — valuable even before a line of new code exists.</p>
        </Prose>
      </Section>

      {/* Step 2 */}
      <Section tone="light" eyebrow="/ Step 2 — Contract: freeze the plan" title={<>One frozen specification that <span className="text-gradient-ink">every agent must follow</span>.</>}
        lede="The blueprint becomes a Contract: a frozen specification of every service, API, data model, business rule, screen, access rule and final test. It is the single source of truth for the build.">
        <Bullets tone="light" items={[
          { title: "Simple view —", body: "service by service, in plain words, with a “Needs attention” list of gaps to resolve." },
          { title: "Technical view —", body: "overview, user flow, a three-level deep dive, services, APIs, data models and the full report." },
          { title: "Compare view —", body: "exactly what changed between blueprint and contract. Nothing is silently dropped." },
          { title: "Inputs panel —", body: "what went into this contract." },
          { title: "Type fidelity —", body: "flags dropdown values or fields that would be lost." },
        ]} />
        <SubHead tone="light">The Symbol Registry</SubHead>
        <Prose tone="light">
          <p>Every name and signature in the contract is locked in one master list, sealed with a checksum. Parallel agents cannot invent their own names or drift apart. OpenAPI and database schema (DDL) files are generated from it.</p>
        </Prose>
        <SubHead tone="light">Your decisions here</SubHead>
        <Bullets tone="light" items={[
          { title: "Delivery pipeline —", body: "choose your repository platform, CI/CD provider and security scans." },
          { title: "Build budget —", body: "set a budget, or continue at full quality." },
        ]} />
      </Section>

      {/* Step 3 */}
      <Section tone="dark" eyebrow="/ Step 3 — Code: build in parallel waves" title={<>Many agents, one plan, <span className="text-gradient">no drift</span>.</>}
        lede="The contract is split into tasks. A wave plan orders them by dependency: waves run one after another, tasks inside a wave run in parallel, and the critical path is highlighted. AI agents build each task against the locked contract. After each wave, imports and wiring are checked so problems are caught early, not at the end.">
        <SubHead>The six-gate exit check</SubHead>
        <Prose><p>Code cannot leave this step until it passes, in order:</p></Prose>
        <Bullets numbered cols={2} items={[
          { title: "Completeness —", body: "every planned part exists." },
          { title: "Static wiring —", body: "the parts connect correctly." },
          { title: "Navigation —", body: "every screen can be reached." },
          { title: "Build and start —", body: "the stack builds in Docker, starts, and passes health and smoke checks." },
          { title: "API smoke —", body: "every read endpoint in the OpenAPI spec answers without a server error." },
          { title: "Generated tests —", body: "the application’s own tests pass against the live stack." },
        ]} />
        <Prose>
          <p>When a gate fails, Moderniza diagnoses the cause and repairs it — up to 12 repair rounds, scaled to project size. If repairs stop making progress, or the same cause appears twice, it stops and tells you. It does not loop forever or hide the failure.</p>
        </Prose>
      </Section>

      {/* Step 4 */}
      <Section tone="light" eyebrow="/ Step 4 — Testing: prove it works" title={<>Run it for real. Check everything. <span className="text-gradient-ink">Fix what breaks.</span></>} lede="The new application is started and tested live:">
        <Bullets tone="light" cols={2} items={[
          { title: "API checks —", body: "every contract API is called and marked pass or fail." },
          { title: "Screen checks —", body: "every screen is opened in a real browser and screenshotted." },
          { title: "Schema checks —", body: "the database schema and migrations are compared with the contract." },
          { title: "Mutation testing —", body: "small faults are injected to prove the tests can catch bugs." },
          { title: "Behaviour parity —", body: "traffic is replayed to compare behaviour." },
          { title: "Business-rule tests —", body: "priority rules run as Given/When/Then tests." },
        ]} />
        <Cards tone="light" cols={3} items={[
          { title: "Run & Fix", body: "Problems are fixed automatically in a loop against the live stack. Issues that belong to an earlier step are sent back to that step and tracked — sent, received, closed — so nothing falls through the gap.", icon: "cycle" },
          { title: "Old vs new", body: "The equivalence view compares screens, workflows, rules, validations, entities, fields and interfaces. Every row shows how it was measured. Anything not measured is labelled unmeasured.", icon: "chart" },
          { title: "Code Report", body: "A final report closes the step.", icon: "doc" },
        ]} />
      </Section>

      {/* Step 5 */}
      <Section tone="dark" eyebrow="/ Step 5 — Deploy: go live" title={<>From verified code to a <span className="text-gradient">running application</span>.</>}>
        <Bullets items={[
          { title: "Docker Compose (default) —", body: "deployed with a live URL and in-page preview." },
          { title: "Kubernetes —", body: "build, load or push images, apply, roll out, then a measured reachability check." },
          { title: "Delivery repository —", body: "a Jenkinsfile and Kubernetes manifests for AWS (ECR/EKS) and Azure (ACR/AKS), pushed to your Git repository." },
          { title: "After go-live —", body: "service status, UI and API smoke checks, runtime errors through Sentry, and code-quality results." },
        ]} />
        <Prose><p>Pre-deploy gates fail closed. A gate can only be skipped by naming it explicitly. There is no silent bypass.</p></Prose>
      </Section>

      {/* Control */}
      <Section tone="light" bone eyebrow="/ Control" title={<>You stay in control <span className="text-gradient-ink">at every step</span>.</>}>
        <Cards tone="light" cols={4} items={[
          { title: "Manual, hybrid or automatic", body: "Press a button for each step, or let the run flow on its own.", icon: "gear" },
          { title: "Pause and resume", body: "Pause stops the agents at once. Resume continues from the saved state of the current step, not from the beginning.", icon: "clock" },
          { title: "Watch it live", body: "The live console, the agents’ browser, the running app, and every agent’s instructions, files, tokens and cost.", icon: "pulse" },
          { title: "Automatic retry", body: "If the AI provider’s usage window closes, the run waits and retries on its own.", icon: "cycle" },
        ]} />
      </Section>

      <CtaBand />
    </>
  );
}
