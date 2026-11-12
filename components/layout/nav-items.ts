import type { Dictionary } from "@/lib/i18n";

export const navItems = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "education", key: "education" },
  { id: "contact", key: "contact" },
] as const satisfies readonly { id: string; key: keyof Dictionary["nav"] }[];

export type NavId = (typeof navItems)[number]["id"];
