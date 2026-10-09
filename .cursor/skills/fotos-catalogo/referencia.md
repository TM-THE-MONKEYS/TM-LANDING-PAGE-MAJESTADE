# Referência — agrupar fotos do catálogo

Leia isto depois do SKILL.md, antes de cadastrar um lote.

## Categorias que já existem

Encaixe o produto numa destas. O id fica em `catalogCategories`.

| id | O que entra |
|---|---|
| `squeeze-garrafas` | squeezes e garrafas térmicas |
| `canecas-termicas` | canecas térmicas |
| `canecas-copos` | caneca e copo que não são a linha térmica |
| `cuia-e-bomba` | cuia, bomba |
| `kit-vinho` | kit vinho |
| `chaveiros` | chaveiros |
| `canetas` | canetas |
| `uniformes-industriais` | macacão, polo operacional, calça cargo, uniforme de trabalho |
| `vestuario-corporativo` | jaqueta, corta-vento, colete, moletom, camisa social, jaleco |
| `camisetas` | camiseta, gola V, manga longa, viés, polo casual |
| `acessorios` | boné, mochila, bolsa térmica, guarda-chuva |

Polo casual de brinde fica em `camisetas`. Polo de uniforme operacional fica em `uniformes-industriais`.

## Como separar

| Situação | Decisão |
|---|---|
| Frente, costas e close do mesmo modelo | 1 ref. Principal = corpo inteiro. Close vai para `photos` |
| Camisa branca, preta e cinza, cada uma com o próprio ensaio | 3 refs |
| Duas golas V pretas, só muda a arte do cliente | 1 ref. Fica o ensaio com frente e costas |
| Jaqueta com forro fosco e jaqueta matelassê brilhante | 2 refs. Corte diferente |
| Segunda foto do mesmo bolso, quase igual | descarta e avisa |
| Ilustração PNG que o usuário mandou apagar | remove o produto, aposenta o ref, não reutiliza |

A marca no peito não vira nome. `Camiseta Verde` com logo da Majestade continua `Camiseta Verde`, salvo o usuário pedir o nome da marca.

## Ordem do popup

1. `src` — frente ou 3/4 com o produto inteiro
2. lado ou costas
3. interior ou forro, se existir
4. um detalhe (peito, punho, gola, bolso, estampa)

Estampa grande nas costas não substitui a frente no card. A frente mostra a peça; a estampa entra na galeria. Exceção: não há nenhuma vista de frente utilizável. Aí a principal é a vista completa que existir.

## Texto

Certo:

```ts
name: "Camiseta Gola V",
shortDescription: "Camiseta de gola V com a marca no peito e estampa nas costas.",
alt: "Camiseta preta de gola V, vista de frente",
```

Errado: nome `Camiseta Andrade`, descrição com telefone, "tecido tecnológico premium" ou "ideal para eventos esportivos" sem o usuário ter dito isso.

## Bloco mínimo

```ts
{
  ref: 62,
  id: "camiseta-azul",
  name: "Camiseta Azul",
  shortDescription: "Camiseta de manga curta com a marca no peito.",
  src: "/images/oficiais/camiseta-azul-frente.jpg",
  alt: "Camiseta azul personalizada, vista de frente",
  photos: [
    { src: "/images/oficiais/camiseta-azul-lado.jpg", alt: "Camiseta azul de lado" },
  ],
},
```

`id` é kebab-case e único no arquivo. O arquivo da foto usa esse id mais a vista.

## Preparo da imagem

Só o que o script faz: auto-orient, tirar EXIF, reduzir o lado maior para 1600 px se estiver acima disso, JPEG qualidade 82.

Não fazer: trim automático (come a borda do produto), recorte criativo, desfoque de fundo, troca de cor, remoção de logo, upscale, gerar vista que não foi fotografada.
