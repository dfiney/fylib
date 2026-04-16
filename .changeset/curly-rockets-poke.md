---
"@fylib/adapter-angular": patch
"@fylib/theme": patch
---

fix: correções de cores, contraste, suporte a gradientes e melhorias de UX.

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
