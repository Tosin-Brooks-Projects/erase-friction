import { NextRequest, NextResponse } from "next/server";
import { FORMS, FormName, appendLead } from "@/lib/leads";
import { sendChecklist, notifyOwner } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 5000;

/**
 * Replaces Netlify Forms + the Apps Script webhook. Spam defense (in place of
 * Akismet): honeypot field, a minimum-time check (bots submit instantly or skip
 * JS entirely and never get a startedAt), and field validation. Escalate to
 * Turnstile if junk starts appearing in the Sheet.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const form = body.form as FormName;
  const config = FORMS[form];
  if (!config) return NextResponse.json({ error: "unknown form" }, { status: 400 });

  // --- Spam gates. Pretend success so bots don't learn what tripped them. ---
  if (typeof body["bot-field"] === "string" && body["bot-field"].length > 0) {
    return NextResponse.json({ ok: true });
  }
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  // --- Validation ---
  const data: Record<string, string> = {};
  for (const field of config.fields) {
    const v = body[field];
    if (typeof v !== "string" || !v.trim()) {
      return NextResponse.json({ error: `missing ${field}` }, { status: 400 });
    }
    data[field] = v.trim().slice(0, MAX_FIELD);
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const id = crypto.randomUUID();

  // The Sheet write is the system of record — it must succeed.
  try {
    await appendLead(form, data, ip, id);
  } catch (err) {
    console.error("Sheet append failed:", err);
    return NextResponse.json({ error: "storage failed" }, { status: 502 });
  }

  // Emails are best-effort: a send failure must never lose the logged lead.
  try {
    if (form === "checklist") {
      await sendChecklist(data.email, data.name);
    } else if (form === "contact") {
      await notifyOwner(data, ip);
    }
  } catch (err) {
    console.error(`${form} email failed (lead ${id} is logged):`, err);
  }

  return NextResponse.json({ ok: true, id });
}
