import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { Gallery } from "./Gallery";

export function Transformations() {
  return (
    <section id="gallery" className="section section--l transformations" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal focus className="section__head">
          <h2 id="gallery-title">Featured transformations</h2>
          <p className="head-note">Compare a look, then browse the work by category.</p>
        </Reveal>
        <Reveal>
          <BeforeAfter />
        </Reveal>
        <Gallery />
      </div>
    </section>
  );
}
