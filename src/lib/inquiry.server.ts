import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(200),
  projectType: z.string().trim().max(60).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  timeline: z.string().trim().max(60).optional().default(""),
  requirements: z.string().trim().min(1).max(4000),
});

export type Inquiry = z.infer<typeof InquirySchema>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtmlBody(data: Inquiry): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#666;white-space:nowrap;">${label}</td><td style="padding:6px 12px;">${escapeHtml(value) || "<em style=\"color:#999\">—</em>"}</td></tr>`;
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;">
    <h2 style="margin:0 0 12px;">New project inquiry</h2>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Name", data.name)}
      ${row("Company", data.company)}
      ${row("Email", data.email)}
      ${row("Project type", data.projectType)}
      ${row("Budget", data.budget)}
      ${row("Timeline", data.timeline)}
    </table>
    <h3 style="margin:20px 0 6px;">Requirements</h3>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:#f6f6f6;padding:12px;border-radius:6px;margin:0;">${escapeHtml(data.requirements)}</pre>
  </body></html>`;
}

function renderTextBody(data: Inquiry): string {
  return [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Project type: ${data.projectType}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    ``,
    `Requirements:`,
    data.requirements,
  ].join("\n");
}

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InquirySchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL ?? "mmaisolutions.pvt@gmail.com";
    const fromEmail = process.env.INQUIRY_FROM_EMAIL ?? "Mind Masters <onboarding@resend.dev>";

    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is not configured on the server. Add it to your environment (see .env.example).",
      );
    }

    const subject = `New project inquiry — ${data.projectType || "Mind Masters"}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject,
        html: renderHtmlBody(data),
        text: renderTextBody(data),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("Resend send failed", response.status, errorText);
      throw new Error(`Email delivery failed (${response.status}). Please try again or email us directly.`);
    }

    return { ok: true as const };
  });
