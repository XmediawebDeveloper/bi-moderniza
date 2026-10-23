import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Cards, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Responsible AI Governance for Code Modernization — Moderniza" },
  description:
    "A one-switch AI kill switch, agents fenced away from what they must not touch, risky-action limits, and a ledger of every AI call.",
};

export default function AiGovernancePage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Security", href: "/security" }, { label: "AI governance" }]}
        eyebrow="/ AI governance"
        title={<>AI you can stop, <span className="text-gradient">watch and limit</span>.</>}
        lede="Moderniza uses AI agents to do the heavy lifting. That only works if you stay in control of them. Every agent works inside fences, every call is recorded, and one switch stops them all."
        meta={<><span>Kill switch</span><span>·</span><span>Agent fence</span><span>·</span><span>Agent limits</span><span>·</span><span>AI ledger</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="kill-switch" eyebrow="/ 01 — Stop all AI" title={<>One <span className="text-gradient-ink">switch</span>.</>}>
        <Prose tone="light">
          <p>Admins can halt every AI call across the platform at once — in the web app and in every background worker. Turning it on or off needs a fresh passkey, and every change is audited. If the switch&rsquo;s state cannot be read, AI stays off. It fails safe.</p>
        </Prose>
      </Section>

      <Section tone="dark" id="fence" eyebrow="/ 02 — Agents are fenced in" title={<>Checked before <span className="text-gradient">every action</span>.</>}>
        <Prose>
          <p>Before every action an agent takes, a check blocks it from touching the platform&rsquo;s own code or any other customer&rsquo;s project. If the fence&rsquo;s settings are missing, the action is refused.</p>
        </Prose>
      </Section>

      <Section tone="light" id="limits" eyebrow="/ 03 — Limits on risky actions" title={<>Actions an AI agent should <span className="text-gradient-ink">never take on its own</span>.</>} lede="Rules cover the actions an AI agent should never take on its own:">
        <Bullets tone="light" cols={2} items={[
          { body: "admin (sudo) commands and remote shells" },
          { body: "force-pushing over Git history" },
          { body: "uploading to unknown outside hosts" },
          { body: "reading secrets" },
          { body: "tampering with the kill switch" },
          { body: "escaping its container or writing outside its work folder" },
        ]} />
        <Prose tone="light">
          <p>Run the limits in watch mode (the default) to see what would be blocked, or switch on enforce mode to block it. When a run is stopped, a sealed evidence snapshot is saved.</p>
        </Prose>
      </Section>

      <Section tone="dark" id="legacy-code" eyebrow="/ 04 — Your legacy code is protected" title={<>Read-only, treated as data, <span className="text-gradient">approved hosts only</span>.</>}>
        <Cards cols={3} items={[
          { title: "Read-only", body: "During analysis the legacy code is read-only to the AI.", icon: "shield" },
          { title: "Treated as data", body: "Legacy source sent to the AI is marked as data, not instructions, to resist prompt injection.", icon: "doc" },
          { title: "Approved hosts only", body: "Source code is sent only to approved AI endpoints.", icon: "cloud" },
        ]} />
      </Section>

      <Section tone="light" id="stop" eyebrow="/ 05 — Pause and recovery" title={<>Review status <span className="text-gradient-ink">before resuming</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Pause status —", body: "review agent, build and test status to confirm the step has stopped before maintenance." },
          { title: "Usage limits handled honestly —", body: "review provider limits and run status before retrying; confirm automatic recovery behavior for the configured provider." },
          { title: "Judged by progress —", body: "a fix agent keeps working while it makes progress and is stopped when it goes silent; every other agent has a fixed time limit." },
          { title: "Your source is sealed —", body: "a fingerprint of the original source is checked in Testing and before Deploy." },
        ]} />
      </Section>

      <Section tone="dark" id="ledger" eyebrow="/ 06 — Every call recorded" title={<>Project, stage, agent, model, <span className="text-gradient">tokens and cost</span>.</>}>
        <Prose>
          <p>Every AI call is logged with project, stage, agent, model, tokens and cost. Review it in the agent ledger, model usage and agent board pages.</p>
        </Prose>
      </Section>

      <Section tone="light" id="ai-route" eyebrow="/ 07 — Choice of AI route" title={<>Choose where <span className="text-gradient-ink">AI traffic goes</span>.</>}>
        <Prose tone="light"><p>Provider names and configuration options do not establish active use. Request the approved provider inventory, model-call records, processing locations and data flows for your deployment, including any intermediary and downstream model host.</p></Prose>
        <Cards tone="light" cols={2} items={[
          { title: "Anthropic Claude", body: "Confirm availability, enabled models and the data received in your deployment.", icon: "bolt" },
          { title: "AWS Bedrock in GovCloud", body: "Confirm availability, routing and processing boundaries for your deployment.", icon: "cloud" },
        ]} />
      </Section>

      <CtaBand />
    </>
  );
}
