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
      "A quantidade mínima varia por produto e técnica de personalização. Em geral, trabalhamos a partir de 12 unidades para itens com silk-screen ou bordado, e a partir de 1 unidade para gravação a laser. Para volumes maiores, conseguimos condições especiais de preço e prazo — entre em contato e informe o volume estimado.",
  },
  {
    id: "prazo",
    question: "Qual é o prazo médio de produção?",
    answer:
      "Após a aprovação da arte-final e confirmação do pedido, o prazo padrão é de 10 a 20 dias úteis, dependendo do produto e da quantidade. Pedidos urgentes podem ser negociados — informe a data limite ao solicitar o orçamento e verificamos a viabilidade.",
  },
  {
    id: "arte",
    question: "Como funciona a arte-final e o mockup?",
    answer:
      "Antes de qualquer produção, enviamos um mockup digital do produto com a sua arte aplicada para aprovação. Só iniciamos a produção após a confirmação por escrito. Caso necessite, nosso time pode adaptar arquivos fornecidos ou criar a arte do zero sem custo adicional no orçamento.",
  },
  {
    id: "frete",
    question: "Vocês entregam em todo o Brasil?",
    answer:
      "Sim. Entregamos em todo o território nacional via transportadora ou Correios, conforme o volume e o destino. O frete é calculado no orçamento e pode ser incluso ou cobrado à parte, dependendo do acordo comercial. Para grandes volumes, trabalhamos com fretes negociados.",
  },
  {
    id: "pagamento",
    question: "Quais são as formas de pagamento aceitas?",
    answer:
      "Aceitamos PIX, boleto bancário e transferência. Para empresas com CNPJ ativo, também trabalhamos com faturamento (prazo de pagamento), mediante análise de crédito. Informe a necessidade na hora do orçamento.",
  },
  {
    id: "nf",
    question: "Vocês emitem nota fiscal?",
    answer:
      "Sim, emitimos nota fiscal para todas as vendas, tanto para pessoas jurídicas quanto físicas. Trabalhamos com NFe (nota fiscal eletrônica), o que facilita o processo de pagamento corporativo e prestação de contas.",
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
            Respondemos as dúvidas mais comuns de quem está avaliando fornecedores de brindes corporativos.
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
            Não encontrou o que procurava?{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Fale direto no WhatsApp
            </a>{" "}
            — respondemos em até 2h úteis.
          </p>
        </div>
      </div>
    </section>
  );
}
