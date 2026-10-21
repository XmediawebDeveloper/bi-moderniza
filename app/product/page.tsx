import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_SCAN_BOT } from "../components/ContactRobot";
import { Section, Table, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Moderniza Product Tour — Every Screen in the Platform" },
  description:
    "Everything in Moderniza happens in one web application. Each menu item appears only for people whose permissions include it.",
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Product tour" }]}
        eyebrow="/ Inside the product"
        title={<>A guided tour of <span className="text-gradient">the Moderniza platform</span>.</>}
        lede="Everything in Moderniza happens in one web application. Each menu item appears only for people whose permissions include it."
        rightSlot={SHOW_PINK_HEART_SCAN_BOT ? <ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_SCAN_BOT}
      />

      <Section tone="light" id="engineer" eyebrow="/ 01" title={<>Engineer <span className="text-gradient-ink">workspace</span></>}>
        <Table tone="light" head={["Screen", "What you do there"]} rows={[
          ["Dashboard", "See projects analysed, converted, in progress, deployed and failed, plus recent projects"],
          ["Projects", "Create a project (Git link, folder or archive), open any project you own or that is shared with you, delete with a typed confirmation"],
          ["Project page", "Run the five steps — Blueprint, Contract, Code, Testing, Deploy — with live progress, approvals, the agent board and the cost banner"],
          ["Repo Scan — Simple view", "Your app in plain words, including “Your screens and the old menu”"],
          ["Epics & stories", <>Review and edit the generated backlog inside the Blueprint step</>],
          ["Business Rules", <>Every rule with its source line, owner and proof status; open the <strong>Drools Workbench</strong> to export and compile rules</>],
          ["Live Run", "Watch every running conversion live"],
          ["Language Support", "The live support level for every legacy language"],
          ["My Usage", "Your own AI spend"],
          ["Settings", "Profile, password, two-step sign-in (authenticator app, passkeys, phone fingerprint, recovery codes), signed-in sessions, appearance and my activity"],
          ["Extra pages", "Tokenomics, Model Usage, Insights, Monitoring, FedRAMP 20x, CIS Benchmark and Integrations — when a Super Admin gives them"],
        ]} />
      </Section>

      <Section tone="dark" id="super-admin" eyebrow="/ 02" title={<>Super Admin <span className="text-gradient">dashboard</span></>}>
        <Table head={["Screen", "What you do there"]} rows={[
          ["Overview", "A live summary: running conversions, AI spend, people online, alerts and recent admin actions"],
          ["Users & Roles", "People and service accounts, one side panel per account, sign-in history, security records"],
          ["Feature Switches", "Switch any page, step or button on or off for Engineers, Super Admins or one person"],
          ["Who Has Access", "The monthly access review with a sign-off"],
          ["Security Settings", "The security rules in plain sentences, checked against the written policy"],
          ["All Projects", "Every project, share or transfer it, open a read-only view of any conversion"],
          ["Agent Control", "The “Stop all AI” switch, runs in progress with Stop, and agent limits (off, watch, enforce)"],
          ["Live Run", "Every conversion as it runs"],
          ["Tokenomics · Model Usage", "Spend over time, by model, by project and by step"],
          ["Monitoring", "The live Monitoring page with twelve tabs"],
          ["Event Logs · Audit Log", "Platform logs, and the tamper-evident audit record with a side panel per record"],
          ["Control Status · FedRAMP 20x · CIS Benchmark · App Security", "Compliance results, proof and evidence"],
          ["Integrations · Language Support · My Settings", "Connections, language levels, own settings"],
        ]} />
      </Section>

      <Section tone="light" id="public" eyebrow="/ 03" title={<>Public <span className="text-gradient-ink">pages</span></>}>
        <Table tone="light" head={["Page", "What it is"]} rows={[
          [<Link key="tc" href="/trust-center" className="underline underline-offset-4">Trust Center</Link>, "Our published security posture, policies and change notices"],
          ["Secure Configuration Guide", "The live value of every security setting next to the recommended value"],
          ["Report a vulnerability", "A page for security researchers to report issues"],
        ]} />
      </Section>

      <CtaBand />
    </>
  );
}
