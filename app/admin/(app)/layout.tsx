import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { courses } from "@/lib/db/schema"
import { asc } from "drizzle-orm"
import { AdminShell } from "../_components/admin-shell"
import "../admin.css"

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const current = await getCurrentUser()
  if (!current) redirect("/admin")
  if (current.role !== "admin") redirect("/admin")

  const courseList = await db
    .select({ id: courses.id, title: courses.title })
    .from(courses)
    .orderBy(asc(courses.position))

  return (
    <AdminShell
      courses={courseList}
      userName={current.name}
      userEmail={current.email}
    >
      {children}
    </AdminShell>
  )
}
