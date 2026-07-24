/**
 * erase friction — contact form → Google Sheet
 *
 * Receives Netlify form submissions via an outgoing webhook and appends one row
 * per lead. Deployed as an Apps Script Web App; Netlify calls it server-side, so
 * the URL never appears in the site's client code.
 *
 * SETUP — see scripts/README.md for the full walkthrough.
 *   1. Create a Google Sheet, Extensions → Apps Script, paste this in.
 *   2. Set SHARED_SECRET below to a random string you generate.
 *   3. Deploy → New deployment → Web app → Execute as "Me", access "Anyone".
 *   4. Netlify → Forms → Form notifications → Outgoing webhook →
 *      URL: <web-app-url>?token=<SHARED_SECRET>   Event: New form submission
 */

// Any random string. Netlify passes it back as ?token= so random bots can't write.
var SHARED_SECRET = 'CHANGE_ME_TO_A_RANDOM_STRING';

// Column order. Netlify field names on the left, sheet headers on the right.
var COLUMNS = [
  ['submitted_at', 'Submitted'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['bottleneck', 'Biggest bottleneck'],
  ['tools', 'Tools involved'],
  ['timeline', 'Timeline'],
  ['ip', 'IP'],
  ['submission_id', 'Netlify ID']
];

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
    var sub = body.payload || body;
    var data = sub.data || {};

    var row = {
      submitted_at: sub.created_at || new Date().toISOString(),
      name: data.name || '',
      email: data.email || '',
      bottleneck: data.bottleneck || '',
      tools: data.tools || '',
      timeline: data.timeline || '',
      ip: sub.ip || '',
      submission_id: sub.id || ''
    };

    appendRow(row);
    return respond(200, { ok: true });
  } catch (err) {
    // Surface failures in Apps Script → Executions rather than silently dropping a lead.
    console.error('form-to-sheet failed: ' + err + ' | body: ' + (e && e.postData ? e.postData.contents : 'none'));
    return respond(500, { error: String(err) });
  }
}

function appendRow(row) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var lock = LockService.getScriptLock();
  lock.waitLock(15000); // two submissions landing at once must not overwrite each other
  try {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(COLUMNS.map(function (c) { return row[c[0]]; }));
  } finally {
    lock.releaseLock();
  }
}

function respond(status, obj) {
  // Apps Script web apps always return 200; the status is echoed in the body for debugging.
  obj.status = status;
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to verify the sheet write works before wiring Netlify up. */
function testAppend() {
  appendRow({
    submitted_at: new Date().toISOString(),
    name: 'Test Lead',
    email: 'test@example.com',
    bottleneck: 'Manual data entry from email into CRM',
    tools: 'HubSpot, Gmail',
    timeline: 'asap',
    ip: '0.0.0.0',
    submission_id: 'test'
  });
}
