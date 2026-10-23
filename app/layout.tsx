import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import IntroLoader from "./components/IntroLoader";
import CookieConsent from "./components/CookieConsent";
import { SITE_URL } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Moderniza — AI Legacy Modernization You Can Verify",
    template: "%s — Moderniza",
  },
  description:
    "Turn COBOL, JCL, .NET, Salesforce and PHP systems into modern, running applications — with every business rule traced to its source line.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "legacy modernization",
    "AI code modernization",
    "mainframe modernization",
    "COBOL to Java",
    "COBOL modernization",
    "legacy application migration",
    "business rule extraction",
    "COBOL to Python",
    "JCL to Airflow",
    "CICS modernization",
    "VB6 migration",
    "PowerBuilder migration",
    "Salesforce migration",
    "RPG modernization",
    "FedRAMP 20x",
    "air-gapped AI",
    "GovCloud AI",
    "AI governance",
    "tamper-evident audit log",
  ],
  openGraph: {
    type: "website",
    siteName: "Moderniza",
    title: "Moderniza — AI Legacy Modernization You Can Verify",
    description: "Modernize legacy systems. Prove nothing was lost.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderniza — AI Legacy Modernization You Can Verify",
    description: "Modernize legacy systems. Prove nothing was lost.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-chalk">
        <IntroLoader />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
