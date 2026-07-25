"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  // gtag is loaded by the GA script in the root layout.
  function gtag(...args: unknown[]): void;
}

function fireGtag(...args: unknown[]) {
  if (typeof gtag === "function") gtag(...args);
}

export default function ContactForm() {
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
        body: JSON.stringify({ form: "contact", startedAt: startedAt.current, ...data }),
      });
      if (!res.ok) throw new Error("Submission failed: " + res.status);
      setStatus("sent");
      fireGtag("event", "generate_lead", { form_name: "contact" });
    } catch {
      setStatus("error");
      fireGtag("event", "form_error", { form_name: "contact" });
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status" style={{ display: "block" }}>
        <h3>We got it.</h3>
        <p>Expect a response within 48 hours. We&rsquo;ll come back with something actually useful.</p>
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
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" placeholder="Jane Smith" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="jane@company.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="bottleneck">What&rsquo;s the #1 task eating your team&rsquo;s time right now?</label>
        <textarea
          id="bottleneck"
          name="bottleneck"
          placeholder="e.g. We manually copy data from client emails into our CRM every morning — takes 2 hours a day..."
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tools">What tools are involved?</label>
        <input type="text" id="tools" name="tools" placeholder="e.g. HubSpot, Google Sheets, Slack" required />
      </div>
      <div className="form-group">
        <label htmlFor="timeline">How soon are you looking to fix this?</label>
        <select id="timeline" name="timeline" required defaultValue="">
          <option value="" disabled>
            Select one...
          </option>
          <option value="asap">We&rsquo;re bleeding hours now &mdash; ASAP</option>
          <option value="1-3months">Within the next 1&ndash;3 months</option>
          <option value="exploring">Just exploring for now</option>
        </select>
      </div>
      <div className="form-submit">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Send it &mdash; we&rsquo;ll respond within 48 hours &rarr;</>}
        </button>
        {status === "error" && (
          <p className="form-error" role="alert">
            Couldn&rsquo;t send. Email <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> and
            we&rsquo;ll take it from there.
          </p>
        )}
        <p className="form-note">No sales calls. No commitment. Just a real response.</p>
        <p className="form-note">
          By sending this you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}
