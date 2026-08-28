import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento no WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20BD5A] md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">Solicitar orçamento</span>
    </a>
  );
}
