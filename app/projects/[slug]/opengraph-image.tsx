import { getProfile, getProjectBySlug, getProjects } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project by Mohamed El Farssi";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getProfile();
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: `${profile.fullName} · Project`,
    title: project?.title.en ?? profile.fullName,
    subtitle: project?.summary.en ?? profile.headline.en,
    initials: profile.initials,
  });
}
