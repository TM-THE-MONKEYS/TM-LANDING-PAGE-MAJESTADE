import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CatalogSection } from "@/components/sections/catalog-section";

export const metadata: Metadata = {
  title: "Catálogo | Majestade Personalizados",
  description:
    "Catálogo completo de brindes corporativos personalizados — canecas térmicas, squeezes, kit vinho, cuia e bomba, uniformes, vestuário e muito mais.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <CatalogSection />
    </PageShell>
  );
}
