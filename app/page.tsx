import { Hero } from "@/components/site/Hero";
import { QuickBook } from "@/components/site/QuickBook";
import { Services } from "@/components/site/Services";
import { Intro } from "@/components/site/Intro";
import { Transformations } from "@/components/site/Transformations";
import { Artists } from "@/components/site/Artists";
import { Approach } from "@/components/site/Approach";
import { Testimonials } from "@/components/site/Testimonials";
import { Booking } from "@/components/site/Booking";
import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Social } from "@/components/site/Social";
import { FinalCta } from "@/components/site/FinalCta";
import { ParallaxBand } from "@/components/ui/ParallaxBand";
import { photos } from "@/config/salon.config";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickBook />
      <Intro />
      <ParallaxBand photo={photos.band1} />
      <Services />
      <Transformations />
      <Artists />
      <Approach />
      <Testimonials />
      <ParallaxBand photo={photos.band2} />
      <Booking />
      <Contact />
      <Faq />
      <Social />
      <FinalCta />
    </>
  );
}
