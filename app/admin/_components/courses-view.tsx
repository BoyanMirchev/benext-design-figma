"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Pencil, FileText, Trash2, ChevronUp, ChevronDown, Plus, X } from "lucide-react"
import {
  createCourse,
  updateCourse,
  deleteCourse,
  moveCourse,
} from "@/app/admin/actions/courses"

type Course = {
  id: number
  title: string
  description: string
  status: string
  position: number
}

export function CoursesView({ courses }: { courses: Course[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<Course | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <>
      <div className="admin-topbar">
        <h1>Курсове</h1>
        <div className="admin-topbar__actions">
          <button className="admin-cta" onClick={() => setCreating(true)}>
            Добави курс
            <Plus strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="admin-course-list">
        {courses.length === 0 && (
          <div className="admin-empty">Все още няма курсове. Добавете първия.</div>
        )}
        {courses.map((course, index) => (
          <div className="admin-course-card" key={course.id}>
            <div className="admin-reorder">
              <button
                aria-label="Премести нагоре"
                disabled={index === 0 || isPending}
                onClick={() =>
                  startTransition(async () => {
                    await moveCourse(course.id, "up")
                    router.refresh()
                  })
                }
              >
                <ChevronUp />
              </button>
              <button
                aria-label="Премести надолу"
                disabled={index === courses.length - 1 || isPending}
                onClick={() =>
                  startTransition(async () => {
                    await moveCourse(course.id, "down")
                    router.refresh()
                  })
                }
              >
                <ChevronDown />
              </button>
            </div>

            <div className="admin-course-card__body">
              <span className="admin-course-card__title">{course.title}</span>
              <span className="admin-course-card__desc">{course.description || "Описание"}</span>
            </div>

            <div className="admin-course-card__status">
              <StatusBadge status={course.status} />
            </div>

            <div className="admin-course-card__actions">
              <button className="admin-icon-btn" aria-label="Редактирай" onClick={() => setEditing(course)}>
                <Pencil />
              </button>
              <button
                className="admin-icon-btn"
                aria-label="Уроци"
                onClick={() => router.push(`/admin/courses/${course.id}`)}
              >
                <FileText />
              </button>
              <button
                className="admin-icon-btn admin-icon-btn--danger"
                aria-label="Изтрий"
                disabled={isPending}
                onClick={() => {
                  if (confirm(`Изтриване на „${course.title}"?`)) {
                    startTransition(async () => {
                      await deleteCourse(course.id)
                      router.refresh()
                    })
                  }
                }}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <CourseDialog
          course={editing}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSave={(data) =>
            startTransition(async () => {
              if (editing) {
                await updateCourse(editing.id, data)
              } else {
                await createCourse(data)
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

function StatusBadge({ status }: { status: string }) {
  if (status === "published") {
    return <span className="admin-badge admin-badge--published">Публикуван</span>
  }
  return <span className="admin-badge admin-badge--draft">Чернова</span>
}

function CourseDialog({
  course,
  onClose,
  onSave,
}: {
  course: Course | null
  onClose: () => void
  onSave: (data: { title: string; description: string; status: string }) => void
}) {
  const [title, setTitle] = useState(course?.title ?? "")
  const [description, setDescription] = useState(course?.description ?? "")
  const [status, setStatus] = useState(course?.status ?? "draft")

  return (
    <div className="admin-modal" role="dialog" aria-modal="true">
      <div className="admin-modal__backdrop" onClick={onClose} />
      <div className="admin-modal__card">
        <div className="admin-modal__head">
          <h2>{course ? "Редактирай курс" : "Добави курс"}</h2>
          <button aria-label="Затвори" onClick={onClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!title.trim()) return
            onSave({ title: title.trim(), description: description.trim(), status })
          }}
        >
          <label className="admin-field">
            <span>Име на курс</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Име на курс" />
          </label>
          <label className="admin-field">
            <span>Описание</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
            />
          </label>
          <label className="admin-field">
            <span>Статус</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Чернова</option>
              <option value="published">Публикуван</option>
            </select>
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
