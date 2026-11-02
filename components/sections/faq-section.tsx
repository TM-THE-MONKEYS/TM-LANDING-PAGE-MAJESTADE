"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_URL } from "@/lib/contact";

const faqs = [
  {
    id: "moq",
    question: "Qual é a quantidade mínima de pedido?",
    answer:
      "A quantidade mínima depende do produto e da técnica de personalização. Em geral, trabalhamos a partir de 12 unidades em silk-screen ou bordado, e a partir de 1 unidade em gravação a laser. No orçamento confirmamos o mínimo da peça que você precisa.",
  },
  {
    id: "prazo",
    question: "Qual é o prazo médio de produção?",
    answer:
      "Depois da arte-final aprovada e do pedido confirmado, o prazo costuma ficar entre 10 e 20 dias úteis, conforme produto e volume. Se houver data limite, informe no WhatsApp para avaliarmos a viabilidade.",
  },
  {
    id: "arte",
    question: "Como funciona a arte-final e o mockup?",
    answer:
      "Antes de produzir, enviamos um mockup digital com a arte aplicada para sua aprovação. A produção só começa após a confirmação. Se precisar ajustar arquivos, nosso time orienta o que é necessário para a técnica escolhida.",
  },
  {
    id: "frete",
    question: "Vocês entregam em todo o Brasil?",
    answer:
      "Sim. Enviamos para todo o Brasil por transportadora ou Correios, conforme volume e destino. O frete entra no orçamento — incluso ou à parte, conforme o acordo comercial.",
  },
  {
    id: "pagamento",
    question: "Quais são as formas de pagamento?",
    answer:
      "Trabalhamos com PIX, boleto e transferência. Para empresas com CNPJ, faturamento pode ser avaliado caso a caso. Informe a preferência ao pedir o orçamento.",
  },
  {
    id: "nf",
    question: "Vocês emitem nota fiscal?",
    answer:
      "Sim. Emitimos NFe para pessoa jurídica e física, o que facilita o pagamento corporativo e a prestação de contas.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-background px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Respostas diretas sobre pedido mínimo, prazo, arte e entrega —
            o que costuma surgir no primeiro contato B2B.
          </p>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline hover:text-foreground/80 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl bg-secondary px-6 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Ainda tem dúvida?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-navy underline-offset-4 hover:underline"
            >
              Fale no WhatsApp
            </a>{" "}
            — respondemos em horário comercial.
          </p>
        </div>
      </div>
    </section>
  );
}
