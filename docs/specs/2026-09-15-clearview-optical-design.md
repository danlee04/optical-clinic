# Clearview Optical Clinic — Website Design Spec

- **Date:** 2026-09-15
- **Status:** Approved
- **Type:** Portfolio project, production quality
- **Brand name:** "Clearview Optical Clinic" (placeholder, lives in `src/content/site.ts`)

## 1. Goal and scope

A static, UI-focused information website for a fictional multi-branch optical
clinic in the Philippines. The point is to show strong frontend engineering:
polished visual design, motion, responsiveness, accessibility, SEO and
performance.

### In scope

- Public pages: Home, Services (list + detail), Branches (list + detail),
  Optometrists, About, FAQ, Contact, 404
- Multiple branches, each with its own hours, services, optometrists, photos
  and contact channels
- Content stored as typed TypeScript data files (no database, no CMS)
- Contact form sent through Web3Forms, plus per-branch quick-contact buttons
- Static export deployed to Vercel

### Out of scope

- Booking or appointment system
- Patient accounts, login, prescription records
- Admin panel or CMS (content changes are code changes)
- Eyewear orders or inventory
- Backend, database, server-side rendering at request time
- Dark mode (possible later addition)

## 2. Decisions log

| Decision | Choice | Reason |
|---|---|---|
| Project type | Portfolio, production quality | Freedom on scope, must be deployable |
| Clinic model | Single brand, multiple branches | More realistic content modeling than one location |
| Rendering | Next.js App Router, `output: 'export'` | Pre-rendered HTML for SEO, strong ecosystem, no server |
| Content source | Typed TS files in `src/content/` | Static site, type-checked, testable |
| UI libraries | shadcn/ui base + Aceternity UI / Magic UI + Motion + Embla + Lucide | One base system plus specialized pieces; no second full component library |
| Visual style | Warm Boutique Optical | Distinctive while keeping healthcare credibility |
| Contact | Web3Forms form + quick-contact buttons | Working form without a backend; Messenger/Viber/call match PH habits |
| Hosting | Vercel (Hobby) | Free, HTTPS, preview URL per PR; `/out` is portable to any static host |

## 3. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, `output: 'export'` |
| Language | TypeScript `strict`, React 19 |
| Styling | Tailwind CSS v4 with design tokens in `@theme` |
| Components | shadcn/ui; Magic UI (Number Ticker, Bento Grid, Marquee); Aceternity UI where a signature effect is needed |
| Animation | Motion (`motion/react`) |
| Carousel | Embla Carousel (via shadcn carousel) |
| Icons | Lucide |
| Forms | React Hook Form + Zod |
| Map | react-leaflet + OpenStreetMap tiles |
| Fonts | `next/font/google`: Fraunces (display), Inter (body) |
| Unit/component tests | Vitest + React Testing Library |
| E2E / a11y | Playwright + @axe-core/playwright |
| Performance | Lighthouse CI |
| Lint/format | ESLint (`next/core-web-vitals`, `jsx-a11y`), Prettier + Tailwind plugin, Husky + lint-staged |
| CI | GitHub Actions |

## 4. Architecture

```
src/content/*.ts  (typed data)
        │
        ▼
Server Components ──► next build ──► out/*.html (one HTML file per route)
        │
        └── 'use client' islands, hydrated in the browser:
            motion sections, carousels, marquee, OpenNowBadge,
            HoursTable "today" highlight, BranchMap, ContactForm

ContactForm ──► POST https://api.web3forms.com/submit ──► clinic email
```

Principles:

1. Pages are Server Components by default. Only interactive parts use
   `'use client'`, keeping the JS bundle small.
2. Pages read content only through `src/lib/content.ts`, never by importing
   raw arrays and filtering inline. This keeps lookups in one tested place.
3. Pure logic (hours, validation, content lookups) lives in `src/lib/` with no
   React imports, so it is unit-testable.

### Folder structure

