import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import { Section, Bullets, Table, Prose, CtaBand } from "../components/content";

export const metadata: Metadata = {
  title: { absolute: "Supported Legacy Languages and Target Stacks — Moderniza" },
  description:
    "COBOL, JCL, CICS, DB2, RPG, PL/SQL, .NET, Salesforce, PHP and 180+ detected languages, modernized to Python, Java, .NET, Go and modern web frameworks.",
};

export default function LanguagesPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Languages & stacks" }]}
        eyebrow="/ Languages & stacks"
        title={<>What we modernize — <span className="text-gradient">and what we build</span>.</>}
        lede="We publish an honest support level for every language. Many vendors say “we support everything”. We tell you exactly how deep the support goes, so you can plan with confidence."
        meta={<><span>Full</span><span>·</span><span>Supported</span><span>·</span><span>Detected</span></>}
        rightSlot={<ContactRobot variant="scan" className="w-[380px] md:w-[420px] h-[520px]" />}
      />

      <Section tone="light" id="levels" eyebrow="/ 01 — Support levels explained" title={<>Three levels, <span className="text-gradient-ink">stated plainly</span>.</>}>
        <Table tone="light" head={["Level", "What it means"]} rows={[
          ["Full", "A dedicated parser and extractors for the language, proven on real end-to-end runs. Structure and logic are both handled by purpose-built tooling."],
          ["Supported", "Structure and fields are classified and extracted by code. The business logic is converted with AI assistance, then verified like everything else."],
          ["Detected", "The language is recognised and included in the inventory and blueprint, so nothing is invisible. Conversion depth depends on the project."],
        ]} />
      </Section>

      <Section tone="dark" id="full" eyebrow="/ 02 — Full support" title={<>Full <span className="text-gradient">support</span>.</>}>
        <Table head={["Family", "Languages and features"]} rows={[
          ["Mainframe", "COBOL (copybooks, SCREEN SECTION, BMS maps, Report Writer) · JCL (job graphs and schedules)"],
          ["Salesforce", "Apex · Visualforce · Lightning Web Components · Aura"],
          ["Microsoft", "C# / .NET (WinForms, WPF, ASP.NET)"],
          ["Web and scripting", "PHP · Python · JavaScript · TypeScript"],
        ]} />
      </Section>

      <Section tone="light" id="supported" eyebrow="/ 03 — Supported" title={<>Supported with <span className="text-gradient-ink">AI-assisted conversion</span>.</>}>
        <Table tone="light" head={["Family", "Languages"]} rows={[
          ["Mainframe and midrange", "CICS COBOL · DB2 · PL/I · Natural / ADABAS · IDMS · HLASM · REXX · CLIST · Easytrieve · CA Telon · Pacbase · FOCUS · RAMIS"],
          ["IBM i (AS/400)", "RPG / RPGLE · AS/400 CL"],
          ["Databases", "Oracle PL/SQL · T-SQL (with SSIS, SSRS and SQL Agent jobs)"],
          ["4GL and desktop", "VB6 · PowerBuilder · Delphi / Pascal · Oracle Forms · Informix 4GL · Progress ABL · FoxPro · Clipper · dBase · VBA"],
          ["Analytics", "SAS · SPSS (converted to Python)"],
          ["Scientific and systems", "FORTRAN · Ada · C · C++ · MUMPS / VistA"],
          ["Modern", "Java · Go · Ruby · Kotlin · Swift · Rust"],
        ]} />
      </Section>

      <Section tone="dark" id="detected" eyebrow="/ 04 — Detected" title={<>Around 180 language signatures <span className="text-gradient">in total</span>.</>}>
        <Prose>
          <p>Including IMS DL/I, Smalltalk, Uniface, Magic xpa, Gupta and LotusScript. Every detected file appears in the inventory, so you know exactly what your estate contains.</p>
          <p>The live support table inside the product always shows the current level for each language.</p>
        </Prose>
      </Section>

      <Section tone="light" id="constructs" eyebrow="/ 05 — Legacy constructs we handle" title={<>The parts generic tools <span className="text-gradient-ink">miss</span>.</>}>
        <Table tone="light" head={["Construct", "How Moderniza handles it"]} rows={[
          ["CICS transactions", "Pseudo-conversational state, COMMAREA, HANDLE AID and BMS screen attributes carried into the new app"],
          ["IBM MQ", "Queue names traced through the code and mapped to a modern broker, with the gaps listed"],
          ["VSAM files", "EBCDIC unloads decoded and loaded into the new PostgreSQL tables, refusing ambiguous matches"],
          ["Copybooks and COMP-3", "Record layouts and packed decimals mapped to typed fields"],
          ["JCL batch", "Job graphs turned into Kubernetes CronJob, Argo or Airflow, chosen from the shape of your jobs"],
          ["Stored procedures", "DB2 SQL PL, PL/SQL, T-SQL, MySQL and PL/pgSQL"],
          ["Embedded SQL", "COBOL, PL/I, RPG and C hosts; nine SQL dialects"],
          ["Reports", "12 kinds, including COBOL print, Report Writer, Easytrieve, FOCUS, Natural, RPG, SAS, SSRS, Jasper, SQR, Oracle Reports and Informix"],
          ["ETL", "SSIS packages"],
        ]} />
      </Section>

      <Section tone="dark" id="targets" eyebrow="/ 06 — Target stacks" title={<>Build on the stack your team <span className="text-gradient">wants to own</span>.</>}>
        <Table head={["Level", "Stacks"]} rows={[
          ["Most proven (default)", "Python with FastAPI · React or Angular with TypeScript · PostgreSQL"],
          ["Ready", "Java with Spring Boot · C# with .NET · Go"],
          ["Selectable", "Node (NestJS), Django, Quarkus, Gin, Laravel, Rails · Vue, Svelte · MySQL, MariaDB, MongoDB, Oracle, SQL Server, SQLite, Redis"],
        ]} />
        <Bullets cols={2} items={[
          { title: "Architecture:", body: "monolith or microservices — your choice." },
          { title: "UI:", body: "optional UI component library." },
          { title: "Batch:", body: "Kubernetes CronJob, Argo or Airflow." },
          { title: "Messaging:", body: "a modern broker chosen to match your MQ usage." },
        ]} />
      </Section>

      <CtaBand />
    </>
  );
}
