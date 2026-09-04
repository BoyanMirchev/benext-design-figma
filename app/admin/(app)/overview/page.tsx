import Link from "next/link"
import { db } from "@/lib/db"
import { courses, lessons, user } from "@/lib/db/schema"
import { asc, eq, sql } from "drizzle-orm"
import { Users, BookOpen, FileText, ChevronRight } from "lucide-react"

export const metadata = { title: "Преглед | Би Инк" }

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("bg-BG", { day: "numeric", month: "long", year: "numeric" }).format(d)
}

export default async function OverviewPage() {
  const [students] = await db
    .select({ n: sql<number>`count(*)` })
    .from(user)
    .where(eq(user.role, "student"))

  const [coursesTotal] = await db.select({ n: sql<number>`count(*)` }).from(courses)
  const [coursesPublished] = await db
    .select({ n: sql<number>`count(*)` })
    .from(courses)
    .where(eq(courses.status, "published"))

  const [lessonsTotal] = await db.select({ n: sql<number>`count(*)` }).from(lessons)
  const [lessonsPublished] = await db
    .select({ n: sql<number>`count(*)` })
    .from(lessons)
    .where(eq(lessons.published, true))

  const recent = await db
    .select()
    .from(courses)
    .orderBy(asc(courses.position))
    .limit(4)

  const stats = [
    {
      icon: <Users strokeWidth={1.8} />,
      num: String(students?.n ?? 0),
      label: "Ученика",
      href: "/admin/users",
    },
    {
      icon: <BookOpen strokeWidth={1.8} />,
      num: `${coursesPublished?.n ?? 0}/${coursesTotal?.n ?? 0}`,
      label: "Публикувани курсове",
      href: "/admin/courses",
    },
    {
      icon: <FileText strokeWidth={1.8} />,
      num: `${lessonsPublished?.n ?? 0}/${lessonsTotal?.n ?? 0}`,
      label: "Публикувани урока",
      href: "/admin/courses",
    },
  ]

  return (
    <>
      <div className="admin-topbar">
        <h1>Преглед</h1>
      </div>

      <div className="admin-stats">
        {stats.map((s) => (
          <div className="admin-stat" key={s.label}>
            <span className="admin-stat__icon">{s.icon}</span>
            <div>
              <div className="admin-stat__num">{s.num}</div>
              <div className="admin-stat__label">{s.label}</div>
            </div>
            <Link className="admin-stat__go" href={s.href} aria-label={s.label}>
              <ChevronRight strokeWidth={2} />
            </Link>
          </div>
        ))}
      </div>

      <section className="admin-panel">
        <div className="admin-panel__head">
          <h2>Последно добавени курсове</h2>
          <Link href="/admin/courses" className="admin-cta" style={{ minHeight: 52, fontSize: 16 }}>
            Прегледай всички
          </Link>
        </div>

        <div className="admin-recent">
          {recent.map((c) => (
            <div className="admin-recent__row" key={c.id}>
              <div>
                <div className="admin-recent__title">{c.title}</div>
                <div className="admin-recent__meta">{formatDate(new Date(c.createdAt))}</div>
              </div>
              <span
                className={
                  c.status === "published"
                    ? "admin-badge admin-badge--published"
                    : "admin-badge admin-badge--draft"
                }
              >
                {c.status === "published" ? "Публикуван" : "Чернова"}
              </span>
            </div>
          ))}
          {recent.length === 0 && (
            <div className="admin-empty">Все още няма добавени курсове</div>
          )}
        </div>
      </section>
    </>
  )
}
