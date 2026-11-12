import { getProfile } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Portfolio of Mohamed El Farssi, Cybersecurity & Mobile Developer";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  const profile = getProfile();
  return renderOgImage({
    eyebrow: "Portfolio",
    title: profile.fullName,
    subtitle: profile.headline.en,
    initials: profile.initials,
  });
}
