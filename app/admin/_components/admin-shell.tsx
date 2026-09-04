"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { CapIcon } from "./icons"
import {
  LayoutGrid,
  BookOpen,
  Users,
  Phone,
  Eye,
  ChevronDown,
  ChevronUp,
  LogOut,
  MoreHorizontal,
  X,
} from "lucide-react"

type Course = { id: number; title: string }

export function AdminShell({
  children,
  courses,
  userName,
  userEmail,
}: {
  children: React.ReactNode
  courses: Course[]
  userName: string
  userEmail: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [coursesOpen, setCoursesOpen] = useState(
    pathname.startsWith("/admin/courses"),
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const isCourses = pathname.startsWith("/admin/courses")

  async function logout() {
    await authClient.signOut()
    router.push("/admin")
    router.refresh()
  }

  const nav = (
    <nav className="admin-nav">
      <Link
        href="/admin/overview"
        className={
          pathname === "/admin/overview"
            ? "admin-nav__item admin-nav__item--active"
            : "admin-nav__item"
        }
      >
        <LayoutGrid strokeWidth={1.8} />
        Преглед
      </Link>

      <button
        type="button"
        className={
          isCourses ? "admin-nav__item admin-nav__item--active" : "admin-nav__item"
        }
        onClick={() => setCoursesOpen((v) => !v)}
        aria-expanded={coursesOpen}
      >
        <BookOpen strokeWidth={1.8} />
        Курсове
        {coursesOpen ? (
          <ChevronUp className="admin-nav__chev" strokeWidth={1.8} />
        ) : (
          <ChevronDown className="admin-nav__chev" strokeWidth={1.8} />
        )}
      </button>
      {coursesOpen && (
        <div className="admin-nav__sub">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/admin/courses/${c.id}`}
              className={
                pathname === `/admin/courses/${c.id}`
                  ? "admin-nav__subitem admin-nav__subitem--active"
                  : "admin-nav__subitem"
              }
            >
              {c.title}
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/admin/users"
        className={
          pathname === "/admin/users"
            ? "admin-nav__item admin-nav__item--active"
            : "admin-nav__item"
        }
      >
        <Users strokeWidth={1.8} />
        Потребители
      </Link>

      <Link
        href="/admin/video-rooms"
        className={
          pathname === "/admin/video-rooms"
            ? "admin-nav__item admin-nav__item--active"
            : "admin-nav__item"
        }
      >
        <Phone strokeWidth={1.8} />
        Видео стаи
      </Link>

      <Link href="/" className="admin-nav__item">
        <Eye strokeWidth={1.8} />
        Изглед учащ
      </Link>
    </nav>
  )

  return (
    <div className="admin-scope">
      <div className="admin-shell">
        {mobileNavOpen && (
          <div className="admin-sidebar__backdrop" onClick={() => setMobileNavOpen(false)} />
        )}
        <aside
          className={mobileNavOpen ? "admin-sidebar admin-sidebar--open" : "admin-sidebar"}
          onClick={(e) => {
            const target = e.target as HTMLElement
            if (target.closest("a")) setMobileNavOpen(false)
          }}
        >
          <button
            className="admin-sidebar__close"
            aria-label="Затвори менюто"
            onClick={() => setMobileNavOpen(false)}
          >
            <X strokeWidth={1.8} />
          </button>
          <div className="admin-brand">
            <div className="admin-brand__logo">
              <CapIcon />
            </div>
            <div>
              <div className="admin-brand__name">Дигитал Фючър</div>
              <div className="admin-brand__sub">Админ панел</div>
            </div>
          </div>

          {nav}

          <div className="admin-user">
            <div className="admin-user__avatar">
              <Users size={22} strokeWidth={1.8} />
            </div>
            <div className="admin-user__meta">
              <span className="admin-user__name">{userName || "Администратор"}</span>
              <span className="admin-user__mail">{userEmail}</span>
            </div>
            <button className="admin-user__logout" onClick={logout} aria-label="Изход">
              <LogOut strokeWidth={1.8} />
            </button>
          </div>
        </aside>

        <main className="admin-main">
          {/* Mobile header */}
          <div className="admin-mobile-header">
            <div className="admin-mobile-header__brand">
              <div className="admin-mobile-header__logo">
                <CapIcon />
              </div>
              <div>
                <div className="admin-mobile-header__name">Дигитал Фючър</div>
                <div className="admin-mobile-header__sub">Админ панел</div>
              </div>
            </div>
            <div className="admin-mobile-header__actions">
              <button aria-label="Отвори менюто" onClick={() => setMobileNavOpen(true)}>
                <MoreHorizontal strokeWidth={1.8} />
              </button>
              <button aria-label="Изход" onClick={logout}>
                <LogOut strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}
