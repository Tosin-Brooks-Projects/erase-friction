"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { href: "/#checklist", label: "Free Checklist", pageLink: false },
  { href: "/digital-employees", label: "Digital Employees", pageLink: true },
  { href: "/work", label: "Our Work", pageLink: true },
  { href: "/#about", label: "About", pageLink: false },
  { href: "/#contact", label: "Contact", pageLink: false },
];

/** The site menu — one hamburger for every screen size, next to the CTA. */
export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="nav-menu" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        className="nav-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="17" x2="20" y2="17"></line>
          </svg>
        )}
      </button>
      {open && (
        <nav className="nav-menu-panel" id="site-menu" aria-label="Site menu">
          {ITEMS.map((item) =>
            item.pageLink ? (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ),
          )}
        </nav>
      )}
    </div>
  );
}
