/**
 * erase friction — Netlify forms → Google Sheet (one tab per form)
 *
 * Receives Netlify form submissions via an outgoing webhook and appends one row
 * to the tab that matches the form. Deployed as an Apps Script Web App; Netlify
 * calls it server-side, so the URL never appears in the site's client code.
 *
 * Adding a form later = add one entry to FORMS below. No other changes.
 *
 * SETUP — see scripts/README.md for the full walkthrough.
 *   1. Create ONE Google Sheet, Extensions → Apps Script, paste this in.
 *   2. Set SHARED_SECRET below to a random string you generate.
 *   3. Deploy → New deployment → Web app → Execute as "Me", access "Anyone".
 *   4. For EACH form: Netlify → Forms → Form notifications → Outgoing webhook →
 *      URL: <web-app-url>?token=<SHARED_SECRET>   Event: New form submission
 */

// Any random string. Netlify passes it back as ?token= so random bots can't write.
var SHARED_SECRET = 'CHANGE_ME_TO_A_RANDOM_STRING';

// --- Checklist lead magnet: the email sent to everyone who opts in. ---
// The PDF lives at the site root (ai-automation-checklist.pdf), so this URL is live
// once the branch is merged to main and deployed.
var CHECKLIST_URL = 'https://erasefriction.com/ai-automation-checklist.pdf';
var CHECKLIST_SUBJECT = 'Your Money-Leak Checklist';
var CHECKLIST_FROM_NAME = 'Brooks at erase friction';

/**
 * One entry per Netlify form, keyed by the form's `name` attribute in the HTML.
 * `tab`     — the sheet tab to write to (created automatically if missing).
 * `columns` — [netlify field name, column header]. Order is the column order.
 *
 * The first three columns are always [submitted_at, ...the form's own fields...],
 * with ip + submission_id last, so every tab reads consistently.
 */
var FORMS = {
  // The in-depth contact form on the landing page.
  'contact': {
    tab: 'Contact Leads',
    columns: [
      ['submitted_at', 'Submitted'],
      ['name', 'Name'],
      ['email', 'Email'],
      ['bottleneck', 'Biggest bottleneck'],
      ['tools', 'Tools involved'],
      ['timeline', 'Timeline'],
      ['ip', 'IP'],
      ['submission_id', 'Netlify ID']
    ]
  },

  // The simple name + email opt-in for the AI checklist lead magnet.
  'checklist': {
    tab: 'Checklist Signups',
    columns: [
      ['submitted_at', 'Submitted'],
      ['name', 'Name'],
      ['email', 'Email'],
      ['ip', 'IP'],
      ['submission_id', 'Netlify ID']
    ]
  }
};

// Submissions whose form name isn't in FORMS land here instead of being dropped.
var FALLBACK_TAB = 'Unrouted';

function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.token !== SHARED_SECRET) {
      return respond(403, { error: 'forbidden' });
    }
    if (!e.postData || !e.postData.contents) {
      return respond(400, { error: 'empty body' });
    }

    var body = JSON.parse(e.postData.contents);
    // Netlify wraps some events in {payload: {...}}; others post the object directly.
    // A Next.js route handler can post {form_name, data} in the same shape.
    var sub = body.payload || body;
    var data = sub.data || {};
    var formName = sub.form_name || sub.form || '';

    var config = FORMS[formName];
    if (!config) {
      // Unknown form — record everything we got so no lead is ever lost.
      appendRaw(FALLBACK_TAB, formName, sub, data);
      return respond(200, { ok: true, routed: FALLBACK_TAB });
    }

    var row = {
      submitted_at: sub.created_at || new Date().toISOString(),
      ip: sub.ip || '',
      submission_id: sub.id || ''
    };
    config.columns.forEach(function (c) {
      var field = c[0];
      if (!(field in row)) row[field] = data[field] || '';
    });

    appendRow(config.tab, config.columns, row);

    // Deliver the lead magnet. Isolated so a mail failure never loses the logged lead.
    if (formName === 'checklist' && row.email) {
      try {
        sendChecklist(row.email, row.name);
      } catch (mailErr) {
        console.error('checklist email failed for ' + row.email + ': ' + mailErr);
      }
    }

    return respond(200, { ok: true, routed: config.tab });
  } catch (err) {
    // Surface failures in Apps Script → Executions rather than silently dropping a lead.
    console.error('form-to-sheet failed: ' + err + ' | body: ' + (e && e.postData ? e.postData.contents : 'none'));
    return respond(500, { error: String(err) });
  }
}

