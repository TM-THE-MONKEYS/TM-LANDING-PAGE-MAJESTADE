import { WHATSAPP_URL } from "@/lib/contact";

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/empresa", label: "Empresa" },
] as const;

export const footerLinks = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Empresa", href: "/empresa" },
  ],
  empresa: [
    { label: "Nossa História", href: "/empresa#historia" },
    { label: "Sobre nós", href: "/empresa#sobre" },
    { label: "WhatsApp", href: WHATSAPP_URL },
  ],
  atendimento: [
    { label: "Montenegro, RS", href: "/empresa" },
    { label: "Atendimento B2B", href: WHATSAPP_URL },
    { label: "Produção sob demanda", href: "/produtos" },
  ],
} as const;
