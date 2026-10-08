import { Header, Button, PageEnd } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const positions = [
  { title: "Front-end разработчик", type: "Пълен работен ден · Дистанционно", text: "Изграждате модерни, бързи и достъпни потребителски интерфейси с React и Next.js." },
  { title: "Back-end разработчик", type: "Пълен работен ден · Хибридно", text: "Проектирате и поддържате стабилни сървърни решения, API и интеграции." },
  { title: "UX/UI дизайнер", type: "Пълен работен ден · Дистанционно", text: "Създавате интуитивни и красиви изживявания: от идея и прототип до завършен дизайн." },
  { title: "Дигитален маркетинг специалист", type: "Пълен работен ден · Хибридно", text: "Управлявате Google и Meta реклами, SEO и стратегии за растеж на нашите клиенти." },
];

export default function CareersPage() {
  return (
    <main>
      <Header />
      <section className="careers-page">
        <div className="shell">
          <Reveal as="h1" y={20}>Кариери</Reveal>
          <Reveal as="p" className="careers-intro" delay={0.08}>
            Присъединете се към екип, който изгражда дигиталното бъдеще на бизнеса.<br />
            Търсим любопитни и амбициозни хора, които искат да се развиват заедно с нас.
          </Reveal>
          <Reveal as="h2" className="section-title careers-heading" delay={0.12}>Текущи налични позиции</Reveal>
          <Stagger className="careers-grid" gap={0.08}>
            {positions.map((p) => (
              <StaggerItem className="career-card" key={p.title}>
                <h3>{p.title}</h3>
                <p className="career-card__text">{p.text}</p>
                <p className="career-card__type">{p.type}</p>
                <Button href="/contacts">Виж обявата</Button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <PageEnd cta={false} />
    </main>
  );
}
