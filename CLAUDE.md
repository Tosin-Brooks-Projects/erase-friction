# CLAUDE.md — Project Intelligence File

## 🧠 About This File
This file gives Claude Code full context on how this project should be built, maintained, and extended. Read this before writing any code.

---

## 🏗️ Project Overview
- **Project Name:** erase friction
- **Purpose / Problem It Solves:** Agency landing page — attracts businesses drowning in manual work and converts them into leads via a contact form
- **Target Audience:** Small-to-mid-sized businesses with repetitive manual workflows (data entry, handoffs, document processing)
- **Primary URL / Domain:** erasefriction.com
- **Live or In Development:** Live

---

## ⚙️ Tech Stack
- **Framework:** Next.js (App Router, TypeScript) — migrated from static HTML July 2026, see `MIGRATION.md`
- **Forms:** `POST /api/lead` route handler → Google Sheet (service account) + Resend email
- **Email:** Resend, from `brooks@erasefriction.com` (domain verified)
- **Analytics:** GA4 (`G-V6HBH3FB5B`), gtag in the root layout
- **Deployment:** Vercel (`main` = production, branches = previews)
- **Version Control:** GitHub

---

## 🗂️ Architecture Rules
- **Keep it lean** — marketing site first. No state management, no database, no auth until a feature genuinely needs it.
- **All form handling goes through `/api/lead`** — validation, honeypot + minimum-time spam gates, Sheet write, email. The Sheet write is the system of record; email sends are best-effort and must never lose a logged lead.
- **Secrets live in env vars only** (`.env.local` locally, Vercel project settings in prod — see `.env.example`). Nothing sensitive in the repo, ever.
- Global styles in `app/globals.css` (ported verbatim from the old inline stylesheet) — no CSS framework.

---

## 📁 Project Structure
```
/
├── app/
│   ├── layout.tsx             # fonts, GA4, favicon
│   ├── globals.css            # entire design system (ported from the old inline CSS)
│   ├── page.tsx               # landing page
│   ├── privacy/page.tsx       # privacy policy
│   ├── terms/page.tsx         # terms of service
│   ├── thank-you/page.tsx     # post-signup: PDF cover + view/download (noindex)
│   ├── digital-employees/page.tsx   # sales page: hire a digital teammate
│   └── api/lead/route.ts      # all forms: validate → Sheet → email
├── components/
│   ├── SiteChrome.tsx         # header, footer, wordmark
│   ├── ContactForm.tsx        # client component
│   ├── ChecklistForm.tsx      # client component
│   ├── HireForm.tsx           # client component (/digital-employees)
│   ├── LegalShell.tsx         # shared frame for privacy/terms
│   └── Year.tsx               # client-side footer year
├── lib/
│   ├── leads.ts               # FORMS config + Sheet append (googleapis)
│   └── email.ts               # Resend: checklist delivery + owner notification
├── public/                    # favicon, photos (webp), PDF, cover, og-image, robots, sitemap
├── scripts/                   # RETIRED Apps Script pipeline, kept as reference
├── next.config.ts             # security headers (CSP, PDF noindex, caching)
├── MIGRATION.md               # what moved, what died, cutover checklist
├── Brooks.png / Tosin.png / Kea.png   # 800px photo sources (not served)
├── logo*.png / logo*.svg      # brand assets (not served)
└── CLAUDE.md
```

The three `.png` team photos are **sources, not assets** — pages reference the
`.webp` versions in `public/`. Re-export at 220×220 if a photo changes.

---

## 📱 Mobile-First Design — NON-NEGOTIABLE
- **Always design mobile-first**, then scale up to desktop
- Use responsive breakpoints: `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`
- Touch targets must be at least **44x44px**
- No horizontal scroll on any screen size
- Test every UI component at 375px (iPhone SE) and 1440px (desktop)
- Use `clamp()` for fluid typography scaling
- Images must use `srcset` or lazy loading
- Navigation must be usable with one thumb on mobile

---

## ⚡ Performance Checklist
Run through this before any deploy:

