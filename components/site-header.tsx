"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Search, UserRound, X } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  function submitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setSearchOpen(false);
  }

  const cls = [
    "header",
    overlay && "header--overlay",
    scrolled && "header--stuck",
    searchOpen && "header--searching",
  ].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <div className="shell header__inner">
        <Link href="/" className="logo" aria-label="BeNeXt"><img src="/assets/benext-mark.png" alt="BeNeXt" /></Link>
        {searchOpen ? (
          <form className="header-search" role="search" onSubmit={submitSearch}>
            <input
              type="search"
              name="q"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Потърсете"
              aria-label="Потърсете"
            />
            <button type="submit" className="header-search__submit" aria-label="Търси">
              <Search size={20} strokeWidth={1.75} />
            </button>
          </form>
        ) : (
          <nav className="nav">
            <Link href="/services">Услуги</Link><Link href="/courses">Курсове</Link><Link href="/projects">Проекти</Link>
            <Link href="/careers">Кариери</Link><Link href="/contacts">Контакти</Link><Link href="/about">За нас</Link>
          </nav>
        )}
        <div className="header__actions">
          {searchOpen ? (
            <button
              type="button"
              className="icon-btn icon-btn--close"
              aria-label="Затвори търсенето"
              onClick={() => setSearchOpen(false)}
            >
              <X size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="icon-btn"
              aria-label="Търсене"
              aria-expanded={false}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
          )}
          <Link href="/login" className="icon-btn" aria-label="Профил"><UserRound size={20}/></Link>
          <Link href="/contacts" className="button button--primary">Започнете сега</Link>
        </div>
        <MobileMenu/>
      </div>
    </header>
  );
}
