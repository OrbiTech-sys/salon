# Maison Muse, Hair Atelier (demo)

A reusable salon website demo by **The OrbiTech Solutions**. Next.js (App Router), TypeScript, Tailwind CSS v4, Motion for React, Lucide icons, React Hook Form and Zod.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Rebrand it for another salon

Everything the page shows is read from **`config/salon.config.ts`**:

| What | Where in the config |
| --- | --- |
| Name, wordmark, tagline, description, site URL | `name`, `logo`, `tagline`, `description`, `siteUrl` |
| Brand colors | `brand.colors` (applied to `<html>`; defaults mirror `app/tokens.css`) |
| Address, phone, email, maps link, map embed | `contact` (the map renders only when `mapEmbedUrl` is set) |
| Opening hours (also drives the booking time slots) | `hours` |
| Social links | `social` |
| Booking | `booking.externalUrl` (see below), `booking.endpoint`, slot length |
| Services, prices, durations, optional service photos | `services` |
| Artists | `stylists` |
| Gallery, before and after pairs, social tiles | `gallery`, `beforeAfter`, `social_gallery` |
| Reviews, FAQ, "why choose us" | `testimonials`, `faqs`, `why` |

Fonts are set in `app/layout.tsx` (`next/font/google`). Typography and spacing tokens live in `app/tokens.css`.

### Booking

* **`booking.externalUrl`** set (Fresha, Vagaro, Square, Boulevard, Acuity ...): every Book button opens that URL in a new tab and the demo form is replaced by a single booking button.
* Left empty: Book buttons scroll to the on-page form and pre-select the service or artist. The form validates, shows a loading state and a preview of the request, and says plainly that **nothing is sent or reserved**.
* **`booking.endpoint`** set: the form POSTs its values as JSON to that URL and reports a failure if the request does not succeed.

## Demo content to replace before launch

* Prices, artist names and biographies, reviews and FAQ answers are illustrative and labelled as such on the page.
* The address (`100 Example Avenue`), phone (`(212) 555-0100`, a fictional number) and email (`hello@example.com`) are placeholders. Structured data (JSON-LD) leaves contact details out until `contact.isPlaceholder` is `false`.
* Photographs in `public/photos` are stand-ins licensed under Creative Commons from Wikimedia Commons. Each is credited in the footer from its entry in `config/salon.config.ts`. Replace the files (same names, or edit the `photos` map) with the salon's own photography and remove the credits for anything you replace.
* The before and after slider shows one stock photograph with a filter standing in for "before". Add a real `before` photo to an entry in `beforeAfter` to use genuine client pairs.
* Set `NEXT_PUBLIC_SITE_URL` to the production origin for correct metadata, sitemap and Open Graph URLs.

## Structure

```
app/            layout, page, tokens.css (design tokens), globals.css, privacy page
config/         salon.config.ts (all content), types.ts
components/
  site/         one component per section (Hero, Services, Gallery, BookingForm ...)
  ui/           BookLink, Photo, Reveal
  providers/    Motion setup and booking selection state
lib/            formatting helpers, booking validation, active-section hook
```
