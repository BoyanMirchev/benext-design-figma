"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Моля попълнете имейл и парола.");
      return;
    }

    if (!isLogin) {
      if (!name.trim()) {
        setError("Моля въведете вашето име.");
        return;
      }
      if (password.length < 8) {
        setError("Паролата трябва да е поне 8 символа.");
        return;
      }
      if (password !== confirm) {
        setError("Паролите не съвпадат.");
        return;
      }
      if (!agree) {
        setError("Моля приемете общите условия.");
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) {
          setError("Грешен имейл или парола.");
          return;
        }
      } else {
        const { error } = await authClient.signUp.email({ name: name.trim(), email, password });
        if (error) {
          setError(
            error.message?.toLowerCase().includes("exist")
              ? "Вече съществува акаунт с този имейл."
              : "Регистрацията не бе успешна. Опитайте отново.",
          );
          return;
        }
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Възникна грешка. Опитайте отново.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="auth__inner">
        <h1 className="auth__title">
          {isLogin ? "Влизане в NeXT акаунт" : "Създаване на NeXT акаунт"}
        </h1>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__fields">
            {!isLogin && (
              <label className="auth-field">
                <span>Име</span>
                <input
                  type="text"
                  placeholder="Вашето име"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}

            <label className="auth-field">
              <span>Имейл</span>
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="auth-field">
              <span>Парола</span>
              <input
                type="password"
                placeholder="Password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {!isLogin && (
              <label className="auth-field">
                <span>Потвърди парола</span>
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            )}

            {isLogin ? (
              <button type="button" className="auth-check" aria-pressed={remember} onClick={() => setRemember((v) => !v)}>
                <span className={remember ? "auth-check__dot on" : "auth-check__dot"} aria-hidden="true" />
                Запомни ме
              </button>
            ) : (
              <button type="button" className="auth-check" aria-pressed={agree} onClick={() => setAgree((v) => !v)}>
                <span className={agree ? "auth-check__dot on" : "auth-check__dot"} aria-hidden="true" />
                Приемам общите условия
              </button>
            )}

            {error && <p className="auth__error" role="alert">{error}</p>}
          </div>

          <button type="submit" className="button button--primary auth__submit" disabled={loading}>
            {loading ? "Моля изчакайте…" : isLogin ? "Вход" : "Регистрация"}
          </button>
        </form>

        <div className="auth__social">
          <button type="button" className="auth-social-btn">{isLogin ? "Вход с Google" : "Регистрация с Google"}</button>
          <button type="button" className="auth-social-btn">{isLogin ? "Вход с Facebook" : "Регистрация с Facebook"}</button>
        </div>

        <div className="auth__links">
          {isLogin ? (
            <>
              <Link href="/login" className="auth__link">Забравена парола?</Link>
              <Link href="/register" className="auth__link">Създаване на акаунт</Link>
            </>
          ) : (
            <Link href="/login" className="auth__link">Вече имате акаунт? Вход</Link>
          )}
        </div>
      </div>
    </section>
  );
}
