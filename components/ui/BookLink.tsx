"use client";

import type { MouseEvent, ReactNode } from "react";
import { salon } from "@/config/salon.config";
import { useBooking } from "@/components/providers/BookingProvider";

type Props = {
  children: ReactNode;
  className?: string;
  serviceId?: string;
  stylistId?: string;
  /** Called when the link is activated, e.g. to close a menu that contains it. */
  onActivate?: () => void;
  "aria-label"?: string;
};

export function scrollToBooking() {
  const target = document.getElementById("book");
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/**
 * Every booking button on the site. With an external booking URL configured it opens that URL.
 * Otherwise it scrolls to the booking form and pre-selects the service or artist it was given.
 */
export function BookLink({ children, className, serviceId, stylistId, onActivate, ...rest }: Props) {
  const { select } = useBooking();
  const external = salon.booking.externalUrl;

  if (external) {
    return (
      <a href={external} target="_blank" rel="noopener noreferrer" className={className} onClick={onActivate} {...rest}>
        {children}
      </a>
    );
  }

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    select({ serviceId, stylistId });
    onActivate?.();
    // A menu that was open has to release its scroll lock before the page can move.
    if (onActivate) window.setTimeout(scrollToBooking, 80);
    else scrollToBooking();
  };

  return (
    <a href="#book" onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
