"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { salon } from "@/config/salon.config";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(salon.faqs[0]?.id ?? null);

  return (
    <section id="faq" className="section section--l faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <Reveal focus className="faq__head">
          <h2 id="faq-title">Questions, answered</h2>
          <p className="lead">Answers are examples that the salon can edit.</p>
        </Reveal>
        <Reveal className="faq__list" delay={0.08}>
          {salon.faqs.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="faq__item" data-open={open ? "true" : "false"}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <Plus className="faq__icon" size={22} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq__panel"
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                >
                  <div className="faq__inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
