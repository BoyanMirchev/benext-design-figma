"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const hero = overlay
      ? document.querySelector<HTMLElement>(".home-hero-wrap, .services-hero-wrap, .detail-hero")
      : null;
    const onScroll = () => {
      const threshold = hero ? Math.max(hero.offsetHeight - 80, 24) : 24;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);
  const cls = ["header", overlay && "header--overlay", scrolled && "header--stuck"].filter(Boolean).join(" ");
  return (
    <header className={cls}>
      <div className="shell header__inner">
        <Link href="/" className="logo" aria-label="BeNeXt"><img src="/assets/benext-mark.png" alt="BeNeXt" /></Link>
        <nav className="nav">
          <Link href="/services">Услуги</Link><Link href="/courses">Курсове</Link><Link href="/projects">Проекти</Link>
          <Link href="/careers">Кариери</Link><Link href="/contacts">Контакти</Link><Link href="/about">За нас</Link>
        </nav>
        <div className="header__actions">
          <button className="icon-btn" aria-label="Търсене"><Search size={20}/></button>
          <Link href="/login" className="icon-btn" aria-label="Профил"><UserRound size={20}/></Link>
          <Link href="/contacts" className="button button--primary">Започнете сега</Link>
        </div>
        <MobileMenu/>
      </div>
    </header>
  );
}
