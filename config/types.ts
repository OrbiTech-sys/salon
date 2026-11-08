/** Shared types for the salon configuration. Everything a salon owner edits lives in salon.config.ts. */

export type PhotoCredit = {
  author: string;
  license: string;
  /** Page where the licence and original file are documented. */
  url: string;
};

export type Photo = {
  /** Path under /public, or an absolute URL. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position, used to keep the subject in frame when cropped. */
  position?: string;
  /** Present for third-party photographs. Credits are listed in the footer. */
  credit?: PhotoCredit;
};

export type Price =
  | { kind: "from"; amount: number }
  | { kind: "fixed"; amount: number }
  | { kind: "consult" }
  | { kind: "complimentary" };

export type Service = {
  id: string;
  name: string;
  description: string;
  price: Price;
  /** Human readable, e.g. "90 min" or "3 to 4 hr". */
  duration: string;
  /** Optional thumbnail shown beside the service. */
  image?: Photo;
};

export type ServiceCategory = {
  id: string;
  name: string;
  summary: string;
  image: Photo;
  services: Service[];
};

export type Stylist = {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  intro: string;
  /** Replace with a real portrait. The demo uses a stock photograph of the artist's specialty. */
  portrait: Photo;
};

export type GalleryCategoryId =
  | "balayage"
  | "blonde"
  | "brunette"
  | "haircuts"
  | "extensions"
  | "styling";

export type GalleryItem = {
  id: string;
  photo: Photo;
  categories: GalleryCategoryId[];
  caption: string;
};

export type BeforeAfterItem = {
  id: string;
  title: string;
  description: string;
  after: Photo;
  /** Real "before" photograph. When omitted, the demo shows the same photo with `beforeFilter` applied. */
  before?: Photo;
  beforeFilter?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** True for placeholder reviews. Sample reviews are labelled on the page. */
  sample: boolean;
};

export type FaqItem = { id: string; question: string; answer: string };

export type HoursRow = {
  day: string;
  /** 0 = Sunday ... 6 = Saturday. */
  weekday: number;
  /** 24 hour "HH:MM", or null when closed. */
  opens: string | null;
  closes: string | null;
};

export type SocialLink = { label: string; url: string; handle?: string };

export type NavItem = {
  label: string;
  href: string;
  id: string;
  /** Section ids that light this link up while they are on screen. */
  sections: string[];
};

export type BrandColors = {
  paper: string;
  paper2: string;
  paper3: string;
  ink: string;
  ink2: string;
  muted: string;
  rule: string;
  accent: string;
  accent2: string;
  accentInk: string;
  champagne: string;
  focus: string;
};

export type SalonConfig = {
  name: string;
  wordmark: string;
  descriptor: string;
  tagline: string;
  description: string;
  /** Production origin. Used for metadata, sitemap and structured data. */
  siteUrl: string;
  agency: { name: string; url: string };
  /** Shows the "demo website" strip above the navigation. */
  demoNotice: boolean;
  logo: { text: string; imageSrc?: string };
  brand: { colors: BrandColors };
  contact: {
    /** True while the details below are placeholders. Structured data omits them until this is false. */
    isPlaceholder: boolean;
    addressLines: string[];
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    /** Used for the Google Maps directions link. */
    mapsQuery: string;
    /** A Google Maps embed URL. The map renders only when this is set. */
    mapEmbedUrl: string;
  };
  hours: HoursRow[];
  social: SocialLink[];
  booking: {
    /** When set, every booking button opens this URL instead of the demo form. */
    externalUrl: string;
    platformName: string;
    /** When set, the demo form POSTs its values here. Empty keeps the form local. */
    endpoint: string;
    slotMinutes: number;
    /** Minutes before closing that the last slot may start. */
    lastStartBeforeClose: number;
  };
  nav: NavItem[];
  pricingNote: string;
  services: ServiceCategory[];
  stylists: Stylist[];
  galleryCategories: { id: GalleryCategoryId; label: string }[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  why: { id: string; title: string; text: string }[];
  social_gallery: { id: string; photo: Photo }[];
};
