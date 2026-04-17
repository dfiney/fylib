---
"@fylib/adapter-angular": patch
"@fylib/theme": patch
---

fix: ajustes de layout no sidebar e correções de contraste e cores em diversos temas.

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
