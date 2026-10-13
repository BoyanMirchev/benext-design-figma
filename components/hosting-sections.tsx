import { CircleCheck } from "lucide-react";
import { Button } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { HostingPlans } from "@/components/hosting-plans";

type Fact = { title: string; text: string };

function Facts({ items, className = "hp-facts" }: { items: Fact[]; className?: string }) {
  return (
    <dl className={className}>
      {items.map((f) => (
        <div key={f.title}><dt>{f.title}</dt><dd>{f.text}</dd></div>
      ))}
    </dl>
  );
}

function SplitCard({ title, children, aside }: { title: string; children: React.ReactNode; aside: React.ReactNode }) {
  return (
    <Reveal as="article" className="hp-card">
      <div className="hp-card__main"><h2>{title}</h2>{children}</div>
      <div className="hp-card__aside">{aside}</div>
    </Reveal>
  );
}

const speedFacts: Fact[] = [
  { title: "NVMe SSD", text: "високопроизводително дисково пространство" },
  { title: "Benext Cache", text: "кешираща технология за по-бързо предоставяне на съдържание" },
  { title: "WordPress", text: "среда, оптимизирана за популярната CMS платформа" },
  { title: "HTTP/2 и PHP", text: "поддръжка на съвременни уеб технологии" },
];

const envFacts: Fact[] = [
  { title: "[ПОПЪЛНИ]", text: "клиенти" },
  { title: "[ПОПЪЛНИ] ", text: "държави и пазари" },
  { title: "Български екип", text: "локална техническа поддръжка" },
];

const securityFacts: Fact[] = [
  { title: "Benext Protect", text: "многостепенна система за защита" },
  { title: "DDoS", text: "защита срещу нежелан трафик" },
  { title: "99,9%+ Uptime", text: "стабилна достъпност на услугите" },
  { title: "Website Security", text: "защита на уеб и CMS системите" },
  { title: "Malware Protection", text: "защита от зловреден софтуер" },
  { title: "SSL", text: "криптирана връзка" },
  { title: "Backup", text: "резервни копия на твоите данни" },
  { title: "Infrastructure", text: "стабилна и модерна хостинг среда" },
];

const infraFacts: Fact[] = [
  { title: "N+1", text: "резервираност на ключови компоненти" },
  { title: "Независими мрежови връзки", text: "стабилна свързаност" },
  { title: "Надеждна инфраструктура", text: "системи, проектирани за непрекъсната работа" },
  { title: "Локация", text: "София, България" },
];

const tech = [
  { slug: "nextjs", name: "Next.js" },
  { slug: "nodejs", name: "Node.js" },
  { slug: "go", name: "Go" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "mongodb", name: "MongoDB" },
  { slug: "react", name: "React" },
  { slug: "docker", name: "Docker" },
  { slug: "kubernetes", name: "Kubernetes" },
];

const ALL = "all";
type Row = [string, string | string[]];

