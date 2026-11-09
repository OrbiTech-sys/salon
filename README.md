# Maison Muse, Hair Atelier (demo)

A reusable salon website demo by **The OrbiTech Solutions**. Next.js (App Router), TypeScript, Tailwind CSS v4, Motion for React, Lucide icons, React Hook Form and Zod.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Rebrand it for another salon

Everything the page shows is read from **`config/salon.config.ts`** (pictures come from `public/photos`, see below):

| What | Where in the config |
| --- | --- |
| Name, wordmark, tagline, description, site URL | `name`, `logo`, `tagline`, `description`, `siteUrl` |
| Brand colors | `brand.colors` (applied to `<html>`; defaults mirror `app/tokens.css`) |
| Address, phone, email, maps link, map embed | `contact` (the map renders only when `mapEmbedUrl` is set) |
| Opening hours (also drives the booking time slots) | `hours` |
| Social links | `social` |
| Booking | `booking.externalUrl` (see below), `booking.endpoint`, slot length |
| Services, prices, durations, optional service photos | `services` |
| Pictures | `photos` (one entry per picture; alt text and focal point live here) |
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
* **Pictures.** All pictures are in `public/photos/` and named after their slot (`hero.jpg`, `artist-2.jpg`, `gallery-01.jpg`). Replace a file with the same name, restart the dev server (or run `npm run photos`) and the site uses it. [PHOTOS.md](PHOTOS.md) lists every slot and what it is used for. The pictures are AI generated demo images; swap in the salon's own photography before launch.
* The before and after slider uses a filter on one photograph as the "before". Add real `before` photos to `beforeAfter` in the config for genuine client pairs.
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
