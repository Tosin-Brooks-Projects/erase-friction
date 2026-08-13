"use client";

import { useEffect, useRef, useState } from "react";

function fireGtag(...args: unknown[]) {
  if (typeof gtag === "function") gtag(...args);
}

export default function HireForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Bots submit instantly; humans don't. The server rejects submissions that
  // arrive suspiciously fast after page load (or with no timestamp at all).
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "hire", startedAt: startedAt.current, ...data }),
      });
      if (!res.ok) throw new Error("Submission failed: " + res.status);
      setStatus("sent");
      fireGtag("event", "generate_lead", { form_name: "hire" });
    } catch {
      setStatus("error");
      fireGtag("event", "form_error", { form_name: "hire" });
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status" style={{ display: "block" }}>
        <h3>Job posted. Sort of.</h3>
        <p>Within 48 hours you&rsquo;ll have a plan: what your digital employee would do, how they&rsquo;d plug in, and
          what they&rsquo;d cost.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <p className="hp-field" aria-hidden="true">
        <label>
          Don&rsquo;t fill this out if you&rsquo;re human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="h-name">Your name</label>
          <input type="text" id="h-name" name="name" placeholder="Jane Smith" autoComplete="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="h-email">Work email</label>
          <input type="email" id="h-email" name="email" placeholder="jane@company.com" autoComplete="email" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="h-company">Company <span className="label-optional">(optional)</span></label>
        <input type="text" id="h-company" name="company" placeholder="Acme Inc." autoComplete="organization" />
      </div>
      <div className="form-group">
        <label htmlFor="h-role">What role would you fill first?</label>
        <select id="h-role" name="role" required defaultValue="">
          <option value="" disabled>
            Select one...
          </option>
          {/* Labels match the persona cards on /digital-employees exactly, so the
              role someone picks is the one they just read about. Values are
              unchanged — the Sheet's existing data stays comparable. */}
          <option value="admin-ops">Operations &amp; Admin</option>
          <option value="support">Customer Support</option>
          <option value="sales">Sales Development</option>
          <option value="research-content">Research &amp; Content</option>
          <option value="marketing">Marketing</option>
          <option value="other">Something else (tell us below)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="h-notes">What would you hand them first? <span className="label-optional">(optional)</span></label>
        <textarea
          id="h-notes"
          name="notes"
          placeholder="e.g. Every morning someone spends 2 hours pulling orders from email into our spreadsheet..."
        ></textarea>
      </div>
      <div className="form-submit">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Design my digital employee &rarr;</>}
        </button>
        {status === "error" && (
          <p className="form-error" role="alert">
            Couldn&rsquo;t send. Email <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> and
            we&rsquo;ll take it from there.
          </p>
        )}
        <p className="form-note">No commitment. A real plan, from a real human, within 48 hours.</p>
        <p className="form-note">
          By sending this you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}
