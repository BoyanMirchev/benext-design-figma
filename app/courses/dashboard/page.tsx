import Link from "next/link";
import { Header, Footer } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PlayCircle, CircleCheck, BookOpen } from "lucide-react";

export const courses = [
  { slug: "bazovo", title: "Дигитални умения - базово ниво" },
  { slug: "sredno", title: "Дигитални умения - средно ниво" },
  { slug: "naprednalo", title: "Дигитални умения - напреднало ниво" },
];

export default function DashboardPage() {
  return (
    <main className="courses-page">
      <Header />

      <section className="dash">
        <div className="shell">
          <Reveal className="dash__head">
            <h1>Здравейте, [user]</h1>
            <p>Продължете обучението си по дигитални умения</p>
          </Reveal>

          <Reveal className="dash-stats" delay={0.1}>
            <div className="stat-card">
              <PlayCircle />
              <div>
                <strong>0/4</strong>
                <span>Взети курса</span>
              </div>
            </div>
            <div className="stat-card">
              <CircleCheck />
              <div>
                <strong>0/50</strong>
                <span>Взети урока</span>
              </div>
            </div>
            <div className="progress-card">
              <strong>Общ прогрес</strong>
              <div className="progress-track" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                <div className="progress-fill" />
              </div>
            </div>
          </Reveal>

          <div className="dash__courses-head">
            <h2 className="section-title">Курсове</h2>
            <button type="button" className="pill-secondary">Видео стаи</button>
          </div>

          <Stagger className="course-list" gap={0.1}>
            {courses.map((course) => (
              <StaggerItem key={course.slug} className="course-row">
                <div className="course-row__thumb" aria-hidden="true" />
                <div className="course-row__body">
                  <h3>{course.title}</h3>
                  <Link href={`/courses/${course.slug}`} className="course-row__link">
                    <BookOpen size={24} />
                    <span>Виж уроците</span>
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Footer />
    </main>
  );
}
