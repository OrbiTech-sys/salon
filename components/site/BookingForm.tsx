"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { salon } from "@/config/salon.config";
import { useBooking } from "@/components/providers/BookingProvider";
import { NO_PREFERENCE, bookingSchema, type BookingValues } from "@/lib/booking-schema";
import { formatLongDate, formatTime, slotsFor, todayISO, weekdayOf } from "@/lib/format";

const ease = [0.16, 1, 0.3, 1] as const;
const noopSubscribe = () => () => {};

type Phase = "editing" | "submitting" | "done";

const allServices = salon.services.flatMap((c) => c.services);
const serviceName = (id: string) => allServices.find((s) => s.id === id)?.name ?? id;
const stylistName = (id: string) =>
  id === NO_PREFERENCE ? "No preference" : (salon.stylists.find((s) => s.id === id)?.name ?? id);

function Field({
  id,
  label,
  error,
  children,
  wide,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "field field--wide" : "field"}>
      <label htmlFor={id}>{label}</label>
      {children}
      <p className="field__error" id={`${id}-error`} role={error ? "alert" : undefined}>
        {error}
      </p>
    </div>
  );
}

export function BookingForm() {
  const { selection } = useBooking();
  const [phase, setPhase] = useState<Phase>("editing");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<BookingValues | null>(null);
  const [seenNonce, setSeenNonce] = useState(0);
  // The earliest bookable date is known only in the browser; the server render leaves it empty.
  const today = useSyncExternalStore(noopSubscribe, todayISO, () => "");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", service: "", stylist: NO_PREFERENCE, date: "", time: "", message: "" },
  });

  const date = useWatch({ control, name: "date" });
  const message = useWatch({ control, name: "message" }) ?? "";
  const weekday = date ? weekdayOf(date) : null;
  const hoursRow = weekday === null ? undefined : salon.hours.find((h) => h.weekday === weekday);
  const slots = useMemo(
    () => slotsFor(hoursRow, salon.booking.slotMinutes, salon.booking.lastStartBeforeClose),
    [hoursRow],
  );

  // A time chosen for one day may not exist on another.
  useEffect(() => {
    if (getValues("time") && !slots.includes(getValues("time"))) setValue("time", "");
  }, [slots, getValues, setValue]);

  // A new selection from a Book button returns a finished form to editing (state adjusted during render, not in an effect).
  if (selection.nonce !== seenNonce) {
    setSeenNonce(selection.nonce);
    if (phase === "done") setPhase("editing");
  }

  // "Book this service" and "Book with this artist" buttons pre-select their values here.
  useEffect(() => {
    if (selection.nonce === 0) return;
    if (selection.serviceId) setValue("service", selection.serviceId, { shouldValidate: true });
    if (selection.stylistId) setValue("stylist", selection.stylistId, { shouldValidate: true });
  }, [selection, setValue]);

  const announce =
    selection.nonce === 0
      ? ""
      : [
          selection.serviceId ? `Service set to ${serviceName(selection.serviceId)}.` : "",
          selection.stylistId ? `Artist set to ${stylistName(selection.stylistId)}.` : "",
        ]
          .filter(Boolean)
          .join(" ");

  const onSubmit = async (values: BookingValues) => {
    setPhase("submitting");
    setSubmitError(null);
    try {
      if (salon.booking.endpoint) {
        const response = await fetch(salon.booking.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`The booking endpoint answered with status ${response.status}.`);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
      setSubmitted(values);
      setPhase("done");
    } catch {
      setSubmitError("We could not prepare your request. Check your connection and try again.");
      setPhase("editing");
    }
  };

  const submitting = phase === "submitting";
  const live = Boolean(salon.booking.endpoint);

  return (
    <div className="booking-form">
      <p className="visually-hidden" role="status" aria-live="polite">
        {announce}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {phase === "done" && submitted ? (
          <m.div
            key="done"
            className="result"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <h3 className="result__title">{live ? "Your request was sent" : "Your request preview is ready"}</h3>
            {!live && (
              <p className="result__demo">
                This is a demonstration. Nothing was sent and no appointment was reserved. Connect a booking platform to
                take real requests.
              </p>
            )}
            <dl className="result__list">
              <div>
                <dt>Service</dt>
                <dd>{serviceName(submitted.service)}</dd>
              </div>
              <div>
                <dt>Artist</dt>
                <dd>{stylistName(submitted.stylist)}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatLongDate(submitted.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{formatTime(submitted.time)}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{submitted.name}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  {submitted.email}, {submitted.phone}
                </dd>
              </div>
              {submitted.message && (
                <div>
                  <dt>Message</dt>
                  <dd>{submitted.message}</dd>
                </div>
              )}
            </dl>
            <div className="result__actions">
              <button type="button" className="btn btn--quiet" onClick={() => setPhase("editing")}>
                Edit request
              </button>
              <button
                type="button"
                className="link-action"
                onClick={() => {
                  reset();
                  setSubmitted(null);
                  setPhase("editing");
                }}
              >
                Start a new request
              </button>
            </div>
          </m.div>
        ) : (
          <m.form
            key="form"
            className="form"
            noValidate
            data-endpoint={salon.booking.endpoint}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            aria-busy={submitting}
          >
            <div className="form__grid">
              <Field id="bk-name" label="Your name" error={errors.name?.message}>
                <input
                  id="bk-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby="bk-name-error"
                  {...register("name")}
                />
              </Field>
              <Field id="bk-email" label="Email" error={errors.email?.message}>
                <input
                  id="bk-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby="bk-email-error"
                  {...register("email")}
                />
              </Field>
              <Field id="bk-phone" label="Phone" error={errors.phone?.message}>
                <input
                  id="bk-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby="bk-phone-error"
                  {...register("phone")}
                />
              </Field>
              <Field id="bk-service" label="Desired service" error={errors.service?.message}>
                <div className="select">
                  <select
                    id="bk-service"
                    aria-invalid={errors.service ? true : undefined}
                    aria-describedby="bk-service-error"
                    {...register("service")}
                  >
                    <option value="">Choose a service</option>
                    {salon.services.map((category) => (
                      <optgroup key={category.id} label={category.name}>
                        {category.services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className="select__icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
              </Field>
              <Field id="bk-stylist" label="Preferred artist" error={errors.stylist?.message}>
                <div className="select">
                  <select
                    id="bk-stylist"
                    aria-invalid={errors.stylist ? true : undefined}
                    aria-describedby="bk-stylist-error"
                    {...register("stylist")}
                  >
                    <option value={NO_PREFERENCE}>No preference</option>
                    {salon.stylists.map((stylist) => (
                      <option key={stylist.id} value={stylist.id}>
                        {stylist.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select__icon" size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
              </Field>
              <Field id="bk-date" label="Preferred date" error={errors.date?.message}>
                <input
                  id="bk-date"
                  type="date"
                  min={today || undefined}
                  aria-invalid={errors.date ? true : undefined}
                  aria-describedby="bk-date-error"
                  {...register("date")}
                />
              </Field>

              <fieldset className="field field--wide times" aria-describedby="bk-time-error">
                <legend>Preferred time</legend>
                {slots.length > 0 ? (
                  <div className="times__grid">
                    {slots.map((slot) => (
                      <span key={slot} className="times__slot">
                        <input id={`bk-time-${slot}`} type="radio" value={slot} {...register("time")} />
                        <label htmlFor={`bk-time-${slot}`}>{formatTime(slot)}</label>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="hint">
                    {date && hoursRow && !hoursRow.opens
                      ? "The salon is closed on that day."
                      : "Choose a date to see start times within opening hours."}
                  </p>
                )}
                <p className="field__error" id="bk-time-error" role={errors.time ? "alert" : undefined}>
                  {errors.time?.message}
                </p>
              </fieldset>

              <Field id="bk-message" label="Anything we should know?" error={errors.message?.message} wide>
                <textarea
                  id="bk-message"
                  rows={4}
                  maxLength={620}
                  aria-describedby="bk-message-error"
                  aria-invalid={errors.message ? true : undefined}
                  {...register("message")}
                />
                <span className="field__count num" aria-hidden="true">
                  {message.length} of 600
                </span>
              </Field>
            </div>

            {submitError && (
              <p className="form__error" role="alert">
                {submitError}
              </p>
            )}

            <div className="form__submit">
              <button type="submit" className="btn" disabled={submitting} aria-busy={submitting}>
                {submitting && <LoaderCircle className="spin" size={18} strokeWidth={1.75} aria-hidden="true" />}
                {submitting ? "Preparing your request…" : "Request appointment"}
              </button>
              <p className="note">
                {live
                  ? "Your request goes to the salon, which confirms the time with you."
                  : "Demo form. Nothing is sent or reserved. The salon would confirm your time directly."}
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
