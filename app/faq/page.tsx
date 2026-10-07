import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import Reveal from "../components/Reveal";
import { Section, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Moderniza FAQ — Legacy Modernization Questions Answered" },
  description:
    "Buyer questions about Moderniza: what it delivers, which languages and stacks it supports, how quality is proven, what it costs, and where your code goes.",
};

type QA = { q: string; a: string };

const GROUPS: { id: string; title: string; items: QA[] }[] = [
  {
    id: "product",
    title: "Product",
    items: [
      { q: "What is Moderniza?", a: "An AI-powered platform that turns legacy applications into modern, running applications. It scans your code, explains it in plain words, freezes a plan, builds the new app with parallel AI agents, tests it live and deploys it — tracing every business rule along the way." },
      { q: "What does a modernization deliver?", a: "A running application; its source code in your Git repository; a Jenkinsfile and Kubernetes manifests; a blueprint of the old system; a frozen contract with OpenAPI and DDL; a business-rules document; an equivalence report; a code report; batch job documentation; and a ledger of every AI call." },
      { q: "Is this just a code translator?", a: "No. A translator converts files one by one. Moderniza first understands the whole application, freezes a contract, builds against it, and proves the result runs. Translation is only one part of the job." },
      { q: "Can I modernize only my CI/CD pipeline?", a: "Yes. Pipeline modernization keeps your code and builds a modern pipeline for it in four steps: Read, Choose, Write & check, Push & run." },
    ],
  },
  {
    id: "languages",
    title: "Languages and stacks",
    items: [
      { q: "Which legacy languages do you support?", a: "Full support for COBOL, JCL, Salesforce (Apex, Visualforce, LWC, Aura), C#/.NET, PHP, Python, JavaScript and TypeScript. About 40 more — including CICS, DB2, RPG, PL/SQL, T-SQL, PL/I, Natural, VB6 and PowerBuilder — are supported with AI-assisted conversion. Around 180 languages are detected. See the Languages page for the full list." },
      { q: "Which target stack will I get?", a: "You choose. Python with FastAPI, React or Angular, and PostgreSQL is the most proven. Java Spring Boot, C# .NET and Go are ready. Many other frameworks and databases can be selected." },
      { q: "How do I bring my code in?", a: "A Git repository URL, a folder upload, or a .zip, .war or .ear archive." },
    ],
  },
  {
    id: "quality",
    title: "Quality and trust",
    items: [
      { q: "How do I know no business rules were lost?", a: "Every rule is found by code, explained by AI, and checked against the original source. Each rule gets one owner in the new code and a proof status. Priority rules become tests. The equivalence report shows old vs new and marks what was not measured." },
      { q: "What if the generated code does not work?", a: "It cannot leave the build step until it passes six gates, including a real Docker start, API checks and live tests. Failures are repaired automatically, up to 12 rounds. If a problem cannot be fixed, the platform says so." },
      { q: "Do humans stay involved?", a: "Yes. You approve the planning budget, choose the stack, set the delivery pipeline and set the build budget. You can edit the backlog, run each step by hand, and pause at any time." },
    ],
  },
  {
    id: "cost",
    title: "Cost and time",
    items: [
      { q: "How much does it cost?", a: "Contact us for our commercial model. The platform shows an estimate before each phase and records actual spend per call." },
      { q: "How long does a project take?", a: "It depends on the size and complexity of your code. We scan it first and give you a plan and estimate before anything is built." },
      { q: "Can I pause a project?", a: "Yes. Pause stops the agents at once. Resume continues from where it stopped." },
    ],
  },
  {
    id: "security",
    title: "Security and hosting",
    items: [
      { q: "Where does my code go?", a: "Only to the Moderniza environment you choose and to approved AI endpoints. Self-hosted, air-gapped and AWS GovCloud options are available." },
      { q: "Which AI models do you use?", a: "Anthropic Claude models, directly or through AWS Bedrock in GovCloud." },
      { q: "Is my code used to train AI models?", a: "This is governed by our AI provider agreement. Ask us for the current statement." },
      { q: "Can admins stop the AI?", a: "Yes. One switch halts every AI call across the platform. It needs a fresh passkey and every change is audited." },
      { q: "Are you FedRAMP authorized?", a: "Moderniza tracks the FedRAMP 20x Key Security Indicators with automated checks and publishes its posture in a Trust Center. Authorization is in progress; the FedRAMP ID is pending today." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "FAQ" }]}
        eyebrow="/ FAQ"
        title={<>Frequently asked <span className="text-gradient">questions</span>.</>}
        lede="The questions buyers ask before a demo — about the product, the languages, the proof, the cost, and where the code goes."
        meta={<>{GROUPS.map((g, i) => (<span key={g.id}><a href={`#${g.id}`} className="hover:text-glow transition-colors">{g.title}</a>{i < GROUPS.length - 1 && <span> · </span>}</span>))}</>}
        rightSlot={<ContactRobot variant="chat" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      {GROUPS.map((g, gi) => (
        <Section
          key={g.id}
          id={g.id}
          tone={gi % 2 === 0 ? "light" : "dark"}
          eyebrow={`/ 0${gi + 1} — ${g.title}`}
        >
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <Reveal delay={1} as="h2" className="type-h2">
              {g.title}
            </Reveal>
            <div className={`divide-y ${gi % 2 === 0 ? "divide-ink/10" : "divide-white/10"}`}>
              {g.items.map((qa, i) => (
                <Reveal key={qa.q} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 type-h4">
                      <span>{qa.q}</span>
                      <span aria-hidden className={`mt-1 shrink-0 transition-transform group-open:rotate-45 ${gi % 2 === 0 ? "text-ember" : "text-glow"}`}>+</span>
                    </summary>
                    <p className={`mt-3 max-w-[70ch] type-body md:text-base ${gi % 2 === 0 ? "text-ink/70" : "text-chalk/75"}`}>{qa.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
