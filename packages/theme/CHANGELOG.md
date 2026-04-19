# @fylib/theme

## 0.3.4

### Patch Changes

- 66e6ca9: fix: correções críticas de layout, suporte a charts e melhorias na experiência de instalação (ng-add).
  - **Schematic ng-add**:
    - Adicionada inclusão automática de dependências externas (`chart.js` e `ng2-charts`).
    - Implementado `MergeStrategy.Overwrite` para evitar conflitos ao reinstalar o fyLib em projetos existentes.
    - Refatorada a lógica de instalação para garantir que todas as dependências do ecossistema sejam atualizadas para a versão `latest`.
  - **Layout e Engine**:
    - Corrigido transbordamento de elementos no sidebar em viewports pequenas através de scroll interno e fixação de cabeçalho/rodapé.
    - Garantido que `fy-layout` e `fy-slot` respeitem os limites da tela usando `box-sizing: border-box`.
    - Resolvido erro `NG0600` (escrita em signals dentro de effects) no `FyText`, `FyLayout` e `FyNotificationMenu`.
    - Corrigido erro de build `TS2304` por import ausente no `FyBadge`.
  - **Temas e Componentes**:
    - **Nexus 1**: Refinado como tema Full Dark com paleta verde neon, contraste de texto otimizado e efeito Matrix sutil.
    - **Windows XP**: Corrigido fundo de cards que estava vermelho por engano.
    - **Componentes**: Adicionados inputs `strong` e `size` ao `FyText` e `glow` ao `FyBadge`.
    - Suporte total a gradientes de fundo através da troca de `background-color` por `background` nos componentes de UI.

## 0.3.3

### Patch Changes

- 0739eb5: fix: ajustes de layout no sidebar e correções de contraste e cores em diversos temas.
  - **Layout e Engine**:
    - Corrigido problema onde elementos do sidebar saíam da tela em viewports pequenas.
    - Implementado scroll interno inteligente na região de links do sidebar, fixando header e footer.
    - Garantido que `fy-layout` e `fy-slot` respeitem os limites da viewport com `box-sizing: border-box` e gerenciamento de alturas em modo `fixedHeight`.
    - Refinado o schematic `ng-add` para usar layouts mais compactos e robustos.
  - **Adapter Angular**:
    - Corrigido erro `NG0600` (escrita em signals dentro de effects) no `FyText`, `FyLayout` e `FyNotificationMenu`.
    - Corrigido erro `TS2304` (import ausente de `HostBinding`) no `FyBadge`.
    - Adicionados inputs `strong` e `size` ao `FyTextComponent` e `glow` ao `FyBadgeComponent`.
    - Suporte total a gradientes de fundo em componentes de UI.
  - **Temas**:
    - **Nexus 1**: Agora é Full Dark com paleta verde neon exclusiva e efeito Matrix sutil/transparente.
    - **Windows XP**: Removido fundo vermelho incorreto dos cards.
    - **Finey Hub 1 & Christmas**: Ajustado contraste de texto e cores secundárias para máxima legibilidade no Dark Mode.

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
