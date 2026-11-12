"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

import { sendContactMessage, type ContactField, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { contactLimits, contactSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [clientErrors, setClientErrors] = useState<ContactField[] | null>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Records when the form became usable; the server rejects instant submissions.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const errors = clientErrors ?? (state.status === "invalid" ? state.fields : []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const result = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
    if (!result.success) {
      event.preventDefault();
      const fields = [...new Set(result.error.issues.map((issue) => issue.path[0]))] as ContactField[];
      setClientErrors(fields);
      const first = fields[0];
      if (first) event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors(null);
  }

  const fields: {
    name: ContactField;
    type?: string;
    autoComplete?: string;
    multiline?: boolean;
  }[] = [
    { name: "name", autoComplete: "name" },
    { name: "email", type: "email", autoComplete: "email" },
    { name: "subject" },
    { name: "message", multiline: true },
  ];

  const statusMessage =
    state.status === "success"
      ? t.contact.success
      : state.status === "tooFast"
        ? t.contact.tooFast
        : state.status === "unavailable"
          ? t.contact.unavailable
          : state.status === "error"
            ? t.contact.error
            : null;

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {fields.map((field) => {
        const invalid = errors.includes(field.name);
        const errorId = `contact-${field.name}-error`;
        const common = {
          id: `contact-${field.name}`,
          name: field.name,
          required: true,
          maxLength: contactLimits[field.name],
          placeholder: t.contact[`${field.name}Placeholder`],
          "aria-invalid": invalid || undefined,
          "aria-describedby": invalid ? errorId : undefined,
          disabled: pending,
        };
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={common.id}>{t.contact[field.name]}</Label>
            {field.multiline ? (
              <Textarea {...common} rows={6} />
            ) : (
              <Input {...common} type={field.type ?? "text"} autoComplete={field.autoComplete} />
            )}
            {invalid ? (
              <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
                <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                {t.contact.errors[field.name]}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech, filled only by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">{t.contact.honeypot}</label>
        <input id="contact-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {statusMessage ? (
          <p
            className={cn(
              "flex items-start gap-2 rounded-lg border p-3 text-sm",
              state.status === "success" ? "border-success/40 text-success" : "border-danger/40 text-danger",
            )}
          >
            {state.status === "success" ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            {statusMessage}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <Send aria-hidden="true" />
        )}
        {pending ? t.contact.sending : t.contact.send}
      </Button>
    </form>
  );
}
