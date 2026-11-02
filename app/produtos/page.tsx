import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CatalogSection } from "@/components/sections/catalog-section";

export const metadata: Metadata = {
  title: "Produtos | Majestade Personalizados",
  description:
    "Catálogo de brindes corporativos com produção própria: squeezes, canecas, kits, cuia, chaveiros, uniformes e vestuário. Busque por nome ou referência e peça orçamento no WhatsApp.",
};

export default function ProdutosPage() {
  return (
    <PageShell>
      <CatalogSection
        title="Catálogo"
        description="Linhas com produção própria. Abra o produto, anote a referência e peça o orçamento no WhatsApp."
      />
    </PageShell>
  );
}
