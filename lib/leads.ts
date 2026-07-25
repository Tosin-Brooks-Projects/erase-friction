import { google } from "googleapis";

/**
 * Per-form config. Tab names and column order MUST match the existing Sheet —
 * they were created by the previous Apps Script pipeline and hold live data.
 * Adding a form later = add an entry here (and create its tab with a header row).
 */
export const FORMS = {
  contact: {
    tab: "Contact Leads",
    fields: ["name", "email", "bottleneck", "tools", "timeline"] as const,
  },
  checklist: {
    tab: "Checklist Signups",
    fields: ["name", "email"] as const,
  },
} as const;

export type FormName = keyof typeof FORMS;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function appendLead(form: FormName, data: Record<string, string>, ip: string, id: string) {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    // Vercel stores the key with literal \n sequences; the JWT client needs real newlines.
    key: requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const config = FORMS[form];
  // Same row shape the Apps Script wrote: Submitted, ...fields, IP, ID
  const row = [new Date().toISOString(), ...config.fields.map((f) => data[f] ?? ""), ip, id];

  await sheets.spreadsheets.values.append({
    spreadsheetId: requireEnv("LEADS_SHEET_ID"),
    range: `'${config.tab}'!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
