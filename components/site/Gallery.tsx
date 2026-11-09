"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { salon } from "@/config/salon.config";
import type { GalleryCategoryId, GalleryItem } from "@/config/types";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
type Filter = "all" | GalleryCategoryId;

/** Keeps tall and wide photographs from producing extreme tiles. */
const tileRatio = (item: GalleryItem) => {
  const natural = item.photo.width / item.photo.height;
  return Math.min(1.25, Math.max(0.75, natural));
};

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = salon.galleryCategories.filter((c) => salon.gallery.some((g) => g.categories.includes(c.id)));
  const items = filter === "all" ? salon.gallery : salon.gallery.filter((g) => g.categories.includes(filter));

  return (
    <div className="gallery">
      <div className="seg gallery__filters" role="group" aria-label="Filter the gallery by category">
        <button type="button" className="seg__btn" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="seg__btn"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <m.ul
        key={filter}
        className="masonry"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        {items.map((item, i) => (
          <Reveal key={item.id} as="li" curtain delay={Math.min(i, 8) * 0.06} className="masonry__item">
            <button
              type="button"
              className="tile"
              onClick={() => setOpenIndex(i)}
              aria-label={`View larger: ${item.caption}`}
            >
              <span className="tile__frame" style={{ aspectRatio: tileRatio(item) }}>
                <Photo photo={item.photo} sizes="(min-width: 75rem) 24vw, (min-width: 45rem) 32vw, 48vw" />
              </span>
              <span className="tile__caption">{item.caption}</span>
            </button>
          </Reveal>
        ))}
      </m.ul>

      <Lightbox items={items} index={openIndex} onIndex={setOpenIndex} />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
}: {
  items: GalleryItem[];
  index: number | null;
  onIndex: (next: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflowY = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Photograph viewer"
      onClose={() => onIndex(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {item && (
        <m.div
          key={item.id}
          className="lightbox__body"
          style={{ "--ratio": item.photo.width / item.photo.height } as CSSProperties}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="lightbox__stage">
            <Image
              src={item.photo.src}
              alt={item.photo.alt}
              fill
              sizes="90vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="lightbox__bar">
            <p className="lightbox__caption">{item.caption}</p>
            {item.photo.credit ? (
              <a className="lightbox__credit" href={item.photo.credit.url} target="_blank" rel="noopener noreferrer">
                Photo: {item.photo.credit.author}, {item.photo.credit.license}
              </a>
            ) : (
              <span className="lightbox__credit">Illustrative image</span>
            )}
          </div>
        </m.div>
      )}
      <button type="button" className="lightbox__btn lightbox__btn--close" onClick={() => ref.current?.close()}>
        <X size={22} strokeWidth={1.5} aria-hidden="true" />
        <span className="visually-hidden">Close viewer</span>
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__btn--prev" onClick={() => step(-1)}>
            <ChevronLeft size={26} strokeWidth={1.5} aria-hidden="true" />
            <span className="visually-hidden">Previous photograph</span>
          </button>
          <button type="button" className="lightbox__btn lightbox__btn--next" onClick={() => step(1)}>
            <ChevronRight size={26} strokeWidth={1.5} aria-hidden="true" />
            <span className="visually-hidden">Next photograph</span>
          </button>
        </>
      )}
    </dialog>
  );
}
