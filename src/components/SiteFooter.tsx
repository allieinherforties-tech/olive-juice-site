import Link from "next/link";
import { NAV, SITE, START_CTA } from "@/content/site";
import { SkylineMark } from "./Marks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <SkylineMark className="site-footer__skyline" lineColor="var(--text-on-dark)" />
            <p>
              {SITE.name}
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <ul className="site-footer__nav">
            {[...NAV, START_CTA].map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__bottom">
          <span>
            © {year} {SITE.name}
          </span>
          <span className="olive-juice-note">
            Say &ldquo;olive juice&rdquo; without a sound. It looks a lot like &ldquo;I love you.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
