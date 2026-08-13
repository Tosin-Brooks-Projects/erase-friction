import { google, sheets_v4 } from "googleapis";

type FormConfig = {
  tab: string;
  fields: readonly string[];
  /** Fields a submitter may leave blank; everything else is required. */
  optional?: readonly string[];
};

/**
 * Per-form config. Contact/checklist tab names and column order MUST match the
 * existing Sheet — they hold live data. New forms' tabs are created (with a
 * header row) on first submission, so adding a form is just an entry here.
 */
export const FORMS = {
  contact: {
    tab: "Contact Leads",
    fields: ["name", "email", "bottleneck", "tools", "timeline"],
  },
  checklist: {
    tab: "Checklist Signups",
    fields: ["name", "email"],
  },
  hire: {
    tab: "Digital Employee Leads",
    fields: ["name", "email", "company", "role", "notes"],
    optional: ["company", "notes"],
  },
} as const satisfies Record<string, FormConfig>;

export type FormName = keyof typeof FORMS;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function header(config: FormConfig): string[] {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return ["Submitted", ...config.fields.map(cap), "IP", "ID"];
}

async function ensureTab(sheets: sheets_v4.Sheets, spreadsheetId: string, config: FormConfig) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties.title" });
  if (meta.data.sheets?.some((s) => s.properties?.title === config.tab)) return;
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: [{ addSheet: { properties: { title: config.tab } } }] },
  });
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${config.tab}'!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [header(config)] },
  });
}

export async function appendLead(form: FormName, data: Record<string, string>, ip: string, id: string) {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    // Vercel stores the key with literal \n sequences; the JWT client needs real newlines.
    key: requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = requireEnv("LEADS_SHEET_ID");

  const config: FormConfig = FORMS[form];
  await ensureTab(sheets, spreadsheetId, config);

  // Same row shape the Apps Script wrote: Submitted, ...fields, IP, ID
  const row = [new Date().toISOString(), ...config.fields.map((f) => data[f] ?? ""), ip, id];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${config.tab}'!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
