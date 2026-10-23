import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Platform Monitoring — Live Servers, Uptime, Alerts and Logs | Moderniza" },
  description:
    "Explore monitoring for each Moderniza server: services, containers, databases, conversions, uptime, alerts and logs. Confirm update timing and alert routing for your deployment.",
};

export default function OperationsPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform admin" }, { label: "Monitoring & operations" }]}
        eyebrow="/ Monitoring & operations"
        title={<>See everything that runs — <span className="text-gradient">live</span>.</>}
        lede="Each Moderniza server has its own Monitoring page for platform health, conversions and generated apps. Review data timestamps and unavailable sources alongside the reported status."
        meta={<><span>Platform monitoring</span><span>·</span><span>Uptime</span><span>·</span><span>Alerts</span><span>·</span><span>Logs</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="tabs" eyebrow="/ 01 — Monitoring coverage" title={<>The whole platform <span className="text-gradient-ink">on one page</span>.</>}>
        <Table tone="light" head={["Area", "What you see"]} rows={[
          ["Overview", "One “Needs attention” list from every part, and a live server band"],
          ["Server", "CPU, load, memory, swap, disk and network over time"],
          ["Containers", "Container status and per-container detail; check the last update and whether the data source is responding"],
          ["Moderniza", "Service board for platform services, background jobs and security checks; review each service's reported health"],
          ["Databases", "Connections, sizes and activity for the main and app databases"],
          ["Conversions", "Every conversion — running, stopped, paused, waiting or finished — with time per stage, AI cost and its app containers"],
          ["Uptime", "Every uptime check, its timeline and down stretches linked to the logs"],
          ["Alerts", "Alerts firing, rules, mute for 30 minutes to 7 days, history and who gets the mails"],
          ["Explore", "Build a metric chart by picking a metric, function and filters"],
          ["Logs", "Search the logs with a histogram and top sources"],
          ["Compliance", "FedRAMP 20x and CIS results for the chosen server"],
          ["Version", "What is running, with links to the deeper tools"],
        ]} />
        <Bullets tone="light" items={[
          { title: "Each server watches itself —", body: "every Moderniza server has its own Monitoring page, and a time picker (5 minutes to 30 days, or your own dates) drives every chart. A shareable link keeps the tab, range and picks." },
          { title: "Charts you can work with —", body: "drag to zoom, see alert and restart markers, click a moment to see that minute's logs, export CSV or PNG." },
          { title: "“No data” instead of a zero —", body: "a source that does not answer is shown as not answering." },
        ]} />
      </Section>

      <Section tone="dark" id="tools" eyebrow="/ 02 — Built on proven open tools" title={<>Metrics, dashboards, uptime <span className="text-gradient">and logs</span>.</>}>
        <Prose>
          <p>The documented monitoring stack uses Prometheus for metrics, Grafana for dashboards and alerts, Uptime Kuma for uptime checks, and Wazuh and Splunk for logs. Confirm which services are enabled, their update intervals and any independent monitoring coverage for your deployment.</p>
          <p>Review each alert&rsquo;s urgency category, rule, state and notification recipients. Confirm the configured categories and delivery to the intended recipients with a test alert; a recipient list alone does not prove delivery.</p>
        </Prose>
      </Section>

      <Section tone="light" bone id="conversions" eyebrow="/ 03 — Conversion controls" title={<>Pause, limits, updates — <span className="text-gradient-ink">review the run status</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Pause status.", body: "Review the running step and its saved checkpoint before pausing or resuming. Confirm that agents, builds and tests have stopped before maintenance." },
          { title: "AI usage limits.", body: "Review provider limits and run status before retrying. Automatic recovery behavior requires confirmation for the configured provider." },
          { title: "Safe updates.", body: "Coordinate updates with running conversions. Confirm checkpoint and resume behavior for the affected step before restarting." },
          { title: "Long fixes are judged by progress, not a clock.", body: "A fix agent that is still making progress keeps going; one that goes silent is stopped." },
        ]} />
        <Callout tone="light">
          Operations teams get one screen for the whole platform — and evidence that it is watched.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
