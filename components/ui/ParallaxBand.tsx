"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import type { Photo as PhotoType } from "@/config/types";
import { Photo } from "./Photo";

/** A wide strip of salon photography between sections. It drifts sideways as the page scrolls past it. */
export function ParallaxBand({ photo }: { photo: PhotoType }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"]);
  return (
    <div ref={ref} className="pband" aria-hidden="true">
      <m.div className="pband__inner" style={{ x }}>
        <Photo photo={photo} sizes="130vw" decorative />
      </m.div>
    </div>
  );
}
