"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form className="search-box" role="search" onSubmit={submit}>
      <Search size={22} className="search-box__icon" aria-hidden />
      <input
        type="search"
        name="q"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Търсете курсове, проекти, услуги…"
        aria-label="Търсене"
      />
      {value && (
        <button
          type="button"
          className="search-box__clear"
          aria-label="Изчисти"
          onClick={() => {
            setValue("");
            router.push("/search");
          }}
        >
          <X size={20} />
        </button>
      )}
      <button type="submit" className="button button--primary search-box__submit">
        Търсене
      </button>
    </form>
  );
}
