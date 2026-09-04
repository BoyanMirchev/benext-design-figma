import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { AdminAuthForm } from "./_components/admin-auth-form"
import "./admin.css"

export const metadata = {
  title: "Би Инк | Админ панел",
  description: "Вход в администраторския панел на Дигитал Фючър.",
}

export default async function AdminAuthPage() {
  const current = await getCurrentUser()
  if (current?.role === "admin") redirect("/admin/overview")

  return (
    <div className="admin-scope">
      <AdminAuthForm initialMode="login" />
    </div>
  )
}
