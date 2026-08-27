import { Header, Button, ProjectCard, projects, PageEnd } from "./site";

type Detail = {
  name:string; image:string; intro:string;
  about:string; task:string; visual:string; extraTitle?:string; extra?:string; result:string;
};

export function ProjectDetail({d}:{d:Detail}){
  return <main className="detail-page"><div className="detail-hero" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${d.image})`}}><Header overlay/><div className="shell detail-hero__content"><h1>{d.name}</h1><p>{d.intro}</p><Button href="#">Към уебсайта</Button></div></div>
  <DetailRow title="За компанията" text={d.about} image={d.image}/>
  <DetailGalleryText title="Нашата задача" text={d.task} image={d.image} flip/>
  <section className="tech-mini"><h2>Използвани технологии</h2><div>{Array.from({length:7}).map((_,i)=><span key={i}/>)}</div></section>
  <DetailGalleryText title="Визуална концепция" text={d.visual} image={d.image}/>
  {d.extra&&<DetailGalleryText title={d.extraTitle||"Административен панел"} text={d.extra} image={d.image} flip/>}
  <section className="result-strip"><div><h2>Резултатът</h2><p>{d.result}</p></div></section>
  <section className="delivered"><h2>В рамките на проекта реализирахме:</h2><div>{["Web design","UX/UI Design","Responsive дизайн","Интерактивни елементи","Микроанимации","Front-end разработка","Back-end разработка","Уеб достъпност"].map(x=><span key={x}>✓ {x}</span>)}</div></section>
  <section className="more-projects"><h2>Още от нашите проекти</h2><div className="more-projects__rail">{projects.map(p=><ProjectCard key={p.slug} compact project={p}/>)}</div></section>
  <PageEnd/>
  </main>
}
function DetailRow({title,text,image}:{title:string;text:string;image:string}){return <section className="detail-row shell"><div><h2>{title}</h2><p>{text}</p></div><img src={image} alt=""/></section>}
function DetailGalleryText({title,text,image,flip=false}:{title:string;text:string;image:string;flip?:boolean}){return <section className={`detail-gallery shell ${flip?"flip":""}`}><div className="detail-gallery__images">{[1,2,3].map(i=><img src={image} alt="" key={i}/>)}</div><div className="detail-gallery__copy"><h2>{title}</h2><p>{text}</p></div></section>}
