import Link from "next/link";
import NavMenu from "./NavMenu";
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
          <div className="nav-actions">
            {/* Proof shouldn't take two clicks — /work stays in the menu for
                small screens, but gets a direct link once there's room. */}
            <Link href="/work" className="nav-link">
              Our Work
            </Link>
            <a href="/#contact" className="btn btn-primary btn-sm">
              {/* The full label doesn't fit next to the logo and menu button on
                  small phones; CSS swaps in the short one below ~480px. */}
              <span className="cta-full">Tell us what&rsquo;s stuck &rarr;</span>
              <span className="cta-short">What&rsquo;s stuck &rarr;</span>
            </a>
            <NavMenu />
          </div>
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
          <p className="footer-tagline">Websites, software &amp; automation that erase the friction.</p>
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
            <Link href="/services">Services</Link>
            <Link href="/everything-we-do">Everything We Do</Link>
            <Link href="/digital-employees">Digital Employees</Link>
            <Link href="/work">Our Work</Link>
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
