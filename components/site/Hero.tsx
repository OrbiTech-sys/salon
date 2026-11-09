"use client";

import { useCallback, useRef, useState } from "react";
import { m, useScroll, useTransform, type Variants } from "motion/react";
import { Pause, Play } from "lucide-react";
import { photos } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";
import { SilkMotion } from "@/components/hair/SilkMotion";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

/** Title-card reveal: each line pulls into focus as it rises. */
const focusPull: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(14px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Full-bleed photographic hero: the nav floats over it, the headline sits on a scrim, and the photograph drifts as you scroll. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [capable, setCapable] = useState(false);
  const [paused, setPaused] = useState(false);
  const onCapable = useCallback(() => setCapable(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <m.div className="hero__media" style={{ y, scale }} aria-hidden={undefined}>
        <m.div
          className="hero__media-intro"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Photo photo={photos.hero} sizes="100vw" priority />
          <SilkMotion
            src={photos.hero.src}
            position={photos.hero.position}
            sway={0}
            paused={paused}
            onCapable={onCapable}
          />
        </m.div>
      </m.div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__content">
        <m.div className="hero__copy" variants={stagger} initial="hidden" animate="show" data-hero>
          <h1 id="hero-title">
            <m.span className="hero__line" variants={focusPull}>
              Beautiful Hair.
            </m.span>
            <m.span className="hero__line" variants={focusPull}>
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
      </div>

      {capable && (
        <button type="button" className="silk__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? <Play size={16} strokeWidth={1.75} aria-hidden="true" /> : <Pause size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span className="visually-hidden">{paused ? "Play hair motion" : "Pause hair motion"}</span>
        </button>
      )}
    </section>
  );
}
