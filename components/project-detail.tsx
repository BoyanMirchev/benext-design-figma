import { Header, Button, ProjectCard, projects, PageEnd } from "./site";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { Database } from "lucide-react";

type Detail = {
  name:string; image:string; intro:string;
  about:string; task:string; visual:string; extraTitle?:string; extra?:string; result:string;
  hero?:string; shots?:string[];
};

const TECH:{name:string;src?:string}[] = [
  {name:"Next.js",src:"/assets/tech/nextjs.svg"},
  {name:"React",src:"/assets/tech/react.svg"},
  {name:"TypeScript",src:"/assets/tech/typescript.svg"},
  {name:"Tailwind CSS",src:"/assets/tech/tailwind.svg"},
  {name:"PostgreSQL",src:"/assets/tech/postgresql.svg"},
  {name:"Neon",src:"/assets/tech/neon.svg"},
  {name:"SQL"},
  {name:"Blob",src:"/assets/tech/blob.svg"},
];

export function ProjectDetail({d}:{d:Detail}){
  const shots = d.shots && d.shots.length ? d.shots : [d.image];
  const at = (i:number) => shots[i % shots.length];
  const trio = (start:number) => [0,1,2].map(k => at(start+k));
  return <main className="detail-page"><Header overlay/><div className="detail-hero" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${d.hero||d.image})`}}><div className="shell detail-hero__content"><h1>{d.name}</h1><p>{d.intro}</p><Button href="#">Към уебсайта</Button></div></div>
  <DetailRow title="За компанията" text={d.about} image={at(0)}/>
  <DetailGalleryText title="Нашата задача" text={d.task} images={trio(1)} flip/>
  <section className="tech-mini"><Reveal as="h2">Използвани технологии</Reveal><Stagger as="div" gap={0.05} amount={0.4}>{TECH.map(t=><StaggerItem as="span" className="tech-chip" key={t.name}>{t.src?<img src={t.src||"/placeholder.svg"} alt={t.name}/>:<Database aria-hidden strokeWidth={1.5}/>}<em>{t.name}</em></StaggerItem>)}</Stagger></section>
  <DetailGalleryText title="Визуална концепция" text={d.visual} images={trio(4)}/>
  {d.extra&&<DetailGalleryText title={d.extraTitle||"Административен панел"} text={d.extra} images={trio(7)} flip/>}
  <section className="result-strip"><Reveal y={24}><h2>Резултатът</h2><p>{d.result}</p></Reveal></section>
  <section className="delivered"><Reveal as="h2">В рамките на проекта реализирахме:</Reveal><Stagger as="div" gap={0.05} amount={0.3}>{["Web design","UX/UI Design","Responsive дизайн","Интерактивни елементи","Микроанимации","Front-end разработка","Back-end разработка","Уеб достъпност"].map(x=><StaggerItem as="span" key={x}>✓ {x}</StaggerItem>)}</Stagger></section>
  <section className="more-projects"><Reveal as="h2">Още от нашите проекти</Reveal><Stagger className="more-projects__rail" gap={0.08}>{projects.map(p=><StaggerItem className="more-projects__cell" key={p.slug}><ProjectCard compact project={p}/></StaggerItem>)}</Stagger></section>
  <PageEnd/>
  </main>
}
function DetailRow({title,text,image}:{title:string;text:string;image:string}){return <Reveal as="section" className="detail-row shell"><div><h2>{title}</h2><p>{text}</p></div><img src={image} alt=""/></Reveal>}
function DetailGalleryText({title,text,images,flip=false}:{title:string;text:string;images:string[];flip?:boolean}){return <Reveal as="section" className={`detail-gallery shell ${flip?"flip":""}`}><div className="detail-gallery__images">{images.map((src,i)=><img src={src||"/placeholder.svg"} alt="" key={i}/>)}</div><div className="detail-gallery__copy"><h2>{title}</h2><p>{text}</p></div></Reveal>}
