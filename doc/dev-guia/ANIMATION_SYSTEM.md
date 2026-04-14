# Sistema de Animações do fyLib

## Visão Geral

O pacote `@fylib/animation` é responsável por:
- Registrar animações nomeadas (`AnimationDefinition`).
- Registrar efeitos globais (`EffectDefinition`).
- Notificar plugins antes/depois de cada animação.
- Ser acionado pelos Adapters (Angular, React) quando um evento de UI ocorre.

O pacote `@fylib/theme` define, por tema, quais animações padrão cada componente deve usar em cada tipo de evento.

O pacote `@fylib/config` controla se animações estão ligadas/desligadas globalmente e por tipo de componente.

## Contratos Centrais

### Tipos centrais (`@fylib/core`, `@fylib/animation`, `@fylib/config`)

Contratos base de animação/efeito:

```ts
export interface AnimationDefinition {
  name: string;
  duration?: number;
  easing?: string;
  keyframes?: any;
}

export interface EffectDefinition {
  name: string;
  type: 'global' | 'local';
  params?: Record<string, any>;
}
```

Contratos de tema com animações por componente/evento:

```ts
export interface ThemeComponentAnimations {
  [componentSelector: string]: {
    [event: string]: string;
  };
}

export interface ThemeDefinition {
  name: string;
  tokens: DesignTokens;
  darkTokens?: DesignTokens;
  componentAnimations?: ThemeComponentAnimations;
}
```

Os nomes de animações específicos por componente/evento são tipados em `@fylib/animation` (por exemplo, `ButtonHoverAnimationName`, `InputFocusAnimationName`, `LayoutAnimationName`, `SidebarAnimationName`, `CardAnimationName`), enquanto os seletores, eventos de UI, nomes de tema e efeitos são tipados em `@fylib/config`:

- `ThemeName` – `'default' | 'finey-workbench-1' | 'finey-workbench-2' | 'windows-xp' | 'windows-7' | 'christmas'`.
- `ComponentSelector` – `'fy-button' | 'fy-input' | 'fy-layout' | 'fy-slot' | 'fy-slot:sidebar' | 'fy-card'`.
- `UIEventKey` – `'fy-button.click' | 'fy-input.focus' | 'fy-layout.enter' | 'fy-slot:sidebar.open' | 'fy-slot:sidebar.close' | 'fy-card.enter' | 'fy-card.submit'`.
- `EffectName` – `'confetti' | 'hearts' | 'window-open' | 'sidebar-slide-in' | 'sidebar-slide-out' | 'window-macos-sheet-open' | 'window-macos-sheet-close'`.

### Engine de Animações (`@fylib/animation`)

Arquivo: `packages/animation/src/engine.ts`

API principal:

```ts
animationEngine.registerAnimation(definition);
animationEngine.registerEffect(effect);
animationEngine.playAnimation(name);
animationEngine.triggerEffect(name, params?);
```

#### Parâmetros de Efeitos

Efeitos globais como `confetti` e `hearts` agora aceitam os seguintes parâmetros no objeto `params`:

- `intensity: number` – Quantidade de partículas (ex: `50`, `100`, `200`).
- `speed: number` – Multiplicador de velocidade da animação (ex: `0.5` para lento, `2.0` para rápido).
- `loop: boolean` – Se `true`, o efeito será executado continuamente até ser explicitamente parado.
- `id: string` – ID único para o loop de animação, permitindo que o sistema identifique e pare uma instância específica (ex: ao trocar de página ou destruir um componente).
- `stop: boolean` – Se `true`, para o efeito associado ao `id` informado.

Plugins:
- `AnimationPlugin` permite interceptar animações (onBeforeAnimation/onAfterAnimation).
- `GlobalEffectPlugin` permite reagir a efeitos do tipo `global`. Recebe o efeito completo com `params`.

#### Efeitos Disponíveis por Padrão

- `confetti`: Explosão de confetes coloridos baseada em Canvas.
- `hearts`: Chuva de corações coloridos baseada em Canvas (otimizado para o tema Puffy).
- `window-open`: Efeito visual de entrada de janela.
- `sidebar-slide-in` / `sidebar-slide-out`: Efeitos de transição para a barra lateral.

