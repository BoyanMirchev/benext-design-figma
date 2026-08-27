import { Header, ServicesStrip, Clients, ProjectCard, projects, Process, BigCTA, RecommendationPanel, Footer, Button } from "@/components/site";

export default function HomePage(){return <main>
  <div className="home-hero-wrap"><Header overlay/><section className="home-hero"><div className="shell home-hero__content">
    <h1><span>Дигитални решения,</span> които <br/>развиват Вашия бизнес на <br/>друго ниво</h1>
    <p>Ние помагаме на бизнесите да растат с модерни и красиви уебсайтове, <br/>eCommerce и интелигентни системи.</p>
    <div className="button-row"><Button href="/services">Разгледайте услугите</Button><Button href="/contacts" secondary>Свържете се с нас</Button></div>
  </div></section></div>
  <ServicesStrip/><Clients/>
  <section className="featured"><div className="shell"><div className="section-head"><h2 className="section-title">Проекти, от които се гордеем</h2><LinkButton/></div>
    <div className="featured-grid"><ProjectCard compact project={projects[3]}/><ProjectCard compact project={projects[1]}/><ProjectCard compact project={projects[0]}/></div>
  </div></section>
  <Process/>
  <section className="technologies section-shadow"><h2 className="section-title centered">Технологии, които използваме</h2><div className="tech-row">{Array.from({length:11}).map((_,i)=><div key={i}/>)}</div></section>
  <BigCTA/><RecommendationPanel/><Footer/>
</main>}
function LinkButton(){return <a className="soft-pill" href="/projects">Разгледайте всички <span>⦿</span></a>}
