import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "How Moderniza Verifies Modernized Code — Gates, Tests, Equivalence" },
  description:
    "Six exit gates, live API and screen checks, mutation testing, traffic replay and an honest old-vs-new equivalence report.",
};

export default function VerificationPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Verification" }]}
        eyebrow="/ Verification & quality"
        title={<>Proof, <span className="text-gradient">not promises</span>.</>}
        lede="Code that compiles is not code that works. Moderniza starts the new application for real and checks it from every side before it is released. And it is honest about the result: what was measured, how it was measured, and what was not."
        meta={<><span>5 layers of checks</span><span>·</span><span>6 exit gates</span><span>·</span><span>Up to 12 repair rounds</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="planning" eyebrow="/ Layer 1 — Checks during planning" title={<>Nothing is dropped <span className="text-gradient-ink">before the build</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Source coverage —", body: "the blueprint must account for the full source inventory." },
          { title: "Field fidelity —", body: "every field found in the legacy code is carried into the plan." },
          { title: "Logic fidelity —", body: "the logic found in the legacy code is carried into the plan." },
          { title: "Contract compare —", body: "anything dropped or added between blueprint and contract is shown." },
          { title: "Type fidelity —", body: "lost dropdown values or fields are flagged." },
        ]} />
      </Section>

      <Section tone="dark" id="gates" eyebrow="/ Layer 2 — The six-gate exit check" title={<>Code cannot leave the build step <span className="text-gradient">until it passes</span>.</>}>
        <Table head={["#", "Gate", "Passes when"]} rows={[
          ["1", "Completeness", "Every planned part of the application exists"],
          ["2", "Static wiring", "Imports, routes and calls connect correctly"],
          ["3", "Navigation", "Every screen can be reached"],
          ["4", "Build and start", "The stack builds in Docker, starts, and passes health and smoke checks"],
          ["5", "API smoke", "Every read endpoint in the OpenAPI spec answers without a server error"],
          ["6", "Generated tests", "The app’s own tests pass against the live stack"],
        ]} />
        <Prose>
          <p>A deploy-parity gate is added when it can be measured. Failed gates are diagnosed and repaired automatically — up to 12 rounds, scaled to project size. The loop stops early when repairs stop making progress, and reports why.</p>
        </Prose>
      </Section>

      <Section tone="light" id="live" eyebrow="/ Layer 3 — Live testing" title={<>Started for real, <span className="text-gradient-ink">checked from every side</span>.</>}>
        <Bullets tone="light" cols={2} items={[
          { body: "Every API called and marked pass or fail" },
          { body: "Every screen opened in a real browser and screenshotted" },
          { body: "Schema and migrations compared with the contract" },
          { body: "Mutation testing to prove the tests catch real bugs" },
          { body: "Traffic replay to compare behaviour" },
          { body: "Runtime smoke checks" },
          { body: "Business-rule tests in Given/When/Then form" },
        ]} />
        <Prose tone="light"><p>Run & Fix repairs problems against the live stack. Findings that belong to an earlier step are handed back and tracked until closed.</p></Prose>
      </Section>

      <Section tone="dark" id="equivalence" eyebrow="/ Layer 4 — Old vs new equivalence" title={<>An equivalence report that <span className="text-gradient">tells the truth</span>.</>}>
        <Prose>
          <p>The equivalence view compares old and new across seven business categories: screens, workflows, rules, validations, entities, fields and interfaces. Every row shows how it was measured — from code or from the plan. Anything not measured is shown as unmeasured, never as 100%.</p>
        </Prose>
      </Section>

      <Section tone="light" id="go-live" eyebrow="/ Layer 5 — Before go-live" title={<>Gates that <span className="text-gradient-ink">fail closed</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Pre-deploy gates fail closed —", body: "a gate can only be skipped by naming it explicitly." },
          { title: "After deploy —", body: "service status, UI and API smoke checks, runtime errors and code-quality results." },
        ]} />
        <Callout tone="light" label="Callout">
          Most tools report a single &ldquo;accuracy&rdquo; number. Moderniza shows you the evidence behind every number — and marks what it could not check.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
