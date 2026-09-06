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
      <CatalogSection
        title="Nossos produtos"
        description="Navegue pelas linhas, clique no produto que interessar e fale conosco no WhatsApp para orçamento ou mais detalhes."
      />
    </PageShell>
  );
}