### Engine de Tema (`@fylib/theme`)

Arquivo: `packages/theme/src/engine.ts`

Além de resolver tokens, expõe:

```ts
themeEngine.getComponentAnimation(componentSelector: string, event: string): string | undefined;
themeEngine.getBackgroundEffect(): { name: string, intensity?: number, speed?: number, loop?: boolean } | undefined;
themeEngine.getWallpaper(): WallpaperDefinition | undefined;
```

#### Configuração de Efeitos de Fundo nos Temas

Os temas podem agora definir efeitos de fundo e papéis de parede padrão diretamente na sua definição (`ThemeDefinition`):

```ts
export const fineyPuffy1Theme: ThemeDefinition = {
  name: 'finey-puffy-1',
  backgroundEffect: {
    name: 'hearts',
    intensity: 100,
    speed: 1,
    loop: true
  },
  wallpaper: {
    name: 'hearts',
    type: 'pattern',
    opacity: 0.1
  },
  tokens: { ... }
};
```

Esses efeitos só serão ativados se as flags globais `themeEffectsEnabled` e `wallpaperEnabled` no `AppConfig` estiverem marcadas como `true`. Por padrão, ambas são `false` para garantir performance inicial.

Essa função:
- Lê o tema ativo.
- Procura `theme.componentAnimations?.[componentSelector]?.[event]`.
- Retorna o nome da animação, ou `undefined` se nada estiver configurado.

### Configuração Global (`@fylib/config`)

