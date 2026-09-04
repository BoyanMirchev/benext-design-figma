"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { makeCurrentUserAdmin } from "@/app/admin/actions/auth"
import { CapIcon } from "./icons"

type Mode = "login" | "register"

export function AdminAuthForm({ initialMode = "login" }: { initialMode?: Mode }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isLogin = mode === "login"

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isLogin) {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) throw new Error(error.message || "Грешка при вход")
      } else {
        const { error } = await authClient.signUp.email({ email, password, name })
        if (error) throw new Error(error.message || "Грешка при регистрация")
        // First registration becomes an administrator.
        await makeCurrentUserAdmin()
      }
      router.push("/admin/overview")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Възникна грешка")
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-auth__brand">
        <div className="admin-auth__logo">
          <CapIcon />
        </div>
        <h1 className="admin-auth__title">Би Инк</h1>
        <p className="admin-auth__sub">Съфинансирано от Европейския съюз</p>
      </div>

      <form className="admin-auth__card" onSubmit={onSubmit}>
        <div className="admin-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={isLogin ? "admin-tab admin-tab--active" : "admin-tab"}
            onClick={() => { setMode("login"); setError(null) }}
          >
            Вход
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={!isLogin ? "admin-tab admin-tab--active" : "admin-tab"}
            onClick={() => { setMode("register"); setError(null) }}
          >
            Регистрация
          </button>
        </div>

        <div className="admin-auth__fields">
          {!isLogin && (
            <label className="admin-field">
              <span>Име и фамилия</span>
              <input
                type="text"
                placeholder="Име и фамилия"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}
          <label className="admin-field">
            <span>Имейл</span>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span>Парола</span>
            <input
              type="password"
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </label>
        </div>

        {error && <p className="admin-auth__error">{error}</p>}

        <button type="submit" className="admin-auth__submit" disabled={loading}>
          {loading ? "Моля изчакайте…" : "Вход"}
        </button>
      </form>
    </div>
  )
}
