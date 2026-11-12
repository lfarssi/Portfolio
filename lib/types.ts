import type { z } from "zod";

import type {
  certificationSchema,
  contentSchema,
  contactSchema,
  educationSchema,
  experienceSchema,
  localizedListSchema,
  localizedSchema,
  profileSchema,
  projectCategorySchema,
  projectSchema,
  roleSchema,
  skillCategorySchema,
  volunteeringSchema,
} from "@/lib/schema";

export type Locale = "en" | "fr";

export type Localized = z.infer<typeof localizedSchema>;
export type LocalizedList = z.infer<typeof localizedListSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type Project = z.infer<typeof projectSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Role = z.infer<typeof roleSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Volunteering = z.infer<typeof volunteeringSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Content = z.infer<typeof contentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
