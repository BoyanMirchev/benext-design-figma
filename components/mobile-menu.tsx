"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const mobileLinks: { label: string; href: string }[] = [
  { label: "Акаунт", href: "#" },
  { label: "Начало", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Курсове", href: "#" },
  { label: "Проекти", href: "/projects" },
  { label: "Контакти", href: "/contacts" },
  { label: "За нас", href: "/about" },
  { label: "Кариери", href: "#" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu"
        aria-label="Отвори меню"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(true)}
      >
        <span className="mobile-menu__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div id="mobile-menu-panel" className="mobile-panel" role="dialog" aria-modal="true" aria-label="Меню">
          <div className="mobile-panel__top">
            <Link href="/" className="mobile-panel__logo" aria-label="BeNeXt" onClick={() => setOpen(false)}>
              <img src="/assets/benext-mark.png" alt="BeNeXt" />
            </Link>
            <button type="button" className="mobile-panel__close" aria-label="Затвори меню" onClick={() => setOpen(false)}>
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="mobile-panel__search">
            <input type="search" placeholder="Input text" aria-label="Търсене" />
            <Search size={19.5} strokeWidth={1.5} aria-hidden="true" />
          </div>

          <nav className="mobile-panel__nav" aria-label="Основна навигация">
            {mobileLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-panel__legal">
            <Link href="#" onClick={() => setOpen(false)}>
              Общи условия
            </Link>
            <Link href="#" onClick={() => setOpen(false)}>
              Политика
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
