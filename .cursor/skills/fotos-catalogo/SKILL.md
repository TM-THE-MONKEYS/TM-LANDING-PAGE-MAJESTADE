---
name: fotos-catalogo
description: >-
  Cadastra fotos oficiais de produtos no catálogo da Majestade (lib/catalog.ts):
  agrupa ângulos do mesmo item, aposenta refs removidas, escreve nome e
  descrição curta, e prepara os JPEGs. Use quando o usuário enviar fotos de
  produtos, pedir para adicionar, trocar ou apagar itens do catálogo, ou
  mencionar ref, camisetas, vestuário, canecas, squeezes ou images/oficiais.
---

# Fotos do catálogo

`lib/catalog.ts` é a única fonte. Cards, carrossel e popup leem `src`, `alt` e `photos`. Não crie página, componente ou campo novo para uma foto.

## Antes de gravar

1. Leia o cabeçalho de `lib/catalog.ts`, `NEXT_PRODUCT_REF`, `RETIRED_PRODUCT_REFS` e a categoria destino.
2. Abra cada foto. O número `MAJESTADE-NNN` no arquivo é a identidade. A ordem em que as imagens chegaram no chat não é.
3. Decida o agrupamento e diga, na resposta final, o que entrou, o que foi o mesmo modelo e o que foi descartado por ser quase igual.

Regras de agrupamento e exemplos: [referencia.md](referencia.md).

## Um produto, várias fotos

- `src` + `alt`: card, carrossel e primeira imagem do popup. Escolha a vista em que o produto inteiro aparece (frente ou 3/4). Macro de logo, punho ou bolso nunca é a principal.
- `photos`: só vistas diferentes, nesta ordem: lado, costas, interior, um detalhe. Omita `photos` quando só existe uma imagem. Não repita o arquivo de `src`.
- Duas fotos quase iguais (segundo costas, segundo bolso, segundo close do logo): fique com a mais nítida e avise.
- Mesmo corte e mesma cor com estampa de outro cliente: um produto só. Use o conjunto que tem frente e costas. Avise qual amostra ficou de fora.
- Cor ou construção diferente (gola, manga, zíper, forro): outro produto e outro ref.
- A foto combina com um produto que já existe: acrescente em `photos`. Não gaste ref novo.
- Nada combina: produto novo na categoria existente mais próxima. Não crie categoria.

## Refs

1. Use `NEXT_PRODUCT_REF` e siga em sequência dentro do lote.
2. Ao apagar, tire o objeto e acrescente o número em `RETIRED_PRODUCT_REFS` com um comentário de uma linha do que era. Esse número não volta.
3. `NEXT_PRODUCT_REF` passa a ser o maior ref vivo + 1, nunca um buraco aposentado.
4. Atualize o comentário da categoria (`refs 55–61`).
5. Não marque `featured` se o usuário não pediu. Featured entra no carrossel da home.

## Nome, descrição e alt

Português do Brasil. O nome é o tipo da peça, não a marca impressa na amostra (Andrade, Versatt, Tropical, Quatro Rodas e similares são exemplo de personalização).

- **name**: tipo + o que separa no grid. Cor quando a linha se distingue por cor (`Camiseta Azul`). Corte quando se distingue por corte (`Camiseta Gola V`, `Camiseta Manga Longa`). Sem capacidade, tecido ou slogan que a foto não mostra.
- **shortDescription**: uma frase. Começa pelo tipo da peça. Diz só construção visível e onde a marca aparece (peito, costas, manga). Sem "premium", "ideal para", "alta qualidade", nome de cliente, telefone ou rede social.
- **alt**: a vista, não o texto da estampa. Ex.: `Costas da camiseta preta com estampa`. A principal pode completar com `vista de frente`.
- Não invente algodão, dry-fit, ml ou forro se isso não está na foto nem na fala do usuário. Se a foto não deixa claro, descreva o que se vê.

No mesmo lote, as frases seguem o mesmo ritmo. Uma diz "manga curta e marca no peito"; a irmã não vira parágrafo de venda.

## Arquivos

Destino: `public/images/oficiais/{id}-{vista}.jpg`.

Vistas: `frente`, `costas`, `lado`, `peito`, `bolso`, `punho`, `gola`, `forro`, `interno`, `estampa`, `manga`.

Copie do diretório de assets com filtro `*MAJESTADE-NNN-*` (um arquivo por número). Passe cada escolhida pelo preparo:

```powershell
powershell -File .cursor/skills/fotos-catalogo/scripts/prepare-photo.ps1 -Source "<origem>" -Destination "public/images/oficiais/<nome>.jpg"
```

O script orienta, remove EXIF e, se o lado maior passar de 1600 px, reduz. Não recorta, não troca fundo, não apaga estampa e não inventa ângulo. Se o ImageMagick não estiver instalado, ele só copia e avisa `COPIED_WITHOUT_EDIT`. Não instale dependência para isso.

Não use foto torta de estúdio como principal se existir outra reta do mesmo produto. Não gire foto de pessoa para "endireitar" o fundo.

## Conferir

Com o dev server em http://localhost:3000/produtos, confirme HTTP 200, os nomes novos no HTML e a ausência dos nomes apagados. O ref aparece partido (`Ref.` e depois `055`); busque o número. A URL das fotos extras só entra no HTML quando o popup abre; a de `src` precisa aparecer.

Não faça commit.

## Resposta ao usuário

Tabela curta: ref, nome. Em seguida, uma frase sobre amostras unidas no mesmo corte, fotos repetidas deixadas de fora, e o próximo ref livre.
