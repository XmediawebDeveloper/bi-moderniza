import { NextResponse } from "next/server";
import net from "node:net";
import tls from "node:tls";

export const runtime = "nodejs";

type ContactForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  jobTitle?: string;
  industry?: string;
};

const RECIPIENT = "growth@businessintegra.com";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.co.uk",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "rediffmail.com",
  "yandex.com",
  "zoho.com",
]);

const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 15;

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isFreeEmailDomain(domain: string) {
  return Array.from(FREE_EMAIL_DOMAINS).some(
    (freeDomain) => domain === freeDomain || domain.endsWith(`.${freeDomain}`),
  );
}

function isCompanyEmail(email: string) {
  const normalized = email.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return false;
  const domain = normalized.split("@")[1];
  return !!domain && !isFreeEmailDomain(domain);
}

function isSequentialDigits(digits: string) {
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  return ascending.includes(digits) || descending.includes(digits);
}

function isWeakPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) return true;
  if (/^(\d)\1+$/.test(digits)) return true;
  if (isSequentialDigits(digits)) return true;
  return false;
}

function parseContactForm(input: unknown): { data?: ContactForm; error?: string } {
  if (!input || typeof input !== "object") return { error: "Invalid form payload." };
  const body = input as Record<string, unknown>;

  const data: ContactForm = {
    firstName: textValue(body.firstName),
    lastName: textValue(body.lastName),
    company: textValue(body.company),
    email: textValue(body.email),
    phone: textValue(body.phone),
    jobTitle: textValue(body.jobTitle),
    industry: textValue(body.industry),
  };

  if (!data.firstName) return { error: "First name is required." };
  if (!data.lastName) return { error: "Last name is required." };
  if (!data.company) return { error: "Company is required." };
  if (!data.email) return { error: "Email is required." };
  if (!data.phone) return { error: "Phone or contact number is required." };
  if (!isCompanyEmail(data.email)) return { error: "Invalid email." };
  if (isWeakPhone(data.phone)) return { error: "Invalid phone number." };

  return { data };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmail(data: ContactForm) {
  const rows: Array<[string, string]> = [
    ["First Name", data.firstName],
    ["Last Name", data.lastName],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone / Contact Number", data.phone],
    ["Job Title", data.jobTitle ?? ""],
    ["Industry", data.industry ?? ""],
  ];

  const text = rows
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value || "-")}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111">
      <h2>New Moderniza Contact Form Submission</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        ${htmlRows}
      </table>
    </div>
  `;

  return { text, html };
}

function encodeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ").trim();
}

function buildRawMessage(data: ContactForm) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || RECIPIENT;
  const { text, html } = buildEmail(data);
  const boundary = `moderniza-${Date.now().toString(36)}`;

  return [
    `From: ${encodeHeader(from)}`,
    `To: ${RECIPIENT}`,
    `Reply-To: ${encodeHeader(data.email)}`,
    `Subject: New contact form submission - ${encodeHeader(data.company)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

type SmtpSocket = net.Socket | tls.TLSSocket;

function readSmtp(socket: SmtpSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines.at(-1);
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve(buffer);
      }
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
    };
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function smtpCommand(socket: SmtpSocket, command: string, expected: number[]) {
  socket.write(`${command}\r\n`);
  const response = await readSmtp(socket);
  const code = Number(response.slice(0, 3));
  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed (${command}): ${response}`);
  }
  return response;
}

function connectSmtp(host: string, port: number, secure: boolean): Promise<SmtpSocket> {
  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host, port, servername: host })
      : net.connect({ host, port });

    socket.setTimeout(20000);
    socket.once("connect", () => resolve(socket));
    socket.once("secureConnect", () => resolve(socket));
    socket.once("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP connection timed out."));
    });
    socket.once("error", reject);
  });
}

async function sendEmail(data: ContactForm) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host) {
    throw new Error("SMTP_HOST is not configured.");
  }

  let socket = await connectSmtp(host, port, secure);
  try {
    await readSmtp(socket);
    await smtpCommand(socket, `EHLO ${process.env.SMTP_HELO_DOMAIN ?? "moderniza.local"}`, [250]);

    if (!secure && process.env.SMTP_STARTTLS !== "false") {
      await smtpCommand(socket, "STARTTLS", [220]);
      socket = tls.connect({ socket, servername: host });
      await smtpCommand(socket, `EHLO ${process.env.SMTP_HELO_DOMAIN ?? "moderniza.local"}`, [250]);
    }

    if (user && pass) {
      await smtpCommand(socket, "AUTH LOGIN", [334]);
      await smtpCommand(socket, Buffer.from(user).toString("base64"), [334]);
      await smtpCommand(socket, Buffer.from(pass).toString("base64"), [235]);
    }

    const from = process.env.SMTP_FROM || user || RECIPIENT;
    await smtpCommand(socket, `MAIL FROM:<${from}>`, [250]);
    await smtpCommand(socket, `RCPT TO:<${RECIPIENT}>`, [250, 251]);
    await smtpCommand(socket, "DATA", [354]);

    const raw = buildRawMessage(data).replace(/^\./gm, "..");
    socket.write(`${raw}\r\n.\r\n`);
    const dataResponse = await readSmtp(socket);
    const dataCode = Number(dataResponse.slice(0, 3));
    if (dataCode !== 250) throw new Error(`SMTP DATA failed: ${dataResponse}`);

    await smtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.destroy();
  }
}

export async function POST(request: Request) {
  const parsed = parseContactForm(await request.json().catch(() => null));
  if (parsed.error || !parsed.data) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await sendEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact/start] email failed", error);
    return NextResponse.json(
      { error: "Form validation passed, but email delivery is not configured yet." },
      { status: 503 },
    );
  }
}
