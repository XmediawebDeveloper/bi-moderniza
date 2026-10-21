import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Platform Monitoring — Live Servers, Uptime, Alerts and Logs | Moderniza" },
  description:
    "One live Monitoring page for every server: charts, containers, databases, conversions, uptime checks, alerts with mute, a metrics explorer and log search — pushed live, no refresh.",
};

export default function OperationsPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform admin" }, { label: "Monitoring & operations" }]}
        eyebrow="/ Monitoring & operations"
        title={<>See everything that runs — <span className="text-gradient">live</span>.</>}
        lede="One Monitoring page shows the health of the platform, the conversions and the apps they produce. Data is pushed to the page as it changes. Nothing to refresh."
        meta={<><span>Twelve tabs</span><span>·</span><span>Uptime</span><span>·</span><span>Alerts</span><span>·</span><span>Logs</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="tabs" eyebrow="/ 01 — One page, twelve tabs" title={<>The whole platform <span className="text-gradient-ink">on one page</span>.</>}>
        <Table tone="light" head={["Tab", "What you see"]} rows={[
          ["Overview", "One “Needs attention” list from every part, and a live server band"],
          ["Server", "CPU, load, memory, swap, disk and network over time"],
          ["Containers", "The busiest containers, one-container drill-down and every container listed"],
          ["Moderniza", "Platform services, background jobs and security checklist"],
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
          <p>Prometheus for metrics history, Grafana for dashboards and alert rules, Uptime Kuma for uptime checks, Wazuh and Splunk for logs. A second monitor on a separate server keeps watching if the main one goes down. Alert mails go to the list you manage on the page.</p>
        </Prose>
      </Section>

      <Section tone="light" bone id="conversions" eyebrow="/ 03 — Conversions that keep going" title={<>Pause, limits, updates — <span className="text-gradient-ink">handled</span>.</>}>
        <Bullets tone="light" items={[
          { title: "Pause means pause.", body: "Every running part of a step stops within seconds and the step is held until you resume." },
          { title: "AI usage limits are handled.", body: "When the AI account reaches its limit, the run is parked and restarts on its own after the reset." },
          { title: "Safe updates.", body: "Platform updates wait for a quiet moment; a step asked to step aside resumes exactly where it stopped." },
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
