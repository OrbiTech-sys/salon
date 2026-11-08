import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";
import { photos, salon } from "@/config/salon.config";
import { Providers } from "@/components/providers/Providers";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = `${salon.name} | ${salon.descriptor}`;

export const metadata: Metadata = {
  metadataBase: new URL(salon.siteUrl),
  title: { default: title, template: `%s | ${salon.name}` },
  description: salon.description,
  applicationName: salon.name,
  openGraph: {
    type: "website",
    siteName: salon.name,
    title,
    description: salon.tagline,
    images: [{ url: photos.ombre.src, width: photos.ombre.width, height: photos.ombre.height, alt: photos.ombre.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: salon.tagline,
    images: [photos.ombre.src],
  },
};

export const viewport: Viewport = {
  themeColor: salon.brand.colors.paper,
  width: "device-width",
  initialScale: 1,
};

/** Truthful structured data: contact details are included only once the salon has replaced the placeholders. */
function structuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: salon.name,
    description: salon.description,
    slogan: salon.tagline,
    url: salon.siteUrl,
    image: new URL(photos.ombre.src, salon.siteUrl).toString(),
  };
  if (!salon.contact.isPlaceholder) {
    data.telephone = salon.contact.phoneDisplay;
    data.email = salon.contact.email;
    data.address = { "@type": "PostalAddress", streetAddress: salon.contact.addressLines.join(", ") };
    data.openingHoursSpecification = salon.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      }));
    data.sameAs = salon.social.map((s) => s.url);
  }
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const c = salon.brand.colors;
const brandVars = {
  "--color-paper": c.paper,
  "--color-paper-2": c.paper2,
  "--color-paper-3": c.paper3,
  "--color-ink": c.ink,
  "--color-ink-2": c.ink2,
  "--color-muted": c.muted,
  "--color-rule": c.rule,
  "--color-accent": c.accent,
  "--color-accent-2": c.accent2,
  "--color-accent-ink": c.accentInk,
  "--color-champagne": c.champagne,
  "--color-focus": c.focus,
} as CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} style={brandVars}>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-hero],.hero__photo{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div id="top" />
        <Providers>
          {salon.demoNotice && (
            <p className="strip">
              Demo website by {salon.agency.name}. Names, prices and reviews are illustrative.
            </p>
          )}
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData() }} />
      </body>
    </html>
  );
}
