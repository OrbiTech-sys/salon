import { z } from "zod";
import { salon } from "@/config/salon.config";
import { todayISO, weekdayOf } from "@/lib/format";

export const NO_PREFERENCE = "no-preference";

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .pipe(z.email("Enter a valid email address, such as name@example.com.")),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .refine((value) => /^[+()\-.\s\d]+$/.test(value) && value.replace(/\D/g, "").length >= 7, "Enter a valid phone number."),
  service: z.string().min(1, "Choose a service."),
  stylist: z.string().min(1, "Choose an artist, or no preference."),
  date: z
    .string()
    .min(1, "Choose a preferred date.")
    .refine((value) => value >= todayISO(), "Choose today or a later date.")
    .refine((value) => {
      const weekday = weekdayOf(value);
      if (weekday === null) return false;
      const row = salon.hours.find((h) => h.weekday === weekday);
      return Boolean(row?.opens);
    }, "The salon is closed on that day. Choose another date."),
  time: z.string().min(1, "Choose a preferred time."),
  message: z.string().max(600, "Please keep your message under 600 characters.").optional(),
});

export type BookingValues = z.infer<typeof bookingSchema>;
