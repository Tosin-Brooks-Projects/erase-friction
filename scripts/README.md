# Contact form → Google Sheet

Netlify Forms stays the system of record. This adds a durable, exportable copy of
every lead in a Google Sheet, so leads survive Netlify's free-tier submission cap
and are available for follow-up and reporting.

**Flow:** visitor submits → Netlify Forms captures + runs spam filtering →
Netlify fires an outgoing webhook → Apps Script Web App appends a row.

Netlify calls the script server-side, so the endpoint never appears in `index.html`.
Only submissions that clear Netlify's spam filter are forwarded.

## Setup

**1. Create the Sheet**

New Google Sheet, name it something like `erase friction — leads`. The script writes
its own header row on the first submission; leave the sheet empty.

**2. Add the script**

Extensions → Apps Script. Delete the placeholder, paste in [`form-to-sheet.gs`](form-to-sheet.gs), save.

**3. Set the shared secret**

Replace `CHANGE_ME_TO_A_RANDOM_STRING` at the top with a random string. Generate one:

```bash
openssl rand -hex 16
```

Keep it out of git — it lives only in the Apps Script project and the Netlify webhook URL.

**4. Verify the sheet write**

In the Apps Script editor pick `testAppend` from the function dropdown and Run.
Approve the permission prompt. A test row should appear in the Sheet. Delete the row after.

**5. Deploy as a Web App**

Deploy → New deployment → type **Web app**.

| Setting | Value |
|---|---|
| Execute as | Me |
| Who has access | **Anyone** |

"Anyone" is required — Netlify's servers call it unauthenticated. The `?token=`
check is what actually gates writes. Copy the deployment URL (ends in `/exec`).

**6. Wire up Netlify**

Netlify → your site → Forms → Form notifications → Add notification → **Outgoing webhook**.

| Field | Value |
|---|---|
| Event to listen for | New form submission |
| URL to notify | `<web-app-url>?token=<your-secret>` |
| Form | contact |

**7. Test end to end**

Submit the real form on https://erasefriction.com (localhost and `file://` do **not**
register with Netlify). A row should land in the Sheet within a few seconds.

## When a lead doesn't show up

Work down this list — each step tells you which half of the pipeline is at fault.

1. **Netlify → Forms → contact** — is the submission there at all? If not, the problem is
   capture, not the webhook. Check the Spam tab too; Akismet-flagged submissions are never forwarded.
2. **Apps Script → Executions** — did `doPost` run? A `403` means the token doesn't match.
   A `500` logs the parse error and the raw body.
3. **Redeploy after editing.** Apps Script serves the last *deployed* version, not the saved one.
   Deploy → Manage deployments → edit → Version: New version.

## Changing the form fields

Adding or renaming a field in `index.html` means updating `COLUMNS` and the `row`
object in `form-to-sheet.gs` to match the new `name` attributes — otherwise the new
field is silently dropped. Existing sheet columns are matched by position, so add
new entries at the end rather than reordering.
