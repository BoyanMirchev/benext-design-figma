import { Header, Button, ProjectCard, projects, PageEnd } from "./site";
import { Reveal, Stagger, StaggerItem } from "./motion";

type Detail = {
  name:string; image:string; intro:string;
  about:string; task:string; visual:string; extraTitle?:string; extra?:string; result:string;
};

export function ProjectDetail({d}:{d:Detail}){
  return <main className="detail-page"><Header overlay/><div className="detail-hero" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${d.image})`}}><div className="shell detail-hero__content"><h1>{d.name}</h1><p>{d.intro}</p><Button href="#">Към уебсайта</Button></div></div>
  <DetailRow title="За компанията" text={d.about} image={d.image}/>
  <DetailGalleryText title="Нашата задача" text={d.task} image={d.image} flip/>
  <section className="tech-mini"><Reveal as="h2">Използвани технологии</Reveal><Stagger as="div" gap={0.05} amount={0.4}>{Array.from({length:7}).map((_,i)=><StaggerItem as="span" key={i}/>)}</Stagger></section>
  <DetailGalleryText title="Визуална концепция" text={d.visual} image={d.image}/>
  {d.extra&&<DetailGalleryText title={d.extraTitle||"Административен панел"} text={d.extra} image={d.image} flip/>}
  <section className="result-strip"><Reveal y={24}><h2>Резултатът</h2><p>{d.result}</p></Reveal></section>
  <section className="delivered"><Reveal as="h2">В рамките на проекта реализирахме:</Reveal><Stagger as="div" gap={0.05} amount={0.3}>{["Web design","UX/UI Design","Responsive дизайн","Интерактивни елементи","Микроанимации","Front-end разработка","Back-end разработка","Уеб достъпност"].map(x=><StaggerItem as="span" key={x}>✓ {x}</StaggerItem>)}</Stagger></section>
  <section className="more-projects"><Reveal as="h2">Още от нашите проекти</Reveal><Stagger className="more-projects__rail" gap={0.08}>{projects.map(p=><StaggerItem className="more-projects__cell" key={p.slug}><ProjectCard compact project={p}/></StaggerItem>)}</Stagger></section>
  <PageEnd/>
  </main>
}
function DetailRow({title,text,image}:{title:string;text:string;image:string}){return <Reveal as="section" className="detail-row shell"><div><h2>{title}</h2><p>{text}</p></div><img src={image} alt=""/></Reveal>}
function DetailGalleryText({title,text,image,flip=false}:{title:string;text:string;image:string;flip?:boolean}){return <Reveal as="section" className={`detail-gallery shell ${flip?"flip":""}`}><div className="detail-gallery__images">{[1,2,3].map(i=><img src={image} alt="" key={i}/>)}</div><div className="detail-gallery__copy"><h2>{title}</h2><p>{text}</p></div></Reveal>}
