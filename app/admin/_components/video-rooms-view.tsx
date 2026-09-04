"use client"

import { useState, useTransition } from "react"
import { Video, Check } from "lucide-react"
import { saveGoogleMeetUrl } from "@/app/admin/actions/users"

export function VideoRoomsView({ initialUrl }: { initialUrl: string }) {
  const [url, setUrl] = useState(initialUrl)
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <div className="admin-topbar">
        <h1>Видео стаи</h1>
      </div>

      <div className="admin-stack">
        <section className="admin-card">
          <h2>Google Meet стая</h2>
          <p>
            Задайте линка към общата видео стая. Учащите ще виждат бутон за
            присъединяване към живите уроци директно от своя профил.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              startTransition(async () => {
                await saveGoogleMeetUrl(url.trim())
                setSaved(true)
                setTimeout(() => setSaved(false), 2500)
              })
            }}
          >
            <label className="admin-input-label" htmlFor="meet-url">
              Линк към Google Meet
            </label>
            <input
              id="meet-url"
              className="admin-input"
              type="url"
              inputMode="url"
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <div className="admin-card__foot">
              {url && (
                <a
                  className="admin-cta admin-cta--ghost"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Video strokeWidth={2} />
                  Отвори стаята
                </a>
              )}
              <button type="submit" className="admin-cta" disabled={isPending}>
                {saved ? (
                  <>
                    <Check strokeWidth={2} />
                    Запазено
                  </>
                ) : (
                  "Запази"
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
