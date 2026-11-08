import { Hero } from "@/components/site/Hero";
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

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Transformations />
      <Artists />
      <Approach />
      <Testimonials />
      <Booking />
      <Contact />
      <Faq />
      <Social />
      <FinalCta />
    </>
  );
}
