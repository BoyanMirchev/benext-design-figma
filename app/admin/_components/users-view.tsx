"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2, ShieldCheck, GraduationCap } from "lucide-react"
import { updateUserRole, deleteUser } from "@/app/admin/actions/users"

type Row = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date | string
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}

export function UsersView({ users, currentUserId }: { users: Row[]; currentUserId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <div className="admin-topbar">
        <h1>Потребители</h1>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Име</th>
              <th>Имейл</th>
              <th className="admin-col-center">Роля</th>
              <th>Регистриран</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isAdmin = u.role === "admin"
              return (
                <tr key={u.id}>
                  <td data-label="Име">{u.name}</td>
                  <td data-label="Имейл">{u.email}</td>
                  <td data-label="Роля" className="admin-col-center">
                    <span className={`admin-badge ${isAdmin ? "admin-badge--admin" : "admin-badge--student"}`}>
                      {isAdmin ? "Администратор" : "Ученик"}
                    </span>
                  </td>
                  <td data-label="Регистриран">{formatDate(u.createdAt)}</td>
                  <td data-label="Действия">
                    <span className="admin-cell-actions">
                      <button
                        className="admin-icon-btn"
                        aria-label={isAdmin ? "Направи ученик" : "Направи администратор"}
                        title={isAdmin ? "Направи ученик" : "Направи администратор"}
                        disabled={isPending}
                        onClick={() =>
                          startTransition(async () => {
                            await updateUserRole(u.id, isAdmin ? "student" : "admin")
                            router.refresh()
                          })
                        }
                      >
                        {isAdmin ? <GraduationCap /> : <ShieldCheck />}
                      </button>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        aria-label="Изтрий"
                        disabled={isPending || u.id === currentUserId}
                        onClick={() => {
                          if (confirm(`Изтриване на „${u.name}"?`)) {
                            startTransition(async () => {
                              await deleteUser(u.id)
                              router.refresh()
                            })
                          }
                        }}
                      >
                        <Trash2 />
                      </button>
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {users.length === 0 && <div className="admin-empty">Все още няма регистрирани потребители.</div>}
      </div>
    </>
  )
}
