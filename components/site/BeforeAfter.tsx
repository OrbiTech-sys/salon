"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { animate, useInView } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import { salon } from "@/config/salon.config";
import { Photo } from "@/components/ui/Photo";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Draggable before/after comparison. Pointer drag works anywhere on the image; the hidden range input
 * gives keyboard and screen-reader control. With no real "before" photograph configured, the demo
 * shows the same stock photograph with a filter, and says so.
 */
export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const item = salon.beforeAfter[index];
  const touched = useRef(false);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -25% 0px" });

  // Cinematic intro: the divider sweeps once across the frame to show both sides, unless the visitor takes over first.
  useEffect(() => {
    if (!inView || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, 1, {
      duration: 3.4,
      ease: "easeInOut",
      onUpdate: (p) => {
        if (!touched.current) setPosition(50 + 38 * Math.sin(p * Math.PI * 2));
      },
    });
    return () => controls.stop();
  }, [inView]);

  const moveTo = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    touched.current = true;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  const selectItem = (next: number) => {
    touched.current = true;
    setIndex(next);
    setPosition(50);
  };

  return (
    <div className="ba">
      <div
        ref={frameRef}
        className="ba__frame"
        style={{ "--pos": `${position}%` } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="ba__layer">
          <Photo photo={item.after} sizes="(min-width: 60rem) 58vw, 100vw" />
        </div>
        <div className="ba__layer ba__layer--before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <div className="ba__filter" style={{ filter: item.before ? undefined : item.beforeFilter }}>
            <Photo photo={item.before ?? item.after} sizes="(min-width: 60rem) 58vw, 100vw" />
          </div>
        </div>
        <span className="ba__tag ba__tag--before" aria-hidden="true">
          Before
        </span>
        <span className="ba__tag ba__tag--after" aria-hidden="true">
          After
        </span>
        <input
          className="ba__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(event) => {
            touched.current = true;
            setPosition(Number(event.target.value));
          }}
          aria-label={`Compare before and after: ${item.title}`}
          aria-valuetext={`${Math.round(position)} percent of the before image shown`}
        />
        <span className="ba__handle" aria-hidden="true">
          <span className="ba__grip">
            <MoveHorizontal size={20} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </span>
      </div>

      <div className="ba__info">
        <div className="seg" role="group" aria-label="Choose a comparison">
          {salon.beforeAfter.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              className="seg__btn"
              aria-pressed={i === index}
              onClick={() => selectItem(i)}
            >
              {entry.title}
            </button>
          ))}
        </div>
        <h3 className="ba__title">{item.title}</h3>
        <p>{item.description}</p>
        <p className="note">
          Interactive demo on one photograph with a filter standing in for &ldquo;before&rdquo;. A real salon replaces it with
          genuine client before and after photographs.
        </p>
      </div>
    </div>
  );
}
