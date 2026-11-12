"use server";

import { emailJsConfig } from "@/lib/site-config";
import { contactSchema } from "@/lib/schema";

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: ContactField[] }
  | { status: "tooFast" }
  | { status: "unavailable" }
  | { status: "error" };

/** Minimum time between the form rendering and submission. Bots are faster. */
const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 1000 * 60 * 60 * 24;
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: humans never see this field. Pretend success so bots learn nothing.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const startedAt = Number(formData.get("startedAt"));
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return { status: "tooFast" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path[0]))].filter(
      (field): field is ContactField =>
        field === "name" || field === "email" || field === "subject" || field === "message",
    );
    return { status: "invalid", fields };
  }

  if (!emailJsConfig) return { status: "unavailable" };

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        service_id: emailJsConfig.serviceId,
        template_id: emailJsConfig.templateId,
        user_id: emailJsConfig.publicKey,
        // EmailJS templates escape {{variables}}; values are plain text only.
        template_params: {
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          reply_to: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
        },
      }),
    });
    if (!response.ok) {
      console.error(`[contact] EmailJS responded ${response.status}`);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (error) {
    console.error("[contact] EmailJS request failed", error instanceof Error ? error.name : "unknown");
    return { status: "error" };
  }
}
