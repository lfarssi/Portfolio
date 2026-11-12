import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";
import type { ProjectCategory } from "@/lib/types";

export function CategoryChip({ category, t }: { category: ProjectCategory; t: Dictionary }) {
  const variant = category === "security" ? "default" : category === "mobile" ? "secondary" : "outline";
  return <Badge variant={variant}>{t.projects.categories[category]}</Badge>;
}
