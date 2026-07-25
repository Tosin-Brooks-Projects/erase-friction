# Migration: static Netlify site → Next.js on Vercel

Why: the owner runs Next.js + Vercel + Sheets pipelines routinely and has zero reps
with Apps Script (whose save-vs-deploy model cost a full debugging day). Every
remaining weakness of the old stack — the 100/mo Netlify Forms cap, the Apps Script
deploy gotcha, no caller IP for rate limiting — is solved by an API route.

## Hard requirements (things that break users if changed)

| Must stay identical | Why |
|---|---|
| `/`, `/privacy`, `/terms`, `/thank-you` | canonicals, sitemap, footer links |
| `/ai-automation-checklist.pdf` | **linked from every checklist email already sent** |
| GA property `G-V6HBH3FB5B` + `generate_lead` / `form_error` events with `form_name` param | analytics continuity |
| From: `Brooks at erase friction <brooks@erasefriction.com>` via Resend | domain is verified; replies + all mailto links point there |
| Google Sheet tabs: `Contact Leads`, `Checklist Signups` (same columns) | the lead store |
| Security headers incl. `X-Robots-Tag: noindex` on the PDF | keeps the email-gate meaningful |

## What carries over unchanged

- **Resend** — same API, key moves to a Vercel env var
- **The Sheet** — same spreadsheet; writer changes from Apps Script to `googleapis`
- **GA4** — same snippet in the root layout, same events
- All copy, the PDF, cover image, photos, logos, legal pages

## What dies at cutover

- Netlify Forms (`data-netlify` attrs, hidden `form-name` inputs, the AJAX post to `/`)
- The Netlify outgoing webhook + email notifications
- The entire Apps Script (`scripts/form-to-sheet.gs` stays in git as reference only)
- `netlify.toml` (headers move to `next.config.ts`)

## What replaces them

One API route: `POST /api/lead` with a `form` field (`contact` | `checklist`).

1. Validates fields per form; honeypot (`bot-field`) and a minimum-time check
   (`startedAt` field set on page load; reject submissions faster than 3s — bots
   submit instantly) — this replaces Akismet. Escalate to Cloudflare Turnstile if
   junk appears.
2. Appends a row to the matching Sheet tab via a Google **service account**.
3. `checklist` → emails the PDF to the visitor via Resend (attachment + link).
4. `contact` → emails a notification to the owner via Resend (replaces Netlify's
   email notification).
5. Email failures don't lose the lead — the Sheet write happens first, send is
   isolated (same principle as the Apps Script).

## Env vars (Vercel → Project → Settings → Environment Variables)

| Var | Value |
|---|---|
| `RESEND_API_KEY` | from Resend (rotate if ever exposed) |
| `LEADS_SHEET_ID` | the long id in the Sheet's URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `…@…iam.gserviceaccount.com` |
| `GOOGLE_PRIVATE_KEY` | the service account's private key (keep the `\n`s) |
| `NOTIFY_EMAIL` | `brooks@erasefriction.com` |

Service account setup (once): Google Cloud console → create service account → create
JSON key → **share the leads Sheet with the service account's email** (Editor).
No OAuth screens, no deployments, no Apps Script.

## Cutover checklist

- [ ] `npm run build` clean on the branch
- [ ] Vercel project created from the repo, branch deploys enabled, env vars set
- [ ] On the Vercel preview URL: submit both forms → rows land in both tabs,
      checklist email arrives (from erasefriction.com, PDF attached), owner
      notification arrives for contact
- [ ] All four pages + PDF render on preview; headers verified (`curl -I`)
- [ ] Merge to main → production deploy on Vercel
- [ ] Point DNS (A/CNAME) at Vercel; erasefriction.com serves the new site
- [ ] Re-test both forms **on the real domain**
- [ ] Keep Netlify project alive ~1 week as rollback, then delete site,
      webhook, and archive the Apps Script deployment
- [ ] Update CLAUDE.md tech stack + decisions log (done on this branch)
