import { NAV, SERVICE_LINKS, SITE, START_CTA } from "@/content/site";
import { SkylineMark } from "./Marks";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div>
            <SkylineMark
              className="site-footer__skyline"
              lineColor="var(--text-on-dark)"
            />
            <p>
              {SITE.name}
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <ul className="site-footer__nav">
            {[...NAV, START_CTA].map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>
            </li>
            {SERVICE_LINKS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__bottom">
          <span>
            © {year} {SITE.name}
          </span>
          <span className="olive-juice-note">
            Say &ldquo;olive juice&rdquo; without a sound. It looks a lot like
            &ldquo;I love you.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
