"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BookingSelection = {
  serviceId: string;
  stylistId: string;
  /** Increments on every selection, so the form can react even when the same service is chosen twice. */
  nonce: number;
};

type BookingContextValue = {
  selection: BookingSelection;
  select: (next: { serviceId?: string; stylistId?: string }) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<BookingSelection>({ serviceId: "", stylistId: "", nonce: 0 });

  const select = useCallback((next: { serviceId?: string; stylistId?: string }) => {
    setSelection((prev) => ({
      serviceId: next.serviceId ?? prev.serviceId,
      stylistId: next.stylistId ?? prev.stylistId,
      nonce: prev.nonce + 1,
    }));
  }, []);

  const value = useMemo(() => ({ selection, select }), [selection, select]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
