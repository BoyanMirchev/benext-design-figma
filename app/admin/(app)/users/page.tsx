import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { getCurrentUser } from "@/lib/session"
import { UsersView } from "@/app/admin/_components/users-view"

export const metadata = { title: "Потребители | Би Инк" }

export default async function UsersPage() {
  const current = await getCurrentUser()
  const rows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt))

  return <UsersView users={rows} currentUserId={current?.id ?? ""} />
}