const tables: { head: string; rows: Row[] }[] = [
  {
    head: "Характеристики",
    rows: [
      ["NVMe Storage", ["5 GB / 60 000 файла", "15 GB / 110 000 файла", "50 GB / 230 000 файла", "150 GB / 350 000 файла"]],
      ["RAM", ["1 GB", "1.5 GB", "2 GB", "3 GB"]],
      ["Месечен трафик", ["Неограничен", "Неограничен", "Неограничен", "Неограничен"]],
      ["cPanel / Linux / PHP / MySQL", ["Да", "Да", "Да", "Да"]],
      ["Пощенски кутии", ["5", "Неограничени", "Неограничени", "Неограничени"]],
      ["SPAM защита", ["Стандартна", "Стандартна", "Интелигентна", "Интелигентна"]],
      ["Backup", ["2", "6", "10", "14"]],
      ["Backup Manager", ["Да", "Да", "Да", "Да"]],
      ["Softaculous", ["Да", "Да", "Да", "Да"]],
      ["Professional Restore", ["-", "Да", "Да", "Да"]],
      ["Benext Cache", ["-", "-", "-", "Да"]],
      ["Redis", ["Опция", "Опция", "Да", "Да"]],
      ["Memcached", ["Опция", "Опция", "Да", "Да"]],
      ["Git repositories", ["-", "-", "Да", "Да"]],
      ["MariaDB / PostgreSQL бази", ["2", "50", "500", "1000"]],
      ["PHP", ["Поддържани версии", "Поддържани версии", "Поддържани версии", "Поддържани версии"]],
      ["Python", ["Опция", "Опция", "Да", "Да"]],
      ["Node.js", ["Опция", "Опция", "Опция", "Да"]],
      ["Perl / C++", ["Да", "Да", "Да", "Да"]],
      ["Add-on домейни", ["-", "-", "50", "150"]],
      ["Поддомейни", ["3", "200", "Неограничени", "Неограничени"]],
      ["Паркирани домейни", ["-", "30", "Неограничени", "Неограничени"]],
      ["FTP потребители", ["1", "50", "500", "Неограничени"]],
      ["SSH", ["-", "-", "Безплатно", "Безплатно"]],
      ["SSL", ["Да", "Да", "Да", "Да"]],
      ["Миграция", ["Опция", "Опция", "Включена", "Включена"]],
      ["Период за отказ", ["30 дни", "30 дни", "30 дни", "30 дни"]],
    ],
  },
  {
    head: "Параметър",
    rows: [
      ["Процесорно време / месец", ["950 минути", "1 100 минути", "3 900 минути", "5 600 минути"]],
      ["Apache паралелни връзки", ["100", "100", "100", "100"]],
      ["Fast CGI PHP процеси", ["15", "15", "15", "15"]],
      ["Файлове / директории", ["60 000", "110 000", "230 000", "350 000"]],
      ["Размер на SQL база", ["до 500 MB", "до 1 GB", "до 1 GB", "до 1 GB"]],
      ["Общо пространство за бази", ["до 1 GB", "до 1 GB", "до 2 GB", "до 2 GB"]],
      ["Таблици в база", ["1 000", "1 000", "1 000", "1 000"]],
      ["MySQL заявки / час", ["100 000", "100 000", "100 000", "100 000"]],
      ["Паралелни SQL връзки", ["30", "30", "30", "30"]],
      ["Изпращани имейли / час", ["100", "350", "1050", "1400"]],
      ["RAM", ["1 GB", "1.5 GB", "2 GB", "3 GB"]],
      ["CloudLinux процеси", ["30", "30", "60", "100"]],
      ["IO / IOPS", ["12 MB/s или 800 IOPS", "12 MB/s или 800 IOPS", "20 MB/s или 800 IOPS", "50 MB/s или 800 IOPS"]],
    ],
  },
  {
    head: "Функция",
    rows: [
      ["Webmail", ALL],
      ["Настройваем SPAM филтър", ALL],
      ["SPAM защита", ["Стандартна", "Стандартна", "Интелигентна", "Интелигентна"]],
      ["Поддръжка на мобилни устройства", ALL],
      ["Автоматичен отговор", ALL],
      ["Филтри", ALL],
      ["Препращане", ALL],
      ["IMAP", ALL],
      ["POP3", ALL],
      ["SMTP", ALL],
      ["SSL връзка", ALL],
      ["Mailing lists", ["-", "1", "5", "20"]],
    ],
  },
  {
    head: "Защита",
    rows: [
      ["DDoS защита", ALL],
      ["24/7 наблюдение за неоторизиран достъп", ALL],
      ["SPAM защита", ["Стандартна", "Стандартна", "Интелигентна", "Интелигентна"]],
      ["Защита на пощенските кутии", ALL],
      ["SPAM защита", ALL],
      ["Защита на WordPress и други CMS", ALL],
      ["Защита от опити за пробив", ALL],
      ["Премахване на зловреден код", ["Според услугата", "Според услугата", "Да", "Да"]],
    ],
  },
  {
    head: "Услуга",
    rows: [
      ["Помощ при настройка", ALL],
      ["SSL сертификат", ALL],
      ["Миграция", ["Опция", "Опция", "Включена", "Включена"]],
      ["Backup", ALL],
    ],
  },
];

