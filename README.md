# Mohamed El Farssi | Portfolio

Bilingual (English / French) portfolio of **Mohamed El Farssi**, junior Cybersecurity & Mobile Developer trained at Zone01 Oujda.

- **Live:** https://mohamed-el-farssi.vercel.app (mock URL, set the real one in `lib/site-config.ts`)
- **Screenshot:** `{{ADD_SCREENSHOT: docs/screenshot.png}}`

## Stack

- Next.js 16 (App Router, React Server Components), React 19, TypeScript `strict`
- Tailwind CSS v4 with CSS variable tokens, shadcn/ui on Radix primitives, lucide-react icons
- next-themes (light / dark / system), Inter + JetBrains Mono through `next/font` (self-hosted)
- zod for content and form validation
- EmailJS REST API for the contact form, called from a server action
- @vercel/analytics (cookieless), deployed on Vercel
- pnpm only, every dependency pinned to an exact version

## Features

- Single-page home: hero, about, target roles, skills, featured projects, education timeline, certifications, contact. Experience and volunteering sections appear automatically once entries exist.
- `/projects` gallery with category tabs, text search on title and technologies, newest first. Filters live in the query string (`/projects?category=security&q=go`).
- `/projects/[slug]` detail pages: highlights, a "Security considerations" panel, tech list, the GitHub README rendered and sanitised, previous / next navigation, per-project Open Graph image.
- English / French UI and content. The locale is stored in a cookie (falling back to `Accept-Language`) and reflected in `<html lang>`.
- "Download CV" downloads the PDF for the current language.
- SEO: per-page metadata, canonical URLs, Open Graph / Twitter cards, `Person` and `SoftwareSourceCode` JSON-LD, sitemap, robots, web manifest, monogram icons.
- Accessibility: skip link, landmarks, one `h1` per page, visible focus rings, labelled icon buttons, keyboard-friendly sheet menu, `prefers-reduced-motion` respected, palette contrast at least 4.5:1 in both themes.

## Security measures

The site is part of the portfolio, so it is hardened like a production app.

- **Strict CSP with per-request nonces** (`proxy.ts`, the Next.js 16 name for `middleware.ts`): `script-src 'self' 'nonce-…' 'strict-dynamic'`, no `unsafe-eval`, no `unsafe-inline` for scripts, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`. Image sources are limited to self and GitHub content hosts.
- **Static headers** (`next.config.ts`): HSTS with preload (2 years), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` disabling camera, microphone, geolocation and more, `Cross-Origin-Opener-Policy: same-origin`, no `X-Powered-By`.
- Target grade: **A+ on [securityheaders.com](https://securityheaders.com)**. Check it after deploying.
- **Contact form hardening:** shared zod schema validated on the client and again on the server, hidden honeypot field, minimum time-to-submit check, max lengths on every field, output rendered only as text. EmailJS is called from the server, never from the browser.
- **README rendering:** `react-markdown` + `rehype-sanitize`, external links get `rel="noopener noreferrer nofollow"`, images outside GitHub hosts are dropped.
- **No tracking** beyond cookieless Vercel Analytics. No IP logging, no geolocation, no third-party scripts.
- `/.well-known/security.txt` (RFC 9116), CI with `pnpm audit --audit-level=high`, Dependabot for npm and GitHub Actions.

> Nonce-based CSP requires dynamic rendering, so pages are server-rendered per request. README fetches are still cached for 24 hours (`revalidate: 86400`).

## Local setup

Requirements: Node.js 20.9+ (CI uses Node 24, see `.nvmrc`) and pnpm 10.

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`.

There are no environment variables. The site URL and EmailJS IDs live in [`lib/site-config.ts`](lib/site-config.ts).

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

1. Import the repository in Vercel (framework preset: Next.js, package manager: pnpm). No environment variables are needed.
2. Set the real domain in `lib/site-config.ts` (`url`).
3. Contact form: create an EmailJS service and template, then paste the service ID, template ID and public key into `lib/site-config.ts`. In EmailJS > Account > Security, enable **"Allow EmailJS API for non-browser applications"** (the form sends from the server). The template can use `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{subject}}` and `{{message}}`. Until the IDs are set, the form tells visitors to email directly.
4. Enable Web Analytics in the Vercel project.
5. After the first deploy, run the domain through securityheaders.com and submit the sitemap in Google Search Console.

## Mock data to replace before sharing

These values are **mock data** so the site looks complete. Replace each one with real information.

| Mock value | Where |
| --- | --- |
| Email `mohamed.elfarssi@example.com` | `data/content.json` (`profile.email`), `public/.well-known/security.txt` |
| Site URL `https://mohamed-el-farssi.vercel.app` | `lib/site-config.ts`, `public/.well-known/security.txt` |
| Availability text (EN + FR) | `data/content.json` (`profile.availability`) |
| French and English levels (B2) | `data/content.json` (`profile.spokenLanguages`) |
| Role and team size of every Zone01 project | `data/content.json` (`projects[].role`, `projects[].teamSize`) |
| Dates of buy-01, deep-in-system, crud-master, wget, make-your-game | `data/content.json` (`projects[].date`) |
| TryHackMe learning paths (4th education entry) | `data/content.json` (`education[3]`) |
| All four certifications (PCAP, TryHackMe rank, hackathon, Cisco) | `data/content.json` (`certifications`) |
| Internship: company name ("Local software company"), month (May 2024) and bullets | `data/content.json` (`experience[0]`) |
| Volunteering: exact association name, start date (Jan 2024, ongoing) and description | `data/content.json` (`volunteering[0]`) |
| EmailJS IDs (empty) | `lib/site-config.ts` |
| Screenshot | this README |

Repository links for buy-01, deep-in-system, crud-master, wget and make-your-game are empty (hidden); add them if the repos are public. Optional profiles (TryHackMe / Hack The Box, Root-Me, store page, phone) are empty, which hides them. Project dates for repositories on GitHub are taken from the repository creation date.