```
src/
  app/
    layout.tsx                  fonts, root metadata, Navbar, Footer
    page.tsx                    Home
    services/page.tsx
    services/[slug]/page.tsx
    branches/page.tsx
    branches/[slug]/page.tsx
    optometrists/page.tsx
    about/page.tsx
    faq/page.tsx
    contact/page.tsx
    privacy/page.tsx            privacy notice linked from the contact form
    not-found.tsx
    sitemap.ts
    robots.ts
  content/
    site.ts  branches.ts  services.ts  optometrists.ts  faqs.ts  testimonials.ts
  lib/
    types.ts                    content interfaces
    content.ts                  lookup helpers
    hours.ts                    opening-hours logic (Asia/Manila)
    contact.ts                  Zod schema + submitInquiry()
    seo.ts                      metadata + JSON-LD builders
  components/
    ui/                         shadcn primitives
    layout/                     Navbar, MobileNav, Footer, Container
    sections/                   Hero, TrustBar, ServiceGrid, WhyChooseUs,
                                BranchCards, OptometristCarousel,
                                Testimonials, FaqTeaser, CtaBand
    branch/                     OpenNowBadge, HoursTable, BranchMap,
                                BranchGallery, MobileContactBar
    contact/                    ContactForm, QuickContactButtons
public/images/                  pre-optimized WebP/AVIF assets
tests/e2e/                      Playwright specs
docs/specs/                     this document
```

## 5. Content model

```ts
export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type DayHours = { open: string; close: string } | null; // "09:00", "18:00"; null = closed

export interface Branch {
  slug: string;
  name: string;
  address: string;
  city: string;
  phone: string;              // E.164, e.g. "+639171234567"
  email: string;
  messengerUrl?: string;      // "https://m.me/<page>"
  viber?: string;             // E.164
  coordinates: { lat: number; lng: number };
  hours: Record<DayKey, DayHours>;
  serviceSlugs: string[];
  optometristSlugs: string[];
  images: { src: string; alt: string; width: number; height: number }[];
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;        // plain paragraphs, no raw HTML
  durationMinutes: number;
  priceFrom?: number;         // PHP
  icon: string;               // Lucide icon name
  image: { src: string; alt: string; width: number; height: number };
}

export interface Optometrist {
  slug: string;
  name: string;
  credentials: string;        // "OD"
  prcLicenseNo?: string;
  bio: string;
  photo: { src: string; alt: string; width: number; height: number };
  branchSlugs: string[];
}

export interface Faq { id: string; category: string; question: string; answer: string; }
export interface Testimonial { id: string; author: string; content: string; rating: 1 | 2 | 3 | 4 | 5; }
```

Relationships use slugs. Branch ↔ optometrist is stored on both sides
(`optometristSlugs` and `branchSlugs`); a content-integrity test fails if the
two sides disagree.

`lib/content.ts` exposes at least: `getBranches()`, `getBranchBySlug()`,
`getServices()`, `getServiceBySlug()`, `getServicesForBranch()`,
`getBranchesForService()`, `getOptometrists()`, `getOptometristsForBranch()`,
`getFaqsByCategory()`. Lookups by unknown slug return `undefined`; pages call
`notFound()` in that case.

Seed content: 3 branches (e.g. Makati, Quezon City, Pasig), 8 services, 6
optometrists, ~12 FAQs, ~8 testimonials, all realistic but fictional.

### Static export constraints

| Constraint | Handling |
|---|---|
| No image optimization server | `images.unoptimized: true`; images pre-optimized to WebP/AVIF; explicit `width`/`height` |
| Dynamic routes must be known at build | `generateStaticParams()` + `export const dynamicParams = false` |
| "Open now" would be frozen at build time | Computed in the browser; server render shows a neutral placeholder to avoid hydration mismatch |
| Leaflet needs `window` | Loaded via `next/dynamic` with `ssr: false` and a skeleton |
| No server form handling | Web3Forms (section 7) |
| `next.config` headers not applied | Security headers set in `vercel.json` (section 10) |
| No server for CSP nonces | Header CSP plus a build-time `<meta>` CSP with script hashes (section 10) |

## 6. Pages and UI system

### Sitemap

`/`, `/services`, `/services/[slug]`, `/branches`, `/branches/[slug]`,
`/optometrists`, `/about`, `/faq`, `/contact`, `/privacy`, 404.

### Page composition

