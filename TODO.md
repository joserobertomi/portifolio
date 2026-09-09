# TODO — Alinhamento Mobile ↔ Desktop

Levantamento feito em 2026-09-02 via inspeção no Chrome (390×844 mobile / 1440×900 desktop)
nas 5 rotas, medindo posições reais no DOM além de capturas de tela.

**Legenda de status das evidências**
- ✅ **Confirmado** — reproduzido e medido no navegador.
- ⚠️ **Risco** — leitura de código; não é observável no Chrome desktop (precisa de aparelho/emulação de toque).

**Prioridade**
- `P0` quebra visível ou funcionalidade morta
- `P1` degrada a experiência mobile de forma perceptível
- `P2` polimento / dívida técnica

---

## Como paralelizar com subagents

Os blocos abaixo têm **arquivos disjuntos** — podem ser atacados em paralelo sem conflito de merge.
Um subagent por bloco.

| Bloco | Arquivos exclusivos do bloco | Itens |
|---|---|---|
| **A — Timeline** | `src/components/ui/timeline.tsx` | 1, 2 |
| **B — FlipWords** | `src/components/ui/flip-words.tsx` | 3 |
| **C — Tipografia** | `src/app/globals.css` | 4 |
| **D — Sticky cards / Lenis+GSAP** | `src/components/ui/sticky-cards.tsx`, `src/components/layout/smooth-scroll.tsx` | 5, 6, 7 |
| **E — Páginas** | `src/app/page.tsx`, `src/app/artigos/page.tsx`, `src/app/contato/page.tsx` | 8, 9, 10, 11 |
| **F — Nav** | `src/components/layout/glass-nav.tsx` | 12 |
| **G — Limpeza** | `src/components/ui/scroll-line-path.tsx` | 13 |

**Regras para os subagents**
1. Ler `AGENTS.md` antes de escrever código — este Next.js (16.3.4) tem breaking changes; consultar
   `node_modules/next/dist/docs/` para qualquer API do framework.
2. Não sair do bloco. Se precisar tocar arquivo de outro bloco, parar e reportar.
3. Não alterar `AGENTS.md` / `CLAUDE.md` (são regenerados pelo `next dev`).
4. Validar com `npm run lint` e `npx tsc --noEmit` antes de encerrar.
5. Cada item tem **critério de aceite** — verificar antes de dar como pronto.

> ⚠️ A árvore tem 8 arquivos modificados não commitados. Vale commitar ou fazer stash
> antes de soltar os subagents, para o diff de cada bloco ficar legível.

---

## Bloco A — Timeline

### 1. `P0` ✅ A bolinha sticky descola do ano no mobile

**Sintoma** — no mobile, os marcadores circulares não acompanham mais o ano correspondente,
e sobram bolinhas órfãs empilhadas no topo da viewport.

**Evidência** — bolinha em `y=147` enquanto o ano "2020" estava em `y=-69` (216px de descolamento).
No desktop os 7 grupos ficam sempre a ≤4px de distância.

**Causa** — `src/components/ui/timeline.tsx:62-74`. O `<h3>` do ano dentro do elemento sticky
tem `hidden md:block`. A versão mobile (`md:hidden block`, linha 72) foi movida para a coluna de
conteúdo, que **não** é sticky. Só a bolinha continuou sticky (`top-40`), então flutua sozinha.

**O que fazer** — fazer bolinha e ano compartilharem o mesmo comportamento em ambos os breakpoints.
Duas saídas: (a) desligar o `sticky` abaixo de `md`, ou (b) trazer o ano mobile para dentro do
elemento sticky. Avaliar qual preserva melhor o visual atual do desktop — o desktop **não pode
regredir**.

**Critério de aceite** — em 390px, para cada grupo, o centro da bolinha e o topo do `<h3>` do ano
ficam a ≤8px; nenhuma bolinha órfã visível.

---

### 2. `P0` ✅ Barra de progresso da timeline nunca completa e ultrapassa o último item

**Sintoma** — a linha vertical passa do fim do último item e o preenchimento para no meio.

