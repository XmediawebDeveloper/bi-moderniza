import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot, { SHOW_PINK_HEART_SCAN_BOT } from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, Steps, SubHead, Callout, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "CI/CD Pipeline Modernization — Jenkins, GitLab CI, GitHub Actions, Azure DevOps | Moderniza" },
  description:
    "Give every modernized app a DevOps, DevSecOps or MLOps pipeline with 16 security scan areas — or move an existing pipeline from one CI/CD provider to another, checked before it runs.",
};

export default function PipelinePage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Platform", href: "/platform" }, { label: "Pipeline & CI/CD" }]}
        eyebrow="/ Pipeline & CI/CD modernization"
        title={<>Modern pipelines — <span className="text-gradient">for new apps and for the ones you keep</span>.</>}
        lede={<>Moderniza handles CI/CD in two ways. Every full modernization ships with a pipeline you design. And when the code is fine but the pipeline is not, a <strong>pipeline-only conversion</strong> moves your existing CI/CD to a new provider without touching a line of application code.</>}
        meta={<><span>DevOps · DevSecOps · MLOps</span><span>·</span><span>16 security scan areas</span></>}
        rightSlot={SHOW_PINK_HEART_SCAN_BOT ? <ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" /> : undefined}
        centered={!SHOW_PINK_HEART_SCAN_BOT}
      />

      <Section
        tone="light"
        id="new-apps"
        eyebrow="/ Part A — A pipeline for every modernized app"
        title={<>Design the delivery pipeline <span className="text-gradient-ink">before the build starts</span>.</>}
        lede="After the blueprint, the Contract waits until someone on your team saves the delivery pipeline settings. Automatic mode cannot choose for you."
      >
        <Table tone="light" head={["Setting", "Options"]} rows={[
          ["Repository platform", "12 platforms, from GitHub and GitLab to Bitbucket, Azure Repos and others"],
          ["CI/CD provider", "GitHub Actions · GitLab CI · Jenkins · Azure DevOps · Gitea Actions · Forgejo Actions"],
          ["Pipeline mode", "DevOps · DevSecOps · MLOps"],
          ["Stages", "Validate · Build · Test · Package · Deploy · Verify"],
          ["Security scans", "16 areas, each with a choice of tool (DevSecOps and MLOps)"],
          ["MLOps stages", "Data check, training, evaluation gate, model security scan, registry, serving, monitoring — offered when machine-learning code is found"],
        ]} />

        <SubHead tone="light">Security scan areas (examples, default tool first)</SubHead>
        <Bullets tone="light" cols={2} items={[
          { title: "Code (SAST):", body: "Semgrep, SonarQube, Checkmarx, Fortify, Veracode, Snyk Code, Bandit" },
          { title: "Secrets:", body: "Gitleaks, TruffleHog and others" },
          { title: "Containers:", body: "Trivy, Grype and others" },
          { title: "Infrastructure as code:", body: "Checkov and others" },
          { title: "Web and API (DAST):", body: "OWASP ZAP and others" },
          { title: "Also:", body: "dependencies (SCA), SBOM (Syft), Kubernetes, licences, malware, cloud posture, runtime, policy and signing (Cosign)" },
        ]} />
        <Prose tone="light">
          <p>Paid tools are clearly labelled and can still be chosen. The default DevSecOps set covers secrets, code, dependencies, SBOM, containers, infrastructure and policy.</p>
          <p><strong>What you get:</strong> one native pipeline file for your provider — <code>.github/workflows/ci.yml</code>, <code>.gitlab-ci.yml</code>, <code>Jenkinsfile</code>, <code>azure-pipelines.yml</code>, or the Gitea / Forgejo workflow. At deploy it is pushed with the app to a new project on your GitLab and run there. A Jenkins job is created and started on your connected Jenkins. Live stage status is shown for GitLab CI and Jenkins.</p>
        </Prose>
      </Section>

      <Section
        tone="dark"
        id="pipeline-only"
        eyebrow="/ Part B — Pipeline-only conversion"
        title={<>Move your CI/CD. <span className="text-gradient">Leave your code alone.</span></>}
        lede={<>Choose <strong>Pipeline conversion</strong> when you upload. The application code stays exactly as it is; only the pipeline moves.</>}
      >
        <Steps items={[
          {
            no: "Step 1",
            title: "Read your pipeline",
            body: <>
              <p>Moderniza reads your current pipeline into a list of jobs and stages, with no AI involved. Secrets files, Git history and dependency folders are never copied. If no pipeline exists, a new one is written from your build files.</p>
              <p className="mt-3"><strong>We read:</strong> Jenkins · GitLab CI · GitHub Actions · Gitea and Forgejo Actions · Azure Pipelines · CircleCI · Bitbucket Pipelines · AWS CodeBuild</p>
            </>,
          },
          {
            no: "Step 2",
            title: "Choose the new pipeline",
            body: <>
              <p>A person picks the target provider — automatic mode never decides this. The provider you already use is removed from the list, so the move is real.</p>
              <p className="mt-3"><strong>We write:</strong> GitHub Actions · GitLab CI · Jenkins · Azure DevOps · Gitea Actions · Forgejo Actions</p>
            </>,
          },
          {
            no: "Step 3",
            title: "Write & check",
            body: <>
              <p>Your pipeline is turned into a neutral plan, then written as the new provider’s native file. Jobs that need translation get one AI pass; anything still left is kept as its original commands and clearly marked to review. A parity check confirms every original job is accounted for. Before anything is pushed:</p>
              <ul className="mt-3 space-y-2">
                <li><strong>Structure check</strong> — always.</li>
                <li><strong>Provider linter</strong> — GitLab CI lint, Jenkins validation or actionlint, where available.</li>
                <li><strong>Pre-flight check</strong> — variables, files, scripts and job order, plus a test of each job’s image where Docker is available.</li>
                <li><strong>Automatic repair</strong> — up to 2 rounds; a repair that weakens the pipeline is rolled back.</li>
                <li><strong>Fail closed</strong> — a failing check blocks the push. A file passed by the provider’s own linter is marked <em>proven</em>; otherwise the best mark is <em>structurally valid</em>.</li>
              </ul>
            </>,
          },
          {
            no: "Step 4",
            title: "Push & run",
            body: <p>The checked pipeline is pushed to a new project on your GitLab. GitLab CI starts on push; for Jenkins, a job is created and started. Moderniza watches the run for up to 3 hours, repairs failures in the pipeline file (up to 5 attempts), and marks anything only you can fix — a token, a runner, a server — as <em>Needs you</em>.</p>,
          },
        ]} />
        <Prose>
          <p><strong>The hand-over report.</strong> Every pipeline conversion delivers <code>docs/pipeline/MIGRATION.md</code>: where each job went, and what your team must set up — credential names (never values), shared libraries, runner labels and approvals.</p>
        </Prose>
        <Callout>
          Moving from Jenkins to GitLab CI, or from Azure Pipelines to GitHub Actions? Moderniza moves it, checks it, runs it — and tells you exactly what is left for your team.
        </Callout>
      </Section>

      <CtaBand />
    </>
  );
}
