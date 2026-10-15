import Image from "next/image";

const chapters = [
  {
    title: "O começo",
    caption: "No porão da casa do fundador, em Montenegro (RS).",
    src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
    alt: "Início da produção artesanal de brindes",
  },
  {
    title: "Hoje",
    caption: "Estrutura própria de produção, também em Montenegro (RS).",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200",
    alt: "Estrutura própria da Majestade Personalizados em Montenegro, RS",
  },
];

export function PhilosophySection() {
  return (
    <section id="historia" className="bg-background">
      <div className="bg-brand-ink text-white">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-32 text-center md:px-12 md:pb-24 md:pt-40">
          <span aria-hidden className="mx-auto mb-6 block h-0.5 w-12 bg-brand-gold" />
          <h1 className="text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            Nossa história.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            De um porão em Montenegro (RS) a uma fábrica com estrutura própria,
            há mais de 15 anos fortalecendo a marca de empresas.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-6">
          {chapters.map((chapter) => (
            <figure key={chapter.title} className="text-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={chapter.src}
                  alt={chapter.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="mt-4 border-t border-brand-gold pt-3">
                <p className="text-base font-medium text-foreground">{chapter.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{chapter.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed text-foreground md:mt-20 md:text-2xl md:leading-relaxed">
          Tudo começou no porão da casa do fundador. Com trabalho constante, a
          Majestade cresceu: hoje temos estrutura própria, equipe dedicada e
          clientes em todo o Brasil.
        </p>
      </div>
    </section>
  );
}
