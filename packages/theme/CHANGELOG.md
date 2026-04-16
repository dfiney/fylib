# @fylib/theme

## 0.3.2

### Patch Changes

- e2115ac: fix: correções de cores, contraste, suporte a gradientes e melhorias de UX.
  - **Adapter Angular**:
    - Corrigido erro `NG0600` (escrita em signals dentro de effects) no `FyText`, `FyLayout` e `FyNotificationMenu`.
    - Corrigido erro `TS2304` (import ausente de `HostBinding`) no `FyBadge`.
    - Adicionados inputs `strong` e `size` ao `FyTextComponent`.
    - Adicionado input `glow` ao `FyBadgeComponent`.
    - Alterado `background-color` para `background` em múltiplos componentes para suportar gradientes de temas.
    - Atualizado schematic `ng-add` com página de boas-vindas profissional, toggle de tema funcional e correção de seletores de slots.
  - **Temas**:
    - **Windows XP**: Removido fundo vermelho incorreto dos cards.
    - **Finey Hub 1**: Melhorado contraste de texto e cores secundárias no Dark Mode.
    - **Finey Nexus 1**: Transformado em Full Dark com paleta verde neon, melhorado contraste de texto e ajuste no efeito 'matrix' para ser sutil e transparente.
    - **Christmas**: Ajustado contraste de vermelho e verde no modo escuro para melhor legibilidade.

## 0.3.1

### Patch Changes

- ce2794f: fix: correções no tema Nexus, suporte a gradientes em componentes e melhorias no schematic ng-add.
  - Corrigido erro `NG0600` no Angular ao escrever em signals dentro de effects.
  - Alterado `background-color` para `background` em componentes para suportar gradientes de temas.
  - Tema Finey Nexus 1 atualizado para Full Dark e tons de verde neon.
  - Efeito 'matrix' ajustado para ser mais sutil e não escurecer a tela.
  - Schematic `ng-add` atualizado com cores corretas e nova página de boas-vindas com toggle de tema.

## 0.3.0

### Minor Changes

- d716809: feat: adicionado suporte a estilos por variante de componente (`componentVariants`) diretamente na `ThemeDefinition`.
  feat: todos os temas padrão foram atualizados com estilos específicos para variantes de botões, cards e outros componentes, reforçando a identidade visual de cada tema (XP, Win7, Puffy, Nexus, etc.).
  feat: todos os componentes do adapter Angular agora respeitam as variações de estilo definidas pelo tema ativo, permitindo customização profunda sem alteração de código.

### Patch Changes

- Updated dependencies [d716809]
  - @fylib/core@0.3.0
  - @fylib/animation@0.2.3
  - @fylib/logger@0.2.3

## 0.2.2

### Patch Changes

- Updated dependencies [5a1591a]
  - @fylib/core@0.2.2
  - @fylib/animation@0.2.2
  - @fylib/logger@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [afb59d8]
  - @fylib/core@0.2.1
  - @fylib/animation@0.2.1
  - @fylib/logger@0.2.1

## 0.2.0

### Minor Changes

- b004b68: schematics for angular

### Patch Changes

- Updated dependencies [b004b68]
  - @fylib/animation@0.2.0
  - @fylib/core@0.2.0
  - @fylib/logger@0.2.0