**Evidência**
- Mobile: `style.height = 1675.68px` vs. altura real do container `1588px` → **88px sobrando**.
- Desktop: 1792 vs. 1792 — exato.
- Com scroll no máximo, o preenchimento parou em **987px de 1675px = 59%**.

**Causa** — `src/components/ui/timeline.tsx:21-26`. A altura é medida uma única vez no mount,
sem `ResizeObserver` nem re-medição. No mobile o texto reflui muito mais depois que a webfont
carrega, então a medida nasce errada e nunca é corrigida. O mesmo desalinhamento contamina o
mapeamento do `useScroll`.

**O que fazer** — re-medir com `ResizeObserver` no container (e não só no mount), disparando
também depois do `document.fonts.ready`. Garantir que o `useScroll`/`useTransform` reflitam a
altura atualizada.

**Critério de aceite** — em 390px e 1440px, `beam.style.height` bate com a altura real do
container (≤2px) e o preenchimento chega a 100% no fim do scroll. Testar também após rotacionar
/ redimensionar.

---

## Bloco B — FlipWords

### 3. `P0` ✅ A rotação de palavras do hero morre de vez (mobile **e** desktop)

**Sintoma** — a palavra alterna uma ou duas vezes e trava para sempre, frequentemente
semi-transparente e borrada.

**Evidência** — amostrado por 6s no desktop: travou em "builder" com `opacity: 0.97` e nunca mais
alternou. Não é throttling: rAF a 61fps, aba visível e focada (`document.hasFocus() === true`).

**Causa** — `src/components/ui/flip-words.tsx:25-30`. O `useEffect` só agenda o próximo timeout
quando `!isAnimating`; `isAnimating` só volta a `false` no `onExitComplete`, que não dispara.
Trava permanentemente.

**Dois agravantes no mesmo arquivo**
- O `setTimeout` (linha 27) não tem cleanup — acumula timers a cada re-render.
- O nó que entra fica `position: relative` em fluxo junto com o que sai (só o que sai vira
  `absolute`, linha 58). Com dois nós no mesmo flex `justify-center`, a palavra visível escapa da
  caixa reservada: medida em `x=49` com a caixa em `x=73`. No mobile é mais visível porque o
  texto é centralizado.

**O que fazer** — tornar o ciclo independente do `onExitComplete` (intervalo próprio com cleanup),
e garantir que apenas um nó ocupe fluxo por vez (`AnimatePresence mode="wait"` ou `popLayout`,
ou posicionar ambos em absolute).

**Critério de aceite** — as 4 palavras (`engenheiro`, `builder`, `curioso`, `empreendedor`) ciclam
indefinidamente; amostrando 30s a palavra visível atinge `opacity: 1` entre transições; o `x` da
palavra visível nunca sai da caixa reservada; sem timers vazando ao desmontar.

---

## Bloco C — Tipografia

### 4. `P1` ✅ A fonte Plus Jakarta Sans não está sendo aplicada em lugar nenhum

**Sintoma** — o site inteiro renderiza em Arial. Dá pra notar a diferença de fonte entre o hero e
a seção da timeline.

**Evidência** — `getComputedStyle(body).fontFamily` e do `h1` retornam
`"Arial, Helvetica, sans-serif"`.

**Causa** — `src/app/globals.css:25`: `body { font-family: Arial, Helvetica, sans-serif; }`
sobrescreve tudo. A variável `--font-jakarta-sans` é criada em `layout.tsx:9-12` e mapeada em
`globals.css:11-12`, mas o único ponto que consome `font-sans` é `timeline.tsx:38` — por isso só a
timeline aparece com Jakarta.

**O que fazer** — fazer o `body` usar a família do tema em vez do Arial hardcoded.

**Critério de aceite** — `getComputedStyle(body).fontFamily` inclui a fonte Jakarta; hero e
timeline renderizam com a mesma família; sem FOUT novo.

> Corrige desktop junto. Mudança de uma linha, mas **muda a aparência de todas as páginas** —
> vale conferir visualmente as 5 rotas depois.

---

## Bloco D — Sticky cards / Lenis + GSAP

