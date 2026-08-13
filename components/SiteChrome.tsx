import Link from "next/link";
import Year from "./Year";

export function Wordmark() {
  return (
    <>
      <span className="logo-erase">erase</span> <span className="logo-friction">friction</span>
    </>
  );
}

/** Main-site navbar (landing + thank-you). Legal pages use LegalHeader instead. */
export function SiteHeader({ withNav = true }: { withNav?: boolean }) {
  return (
    <header className="navbar">
      <nav className="nav-inner">
        <Link href="/" className="nav-logo">
          <Wordmark />
        </Link>
        {withNav && (
          <>
            {/* Destinations only — the homepage narrative (problem/services/process/
                about) is read by scrolling and lives in the footer sitemap. */}
            <div className="nav-links">
              <Link href="/digital-employees">Digital Employees</Link>
              <a href="/#tools">Tools</a>
              <a href="/#checklist">Free Checklist</a>
            </div>
            <a href="/#contact" className="btn btn-primary btn-sm">
              Tell us your bottleneck &rarr;
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="erase friction — home">
            <Wordmark />
          </Link>
          <p className="footer-tagline">Custom software, automation &amp; AI that erase the busywork.</p>
          <p className="footer-tagline">
            Call or text <a href="tel:+12515545575">251-554-5575</a>
          </p>
        </div>
        <nav className="footer-cols" aria-label="Footer">
          <div className="footer-col">
            <h3>Company</h3>
            <a href="/#about">About</a>
            <a href="/#process">Process</a>
            <a href="/#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h3>Offerings</h3>
            <Link href="/digital-employees">Digital Employees</Link>
            <a href="/#services">Services</a>
            <a href="/#tools">Tools</a>
            <a href="/#checklist">Free Checklist</a>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom" style={{ textAlign: "center" }}>
        <p>
          &copy; <Year />{" "}
          <Link href="/" aria-label="erase friction — home">
            <span className="logo-erase" style={{ color: "var(--color-accent)", fontWeight: 600 }}>erase</span>{" "}
            <span
              className="logo-friction"
              style={{
                textDecoration: "line-through",
                textDecorationColor: "var(--color-accent)",
                textDecorationThickness: "1.5px",
                fontWeight: 600,
              }}
            >
              friction
            </span>
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
