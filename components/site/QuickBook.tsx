"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { salon } from "@/config/salon.config";
import { useBooking } from "@/components/providers/BookingProvider";
import { scrollToBooking } from "@/components/ui/BookLink";
import { formatTime, slotsFor, todayISO, upcomingOpenDays } from "@/lib/format";

const noopSubscribe = () => () => {};

/**
 * A quick way to start: pick one of the next open days and a time, and the booking form below opens with
 * both filled in. With an external booking URL configured it becomes a single link to that URL.
 */
export function QuickBook() {
  const { select } = useBooking();
  // Dates depend on the visitor's clock, so the server render leaves them out.
  const today = useSyncExternalStore(noopSubscribe, todayISO, () => "");
  const days = useMemo(() => (today ? upcomingOpenDays(today, salon.hours, 6) : []), [today]);
  const [pickedDate, setPickedDate] = useState("");
  const [time, setTime] = useState("");

  const date = days.some((d) => d.iso === pickedDate) ? pickedDate : (days[0]?.iso ?? "");
  const weekday = date ? new Date(`${date}T12:00:00`).getDay() : -1;
  const row = salon.hours.find((h) => h.weekday === weekday);
  const hourly = slotsFor(row, salon.booking.slotMinutes, salon.booking.lastStartBeforeClose).filter((s) => s.endsWith(":00"));
  // Skip hours that have already passed today.
  const nowMinutes = date && date === today ? new Date().getHours() * 60 + new Date().getMinutes() : -1;
  const slots = hourly.filter((s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3)) > nowMinutes);
  const external = salon.booking.externalUrl;

  const request = () => {
    if (!date || !time) return;
    select({ date, time });
    scrollToBooking();
  };

  return (
    <section className="quick" aria-labelledby="quick-title">
      <div className="container">
        <div className="quick__panel">
          <h2 id="quick-title" className="quick__head">
            When would you like to visit?
          </h2>
          {external ? (
            <div className="quick__body">
              <p>Choose your service and time on {salon.booking.platformName}.</p>
              <a className="btn" href={external} target="_blank" rel="noopener noreferrer">
                Book your appointment
              </a>
            </div>
          ) : (
            <div className="quick__body">
              <div className="chips" role="group" aria-label="Choose a day">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    className="chip"
                    aria-pressed={d.iso === date}
                    onClick={() => {
                      setPickedDate(d.iso);
                      setTime("");
                    }}
                  >
                    <span className="chip__day">{d.weekday}</span>
                    <span className="chip__date">{d.label}</span>
                  </button>
                ))}
              </div>
              <div className="chips" role="group" aria-label="Choose a time">
                {slots.map((s) => (
                  <button key={s} type="button" className="seg__btn" aria-pressed={s === time} onClick={() => setTime(s)}>
                    {formatTime(s)}
                  </button>
                ))}
              </div>
              <div className="quick__action">
                <button type="button" className="btn" onClick={request} disabled={!time} aria-disabled={!time}>
                  Request this time
                </button>
                <p className="note">Demo only: this opens the request form below. Nothing is reserved.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
