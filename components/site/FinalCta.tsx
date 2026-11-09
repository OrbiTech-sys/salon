"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { photos } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1]);

  return (
    <section ref={ref} id="close" className="final" aria-labelledby="final-title">
      <m.div className="final__bg" style={{ y, scale }} aria-hidden="true">
        <Photo photo={photos.closing} sizes="100vw" decorative />
      </m.div>
      <div className="final__scrim" aria-hidden="true" />
      <div className="container final__grid">
        <Reveal focus className="final__head">
          <h2 id="final-title" className="display-s">
            Your Next Great Hair Day Starts Here.
          </h2>
        </Reveal>
        <Reveal className="final__side" delay={0.12}>
          <p className="lead">Discover your style. Meet your artist. Experience the difference.</p>
          <BookLink className="btn">Book your appointment</BookLink>
        </Reveal>
      </div>
    </section>
  );
}
