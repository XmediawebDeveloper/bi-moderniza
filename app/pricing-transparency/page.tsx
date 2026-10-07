import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Transparent AI Modernization Costs — Budget Gates and Tokenomics" },
  description:
    "See the estimated cost before each phase, approve the budget, watch live spend, and get cost per task, per stage and per model.",
};

export default function PricingTransparencyPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Cost & transparency" }]}
        eyebrow="/ Cost control & transparency"
        title={<>Know the cost <span className="text-gradient">before you spend it</span>.</>}
        lede="AI modernization should not be a blank cheque. Moderniza shows you an estimate before each phase, asks for your approval, and records every AI call so you can see exactly where the money went."
        meta={<><span>Budget gates</span><span>·</span><span>Tokenomics</span><span>·</span><span>Agent ledger</span></>}
        rightSlot={<ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="budget-gates" eyebrow="/ 01 — Budget gates" title={<>Nothing past the gate starts <span className="text-gradient-ink">without your decision</span>.</>}>
        <Table tone="light" head={["Gate", "When", "What you decide"]} rows={[
          ["Planning approval", "After the Repo Scan", "Approve the estimated cost of planning before it starts"],
          ["Build budget", "After the Contract", "Set a budget for the build, or continue at full quality"],
        ]} />
        <Prose tone="light"><p>The server enforces both gates. Nothing past the gate starts without your decision.</p></Prose>
      </Section>

      <Section tone="dark" id="tokenomics" eyebrow="/ 02 — Tokenomics" title={<>Every dollar, <span className="text-gradient">explained</span>.</>} lede="The Tokenomics page for each project shows:">
        <Bullets cols={2} items={[
          { title: "Pre-run estimate —", body: "what the run is expected to cost" },
          { title: "Live burn —", body: "what it has cost so far, updated as it runs" },
          { title: "Cost per build task", body: "" },
          { title: "Spend on failed calls —", body: "money spent on AI calls that did not succeed, shown openly" },
          { title: "Cost per million lines of code", body: "" },
          { title: "Token efficiency", body: "" },
          { title: "Savings against list price", body: "" },
          { title: "ROI against an industry COCOMO benchmark", body: "for the same amount of code" },
        ]} />
      </Section>

      <Section tone="light" id="ledger" eyebrow="/ 03 — Model usage and agent ledger" title={<>Call by call, <span className="text-gradient-ink">on the page</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Model usage —", body: "every project, stage and model, with the number of calls, input and output tokens, cache use and cost." },
          { title: "Agent ledger —", body: "a line for every AI call: project, stage, agent, model and cost, with budgets." },
          { title: "Agent board —", body: "every agent’s instructions, report, files, tokens and cost, read from the real records." },
          { title: "Stage banner —", body: "tokens and cost shown on each step as it runs." },
        ]} />
        <Callout tone="light" label="Callout">
          You never have to ask &ldquo;why did this cost so much?&rdquo; The answer is already on the page, call by call.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
