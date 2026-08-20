import { AGENCY } from "@/lib/agency";
import { WHATSAPP_URL } from "@/lib/contact";

export const navLinks = [
  { href: "/#produtos", label: "Produtos" },
  { href: "/empresa#historia", label: "Nossa História" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/empresa#sobre", label: "Sobre" },
] as const;

export const footerLinks = {
  navegacao: [
    { label: "Produtos", href: "/#produtos" },
    { label: "Nossa História", href: "/empresa#historia" },
    { label: "Diferenciais", href: "/#diferenciais" },
    { label: "Portfólio", href: "/portfolio" },
  ],
  empresa: [
    { label: "Sobre nós", href: "/empresa#sobre" },
    { label: "Aplicações", href: "/empresa#aplicacoes" },
    { label: "WhatsApp", href: WHATSAPP_URL },
    { label: "Desenvolvimento — The Monkeys", href: AGENCY.website },
  ],
  atendimento: [
    { label: "Montenegro, RS", href: "/#contato" },
    { label: "Atendimento B2B", href: "/#contato" },
    { label: "Produção sob demanda", href: "/#produtos" },
  ],
} as const;
