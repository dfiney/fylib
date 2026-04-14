# Criação de um Componente no fyLib

## Etapa 1 — Reserva de Componente
- Objetivo: reservar nomes, contratos e pontos de integração para o novo componente antes da implementação.
- Passos:
  - Catálogo:
    - Criar `packages/catalog/src/components/<nome>/index.ts` com `UIComponentDefinition` (`name`, `version`, `defaultProps`, `variants`, `features`).
    - Exportar o Definition em `packages/catalog/src/index.ts`.
  - Tipagens globais:
    - Adicionar o selector em `ComponentSelector` e eventos em `UIEventKey` em [`packages/config/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/config/src/types.ts).
    - Se necessário, adicionar unions de nomes de animação por evento em `@fylib/animation`.
  - Tema:
    - Mapear animações padrão do componente/evento em `ThemeDefinition.componentAnimations` no tema ativo (ex.: `default`).
    - Ajustar tokens necessários em `ThemeDefinition.tokens` (cores, spacing, layout, efeitos).
  - Engine de animações/efeitos:
    - Registrar nomes semânticos em `default-animations.ts` e `effects/default-effects.ts` quando aplicável.
  - Adapter (reserva):
    - Criar `packages/adapters/angular/src/components/<nome>.component.ts` como componente standalone vazio estendendo `BaseFyComponent`.
    - Exportar em `packages/adapters/angular/src/index.ts`.
  - Testes (reserva):
    - Criar arquivo de teste unitário `*.test.ts` para utilitários ou `*.spec.ts` para o componente.

**Dica de Produtividade**: Em novos projetos, use o comando `ng add @fylib/adapter-angular` para configurar o ambiente de desenvolvimento do fyLib automaticamente.

## Etapa 2 — Implementação do Componente
- Objetivo: implementar props específicas, renderização e integração com tema/animações/efeitos.
- Passos:
  - Estrutura do componente:
    - Classe: `export class Fy<Nome>Component extends BaseFyComponent<'fy-<nome>'>`.
    - Construtor: `super(inject(FyLibService), 'fy-<nome>')`.
    - Inputs comuns: `activeAnimations`, `activeEffects`, `customStyles`.
    - Inputs específicos: conforme `defaultProps` do catálogo.
    - Props de efeitos por evento (quando aplicável).
  - Acessibilidade (A11y):
    - Implementar atributos ARIA (`aria-*`) e papéis (`role`).
    - Adicionar suporte a teclado (`Enter`/`Space`) e gerenciamento de foco.
  - Template:
    - Aplicar classes por variante/tamanho/estado.
    - Utilizar obrigatoriamente a sintaxe de controle de fluxo moderna (`@if`, `@for`).
    - Compor classes de animação com `this.composeAnimClasses(...)`.
    - Disparar animações via `this.resolveAnim(event, instanceOverride, definitionFallback)` + `fylib.playAnimation`.
    - Disparar efeitos:
      - Instância: `this.triggerDirect(effectName, activeEffects)`
      - Global: `this.triggerByEvent('fy-<nome>.<evento>', activeEffects)`
    - Suporte a Wallpapers/Background Effects: aplicar diretiva `fyWallpaper` ou prop `bgEffect` se o componente for um container. **Nota**: Só serão renderizados se as flags globais no `AppConfig` estiverem ativas e o uso for explícito no template.
  - Testes Automatizados:
    - Implementar testes de renderização e comportamento.
    - Validar obrigatoriamente a conformidade A11y nos testes.
  - Estilos:
    - Usar variáveis CSS de tokens (`--fy-colors-*`, `--fy-layout-*`, `--fy-effects-*`).
    - Expor `@HostBinding('style') get hostStyles()` com `this.getHostStyles(customStyles)`.
  - Integração com catálogo:
    - Reutilizar `defaultProps` e `features.animations` como fallback quando tema/config não definirem.
  - Exportação:
    - Garantir export em `packages/adapters/angular/src/index.ts`.
  - Verificação Final:
    - Executar `tools/test-all.bat` para garantir que o novo componente não introduziu regressões.

## Padrões de Estilização
- Usar Design Tokens do tema via CSS variables.
- Evitar estilos hardcoded; preferir tokens e classes de variante/tamanho.
- Manter transições/animações desligáveis via `activeAnimations` e AppConfig.

## Padrões de Comportamento e Interação
- Ordem de decisão de animações: instância → AppConfig overrides → tema → Definition.features.
- Efeitos: prop da instância tem prioridade; caso ausente, usar `AppConfig.effectTriggers`.
- Resolução comum via `BaseFyComponent` e `interaction.utils`.

## Arquivos Envolvidos
- Catálogo: `packages/catalog/src/components/<nome>/index.ts`, `packages/catalog/src/index.ts`
- Tipagens: `packages/config/src/types.ts`
- Tema: `packages/theme/src/themes/<tema>.ts` (ou registro equivalente)
- Animações/Efeitos: `packages/animation/src/default-animations.ts`, `packages/animation/src/effects/default-effects.ts`
- Adapter Angular: `packages/adapters/angular/src/components/<nome>.component.ts`, `packages/adapters/angular/src/index.ts`

