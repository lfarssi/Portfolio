import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Roles } from "@/components/sections/roles";
import { Skills } from "@/components/sections/skills";
import { Volunteering } from "@/components/sections/volunteering";
import { JsonLd } from "@/components/shared/json-ld";
import { content, getFeaturedProjects, getProjects, isDraftProject } from "@/lib/content";
import { getI18n } from "@/lib/locale";
import { personJsonLd } from "@/lib/seo";
import { headers } from "next/headers";

export default async function HomePage() {
  const { locale, t } = await getI18n();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { profile } = content;
  const projectCount = getProjects().filter((project) => !isDraftProject(project)).length;
  const props = { locale, t };

  return (
    <>
      <JsonLd data={personJsonLd(locale)} nonce={nonce} />
      <Hero {...props} profile={profile} projectCount={projectCount} />
      <About {...props} profile={profile} />
      <Roles {...props} roles={content.roles} />
      <Skills {...props} categories={content.skills.categories} spokenLanguages={profile.spokenLanguages} />
      <FeaturedProjects {...props} projects={getFeaturedProjects()} isDraft={isDraftProject} />
      <Experience {...props} experience={content.experience} />
      <EducationTimeline {...props} education={content.education} />
      <Certifications {...props} certifications={content.certifications} />
      <Volunteering {...props} volunteering={content.volunteering} />
      <Contact {...props} profile={profile} />
    </>
  );
}
