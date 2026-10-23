import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

const ROUTES = [
  "",
  "/how-it-works",
  "/platform",
  "/languages",
  "/business-rules",
  "/epics-stories",
  "/pipeline",
  "/product",
  "/verification",
  "/pricing-transparency",
  "/security",
  "/team-control",
  "/compliance",
  "/operations",
  "/ai-governance",
  "/trust-center",
  "/deployment",
  "/solutions",
  "/faq",
  "/contact",
  "/what",
  "/who",
  "/why",
  "/enterprises",
  "/process/discover",
  "/process/define",
  "/process/deliver",
  "/work/outcomes",
  "/work/projects",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
