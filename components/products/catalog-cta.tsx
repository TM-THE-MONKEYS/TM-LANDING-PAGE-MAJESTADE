import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { buildWhatsAppUrl } from "@/lib/contact";

type CatalogCtaProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  whatsappMessage?: string;
};

export function CatalogCta({
  title = "Não encontrou o que precisa?",
  description = "Conte o que sua empresa precisa — montamos a proposta sob medida e respondemos pelo WhatsApp.",
  ctaLabel = "Falar no WhatsApp",
  whatsappMessage = "Olá! Gostaria de um orçamento de brindes personalizados.",
}: CatalogCtaProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <div className="border-t border-border px-6 py-16 text-center md:px-12 md:py-20 lg:px-20">
      <h2 className="mx-auto max-w-xl text-2xl font-medium tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
        {description}
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <WhatsAppIcon className="size-4" />
        {ctaLabel}
      </a>
    </div>
  );
}
