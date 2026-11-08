import Link from "next/link";
import { allCredits, salon } from "@/config/salon.config";
import { formatHours } from "@/lib/format";
import { CurrentYear } from "./CurrentYear";
import { directionsUrl } from "./Contact";
import { FooterServiceLink } from "./FooterServiceLink";

export function Footer() {
  const { contact } = salon;
  const credits = allCredits();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__mast">
          <p className="footer__name" aria-hidden="true">
            {salon.logo.text}
          </p>
          <p className="footer__statement">{salon.tagline}</p>
        </div>

        <div className="footer__grid">
          <nav aria-label="Footer navigation">
            <h2 className="footer__h">Explore</h2>
            <ul>
              {salon.nav.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <h2 className="footer__h">Services</h2>
            <ul>
              {salon.services.map((category) => (
                <li key={category.id}>
                  <FooterServiceLink categoryId={category.id}>{category.name}</FooterServiceLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="footer__h">Contact</h2>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul>
              <li>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={directionsUrl()} target="_blank" rel="noopener noreferrer">
                  Directions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer__h">Hours</h2>
            <dl className="footer__hours">
              {salon.hours.map((row) => (
                <div key={row.day}>
                  <dt>{row.day}</dt>
                  <dd className="num">{formatHours(row)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="footer__social">
          <ul aria-label="Social media">
            {salon.social.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__legal">
          <p>
            Copyright <CurrentYear /> {salon.name}. Demo website by{" "}
            {salon.agency.url ? (
              <a href={salon.agency.url} target="_blank" rel="noopener noreferrer">
                {salon.agency.name}
              </a>
            ) : (
              salon.agency.name
            )}
            .
          </p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <p className="footer__credits" data-credits>
          Photographs:{" "}
          {credits.map((c, i) => (
            <span key={c.url}>
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.author}
              </a>{" "}
              ({c.license}){i < credits.length - 1 ? ", " : "."}
            </span>
          ))}{" "}
          Licensed stand-ins from Wikimedia Commons, not work by this salon.
        </p>
      </div>
    </footer>
  );
}