### 5. `P1` ✅ Legenda do card colada na nav e cortada durante a transição

**Sintoma** — em `/projects`, título e descrição do projeto ficam ilegíveis enquanto o card desliza.

**Evidência** — card termina em `y≈808` com a nav começando em `818` (28px de folga). Em transição,
medi a legenda com `bottom: 921` numa viewport de 867 — fora da tela.

**Causa** — `src/components/ui/sticky-cards.tsx:113` usa `h-screen` sem descontar a nav inferior
fixa (~50px + safe area), e a legenda (linha 138) fica colada na base do card.

**O que fazer** — reservar espaço para a nav inferior abaixo de `sm`, para o card e a legenda
respirarem.

**Critério de aceite** — em 390px, com o card assentado, a legenda inteira fica visível e a ≥16px
acima do topo da nav.

---

### 6. `P1` ⚠️ `100vh` no bloco pinado quebra com a barra de URL do mobile

**Causa** — `src/components/ui/sticky-cards.tsx:113` usa `h-screen` (=`100vh`). Não há nenhum
`dvh`/`svh` no projeto. No mobile real, `100vh` inclui a área da barra de URL, então o bloco pinado
fica mais alto que a viewport visível — o que agrava diretamente o item 5.

**O que fazer** — trocar por unidade de viewport dinâmica/pequena. Escolher entre `dvh` e `svh` com
cuidado: `dvh` muda de valor conforme a barra aparece/some e pode brigar com o `ScrollTrigger`
(ver item 7); `svh` é estável e costuma ser a escolha segura para bloco pinado.

**Critério de aceite** — sem `h-screen`/`100vh` neste arquivo; comportamento do desktop preservado.

---

### 7. `P1` ⚠️ Lenis e ScrollTrigger não estão integrados — risco no scroll de toque

**Evidência** — confirmei que scroll que **não** passa pelo Lenis não atualiza o pin: com
`window.scrollTo()` programático o `transform` ficou em `translate(0,0)` em todas as posições
testadas (0 → 3500px) e a seção passou direto, sem pinar. Com scroll de wheel real (via Lenis)
o pin funciona normalmente.

**Causa** — não existe `scrollerProxy` nem `lenis.on('scroll', ScrollTrigger.update)` no projeto.
`src/components/layout/smooth-scroll.tsx:13-22` só liga o rAF do Lenis ao ticker do GSAP; nada
avisa o ScrollTrigger. Como o Lenis **não intercepta toque por padrão** (`syncTouch: false`), o
scroll de dedo em `/projects` cai exatamente no caminho que demonstrei não atualizar o pin.

**Agravante — `src/components/ui/sticky-cards.tsx:94-100`**: o `ResizeObserver` chama
`ScrollTrigger.refresh()`. No mobile a barra de URL redimensiona a viewport a cada scroll,
disparando refresh em cadeia — gerador clássico de pulos no pin.

**O que fazer** — conectar Lenis ↔ ScrollTrigger explicitamente. Debouncar / filtrar o
`ScrollTrigger.refresh()` para ignorar mudanças de altura causadas só pela barra de URL
(comparar largura, não altura).

**Cuidado** — `sticky-cards.tsx:105` faz `ScrollTrigger.getAll().forEach(t => t.kill())` no
cleanup, o que mata triggers de **outros** componentes. Restringir ao trigger local.

**Critério de aceite** — pin e transições dos cards respondem ao scroll de toque (validar em
aparelho ou com emulação de toque); sem pulos ao mostrar/esconder a barra de URL; o cleanup não
derruba triggers alheios.

---

## Bloco E — Páginas

### 8. `P1` ✅ `/artigos` — a data quebra em duas linhas no mobile

**Sintoma** — renderiza "08 de ago. de" / "2025".

**Causa** — `src/app/artigos/page.tsx:37` aplica `w-32` (largura fixa de 128px) também no mobile,
onde o layout já é `flex-col` e não precisa da coluna alinhada.

**O que fazer** — restringir a largura fixa a `sm+`.

**Critério de aceite** — em 390px cada data ocupa uma única linha; o alinhamento em coluna do
desktop continua igual.

