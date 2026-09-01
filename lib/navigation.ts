import { WHATSAPP_URL } from "@/lib/contact";

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/empresa#historia", label: "Nossa História" },
  { href: "/empresa#sobre", label: "Sobre" },
] as const;

export const footerLinks = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/produtos" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Nossa História", href: "/empresa#historia" },
  ],
  empresa: [
    { label: "Sobre nós", href: "/empresa#sobre" },
    { label: "Aplicações", href: "/empresa#aplicacoes" },
    { label: "WhatsApp", href: WHATSAPP_URL },
  ],
  atendimento: [
    { label: "Montenegro, RS", href: "/#contato" },
    { label: "Atendimento B2B", href: "/#contato" },
    { label: "Produção sob demanda", href: "/#produtos" },
  ],
} as const;
