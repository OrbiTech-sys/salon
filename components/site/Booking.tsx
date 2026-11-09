import { photos, salon } from "@/config/salon.config";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "./BookingForm";

export function Booking() {
  const external = Boolean(salon.booking.externalUrl);
  return (
    <section id="book" className="section section--l booking" aria-labelledby="book-title">
      <div className="container booking__grid">
        <Reveal curtain className="booking__photo">
          <Photo photo={photos.booking} sizes="(min-width: 60rem) 40vw, 100vw" />
        </Reveal>
        <Reveal className="booking__panel" delay={0.08}>
          <h2 id="book-title">Request your appointment</h2>
          <p className="lead">Choose a service, an artist and a time that suits you.</p>
          {external ? (
            <div className="booking__external">
              <p>Appointments are booked on {salon.booking.platformName}.</p>
              <BookLink className="btn">Book your appointment</BookLink>
            </div>
          ) : (
            <BookingForm />
          )}
        </Reveal>
      </div>
    </section>
  );
}
