"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "figure" | "article";
};

/** Scroll-triggered reveal. Runs once, from a small rise and fade; reduced motion keeps the fade only. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={className}
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
