"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, UserRound, BookOpen, CircleCheck, Circle,
  Video, ChevronDown,
} from "lucide-react";
import { Footer } from "@/components/site";

type Lesson = { id: number; title: string };

export function CourseDetail({ title, lessons }: { title: string; lessons: Lesson[] }) {
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? 0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [materialOpen, setMaterialOpen] = useState(false);

  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const isDone = completed.includes(activeId);
  const activeIndex = lessons.findIndex((l) => l.id === activeId);

  const toggleComplete = () => {
    setCompleted((prev) =>
      prev.includes(activeId) ? prev.filter((id) => id !== activeId) : [...prev, activeId]
    );
  };

  return (
    <main className="courses-page">
      <header className="course-topbar">
        <div className="shell course-topbar__inner">
          <div className="course-topbar__left">
            <Link href="/courses/dashboard" className="back-link">
              <ArrowLeft size={20} />
              <span>Назад</span>
            </Link>
            <Link href="/" className="logo" aria-label="BeNeXt">
              <img src="/assets/benext-mark.png" alt="BeNeXt" />
            </Link>
          </div>
          <button className="icon-btn" aria-label="Профил">
            <UserRound size={20} />
          </button>
        </div>
      </header>

      <section className="course-detail">
        <div className="shell">
          <h1 className="text-balance">{title}</h1>
          <div className="course-meta">
            <div>
              <BookOpen size={20} />
              <span>{lessons.length} урока</span>
            </div>
            <div>
              <CircleCheck size={20} />
              <span>{completed.length} завършени</span>
            </div>
          </div>

          <div className="course-grid">
            <div className="course-main">
              <div className="lesson-player">
                <div className="lesson-player__head">
                  <h2>{activeIndex + 1}. {active?.title}</h2>
                  <button type="button" className="small-btn" onClick={toggleComplete} disabled={isDone}>
                    {isDone ? "Завършен" : "Завърши"}
                  </button>
                </div>
                <div className="lesson-video">
                  <Video size={48} aria-hidden="true" />
                  <span className="sr-only">Видео плейър за {active?.title}</span>
                </div>
              </div>

              <div className="material">
                <button
                  type="button"
                  className="material__toggle"
                  aria-expanded={materialOpen}
                  onClick={() => setMaterialOpen((v) => !v)}
                >
                  <span>Текстов материал</span>
                  <ChevronDown size={24} />
                </button>
                {materialOpen && (
                  <div className="material__body">
                    <p>
                      Тук ще намерите подробни текстови материали към урока, включително
                      обобщение на ключовите концепции, примери и допълнителни ресурси за
                      задълбочено обучение.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <aside className="lessons-panel">
              <div className="lessons-panel__head">
                <h2>Уроци</h2>
                <ChevronDown size={20} />
              </div>
              <div className="lessons-list">
                {lessons.map((lesson, index) => {
                  const done = completed.includes(lesson.id);
                  return (
                    <button
                      type="button"
                      key={lesson.id}
                      className={lesson.id === activeId ? "lesson-item active" : "lesson-item"}
                      onClick={() => setActiveId(lesson.id)}
                    >
                      {done ? <CircleCheck size={24} className="done" /> : <Circle size={24} />}
                      <span className="lesson-item__body">
                        <strong>{index + 1}. {lesson.title}</strong>
                        <span className="lesson-item__meta">
                          <Video size={16} />
                          Видео
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
