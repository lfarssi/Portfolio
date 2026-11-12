import "server-only";
import type { Metadata } from "next";

import { getProfile } from "@/lib/content";
import { siteUrl } from "@/lib/env";
import { getDictionary } from "@/lib/i18n";
import type { Locale, Project } from "@/lib/types";
import { usableUrl } from "@/lib/utils";

export { siteUrl };

export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function buildRootMetadata(locale: Locale): Metadata {
  const profile = getProfile();
  const t = getDictionary(locale);
  const title = `${profile.fullName} | ${profile.headline[locale]}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${profile.fullName}` },
    description: t.meta.description,
    applicationName: profile.fullName,
    authors: [{ name: profile.fullName, url: siteUrl }],
    creator: profile.fullName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: profile.fullName,
      title,
      description: t.meta.description,
      url: "/",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    },
    twitter: { card: "summary_large_image", title, description: t.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export function personJsonLd(locale: Locale) {
  const profile = getProfile();
  const sameAs = [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.tryhackme,
    profile.socials.rootme,
  ]
    .map((url) => usableUrl(url))
    .filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.headline[locale],
    description: profile.subheadline[locale],
    url: siteUrl,
    image: `${siteUrl}${profile.photo}`,
    ...(usableUrl(profile.email) ? { email: `mailto:${profile.email}` } : {}),
    address: { "@type": "PostalAddress", addressLocality: "Oujda", addressCountry: "MA" },
    sameAs,
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Zone01 Oujda" },
      { "@type": "EducationalOrganization", name: "ISTA Berkane" },
    ],
    knowsAbout: [
      "Cybersecurity",
      "Application security",
      "Penetration testing",
      "OWASP Top 10",
      "OWASP MASVS",
      "Mobile development",
      "Full-stack development",
      "Java",
      "Spring Boot",
      "Go",
      "Rust",
      "Angular",
      "Next.js",
      "Linux hardening",
    ],
    knowsLanguage: ["ar", "fr", "en"],
  };
}

export function projectJsonLd(project: Project, locale: Locale) {
  const profile = getProfile();
  const github = usableUrl(project.github);
  return {
    "@context": "https://schema.org",
    "@type": github ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title[locale],
    description: project.description[locale],
    url: absoluteUrl(`/projects/${project.slug}`),
    ...(github ? { codeRepository: github } : {}),
    ...(/^\d{4}-\d{2}-\d{2}$/.test(project.date) ? { dateCreated: project.date } : {}),
    keywords: project.technologies.join(", "),
    inLanguage: locale,
    author: { "@type": "Person", name: profile.fullName, url: siteUrl },
  };
}
