import type { MetadataRoute } from "next";

import { getProfile } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  const profile = getProfile();
  return {
    name: `${profile.fullName} | ${profile.headline.en}`,
    short_name: profile.fullName,
    description: profile.subheadline.en,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F1A",
    theme_color: "#0F0F1A",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
