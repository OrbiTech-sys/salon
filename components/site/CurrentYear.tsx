"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
/** Rendered during the build with a fixed year, then replaced with the visitor's current year in the browser. */
const FALLBACK_YEAR = 2026;

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );
  return <span className="num">{year}</span>;
}
