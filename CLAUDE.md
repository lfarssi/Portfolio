# CLAUDE.md

@AGENTS.md

Personal portfolio of Mohamed El Farssi, junior Cybersecurity & Mobile Developer (Zone01 Oujda, ISTA Berkane). Goal: get recruiters to contact him or download his CV.

## Git rules (mandatory)
- Never author a commit. All commits use the configured git identity: {{GIT_AUTHOR_NAME}} <{{GIT_AUTHOR_EMAIL}}> (fallback: existing `git config user.name/user.email`, never changed).
- Never add Co-Authored-By, "Generated with", Claude/AI mentions, session links or any attribution to commits, PRs, code or docs.
- Never use --author, never edit git config identity, never rewrite history you did not just create.
- Conventional Commits, imperative, subject under 72 chars.
- Do not push or open PRs unless asked.

## Stack
Next.js App Router, TypeScript strict, Tailwind v4, shadcn/ui, next-themes, pnpm only, exact version pins, EmailJS, @vercel/analytics. Deploy: Vercel.

## Commands
- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint` / `pnpm typecheck` (run both before every commit; build must pass)

## Where things live
- Content: `data/content.json` (validated by `lib/schema.ts`, types in `lib/types.ts`, getters in `lib/content.ts`)
- UI strings: `lib/i18n.ts` (EN + FR, every key in both)
- Site settings (URL, EmailJS IDs): `lib/site-config.ts` (no environment variables)
- Sections: `components/sections/*`, projects UI: `components/projects/*`
- Security headers: `next.config.*`; CSP nonce: `proxy.ts` (Next 16 name for `middleware.ts`; no other logic)

## How to add a project
1. Add an entry to `projects` in `data/content.json` (unique kebab-case `slug`, EN and FR text, categories from the allowed list).
2. Put the image in `public/images/projects/`.
3. Run `pnpm build`; the schema and sitemap check must pass.

## Conventions
- Never use the em-dash character in content or UI copy.
- Every user-facing string exists in EN and FR.
- No tracking beyond @vercel/analytics; no secrets in code; no `ignoreBuildErrors`.
- Palette tokens only (navy + teal, no orange); no hardcoded hex in components.
- Keep motion subtle and respect prefers-reduced-motion.
- WCAG 2.2 AA, Lighthouse 95+.
- Placeholders use `{{...}}` and must be listed in README before release.
