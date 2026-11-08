"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the nav item whose section is currently nearest the top third of the viewport.
 * `map` is nav id -> list of section element ids that belong to it.
 */
export function useActiveSection(map: Record<string, string[]>, fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const entries = Object.entries(map).flatMap(([navId, ids]) => ids.map((id) => [id, navId] as const));
    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.33;
      let best: { navId: string; top: number } | null = null;
      for (const [id, navId] of entries) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold && (!best || top > best.top)) best = { navId, top };
      }
      setActive(best ? best.navId : fallback);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [map, fallback]);

  return active;
}
