"use client";

import { m, type Variants } from "motion/react";
import { photos } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <m.div className="hero__copy" variants={stagger} initial="hidden" animate="show" data-hero>
          <h1 id="hero-title">
            <m.span className="hero__line" variants={rise}>
              Beautiful Hair.
            </m.span>
            <m.span className="hero__line" variants={rise}>
              Unmistakably You.
            </m.span>
          </h1>
          <m.p className="hero__lede" variants={rise}>
            Thoughtful artistry, personalized care, and exceptional hair experiences designed around you.
          </m.p>
          <m.div className="hero__actions" variants={rise}>
            <BookLink className="btn">Book your appointment</BookLink>
            <a className="link-quiet" href="#services">
              Discover our services
            </a>
          </m.div>
          <m.p className="hero__trust" variants={rise}>
            Every visit begins with a private consultation.
          </m.p>
        </m.div>

        <m.figure
          className="hero__photo"
          initial={{ clipPath: "inset(6% 6% 6% 6%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease }}
        >
          <m.div
            className="hero__photo-inner"
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            <Photo photo={photos.ombre} sizes="(min-width: 60rem) 52vw, 100vw" priority />
          </m.div>
        </m.figure>
      </div>
    </section>
  );
}