---

### 9. `P2` ✅ `/contato` — scroll fantasma

**Sintoma** — a página rola ~149px sem ter conteúdo novo para mostrar.

**Causa** — `src/app/contato/page.tsx:15` usa `min-h-screen`, fazendo o `<main>` ocupar a viewport
inteira e empurrar o footer inteiro para baixo da dobra.

**O que fazer** — descontar a altura do footer (e da nav inferior no mobile) do cálculo.

**Critério de aceite** — em 390px a página não rola, ou rola só o necessário para revelar o footer.

---

### 10. `P2` ✅ `/contato` — alvos de toque abaixo do mínimo

**Causa** — `src/app/contato/page.tsx:27-33`: os links são `text-sm` de linha única (~20px de
altura), abaixo dos 44px recomendados.

**Critério de aceite** — cada link de contato tem ≥44px de altura tocável em 390px.

---

### 11. `P1` ⚠️ Hero e `/contato` usam `100vh`

**Causa** — `src/app/page.tsx:13` (`min-h-screen` + `lg:h-screen`) e
`src/app/contato/page.tsx:15` (`min-h-screen`). Mesma questão do item 6: no mobile real a barra de
URL faz `100vh` > viewport visível. **Provavelmente a causa raiz da sensação difusa de "corta e
pula" no mobile.**

**O que fazer** — migrar para unidade de viewport dinâmica/pequena abaixo de `lg`, preservando o
`lg:h-screen` do desktop.

**Critério de aceite** — hero encaixa na viewport visível do mobile sem corte, com e sem barra de
URL; desktop inalterado.

---

## Bloco F — Nav

### 12. `P2` ⚠️ Nav inferior sem folga a 320px — **não testado**

**Por que não testei** — o Chrome no Linux não reduz a janela abaixo de 400px de largura.

**A conta preocupa** — em 385px de largura útil, os 5 links ocupam **75px cada = 375px**, sobrando
10px. A 320px (iPhone SE) é provável que "Projetos"/"Contato" apertem, quebrem ou estourem.

**Causa** — `src/components/layout/glass-nav.tsx:43-63`: `flex-1` + `whitespace-nowrap` a 11px.

**O que fazer** — validar a 320px (DevTools device toolbar ou Playwright, que não têm o piso de
400px) e, se apertar, reduzir padding/fonte ou encurtar rótulos.

**Critério de aceite** — em 320px nenhum rótulo é cortado ou quebra linha, e não há overflow
horizontal.

---

## Bloco G — Limpeza

### 13. `P2` ✅ `scroll-line-path.tsx` é código morto

**Evidência** — `src/components/ui/scroll-line-path.tsx` não é importado em lugar nenhum
(confirmado por grep em `src/`). Carrega `framer-motion` e tem um `h-screen` que também apareceu
na varredura de `100vh` — ruído nas buscas futuras.

**O que fazer** — remover o arquivo. Conferir se `framer-motion` continua sendo usado por outro
módulo antes de mexer em `package.json` (`motion` e `framer-motion` estão ambos declarados).

**Critério de aceite** — arquivo removido, `npm run lint` e `npx tsc --noEmit` limpos.

---

## O que já está bom no mobile (não regredir)

- `/frases` — impecável; tipografia, divisores e quebras corretos.
- `/artigos/[slug]` — leitura boa, sem overflow.
- Nav inferior — estado ativo funciona e `env(safe-area-inset-bottom)` já está tratado
  (`glass-nav.tsx:46`). A troca nav-topo (desktop) / nav-inferior (mobile) está limpa.
- Sem overflow horizontal em nenhuma das 5 rotas (`scrollWidth === innerWidth`).
- Os cards de `/projects` **animam de verdade** no mobile — o pin engata com scroll real.
- Footer não é encoberto pela nav (o `pb-24` compensa).

## Cobertura de teste pendente

- **320px** — bloqueado pelo piso de 400px do Chrome (item 12).
- **Toque real** — itens 6, 7 e 11 só se confirmam em aparelho ou com emulação de toque.
