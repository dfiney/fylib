---
"@fylib/adapter-angular": patch
"@fylib/theme": patch
---

fix: correções críticas de layout, suporte a charts e melhorias na experiência de instalação (ng-add).

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
