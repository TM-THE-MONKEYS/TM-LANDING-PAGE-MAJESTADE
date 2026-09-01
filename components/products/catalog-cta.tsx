import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { buildWhatsAppUrl } from "@/lib/contact";

const CATALOG_WHATSAPP_URL = buildWhatsAppUrl(
  "Olá! Gostaria de receber o catálogo completo da Majestade Personalizados."
);

type CatalogCtaProps = {
  title?: string;
};

export function CatalogCta({
  title = "Não encontrou o que precisa?",
}: CatalogCtaProps) {
  return (
    <div className="border-t border-border px-6 py-16 text-center md:px-12 md:py-20 lg:px-20">
      <p className="text-xs uppercase tracking-widest text-accent">Atendimento B2B</p>
      <h2 className="mx-auto mt-2 max-w-xl text-2xl font-medium tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
        Receba o catálogo completo em PDF com todas as linhas, referências e opções de
        personalização — direto no WhatsApp.
      </p>
      <a
        href={CATALOG_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon className="size-4" />
        Solicitar catálogo no WhatsApp
      </a>
    </div>
  );
}
