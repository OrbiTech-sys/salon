import { salon } from "@/config/salon.config";
import { formatHours } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(salon.contact.mapsQuery)}`;

export function Contact() {
  const { contact } = salon;
  return (
    <section id="contact" className="section section--band contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__top">
          <Reveal focus className="contact__head">
            <h2 id="contact-title">Visit the salon</h2>
          </Reveal>
          <Reveal className="contact__details" delay={0.08}>
            <address className="contact__address">
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul className="contact__links">
              <li>
                <a className="link-action" href={contact.phoneHref}>
                  Call {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="link-action" href={`mailto:${contact.email}`}>
                  Email {contact.email}
                </a>
              </li>
              <li>
                <a className="link-action" href={directionsUrl()} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </li>
            </ul>
            <ul className="contact__social" aria-label="Social media">
              {salon.social.map((link) => (
                <li key={link.label}>
                  <a className="link-quiet" href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {contact.isPlaceholder && <p className="note">Placeholder address, phone and email for the demo.</p>}
          </Reveal>
        </div>

        <Reveal className="contact__week" delay={0.12}>
          <h3 className="week__title">Opening hours</h3>
          <dl className="week">
            {salon.hours.map((row) => (
              <div key={row.day} className="week__day">
                <dt>{row.day}</dt>
                <dd className="num">{formatHours(row)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {contact.mapEmbedUrl && (
          <div className="contact__map">
            <iframe
              title={`Map showing the location of ${salon.name}`}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
