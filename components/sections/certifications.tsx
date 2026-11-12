import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";

import type { SectionProps } from "@/components/sections/types";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { formatMonth } from "@/lib/i18n";
import type { Certification } from "@/lib/types";
import { cn, isPlaceholder, usableUrl } from "@/lib/utils";

export function Certifications({
  locale,
  t,
  certifications,
}: SectionProps & { certifications: Certification[] }) {
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications" muted>
      <SectionHeader id="certifications-title" {...t.sections.certifications} />
      <ul className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => {
          const credential = usableUrl(cert.credentialUrl);
          const image = usableUrl(cert.image);
          const name = cert.name[locale];
          return (
            <Reveal as="li" key={cert.id}>
              <Card interactive className="flex h-full flex-col p-5">
                {image ? (
                  <Image src={image} alt="" width={48} height={48} className="size-12 rounded-md object-contain" />
                ) : (
                  <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                    <Award className="size-6" aria-hidden="true" />
                  </span>
                )}
                <h3 className={cn("mt-4 font-semibold leading-snug", isPlaceholder(name) && "text-danger")}>{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{formatMonth(cert.date, locale)}</p>
                <p className="mt-3 flex-1 text-sm leading-6">{cert.description[locale]}</p>
                {credential ? (
                  <a
                    href={credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    {t.common.viewCredential}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{t.common.opensInNewTab}</span>
                  </a>
                ) : null}
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
