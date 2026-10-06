import type { Metadata } from "next";
import { getStartPage } from "../../lib/strapi";
import StartPageClient from "./StartPageClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Start a project · Moderniza",
  description:
    "Five short questions, no buzzwords. We'll come back within one business day with a clear summary, an honest timeline, and a walkthrough slot.",
};

export default async function Page() {
  const data = await getStartPage();
  return <StartPageClient data={data} />;
}
