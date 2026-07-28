"use client";

import { useEffect, useRef, useState } from "react";

function fireGtag(...args: unknown[]) {
  if (typeof gtag === "function") gtag(...args);
}

export default function ChecklistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
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
        body: JSON.stringify({ form: "checklist", startedAt: startedAt.current, ...data }),
      });
      if (!res.ok) throw new Error("Submission failed: " + res.status);
      // Fire the lead event, then redirect. Beacon survives the navigation; the
      // timeout guarantees the redirect even if gtag is blocked by an ad blocker.
      const goThanks = () => window.location.assign("/thank-you");
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", {
          form_name: "checklist",
          transport_type: "beacon",
          event_callback: goThanks,
        });
        setTimeout(goThanks, 400);
      } else {
        goThanks();
      }
    } catch {
      setStatus("error");
      fireGtag("event", "form_error", { form_name: "checklist" });
    }
  }

  return (
    <>
      <form className="checklist-form" onSubmit={onSubmit}>
        <p className="hp-field" aria-hidden="true">
          <label>
            Don&rsquo;t fill this out if you&rsquo;re human:{" "}
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <div className="field">
          <label htmlFor="cl-name">Your name</label>
          <input type="text" id="cl-name" name="name" placeholder="Your name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="cl-email">Email address</label>
          <input type="email" id="cl-email" name="email" placeholder="you@company.com" autoComplete="email" required />
        </div>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : <>Email me the checklist &rarr;</>}
        </button>
      </form>
      {status === "error" && (
        <p className="form-error" role="alert">
          Couldn&rsquo;t send. Email <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a> and
          we&rsquo;ll send the checklist over.
        </p>
      )}
      <p className="checklist-note">
        No spam &mdash; the checklist plus occasional automation tips, unsubscribe anytime. By requesting it you agree
        to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    </>
  );
}
