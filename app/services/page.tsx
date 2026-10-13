import { Header, PageEnd } from "@/components/site";
import { HostingHero } from "@/components/hosting-hero";
import { HostingSections } from "@/components/hosting-sections";

export default function ServicesPage() {
  return (
    <main>
      <Header overlay />
      <HostingHero />
      <HostingSections />
      <PageEnd cta={false} />
    </main>
  );
}
