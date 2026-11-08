import { salon } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function Artists() {
  return (
    <section id="artists" className="section artists" aria-labelledby="artists-title">
      <div className="container">
        <Reveal className="section__head">
          <h2 id="artists-title">Meet the artists behind the chair</h2>
          <p className="head-note">
            Demo profiles. The names and biographies are fictional, and the photographs are stock stand-ins for your team.
          </p>
        </Reveal>
        <ul className="artists__list">
          {salon.stylists.map((stylist, i) => (
            <Reveal key={stylist.id} as="li" className="artist" delay={i * 0.08}>
              <div className="artist__photo">
                <Photo photo={stylist.portrait} sizes="(min-width: 75rem) 24vw, (min-width: 40rem) 46vw, 100vw" />
              </div>
              <h3>{stylist.name}</h3>
              <p className="artist__title">{stylist.title}</p>
              <p className="artist__specialties">{stylist.specialties.map((s, j) => (j === 0 ? s : s.charAt(0).toLowerCase() + s.slice(1))).join(", ")}</p>
              <p className="artist__intro">{stylist.intro}</p>
              <BookLink stylistId={stylist.id} className="link-action" aria-label={`Book with ${stylist.name}`}>
                Book with {stylist.name.split(" ")[0]}
              </BookLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
