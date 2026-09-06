"use client";

import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WHATSAPP_URL } from "@/lib/contact";

const specs = [
  { label: "Anos de mercado", value: "15+" },
  { label: "Colaboradores", value: "10" },
  { label: "Localização", value: "Montenegro, RS" },
  { label: "Produção", value: "Própria" },
];

export function EditorialSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-background">
      <div id="contato" className="px-6 py-16 text-center md:px-12 md:py-20 lg:px-20">
        <h2 className="mx-auto max-w-2xl text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Pronto para colocar a marca da sua empresa na mão de quem importa?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
          Peça uma proposta sem compromisso. Atendemos empresas de todos os portes, 
          de pedidos pontuais a contratos recorrentes de brindes corporativos.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-4" />
          Falar no WhatsApp
        </a>
      </div>

      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-sm text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-3xl md:text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1-cNBCz5fomcLRmm1cTXSBOKCq10VP91.mp4"
          />
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center text-white text-xl font-medium md:text-3xl px-6">
              Fabricação própria. Qualidade garantida. Atendimento corporativo.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
