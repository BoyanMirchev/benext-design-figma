"use server"

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/session"

/**
 * Promote the currently signed-in user to the admin role.
 * Called right after a successful admin registration.
 */
export async function makeCurrentUserAdmin() {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")
  await db
    .update(user)
    .set({ role: "admin", updatedAt: new Date() })
    .where(eq(user.id, session.user.id))
}
