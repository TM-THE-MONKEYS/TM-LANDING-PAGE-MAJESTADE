import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { CompanyNumbersSection } from "@/components/sections/company-numbers-section";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "Empresa | Majestade Personalizados",
  description:
    "15 anos de fábrica própria em Montenegro (RS): da oficina no porão à estrutura atual de brindes corporativos personalizados.",
};

export default function EmpresaPage() {
  return (
    <PageShell>
      <PhilosophySection />
      <CompanyNumbersSection />
      <AboutSection showVideo />
    </PageShell>
  );
}