| Page | Sections | Notes |
|---|---|---|
| Home | Hero, TrustBar (Number Ticker), featured ServiceGrid, WhyChooseUs (Bento Grid), BranchCards with OpenNowBadge, OptometristCarousel, Testimonials (Marquee, pauses on hover), FaqTeaser (top 4), CtaBand | Hero is the page's signature animation |
| Services list | Intro, full ServiceGrid | |
| Service detail | Hero image, description, duration and "starts at ₱", "Available at" branch list, related services, CTA to Contact | |
| Branches list | BranchCards with OpenNowBadge, overview map of all branches | |
| Branch detail | BranchGallery, address + BranchMap, HoursTable highlighting today, services offered, optometrists, QuickContactButtons, MobileContactBar (Call + Directions, mobile only) | Includes JSON-LD `Optician` |
| Optometrists | Card grid with client-side branch filter tabs | |
| About | Story, values, stats | |
| FAQ | Accordion grouped by category | Includes JSON-LD `FAQPage` |
| Contact | ContactForm, branch directory with QuickContactButtons | Reads `?branch=<slug>` to preselect |
| Privacy | Privacy notice (RA 10173) | Static text |
| 404 | Branded message, links to Home, Services, Branches | |

### Design tokens

```css
@theme {
  --color-cream: #FAF7F2;      /* page background */
  --color-sand: #EFE8DD;       /* surfaces, cards */
  --color-teal: #0F4C4A;       /* primary, headings */
  --color-teal-soft: #2E7270;  /* hover */
  --color-amber: #E8A95B;      /* accent, CTAs */
  --color-ink: #1F2A2A;        /* body text */
  --font-display: "Fraunces", serif;
  --font-sans: "Inter", sans-serif;
  --radius-card: 1.25rem;
}
```

shadcn CSS variables (`--background`, `--primary`, `--accent`, ...) map to
these tokens. All text/background pairs must meet WCAG AA contrast; amber is
used as a fill or accent, never for small text on cream.

### Motion rules

1. One signature animation per page; everything else is a subtle
   fade/slide-up on scroll.
2. Durations 200–600 ms, ease-out. No infinite animations except the
   testimonial marquee.
3. `prefers-reduced-motion: reduce` disables motion and shows final states.
4. Animate only `transform` and `opacity`.

### Quality targets

- Mobile-first; verified at 320, 375, 768, 1024, 1280, 1920 px; no
  horizontal page scroll
- Lighthouse ≥ 90 in all four categories on Home, a Branch detail and Contact
- WCAG 2.1 AA: keyboard navigation, visible focus, alt text, labelled
  controls, touch targets ≥ 44 px
- SEO: per-page `metadata` (title, description, canonical, Open Graph),
  `sitemap.xml`, `robots.txt`, JSON-LD as listed above

## 7. Contact form

### Fields

| Field | Rule |
|---|---|
| `name` | required, 2–100 chars |
| `email` | required, valid email |
| `phone` | optional; `09XXXXXXXXX` or `+639XXXXXXXXX` |
| `branch` | required; one of the branch slugs; preselected from `?branch=` |
| `subject` | required; General inquiry, Eye exam, Contact lenses, Eyewear, Other |
| `message` | required, 10–1000 chars, with character counter |
| `consent` | required checkbox, links to `/privacy` |
| `botcheck` | hidden honeypot, must be empty |

The Zod schema lives in `lib/contact.ts` and is the single source of truth for
both client validation and the submitted payload.

### Flow

1. Validate on blur, re-validate on change.
2. Invalid submit: inline errors and focus moves to the first invalid field.
3. Valid submit: button disabled with "Sending..." state.
4. `submitInquiry()` POSTs JSON to `https://api.web3forms.com/submit` with
   `access_key`, the form fields, and email subject
   `[Clearview – {Branch}] {Subject} – {Name}`. Timeout 10 s via
   `AbortController`.
5. Success: replace the form with a success card naming the branch; form
   resets.
6. Failure (non-success response, network error or timeout): error alert with
   "Try again" and the selected branch's phone number as fallback. Entered
   values are kept.

`NEXT_PUBLIC_WEB3FORMS_KEY` is public by design; the Web3Forms dashboard
restricts it to the production domain. No form data is logged to the console
or sent to analytics.

Security and privacy rules for the form:

- `?branch=` is only used if it matches a known branch slug; the raw value is
  never rendered.
- `\r` and `\n` are stripped from `name` before it goes into the email subject.
- The form shows a note asking visitors not to include prescriptions or medical
  details (health data is sensitive personal information under RA 10173).
- After a successful submit, the submit button has a 30 s cooldown. This is UX
  only; real abuse protection is Web3Forms spam filtering/captcha plus the
  honeypot.

### Quick contact buttons

