import { z } from "zod";

/** A `{{...}}` placeholder that still has to be filled by the owner. */
export const placeholderSchema = z
  .string()
  .regex(/\{\{[^}]+\}\}/, "Expected a {{PLACEHOLDER}} value");

const nonEmpty = z.string().trim().min(1);

export const localizedSchema = z.object({ en: nonEmpty, fr: nonEmpty });
export const localizedListSchema = z.object({
  en: z.array(nonEmpty),
  fr: z.array(nonEmpty),
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected yyyy-mm-dd");
const isoMonth = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Expected yyyy-mm or yyyy-mm-dd");

const httpsUrl = z.url({ protocol: /^https$/ });
/** Absolute https URL, a `{{...}}` placeholder, or empty (hidden). */
const optionalUrl = z.union([httpsUrl, placeholderSchema, z.literal("")]);
/** Path inside /public, a placeholder, or empty. */
const publicPath = z.union([
  z.string().regex(/^\/[\w\-./]+$/, "Expected a /public path"),
  placeholderSchema,
  z.literal(""),
]);

export const projectCategories = [
  "security",
  "mobile",
  "fullStack",
  "backEnd",
  "frontEnd",
  "systems",
] as const;

export const projectCategorySchema = z.enum(projectCategories);

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected kebab-case"),
    title: localizedSchema,
    summary: localizedSchema,
    description: localizedSchema,
    highlights: localizedListSchema,
    securityNotes: localizedListSchema.optional(),
    technologies: z.array(nonEmpty).min(1),
    categories: z.array(projectCategorySchema).min(1),
    role: localizedSchema,
    teamSize: z.union([z.number().int().min(1), placeholderSchema]),
    date: z.union([isoDate, placeholderSchema]),
    isFeatured: z.boolean(),
    github: optionalUrl.optional(),
    demo: optionalUrl.optional(),
    storeUrl: optionalUrl.optional(),
    readmeUrl: optionalUrl.optional(),
    image: publicPath.optional(),
    context: z.enum(["zone01", "ista", "personal"]),
  })
  .strict();

const socialsSchema = z
  .object({
    github: optionalUrl,
    linkedin: optionalUrl,
    tryhackme: optionalUrl,
    rootme: optionalUrl,
    store: optionalUrl,
  })
  .strict();

export const profileSchema = z
  .object({
    fullName: nonEmpty,
    initials: z.string().regex(/^[A-Z]{1,3}$/),
    headline: localizedSchema,
    subheadline: localizedSchema,
    about: localizedSchema,
    whatIBring: localizedListSchema,
    availability: localizedSchema,
    location: localizedSchema,
    email: z.union([z.email(), placeholderSchema]),
    phone: z.string(),
    photo: publicPath,
    cv: z.object({ en: publicPath, fr: publicPath }).strict(),
    socials: socialsSchema,
    spokenLanguages: z.array(
      z.object({ name: localizedSchema, level: localizedSchema }).strict(),
    ),
  })
  .strict();

export const roleSchema = z
  .object({
    id: nonEmpty,
    level: z.enum(["primary", "secondary"]),
    title: localizedSchema,
    summary: localizedSchema,
    stack: z.array(nonEmpty),
  })
  .strict();

export const skillCategorySchema = z
  .object({
    id: nonEmpty,
    name: localizedSchema,
    items: z.array(nonEmpty).min(1),
  })
  .strict();

const periodDate = z.union([isoMonth, placeholderSchema]);

export const educationSchema = z
  .object({
    title: localizedSchema,
    school: localizedSchema,
    dateStart: periodDate,
    dateEnd: z.union([periodDate, z.literal("")]),
    description: localizedSchema,
    bullets: localizedListSchema,
  })
  .strict();

export const certificationSchema = z
  .object({
    id: nonEmpty,
    name: localizedSchema,
    issuer: nonEmpty,
    date: periodDate,
    description: localizedSchema,
    image: publicPath,
    credentialUrl: optionalUrl,
  })
  .strict();

export const volunteeringSchema = z
  .object({
    organization: nonEmpty,
    role: localizedSchema,
    dateStart: periodDate,
    dateEnd: z.union([periodDate, z.literal("")]),
    description: localizedSchema,
  })
  .strict();

export const experienceSchema = z
  .object({
    company: nonEmpty,
    role: localizedSchema,
    location: localizedSchema,
    dateStart: periodDate,
    dateEnd: z.union([periodDate, z.literal("")]),
    bullets: localizedListSchema,
  })
  .strict();

export const contentSchema = z
  .object({
    profile: profileSchema,
    roles: z.array(roleSchema),
    skills: z.object({ categories: z.array(skillCategorySchema) }).strict(),
    projects: z.array(projectSchema),
    education: z.array(educationSchema),
    certifications: z.array(certificationSchema),
    volunteering: z.array(volunteeringSchema),
    experience: z.array(experienceSchema),
  })
  .strict()
  .superRefine((content, ctx) => {
    const seen = new Set<string>();
    content.projects.forEach((project, index) => {
      if (seen.has(project.slug)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate project slug "${project.slug}"`,
          path: ["projects", index, "slug"],
        });
      }
      seen.add(project.slug);
    });
  });

/** Contact form payload, shared by the client form and the server action. */
export const contactLimits = { name: 100, email: 254, subject: 150, message: 5000 };

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(contactLimits.name),
  email: z.email().max(contactLimits.email),
  subject: z.string().trim().min(3).max(contactLimits.subject),
  message: z.string().trim().min(20).max(contactLimits.message),
});
