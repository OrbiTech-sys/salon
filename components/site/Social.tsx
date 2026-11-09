import { salon } from "@/config/salon.config";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function Social() {
  const instagram = salon.social.find((s) => s.label === "Instagram") ?? salon.social[0];
  return (
    <section id="social" className="section social" aria-labelledby="social-title">
      <div className="container">
        <Reveal focus className="section__head">
          <h2 id="social-title">Follow our work</h2>
          <div className="social__follow">
            <a className="btn btn--quiet" href={instagram.url} target="_blank" rel="noopener noreferrer">
              Follow us on Instagram
            </a>
            <p className="note">
              {instagram.handle ? `${instagram.handle} is a placeholder handle. ` : ""}A live feed can be connected later.
            </p>
          </div>
        </Reveal>
        <ul className="social__grid">
          {salon.social_gallery.map((item, i) => (
            <Reveal key={item.id} as="li" curtain delay={i * 0.07}>
              <a
                className="social__tile"
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Instagram. Photo: ${item.photo.alt}`}
              >
                <Photo photo={item.photo} sizes="(min-width: 75rem) 16vw, (min-width: 40rem) 32vw, 48vw" />
                <span className="social__hover" aria-hidden="true">
                  View on Instagram
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
