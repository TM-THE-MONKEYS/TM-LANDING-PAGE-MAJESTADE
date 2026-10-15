import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/contact";

export function AboutSection({ showVideo = false }: { showVideo?: boolean }) {
  return (
    <section id="sobre" className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-12 md:py-24 lg:px-20">
        <span aria-hidden className="mx-auto mb-6 block h-0.5 w-12 bg-brand-gold" />
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Sobre nós
        </h2>
        <p className="mt-8 text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
          A Majestade Personalizados é uma fábrica gaúcha de brindes corporativos, com mais
          de 15 anos de experiência. Sabemos o que o mercado B2B exige: prazo, volume e
          consistência na personalização, do primeiro pedido de teste ao contrato recorrente.
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Somos referência em personalização corporativa em Montenegro (RS) e região.
          Em cada peça vai a identidade da sua empresa e o mesmo cuidado de sempre.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild variant="brand" size="cta">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </Button>
          <Link
            href="/produtos"
            className="rounded-sm text-sm font-medium text-brand-navy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Ver produtos
          </Link>
        </div>
      </div>

      {showVideo ? (
        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcdafadc-cb7e-4cb7-9cbf-edcbaf2360a5_1-cNBCz5fomcLRmm1cTXSBOKCq10VP91.mp4"
          />
          <div className="absolute inset-0 bg-brand-ink/55" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="px-6 text-center text-xl font-medium text-white md:text-3xl">
              Fabricação própria. Qualidade garantida. Atendimento corporativo.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2000"
            alt="Produção e fabricação de brindes corporativos Majestade Personalizados"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
