# Majestade Personalizados — Landing Page

Landing page institucional para a **Majestade Personalizados**, empresa gaúcha especializada em brindes corporativos personalizados. O projeto apresenta a história, produtos, diferenciais e portfólio da marca com animações scroll-driven e layout editorial de alta qualidade.

> Template de landing page desenvolvido com Next.js, pensado para empresas B2B que precisam de presença digital profissional com foco em conversão (orçamentos e contato).

---

## Visão geral

A página é composta por seções modulares que contam a jornada da Majestade — dos 15+ anos de mercado à fabricação própria em Montenegro, RS. O design prioriza tipografia impactante, transições suaves e experiência imersiva em desktop e mobile.

### Seções

| Seção | ID | Descrição |
|-------|-----|-----------|
| Header | — | Navegação fixa com blur no scroll e menu mobile |
| Hero | — | Animação scroll-driven com tipografia animada |
| Nossa História | `#historia` | Timeline visual com imagens deslizantes |
| Produtos | `#produtos` | Grid de produtos em destaque (canecas, chaveiros, kits etc.) |
| Diferenciais | `#diferenciais` | Galeria expansiva com texto reveal no scroll |
| Portfólio | `#portfolio` | Carrossel horizontal acionado pelo scroll |
| Aplicações | `#aplicacoes` | Casos de uso corporativos (B2B, RH, eventos) |
| Orçamento | `#contato` | CTA principal + métricas da empresa + vídeo |
| Sobre nós | `#sobre` | Apresentação institucional |
| Footer | — | Links, redes sociais e informações de contato |

---

## Stack tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [Next.js](https://nextjs.org/) | 16 | App Router, SSR, otimização de imagens |
| [React](https://react.dev/) | 19 | Componentes e hooks |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilização utilitária |
| [shadcn/ui](https://ui.shadcn.com/) | — | Componentes base (Radix UI) |
| [Lucide React](https://lucide.dev/) | — | Ícones |
| [Vercel Analytics](https://vercel.com/analytics) | — | Métricas de acesso |

---

## Estrutura do projeto

```
├── app/
│   ├── layout.tsx          # Layout raiz, metadata SEO e Analytics
│   ├── page.tsx            # Composição das seções da landing
│   └── globals.css         # Design tokens e estilos globais
├── components/
│   ├── header.tsx          # Cabeçalho com navegação responsiva
│   ├── fade-image.tsx      # Componente de imagem com fade-in lazy
│   ├── sections/           # Seções da landing page
│   └── ui/                 # Biblioteca shadcn/ui
├── hooks/                  # Hooks customizados
├── lib/
│   └── utils.ts            # Utilitários (cn, etc.)
└── public/                 # Assets estáticos (ícones, placeholders)
```

---

## Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm**, **pnpm** ou **yarn**

---

## Instalação e execução

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd TM-TEMPLATE-LANDING-PAGE-EVASION

# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Serve a build de produção |
| `npm run lint` | Executa o ESLint |

---

## Personalização

### Conteúdo e copy

Os textos, imagens e links de cada seção estão nos arquivos em `components/sections/`. Para alterar produtos, depoimentos ou CTAs, edite diretamente o array de dados no componente correspondente.

### SEO e metadata

Metadados (título, descrição, ícones) ficam em `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Majestade Personalizados | Brindes Corporativos em Montenegro, RS',
  description: '...',
}
```

### Design system

Cores, tipografia e tokens de design estão centralizados em `app/globals.css`. A paleta principal usa:

- **Foreground:** `#0F1B2D` (azul marinho)
- **Accent:** `#B8860B` (dourado)
- **Background:** `#FAFAF8` (off-white)

### Imagens

As imagens atuais utilizam URLs do Unsplash como placeholder. Substitua pelos assets reais da empresa em cada seção ou mova arquivos para `public/` e atualize os caminhos.

### Contato

O CTA de orçamento aponta para `contato@majestadepersonalizados.com.br` em `components/sections/editorial-section.tsx`. Atualize conforme o canal de contato desejado (WhatsApp, formulário, etc.).

---

## Deploy

O projeto é compatível com [Vercel](https://vercel.com/) out of the box. O `@vercel/analytics` já está integrado no layout.

```bash
npm run build
```

Para deploy na Vercel, conecte o repositório e configure o framework como **Next.js**. Nenhuma variável de ambiente é obrigatória para o funcionamento básico.

---

## Observações técnicas

- **Imagens:** `next.config.mjs` está com `images.unoptimized: true` — adequado para deploy estático ou ambientes sem otimização de imagem do Next.js.
- **TypeScript:** erros de build são ignorados via `ignoreBuildErrors: true` no `next.config.mjs`. Recomenda-se corrigir os erros antes de produção.
- **Componentes UI:** a biblioteca shadcn/ui está instalada em `components/ui/` para extensões futuras (formulários, modais, etc.), embora a landing atual use majoritariamente componentes customizados.

---

## Licença

Projeto privado. Todos os direitos reservados © Majestade Personalizados.
