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
            <div className="nav-links">
              <a href="/#problem">The Problem</a>
              <a href="/#services">Services</a>
              <a href="/#process">Process</a>
              <a href="/#about">About</a>
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
      <div className="footer-bottom" style={{ textAlign: "center" }}>
        <div className="footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
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
        <p className="footer-phone">
          Call or text <a href="tel:+12515545575">251-554-5575</a>
        </p>
      </div>
    </footer>
  );
}
