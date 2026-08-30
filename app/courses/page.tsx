import { Header, Footer, Button } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  GraduationCap, Monitor, Code2, Presentation, ListChecks,
  PlayCircle, Phone, BookOpen, Users, Award,
} from "lucide-react";

const available = [
  [Monitor, "Дигитализация"],
  [Code2, "Програмиране"],
  [Presentation, "Маркетинг"],
] as const;

const stats = [
  ["50+", "Видео урока"],
  ["1000+", "Обучени"],
  ["4", "Програми"],
] as const;

const capabilities = [
  [ListChecks, "Проследяване", "Следете прогреса си и отбелязвайте завършените уроци за по-добра организация."],
  [PlayCircle, "Видео уроци", "Гледайте видео уроци по всяко време. Учете в собствено темпо с качествено съдържание."],
  [Phone, "Видео разговори", "Провеждайте видео обучения на живо с преподаватели и други участници."],
  [BookOpen, "Текстови материали", "Достъп до подробни текстови материали и ръководства за задълбочено обучение."],
  [Users, "Групови занятия", "Учете заедно с други участници в групови видео стаи за по-ефективно обучение."],
  [Award, "Сертифициране", "Завършете обученията и получете потвърждение за придобитите DI-GI компетенции."],
] as const;

export default function CoursesPage() {
  return (
    <main className="courses-page">
      <Header />

      <section className="courses-hero">
        <div className="shell courses-hero__grid">
          <Reveal>
            <span className="eu-badge">Съфинансирано от Европейския Съюз</span>
            <h1 className="text-balance">Безплатни обучения за <span>DI-GI</span> умения</h1>
            <p className="text-pretty">
              Развийте дигиталните си умения с нашата платформа. Видео уроци, текстови
              материали и обучения на живо с опитни преподаватели.
            </p>
            <div className="button-row">
              <Button href="/courses/dashboard">Започнете обучение</Button>
              <Button href="/courses/dashboard" secondary>Вход в платформата</Button>
            </div>
          </Reveal>

          <Reveal as="aside" className="courses-aside" delay={0.15}>
            <div className="avail-head">
              <GraduationCap size={32} />
              <span>Налични курсове по:</span>
            </div>
            <div className="avail-card">
              {available.map(([Icon, label]) => (
                <a href="#" key={label}>
                  <Icon size={24} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <div className="avail-stats">
              {stats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="capabilities">
        <div className="shell">
          <Reveal className="capabilities__head centered">
            <h2 className="section-title">Възможности</h2>
            <p>Всичко необходимо за ефективно дигитално обучение</p>
          </Reveal>
          <Stagger className="cap-grid" gap={0.08}>
            {capabilities.map(([Icon, title, text]) => (
              <StaggerItem as="article" className="cap-card" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="courses-cta">
        <div className="shell">
          <Reveal>
            <h2>Готови да започнем?</h2>
            <p>Регистрирайте се безплатно и започнете обучение по дигитални умения още днес.</p>
            <Button href="/courses/dashboard">Регистрация</Button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
