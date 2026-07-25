import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Your Money-Leak Checklist — erase friction",
  description: "View and download your Money-Leak Checklist. A copy is also on its way to your inbox.",
  // Post-conversion page: no SEO value, keep it out of the index.
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <>
      <SiteHeader withNav={false} />
      <main className="ty-main">
        <div className="ty-card">
          <h1>Here&rsquo;s your checklist.</h1>
          <p className="ty-lede">We also sent a copy to your inbox, so it&rsquo;s there whenever you need it.</p>
          <a
            href="/ai-automation-checklist.pdf"
            target="_blank"
            rel="noopener"
            className="cover-link"
            aria-label="Open the Money-Leak Checklist PDF"
          >
            <img src="/checklist-cover.webp" alt="Cover of The Money-Leak Checklist" width={240} height={311} />
          </a>
          <div className="btn-row">
            <a href="/ai-automation-checklist.pdf" target="_blank" rel="noopener" className="btn btn-primary btn-lg">
              View the checklist &rarr;
            </a>
            <a href="/ai-automation-checklist.pdf" download="Money-Leak-Checklist.pdf" className="btn btn-lg btn-secondary">
              Download PDF
            </a>
          </div>
          <p className="ty-fine">
            No email? Check spam or promotions, or write{" "}
            <a href="mailto:brooks@erasefriction.com">brooks@erasefriction.com</a>.
          </p>
          <p className="ty-fine">
            <a href="/">&larr; Back to home</a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
