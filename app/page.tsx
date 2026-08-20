import { PageShell } from "@/components/page-shell";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { EditorialSection } from "@/components/sections/editorial-section";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <FeaturedProductsSection limit={4} />
      <TechnologySection />
      <EditorialSection compact />
    </PageShell>
  );
}