const planNames = ["Benext Mini", "Benext Start", "Benext Business", "Benext Store"];

const renewal: [string, string[]][] = [
  ["1 месец", ["5,49 €", "10,99 €", "18,49 €", "32,49 €"]],
  ["12 месеца", ["65,88 €", "131,88 €", "221,88 €", "389,88 €"]],
];

const support = ["HelpDesk / Tickets", "Имейл поддръжка", "Телефонна поддръжка", "Онлайн чат"];

const faq = [
  "Как мога да поръчам хостинг и домейн?",
  "Какво представлява хостингът?",
  "Как да избера подходящ хостинг план?",
  "За колко време се активира поръчката?",
  "Какви начини за плащане са налични?",
  "Как да подновя своя хостинг или домейн?",
  "След като поръчам хостинг, мога ли да създавам имейл кутии?",
  "Как да насоча домейна към хостинга си?",
  "Как да прехвърля сайта си към Benext.bg?",
  "Защитени ли са данните ми?",
];

function SpecTable({ head, rows }: { head: string; rows: Row[] }) {
  return (
    <div className="hp-table-wrap">
      <table className="hp-table">
        <thead><tr><th scope="col">{head}</th>{planNames.map((n) => <th key={n} scope="col">{n}</th>)}</tr></thead>
        <tbody>
          {rows.map(([label, values], i) => (
            <tr key={`${label}-${i}`}>
              <th scope="row">{label}</th>
              {values === ALL
                ? <td colSpan={4} className="hp-table__all">Включен за всички планове</td>
                : (values as string[]).map((v, j) => <td key={j}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HostingSections() {
  return (
    <div className="hp">
      <section id="predimstva" className="hp-section">
        <div className="hp-narrow">
          <Reveal className="hp-figure"><img src="/assets/hosting-speed.png" alt="Сървърно помещение с високопроизводителни сървъри" /></Reveal>
          <div className="hp-stack">
            <SplitCard title="Максимална скорост за твоя сайт" aside={<Facts items={speedFacts} />}>
              <p>Използваме съвременни технологии за хостинг, които са създадени с една основна цел – сайтът ти да работи бързо, стабилно и без излишни забавяния.</p>
              <p>Знаем, че скоростта има значение както за посетителите, така и за цялостното усещане при използване на сайта.</p>
            </SplitCard>
            <SplitCard title="Част от по-голяма технологична среда" aside={<Facts items={envFacts} />}>
              <p>Benext.bg изгражда услугите си с фокус върху надеждност, сигурност и развитие на собствената инфраструктура.</p>
              <p>Комбинираме съвременни технологии с локална поддръжка и практичен подход към нуждите на клиентите.</p>
            </SplitCard>
          </div>
        </div>
      </section>

      <section className="hp-tech section-shadow">
        <Reveal as="h2" className="section-title centered">Всяка Ваша нужда на едно място</Reveal>
        <Stagger className="hp-tech__row" gap={0.05} amount={0.3}>
          {tech.map((t) => <StaggerItem key={t.slug}><img src={`/assets/tech/${t.slug}.svg`} alt={t.name} /></StaggerItem>)}
        </Stagger>
      </section>

      <section className="hp-section">
        <div className="hp-narrow hp-stack">
          <SplitCard
            title="Повече знания. Повече възможности."
            aside={<p>Искаш да научиш повече за управлението на сайта си? В Benext.bg можеш да използваш база от полезна информация, ръководства и практически материали, които ще ти помогнат както при първите стъпки, така и при по-напреднали задачи.</p>}
          >
            <dl className="hp-facts hp-links">
              <div><dt><a href="https://help.benext.bg" target="_blank" rel="noreferrer">help.benext.bg</a></dt><dd>ръководства и база знания</dd></div>
              <div><dt><a href="https://blog.benext.bg" target="_blank" rel="noreferrer">blog.benext.bg</a></dt><dd>съвети, новини и полезна информация</dd></div>
            </dl>
          </SplitCard>
          <SplitCard
            title="Безплатна миграция към Benext.bg"
            aside={<>
              <p>Вече имаш сайт?</p>
              <p>При подходящите хостинг планове екипът на Benext.bg може да съдейства за преместването на сайта към новата среда.</p>
              <p>Миграцията може да включва прехвърляне на файлове, бази данни и основни настройки.</p>
              <Button href="/contacts">Мигрирай сайта си</Button>
            </>}
          >{null}</SplitCard>
        </div>

        <div className="hp-narrow hp-success">
          <Reveal as="h2" className="section-title centered">Нашият успех е видим</Reveal>
          <Reveal className="hp-figure"><img src="/assets/hosting-success.png" alt="Аналитично табло с растящ трафик и стабилна достъпност" /></Reveal>
        </div>

        <div className="hp-narrow hp-stack">
          <Reveal as="article" className="hp-card hp-card--full">
            <h2>Сигурност без излишни компромиси</h2>
            <p>Сигурността е основна част от хостинг услугата на Benext.bg. Инфраструктурата и системите за защита са създадени така, че да ограничават различни видове заплахи и да осигуряват по-спокойна работа за твоя сайт.</p>
            <Facts items={securityFacts} className="hp-facts hp-facts--grid" />
          </Reveal>
          <SplitCard title="Инфраструктура от висок клас" aside={<Facts items={infraFacts} />}>
            <p>Хостинг услугите на Benext.bg работят върху инфраструктура, проектирана за стабилна работа и постоянна достъпност.</p>
            <p>Използваме съвременни сървърни технологии и резервирани компоненти, когато са приложими към конкретната услуга.</p>
          </SplitCard>
        </div>
      </section>

      <section id="tseni" className="hp-section hp-pricing">
        <div className="shell">
          <Reveal as="h2" className="section-title centered">Хостинг планове</Reveal>
          <HostingPlans />
        </div>
        <div className="hp-narrow hp-tables">
          {tables.map((t) => <SpecTable key={t.head} head={t.head} rows={t.rows} />)}
          <div className="hp-table-wrap hp-table-wrap--period">
            <table className="hp-table">
              <thead><tr><th scope="col">Период</th>{planNames.map((n) => <th key={n} scope="col">{n}</th>)}</tr></thead>
              <tbody>{renewal.map(([label, values]) => <tr key={label}><th scope="row">{label}</th>{values.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="hp-note">Цените са с включен ДДС. При подновяване се прилагат актуалните цени на услугата към момента на подновяване.</p>
        </div>
      </section>

      <section className="hp-support">
        <div className="shell">
          <Reveal as="h2" className="section-title centered">Поддръжка 24/7</Reveal>
          <Reveal as="p" className="hp-support__lead">Когато имаш технически въпрос, можеш да се свържеш с нашия екип чрез удобния за теб канал.</Reveal>
          <Stagger as="ul" className="hp-support__grid" gap={0.08}>
            {support.map((s) => (
              <StaggerItem as="li" key={s}><CircleCheck aria-hidden="true" strokeWidth={1.6} /><span>{s}</span></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="vaprosi" className="hp-section hp-faq">
        <div className="hp-narrow">
          <Reveal as="h2" className="section-title centered">Въпроси? Отговори.</Reveal>
          <Stagger as="ul" className="hp-faq__list" gap={0.04}>
            {faq.map((q) => <StaggerItem as="li" key={q}>{q}</StaggerItem>)}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
