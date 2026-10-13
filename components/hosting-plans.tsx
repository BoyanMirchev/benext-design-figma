"use client";

import { useState } from "react";
import Link from "next/link";

type Period = "1" | "12" | "24";

const periods: { id: Period; label: string }[] = [
  { id: "1", label: "1 месец" },
  { id: "12", label: "12 месеца" },
  { id: "24", label: "24 месеца" },
];

const plans = [
  { name: "Benext Mini", text: "Най-подходящ за малък статичен сайт", specs: ["5 GB NVMe", "1 GB RAM", "2 Backup копия"], monthly: 5.49, promo: 2.09 },
  { name: "Benext Start", text: "Подходящ за малки сайтове и начални проекти", specs: ["15 GB NVMe", "1,5 GB RAM", "6 Backup копия"], monthly: 10.99, promo: 4.19 },
  { name: "Benext Business", text: "Подходящ за фирмени и презентационни сайтове", specs: ["50 GB NVMe", "2 GB RAM", "10 Backup копия"], monthly: 18.49, promo: 4.29, featured: true },
  { name: "Benext Store", text: "Подходящ за старт на онлайн магазин", specs: ["150 GB NVMe", "3 GB RAM", "14 Backup копия"], monthly: 32.49, promo: 12.49 },
];

const euro = (n: number) => n.toFixed(2).replace(".", ",");

function priceFor(plan: (typeof plans)[number], period: Period) {
  if (period === "1") return { perMonth: plan.monthly, total: `${euro(plan.monthly)}€ за един месец` };
  const months = Number(period);
  const label = period === "12" ? "за една година" : "за две години";
  return { perMonth: plan.promo, total: `${euro(plan.promo * months)}€ ${label}` };
}

export function HostingPlans() {
  const [period, setPeriod] = useState<Period>("12");

  return (
    <div className="hp-plans">
      <div className="hp-plan-grid">
        {plans.map((plan) => {
          const price = priceFor(plan, period);
          return (
            <article key={plan.name} className={plan.featured ? "hp-plan is-featured" : "hp-plan"}>
              <h3>{plan.name}</h3>
              <p className="hp-plan__text">{plan.text}</p>
              <ul>{plan.specs.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="hp-plan__price">От <strong>{euro(price.perMonth)}</strong> €/мес</p>
              <p className="hp-plan__total">{price.total}</p>
              <Link href="/contacts" className="button button--secondary hp-plan__btn">Поръчай</Link>
            </article>
          );
        })}
      </div>
      <div className="hp-period" role="group" aria-label="Период на плащане">
        {periods.map((p) => (
          <button key={p.id} type="button" aria-pressed={period === p.id} className={period === p.id ? "is-active" : undefined} onClick={() => setPeriod(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
