# Photo slots

Pictures live in `public/photos/`. A file named after a slot (`hero.jpg`, `gallery-02.webp`, ...) is picked up
automatically: restart `npm run dev` or run `npm run photos`, which reads each file's size and writes
`config/photo-manifest.json`. `npm run build` does the same first. Formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

Pictures are cropped to fit, so the size column is the shape to aim for. Alt text for each slot is in the `photos`
block of `config/salon.config.ts`. A slot with no file borrows the hero photograph, so the page never shows a broken image.

Keep the original, full-size files outside `public` (this project keeps them in `source-photos/`, which is not
deployed or committed) and save web copies here: about 2000 px wide at JPEG quality 80 is plenty and loads fast.

## Current slots and what fills them

| Slot (file) | Where it appears | Currently |
| --- | --- | --- |
| `hero` | Full-bleed first screen, behind the headline (keep the left half calm) | Wide salon interior with arched gold mirrors and a staircase |
| `intro` | Beside the brand introduction; also gallery and the "gloss and tone" slider | Woman with long glossy chestnut hair in the salon |
| `interior` | Beside the booking form (tall crop, centre of the picture) | Arched mirrors and blush chairs |
| `cuts`, `color`, `treatments`, `extensions`, `special` | The five service categories; also gallery tiles | Straightening, foils, basin wash, copper waves, bridal updo |
| `artist-1` to `artist-4` | Circular artist portraits (square crops, face in the upper middle) | Isla, Theo, Noor, Elias |
| `gallery-01` to `gallery-03` | Gallery tiles, plus the "color correction" slider and the social tiles | Balayage close-up, pearl braid, shoulder-length waves |
| `closing` | Behind the closing call to action (subject on the left, empty space on the right) | Honey blonde half-up with a pearl vine; also a gallery tile |
| `band-1`, `band-2` | Two wide strips between sections that drift sideways on scroll | Hair washing seats, reception |

The gallery also reuses `intro`, `extensions`, `special`, `cuts`, `color` and `closing`. To add more gallery pictures, add
a `slot("gallery-04", "alt text")` entry to `photos` and a matching item in `gallery` in the config.

The before and after slider uses a filter on one photograph as the "before". For real client pairs, add `before` photos
in `beforeAfter` in the config.

## Replace the demo content at the same time

The artist names, biographies, gallery captions, prices and reviews are demo content (`config/salon.config.ts`).
The strip above the navigation is `demoNotice`. All pictures are AI generated, so keep the "illustrative" notes unless
you swap in real photography.

## Prompts used for this set

- **hero**: Wide luxury salon interior, arched gold-framed mirrors, blush pink styling chairs, marble floor, curved staircase, olive trees, warm recessed lighting
- **intro**: A woman with long glossy chestnut-brown hair standing in a blush and gold salon
- **cuts / color / treatments**: A stylist straightening red-brown hair; applying color with a brush to foils; washing a client's hair at a basin
- **special / extensions**: A low bridal updo with a floral clip in profile; copper-auburn long waves from behind
- **closing**: Rear view of a woman with long honey-blonde hair in a loose twisted half-up with a pearl hair vine, deep forest-green background, space on the right for text
- **artist-1 to artist-4**: Friendly studio-style portraits of stylists, arms crossed, bright salon background
