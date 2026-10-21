import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Team Control for AI Modernization — Roles, Feature Switches, Access Reviews | Moderniza" },
  description:
    "Two clear roles, power that switches on with a passkey and runs out on its own, a switch for every page and step, project sharing, a monthly signed access review and a live Super Admin dashboard.",
};

export default function TeamControlPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform admin" }, { label: "Admin & team control" }]}
        eyebrow="/ Admin & team control"
        title={<>Run the platform the way <span className="text-gradient">your organisation works</span>.</>}
        lede="Moderniza separates the people who do the work from the people who govern it. Engineers run conversions. Super Admins manage accounts, switch features on or off, and approve — but they never run a conversion themselves. Every change they make is recorded."
        meta={<><span>Two roles</span><span>·</span><span>Feature switches</span><span>·</span><span>Monthly access review</span><span>·</span><span>Super Admin dashboard</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="roles" eyebrow="/ 01 — Two roles, two dashboards" title={<>Engineers do the work. <span className="text-gradient-ink">Super Admins govern it</span>.</>}>
        <Table tone="light" head={["", "Engineer", "Super Admin"]} rows={[
          ["Signs in to", "The Engineer workspace", "The Super Admin dashboard"],
          ["Does", "Creates projects, uploads code, runs the steps, edits the backlog", "Manages accounts, feature switches, projects, AI control, compliance and monitoring"],
          ["Sees", "Their own projects and the projects shared with them", "Every project, read-only"],
          ["Cannot", "Open admin pages unless a Super Admin gives them", "Start, run or upload a conversion — Super Admins manage and approve"],
        ]} />
        <Prose tone="light">
          <p>Both use the same sign-in page. Each lands on its own dashboard automatically.</p>
        </Prose>
      </Section>

      <Section tone="dark" id="super-admin-power" eyebrow="/ 02 — Super Admin power" title={<>Power that switches on — <span className="text-gradient">and off — by itself</span>.</>}>
        <Bullets items={[
          { title: "Off by default.", body: "A Super Admin account starts every session without admin power." },
          { title: "Turn it on with a passkey.", body: "Opening any admin page asks for a passkey and a reason. No password-only path." },
          { title: "Runs out on its own.", body: "A live countdown on every admin page shows the time left — green, then amber, then red. The longest grant is set by your security policy." },
          { title: "Dropping it needs the passkey too.", body: "So does every sensitive change made while it is on." },
          { title: "Every grant is audited —", body: "who, when, why and for how long." },
        ]} />
      </Section>

      <Section tone="light" id="feature-switches" eyebrow="/ 03 — Feature switches" title={<>A switch for every page, <span className="text-gradient-ink">step and button</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Feature Switches page", body: "with two tabs: one for the Engineer dashboard and one for the Super Admin dashboard. A change on one never touches the other." },
          { title: "Switch off", body: "a menu page, a pipeline step or an action (for example project delete) for a role or for one person." },
          { title: "Extra pages for Engineers —", body: "Tokenomics, Model Usage, Insights, Monitoring, FedRAMP 20x, CIS Benchmark and Integrations can be given to Engineers one by one. They are off until you give them." },
          { title: "A live preview", body: "shows the menu each role will see." },
          { title: "Switched-off is enforced by the server,", body: "not just hidden in the menu, and every refusal is audited." },
          { title: "Full change history", body: "of every switch." },
        ]} />
      </Section>

      <Section tone="dark" id="projects" eyebrow="/ 04 — Projects and people" title={<>Share, transfer, <span className="text-gradient">delete cleanly</span>.</>}>
        <Bullets items={[
          { title: "Share a project", body: "with a colleague to view it or to run it." },
          { title: "Transfer projects", body: "from one owner to another in one step — projects, conversions and settings move together." },
          { title: "Delete removes everything —", body: "the project's records, files, the generated app's containers, storage volumes, images and databases. Nothing is left running behind." },
        ]} />
      </Section>

      <Section tone="light" id="accounts" eyebrow="/ 05 — Accounts done properly" title={<>Every account, <span className="text-gradient-ink">in one side panel</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Users & roles —", body: "people and service accounts on separate tabs, a clear row per account, and a side panel with everything about one account: what it can open, its sign-in methods, live sessions, recent sign-ins, projects owned and shared." },
          { title: "Add account", body: "in three steps — who, role, permissions. New people must set their own password at their first sign-in." },
          { title: "Sign-in history", body: "per person, with the option to sign out one session or all of them." },
          { title: "Security records", body: "for each person — employee or contractor, maintenance rights, and security training duties." },
          { title: "Service accounts", body: "for scripts and scheduled jobs. They cannot sign in as a person and can never become Super Admin." },
        ]} />
      </Section>

      <Section tone="dark" id="who-has-access" eyebrow="/ 06 — Who has access — the monthly key check" title={<>Every account is a key. <span className="text-gradient">Check them every month</span>.</>}>
        <Prose>
          <p>A daily job looks for problems: accounts unused for too long, people without two-step sign-in, leftover rights. The Who Has Access page lists what needs fixing, shows every person and service account, the Super Admin power used, and the accounts disabled in the last 30 days. Once a month a Super Admin signs off that the list is right. The sign-off is recorded in the audit log.</p>
        </Prose>
      </Section>

      <Section tone="light" id="security-settings" eyebrow="/ 07 — Security settings at a glance" title={<>The rules in <span className="text-gradient-ink">plain sentences</span>.</>}>
        <Prose tone="light">
          <p>One read-only page lists the security rules the platform follows today in plain sentences — sign-out after idle, how often to sign in again, password length, lock-out after wrong passwords, two-step for everyone — and checks every number against your written security policy. Anything that could be safer is listed first.</p>
        </Prose>
      </Section>

      <Section tone="dark" id="every-person" eyebrow="/ 08 — For every person" title={<>Your own sign-in, <span className="text-gradient">activity and spend</span>.</>}>
        <Bullets items={[
          { title: "Two-step sign-in tab —", body: "authenticator app, passkeys and phone fingerprint in one place, with a protection meter and recovery codes left." },
          { title: "Switch passkeys or phone fingerprint off and on", body: "without losing the keys." },
          { title: "My activity —", body: "your own audit record." },
          { title: "My usage —", body: "your own AI spend." },
          { title: "Appearance —", body: "light or dark theme, highlight colour, text size, spacing, reduced motion and date format." },
        ]} />
      </Section>

      <Section tone="light" bone id="overview" eyebrow="/ 09 — Super Admin Overview" title={<>A live <span className="text-gradient-ink">home page</span>.</>}>
        <Prose tone="light">
          <p>A live home page: conversions running now, AI spend today and over 7 days, people signed in, failed sign-ins, stuck runs, AI kill-switch state, accounts by role and the latest admin actions. It updates itself — no refresh button.</p>
        </Prose>
        <Callout tone="light">
          Clear roles, power that expires, and a signed monthly review — the controls an auditor asks for, built into the product your team uses every day.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
