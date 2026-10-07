import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Deploy Moderniza Your Way — SaaS, Self-Hosted, Air-Gapped, GovCloud" },
  description:
    "Run Moderniza as single-tenant SaaS, on your own Docker or Kubernetes, fully air-gapped, or with AI through AWS GovCloud. Connects to GitLab, Jenkins, SonarQube, Sentry and Splunk.",
};

export default function DeploymentPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Deployment & integrations" }]}
        eyebrow="/ Deployment & integrations"
        title={<>Run Moderniza where <span className="text-gradient">your code must stay</span>.</>}
        lede="Single-tenant SaaS, self-hosted, fully air-gapped, or with AI routed through AWS GovCloud — and a delivery that lands in the toolchain your team already runs."
        meta={<><span>SaaS</span><span>·</span><span>Self-hosted</span><span>·</span><span>Air-gapped</span><span>·</span><span>GovCloud AI</span></>}
        rightSlot={<ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="where" eyebrow="/ Part A — Where Moderniza runs" title={<>Four ways to <span className="text-gradient-ink">run the platform</span>.</>}>
        <Table tone="light" head={["Option", "Best for", "What it means"]} rows={[
          ["Single-tenant SaaS", "Teams that want to start fast", "One isolated environment per customer, managed for you"],
          ["Self-hosted", "Enterprises with their own cloud or data centre", "Docker Compose or Kubernetes, with network policies, Falco runtime security and ClamAV anti-malware"],
          ["Air-gapped", "Defence, government and highly regulated sites", "An offline install bundle with images, packages, database migrations and checksums"],
          ["GovCloud AI", "Public sector", "AI calls routed through AWS Bedrock in GovCloud, with an outbound allowlist"],
        ]} />
      </Section>

      <Section tone="dark" id="app" eyebrow="/ Part B — Where your modernized app runs" title={<>From a live URL to <span className="text-gradient">your own cluster</span>.</>}>
        <Bullets items={[
          { title: "Docker Compose —", body: "the default, with a live URL and preview." },
          { title: "Kubernetes —", body: "local clusters (kind, k3d, minikube) or your registry, with rollout and a measured reachability check." },
          { title: "AWS and Azure delivery —", body: "Jenkinsfile and Kubernetes manifests for AWS ECR/EKS and Azure ACR/AKS." },
          { title: "Your Git —", body: "the full delivery is pushed to your repository." },
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
          ["OpenID Connect IdPs", "Okta, Entra ID, Keycloak, Login.gov for single sign-on"],
        ]} />
        <Prose tone="light">
          <p>GitLab, Jenkins, SonarQube, Sentry, Splunk and Syft each have a live connection test inside the product.</p>
        </Prose>
      </Section>

      <CtaBand />
    </>
  );
}