- [ ] Lighthouse score **≥ 90** on Performance, Accessibility, Best Practices, SEO
- [ ] Images optimized (WebP format, correct sizing, lazy loaded)
- [ ] No unused CSS or JavaScript shipped to the client
- [ ] Fonts loaded with `font-display: swap` or preloaded
- [ ] API responses cached where appropriate
- [ ] Code splitting / lazy loading applied to large route components
- [ ] Bundle size analyzed — no unnecessary dependencies
- [ ] Database queries use indexes where needed
- [ ] Third-party scripts loaded asynchronously or deferred
- [ ] Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 🔍 SEO Checklist
Every page must have:

- [ ] Unique `<title>` tag (50–60 chars)
- [ ] Unique `<meta name="description">` (150–160 chars)
- [ ] Proper heading hierarchy (`h1` → `h2` → `h3`)
- [ ] One `<h1>` per page only
- [ ] Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`)
- [ ] All images have descriptive `alt` text
- [ ] Canonical URL tag on every page
- [ ] Open Graph tags for social sharing (`og:title`, `og:description`, `og:image`)
- [ ] `robots.txt` and `sitemap.xml` in place
- [ ] URLs are human-readable and hyphenated (no `?id=123`)
- [ ] Internal linking between related pages
- [ ] Schema markup where appropriate (LocalBusiness, Article, etc.)
- [ ] No duplicate content across pages
- [ ] Page loads fast enough not to hurt SEO ranking (see Performance above)

---

## ♿ Accessibility (a11y) Checklist
- [ ] All interactive elements are keyboard-navigable
- [ ] Focus states are visible (never `outline: none` without replacement)
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] ARIA labels on icon-only buttons
- [ ] Forms have proper `<label>` associations
- [ ] Error messages are descriptive and announced to screen readers
- [ ] Skip-to-content link at top of page

---

## 🔐 Security Checklist
- [ ] No API keys, tokens, or secrets in frontend code or Git history
- [ ] All environment variables documented in `.env.example`
- [ ] Authentication required on all protected routes
- [ ] Input sanitized and validated on the backend
- [ ] CORS configured to allow only trusted origins
- [ ] HTTP headers hardened (use Helmet.js on Node backend)
- [ ] Rate limiting on API endpoints
- [ ] Dependencies audited with `npm audit` before deploy

---

## 🧩 Component & Code Standards
- Components are small, focused, and reusable — one responsibility each
- File names use `PascalCase` for components, `camelCase` for utilities
- Avoid prop drilling deeper than 2 levels — use Context or state management
- All `useEffect` dependencies are correctly specified
- No `console.log` statements in production code
- Error boundaries used around major sections
- Loading and error states handled for every async operation

---

## 🌿 Git Workflow
- `main` branch is always production-ready
- Feature work done in branches: `feature/short-description`
- Bug fixes: `fix/short-description`
- Always run `git pull` before starting new work with collaborators
- Commit messages are descriptive: `add user auth flow` not `fix stuff`
- Never commit `.env` files or `node_modules`

---

## 🚀 Pre-Deploy Checklist
Before pushing to production:

- [ ] All environment variables set in Vercel / Railway dashboards
- [ ] Lighthouse audit run and scores acceptable
- [ ] Mobile view tested at 375px
- [ ] No broken links or 404s
- [ ] Forms tested end-to-end
- [ ] Auth flows tested (login, logout, protected routes)
- [ ] Error states tested (what happens when API is down?)
- [ ] `npm audit` run — no critical vulnerabilities
- [ ] All console errors resolved

---

## 🧪 Testing Strategy
- No automated tests — static site with no logic to unit-test
- Manual QA before any deploy: open in Chrome + Safari, test the contact form end-to-end, check mobile at 375px
- Verify Netlify form submissions appear in the Netlify dashboard after deploying form changes

---

## 🚨 Monitoring
- No error logging needed — static site with no server-side logic
- Set up **uptime monitoring** via UptimeRobot (free tier) pointing at erasefriction.com
- Monitor Netlify form submissions — check the Netlify dashboard regularly for new leads

## 📊 Analytics (GA4)
- **Property:** `G-V6HBH3FB5B`. The gtag snippet is in the `<head>` of all four pages (index, thank-you, privacy, terms).
- **Events:** `generate_lead` fires on successful submit of either form, distinguished by the `form_name` param (`contact` | `checklist`). `form_error` fires on a failed submit, same param. The checklist event uses beacon transport + an `event_callback`/400ms-timeout redirect so tracking never blocks or is lost to the `/thank-you` navigation — keep that pattern if the handler changes.
- **CSP:** GA required `script-src` (googletagmanager.com), `connect-src` (google-analytics wildcards incl. regional endpoints), and `img-src` additions in `netlify.toml`. If GA ever stops reporting, check the CSP first — it fails silently.
- **In the GA4 UI:** mark `generate_lead` as a key event (Admin → Events) once it first appears, so form fills count as conversions.
- Privacy policy discloses GA (cookies section + processor table). **No ads/remarketing features are enabled — if that ever changes, the privacy policy and the cookie-banner decision must be revisited.**

---

## 📨 Forms
All forms POST JSON to **`/api/lead`** with a `form` discriminator (`contact` | `checklist` | `hire`). Adding a form = one entry in `FORMS` (`lib/leads.ts`) — its Sheet tab is auto-created with a header row on first submission; fields listed in `optional` may be blank. `hire` (the `/digital-employees` page) sends an owner notification like `contact`.

- **Spam defense** (replaces Netlify's Akismet): off-screen honeypot (`bot-field`) and a minimum-time gate — the client sends `startedAt` from page load, and the server silently accepts-but-drops anything faster than 3s or missing the timestamp. Escalate to Cloudflare Turnstile if junk appears in the Sheet.
- **Storage:** one Google Sheet, one tab per form (`Contact Leads`, `Checklist Signups`) via a service account. Tab names and column order must match `FORMS` in `lib/leads.ts`.
- **Email:** `checklist` → visitor gets the PDF via Resend (attached + linked); `contact` → owner notification to `NOTIFY_EMAIL` with reply-to set to the lead. Send failures are logged but never lose the lead.
- **GA4:** success fires `generate_lead` (param `form_name`), failure fires `form_error`. The checklist event uses beacon + callback/timeout so the `/thank-you` redirect never loses it.
- **Testing forms locally** needs `.env.local` (see `.env.example`); without creds the route returns `502 storage failed` by design.

---

## 🌍 Environment Strategy
- Two environments: `development` (local) → `production` (Netlify on `main`)
- Netlify automatically deploys preview URLs for pull requests — use these to review changes before merging
- No `.env` files needed — no secrets in this project

| Env | Branch | Purpose |
|-----|--------|---------|
| Development | feature branches | Local editing & preview |
| Production | `main` | Live at erasefriction.com |

---

## 🔌 API Design Conventions
N/A — no backend API. All form handling is via Netlify Forms.

---

## 📦 Dependency Philosophy
- Prefer **well-maintained packages** with large communities and recent updates
- Check npm download count and last publish date before adding anything new
- **Do not add a dependency** for something achievable in under 10 lines of vanilla JS/Node
- Audit regularly: `npm audit` and remove unused packages
- Pin major versions to avoid surprise breaking changes
- [ ] No dependency added without checking its bundle size impact

---

## 📝 Notes & Decisions Log
> Use this section to document key architectural decisions so future Claude sessions have context.

| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-05 | Keep as static HTML/CSS/JS, no framework | It's a single landing page — no need for React overhead. Faster, simpler, easier to maintain. |
| 2026-03-05 | Host on Netlify, use Netlify Forms | Simplest deployment path for a static site; Netlify Forms handles contact submissions without a backend. |
| 2026-03-05 | No .env.local needed for this project | Static site with no API keys or secrets. Skip automated code/security reviews; changes are low-risk HTML/CSS. |
| 2026-03-05 | No hamburger menu | Single short page — CTA always visible on mobile. Scroll is sufficient; hamburger adds complexity for no real gain. |
| 2026-03-05 | SVG favicon (ef with red X) | Brand-consistent, no .ico needed, supported by all modern browsers. |
| 2026-07-08 | Contact form posts URL-encoded, not multipart FormData | Netlify's recommended AJAX format; multipart submissions can silently fail to register (→ no notification). See Contact Form section. |
| 2026-07-23 | Leads mirrored to a Google Sheet via Netlify outgoing webhook → Apps Script | Netlify's free tier caps form submissions at 100/month and is the only copy of every lead. Server-side webhook keeps the endpoint out of client code, and Akismet filters before forwarding. See `scripts/README.md`. |
| 2026-07-23 | Buttons use `--color-accent-hover` (#0f766e), not `--color-accent` | White on #0d9488 is 3.74:1 — fails WCAG AA. #0f766e gives 5.47:1. The brand teal is still used for graphics, borders, and the strikethrough, where 3:1 is fine. |
| 2026-07-23 | Added privacy.html + terms.html as separate pages | Legal text is long and versioned; inlining it in index.html would bury the landing page. These are the exception to the single-file rule. |
| 2026-07-23 | Grid children in `.contact-inner` need `min-width: 0` | Grid items default to `min-width: auto`, so the timeline `<select>` and the submit button forced ~29px of horizontal scroll at 375px. Watch for this whenever a form control goes inside a grid. |
| 2026-07-24 | Added `checklist` lead-magnet form + `thank-you.html` | Second Netlify form for a low-commitment name+email capture. Redirects to a noindex thank-you page; the Apps Script emails the checklist. Chosen over an on-page download so the "we'll email you a copy" wording nudges real email entry. |
| 2026-07-24 | One Sheet, one tab per form (routed by form name) | Simpler than a Sheet per form: one deployment, one webhook URL, one secret. `FORMS` in `form-to-sheet.gs` maps each Netlify form name to a tab + columns; unknown forms fall back to an Unrouted tab so nothing is lost. |
| 2026-07-24 | Checklist emailed via Apps Script `MailApp`, not an ESP | No new service or cost for a low-volume lead magnet; send-only scope. Sends from the owner's Gmail (~100/day consumer cap). Move to a real ESP if the list grows. Email send is isolated in try/catch so a failure never loses the logged lead. |
| 2026-07-24 | Switched checklist delivery from `MailApp` to **Resend** (supersedes the row above) | MailApp could only send from the personal Gmail, clashing with the brooks@erasefriction.com-everywhere rule and risking the Promotions tab. Resend sends domain-authenticated (SPF/DKIM) from brooks@erasefriction.com, attaches the PDF, and is the standard choice on Vercel — the coming Next.js rebuild reuses the same API. Secrets (`SHARED_SECRET`, `RESEND_API_KEY`) moved to Script Properties so re-pasting the script can't wipe them. |
| 2026-07-24 | Thank-you page shows the PDF (cover + view/download) instead of "check your inbox" only | Instant payoff converts better; the email (with attachment) remains the keepable copy. Cover preview instead of an iframe because our own X-Frame-Options/frame-ancestors headers block framing the PDF, and inline PDF frames are unreliable on mobile. |
| 2026-07-24 | **Migrated to Next.js on Vercel** (supersedes the static-HTML decision) | The owner runs Next/Vercel/Sheets pipelines routinely but had zero reps with Apps Script, whose save-vs-deploy model cost a full debugging day. `/api/lead` replaces Netlify Forms + webhook + Apps Script: secrets in env vars, IPs visible for spam defense, no 100/mo cap. Resend, the Sheet, GA4 and all URLs carry over unchanged. See MIGRATION.md for the cutover checklist. |
| 2026-08-13 | Added `/digital-employees` sales page (persona faces from thispersondoesnotexist + explicit "100% digital" badge) | Productizes the agency as hireable digital teammates. Photoreal personas build the bond that makes teams actually delegate to them; the badge + joke bios keep the disclosure unmissable — human feel, zero deception. New `hire` form routes through the same `/api/lead` pipeline; Sheet tabs now auto-create. |

---

## 🔗 Key Links
- **GitHub Repo:** https://github.com/Tosin-Brooks-Projects/erase-friction
- **Netlify Dashboard:**
- **Live Site:** https://erasefriction.com
