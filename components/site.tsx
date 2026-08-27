import Link from "next/link";
import {
  Search, UserRound, Monitor, ShoppingCart, Banknote, Megaphone, Truck,
  Code2, Workflow, MapPin, Phone, AtSign, WandSparkles, LayoutDashboard,
  MousePointerClick, ChartNoAxesColumnIncreasing, GraduationCap, ArrowRight,
  CircleCheck, Circle, Route, BarChart3, Lightbulb, Play, Menu
} from "lucide-react";

export function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "header header--overlay" : "header"}>
      <div className="shell header__inner">
        <Link href="/" className="logo" aria-label="BeNeXt"><img src="/assets/benext-mark.png" alt="BeNeXt" /></Link>
        <nav className="nav">
          <Link href="/services">Услуги</Link><a href="#">Курсове</a><Link href="/projects">Проекти</Link>
          <a href="#">Кариери</a><Link href="/contacts">Контакти</Link><Link href="/about">За нас</Link>
        </nav>
        <div className="header__actions">
          <button className="icon-btn" aria-label="Търсене"><Search size={20}/></button>
          <button className="icon-btn" aria-label="Профил"><UserRound size={20}/></button>
          <Link href="/contacts" className="button button--primary">Започнете сега</Link>
        </div>
        <button className="mobile-menu" aria-label="Меню"><Menu/></button>
      </div>
    </header>
  );
}

export function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={secondary ? "button button--secondary" : "button button--primary"}>{children}</Link>;
}

const services = [
  [Monitor, "Уеб дизайн"], [ShoppingCart, "eCommerce"], [Banknote, "Счетоводни\nсистеми"],
  [Search, "SEO оптимизация"], [Megaphone, "Google & Meta Ads"], [Truck, "Системи за\nЛогистика"]
] as const;

export function ServicesStrip() {
  return <section className="home-services section-shadow"><div className="shell">
    <h2 className="section-title centered">Ние можем да помогнем</h2>
    <div className="service-grid">{services.map(([Icon,t])=><div className="service-card" key={t}><Icon/><span>{t.split("\n").map((x,i)=><span key={i}>{x}{i===0&&t.includes("\n")?<br/>:null}</span>)}</span></div>)}</div>
    <div className="centered"><Button href="/services">Научете повече</Button></div>
  </div></section>;
}

export function Clients() {
  return <section className="clients section-shadow"><div className="shell clients__grid">
    <div><h2 className="section-title">Нашите клиенти</h2><p>Компаниите, които ни имат доверие.<br/>Станете част от тях.</p></div>
    <div className="client-logo-image"><img src="/assets/client-logos.png" alt="Клиенти на BeNeXt"/></div>
  </div></section>;
}

export type Project = { slug:string; name:string; category:string; image?:string };
export const projects: Project[] = [
  {slug:"madix",name:"Madix",category:"Е-магазин",image:"/assets/project-madix.jpg"},
  {slug:"farm-academy",name:"Академия за фермери",category:"Научна Организация",image:"/assets/project-farm.jpg"},
  {slug:"kesh",name:"КЕШ",category:"Заложни къщи, Е-магазин",image:"/assets/project-kesh.jpg"},
  {slug:"aunature",name:"Au Nature Troyan Hotel",category:"Хотел",image:"/assets/project-aunature.jpg"}
];

export function ProjectCard({ project, compact=false }: { project: Project; compact?:boolean }) {
  return <Link href={`/projects/${project.slug}`} className={compact?"project-card project-card--compact":"project-card"}>
    <div className="project-card__image">{project.image?<img src={project.image} alt={project.name}/>:null}</div>
    <div className="project-card__info"><h3>{project.name}</h3>{!compact&&<p>{project.category}</p>}</div>
  </Link>;
}

export function BigCTA() {
  return <section className="cta-section"><div className="shell"><div className="cta-card"><h2>Нека създадем нещо добро заедно.</h2><Button href="/contacts">Свържете се с нас</Button></div></div></section>;
}

