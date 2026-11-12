# Mohamed El Farssi | Portfolio

Bilingual (English / French) portfolio of **Mohamed El Farssi**, junior Cybersecurity & Mobile Developer trained at Zone01 Oujda.

- **Live:** `https://{{DOMAIN}}`
- **Screenshot:** `{{ADD_SCREENSHOT: docs/screenshot.png}}`

## Stack

- Next.js 16 (App Router, React Server Components), React 19, TypeScript `strict`
- Tailwind CSS v4 with CSS variable tokens, shadcn/ui on Radix primitives, lucide-react icons
- next-themes (light / dark / system), Inter + JetBrains Mono through `next/font` (self-hosted)
- zod for content, environment and form validation
- EmailJS REST API for the contact form, called from a server action
- @vercel/analytics (cookieless), deployed on Vercel
- pnpm only, every dependency pinned to an exact version

## Features

- Single-page home: hero, about, target roles, skills, featured projects, education timeline, certifications, contact. Experience and volunteering sections appear automatically once entries exist.
- `/projects` gallery with category tabs, text search on title and technologies, newest first. Filters live in the query string (`/projects?category=security&q=go`).
- `/projects/[slug]` detail pages: highlights, a "Security considerations" panel, tech list, the GitHub README rendered and sanitised, previous / next navigation, per-project Open Graph image.
- English / French UI and content. The locale is stored in a cookie (falling back to `Accept-Language`) and reflected in `<html lang>`.
- "Download CV" picks the PDF for the current language, falls back to the other language, and shows a disabled "CV coming soon" state if no PDF exists.
- SEO: per-page metadata, canonical URLs, Open Graph / Twitter cards, `Person` and `SoftwareSourceCode` JSON-LD, sitemap, robots, web manifest, monogram icons.
- Accessibility: skip link, landmarks, one `h1` per page, visible focus rings, labelled icon buttons, keyboard-friendly sheet menu, `prefers-reduced-motion` respected, palette contrast at least 4.5:1 in both themes.

## Security measures

The site is part of the portfolio, so it is hardened like a production app.

- **Strict CSP with per-request nonces** (`proxy.ts`, the Next.js 16 name for `middleware.ts`): `script-src 'self' 'nonce-…' 'strict-dynamic'`, no `unsafe-eval`, no `unsafe-inline` for scripts, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`. Image sources are limited to self and GitHub content hosts.
- **Static headers** (`next.config.ts`): HSTS with preload (2 years), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` disabling camera, microphone, geolocation and more, `Cross-Origin-Opener-Policy: same-origin`, no `X-Powered-By`.
- Target grade: **A+ on [securityheaders.com](https://securityheaders.com)**. Check it after deploying.
- **Contact form hardening:** shared zod schema validated on the client and again on the server, hidden honeypot field, minimum time-to-submit check, max lengths on every field, output rendered only as text. EmailJS keys are server-only and never reach the browser.
- **README rendering:** `react-markdown` + `rehype-sanitize`, external links get `rel="noopener noreferrer nofollow"`, images outside GitHub hosts are dropped.
- **No tracking** beyond cookieless Vercel Analytics. No IP logging, no geolocation, no third-party scripts.
- `/.well-known/security.txt` (RFC 9116), CI with `pnpm audit --audit-level=high`, Dependabot for npm and GitHub Actions.

> Nonce-based CSP requires dynamic rendering, so pages are server-rendered per request. README fetches are still cached for 24 hours (`revalidate: 86400`).

## Local setup

Requirements: Node.js 20.9+ (CI uses Node 24, see `.nvmrc`) and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # fill in the values
pnpm dev                     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`.

## Editing content

All content lives in [`data/content.json`](data/content.json), validated by the zod schema in [`lib/schema.ts`](lib/schema.ts). A malformed entry fails `pnpm build` with a precise error. UI strings live in [`lib/i18n.ts`](lib/i18n.ts) (every key in EN and FR).

### Add a project

1. Add an entry to `projects` in `data/content.json` with a unique kebab-case `slug`, `en` and `fr` text, and categories from: `security`, `mobile`, `fullStack`, `backEnd`, `frontEnd`, `systems`.
2. Optional: put an image in `public/images/projects/` and set `"image": "/images/projects/<file>"`.
3. Set `github` to the repository URL; its README is fetched and rendered automatically (or set `readmeUrl` explicitly).
4. Run `pnpm build`. The schema and the sitemap route check must pass.

Order in the array controls the featured order on the home page (first six with `isFeatured: true`). A project whose title is still a `{{placeholder}}` is a draft: visible in development, hidden in production.

### Add the CV

Drop `mohamed-el-farssi-cv-en.pdf` and `mohamed-el-farssi-cv-fr.pdf` into `public/cv/` and rebuild.

## Deploy on Vercel

1. Import the repository in Vercel (framework preset: Next.js, package manager: pnpm).
2. Set these environment variables (Production and Preview):

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://{{DOMAIN}}` (no trailing slash) |
| `EMAILJS_SERVICE_ID` | EmailJS > Email Services |
| `EMAILJS_TEMPLATE_ID` | EmailJS > Email Templates |
| `EMAILJS_PUBLIC_KEY` | EmailJS > Account > General |
| `EMAILJS_PRIVATE_KEY` | EmailJS > Account > General |

3. In EmailJS: Account > Security, enable **"Allow EmailJS API for non-browser applications"** (the form sends from the server). The template can use `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{subject}}` and `{{message}}`.
4. Enable Web Analytics in the Vercel project.
5. After the first deploy, run the domain through securityheaders.com and submit the sitemap in Google Search Console.

## Placeholders still to fill

| Placeholder | Where |
| --- | --- |
| `{{EMAIL}}` | `data/content.json` (`profile.email`), `public/.well-known/security.txt` |
| Availability (`{{e.g. Available immediately…}}`, EN + FR) | `data/content.json` (`profile.availability`) |
| French and English levels (`{{LEVEL}}`) | `data/content.json` (`profile.spokenLanguages`) |
| `{{DOMAIN}}` | `public/.well-known/security.txt`, this README, `NEXT_PUBLIC_SITE_URL` |
| CV PDFs (EN + FR) | `public/cv/` |
| Role and team size (`{{CONFIRM}}`) for every Zone01 project | `data/content.json` (`projects[].role`, `projects[].teamSize`) |
| Dates for buy-01, deep-in-system, crud-master, wget, make-your-game (`{{CONFIRM}}`) | `data/content.json` (`projects[].date`) |
| Repository URLs for buy-01, deep-in-system, crud-master, wget, make-your-game (`{{REPO_URL_OR_EMPTY_IF_PRIVATE}}`, use `""` if private) | `data/content.json` (`projects[].github`) |
| Fourth education entry (security or mobile certification track) | `data/content.json` (`education[3]`), remove it if not applicable |
| Certifications (`{{CERT_NAME}}`, `{{ISSUER}}`, `{{DATE}}`, `{{CREDENTIAL_URL}}`) | `data/content.json` (`certifications`) |
| Optional profiles: TryHackMe / Hack The Box, Root-Me, store page, phone | `data/content.json` (`profile.socials`, `profile.phone`), empty means hidden |
| Screenshot | this README |

Project dates for repositories on GitHub are taken from the repository creation date. Adjust them if a project started earlier.
