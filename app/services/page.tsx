import { Header, serviceTop, Clients, Button, CheckItem, PageEnd } from "@/components/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function ServicesPage(){return <main>
  <div className="services-hero-wrap"><Header overlay/><section className="services-hero"><div className="shell services-hero__inner">
    <h1>От идея до завършен продукт,<br/>ние сме тук да Ви съдействаме</h1>
    <p>Няма твърде голям или твърде малък клиент или задача. Ако искате да развиете бранда си, сте<br/>на правилното място. Поемаме всичко от творчески проекти без програмиране, без забавяния и при<br/>най-малък екип.</p>
    <Stagger className="service-top-card" gap={0.1} delay={0.35}>{serviceTop.map(({icon:Icon,title,text})=><StaggerItem key={title}><div className="blue-circle"><Icon/></div><h3>{title}</h3><p>{text}</p></StaggerItem>)}</Stagger>
  </div></section></div>
  <section className="build-section section-shadow"><div className="shell"><Reveal as="h2" className="section-title centered">Какво можем да направим за Вас</Reveal><Stagger className="build-grid" gap={0.1}>
    <Build img="/assets/admin-panel.jpg" title="Админ Панели" text="Мощни административни интерфейси за управление на категории, продукти и съдържание."/>
    <Build img="/assets/education.jpg" title="Образователни Платформи" text="Образователни уебсайтове и платформи с интерактивни функции, анимации и богато съдържание."/>
    <Build img="/assets/ecommerce.jpg" title="Електронни Магазини" text="Пълно функционални онлайн магазини с интегрирани платежни системи, управление на продукти и поръчки."/>
  </Stagger></div></section>
  <section className="idea-section section-shadow"><Reveal className="shell"><h2 className="section-title">Имате идея за Вашия уебсайт?</h2><p>Просто ни пишете или се обадете. Ще се радваме да научим<br/>повече за Вашите цели, и да Ви предложим идеи за<br/>реализацията им, както и подходяща цена.</p><Button href="/contacts">Свържете се с нас</Button></Reveal></section>
  <section className="compare"><div className="shell"><Reveal as="h2" className="section-title centered">Сравнете възможностите</Reveal><div className="compare-tabs"><strong>Уеб дизайн</strong><span>eCommerce</span><span>Бизнес и<br/>Счетоводство</span><span>Реклами и<br/>Оптимизация</span></div>
    <div className="compare-columns"><ul><CheckItem checked>Безплатна консултация</CheckItem><CheckItem checked>Модерен дизайн</CheckItem><CheckItem checked>Отзивчив дизайн</CheckItem><CheckItem checked>Бранд идентичност</CheckItem><CheckItem checked>Админ Панели</CheckItem></ul><ul><CheckItem checked>Интеграция на системи<br/>(e.g. Google Maps)</CheckItem><CheckItem>Ecommerce Интеграция</CheckItem><CheckItem>Управление на<br/>продуктови категории</CheckItem><CheckItem>SEO оптимизация</CheckItem><CheckItem>Системи за Снабдяване</CheckItem></ul><ul><CheckItem>ТРЗ системи</CheckItem><CheckItem>CMS интеграция</CheckItem><CheckItem>Счетоводни системи</CheckItem><CheckItem>Управление на реклами</CheckItem><CheckItem>Управление на Google<br/>ads, Meta ads, т.н.</CheckItem></ul></div>
  </div></section>
  <Clients/><PageEnd/>
</main>}
function Build({img,title,text}:{img:string;title:string;text:string}){return <StaggerItem as="article" className="build-card"><img src={img} alt=""/><h3>{title}</h3><p>{text}</p></StaggerItem>}
