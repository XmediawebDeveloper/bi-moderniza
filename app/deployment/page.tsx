import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_CONTACT_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Deploy Moderniza Your Way — SaaS, Self-Hosted, Air-Gapped, GovCloud" },
  description:
    "Review Moderniza hosting and delivery options, including SaaS, self-hosted and air-gapped deployments, and discuss GovCloud AI requirements.",
};

export default function DeploymentPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Deployment & integrations" }]}
        eyebrow="/ Deployment & integrations"
        title={<>Run Moderniza where <span className="text-gradient">your code must stay</span>.</>}
        lede="Review single-tenant SaaS, self-hosted and air-gapped options, discuss GovCloud AI requirements, and confirm the delivery toolchain for your deployment."
        meta={<><span>SaaS</span><span>·</span><span>Self-hosted</span><span>·</span><span>Air-gapped</span><span>·</span><span>GovCloud AI</span></>}
        rightSlot={SHOW_PINK_HEART_CONTACT_BOT ? <ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_CONTACT_BOT}
      />

      <Section tone="light" id="where" eyebrow="/ Part A — Where Moderniza runs" title={<>Four ways to <span className="text-gradient-ink">run the platform</span>.</>}>
        <Table tone="light" head={["Option", "Best for", "What it means"]} rows={[
          ["Single-tenant SaaS", "Teams that want to start fast", "One isolated environment per customer, managed for you"],
          ["Self-hosted", "Enterprises with their own cloud or data centre", "Docker Compose or Kubernetes, with network policies, Falco runtime security and ClamAV anti-malware"],
          ["Air-gapped", "Defence, government and highly regulated sites", "An offline install bundle with images, packages, database migrations and checksums"],
          ["GovCloud AI", "Public sector", "Confirm AI routing, availability and processing boundaries for your deployment"],
        ]} />
      </Section>

      <Section tone="dark" id="app" eyebrow="/ Part B — Where your modernized app runs" title={<>From a live URL to <span className="text-gradient">your own cluster</span>.</>}>
        <Bullets items={[
          { title: "Docker Compose —", body: "the default, with a live URL and preview." },
          { title: "Kubernetes —", body: "local clusters (kind, k3d, minikube) or your registry, with rollout and a measured reachability check." },
          { title: "AWS and Azure delivery —", body: "Jenkinsfile and Kubernetes manifests for AWS ECR/EKS and Azure ACR/AKS." },
          { title: "Your Git —", body: "the full delivery is pushed to your repository." },
          { title: "Clean removal —", body: "deleting a project removes its app containers, volumes, images and databases too." },
        ]} />
      </Section>

      <Section tone="light" id="integrations" eyebrow="/ Part C — Integrations" title={<>Fits your <span className="text-gradient-ink">delivery toolchain</span>.</>}>
        <Table tone="light" head={["Tool", "What it does with Moderniza"]} rows={[
          ["GitLab", "Receives the modernized application’s repository"],
          ["Jenkins", "Runs the delivered Jenkinsfile and builds"],
          ["SonarQube", "Quality gate and code issues for the new code"],
          ["Sentry", "Error tracking — one project per conversion, wired into the delivered app"],
          ["Splunk", "Log and audit-event forwarding"],
          ["Syft", "Software bills of materials"],
          ["Slack", "Review notifications by webhook"],
          ["AWS / Azure", "Container registry and Kubernetes delivery manifests"],
          ["OpenID Connect IdPs", "Confirm provider compatibility and configuration for your deployment"],
          ["Wazuh", "SIEM forwarding; confirm enabled destinations and event-delivery evidence for your deployment"],
          ["Prometheus · Grafana · Uptime Kuma", "Metrics history, dashboards, alert rules and uptime checks behind the Monitoring page"],
        ]} />
        <Prose tone="light">
          <p>GitLab, Jenkins, SonarQube, Sentry, Splunk and Syft each have a live connection test inside the product.</p>
        </Prose>
      </Section>

      <CtaBand />
    </>
  );
}
