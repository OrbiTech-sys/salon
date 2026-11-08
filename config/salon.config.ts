import type { Photo, SalonConfig } from "./types";

/**
 * MAISON MUSE demo configuration.
 *
 * To rebrand this site for another salon, edit this file and replace the images in /public/photos.
 * Everything visible on the page (name, copy, colors, services, prices, artists, gallery, reviews,
 * hours, contact details and the booking link) is read from here.
 *
 * All prices, artists, reviews and contact details below are illustrative placeholders.
 * The photographs are licensed stand-ins from Wikimedia Commons, not work by this salon.
 */

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
  ombre: {
    src: "/photos/ombre-honey.jpg",
    width: 1920,
    height: 1372,
    alt: "Woman with long brown hair and honey ombré ends smiling over her shoulder",
    position: "62% 38%",
    credit: { author: "Nan Palmero", license: "CC BY 2.0", url: commons("Woman_with_ombr%C3%A9_hair_colouring.jpg") },
  },
  colourWall: {
    src: "/photos/colour-wall.jpg",
    width: 1920,
    height: 1465,
    alt: "A wall of professional hair color tubes arranged on shelves in a hairdressing shop",
    position: "50% 50%",
    credit: { author: "Pittigrilli", license: "CC BY-SA 4.0", url: commons("Shelve_with_various_hair_colours_(hair_dyes)_in_a_hairdresser_shop_in_Germany_(2023).jpg") },
  },
  colourFoils: {
    src: "/photos/colour-foils.jpg",
    width: 1920,
    height: 1249,
    alt: "A colorist lifting sections of hair into foils during a highlighting service",
    position: "55% 40%",
    credit: { author: "Dean Wissing", license: "CC BY-SA 2.0", url: commons("Haircoloring.jpg") },
  },
  shampooBowl: {
    src: "/photos/shampoo-bowl.jpg",
    width: 1280,
    height: 2088,
    alt: "A stylist rinsing a client's hair at a salon basin",
    position: "50% 35%",
    credit: { author: "Frank C. Müller", license: "CC BY-SA 4.0", url: commons("Frisoerin_(fcm).jpg") },
  },
  braidLength: {
    src: "/photos/braid-length.jpg",
    width: 1280,
    height: 1932,
    alt: "A woman walking away with a very long, thick braid down her back",
    position: "50% 28%",
    credit: { author: "Ed Yourdon", license: "CC BY-SA 2.0", url: commons("Long_braid.jpg") },
  },
  updo: {
    src: "/photos/updo-style.jpg",
    width: 1280,
    height: 1707,
    alt: "A model in a salon robe with a sculpted high updo",
    position: "50% 22%",
    credit: { author: "beyrouth", license: "CC BY 2.0", url: commons("Woman_with_an_updo_hairstyle_(4768263593).jpg") },
  },
  bobProfile: {
    src: "/photos/bob-profile.jpg",
    width: 1920,
    height: 1920,
    alt: "Side profile of a sharp inverted bob haircut with a blunt fringe",
    position: "50% 40%",
    credit: { author: "Thirteen Of Clubs", license: "CC BY-SA 2.0", url: commons("Inverted_bob_haircut.jpg") },
  },
  bobFringe: {
    src: "/photos/bob-fringe.jpg",
    width: 1280,
    height: 1317,
    alt: "A woman with a glossy short bob and straight fringe",
    position: "50% 35%",
    credit: { author: "Lillian Vasquez", license: "CC BY-SA 2.0", url: commons("Short_brown_hair.jpg") },
  },
  brunetteLong: {
    src: "/photos/brunette-long.jpg",
    width: 1280,
    height: 1934,
    alt: "A woman with long, straight, deep brunette hair and a strong red lip",
    position: "50% 30%",
    credit: { author: "THOR", license: "CC BY 2.0", url: commons("Brunette_red_lipstick.jpg") },
  },
  hairRear: {
    src: "/photos/hair-rear-brunette.jpg",
    width: 1920,
    height: 2560,
    alt: "Back view of long, glossy dark brown hair",
    position: "50% 72%",
    credit: { author: "Alex Neman", license: "CC BY-SA 4.0", url: commons("Female_with_dark_brown_hair,_rear_view.jpg") },
  },
  copperPortrait: {
    src: "/photos/copper-portrait.jpg",
    width: 1920,
    height: 1583,
    alt: "Portrait of a woman with long natural copper hair",
    position: "50% 30%",
    credit: { author: "dusdin (cropped by Gridge)", license: "CC BY 2.0", url: commons("Woman_redhead_natural_portrait_1.jpg") },
  },
  curlsCopper: {
    src: "/photos/curls-copper.jpg",
    width: 1920,
    height: 1702,
    alt: "A woman with a halo of tight copper-colored natural curls",
    position: "50% 35%",
    credit: { author: "Erik Jacobs", license: "CC BY 2.0", url: commons("Natural_redhead_black_girl_(red_power_hairstyle).jpg") },
  },
  curlsTexture: {
    src: "/photos/curls-texture.jpg",
    width: 1280,
    height: 1329,
    alt: "A woman with voluminous natural black curls",
    position: "50% 30%",
    credit: { author: "peter klashorst", license: "CC BY 2.0", url: commons("Wild_hair.jpg") },
  },
  dutchBraid: {
    src: "/photos/dutch-braid.jpg",
    width: 1280,
    height: 1707,
    alt: "Back view of a neat Dutch braid on long brown hair",
    position: "50% 40%",
    credit: { author: "Stilfehler", license: "CC BY-SA 3.0", url: commons("Dutch_Braid.JPG") },
  },
  frenchBraid: {
    src: "/photos/french-braid.jpg",
    width: 1280,
    height: 2274,
    alt: "Back view of a classic French braid against a pink wall",
    position: "50% 22%",
    credit: { author: "Stilfehler", license: "CC BY-SA 3.0", url: commons("Classic_French_Braid.JPG") },
  },
} satisfies Record<string, Photo>;

