import { Header, ServicesStrip, Clients, ProjectCard, projects, Process, BigCTA, RecommendationPanel, Footer, Button } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function HomePage(){return <main>
  <div className="home-hero-wrap"><Header overlay/><section className="home-hero"><div className="shell home-hero__content">
    <h1><span>Дигитални решения,</span> които <br/>развиват Вашия бизнес на <br/>друго ниво</h1>
    <p>Ние помагаме на бизнесите да растат с модерни и красиви уебсайтове, <br/>eCommerce и интелигентни системи.</p>
    <div className="button-row"><Button href="/services">Разгледайте услугите</Button><Button href="/contacts" secondary>Свържете се с нас</Button></div>
  </div></section></div>
  <ServicesStrip/><Clients/>
  <section className="featured"><div className="shell"><Reveal className="section-head"><h2 className="section-title">Проекти, от които се гордеем</h2><LinkButton/></Reveal>
    <Stagger className="featured-grid" gap={0.1}>{[projects[3],projects[1],projects[0]].map(p=><StaggerItem className="featured-grid__cell" key={p.slug}><ProjectCard compact project={p}/></StaggerItem>)}</Stagger>
  </div></section>
  <Process/>
  <section className="technologies section-shadow"><Reveal as="h2" className="section-title centered">Технологии, които използваме</Reveal><Stagger className="tech-row" gap={0.05} amount={0.3}>{tech.map(t=><StaggerItem key={t.name}><img src={`/assets/tech/${t.slug}.svg`} alt={t.name}/></StaggerItem>)}</Stagger></section>
  <BigCTA/><RecommendationPanel/><Footer/>
</main>}
function LinkButton(){return <a className="soft-pill" href="/projects">Разгледайте всички <span>⦿</span></a>}

const tech = [
  {name:"Python",slug:"python"},{name:"Next.js",slug:"nextjs"},{name:"Node.js",slug:"nodejs"},
  {name:"Go",slug:"go"},{name:"PostgreSQL",slug:"postgresql"},{name:"MongoDB",slug:"mongodb"},
  {name:"TypeScript",slug:"typescript"},{name:"React",slug:"react"},{name:"Docker",slug:"docker"},
  {name:"Kubernetes",slug:"kubernetes"},
];
