import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CatalogPagesSection } from "@/components/sections/catalog-pages-section";

export const metadata: Metadata = {
  title: "Catálogo Oficial | Majestade Personalizados",
  description:
    "Veja as páginas do catálogo oficial da Majestade Personalizados — linhas, referências e opções de personalização.",
};

export default function CatalogoPage() {
  return (
    <PageShell>
      <CatalogPagesSection />
    </PageShell>
  );
}
