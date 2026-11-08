"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { salon } from "@/config/salon.config";
import { priceParts } from "@/lib/format";
import { BookLink } from "@/components/ui/BookLink";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [activeId, setActiveId] = useState(salon.services[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = salon.services.find((c) => c.id === activeId) ?? salon.services[0];

  // The footer's service links ask this section to open a category.
  useEffect(() => {
    const onCategory = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (salon.services.some((c) => c.id === id)) setActiveId(id);
    };
    window.addEventListener("salon:category", onCategory);
    return () => window.removeEventListener("salon:category", onCategory);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const ids = salon.services.map((c) => c.id);
    const index = ids.indexOf(activeId);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % ids.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + ids.length) % ids.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ids.length - 1;
    else return;
    event.preventDefault();
    setActiveId(ids[next]);
    tabRefs.current[ids[next]]?.focus();
  };

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section__head">
          <h2 id="services-title">Services and pricing</h2>
          <p className="head-note">{salon.pricingNote}</p>
        </Reveal>

        <div className="cat-tabs" role="tablist" aria-label="Service categories" onKeyDown={onKeyDown}>
          {salon.services.map((category) => (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[category.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={category.id === activeId}
              aria-controls="services-panel"
              tabIndex={category.id === activeId ? 0 : -1}
              className="cat-tabs__tab"
              onClick={() => setActiveId(category.id)}
            >
              <span className="cat-tabs__name">{category.name}</span>
              <span className="cat-tabs__count">{category.services.length} options</span>
            </button>
          ))}
        </div>

        <div className="services__panel" role="tabpanel" id="services-panel" aria-labelledby={`tab-${active.id}`}>
          <div className="services__aside">
            <div className="services__photo">
              <AnimatePresence initial={false} mode="popLayout">
                <m.div
                  key={active.id}
                  className="services__photo-layer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Photo photo={active.image} sizes="(min-width: 60rem) 30vw, 100vw" />
                </m.div>
              </AnimatePresence>
            </div>
            <p className="services__summary">{active.summary}</p>
          </div>

          <AnimatePresence initial={false} mode="wait">
            <m.ul
              key={active.id}
              className="ledger"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              {active.services.map((service) => {
                const price = priceParts(service.price);
                return (
                  <li key={service.id} className="ledger__row">
                    {service.image && (
                      <div className="ledger__thumb">
                        <Photo photo={service.image} sizes="96px" />
                      </div>
                    )}
                    <div className="ledger__main">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="ledger__meta">
                      <p className={price.value.startsWith("$") ? "ledger__price num" : "ledger__price ledger__price--text"}>
                        {price.lead && <span className="ledger__lead">{price.lead} </span>}
                        {price.value}
                      </p>
                      <p className="ledger__time">{service.duration}</p>
                      <BookLink serviceId={service.id} className="link-action" aria-label={`Book ${service.name}`}>
                        Book service
                      </BookLink>
                    </div>
                  </li>
                );
              })}
            </m.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