| Button | Link | Shown when |
|---|---|---|
| Call | `tel:{phone}` | always |
| Messenger | `messengerUrl` | `messengerUrl` set |
| Viber | `viber://chat?number={viber}` | `viber` set, on touch devices |
| Email | `mailto:{email}` | always |
| Directions | `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}` | always |

Each has an `aria-label` naming the branch (e.g. "Call Makati branch").
External links use `target="_blank" rel="noopener noreferrer"`.

## 8. Testing and quality

| Layer | Tool | Must cover |
|---|---|---|
| Unit | Vitest | `hours.ts`: open, closed, closed day, exactly at open, exactly at close (treated as closed), midnight rollover, Asia/Manila regardless of machine timezone. Content integrity: unique slugs, all referenced slugs exist, branch ↔ optometrist links agree on both sides, phone formats valid. Contact schema: valid and invalid inputs. |
| Component | Vitest + RTL | ContactForm: errors, disabled while sending, success, failure keeps values (mocked `fetch`). OpenNowBadge with mocked time. QuickContactButtons hides optional channels. |
| E2E | Playwright | Every route loads with no console errors. Home → Branch detail → "Contact this branch" preselects branch. Mobile nav opens/closes. Form submit against a mocked Web3Forms route. Unknown slug returns 404 page. |
| Accessibility | @axe-core/playwright | No serious or critical violations on any route |
| Performance | Lighthouse CI | Scores ≥ 90 on Home, one Branch detail, Contact |

Code quality: TypeScript `strict` with `tsc --noEmit`; ESLint and Prettier;
Husky + lint-staged on pre-commit.

CI (GitHub Actions) on every push and PR:

```
npm ci → npm audit --audit-level=high → gitleaks → lint → tsc --noEmit
→ vitest → next build → csp-hash → serve out/ → playwright + axe
→ lighthouse ci
```

Any failing step blocks merging into `main`. A second workflow runs the
Playwright header/CSP checks against the Vercel preview URL (section 10).

## 9. Development workflow and deployment

### Local

- Project path: `C:\laragon\www\optical-clinic`
- `npm run dev` → `http://localhost:3000` (Node only, Laragon not required)
- `.env.local` holds `NEXT_PUBLIC_WEB3FORMS_KEY`; `.env.example` is committed

### Git

- `main` is always deployable
- Feature branches (`feat/hero`, `feat/contact-form`, `fix/...`)
- Conventional commits (`feat:`, `fix:`, `test:`, `chore:`, `docs:`)
- PR → CI green → merge

### Deployment (Vercel)

- GitHub repo connected to Vercel; push to `main` deploys production, each PR
  gets a preview URL
