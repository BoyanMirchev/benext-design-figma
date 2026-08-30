"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const mobileLinks: { label: string; href: string }[] = [
  { label: "Акаунт", href: "/courses/dashboard" },
  { label: "Начало", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Курсове", href: "/courses" },
  { label: "Проекти", href: "/projects" },
  { label: "Кариери", href: "/careers" },
  { label: "Контакти", href: "/contacts" },
  { label: "За нас", href: "/about" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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

      <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu-panel"
          className="mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 0.32, ease: EASE }}
        >
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

          <motion.nav
            className="mobile-panel__nav"
            aria-label="Основна навигация"
            initial="hidden"
            animate="show"
            variants={reduce ? undefined : { show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
          >
            {mobileLinks.map((link) => (
              <motion.div
                key={link.label}
                variants={reduce ? undefined : { hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } } }}
              >
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="mobile-panel__legal">
            <Link href="#" onClick={() => setOpen(false)}>
              Общи условия
            </Link>
            <Link href="#" onClick={() => setOpen(false)}>
              Политика
            </Link>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
