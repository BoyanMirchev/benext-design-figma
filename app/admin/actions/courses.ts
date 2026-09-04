"use server"

import { db } from "@/lib/db"
import { courses, lessons } from "@/lib/db/schema"
import { and, asc, eq, sql } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const current = await getCurrentUser()
  if (!current || current.role !== "admin") throw new Error("Unauthorized")
  return current
}

// ---- Reads ----
export async function listCourses() {
  return db.select().from(courses).orderBy(asc(courses.position))
}

export async function getCourse(id: number) {
  const rows = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
  return rows[0] ?? null
}

export async function listLessons(courseId: number) {
  return db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.position))
}

// ---- Courses ----
export async function createCourse(data: { title: string; description: string; status: string }) {
  await requireAdmin()
  const max = await db
    .select({ v: sql<number>`coalesce(max(${courses.position}), -1)` })
    .from(courses)
  await db.insert(courses).values({
    title: data.title,
    description: data.description,
    status: data.status,
    position: (max[0]?.v ?? -1) + 1,
  })
  revalidatePath("/admin/courses")
  revalidatePath("/admin/overview")
}

export async function updateCourse(
  id: number,
  data: { title?: string; description?: string; status?: string },
) {
  await requireAdmin()
  await db
    .update(courses)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(courses.id, id))
  revalidatePath("/admin/courses")
  revalidatePath(`/admin/courses/${id}`)
  revalidatePath("/admin/overview")
}

export async function deleteCourse(id: number) {
  await requireAdmin()
  await db.delete(lessons).where(eq(lessons.courseId, id))
  await db.delete(courses).where(eq(courses.id, id))
  revalidatePath("/admin/courses")
  revalidatePath("/admin/overview")
}

export async function moveCourse(id: number, dir: "up" | "down") {
  await requireAdmin()
  const all = await db.select().from(courses).orderBy(asc(courses.position))
  const idx = all.findIndex((c) => c.id === id)
  if (idx === -1) return
  const swapWith = dir === "up" ? idx - 1 : idx + 1
  if (swapWith < 0 || swapWith >= all.length) return
  const a = all[idx]
  const b = all[swapWith]
  await db.update(courses).set({ position: b.position }).where(eq(courses.id, a.id))
  await db.update(courses).set({ position: a.position }).where(eq(courses.id, b.id))
  revalidatePath("/admin/courses")
}

// ---- Lessons ----
export async function createLesson(courseId: number, title: string) {
  await requireAdmin()
  const max = await db
    .select({ v: sql<number>`coalesce(max(${lessons.position}), 0)` })
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
  await db.insert(lessons).values({
    courseId,
    title,
    type: "video",
    position: (max[0]?.v ?? 0) + 1,
  })
  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/admin/overview")
}

export async function updateLesson(id: number, courseId: number, title: string) {
  await requireAdmin()
  await db.update(lessons).set({ title }).where(eq(lessons.id, id))
  revalidatePath(`/admin/courses/${courseId}`)
}

export async function deleteLesson(id: number, courseId: number) {
  await requireAdmin()
  await db
    .delete(lessons)
    .where(and(eq(lessons.id, id), eq(lessons.courseId, courseId)))
  revalidatePath(`/admin/courses/${courseId}`)
  revalidatePath("/admin/overview")
}

export async function moveLesson(id: number, courseId: number, dir: "up" | "down") {
  await requireAdmin()
  const all = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.position))
  const idx = all.findIndex((l) => l.id === id)
  if (idx === -1) return
  const swapWith = dir === "up" ? idx - 1 : idx + 1
  if (swapWith < 0 || swapWith >= all.length) return
  const a = all[idx]
  const b = all[swapWith]
  await db.update(lessons).set({ position: b.position }).where(eq(lessons.id, a.id))
  await db.update(lessons).set({ position: a.position }).where(eq(lessons.id, b.id))
  revalidatePath(`/admin/courses/${courseId}`)
}
