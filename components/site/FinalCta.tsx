import { BookLink } from "@/components/ui/BookLink";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section id="close" className="section section--band final" aria-labelledby="final-title">
      <div className="container final__grid">
        <Reveal className="final__head">
          <h2 id="final-title" className="display-s">
            Your Next Great Hair Day Starts Here.
          </h2>
        </Reveal>
        <Reveal className="final__side" delay={0.1}>
          <p className="lead">Discover your style. Meet your artist. Experience the difference.</p>
          <BookLink className="btn">Book your appointment</BookLink>
        </Reveal>
      </div>
    </section>
  );
}
