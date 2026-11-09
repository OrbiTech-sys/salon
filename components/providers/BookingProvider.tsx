"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** The values a booking button wants the form to pick up. Only what the latest button set is applied. */
export type BookingChoice = {
  serviceId?: string;
  stylistId?: string;
  /** "YYYY-MM-DD" */
  date?: string;
  /** "HH:MM", 24 hour */
  time?: string;
};

export type BookingSelection = {
  /** Increments on every selection, so the form reacts even when the same choice is made twice. */
  nonce: number;
  last: BookingChoice;
};

type BookingContextValue = {
  selection: BookingSelection;
  select: (next: BookingChoice) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<BookingSelection>({ nonce: 0, last: {} });

  const select = useCallback((next: BookingChoice) => {
    setSelection((prev) => ({ nonce: prev.nonce + 1, last: next }));
  }, []);

  const value = useMemo(() => ({ selection, select }), [selection, select]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
