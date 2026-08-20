import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "Empresa | Majestade Personalizados",
  description:
    "Conheça a história, aplicações e o time por trás da Majestade Personalizados — mais de 15 anos fabricando brindes corporativos em Montenegro, RS.",
};

export default function EmpresaPage() {
  return (
    <PageShell>
      <PhilosophySection />
      <CollectionSection />
      <TestimonialsSection showVideo />
    </PageShell>
  );
}