export const salon: SalonConfig = {
  name: "Maison Muse",
  wordmark: "MAISON MUSE",
  descriptor: "Hair Atelier",
  tagline: "Where your hair becomes your signature.",
  description:
    "Maison Muse is a hair atelier for cuts, color, treatments, extensions and bridal styling, built around a private consultation at every visit. Demo website by The OrbiTech Solutions.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Add the agency website here to turn its name in the footer into a link. */
  agency: { name: "The OrbiTech Solutions", url: "" },
  demoNotice: true,
  logo: { text: "MAISON MUSE" },

  // Mirrors app/tokens.css. layout.tsx applies these values to <html>.
  brand: {
    colors: {
      paper: "oklch(97.1% 0.009 85)",
      paper2: "oklch(94.5% 0.011 82)",
      paper3: "oklch(90.5% 0.022 80)",
      ink: "oklch(25.9% 0.012 45)",
      ink2: "oklch(38% 0.014 50)",
      muted: "oklch(52% 0.02 62)",
      rule: "oklch(86% 0.018 80)",
      accent: "oklch(43.8% 0.083 9)",
      accent2: "oklch(35% 0.083 9)",
      accentInk: "oklch(97.1% 0.009 85)",
      champagne: "oklch(82.5% 0.049 76)",
      focus: "oklch(44% 0.17 10)",
    },
  },

  contact: {
    isPlaceholder: true,
    addressLines: ["100 Example Avenue, Floor 2", "New York, NY"],
    phoneDisplay: "(212) 555-0100",
    phoneHref: "tel:+12125550100",
    email: "hello@example.com",
    mapsQuery: "100 Example Avenue, New York, NY",
    mapEmbedUrl: "",
  },

  hours: [
    { day: "Monday", weekday: 1, opens: null, closes: null },
    { day: "Tuesday", weekday: 2, opens: "10:00", closes: "19:00" },
    { day: "Wednesday", weekday: 3, opens: "10:00", closes: "19:00" },
    { day: "Thursday", weekday: 4, opens: "10:00", closes: "20:00" },
    { day: "Friday", weekday: 5, opens: "10:00", closes: "19:00" },
    { day: "Saturday", weekday: 6, opens: "09:00", closes: "17:00" },
    { day: "Sunday", weekday: 0, opens: "11:00", closes: "16:00" },
  ],

  social: [
    { label: "Instagram", url: "https://www.instagram.com/", handle: "@yoursalon" },
    { label: "Facebook", url: "https://www.facebook.com/" },
    { label: "Pinterest", url: "https://www.pinterest.com/" },
  ],

  booking: {
    // Paste a Fresha, Vagaro, Square, Boulevard or Acuity link here and every booking button opens it.
    externalUrl: "",
    platformName: "our online booking page",
    // Optional: a URL that accepts the demo form as a JSON POST. Left empty, the form stays local.
    endpoint: "",
    slotMinutes: 30,
    lastStartBeforeClose: 90,
  },

  nav: [
    { label: "Home", href: "#top", id: "top", sections: ["top"] },
    { label: "Services", href: "#services", id: "services", sections: ["services"] },
    { label: "Our Artists", href: "#artists", id: "artists", sections: ["artists"] },
    { label: "Gallery", href: "#gallery", id: "gallery", sections: ["gallery"] },
    { label: "About", href: "#about", id: "about", sections: ["about", "approach", "reviews"] },
    { label: "Contact", href: "#contact", id: "contact", sections: ["book", "contact", "faq", "social", "close"] },
  ],

  pricingNote: "Illustrative demo pricing in USD. Final prices are confirmed at your consultation.",

  services: [
    {
      id: "cuts",
      name: "Haircuts & Styling",
      summary: "Cuts shaped around how your hair falls and how you wear it.",
      image: photos.bobProfile,
      services: [
        { id: "womens-haircut", name: "Women's haircut", description: "A tailored cut with a consultation, wash and finish dry.", price: { kind: "from", amount: 95 }, duration: "60 min" },
        { id: "signature-haircut", name: "Signature haircut", description: "A longer appointment with a senior artist, precision cutting and a styled finish.", price: { kind: "from", amount: 145 }, duration: "75 min" },
        { id: "blowout", name: "Blowout", description: "Wash and a smooth, voluminous or bouncy blow dry.", price: { kind: "from", amount: 65 }, duration: "45 min" },
        { id: "occasion-styling", name: "Special occasion styling", description: "Polished waves, sleek lines or a soft updo for the evening ahead.", price: { kind: "from", amount: 120 }, duration: "60 min" },
      ],
    },
    {
      id: "color",
      name: "Hair Color",
      summary: "Color mixed for your tone, your texture and your upkeep.",
      image: photos.colourFoils,
      services: [
        { id: "single-process", name: "Single process", description: "One all-over shade, from a subtle gloss to a full change.", price: { kind: "from", amount: 140 }, duration: "2 hr" },
        { id: "root-touch-up", name: "Root touch-up", description: "Fresh regrowth coverage, blended into your existing color.", price: { kind: "from", amount: 120 }, duration: "90 min" },
        { id: "highlights", name: "Highlights", description: "Woven brightness placed to frame the face and lift tone.", price: { kind: "from", amount: 220 }, duration: "2.5 hr" },
        { id: "balayage", name: "Balayage", description: "Hand-painted, sun-softened color that grows out gracefully.", price: { kind: "from", amount: 320 }, duration: "3.5 hr" },
        { id: "blonde-transformation", name: "Blonde transformations", description: "Planned lightening, toning and bond care across one or more visits.", price: { kind: "consult" }, duration: "4 to 6 hr" },
        { id: "color-correction", name: "Color correction", description: "A careful reset for uneven, banded or unwanted color.", price: { kind: "consult" }, duration: "4+ hr" },
      ],
    },
    {
      id: "treatments",
      name: "Hair Treatments",
      summary: "Repair, smoothing and scalp care to keep the color and shine.",
      image: photos.hairRear,
      services: [
        { id: "keratin", name: "Keratin treatment", description: "A smoothing treatment that softens frizz and eases daily styling.", price: { kind: "from", amount: 350 }, duration: "3 hr" },
        { id: "deep-conditioning", name: "Deep conditioning", description: "An intensive mask for dry or heat-styled hair.", price: { kind: "from", amount: 55 }, duration: "30 min" },
        { id: "hair-repair", name: "Hair repair", description: "Bond-building care for hair that is stretched, lightened or fragile.", price: { kind: "from", amount: 85 }, duration: "45 min" },
        { id: "scalp-treatment", name: "Scalp treatment", description: "A cleansing and massage ritual for a balanced, comfortable scalp.", price: { kind: "from", amount: 70 }, duration: "45 min" },
      ],
    },
    {
      id: "extensions",
      name: "Hair Extensions",
      summary: "Length and volume matched to your color and your hair's own movement.",
      image: photos.braidLength,
      services: [
        { id: "extension-consultation", name: "Extension consultation", description: "Color matching, method advice and a plan for upkeep.", price: { kind: "from", amount: 40 }, duration: "30 min" },
        { id: "tape-in", name: "Tape-in extensions", description: "Flat, lightweight wefts placed close to the root.", price: { kind: "from", amount: 480 }, duration: "2 hr" },
        { id: "keratin-extensions", name: "Keratin extensions", description: "Individual strands bonded for a natural, flexible finish.", price: { kind: "from", amount: 650 }, duration: "3 hr" },
        { id: "volume-length", name: "Volume and length services", description: "A custom plan for density, length or both.", price: { kind: "consult" }, duration: "2 to 4 hr" },
      ],
    },
    {
      id: "special",
      name: "Special Services",
      summary: "Planned styling for the days that matter most.",
      image: photos.updo,
      services: [
        { id: "bridal", name: "Bridal hair", description: "A trial and wedding day styling, planned around your dress and veil.", price: { kind: "from", amount: 250 }, duration: "90 min" },
        { id: "event-styling", name: "Event styling", description: "Styling for parties, shoots and nights out.", price: { kind: "from", amount: 150 }, duration: "75 min" },
        { id: "consultation", name: "Personalized consultation", description: "A conversation about your hair, goals and routine before you commit to a service.", price: { kind: "complimentary" }, duration: "20 min" },
      ],
    },
  ],

  stylists: [
    {
      id: "isla",
      name: "Isla Verrant",
      title: "Creative Director",
      specialties: ["Precision cutting", "Bobs and fringes", "Texture reshaping"],
      intro: "Isla starts with the way your hair falls, then builds a cut that grows out well.",
      portrait: photos.brunetteLong,
    },
    {
      id: "noor",
      name: "Noor Castellane",
      title: "Senior Colorist",
      specialties: ["Balayage", "Blonde transformations", "Color correction"],
      intro: "Noor plans color in stages, so tone and condition stay beautiful between visits.",
      portrait: photos.copperPortrait,
    },
    {
      id: "delphine",
      name: "Delphine Roux",
      title: "Texture and Extensions Artist",
      specialties: ["Natural curls", "Tape-in extensions", "Volume and length"],
      intro: "Delphine works with natural texture and blends extensions so they move like your own.",
      portrait: photos.curlsCopper,
    },
    {
      id: "marisol",
      name: "Marisol Quill",
      title: "Bridal and Event Stylist",
      specialties: ["Bridal updos", "Soft waves", "Event styling"],
      intro: "Marisol designs the look with you at a trial, then makes sure it lasts the whole day.",
      portrait: photos.updo,
    },
  ],

  galleryCategories: [
    { id: "balayage", label: "Balayage" },
    { id: "blonde", label: "Blonde" },
    { id: "brunette", label: "Brunette" },
    { id: "haircuts", label: "Haircuts" },
    { id: "extensions", label: "Extensions" },
    { id: "styling", label: "Styling" },
  ],

  gallery: [
    { id: "g-ombre", photo: photos.ombre, categories: ["balayage", "blonde"], caption: "Honey ends on a deep brunette base" },
    { id: "g-rear", photo: photos.hairRear, categories: ["brunette"], caption: "Glossy brunette length" },
    { id: "g-bob", photo: photos.bobFringe, categories: ["haircuts"], caption: "Blunt bob with a soft fringe" },
    { id: "g-foils", photo: photos.colourFoils, categories: ["blonde", "balayage"], caption: "Highlights placed by hand" },
    { id: "g-copper", photo: photos.copperPortrait, categories: ["balayage"], caption: "Natural copper tones" },
    { id: "g-dutch", photo: photos.dutchBraid, categories: ["styling"], caption: "Dutch braid for the weekend" },
    { id: "g-extensions", photo: photos.braidLength, categories: ["extensions", "styling"], caption: "Length and weight in a single braid" },
    { id: "g-brunette", photo: photos.brunetteLong, categories: ["brunette"], caption: "Rich brunette with a straight finish" },
    { id: "g-curls", photo: photos.curlsTexture, categories: ["haircuts", "styling"], caption: "Natural curls cut for shape" },
    { id: "g-french", photo: photos.frenchBraid, categories: ["styling"], caption: "Classic French braid" },
    { id: "g-bob-profile", photo: photos.bobProfile, categories: ["haircuts"], caption: "Inverted bob in profile" },
    { id: "g-halo", photo: photos.curlsCopper, categories: ["haircuts", "balayage"], caption: "Copper curls with plenty of lift" },
  ],

  beforeAfter: [
    {
      id: "ba-gloss",
      title: "Gloss and tone",
      description: "Drag the handle to compare flat, tired color with a glossed, toned finish.",
      after: photos.copperPortrait,
      beforeFilter: "grayscale(0.7) contrast(0.82) brightness(1.04)",
    },
    {
      id: "ba-depth",
      title: "Color depth",
      description: "Drag the handle to see muted tone lifted back to warm, dimensional color.",
      after: photos.curlsCopper,
      beforeFilter: "grayscale(0.65) contrast(0.8) brightness(1.05)",
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote: "I arrived with flat, grown-out color and left with hair that finally looked like mine. The consultation alone was worth the visit.",
      attribution: "Sample client, balayage",
      rating: 5,
      sample: true,
    },
    {
      id: "t2",
      quote: "Nobody rushed me. We talked about how I really wear my hair before a single section was cut.",
      attribution: "Sample client, signature haircut",
      rating: 5,
      sample: true,
    },
    {
      id: "t3",
      quote: "My extensions blend so well that my own stylist asked who had done them.",
      attribution: "Sample client, tape-in extensions",
      rating: 5,
      sample: true,
    },
    {
      id: "t4",
      quote: "The trial made the wedding morning calm. My updo lasted through every dance.",
      attribution: "Sample client, bridal hair",
      rating: 5,
      sample: true,
    },
  ],

  faqs: [
    { id: "f1", question: "How do I book an appointment?", answer: "Choose a service and a time in the booking section, or use any Book button on this page. In this demo the form only prepares a request; a real salon would connect it to its booking platform." },
    { id: "f2", question: "Should I book a consultation before coloring?", answer: "Yes, for anything beyond a root touch-up. A short consultation lets your colorist check your hair's history and plan the right steps. Consultations are complimentary in this demo." },
    { id: "f3", question: "How long does balayage take?", answer: "Most balayage appointments take around three and a half hours, depending on length, density and how light you want to go. Your artist will give you a clearer estimate at your consultation." },
    { id: "f4", question: "Can I reschedule?", answer: "Yes. Please give at least 24 hours' notice so the time can go to another client. Policies like this are examples that the salon can edit." },
    { id: "f5", question: "Do you offer hair extensions?", answer: "Yes, we offer tape-in and keratin extensions, plus volume and length plans. Start with an extension consultation so your artist can match color and recommend a method." },
    { id: "f6", question: "What should I bring to my appointment?", answer: "Bring photos of looks you like, and of any looks you do not. If you are changing color, tell us about your hair's history, including box dye and past treatments." },
  ],

  why: [
    { id: "w1", title: "Personalized consultations", text: "Every visit begins with a conversation about your hair, your routine and what you want it to do." },
    { id: "w2", title: "Experienced stylists", text: "Each artist has a clear specialty, so your color, cut or extensions are in focused hands." },
    { id: "w3", title: "Individualized recommendations", text: "Take-home advice is built around your hair type, not a shelf of products." },
    { id: "w4", title: "Quality products", text: "Professional color, treatments and styling products chosen for how they treat your hair." },
    { id: "w5", title: "Attention to detail", text: "Sections, tones and finishes are checked in daylight before you leave the chair." },
    { id: "w6", title: "A comfortable salon", text: "Unhurried appointments, a calm room and a drink in hand." },
  ],

  social_gallery: [
    { id: "s1", photo: photos.dutchBraid },
    { id: "s2", photo: photos.curlsTexture },
    { id: "s3", photo: photos.hairRear },
    { id: "s4", photo: photos.copperPortrait },
    { id: "s5", photo: photos.colourWall },
    { id: "s6", photo: photos.ombre },
  ],
};

/** Every distinct photograph credit in use, for the footer. */
export function allCredits() {
  const seen = new Map<string, { author: string; license: string; url: string }>();
  for (const p of Object.values(photos)) {
    const c = (p as Photo).credit;
    if (c && !seen.has(c.url)) seen.set(c.url, c);
  }
  return [...seen.values()];
}
