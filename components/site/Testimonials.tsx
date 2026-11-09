"use client";

import { useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { salon } from "@/config/salon.config";

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const total = salon.testimonials.length;
  const item = salon.testimonials[index];

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
  };

  return (
    <section id="reviews" className="section section--l reviews" aria-labelledby="reviews-title">
      <div className="container reviews__grid">
        <h2 id="reviews-title" className="reviews__title">
          What clients say
        </h2>

        <div
          className="reviews__stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Sample client reviews"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="reviews__viewport" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <m.figure
                key={item.id}
                className="review"
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease }}
              >
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="review__stars" role="img" aria-label={`Sample rating: ${item.rating} out of 5`}>
                    {Array.from({ length: item.rating }, (_, i) => (
                      <Star key={i} size={16} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
                    ))}
                  </span>
                  <span className="review__who">{item.attribution}</span>
                  {item.sample && (
                    <span className="review__sample">Sample review for the demo. Replace it with a real client quote.</span>
                  )}
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className="reviews__controls">
            <button type="button" className="icon-btn" onClick={() => go(-1)}>
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden">Previous review</span>
            </button>
            <p className="reviews__count num" aria-hidden="true">
              {index + 1} of {total}
            </p>
            <button type="button" className="icon-btn" onClick={() => go(1)}>
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden">Next review</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
