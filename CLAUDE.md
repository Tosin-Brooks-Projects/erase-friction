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
- **Frontend:** Static HTML/CSS/JS (no framework — intentional, keep it that way)
- **Backend:** None — static site
- **Forms:** Netlify Forms (honeypot spam protection included)
- **Deployment:** Netlify
- **Version Control:** GitHub

---

## 🗂️ Architecture Rules
- **No framework** — plain HTML/CSS/JS only. Do not introduce React, Vue, or any build tool.
- **No backend** — this is a static site. All form handling goes through Netlify Forms.
- No API keys or secrets anywhere in the codebase (none currently needed)
- Keep the entire site in a single `index.html` unless a page genuinely needs to be split out

---

## 📁 Project Structure
```
/
├── index.html                 # entire landing page — all HTML, CSS, and JS inline
│                               #   two Netlify forms: "contact" and "checklist"
├── privacy.html               # privacy policy (self-contained styles)
├── terms.html                 # terms of service (self-contained styles)
├── thank-you.html             # post-signup page for the checklist form (noindex)
├── netlify.toml               # security headers + asset caching
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── OG-image.jpg               # social share preview
├── Brooks.webp                # team photo (220px, served)
├── Tosin.webp                 # team photo (220px, served)
├── Kea.webp                   # team photo (220px, served — AI agent mascot)
├── Brooks.png / Tosin.png / Kea.png   # 800px originals, kept as sources only
├── logo.png                   # wordmark
├── logo-domain.svg / .png     # wordmark + .com, for banners and cards
├── logo-domain-on-dark.svg / .png     # same, for dark backgrounds
├── scripts/
│   ├── form-to-sheet.gs       # Apps Script — Netlify webhooks → one Sheet, tab per form
│   └── README.md              # setup + troubleshooting for the above
└── CLAUDE.md
```

The three `.png` team photos are **sources, not assets** — `index.html` references the
`.webp` versions. Re-export the WebP at 220×220 if a photo ever changes.

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

---

## 📨 Forms (Netlify Forms)
Two **Netlify Forms** live in `index.html`, both captured server-side and stored in the dashboard (Site → **Forms**):
- **`contact`** — the in-depth bottleneck form. On submit, shows an inline success message.
- **`checklist`** — the AI-checklist lead magnet (name + email only). On submit, redirects to `/thank-you`.

There is **no backend and no email address in the code** — leads only email you if a notification is configured in Netlify.

**Email notifications setup:** Site configuration → **Forms → Form notifications → Add notification → Email notification**. Without this, leads pile up silently in the dashboard.

**Google Sheet mirror + checklist delivery:** one outgoing webhook per form forwards submissions to a Google Apps Script Web App, which appends a row to **one Sheet, one tab per form**, and — for `checklist` — emails the checklist from your Gmail. Setup and troubleshooting live in [`scripts/README.md`](scripts/README.md). Routing is by form name; an unrecognized form lands in an **Unrouted** tab rather than being dropped. Adding/renaming a field means updating that form's `columns` in `scripts/form-to-sheet.gs`, or the field is silently dropped. The checklist asset URL is the `CHECKLIST_URL` constant in that file.

**AJAX submission format:** the JS posts **URL-encoded** (`application/x-www-form-urlencoded` via `URLSearchParams`), NOT multipart `FormData`. This is Netlify's recommended pattern for JS-submitted forms — multipart AJAX submissions can silently fail to register. Keep it URL-encoded unless a file-upload field is added.

**Gotchas when "notifications aren't arriving":**
- **Test on production only.** Form submissions only register on the live deployed site (erasefriction.com). `localhost` and `file://` do NOT submit to Netlify — nothing will appear in the dashboard.
- **Diagnostic fork:** first check whether the submission appears in the dashboard at all. Not there → capture problem (form detection, AJAX format, or testing on non-prod). There but no email → notification-config/delivery problem.
- **Check the Spam tab.** Akismet-flagged submissions land under Forms → Spam and **never trigger notifications**.
- **Check email spam/promotions folder** for mail from `forms@netlify.com`.
- **Confirm form detection** — Netlify → Forms must list "contact" as an active form (detected at build from the static HTML). If missing, it was never detected.
- The submit handler shows the success message only on an actual `res.ok`; on failure an inline error tells the visitor to email brooks@erasefriction.com directly.
- **Public/business email is brooks@erasefriction.com everywhere** — site, legal pages, error messages, email reply-to, and the PDF. Do not reintroduce the old Gmail address in user-facing copy.
- **Submission cap: Netlify free tier = 100 submissions/month TOTAL across both forms.** Past the cap Netlify silently rejects — the visitor still sees success, the webhook never fires, the lead is gone. Check Site → Forms usage when promoting the checklist; upgrade to Forms Level 1 if volume grows.

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

---

## 🔗 Key Links
- **GitHub Repo:** https://github.com/Tosin-Brooks-Projects/erase-friction
- **Netlify Dashboard:**
- **Live Site:** https://erasefriction.com
