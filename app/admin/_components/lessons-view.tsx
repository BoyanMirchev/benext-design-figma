"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus, Video, ArrowLeft, X } from "lucide-react"
import {
  createLesson,
  updateLesson,
  deleteLesson,
  moveLesson,
} from "@/app/admin/actions/courses"

type Lesson = {
  id: number
  title: string
  type: string
  position: number
  createdAt: Date | string
}

type CourseInfo = { id: number; title: string; status: string }

function formatDate(value: Date | string) {
  const d = new Date(value)
  return (
    d.toLocaleDateString("bg-BG", { day: "numeric", month: "short" }) +
    ", " +
    d.toLocaleTimeString("bg-BG", { hour: "2-digit", minute: "2-digit" })
  )
}

export function LessonsView({ course, lessons }: { course: CourseInfo; lessons: Lesson[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<Lesson | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-back">
          <button aria-label="Назад" onClick={() => router.push("/admin/courses")}>
            <ArrowLeft />
          </button>
          <h1>{course.title}</h1>
          <span className={`admin-badge ${course.status === "published" ? "admin-badge--published" : "admin-badge--draft"}`}>
            {course.status === "published" ? "Публикуван" : "Чернова"}
          </span>
        </div>
        <div className="admin-topbar__actions">
          <button className="admin-cta" onClick={() => setCreating(true)}>
            Добави урок
            <Plus strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ред</th>
              <th>Заглавие</th>
              <th className="admin-col-center">Тип</th>
              <th>Добавено на</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson.id}>
                <td data-label="Ред">
                  <span className="admin-row-num">
                    {index + 1}
                    <span className="admin-reorder">
                      <button
                        aria-label="Нагоре"
                        disabled={index === 0 || isPending}
                        onClick={() =>
                          startTransition(async () => {
                            await moveLesson(lesson.id, course.id, "up")
                            router.refresh()
                          })
                        }
                      >
                        <ChevronUp />
                      </button>
                      <button
                        aria-label="Надолу"
                        disabled={index === lessons.length - 1 || isPending}
                        onClick={() =>
                          startTransition(async () => {
                            await moveLesson(lesson.id, course.id, "down")
                            router.refresh()
                          })
                        }
                      >
                        <ChevronDown />
                      </button>
                    </span>
                  </span>
                </td>
                <td data-label="Заглавие">{lesson.title}</td>
                <td data-label="Тип" className="admin-col-center">
                  <span className="admin-type-pill">
                    <Video />
                    Видео
                  </span>
                </td>
                <td data-label="Добавено на">{formatDate(lesson.createdAt)}</td>
                <td data-label="Действия">
                  <span className="admin-cell-actions">
                    <button className="admin-icon-btn" aria-label="Редактирай" onClick={() => setEditing(lesson)}>
                      <Pencil />
                    </button>
                    <button
                      className="admin-icon-btn admin-icon-btn--danger"
                      aria-label="Изтрий"
                      disabled={isPending}
                      onClick={() => {
                        if (confirm(`Изтриване на „${lesson.title}"?`)) {
                          startTransition(async () => {
                            await deleteLesson(lesson.id, course.id)
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
            ))}
          </tbody>
        </table>
        {lessons.length === 0 && <div className="admin-empty">Все още няма уроци.</div>}
      </div>

      {(creating || editing) && (
        <LessonDialog
          lesson={editing}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSave={(title) =>
            startTransition(async () => {
              if (editing) {
                await updateLesson(editing.id, course.id, title)
              } else {
                await createLesson(course.id, title)
              }
              setCreating(false)
              setEditing(null)
              router.refresh()
            })
          }
        />
      )}
    </>
  )
}

function LessonDialog({
  lesson,
  onClose,
  onSave,
}: {
  lesson: Lesson | null
  onClose: () => void
  onSave: (title: string) => void
}) {
  const [title, setTitle] = useState(lesson?.title ?? "")

  return (
    <div className="admin-modal" role="dialog" aria-modal="true">
      <div className="admin-modal__backdrop" onClick={onClose} />
      <div className="admin-modal__card">
        <div className="admin-modal__head">
          <h2>{lesson ? "Редактирай урок" : "Добави урок"}</h2>
          <button aria-label="Затвори" onClick={onClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!title.trim()) return
            onSave(title.trim())
          }}
        >
          <label className="admin-field">
            <span>Заглавие на урок</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Име на урок" />
          </label>
          <div className="admin-modal__foot">
            <button type="button" className="admin-cta admin-cta--ghost" onClick={onClose}>
              Отказ
            </button>
            <button type="submit" className="admin-cta">
              Запази
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
