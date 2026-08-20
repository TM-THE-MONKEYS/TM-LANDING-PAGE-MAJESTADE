"use client";

import Link from "next/link";

const footerLinks = {
  navegacao: [
    { label: "Produtos", href: "#produtos" },
    { label: "Nossa História", href: "#historia" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Portfólio", href: "#portfolio" },
  ],
  empresa: [
    { label: "Sobre nós", href: "#sobre" },
    { label: "Aplicações", href: "#aplicacoes" },
    { label: "Solicitar orçamento", href: "#contato" },
  ],
  atendimento: [
    { label: "Montenegro, RS", href: "#contato" },
    { label: "Atendimento B2B", href: "#contato" },
    { label: "Produção sob demanda", href: "#produtos" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-lg font-semibold text-foreground">
              MAJESTADE
            </Link>
            <p className="mt-1 text-sm text-accent">Personalizados</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Fabricação de brindes corporativos personalizados. Mais de 15 anos 
              fortalecendo marcas de empresas em Montenegro, RS e em todo o Brasil.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Navegação</h4>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Atendimento</h4>
            <ul className="space-y-3">
              {footerLinks.atendimento.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Majestade Personalizados. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
