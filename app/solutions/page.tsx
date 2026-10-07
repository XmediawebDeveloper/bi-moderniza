import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import CardIcon, { type IconKind } from "../components/CardIcon";
import { Section, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Modernization Solutions by Role and Platform — Moderniza" },
  description:
    "Modernization for CIOs, application owners, architects, security teams and system integrators — across mainframe, IBM i, Microsoft, Salesforce, Oracle, 4GL and web platforms.",
};

const BY_ROLE: { id: string; who: string; quote: string; body: string; icon: IconKind }[] = [
  { id: "cios", who: "For CIOs and CTOs", quote: "Retire legacy with a plan the board can trust", body: "Get a full inventory, a plain-language blueprint and a cost estimate before you commit. Approve each phase’s budget. Track spend and ROI against an industry benchmark. Deliver a running application, not a slide deck.", icon: "person" },
  { id: "application-owners", who: "For application owners", quote: "Keep every rule your users depend on", body: "Every business rule is traced to its source line, owned in the new code and tested. The equivalence report shows old vs new by screen, workflow, rule, validation and field — and marks what was not measured.", icon: "group" },
  { id: "architects", who: "For enterprise architects", quote: "A contract, not a guess", body: "Choose the target stack and architecture. Review a frozen contract with OpenAPI and DDL. A locked symbol registry and dependency-ordered waves keep the build consistent.", icon: "blueprint" },
  { id: "security-teams", who: "For security and compliance teams", quote: "Evidence by default", body: "Passkeys, just-in-time admin, a hash-chained audit log, signed builds with SBOMs, an AI kill switch and FedRAMP 20x indicator checks. Self-hosted and air-gapped options keep code inside your boundary.", icon: "shield" },
  { id: "integrators", who: "For system integrators", quote: "One repeatable process across every client", body: "The same five steps, the same gates and the same reports for every project. Live views of every agent and every dollar make delivery predictable.", icon: "gear" },
];

const BY_PLATFORM: { id: string; name: string; body: string; icon: IconKind }[] = [
  { id: "mainframe", name: "Mainframe (COBOL, JCL, CICS, DB2, VSAM, MQ)", body: "COBOL and JCL have full support. CICS screens and state, VSAM data, MQ queues, copybooks and packed decimals are handled by purpose-built logic. Batch jobs become Kubernetes CronJob, Argo or Airflow schedules. Data is decoded from EBCDIC and loaded into PostgreSQL.", icon: "server" },
  { id: "ibm-i", name: "IBM i / AS/400 (RPG, CL, DB2)", body: "RPG, RPGLE and CL are classified and extracted, with logic converted by AI and verified by the same gates. Embedded SQL and RPG reports are covered.", icon: "server" },
  { id: "microsoft", name: "Microsoft (.NET, VB6, T-SQL)", body: "C# and .NET (WinForms, WPF, ASP.NET) have full support. VB6, VBA, T-SQL stored procedures, SSIS packages and SSRS reports are supported.", icon: "convert" },
  { id: "salesforce", name: "Salesforce (Apex, Visualforce, LWC, Aura)", body: "Full support for Apex, Visualforce, Lightning Web Components and Aura — move Salesforce-bound logic onto an application you own.", icon: "cloud" },
  { id: "oracle", name: "Oracle (PL/SQL, Forms, Reports)", body: "PL/SQL procedures, Oracle Forms and Oracle Reports are supported and moved onto a modern stack.", icon: "doc" },
  { id: "4gl", name: "4GL and desktop (PowerBuilder, Delphi, Progress, Informix, FoxPro)", body: "Classified, extracted and converted with AI assistance, then verified like every other project.", icon: "analyse" },
  { id: "web", name: "Web (PHP, JavaScript, Python)", body: "Full support — upgrade an ageing web app to a modern framework, or modernize only its CI/CD pipeline.", icon: "deploy" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Solutions" }]}
        eyebrow="/ Solutions"
        title={<>Modernization for your role <span className="text-gradient">and your platform</span>.</>}
        lede="The same five steps, the same gates and the same reports — applied to the risk you own and the platform you run."
        meta={<><span>By role</span><span>·</span><span>By legacy platform</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="by-role" eyebrow="/ 01 — By role" title={<>For the people <span className="text-gradient-ink">who own the risk</span>.</>}>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {BY_ROLE.map((r, i) => (
            <Reveal key={r.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="scroll-mt-24">
              <article id={r.id} className="group h-full rounded-3xl border border-ink/10 bg-white/75 p-7 md:p-8 lift">
                <div className="flex items-center justify-between">
                  <CardIcon kind={r.icon} tone="light" className="h-11 w-11" />
                  <span className="chip type-eyebrow text-ink/55">/ {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-5 type-eyebrow text-ink/55">{r.who}</p>
                <h3 className="mt-2 type-h3">&ldquo;{r.quote}&rdquo;</h3>
                <p className="mt-4 type-body text-ink/70">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="dark" id="by-platform" eyebrow="/ 02 — By legacy platform" title={<>Purpose-built handling for <span className="text-gradient">the platform you run</span>.</>}>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BY_PLATFORM.map((p, i) => (
            <Reveal key={p.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} as="li" className="scroll-mt-24">
              <article id={p.id} className="group h-full rounded-3xl border border-white/10 bg-graphite/40 p-7 lift">
                <div className="flex items-center justify-between">
                  <CardIcon kind={p.icon} tone="dark" className="h-11 w-11" />
                  <span className="chip type-eyebrow text-mist">/ {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 type-h3">{p.name}</h3>
                <p className="mt-3 type-body text-mist">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
