import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import type { SectionProps } from "@/components/sections/types";
import { LinkedinIcon } from "@/components/shared/brand-icons";
import { CvButton } from "@/components/shared/cv-button";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import type { Profile } from "@/lib/types";
import { cn, isPlaceholder, usableUrl } from "@/lib/utils";

export function Contact({ locale, t, profile }: SectionProps & { profile: Profile }) {
  const email = usableUrl(profile.email);
  const linkedin = usableUrl(profile.socials.linkedin);
  const phone = profile.phone.trim();

  const rows = [
    {
      Icon: Mail,
      label: t.contact.email,
      value: profile.email,
      href: email ? `mailto:${email}` : undefined,
    },
    {
      Icon: LinkedinIcon,
      label: t.contact.linkedin,
      value: linkedin ? linkedin.replace(/^https:\/\/(www\.)?/, "") : profile.socials.linkedin,
      href: linkedin,
      external: true,
    },
    ...(phone ? [{ Icon: Phone, label: t.contact.phone, value: phone, href: `tel:${phone.replace(/\s+/g, "")}` }] : []),
    { Icon: MapPin, label: t.contact.location, value: profile.location[locale] },
    { Icon: Briefcase, label: t.contact.availability, value: profile.availability[locale] },
  ].filter((row) => row.value);

  return (
    <Section id="contact" muted>
      <SectionHeader id="contact-title" {...t.sections.contact} />
      <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <Card className="flex flex-col p-5 sm:p-6">
          <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.contact.direct}
          </h3>
          <dl className="mt-5 space-y-4">
            {rows.map(({ Icon, label, value, href, ...rest }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className={cn("text-sm font-medium break-words", isPlaceholder(value) && "text-danger")}>
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-primary"
                        {...("external" in rest && rest.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <CvButton cv={profile.cv} download variant="outline" className="mt-8 w-full sm:w-auto lg:mt-auto lg:self-start" />
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">{t.contact.formTitle}</h3>
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
