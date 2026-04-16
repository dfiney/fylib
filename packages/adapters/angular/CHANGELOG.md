# @fylib/adapter-angular

## 0.4.1

### Patch Changes

- ce2794f: fix: correções no tema Nexus, suporte a gradientes em componentes e melhorias no schematic ng-add.
  - Corrigido erro `NG0600` no Angular ao escrever em signals dentro de effects.
  - Alterado `background-color` para `background` em componentes para suportar gradientes de temas.
  - Tema Finey Nexus 1 atualizado para Full Dark e tons de verde neon.
  - Efeito 'matrix' ajustado para ser mais sutil e não escurecer a tela.
  - Schematic `ng-add` atualizado com cores corretas e nova página de boas-vindas com toggle de tema.

- Updated dependencies [ce2794f]
  - @fylib/theme@0.3.1
  - @fylib/catalog@0.3.2

## 0.4.0

### Minor Changes

- d716809: feat: adicionado suporte a estilos por variante de componente (`componentVariants`) diretamente na `ThemeDefinition`.
  feat: todos os temas padrão foram atualizados com estilos específicos para variantes de botões, cards e outros componentes, reforçando a identidade visual de cada tema (XP, Win7, Puffy, Nexus, etc.).
  feat: todos os componentes do adapter Angular agora respeitam as variações de estilo definidas pelo tema ativo, permitindo customização profunda sem alteração de código.

### Patch Changes

- Updated dependencies [d716809]
  - @fylib/core@0.3.0
  - @fylib/theme@0.3.0
  - @fylib/animation@0.2.3
  - @fylib/catalog@0.3.1
  - @fylib/config@0.2.4
  - @fylib/crypto@0.2.3
  - @fylib/logger@0.2.3

## 0.3.0

### Minor Changes

- 5a1591a: feat: adicionado catálogo de temas ao template de boas-vindas do schematic ng-add, permitindo a troca dinâmica de temas diretamente na página inicial.
  fix: adicionado suporte a links (`link` e `target`) no `FyButtonComponent`, corrigindo problemas de navegação no template de boas-vindas.
  fix: corrigido erro NG0600 (escrita em signals dentro de effects) nos componentes FyText, FyLayout e FyNotificationMenu, garantindo compatibilidade com Angular 18+.

### Patch Changes

- Updated dependencies [5a1591a]
- Updated dependencies [5a1591a]
  - @fylib/catalog@0.3.0
  - @fylib/config@0.2.3
  - @fylib/core@0.2.2
  - @fylib/crypto@0.2.2
  - @fylib/animation@0.2.2
  - @fylib/logger@0.2.2
  - @fylib/theme@0.2.2

## 0.2.9

### Patch Changes

- Updated dependencies [afb59d8]
  - @fylib/config@0.2.2
  - @fylib/core@0.2.1
  - @fylib/crypto@0.2.1
  - @fylib/animation@0.2.1
  - @fylib/catalog@0.2.1
  - @fylib/logger@0.2.1
  - @fylib/theme@0.2.1

## 0.2.8

### Patch Changes

- Updated dependencies [8f16cc6]
  - @fylib/config@0.2.1

## 0.2.7

### Patch Changes

- feace8f: fix: corrigido build do adapter-angular para usar o Angular Compiler (ngc) em modo partial, garantindo suporte a componentes standalone em projetos externos (Angular 17+)

## 0.2.5

### Patch Changes

- 03f8c00: fix: corrigido imports duplicados do angular/core no app.ts, corrigido erro de standalone imports no ng-add, implementada lógica inteligente para não sobrescrever html customizado do usuário (suportando app.component.html e app.html) e adicionada rota de boas-vindas fylib-welcome

## 0.2.3

### Patch Changes

- df6eca8: fix: corrige erro de standalone imports no app.component e adiciona página de boas-vindas temática no ng-add

## 0.2.2

### Patch Changes

- ec51708: fix: corrigido ng-add schematic para evitar duplicação de pasta, remover extensão .template e usar ThemeConfig no tema

## 0.2.1

### Patch Changes

- 92eef71: fix: corrige ng-add schematic para criar arquivos de config na pasta fylib e instalar dependências automaticamente

## 0.2.0

### Minor Changes

- b004b68: schematics for angular

### Patch Changes

- Updated dependencies [b004b68]
  - @fylib/animation@0.2.0
  - @fylib/catalog@0.2.0
  - @fylib/config@0.2.0
  - @fylib/core@0.2.0
  - @fylib/crypto@0.2.0
  - @fylib/logger@0.2.0
  - @fylib/theme@0.2.0
