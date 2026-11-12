import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

import content from "./data/content.json";

// Which CV PDFs exist in public/. The CV button falls back to the other
// language, or to a disabled "coming soon" state, instead of linking a 404.
const cvAvailable = {
  en: existsSync(join(process.cwd(), "public", content.profile.cv.en)),
  fr: existsSync(join(process.cwd(), "public", content.profile.cv.fr)),
};
if (!cvAvailable.en || !cvAvailable.fr) {
  console.warn(
    `[portfolio] Missing CV PDF(s) in public/cv: ${
      [!cvAvailable.en && content.profile.cv.en, !cvAvailable.fr && content.profile.cv.fr]
        .filter(Boolean)
        .join(", ")
    }`,
  );
}

// Static security headers. The Content-Security-Policy is per-request
// (nonce based) and is set in proxy.ts.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CV_AVAILABLE: JSON.stringify(cvAvailable),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
