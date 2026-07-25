import Link from "next/link";
import { Wordmark, SiteFooter } from "./SiteChrome";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className="navbar">
        <nav className="nav-inner">
          <Link href="/" className="nav-logo">
            <Wordmark />
          </Link>
          <Link href="/" className="nav-back">
            &larr; Back to site
          </Link>
        </nav>
      </header>
      <main id="main" className="legal">
        <h1>{title}</h1>
        <p className="updated">Last updated: {updated}</p>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
