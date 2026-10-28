import Link from "next/link";
import ModernizaSymbol from "./ModernizaSymbol";
import styles from "./Footer.module.css";
import { CookieSettingsButton } from "./CookieConsent";

const COLS = [
  {
    title: "Product",
    items: [
      ["How it works", "/how-it-works"],
      ["Features", "/platform"],
      ["Languages", "/languages"],
      ["Business rules", "/business-rules"],
      ["Verification", "/verification"],
      ["Cost & transparency", "/pricing-transparency"],
    ],
  },
  {
    title: "Solutions",
    items: [
      ["For CIOs", "/solutions#cios"],
      ["For architects", "/solutions#architects"],
      ["For security teams", "/solutions#security-teams"],
      ["Mainframe", "/solutions#mainframe"],
      [".NET", "/solutions#microsoft"],
      ["Salesforce", "/solutions#salesforce"],
    ],
  },
  {
    title: "Trust",
    items: [
      ["Security", "/security"],
      ["Compliance & evidence", "/compliance"],
      ["AI governance", "/ai-governance"],
      ["Trust Center", "/trust-center"],
      ["Secure Configuration Guide", "/trust-center#configuration"],
      ["Report a vulnerability", "/trust-center#contacts"],
    ],
  },
  {
    title: "Company",
    items: [
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.grid} />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brandSection}>
            <div className={styles.brand}>
              <ModernizaSymbol className={styles.logo} />
              <p className={styles.wordmark}>
                Moderniza<sup className={styles.trademark}>&trade;</sup>
              </p>
            </div>
            <h3 className={styles.headline}>
              Modernize legacy systems.
              <br />
              Prove nothing <span className={styles.accent}>was lost.</span>
            </h3>
            <Link href="/contact" className={styles.cta}>
              Book a demo <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <nav className={styles.columns} aria-label="Footer navigation">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className={styles.heading}>{c.title}</h4>
                <ul className={styles.links}>
                  {c.items.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Moderniza<sup className={styles.trademark}>&trade;</sup>. All rights reserved.</p>
            <p className={styles.attribution}>Moderniza<sup className={styles.trademark}>&trade;</sup> is a trademark of Business Integra Technology Solutions, Inc.</p>
          </div>
          <nav className={styles.legal} aria-label="Legal and privacy">
            <Link href="/security">Security</Link>
            <Link href="/ai-governance">AI governance</Link>
            <Link href="/trust-center">Trust Center</Link>
            <Link href="/contact">Contact</Link>
            <CookieSettingsButton className={styles.cookieSettings} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
