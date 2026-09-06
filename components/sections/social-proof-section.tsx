"use client";

const testimonials = [
  {
    id: 1,
    quote:
      "Encomendamos kits de boas-vindas para mais de 200 novos colaboradores. A Majestade entregou no prazo, com qualidade excelente e a arte ficou perfeita. Recomendo sem hesitar.",
    author: "Gestora de RH",
    company: "Empresa do setor industrial — Serra Gaúcha",
    segment: "Kit Onboarding",
  },
  {
    id: 2,
    quote:
      "Precisávamos de brindes para um evento corporativo em 12 dias úteis. Achei que não daria — a Majestade entregou no prazo e ainda mandou mockup antes de produzir. Voltamos a comprar.",
    author: "Coordenador de Marketing",
    company: "Empresa de tecnologia — Porto Alegre, RS",
    segment: "Brindes para evento",
  },
  {
    id: 3,
    quote:
      "Trabalho com compras de brindes há 8 anos e a Majestade é um dos poucos fornecedores que tem produção própria de verdade. A consistência de qualidade lote a lote faz toda a diferença.",
    author: "Comprador Corporativo",
    company: "Grupo varejista — Sul do Brasil",
    segment: "Pedidos recorrentes",
  },
];

const metrics = [
  { value: "15+", label: "anos de mercado" },
  { value: "10", label: "colaboradores próprios" },
  { value: "100%", label: "produção interna" },
  { value: "BR", label: "entregamos em todo o Brasil" },
];

export function SocialProofSection() {
  return (
    <section className="bg-secondary">
      <div className="border-b border-border px-6 py-12 md:px-12 lg:px-20">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {m.value}
              </dt>
              <dd className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            O que dizem nossos clientes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Empresas de todo o Brasil que confiam na Majestade para seus brindes corporativos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6"
            >
              <span className="block text-4xl leading-none text-accent select-none" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground -mt-4">
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
                <span className="mt-2 inline-block rounded-full border border-accent/30 px-2.5 py-0.5 text-xs text-accent">
                  {t.segment}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