- `NEXT_PUBLIC_WEB3FORMS_KEY` set in Vercel project environment variables
- `vercel.json` sets the security headers in section 10
- Custom domain optional; `*.vercel.app` is acceptable
- The `out/` folder is plain static files and can move to Netlify or
  Cloudflare Pages without code changes (headers must then be re-created in
  that host's config)

## 10. Security

### Threat model

No server, database or login, so server-side classes (SQL injection, RCE,
session hijacking) do not apply. Remaining risks:

| Risk | Entry point | Mitigation |
|---|---|---|
| XSS / injected script | JSON-LD, `?branch=`, content URLs | CSP with script hashes; escaped JSON-LD; slug whitelist; URL scheme tests |
| Clickjacking | Site framed by another origin | `frame-ancestors 'none'`, `X-Frame-Options: DENY` |
| Form spam / abuse | Public Web3Forms key | Domain restriction, spam filter/captcha, honeypot |
| Personal data exposure | Contact form | Data minimization, privacy notice, no logging |
| Supply chain | npm, copy-paste components, GitHub Actions | Lockfile, audit, Dependabot, pinned actions, code review |
| Account takeover | GitHub, Vercel, registrar | 2FA, branch protection, registrar lock |
| Misconfiguration | Previews, env vars, source maps | Preview protection, `noindex`, no secrets in `NEXT_PUBLIC_*` |

### Headers (`vercel.json`, all routes)

| Header | Value |
|---|---|
| `Content-Security-Policy` | see below |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (custom domain only) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (OSM tiles require a referer) |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `X-Frame-Options` | `DENY` |

Preview deployments additionally send `X-Robots-Tag: noindex`.

### Content Security Policy

Next.js emits inline `<script>` tags in every page, and nonces need a server,
so CSP is enforced in two layers. Browsers enforce every policy present, so a
script must pass both.

**Layer A — HTTP header:**

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://tile.openstreetmap.org;
font-src 'self';
connect-src 'self' https://api.web3forms.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests
```

**Layer B — build-time `<meta>` CSP:** `scripts/csp-hash.mjs` runs after
`next build`, reads every `out/**/*.html`, computes the `sha256` of each inline
script and injects
`<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'sha256-…'">`
as the first element of `<head>`. Only inline scripts produced by the build can
run.

Accepted trade-offs: `style-src 'unsafe-inline'` (Motion and Leaflet set inline
styles). Fonts are self-hosted by `next/font`; Leaflet CSS and marker icons are
bundled locally, never loaded from a CDN.

### Code rules

1. No `dangerouslySetInnerHTML` except JSON-LD, which goes through one helper in
   `lib/seo.ts` that escapes `<` as `<`.
2. `?branch=` is validated against branch slugs (section 7).
3. Content-integrity tests: `messengerUrl` must be `https://`; no
   `javascript:` or `data:` URLs anywhere in content.
4. External links use `rel="noopener noreferrer"`.
5. `productionBrowserSourceMaps` stays off.
6. Only `NEXT_PUBLIC_WEB3FORMS_KEY` exists; no real secret is ever placed in a
   `NEXT_PUBLIC_*` variable. `.env*.local` is gitignored.

### Supply chain and CI

- `package-lock.json` committed; CI uses `npm ci`
- `npm audit --audit-level=high` and `gitleaks` in CI
- Dependabot for npm and GitHub Actions (weekly)
- Workflows declare `permissions: contents: read`; third-party actions pinned
  to commit SHAs
- Copy-paste components (shadcn, Aceternity, Magic UI) are read before commit
- New dependencies need a reason a few lines of own code can't cover
- Next.js and React kept on current patch releases

### Accounts, deployment and domain

- 2FA on GitHub, Vercel and the domain registrar
- Branch protection on `main`: PR required, CI must pass, no force push
- Vercel Deployment Protection (Vercel Authentication) on previews
- Custom domain: registrar lock, CAA record, HSTS; SPF/DKIM/DMARC if the domain
  sends email
- `public/.well-known/security.txt` with a contact address

### Verification

| Check | How |
|---|---|
| Headers | securityheaders.com and Mozilla HTTP Observatory on production: grade A or better |
| CSP in practice | Playwright against the Vercel preview URL fails on any CSP violation in the console |
| CSP hash script | Unit test: fixture HTML gets a meta tag with the correct hashes |
| JSON-LD escaping | Unit test: content containing `</script>` cannot close the tag |
| Secrets | gitleaks passes; no non-public keys found in `out/` |
| Dependencies | `npm audit` reports no high or critical issues |

## 11. Milestones

| # | Milestone | Done when |
|---|---|---|
| M0 | Setup | Next.js + TS + Tailwind v4 + shadcn initialized; ESLint/Prettier/Husky; Vitest and Playwright running; CI green (incl. `npm audit`, gitleaks, least-privilege permissions); Dependabot on; 2FA on GitHub/Vercel; branch protection on `main`; repo on GitHub; placeholder page live on Vercel |
| M1 | Design system | Tokens and fonts applied; Navbar with mobile menu, Footer, Container, SectionHeading; button and card variants |
| M2 | Content layer | `types.ts`, all content files with seed data, `content.ts`, `hours.ts`; unit and integrity tests (incl. URL scheme checks) pass |
| M3 | Home | All Home sections built and following motion rules |
| M4 | Services and Optometrists | List and detail pages with static params and 404 for unknown slugs |
| M5 | Branches | List and detail with HoursTable, OpenNowBadge, BranchMap, QuickContactButtons, MobileContactBar |
| M6 | About, FAQ, Contact, Privacy | Contact form end-to-end with Web3Forms; `?branch=` whitelist, CRLF strip, privacy note, Web3Forms domain restriction; component and e2e tests pass |
| M7 | Polish | Metadata, OG images, sitemap, robots, JSON-LD via escaped helper (tested); axe clean; Lighthouse ≥ 90; responsive QA at all listed widths |
| M8 | Launch | `vercel.json` headers; `csp-hash` script with tests; preview protection + `noindex`; Playwright CSP check on preview passes; Observatory grade A or better; `security.txt`; README with screenshots and stack notes |
