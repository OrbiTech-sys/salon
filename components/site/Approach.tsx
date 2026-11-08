import { salon } from "@/config/salon.config";
import { Reveal } from "@/components/ui/Reveal";

export function Approach() {
  return (
    <section id="approach" className="section section--band approach" aria-labelledby="approach-title">
      <div className="container approach__grid">
        <Reveal className="approach__head">
          <h2 id="approach-title">The care behind every appointment</h2>
        </Reveal>
        <ul className="approach__list">
          {salon.why.map((item, i) => (
            <Reveal key={item.id} as="li" className="approach__row" delay={i * 0.05}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
