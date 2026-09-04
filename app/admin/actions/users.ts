"use server"

import { db } from "@/lib/db"
import { user, settings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const current = await getCurrentUser()
  if (!current || current.role !== "admin") throw new Error("Unauthorized")
  return current
}

export async function updateUserRole(id: string, role: "student" | "admin") {
  await requireAdmin()
  await db
    .update(user)
    .set({ role, updatedAt: new Date() })
    .where(eq(user.id, id))
  revalidatePath("/admin/users")
}

export async function deleteUser(id: string) {
  const current = await requireAdmin()
  if (current.id === id) throw new Error("Не можете да изтриете себе си")
  await db.delete(user).where(eq(user.id, id))
  revalidatePath("/admin/users")
  revalidatePath("/admin/overview")
}

export async function saveGoogleMeetUrl(url: string) {
  await requireAdmin()
  await db
    .insert(settings)
    .values({ key: "google_meet_url", value: url, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: url, updatedAt: new Date() },
    })
  revalidatePath("/admin/video-rooms")
}
