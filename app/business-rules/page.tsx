import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Business Rule Extraction and Traceability — Moderniza" },
  description:
    "Every business rule found by code, explained by AI, checked against its source line, owned in the new code, and tested. Export to Drools, Markdown or CSV.",
};

export default function BusinessRulesPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Business rules" }]}
        eyebrow="/ Business rules"
        title={<>Every business rule, <span className="text-gradient">traced to its source line</span>.</>}
        lede="The biggest risk in any modernization is the rule nobody knew about. Moderniza finds rules with code first, uses AI only to explain them, and then checks every AI answer against the original source. Rules are not just documented — they are carried into the new code and proven."
        meta={<><span>Found by code</span><span>·</span><span>Explained by AI</span><span>·</span><span>Checked by code</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="found" eyebrow="/ Part 1 — How rules are found" title={<>Code finds them. AI explains them. <span className="text-gradient-ink">Code checks the AI.</span></>}>
        <Bullets tone="light" numbered items={[
          { title: "Find every candidate.", body: "Code — not AI — walks your source and lists every line that could hold a rule: conditions, calculations, validations, limits." },
          { title: "Explain each one.", body: "AI reads one function at a time, with line numbers, and explains the rule in plain English." },
          { title: "Check the quote.", body: "Code confirms that the lines the AI cited really exist, in that file, at those lines." },
          { title: "Check the claim.", body: "The legacy source is searched again to catch rules the AI may have made up." },
          { title: "Flag dead code.", body: "Rules that sit in code nothing calls are marked, so you do not rebuild logic nobody uses." },
          { title: "Join the pieces.", body: "Duplicates are merged. Rules spread across several files, or across the states of a workflow, are linked into one chain." },
        ]} />
        <Prose tone="light"><p>Database schema rules (keys, constraints, defaults) are read directly from SQL definitions, with no AI involved.</p></Prose>
      </Section>

      <Section tone="dark" id="new-code" eyebrow="/ Part 2 — How rules reach the new code" title={<>One rule. One owner. <span className="text-gradient">Proof required.</span></>}>
        <Bullets numbered items={[
          { title: "One owner per rule —", body: "each rule is assigned to exactly one task in the new code, so it is neither lost nor built twice." },
          { title: "Marked in the code —", body: "the agent must label the rule in the code it writes." },
          { title: "Checked for proof —", body: "the platform checks where the code lives, finds the rule’s label, and has a reviewer model judge it. Each rule gets a clear status, such as Confirmed or Claimed without proof." },
          { title: "Turned into tests —", body: "priority rules become Given/When/Then tests that run against the new application." },
          { title: "Enforced at runtime —", body: "the running app is checked to confirm it applies the contract’s rules." },
        ]} />
      </Section>

      <Section tone="light" id="export" eyebrow="/ Part 3 — Review and export" title={<>Rules your business and your auditors <span className="text-gradient-ink">can read</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Business Rules page —", body: "every rule with its plain-English meaning, source file and line, owner task and proof status." },
          { title: "Business Logic view —", body: "the same rules grouped by type of decision, for business reviewers." },
          { title: "Rules document —", body: "export to Markdown or CSV, with source file and line for every rule." },
          { title: "Drools Workbench —", body: "export rules as a Drools rule bundle (.drl). Rule conditions are translated from the cited source lines and the bundle is compiled for real. Any rule that cannot be translated is clearly marked — never hidden or faked." },
        ]} />
        <Callout tone="light">
          A rewrite that drops one interest-rounding rule can cost more than the whole project saved. Moderniza makes every rule visible, owned and tested — so you can sign off with evidence, not hope.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
