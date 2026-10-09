import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento no WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
