import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/** Returns the full user row (including role) for the current session, or null. */
export async function getCurrentUser() {
  const session = await getSession()
  if (!session?.user) return null
  const rows = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1)
  return rows[0] ?? null
}
