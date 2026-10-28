import { NAV, SITE, START_CTA } from "@/content/site";
import { SkylineMark } from "./Marks";

/**
 * Zero-hydration header (technical audit, finding 6). The site is a static export:
 * shipping React runtime to toggle a menu cost ~480 KB of framework JavaScript on
 * every page and dominated mobile LCP. The header is now plain server-rendered HTML;
 * the two behaviors that needed JS — menu toggle and the active-nav highlight — run
 * from the tiny inline script below, which executes before first paint.
 *
 * The script mirrors the old usePathname matching semantics: trailing-slash-insensitive
 * and prefix-based (so essay pages under /ideas/ keep the Ideas item highlighted).
 * If a client component ever needs to live here again, add its route to HYDRATED
 * in scripts/optimize-static.mjs — otherwise the build strips its scripts.
 */
const HEADER_SCRIPT = `
(function () {
  var header = document.currentScript.closest(".site-header");
  if (!header) return;
  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector(".nav");
  function setOpen(open) {
    if (!nav || !toggle) return;
    nav.dataset.open = String(open);
    toggle.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(nav.dataset.open !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }
  if (nav) {
    var path = location.pathname.replace(/\\/+$/, "") || "/";
    nav.querySelectorAll("a[href]").forEach(function (a) {
      if (a.classList.contains("btn")) return;
      var href = a.getAttribute("href").replace(/\\/+$/, "") || "/";
      var active = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
      if (active) a.setAttribute("aria-current", "page");
    });
  }
})();`;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="/" className="wordmark">
          <SkylineMark className="wordmark__mark" />
          <span>
            Olive Juice <em>Digital</em>
          </span>
          <span className="sr-only">{` — ${SITE.tagline}`}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded="false"
          aria-controls="primary-nav"
          data-open="false"
        >
          <span className="sr-only" data-icon-label="open">
            Open menu
          </span>
          <span className="sr-only" data-icon-label="close">
            Close menu
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <g data-icon="open">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g data-icon="close">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </button>

        <nav id="primary-nav" className="nav" data-open="false" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href={START_CTA.href} className="btn btn--primary btn--sm">
            {START_CTA.label}
          </a>
        </nav>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HEADER_SCRIPT }} />
    </header>
  );
}
