import { Header, Button, PageEnd } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const positions = [
  { title: "Frontend разработчик", type: "Пълен работен ден · Дистанционно", text: "Изграждате модерни, бързи и достъпни потребителски интерфейси с React и Next.js." },
  { title: "Backend разработчик", type: "Пълен работен ден · Хибридно", text: "Проектирате и поддържате стабилни сървърни решения, API и интеграции." },
  { title: "UX/UI дизайнер", type: "Пълен работен ден · Дистанционно", text: "Създавате интуитивни и красиви изживявания — от идея и прототип до завършен дизайн." },
  { title: "Дигитален маркетинг специалист", type: "Пълен работен ден · Хибридно", text: "Управлявате Google и Meta реклами, SEO и стратегии за растеж на нашите клиенти." },
];

export default function CareersPage() {
  return (
    <main>
      <Header />
      <section className="projects-page">
        <div className="shell">
          <Reveal as="h1" y={20}>Кариери в BeNeXt</Reveal>
          <Reveal as="p" className="projects-intro" delay={0.08}>
            Присъединете се към екип, който изгражда дигиталното бъдеще на бизнеса.<br />
            Търсим любопитни и амбициозни хора, които искат да се развиват заедно с нас.
          </Reveal>
          <Stagger className="course-list" gap={0.08}>
            {positions.map((p) => (
              <StaggerItem className="course-row" key={p.title}>
                <div className="course-row__body" style={{ padding: "24px 32px" }}>
                  <h3>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--main)", fontWeight: 700 }}>{p.type}</p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{p.text}</p>
                  <Button href="/contacts">Кандидатствайте</Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="idea-section section-shadow">
        <Reveal className="shell">
          <h2 className="section-title">Не намирате подходяща позиция?</h2>
          <p>Пишете ни на benextbg@gmail.com и разкажете с какво бихте искали<br />да допринесете. Винаги се радваме да се запознаем с талантливи хора.</p>
          <Button href="/contacts">Свържете се с нас</Button>
        </Reveal>
      </section>
      <PageEnd cta={false} />
    </main>
  );
}
