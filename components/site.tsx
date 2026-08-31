import Link from "next/link";
import {
  Search, Monitor, ShoppingCart, Banknote, Megaphone, Truck,
  Code2, Workflow, MapPin, Phone, AtSign, WandSparkles, LayoutDashboard,
  MousePointerClick, ChartNoAxesColumnIncreasing, GraduationCap, ArrowRight,
  CircleCheck, Circle, Route, BarChart3, Lightbulb, Play, ChevronDown, ChevronRight
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export { Header } from "@/components/site-header";

export function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={secondary ? "button button--secondary" : "button button--primary"}>{children}</Link>;
}

const services = [
  [Monitor, "Уеб дизайн"], [ShoppingCart, "eCommerce"], [Banknote, "Счетоводни\nсистеми"],
  [Search, "SEO оптимизация"], [Megaphone, "Google & Meta Ads"], [Truck, "Системи за\nЛогистика"]
] as const;

export function ServicesStrip() {
  return <section className="home-services section-shadow"><div className="shell">
    <Reveal as="h2" className="section-title centered">Ние можем да помогнем</Reveal>
    <Stagger className="service-grid">{services.map(([Icon,t])=><StaggerItem className="service-card" key={t}><Icon/><span>{t.split("\n").map((x,i)=><span key={i}>{x}{i===0&&t.includes("\n")?<br/>:null}</span>)}</span></StaggerItem>)}</Stagger>
    <Reveal className="centered"><Button href="/services">Научете повече</Button></Reveal>
  </div></section>;
}

const clientLogos = [
  {name:"Farm Academy",slug:"farm-academy"},
  {name:"Madix Groundbaits",slug:"madix"},
  {name:"КЕШ",slug:"kesh"},
  {name:"Au Nature Guest House",slug:"aunature"},
];

export function Clients() {
  return <section className="clients section-shadow"><div className="shell clients__grid">
    <Reveal><h2 className="section-title">Нашите клиенти</h2><p>Компаниите, които ни имат доверие.<br/>Станете част от тях.</p></Reveal>
    <Stagger className="clients__logos">{clientLogos.map(c=>(
      <StaggerItem key={c.slug} className="client-logo"><img src={`/assets/clients/${c.slug}.png`} alt={c.name}/></StaggerItem>
    ))}</Stagger>
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
  return <section className="cta-section"><div className="shell"><Reveal className="cta-card" y={28}><h2>Нека създадем нещо добро заедно.</h2><Button href="/contacts">Свържете се с нас</Button></Reveal></div></section>;
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
    <aside className="recommendation-menu">{menu.map(([Icon,t],i)=><div className={i===0?"rec-menu-item active":"rec-menu-item"} key={t}><Icon size={19}/><span>{t}</span>{i===0&&<ChevronDown size={20} className="rec-menu-chev"/>}</div>)}</aside>
    <Stagger className="recommendation-card" amount={0.15}>{links.map(([a,b])=><StaggerItem as="a" href="#" className="rec-link" key={a}><span><strong>{a}</strong><small>{b}</small></span><ArrowRight size={20} className="rec-link__arrow"/><ChevronRight size={20} className="rec-link__chev"/></StaggerItem>)}</Stagger>
  </div></section>;
}

const footerNav = ["Услуги","Курсове","Проекти","Контакти","За нас","Кариери"];
const footerLegal = ["Политика","","Общи условия","Легално","","Карта"];

export function Footer() {
  return <footer className="footer"><div className="shell footer__inner">
    <div className="footer__nav">{footerNav.map(t=><a href="#" key={t}>{t}</a>)}</div>
    <img className="footer-logo" src="/assets/benext-mark.png" alt="BeNeXt"/>
    <div className="footer__legal">{footerLegal.map((t,i)=>t?<a href="#" key={t}>{t}</a>:<span key={i}/>)}</div>
  </div></footer>;
}

export function PageEnd({cta=true}:{cta?:boolean}) { return <>{cta&&<BigCTA/>}<RecommendationPanel/><Footer/></> }

export const serviceTop = [
  {icon:Monitor,title:"Front end разработка",text:"Създаваме интерактивни и динамични потребителски интерфейси, използвайки най-новите технологии. Всеки проект е оптимизиран за скорост и производителност."},
  {icon:Code2,title:"Back-end разработка",text:"Разработваме стабилни и сигурни сървърни решения, които поддържат вашите уеб приложения. Използваме надеждни технологии за гарантира��а маща��ируемост."},
  {icon:Workflow,title:"Анализ на данни",text:"Анализираме данните, за да разберем какво работи, къде се губят ресурси и кои са най-добрите възможности за растеж."}
] as const;

export function CheckItem({children,checked=false}:{children:React.ReactNode;checked?:boolean}){return <li>{checked?<CircleCheck size={20}/>:<Circle size={20}/>}<span>{children}</span></li>}
export function ContactFacts(){return <div className="contact-facts"><div><span><MapPin/></span><a>Княз Борис 1 127, София</a></div><div><span><Phone/></span><a>+359 888 82 634</a></div><div><span><AtSign/></span><a>benextbg@gmail.com</a></div></div>}

export function Process(){
 const data=[[Route,"1. Откриване","Опознаваме вашия бизнес, цели и предизвикателства. Така можем да пред��ожим решение, което е съобразено с реалните ви нужди."],[BarChart3,"2. Дефиниране","Създаваме ясна стратегия и план за правилното решение."],[Lightbulb,"3. Разработка","Проектираме, разработваме и интегрираме всичко необходимо: от дизайна и уеб платформата до ecommerce, SEO, реклами, счетоводни, ТРЗ и логистични системи."],[Play,"4. Старт","Следим представянето, отстраняваме евентуални проблеми и при необходимост оптимизираме системата, за да продължава да носи стойност за бизнеса Ви."] ] as const;
 return <section className="process"><div className="shell process__shell"><Reveal as="h2" className="section-title centered">Нашият процес</Reveal><Stagger amount={0.2} gap={0.12}>{data.map(([Icon,t,p],i)=><StaggerItem className={`process-row ${i%2?"right":"left"}`} key={t}><div className="process-icon"><Icon/></div><div className="process-copy"><h3>{t}</h3><p>{p}</p>{i<3&&<div className="process-dots">•••</div>}</div></StaggerItem>)}</Stagger></div></section>
}
