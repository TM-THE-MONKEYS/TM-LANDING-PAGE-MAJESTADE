import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { GallerySection } from "@/components/sections/gallery-section";

export const metadata: Metadata = {
  title: "Portfólio | Majestade Personalizados",
  description:
    "Trabalhos realizados em brindes corporativos personalizados — canecas, kits, squeezes e produtos sob medida para empresas.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <GallerySection />
    </PageShell>
  );
}
