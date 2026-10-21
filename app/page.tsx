import { PageShell } from "@/components/page-shell";
import { HeroSection } from "@/components/sections/hero-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <TechnologySection />
      <EditorialSection compact />
      <SocialProofSection />
      <FaqSection />
    </PageShell>
  );
}
