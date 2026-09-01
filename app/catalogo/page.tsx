import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CatalogPagesSection } from "@/components/sections/catalog-pages-section";

export const metadata: Metadata = {
  title: "Catálogo Completo | Majestade Personalizados",
  description:
    "Folheie o catálogo completo da Majestade Personalizados — todas as linhas de brindes corporativos, uniformes e produtos personalizados em um só lugar.",
};

export default function CatalogoPage() {
  return (
    <PageShell>
      <CatalogPagesSection />
    </PageShell>
  );
}
