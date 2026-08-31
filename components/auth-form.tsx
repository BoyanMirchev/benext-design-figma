"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const [remember, setRemember] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <section className="auth">
      <div className="auth__inner">
        <h1 className="auth__title">
          {isLogin ? "Влизане в NeXT акаунт" : "Създаване на NeXT акаунт"}
        </h1>

        <form className="auth__form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth__fields">
            {!isLogin && (
              <label className="auth-field">
                <span>Име</span>
                <input type="text" placeholder="Вашето име" autoComplete="name" />
              </label>
            )}

            <label className="auth-field">
              <span>Имейл</span>
              <input type="email" placeholder="Email" autoComplete="email" />
            </label>

            <label className="auth-field">
              <span>Парола</span>
              <input type="password" placeholder="Password" autoComplete={isLogin ? "current-password" : "new-password"} />
            </label>

            {!isLogin && (
              <label className="auth-field">
                <span>Потвърди парола</span>
                <input type="password" placeholder="Password" autoComplete="new-password" />
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
          </div>

          <button type="submit" className="button button--primary auth__submit">
            {isLogin ? "Вход" : "Регистрация"}
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