const menu = [[WandSparkles,"Препоръчано"],[LayoutDashboard,"Стартирай проекта си"],[MousePointerClick,"Достиг на клиенти"],[ChartNoAxesColumnIncreasing,"Автоматизация"],[GraduationCap,"Курсове"]] as const;
const links = [
  ["Разгледайте нашето портфолио","Вижте нашите успешни проекти"],
  ["Научете повече за нашите услуги","Свържете се с нас за запитвания"],
  ["Регистрирайте се за курсовете ни","Участвайте в нашите семинари"],
  ["Абонирайте се за нюслетъра ни","Присъединете се към нашия бюлетин"],
  ["Посетете нашия блог","Открийте новини и тенденции в индустрията"]
];
export function RecommendationPanel() {
  return <section className="recommendations"><div className="shell recommendation-grid">
    <aside className="recommendation-menu">{menu.map(([Icon,t],i)=><div className={i===0?"rec-menu-item active":"rec-menu-item"} key={t}><Icon size={19}/><span>{t}</span></div>)}</aside>
    <div className="recommendation-card">{links.map(([a,b])=><a href="#" className="rec-link" key={a}><span><strong>{a}</strong><small>{b}</small></span><ArrowRight size={20}/></a>)}</div>
  </div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="shell footer__inner"><div className="footer__links">
    {[["Услуги","Политика"],["Курсове",""] ,["Проекти","Общи условия"],["Контакти","Легално"],["За нас",""] ,["Кариери","Карта"]].map(([a,b])=><div key={a}><strong>{a}</strong><span>{b}</span></div>)}
  </div><img className="footer-logo" src="/assets/benext-mark.png" alt="BeNeXt"/></div></footer>;
}

export function PageEnd({cta=true}:{cta?:boolean}) { return <>{cta&&<BigCTA/>}<RecommendationPanel/><Footer/></> }

export const serviceTop = [
  {icon:Monitor,title:"Front end разработка",text:"Създаваме интерактивни и динамични потребителски интерфейси, използвайки най-новите технологии. Всеки проект е оптимизиран за скорост и производителност."},
  {icon:Code2,title:"Back-end разработка",text:"Разработваме стабилни и сигурни сървърни решения, които поддържат вашите уеб приложения. Използваме надеждни технологии за гарантирана мащабируемост."},
  {icon:Workflow,title:"Анализ на данни",text:"Анализираме данните, за да разберем какво работи, къде се губят ресурси и кои са най-добрите възможности за растеж."}
] as const;

export function CheckItem({children,checked=false}:{children:React.ReactNode;checked?:boolean}){return <li>{checked?<CircleCheck size={20}/>:<Circle size={20}/>}<span>{children}</span></li>}
export function ContactFacts(){return <div className="contact-facts"><div><span><MapPin/></span><a>Княз Борис 1 127, София</a></div><div><span><Phone/></span><a>+359 888 82 634</a></div><div><span><AtSign/></span><a>benextbg@gmail.com</a></div></div>}

export function Process(){
 const data=[[Route,"1. Откриване","Опознаваме вашия бизнес, цели и предизвикателства. Така можем да предложим решение, което е съобразено с реалните ви нужди."],[BarChart3,"2. Дефиниране","Създаваме ясна стратегия и план за правилното решение."],[Lightbulb,"3. Разработка","Проектираме, разработваме и интегрираме всичко необходимо: от дизайна и уеб платформата до ecommerce, SEO, реклами, счетоводни, ТРЗ и логистични системи."],[Play,"4. Старт","Следим представянето, отстраняваме евентуални проблеми и при необходимост оптимизираме системата, за да продължава да носи стойност за бизнеса Ви."] ] as const;
 return <section className="process"><div className="shell process__shell"><h2 className="section-title centered">Нашият процес</h2>{data.map(([Icon,t,p],i)=><div className={`process-row ${i%2?"right":"left"}`} key={t}><div className="process-icon"><Icon/></div><div className="process-copy"><h3>{t}</h3><p>{p}</p>{i<3&&<div className="process-dots">•••</div>}</div></div>)}</div></section>
}
