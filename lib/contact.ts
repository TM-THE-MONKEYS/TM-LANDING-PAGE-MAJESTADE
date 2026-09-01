export const PHONE_NUMBER = "5551995451992";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl(
  "Olá! Gostaria de solicitar um orçamento."
);

export const INSTAGRAM_URL = "https://www.instagram.com/majestadepersonalizados/";
export const INSTAGRAM_HANDLE = "@majestadepersonalizados";
export const EMAIL_CONTACT = "personalizadosmajestade@gmail.com";
export const PHONE_DISPLAY = "(51) 99545-1992";
export const PHONE_E164 = "+5551995451992";
