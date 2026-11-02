import { WHATSAPP_URL } from "@/lib/contact";

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/empresa", label: "Empresa" },
] as const;

export const footerLinks = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Empresa", href: "/empresa" },
  ],
  empresa: [
    { label: "Nossa História", href: "/empresa#historia" },
    { label: "Sobre nós", href: "/empresa#sobre" },
    { label: "WhatsApp", href: WHATSAPP_URL },
  ],
  atendimento: [
    { label: "Montenegro, RS", href: "/empresa" },
    { label: "Orçamento no WhatsApp", href: WHATSAPP_URL },
    { label: "Catálogo de produtos", href: "/produtos" },
  ],
} as const;
