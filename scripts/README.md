# Netlify forms → Google Sheet

Netlify Forms stays the system of record. This adds a durable, exportable copy of
every lead in a Google Sheet, so leads survive Netlify's free-tier submission cap
and are available for follow-up and reporting.

**Flow:** visitor submits → Netlify Forms captures + runs spam filtering →
Netlify fires an outgoing webhook → Apps Script Web App appends a row to the tab
that matches the form.

Netlify calls the script server-side, so the endpoint never appears in `index.html`.
Only submissions that clear Netlify's spam filter are forwarded.

## One Sheet, one tab per form

A single Google Sheet holds every form; each form writes to its own tab. The tabs
are created automatically on first submission — you don't make them by hand.

| Netlify form (`name=`) | Tab | Fields | On submit |
|---|---|---|---|
| `contact` | Contact Leads | name, email, bottleneck, tools, timeline | logged |
| `checklist` | Checklist Signups | name, email | logged **+ checklist emailed** |
| *(anything else)* | Unrouted | raw JSON, so nothing is ever dropped | logged |

All forms share **one** deployment, **one** URL, and **one** secret. Routing is by
the form's name, which Netlify includes in every webhook payload.

## The checklist email

When a `checklist` submission arrives, the script emails the AI Automation Checklist
from the Gmail account running it. The visitor is sent to `/thank-you`, which tells
them to check their inbox.

**Before this works, set the asset.** In `form-to-sheet.gs`, replace `CHECKLIST_URL`
with the real hosted file — e.g. `https://erasefriction.com/ai-automation-checklist.pdf`
once you've added the PDF to the site. Until then, signups are still logged; they just
receive a broken link. `CHECKLIST_SUBJECT` and `CHECKLIST_FROM_NAME` are next to it.

The email uses `MailApp`, so the only added permission is send-only. It sends from the
script owner's address. Gmail caps consumer accounts at ~100 recipients/day and Workspace
at ~1,500 — fine for a lead magnet, but if this list ever gets large, move sending to a
real email service. Email delivery is wrapped in its own try/catch: if a send fails, the
lead is still logged, and the failure is recorded in Apps Script → Executions.

## Setup

**1. Create the Sheet**

One new Google Sheet, name it something like `erase friction — leads`. Leave it
empty — the script names and fills the tabs itself. You can delete the default
"Sheet1" tab once real tabs exist, or leave it.

**2. Add the script**

Extensions → Apps Script. Delete the placeholder, paste in [`form-to-sheet.gs`](form-to-sheet.gs), save.

**3. Set the shared secret**

Replace `CHANGE_ME_TO_A_RANDOM_STRING` at the top with a random string. Generate one:

```bash
openssl rand -hex 16
```

Keep it out of git — it lives only in the Apps Script project and the Netlify webhook URL.

**4. Verify the writes**

In the Apps Script editor pick `testAppend` from the function dropdown and Run.
Approve the permission prompt. It writes one test row to **Contact Leads** and one to
**Checklist Signups** — no email is sent. Confirm both tabs appear, then delete the test rows.

To preview the checklist email, set `TEST_EMAIL` in `testChecklistEmail` to your own
address and run that function. It sends one real email to you.

**5. Deploy as a Web App**

Deploy → New deployment → type **Web app**.

| Setting | Value |
|---|---|
| Execute as | Me |
| Who has access | **Anyone** |

"Anyone" is required — Netlify's servers call it unauthenticated. The `?token=`
check is what actually gates writes. Copy the deployment URL (ends in `/exec`).

**6. Wire up Netlify — once per form**

Netlify → your site → Forms → Form notifications → Add notification → **Outgoing webhook**.
Add one notification per form; the URL is identical each time.

| Field | Value |
|---|---|
| Event to listen for | New form submission |
| URL to notify | `<web-app-url>?token=<your-secret>` |
| Form | `contact` (then repeat for `checklist`) |

One webhook with no form filter would forward *every* form to the script, which also
works — the script routes by name regardless. Per-form notifications are just tidier
in the Netlify UI.

**7. Test end to end**

Submit the real form on https://erasefriction.com (localhost and `file://` do **not**
register with Netlify). A row should land in the matching tab within a few seconds.

## Adding another form later

Two steps, no rewrite:

1. In `form-to-sheet.gs`, add an entry to `FORMS` keyed by the new form's `name`
   attribute, with its `tab` and `columns`. Redeploy (step 5, "New version").
2. Add the Netlify webhook for that form (step 6).

Until the `FORMS` entry exists, that form's submissions land in **Unrouted** with
their full data intact — so a mismatch loses nothing, it just files it plainly.

## When a lead doesn't show up

Work down this list — each step tells you which half of the pipeline is at fault.

1. **Netlify → Forms → the form** — is the submission there at all? If not, the problem is
   capture, not the webhook. Check the Spam tab too; Akismet-flagged submissions are never forwarded.
2. **Check the Unrouted tab.** If it landed there, the form's `name` doesn't match any key
   in `FORMS` — fix the key or the form name so they agree.
3. **Apps Script → Executions** — did `doPost` run? A `403` means the token doesn't match.
   A `500` logs the parse error and the raw body.
4. **Redeploy after editing.** Apps Script serves the last *deployed* version, not the saved one.
   Deploy → Manage deployments → edit → Version: New version.

## Changing a form's fields

Renaming or adding a field in the HTML means updating that form's `columns` in
`form-to-sheet.gs` to match the new `name` attributes — otherwise the new field is
silently dropped. Columns are written by position, so add new entries at the end
rather than reordering existing ones.
