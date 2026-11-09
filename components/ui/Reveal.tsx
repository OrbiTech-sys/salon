"use client";

import type { ReactNode } from "react";
import { m, type TargetAndTransition } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "figure" | "article";
  /** Rack focus: the block pulls from a soft blur into sharpness as it rises. Used for headings. */
  focus?: boolean;
  /** Curtain: a sheet of page colour lifts off the block from the bottom edge upward. Used for photographs. */
  curtain?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered reveal. Runs once; reduced motion keeps only the fade.
 * The curtain is a separate overlay, never a clip on the content, so images underneath still load normally.
 */
export function Reveal({ children, className, delay = 0, y = 18, as = "div", focus = false, curtain = false }: Props) {
  const Tag = m[as] as typeof m.div;

  if (curtain) {
    return (
      <Tag className={className} style={{ position: "relative" }}>
        {children}
        <m.span
          className="curtain"
          aria-hidden="true"
          data-reveal
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 100% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.1, delay, ease }}
        />
      </Tag>
    );
  }

  const hidden: TargetAndTransition = focus ? { opacity: 0, y: y + 12, filter: "blur(10px)" } : { opacity: 0, y };
  const shown: TargetAndTransition = focus ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 };
  return (
    <Tag
      className={className}
      data-reveal
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: focus ? 1 : 0.7, delay, ease }}
    >
      {children}
    </Tag>
  );
}
