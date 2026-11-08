"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { BookingProvider } from "./BookingProvider";

/** Motion is loaded lazily with only the DOM animation features, and honours prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <BookingProvider>{children}</BookingProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
