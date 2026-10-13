"use client";

import { useState } from "react";
import { Button } from "@/components/site";

const tabs = [
  { id: "predimstva", label: "Предимства" },
  { id: "tseni", label: "Цени и планове" },
  { id: "vaprosi", label: "Въпроси и отговори" },
];

export function HostingHero() {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <>
      <section className="hosting-hero">
        <div className="shell hosting-hero__inner">
          <h1>Светкавично бърз хостинг <br />за Вашия сайт</h1>
          <ul className="hosting-hero__list">
            <li>Сигурност на всяко ниво</li>
            <li>Висока скорост и отлично представяне</li>
            <li>Експертна поддръжка по всяко време</li>
          </ul>
          <div className="hosting-hero__cta">
            <p className="hosting-hero__price">От <strong>2,09</strong> евро/месец</p>
            <Button href="#tseni">Виж планове и цени</Button>
          </div>
        </div>
      </section>
      <nav className="hosting-tabs" aria-label="Хостинг секции">
        <div className="hosting-tabs__inner">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={active === tab.id ? "hosting-tab is-active" : "hosting-tab"}
              aria-current={active === tab.id ? "true" : undefined}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
