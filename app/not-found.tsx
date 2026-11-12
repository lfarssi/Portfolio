import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getI18n } from "@/lib/locale";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-[72rem] flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="font-mono text-sm tracking-[0.2em] text-primary">HTTP 404</p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">{t.notFound.title}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{t.notFound.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              {t.notFound.home}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">
              <FolderGit2 aria-hidden="true" />
              {t.notFound.projects}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
