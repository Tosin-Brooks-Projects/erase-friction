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
├── index.html         # entire site — all HTML, CSS, and JS inline
├── Brooks.png         # team photo
├── Tosin.png          # team photo
├── Kea.png            # team photo (AI agent mascot)
└── CLAUDE.md
```

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

---

## 🔗 Key Links
- **GitHub Repo:** https://github.com/conklbm/erase-friction
- **Netlify Dashboard:**
- **Live Site:** https://erasefriction.com