function getOrCreateTab(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function appendRow(tabName, columns, row) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000); // two submissions landing at once must not overwrite each other
  try {
    var sheet = getOrCreateTab(tabName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columns.map(function (c) { return c[1]; }));
      sheet.getRange(1, 1, 1, columns.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(columns.map(function (c) { return row[c[0]]; }));
  } finally {
    lock.releaseLock();
  }
}

// Fallback writer: dumps the form name + a JSON blob of the data so nothing is lost.
function appendRaw(tabName, formName, sub, data) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sheet = getOrCreateTab(tabName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Submitted', 'Form name', 'Data (JSON)', 'IP', 'Netlify ID']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      sub.created_at || new Date().toISOString(),
      formName || '(none)',
      JSON.stringify(data),
      sub.ip || '',
      sub.id || ''
    ]);
  } finally {
    lock.releaseLock();
  }
}

// Emails the checklist link from the account running the script (your Gmail).
// MailApp keeps the OAuth scope to send-only; GmailApp would add read/modify access
// this doesn't need.
function sendChecklist(email, name) {
  var firstName = (name || '').trim().split(/\s+/)[0];
  var greeting = firstName ? 'Hi ' + firstName + ',' : 'Hi,';
  var htmlBody =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:520px">' +
    '<p>' + escapeHtml(greeting) + '</p>' +
    '<p>Thanks for grabbing the Money-Leak Checklist. Here it is:</p>' +
    '<p><a href="' + CHECKLIST_URL + '" style="display:inline-block;background:#0f766e;color:#fff;' +
    'text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px">Open the checklist &rarr;</a></p>' +
    '<p>Work through it on your own team, and if a bottleneck jumps out, just reply to this email — ' +
    'we read every one.</p>' +
    '<p>&mdash; Brooks<br>erase friction</p>' +
    '</div>';
  var plainBody =
    greeting + '\n\nThanks for grabbing the Money-Leak Checklist. Here it is:\n' +
    CHECKLIST_URL + '\n\nWork through it on your own team, and if a bottleneck jumps out, ' +
    'just reply to this email.\n\n— Brooks\nerase friction';

  MailApp.sendEmail({
    to: email,
    subject: CHECKLIST_SUBJECT,
    name: CHECKLIST_FROM_NAME,
    htmlBody: htmlBody,
    body: plainBody
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function respond(status, obj) {
  // Apps Script web apps always return 200; the status is echoed in the body for debugging.
  obj.status = status;
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run once from the editor to verify writes to both tabs. Writes directly, so it does
 * NOT send any email — use testChecklistEmail() for that separately.
 */
function testAppend() {
  appendRow(FORMS.contact.tab, FORMS.contact.columns, {
    submitted_at: new Date().toISOString(), ip: '0.0.0.0', submission_id: 'test-contact',
    name: 'Test Lead', email: 'test@example.com',
    bottleneck: 'Manual data entry from email into CRM', tools: 'HubSpot, Gmail', timeline: 'asap'
  });
  appendRow(FORMS.checklist.tab, FORMS.checklist.columns, {
    submitted_at: new Date().toISOString(), ip: '0.0.0.0', submission_id: 'test-checklist',
    name: 'Curious Visitor', email: 'visitor@example.com'
  });
}

/**
 * Sends one real checklist email to YOU so you can preview it. Put your own address in
 * TEST_EMAIL first — never a made-up one, or it'll bounce and hurt sending reputation.
 */
function testChecklistEmail() {
  var TEST_EMAIL = 'CHANGE_ME@example.com';
  if (TEST_EMAIL.indexOf('CHANGE_ME') === 0) {
    throw new Error('Set TEST_EMAIL to your own address before running this.');
  }
  sendChecklist(TEST_EMAIL, 'Preview');
}
