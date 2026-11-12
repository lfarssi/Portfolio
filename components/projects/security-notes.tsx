import { ShieldCheck } from "lucide-react";

export function SecurityNotes({ title, notes }: { title: string; notes: string[] }) {
  if (notes.length === 0) return null;

  return (
    <section
      aria-labelledby="security-notes-title"
      className="rounded-xl border border-primary/40 bg-primary-soft/60 p-5 sm:p-6"
    >
      <h2 id="security-notes-title" className="flex items-center gap-2 text-base font-semibold sm:text-lg">
        <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-6">
            <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
