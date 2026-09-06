import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "Nossa História | Majestade Personalizados",
  description:
    "Conheça a trajetória da Majestade Personalizados — mais de 15 anos fabricando brindes corporativos com estrutura própria em Montenegro, RS.",
};

export default function EmpresaPage() {
  return (
    <PageShell>
      <PhilosophySection />
      <AboutSection showVideo />
    </PageShell>
  );
}
