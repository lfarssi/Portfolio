import "server-only";
import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url({ protocol: /^https?$/ })
    .transform((value) => value.replace(/\/+$/, ""))
    .optional(),
  EMAILJS_SERVICE_ID: optionalString,
  EMAILJS_TEMPLATE_ID: optionalString,
  EMAILJS_PUBLIC_KEY: optionalString,
  EMAILJS_PRIVATE_KEY: optionalString,
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;

export const siteUrl = env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const emailJsConfig =
  env.EMAILJS_SERVICE_ID &&
  env.EMAILJS_TEMPLATE_ID &&
  env.EMAILJS_PUBLIC_KEY &&
  env.EMAILJS_PRIVATE_KEY
    ? {
        serviceId: env.EMAILJS_SERVICE_ID,
        templateId: env.EMAILJS_TEMPLATE_ID,
        publicKey: env.EMAILJS_PUBLIC_KEY,
        privateKey: env.EMAILJS_PRIVATE_KEY,
      }
    : null;