Contrato principal (arquivo de tipos centralizado em [`packages/config/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/config/src/types.ts)):

```ts
export type ThemeName =
  | 'default'
  | 'finey-workbench-1'
  | 'finey-workbench-2'
  | 'windows-xp'
  | 'windows-7'
  | 'christmas';

export type ComponentSelector =
  | 'fy-button'
  | 'fy-input'
  | 'fy-layout'
  | 'fy-slot'
  | 'fy-slot:sidebar'
  | 'fy-card';

export type UIEventKey =
  | 'fy-button.click'
  | 'fy-input.focus'
  | 'fy-layout.enter'
  | 'fy-slot:sidebar.open'
  | 'fy-slot:sidebar.close'
  | 'fy-card.enter'
  | 'fy-card.submit';

export type EffectName =
  | 'confetti'
  | 'hearts'
  | 'window-open'
  | 'sidebar-slide-in'
  | 'sidebar-slide-out'
  | 'window-macos-sheet-open'
  | 'window-macos-sheet-close';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface AppConfig {
  theme: ThemeName;
  animationsEnabled: boolean;
  themeEffectsEnabled?: boolean;
  wallpaperEnabled?: boolean;
  disableAnimationsForComponents?: ComponentSelector[];
  tokenOverrides?: DeepPartial<DesignTokens>;
  componentAnimationsOverrides?: ComponentAnimationsOverrides;
  effectsEnabled?: boolean;
  disableEffectsForComponents?: ComponentSelector[];
  effectTriggers?: Partial<Record<UIEventKey, EffectName>>;
}
```

No Angular:
- o arquivo `public/fylib/theme-control/theme-controller.json` pode alimentar essa configuração via HTTP.
- a configuração recomendada é via arquivos TypeScript na pasta `src/fylib/` (ex: `theme.config.ts`), que são gerados automaticamente pelo comando `ng add @fylib/adapter-angular`.

Exemplo de uso no JSON:

```json
{
  "theme": "default",
  "animationsEnabled": true,
  "themeEffectsEnabled": false,
  "wallpaperEnabled": false,
  "disableAnimationsForComponents": [],
  "tokenOverrides": {},
  "componentAnimationsOverrides": {
    "fy-button": {
      "hover": "button-hover-soft",
      "click": "button-click-press"
    }
  }
}
```

As strings das animações devem corresponder aos nomes registrados em `@fylib/animation` (por exemplo: `button-hover-soft`, `button-hover-glow`, `button-click-press`, `button-click-ripple`).

## Ciclo de Decisão de Animações

Para qualquer componente UI (ex.: `fy-button`, `fy-layout`, `fy-slot`), a engine decide se anima uma interação seguindo esta ordem:

1. **Config Global (`animationsEnabled`)**
   - Se `false`, nenhuma animação é executada em lugar nenhum.

2. **Lista de Componentes Desativados (`disableAnimationsForComponents`)**
   - Se o seletor estiver na lista (ex.: `"fy-button"`), as animações são desligadas por padrão para aquele tipo.

3. **Input de Instância (`activeAnimations`)**
   - Se `false`, aquela instância específica não anima, mesmo que o tipo esteja habilitado.
   - Se `true`, força o uso da configuração global daquele seletor.
   - Se `null` ou não definido, apenas segue o estado global do seletor.

4. **Mapa de Animações por Tema (`componentAnimations`)**
   - Se tudo estiver habilitado, o Adapter consulta o tema:
     - `themeEngine.getComponentAnimation('fy-button', 'hover')`
     - `themeEngine.getComponentAnimation('fy-layout', 'enter')`
   - Se houver um nome configurado, o Adapter chama:
     - `animationEngine.playAnimation(nome)` via `FyLibService`.

Se qualquer uma dessas etapas bloquear a animação, nada é executado para aquele evento.

## Ciclo de Decisão de Efeitos de Fundo (Background Effects)

Para efeitos de fundo globais (ex.: `hearts`, `confetti`), a engine segue:

1. **Config Global (`themeEffectsEnabled`)**
   - Se `false`, efeitos pré-definidos nos temas são ignorados por padrão.

2. **Presença da Propriedade (`bgEffect`)**
   - O efeito de fundo só será processado se a propriedade `bgEffect` estiver presente no componente (ex: `<fy-layout bgEffect>`).

3. **Resolução de Valor**:
   - Se `bgEffect` for omitido ou for `"auto"`/`""`, o sistema utiliza o efeito padrão do tema (`backgroundEffect`).
   - Se for passado um nome específico (ex: `bgEffect="confetti"`), este terá prioridade total.

## Ciclo de Decisão de Wallpapers

O sistema de wallpapers segue uma lógica idêntica aos efeitos de fundo:

1. **Config Global (`wallpaperEnabled`)**
   - Se `false`, nenhum papel de parede é renderizado.

2. **Presença da Diretiva (`fyWallpaper`)**
   - O papel de parede só será processado se a diretiva `fyWallpaper` estiver presente no elemento.

3. **Resolução de Valor**:
   - Se a diretiva for usada sem valor ou com `"auto"`/`""`, utiliza o wallpaper padrão do tema (`wallpaper`).
   - Se for passado um nome específico (ex: `fyWallpaper="geometric"`), este terá prioridade total.

### Integração com o Adapter Angular

### Serviço Central (`FyLibService`)

Arquivo: `packages/adapters/angular/src/services/fylib.service.ts`

Funções relevantes (com tipos fortes):

```ts
isAnimationsEnabledFor(componentSelector: ComponentSelector): boolean;
playAnimation(name: string): void;
triggerEffect(name: string, params?: Record<string, any>): void;
triggerEffectForEvent(eventKey: UIEventKey, componentSelector?: ComponentSelector, instanceFlag?: boolean | null): void;
getComponentAnimation(componentSelector: ComponentSelector, event: string): string | undefined;
getThemeBackgroundEffect(): any;
getThemeWallpaper(): any;
isEffectsEnabledFor(componentSelector: ComponentSelector, instanceFlag: boolean | null | undefined): boolean;
```

`isAnimationsEnabledFor` considera:
- `animationsEnabled` global.
- `disableAnimationsForComponents`.

`getComponentAnimation` delega para `themeEngine.getComponentAnimation`.

`triggerEffectForEvent(eventKey, effectName?, selector?, instanceFlag?)` aplica a regra de prioridade:
- Se existir `config.effectTriggers[eventKey]`, ele prevalece para TODOS os componentes daquele seletor.
- Caso contrário, usa `effectName` passado pela instância do componente como fallback (apenas para o seletor corrente).
- Se nenhum existir, não dispara efeito.

Eventos recomendados (tipados em `UIEventKey`):
- `'fy-layout.enter'`
- `'fy-slot:sidebar.open'` / `'fy-slot:sidebar.close'`
- `'fy-button.click'`
- `'fy-input.focus'`
- `'fy-card.submit'`

`isEffectsEnabledFor` aplica as regras:
- `effectsEnabled === false` desliga tudo.
- `disableEffectsForComponents` desativa por seletor.
- `instanceFlag === false` desativa apenas a instância do componente.

Efeitos globais padrão registrados (`EffectName`):
- `confetti`
- `hearts`
- `window-open`
- `sidebar-slide-in`
- `sidebar-slide-out`
- `window-macos-sheet-open`
- `window-macos-sheet-close`

#### Parâmetros de Efeitos Globais (`params`)
Efeitos como `confetti` e `hearts` aceitam parâmetros para customização:
- `intensity`: Quantidade de partículas.
- `speed`: Velocidade da animação.
- `loop`: Se deve repetir infinitamente.
- `id`: Identificador único para controle do ciclo de vida.
- `stop`: Se `true`, interrompe o efeito com o `id` correspondente.

### Diretiva de Animação (`FyAnimationDirective`)

### Animações padrão atualizadas
- Header: `'header-menu-dropdown-in'`, `'header-menu-dropdown-out'` (preferidas no lugar de variantes `slide-in/out`).
- Sidebar: `'sidebar-slide-in'`, `'sidebar-slide-out'`.
- Card: `'card-fade-in'` como default de entrada.
- Input: `'input-focus-glow'` (pode ler cor base do `--fy-colors-primary-rgb`).
- Layout: `'layout-enter'` (disparado em `'fy-layout.enter'`).

Arquivo: `packages/adapters/angular/src/directives/animation.directive.ts`

```ts
@Directive({
  selector: '[fyAnimation]',
  standalone: true
})
export class FyAnimationDirective {
  @Input('fyAnimation') animationName!: string;

  play() {
    if (this.animationName) {
      animationEngine.playAnimation(this.animationName);
      this.el.nativeElement.classList.add(`fy-anim-${this.animationName}`);
    }
  }
}
```

Essa diretiva é útil para cenários onde o componente precisa acionar animações diretamente em um elemento específico.

### Exemplo: fy-button

Arquivo: `packages/adapters/angular/src/components/button.component.ts`

Inputs de controle:
- `activeAnimations?: boolean | null`
- `customStyles?: Record<string, string>`

Durante hover/click, o componente faz:

```ts
const animationName = this.resolveAnim('hover', this.hoverAnimation, (ButtonDefinition.features as any)?.animations?.hover);
if (animationName) this.fylib.playAnimation(animationName);
```

Respeitando antes `resolveAnimationsActive()` que consulta a configuração global.

### Exemplo: fy-slot (sidebar)

Arquivo: `packages/adapters/angular/src/layouts/slot.component.ts`

- `name="sidebar"` controla abertura/fechamento.
- Em `toggleSidebar()`:
  - Escolhe o evento `open` ou `close` com base no estado.
  - Consulta `this.resolveAnim(event, undefined, (SlotDefinition.features as any)?.animations?.[event])`.
  - Executa a animação se configurada.

### Exemplo: fy-layout

Arquivo: `packages/adapters/angular/src/layouts/layout.component.ts`

- Implementa `OnInit`.
- No `ngOnInit`, se animações estiverem ativas, consulta:

```ts
const animationName = this.resolveAnim('enter', undefined, (LayoutDefinition.features as any)?.animations?.enter);
if (animationName) this.fylib.playAnimation(animationName);
```

Resultado: o layout pode ter um efeito de entrada padrão definido por tema.

### Exemplo: fy-input

- Componente: `packages/adapters/angular/src/components/input.component.ts`.
- Eventos observados:
  - `focus` → animação de foco (`focusAnimation` ou tema/config).
  - Mudança de `status` (`default`, `success`, `error`) → animações de estado.
- Inputs relevantes:
  - `activeAnimations?: boolean | null`.
  - `focusAnimation?: InputFocusAnimationName`.
  - `successAnimation?: InputStateAnimationName`.
  - `errorAnimation?: InputStateAnimationName`.

Fluxo simplificado:

```ts
const focus = this.resolveFocusAnimation();           // instancia > config > tema
const state = this.resolveStateAnimation();           // instancia > config > tema

// No foco, dispara a animação registrada na engine se existir
if (this.resolveAnimationsActive()) {
  const name = this.resolveFocusAnimation();
  if (name) this.fylib.playAnimation(name);
}
```

## Como o Tema Define Animações Default por Componente

No tema padrão (`defaultTheme`), o campo `componentAnimations` define as animações padrão:

```ts
componentAnimations: {
  'fy-button': {
    hover: 'button-hover-soft',
    click: 'button-click-press',
    success: 'button-success-pulse',
    error: 'button-error-shake'
  },
  'fy-layout': {
    enter: 'layout-fade-in'
  },
  'fy-slot:sidebar': {
    open: 'sidebar-slide-in',
    close: 'sidebar-slide-out'
  }
}
```

Se você criar um novo tema, pode:
- Reutilizar esses nomes de animação.
- Ou apontar para animações diferentes, desde que registradas em `@fylib/animation`.

## Animações Default Registradas

Arquivo: `packages/animation/src/default-animations.ts`

Animações registradas:

- `button-hover-soft`
- `button-hover-glow`
- `button-hover-lift`
- `button-hover-macos-soft`
- `button-click-press`
- `button-click-ripple`
- `button-click-macos-press`
- `button-success-pulse`
- `button-success-macos-pulse`
- `button-error-shake`
- `button-error-macos-shake`
- `layout-fade-in`
- `layout-macos-window-enter`
- `sidebar-slide-in`
- `sidebar-slide-out`
- `sidebar-macos-slide-in`
- `sidebar-macos-slide-out`
- `input-focus-glow`
- `input-focus-soft`
- `input-focus-macos-glow`
- `input-success-pulse`
- `input-success-macos-pulse`
- `input-error-shake`
- `input-error-macos-shake`

Essas animações definem apenas metadados (`duration`, `easing`). Cabe ao Adapter ou plugins aplicar classes CSS ou Web Animations conforme necessário.

## Como Criar um Novo Componente e Integrar Animações

Passos recomendados para um colaborador do fyLib:

1. **Definir o Componente no Catálogo (`@fylib/catalog`)**
   - Criar `MyComponentProps`.
   - Criar `MyComponentDefinition` com `features.animations` se quiser metadados específicos (opcional).

2. **Registrar Animações em `@fylib/animation`**
   - Adicionar entradas em `default-animations.ts` ou em outro módulo.
   - Exemplo:
     ```ts
     animationEngine.registerAnimation({
       name: 'card-hover-lift',
       duration: 200,
       easing: 'ease-out'
     });
     ```

3. **Associar Animações ao Tema (`@fylib/theme`)**
   - No tema desejado, adicionar em `componentAnimations`:
     ```ts
     componentAnimations: {
       'fy-card': {
         hover: 'card-hover-lift'
       }
     }
     ```

4. **Implementar o Componente no Adapter Angular**
   - Criar `FyCardComponent` seguindo o padrão:
     - Inputs de negócio (props).
     - `activeAnimations?: boolean | null`.
     - `customStyles?: Record<string, string>`.
   - Injetar `FyLibService`.
   - Nos eventos relevantes (hover, click, etc.):
     - Checar `resolveAnimationsActive()`.
     - Consultar `getComponentAnimation('fy-card', 'hover')`.
     - Chamar `playAnimation` se houver um nome configurado.

5. **Respeitar a Configuração Global**
   - Certificar-se de que o componente usa `isAnimationsEnabledFor('fy-card')` internamente para desativar animações quando necessário.

Seguindo esses passos, qualquer novo componente criado para o fyLib ficará alinhado com o sistema de animações: configurável por tema, controlável globalmente e ajustável por instância.
