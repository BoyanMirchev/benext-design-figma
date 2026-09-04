import Link from "next/link";
import { SearchX, GraduationCap, LayoutGrid, Wrench, ArrowRight } from "lucide-react";
import { Header, Footer, projects } from "@/components/site";
import { SearchBox } from "@/components/search-box";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export const metadata = {
  title: "Търсене | BeNeXt",
  description: "Търсете курсове, проекти и услуги в BeNeXt.",
};

type Result = {
  key: string;
  title: string;
  category: string;
  href: string;
  kind: "course" | "project" | "service";
};

const services: { title: string; category: string; href: string }[] = [
  { title: "Уеб дизайн", category: "Услуга", href: "/services" },
  { title: "eCommerce", category: "Услуга", href: "/services" },
  { title: "SEO оптимизация", category: "Услуга", href: "/services" },
  { title: "Google & Meta Ads", category: "Услуга", href: "/services" },
  { title: "Счетоводни системи", category: "Услуга", href: "/services" },
  { title: "Системи за логистика", category: "Услуга", href: "/services" },
];

const kindMeta = {
  course: { icon: GraduationCap, label: "Курс" },
  project: { icon: LayoutGrid, label: "Проект" },
  service: { icon: Wrench, label: "Услуга" },
} as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let results: Result[] = [];

  if (query) {
    const term = `%${query}%`;

    const courseRows = await db
      .select({ id: courses.id, title: courses.title, description: courses.description })
      .from(courses)
      .where(
        and(
          eq(courses.status, "published"),
          or(ilike(courses.title, term), ilike(courses.description, term)),
        ),
      );

    const lower = query.toLowerCase();

    results = [
      ...courseRows.map((c) => ({
        key: `course-${c.id}`,
        title: c.title,
        category: c.description || "Курс",
        href: "/courses/dashboard",
        kind: "course" as const,
      })),
      ...projects
        .filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower),
        )
        .map((p) => ({
          key: `project-${p.slug}`,
          title: p.name,
          category: p.category,
          href: `/projects/${p.slug}`,
          kind: "project" as const,
        })),
      ...services
        .filter((s) => s.title.toLowerCase().includes(lower))
        .map((s) => ({
          key: `service-${s.title}`,
          title: s.title,
          category: s.category,
          href: s.href,
          kind: "service" as const,
        })),
    ];
  }

  return (
    <main className="search-page">
      <Header />

      <section className="search-section">
        <div className="shell">
          <h1 className="search-title text-balance">Търсене</h1>
          <SearchBox initialQuery={query} />

          {query && (
            <p className="search-summary">
              {results.length > 0
                ? `${results.length} ${results.length === 1 ? "резултат" : "резултата"} за „${query}"`
                : `Няма резултати за „${query}"`}
            </p>
          )}

          {query && results.length > 0 && (
            <ul className="search-results">
              {results.map((r) => {
                const Icon = kindMeta[r.kind].icon;
                return (
                  <li key={r.key}>
                    <Link href={r.href} className="search-result">
                      <span className="search-result__icon">
                        <Icon size={24} />
                      </span>
                      <span className="search-result__body">
                        <span className="search-result__tag">{kindMeta[r.kind].label}</span>
                        <span className="search-result__title">{r.title}</span>
                        <span className="search-result__cat">{r.category}</span>
                      </span>
                      <ArrowRight size={22} className="search-result__arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {query && results.length === 0 && (
            <div className="search-empty">
              <span className="search-empty__icon">
                <SearchX size={48} />
              </span>
              <h2>Нищо не открихме</h2>
              <p className="text-pretty">
                Не намерихме резултати за „{query}". Опитайте с друга дума или разгледайте
                популярните ни секции.
              </p>
              <div className="search-empty__links">
                <Link href="/courses" className="button button--primary">Курсове</Link>
                <Link href="/projects" className="button button--secondary">Проекти</Link>
                <Link href="/services" className="button button--secondary">Услуги</Link>
              </div>
            </div>
          )}

          {!query && (
            <div className="search-hints">
              <p>Популярни търсения</p>
              <div className="search-hints__tags">
                {["Дигитален маркетинг", "Figma", "SEO", "eCommerce", "Програмиране"].map((t) => (
                  <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="search-tag">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
