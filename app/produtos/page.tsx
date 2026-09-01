import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CatalogSection } from "@/components/sections/catalog-section";

export const metadata: Metadata = {
  title: "Produtos | Majestade Personalizados",
  description:
    "Conheça as linhas de brindes corporativos personalizados da Majestade — canecas térmicas, squeezes, kit vinho, cuia e bomba, uniformes, vestuário e muito mais.",
};

export default function ProdutosPage() {
  return (
    <PageShell>
      <CatalogSection />
    </PageShell>
  );
}
