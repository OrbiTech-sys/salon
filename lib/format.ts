import type { HoursRow, Price } from "@/config/types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Splits a price into an optional lead word and the figure, so the page can style them separately. */
export function priceParts(price: Price): { lead?: string; value: string } {
  switch (price.kind) {
    case "from":
      return { lead: "from", value: usd.format(price.amount) };
    case "fixed":
      return { value: usd.format(price.amount) };
    case "consult":
      return { value: "Consultation required" };
    case "complimentary":
      return { value: "Complimentary" };
  }
}

/** "13:30" becomes "1:30 pm"; whole hours drop the minutes ("10:00" becomes "10 am"). */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatHours(row: HoursRow): string {
  if (!row.opens || !row.closes) return "Closed";
  return `${formatTime(row.opens)} to ${formatTime(row.closes)}`;
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const fromMinutes = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

/** Start times for one day, stepping by `step` minutes and stopping `lastBeforeClose` minutes before closing. */
export function slotsFor(row: HoursRow | undefined, step: number, lastBeforeClose: number): string[] {
  if (!row || !row.opens || !row.closes) return [];
  const slots: string[] = [];
  const end = toMinutes(row.closes) - lastBeforeClose;
  for (let t = toMinutes(row.opens); t <= end; t += step) slots.push(fromMinutes(t));
  return slots;
}

/** Parses "YYYY-MM-DD" as a local date (never as UTC) and returns its weekday, 0 = Sunday. */
export function weekdayOf(iso: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date.getDay();
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatLongDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export type OpenDay = { iso: string; weekday: string; label: string };

/** The next `count` days the salon is open, starting from `startIso` (inclusive). */
export function upcomingOpenDays(startIso: string, hours: HoursRow[], count: number): OpenDay[] {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(startIso);
  if (!match) return [];
  const days: OpenDay[] = [];
  for (let i = 0; i < 28 && days.length < count; i += 1) {
    const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + i);
    const row = hours.find((h) => h.weekday === d.getDay());
    if (!row?.opens) continue;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      iso,
      weekday: i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" }),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  return days;
}
