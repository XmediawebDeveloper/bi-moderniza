import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_SCAN_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Epics and User Stories Generated From Your Legacy Code — Moderniza" },
  description:
    "Moderniza turns every legacy screen into a Jira-style user story with Given/When/Then acceptance criteria, roles and screen specs — then carries every story into the contract and the build.",
};

export default function EpicsStoriesPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Epics & stories" }]}
        eyebrow="/ Epics & stories"
        title={<>A ready backlog, built from <span className="text-gradient">the code you already have</span>.</>}
        lede="Before a single line of new code is written, Moderniza gives your team a complete backlog: epics for each business area, a user story for every screen, and acceptance criteria written in Given/When/Then. It is built from your legacy code by rules — not guessed by AI — so every story points back to a real screen, field and rule."
        rightSlot={SHOW_PINK_HEART_SCAN_BOT ? <ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_SCAN_BOT}
      />

      <Section tone="light" id="how-built" eyebrow="/ 01 — How the backlog is built" title={<>Epics from business areas. <span className="text-gradient-ink">Stories from real screens.</span></>}>
        <Bullets tone="light" items={[
          { title: "Epics —", body: <>one for each business area of your application. An area groups a set of screens, the programs those screens call, and the parts that work on the same records. Each epic is named from the old screens’ own headings (for example, &ldquo;DISBURSEMENT - LIST&rdquo; becomes <em>Disbursement</em>).</> },
          { title: "Shared epics —", body: <>work that belongs to no single area is collected in clear shared epics: <em>Scheduled work</em>, <em>Behind-the-scenes work</em> and <em>Common building blocks</em>.</> },
          { title: "Stories —", body: "one for every screen. The story text comes from the old screen itself: its heading, labels, columns and keys. List, view, add, change, remove, form and wizard screens each get a story written for that kind of work." },
          { title: "Roles —", body: "the people who use each story are read from the plan’s endpoints and matched by action (reading, adding, changing, removing). You can name who uses an epic yourself." },
        ]} />
      </Section>

      <Section tone="dark" id="story-contents" eyebrow="/ 02" title={<>What every story <span className="text-gradient">contains</span>.</>}>
        <Table head={["Part", "What you see"]} rows={[
          ["Story key", <>A Jira-style key such as <em>VB-12</em>, made from your app’s initials. Keys are never reused.</>],
          ["User story", "“As a … I want … so that …” in one plain sentence"],
          ["Acceptance criteria", "Up to 12 generated Given/When/Then criteria per story (up to 20 when you write your own)"],
          ["Priority", "Must have or Should have"],
          ["Status", "Planned · Pending review · In the build plan · Not carried"],
          ["Contract badge", "In contract or Not in contract — on every row"],
          ["Screen spec", "The screen’s fields, columns and buttons (primary, secondary, danger) — editable"],
          ["Technical details", "The old program, the new route and component, labels and fields (typed in or required), keys, rules and steps"],
          ["Role rule", "A story limited to certain roles gets its own criterion: “Only these roles can use …”"],
        ]} />
      </Section>

      <Section tone="light" id="in-charge" eyebrow="/ 03" title={<>Your team stays <span className="text-gradient-ink">in charge of the backlog</span>.</>}>
        <Bullets tone="light" cols={2} items={[
          { title: "Add", body: "your own epics and stories." },
          { title: "Edit", body: "any story — title, user story, criteria and priority." },
          { title: "Rewrite with a prompt —", body: "describe the change and the agent drafts a new version for you." },
          { title: "Story and screen stay in step —", body: "edit a story and its screen is redrawn; edit a screen and its story is rewritten." },
          { title: "Undo and redo —", body: "“Put back the original” and “Show my change again”." },
          { title: "Withdraw, never lose —", body: "removed items are marked withdrawn, not deleted." },
          { title: "Link work —", body: "Depends on, Blocks, Related to, Duplicates — with a check that stops circular links." },
          { title: "Filter", body: "by role, search, and switch to a site map view of every screen." },
          { title: "Generate sample UI —", body: "see a mock-up of an epic’s screens before anything is built." },
          { title: "Download the site map", body: "as a PDF." },
        ]} />
      </Section>

      <Section tone="dark" id="to-the-build" eyebrow="/ 04 — From story to contract to code" title={<>Every story travels <span className="text-gradient">all the way to the build</span>.</>}>
        <Bullets items={[
          { title: "Into the contract —", body: "each story’s acceptance criteria become numbered acceptance items in the contract, tied to that story. Each screen story is matched to a contract screen; if none exists, one is added." },
          { title: "Always current —", body: "a story saved after the contract was built is added to it straight away." },
          { title: "Tracked per story —", body: "every story is marked carried, carried as a new screen, or not carried, so you can see exactly what made it into the plan." },
          { title: "Checked in planning —", body: "a build plan that skips any acceptance item is held back until it is covered." },
          { title: "Given to the builders —", body: "the coding agents receive each story and the full text of every acceptance criterion." },
        ]} />
        <Callout>
          Your business analysts get a real backlog on day one — written from the screens your users already know, and wired straight into the build.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
