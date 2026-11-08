"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { salon } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { useActiveSection } from "@/lib/use-active-section";
import { Wordmark } from "./Wordmark";

const SECTION_MAP = Object.fromEntries(salon.nav.map((item) => [item.id, item.sections]));
const LEFT = salon.nav.slice(0, 3);
const RIGHT = salon.nav.slice(3);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_MAP, "top");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock page scroll, move focus into the menu and close on Escape while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflowY = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close the menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 80rem)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const link = (item: (typeof salon.nav)[number]) => (
    <a
      key={item.id}
      href={item.href}
      className="nav__link"
      aria-current={active === item.id ? "true" : undefined}
    >
      {item.label}
    </a>
  );

  return (
    <header className="nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="container nav__inner">
        <nav className="nav__side nav__side--left" aria-label="Primary">
          {LEFT.map(link)}
        </nav>
        <div className="nav__brand">
          <Wordmark />
        </div>
        <div className="nav__side nav__side--right">
          <nav className="nav__group" aria-label="Secondary">
            {RIGHT.map(link)}
          </nav>
          <BookLink className="btn btn--small nav__cta">Book appointment</BookLink>
          <button
            ref={toggleRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="visually-hidden">Open menu</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={panelRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mobile-menu__bar">
              <Wordmark onClick={close} />
              <button ref={closeRef} type="button" className="menu-btn" onClick={close}>
                <X size={24} strokeWidth={1.5} aria-hidden="true" />
                <span className="visually-hidden">Close menu</span>
              </button>
            </div>
            <m.nav
              className="container mobile-menu__links"
              aria-label="Mobile"
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {salon.nav.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="mobile-menu__link"
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <BookLink className="btn mobile-menu__cta" onActivate={() => setOpen(false)}>
                Book appointment
              </BookLink>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
