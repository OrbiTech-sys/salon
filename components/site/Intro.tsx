import { photos, salon } from "@/config/salon.config";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="about" className="section section--l intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <Reveal className="intro__photo">
          <div className="frame">
            <Photo photo={photos.colourWall} sizes="(min-width: 60rem) 52vw, 100vw" />
          </div>
        </Reveal>
        <div className="intro__text">
          <Reveal>
            <h2 id="intro-title">Beauty Is Personal. Your Hair Should Be Too.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="intro__story">
              {salon.name} is a hair atelier built around conversation. We listen first, then cut, color and style with
              the patience of a studio, so your hair looks like you on an ordinary Tuesday, not only on the day you leave.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="signature">{salon.tagline}</p>
            <a className="link-action" href="#approach">
              Our approach
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
