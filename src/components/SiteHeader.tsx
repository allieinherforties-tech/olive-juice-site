"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE, START_CTA } from "@/content/site";
import { SkylineMark } from "./Marks";

/** Trailing-slash-insensitive match so "/about" and "/about/" both mark the nav item. */
export function isActivePath(pathname: string, href: string): boolean {
  const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  return normalize(pathname) === normalize(href);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="wordmark" onClick={close}>
          <SkylineMark className="wordmark__mark" />
          <span>
            Olive Juice <em>Digital</em>
          </span>
          <span className="sr-only">{` — ${SITE.tagline}`}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <nav id="primary-nav" className="nav" data-open={open} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href={START_CTA.href} className="btn btn--primary btn--sm" onClick={close}>
            {START_CTA.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
