---
"@fylib/adapter-angular": patch
---

fix: correções de compilação no template de boas-vindas e novos inputs para componentes.

- Adicionado suporte a `[strong]` e `size` no `FyTextComponent`.
- Adicionado suporte a `[glow]` no `FyBadgeComponent`.
- Corrigido erro de visibilidade do `fylib` no template do schematic.
- Adicionados imports ausentes (`FySlotComponent`, `FyBadgeComponent`) no schematic.
- Corrigido uso de atributos de slot (removido `[]`) no template de boas-vindas.
- Ativado `fixedHeight` no layout de boas-vindas para garantir scroll interno.
