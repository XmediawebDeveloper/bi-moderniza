// Builds the site as a static export into ./dist
// Usage: npm run build:static
// Produces plain HTML/CSS/JS you can upload to any static host.
// NOTE: the contact form's email sending needs a server, so it does not work
// in this static build (see DEPLOY-STATIC.md).
import { execSync } from "node:child_process";
import { rmSync, renameSync, existsSync } from "node:fs";

execSync("next build", {
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "true" },
});

if (existsSync("dist")) rmSync("dist", { recursive: true, force: true });
renameSync("out", "dist");

console.log("\n✅ Static site ready in ./dist");
