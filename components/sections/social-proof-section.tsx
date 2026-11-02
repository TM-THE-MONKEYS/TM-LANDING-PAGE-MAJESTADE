"use client";

import { companyMetrics } from "@/lib/company";
import { WHATSAPP_URL } from "@/lib/contact";

/**
 * Trechos curtos e anônimos — a empresa tem poucas avaliações no Google.
 * Sem nomes completos, cidades ou histórias inventadas.
 */
const reviews = [
  {
    id: 1,
    quote:
      "Bom atendimento e personalização bem feita. Pedido chegou como combinado.",
    source: "Avaliação no Google",
  },
  {
    id: 2,
    quote:
      "Produção própria faz diferença no acabamento. Voltamos a comprar.",
    source: "Avaliação no Google",
  },
];

export function SocialProofSection() {
  return (
    <section className="bg-secondary">
      <div className="border-b border-border px-6 py-12 md:px-12 lg:px-20">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {companyMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <dt className="text-4xl font-semibold tracking-tight text-brand-navy md:text-5xl">
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
            Avaliações no Google
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Poucas, mas reais — quem já comprou costuma destacar atendimento e
            acabamento da personalização.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="flex flex-col gap-4 rounded-2xl border border-brand-stone/20 bg-white/55 px-6 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] backdrop-blur-md"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs text-muted-foreground">
                {r.source}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-sm text-muted-foreground">
          Quer validar com a sua demanda?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-navy underline-offset-4 hover:underline"
          >
            Peça um orçamento no WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
