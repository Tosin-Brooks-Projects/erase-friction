const FROM = "Brooks at erase friction <brooks@erasefriction.com>";
const REPLY_TO = "brooks@erasefriction.com";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://erasefriction.com";
const CHECKLIST_URL = `${SITE}/ai-automation-checklist.pdf`;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function resend(payload: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing env var: RESEND_API_KEY");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/** The lead magnet delivery: PDF attached AND linked; link-only if the fetch fails. */
export async function sendChecklist(email: string, name: string) {
  const firstName = (name || "").trim().split(/\s+/)[0];
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";

  const payload: Record<string, unknown> = {
    from: FROM,
    to: [email],
    reply_to: REPLY_TO,
    subject: "Your Money-Leak Checklist",
    html:
      `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:520px">` +
      `<p>${greeting}</p>` +
      `<p>Thanks for grabbing the Money-Leak Checklist. It's attached, and this link always works too:</p>` +
      `<p><a href="${CHECKLIST_URL}" style="display:inline-block;background:#0f766e;color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px">Open the checklist &rarr;</a></p>` +
      `<p>Work through it on your own team, and if a bottleneck jumps out, just reply to this email — we read every one.</p>` +
      `<p>&mdash; Brooks<br>erase friction</p>` +
      `<p style="color:#5f6774;font-size:12px;margin-top:24px">You're getting this because you requested the checklist at erasefriction.com. ` +
      `We'll send occasional automation tips — <a href="mailto:brooks@erasefriction.com?subject=unsubscribe" style="color:#5f6774">unsubscribe</a> anytime.</p></div>`,
    text:
      `${greeting}\n\nThanks for grabbing the Money-Leak Checklist. It's attached, and this link always works too:\n` +
      `${CHECKLIST_URL}\n\nWork through it on your own team, and if a bottleneck jumps out, just reply to this email.\n\n— Brooks\nerase friction\n\n` +
      `You're getting this because you requested the checklist at erasefriction.com. We'll send occasional automation tips — email brooks@erasefriction.com with subject "unsubscribe" to opt out anytime.`,
  };

  try {
    const pdf = await fetch(CHECKLIST_URL);
    if (pdf.ok) {
      payload.attachments = [
        {
          filename: "Money-Leak-Checklist.pdf",
          content: Buffer.from(await pdf.arrayBuffer()).toString("base64"),
        },
      ];
    }
  } catch (err) {
    console.error("PDF fetch failed, sending link-only:", err);
  }

  await resend(payload);
}

/** Owner notification for inbound leads — replaces Netlify's email notification. */
export async function notifyOwner(
  data: Record<string, string>,
  ip: string,
  opts: { subject: string; intro: string; fields: readonly string[] },
) {
  const to = process.env.NOTIFY_EMAIL || REPLY_TO;
  const rows = opts.fields
    .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#5f6774;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(data[k] || "")}</td></tr>`)
    .join("");
  await resend({
    from: FROM,
    to: [to],
    reply_to: data.email || REPLY_TO, // hitting Reply answers the lead directly
    subject: opts.subject,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a"><p>${escapeHtml(opts.intro)}</p><table>${rows}</table><p style="color:#5f6774;font-size:13px">IP: ${escapeHtml(ip)}</p></div>`,
    text: opts.fields.map((k) => `${k}: ${data[k] || ""}`).join("\n"),
  });
}
