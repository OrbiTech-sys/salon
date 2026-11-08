"use client";

import type { ReactNode } from "react";

/** Jumps to the services section and opens the given category there. */
export function FooterServiceLink({ categoryId, children }: { categoryId: string; children: ReactNode }) {
  return (
    <a
      href="#services"
      onClick={() => window.dispatchEvent(new CustomEvent("salon:category", { detail: categoryId }))}
    >
      {children}
    </a>
  );
}
