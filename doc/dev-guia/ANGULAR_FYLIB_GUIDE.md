# Guia de Uso do fyLib no Angular

## Visão Geral
- `@fylib/catalog`: define contratos dos componentes (props, variantes).
- `@fylib/theme`: registra temas e gera Design Tokens.
- `@fylib/config`: expõe o contrato tipado `AppConfig` (tema, animações, efeitos, overrides) e lê a configuração ativa (via JSON ou objeto TS).
- `@fylib/adapter-angular`: transforma contratos em componentes Angular (`fy-button`, `fy-input`, `fy-layout`, `fy-slot`, `fy-card`).

## Padrão Base de Componente
- Todos os componentes podem herdar funcionalidades comuns via `BaseFyComponent`:
  - Resolução de animações (`instância → config → tema → Definition`)
  - Disparo de efeitos por evento ou direto
  - Composição de classes de animação e aplicação de estilos inline
- Arquivo: [`packages/adapters/angular/src/base/base-component.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/base/base-component.ts)
- Exemplo de herança: [`FyButtonComponent`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/components/button.component.ts), [`FyInputComponent`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/components/input.component.ts)

## Efeitos por Componente
- Além dos `effectTriggers` globais no `AppConfig`, cada componente aceita props de efeitos por evento:
  - Button: `hoverEffect`, `clickEffect`, `successEffect`, `errorEffect`
  - Input: `focusEffect`, `successEffect`, `errorEffect`
  - Card: `submitEffect`
  - Layout: `enterEffect`
  - Slot (sidebar): `openEffect`, `closeEffect`
- Prioridade: mapeamento global (`AppConfig.effectTriggers`) > prop da instância

## Configuração Global de Tema (AppConfig)

No Angular, a configuração global do fyLib é baseada no contrato tipado `AppConfig` exposto por `@fylib/config`. Você pode fornecer essa configuração de duas formas:

1. **Objeto TypeScript** (modo recomendado no playground Angular).
2. **Arquivo JSON externo** (útil para remote config/polling em produção).

### 1. Objeto TypeScript (playground Angular)

Local no playground Angular:

- [`examples/angular/playground/src/fylib/theme-controller.config.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/examples/angular/playground/src/fylib/theme-controller.config.ts)

Exemplo simplificado:

```ts
import { AppConfig } from '@fylib/config';

export const themeControllerConfig: AppConfig = {
  theme: 'christmas',
  animationsEnabled: true,
  effectsEnabled: true,
  disableAnimationsForComponents: [],
  disableEffectsForComponents: [],
  tokenOverrides: {
    // colors: { primary: '#ff0000' }
  },
  componentAnimationsOverrides: {},
  effectTriggers: {
    'fy-button.click': 'confetti'
  }
};
```

Ao usar `AppConfig`, você ganha IntelliSense para:
- Nomes de tema (`ThemeName`).
- Seletores de componentes (`ComponentSelector`).
- Eventos de UI (`UIEventKey`).
- Nomes de efeitos (`EffectName`).
- Estrutura de tokens (`DesignTokens` via `DeepPartial`).

### 2. Arquivo JSON (theme-controller.json) – opcional

Local esperado para leitura via HTTP (quando habilitado):

- `public/fylib/theme-control/theme-controller.json`

Formato compatível com `AppConfig`:

```json
{
  "theme": "default",
  "animationsEnabled": true,
  "effectsEnabled": true,
  "disableAnimationsForComponents": ["fy-button"],
  "disableEffectsForComponents": [],
  "tokenOverrides": {
    "colors": {
      "primary": "#f23400ff"
    },
    "layout": {
      "header": {
        "height": "72px"
      }
    }
  },
  "componentAnimationsOverrides": {
    "fy-button": {
      "hover": "button-hover-soft",
      "click": "button-click-press"
    },
    "fy-input": {
      "focus": "input-focus-glow",
      "error": "input-error-shake"
    }
  },
  "effectTriggers": {
    "fy-button.click": "confetti",
    "fy-input.focus": "confetti",
    "fy-layout.enter": "window-open",
    "fy-slot:sidebar.open": "sidebar-slide-in",
    "fy-slot:sidebar.close": "sidebar-slide-out"
  }
}
```

Campos (tipados em `AppConfig`):
- `theme: ThemeName` – nome do tema registrado na engine (`default`, `christmas`, `windows-xp`, `windows-7`, `finey-workbench-1`, etc).
- `animationsEnabled: boolean` – liga/desliga TODAS as animações/transitions da biblioteca.
- `effectsEnabled?: boolean` – liga/desliga todos os efeitos globais.
- `disableAnimationsForComponents?: ComponentSelector[]` – lista de seletores (`'fy-button'`, `'fy-layout'`, `'fy-slot'`, `'fy-slot:sidebar'`, `'fy-card'`) que terão animações desativadas globalmente.
- `disableEffectsForComponents?: ComponentSelector[]` – lista de seletores com efeitos desativados globalmente.
- `tokenOverrides?: DeepPartial<DesignTokens>` – árvore parcial de tokens para sobrescrever medidas/cores/efeitos do tema ativo.
- `componentAnimationsOverrides?: ComponentAnimationsOverrides` – mapa de animações por componente/evento que sobrescreve as animações sugeridas pelo tema.
- `effectTriggers?: Partial<Record<UIEventKey, EffectName>>` – mapa de eventos de UI para efeitos globais cadastrados na engine.

### Tokens de Tema Relevantes

Grupo `colors`:
- `primary`, `secondary`, `success`, `danger`, `warning`, `info`.
- `background`, `text`, `white`, `black`.
- `primary-rgb`: usado para variações de opacidade.

Grupo `spacing`:
- `xs`, `sm`, `md`, `lg`, `xl`.

Grupo `borderRadius`:
- `sm`, `md`, `lg`, `full`.

Grupo `typography.fontSize`:
- `sm`, `md`, `lg`.

Grupo `typography.fontWeight`:
- `normal`, `bold`.

Grupo `layout`:
- `app.gap`: espaçamento entre áreas do `app-layout`.
- `header.height`: altura mínima do header.
- `header.padding`: padding horizontal do header.
- `header.shadow`: sombra aplicada ao header.
- `header.toggle.*`: controla o botão hamburguer do header:
  - `background`, `textColor`, `borderRadius`, `icon`.
- `sidebar.width`: largura da sidebar.
- `sidebar.padding`: padding interno da sidebar.
- `sidebar.toggle.*`: controla o botão de toggle da sidebar:
  - `background`, `textColor`, `borderRadius`, `icon`.
  - `mode`: `'floating' | 'tongue'`.
  - `tonguePosition`: `'top' | 'middle' | 'bottom'` quando `mode="tongue"`.
- `content.padding`: padding da região de conteúdo.

Todos os tokens são expostos como variáveis CSS seguindo o padrão:

- `colors.primary` → `--fy-colors-primary`
- `layout.header.height` → `--fy-layout-header-height`
- `layout.header.toggle.background` → `--fy-layout-header-toggle-background`
- `layout.sidebar.toggle.borderRadius` → `--fy-layout-sidebar-toggle-borderRadius`

## Componentes Disponíveis no Adapter Angular

Todos os componentes Angular do adapter são **standalone** e são exportados por:

- `@fylib/adapter-angular`

```ts
import { FyLayoutComponent, FySlotComponent, FyButtonComponent, FyInputComponent } from '@fylib/adapter-angular';
```

Você pode:
- Usar em **páginas standalone** (sem módulos).
- Reaproveitar em **componentes compartilhados** (menus, headers, forms).
- Compor layouts totalmente dirigidos por tema + config.

---

### fy-layout (layout de página)

Selector:
- `fy-layout`

Inputs:
- `name: 'app-layout' | string` – define o contrato de layout (por padrão, a implementação usa o `AppLayoutDefinition` do catálogo).
- `activeAnimations?: boolean | null` – controla animações deste layout.
  - `null` (default): usa o valor global + config por componente.
  - `false`: desativa animações apenas deste layout.
- `activeEffects?: boolean | null` – aplica a mesma regra de efeitos (globais, por componente, por instância).
- `customStyles?: Record<string, string>` – estilos inline aplicados no container raiz do layout (`[ngStyle]`).

Classes/estrutura:
- `fy-layout fy-layout--app-layout`.
- Usa CSS Grid com áreas: `header`, `sidebar`, `content`, `footer`.

Uso básico em uma página standalone:

```ts
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FyLayoutComponent, FySlotComponent],
  template: `
    <fy-layout name="app-layout">
      <fy-slot name="header">
        <!-- seu header -->
      </fy-slot>

      <fy-slot name="sidebar">
        <!-- navegação lateral -->
      </fy-slot>

      <fy-slot name="content">
        <!-- conteúdo principal -->
      </fy-slot>
    </fy-layout>
  `
})
export class DashboardComponent {}
```

---

### fy-slot (regiões do layout)

Selector:
- `fy-slot`

Inputs:
- `name: 'header' | 'sidebar' | 'content' | 'footer' | string` – mapeia para `grid-area`.
- `activeAnimations?: boolean | null` – mesma regra do `fy-layout`.
- `activeEffects?: boolean | null` – mesma regra de efeitos.
- `customStyles?: Record<string, string>` – estilos inline aplicados diretamente no host (`fy-slot`).
- `fixedSidebar?: boolean | null` – quando `name="sidebar"`, permite fixar a coluna lateral conforme o layout.
- `copyrightText?: string | null`
  - Pode ser usado em `header` e `sidebar`.
  - Renderiza um texto como: `"Minha Empresa © 2026"` com brilho suave se animações estiverem ativas.

Comportamento:
- `name="header"`:
  - Usa variáveis de layout: `--fy-layout-header-height`, `--fy-layout-header-padding`, `--fy-layout-header-shadow`.
  - Em telas grandes: header horizontal ocupando 100% da largura.
  - Em telas pequenas: o conteúdo principal do header colapsa e é aberto/fechado por um botão hamburguer.
  - O copyright, quando configurado, fica fixo na faixa de header (não entra no menu).
- `name="sidebar"`:
  - Desktop: coluna fixa (`--fy-layout-sidebar-width`).
  - Mobile: overlay deslizante com toggle flutuante.
  - Dispara animações e efeitos configurados para `fy-slot:sidebar.open` e `fy-slot:sidebar.close` via `effectTriggers`.
  - Possui duas áreas internas:
    - Área de links com `overflow-y: auto`.
    - Footer independente com divisor muted e possibilidade de outro scroll interno.
  - Aceita projeção de um footer separado usando atributo `[fy-sidebar-footer]`.
- `name="content"`:
  - Usa `--fy-layout-content-padding`.

Exemplo: header com nav responsiva e copyright:

```html
<fy-slot
  name="header"
  [copyrightText]="'Minha Empresa'"
>
  <header class="app-header">
    <div class="app-header__logo">Minha App</div>
    <nav class="app-header__nav">
      <fy-nav-link label="Home" to="/"></fy-nav-link>
      <fy-nav-link label="Dashboard" to="/dashboard"></fy-nav-link>
    </nav>
  </header>
</fy-slot>
```

Exemplo: sidebar com links + footer e copyright:

```html
<fy-slot
  name="sidebar"
  [fixedSidebar]="true"
  [activeAnimations]="true"
  [activeEffects]="true"
  [customStyles]="{ backgroundColor: 'var(--fy-colors-surface)' }"
  [copyrightText]="'Minha Empresa'"
>
  <nav class="app-sidebar">
    <div class="app-sidebar__section">
      <fy-nav-link label="Home" to="/"></fy-nav-link>
      <fy-nav-link label="Configurações" to="/settings"></fy-nav-link>
    </div>
    <div class="app-sidebar__section">
      <fy-nav-link label="Relatórios" to="/reports"></fy-nav-link>
    </div>
  </nav>

  <div fy-sidebar-footer>
    <button type="button" class="app-sidebar__footer-btn">
      Sair da conta
    </button>
  </div>
</fy-slot>
```

No exemplo acima:
- Os links herdam tokens do tema (`colors`, `spacing`, `borderRadius`).
- O footer do sidebar fica isolado e com seu próprio bloco de scroll se necessário.

---

### fy-button (botão de ação)

Selector:
- `fy-button`

Inputs principais (vindos do catálogo):
- `label: string`
- `variant: 'primary' | 'secondary' | 'ghost' | 'danger' | ...`
- `size: 'sm' | 'md' | 'lg'`
- `disabled: boolean`
- `loading: boolean`
- `icon?: string`

Inputs de controle de UI:
- `activeAnimations?: boolean | null`
  - `null`: respeita config global + lista `disableAnimationsForComponents`.
  - `false`: desativa animações apenas deste botão.
- `activeEffects?: boolean | null` – controla disparo de efeitos para esta instância.
- `customStyles?: Record<string, string>`
  - Aplicado via `[ngStyle]` no elemento `<button>`.
  - Sempre sobrescreve o CSS padrão.
- `hoverAnimation?: ButtonHoverAnimationName`
- `clickAnimation?: ButtonClickAnimationName`
- `successAnimation?: ButtonStateAnimationName`
- `errorAnimation?: ButtonStateAnimationName`

Outputs:
- `fyClick: EventEmitter<void>`

Animações e efeitos:
- A animação de hover/click é resolvida na seguinte ordem:
  1. Inputs explícitos (`hoverAnimation`/`clickAnimation`).
  2. `componentAnimationsOverrides["fy-button"]` no `theme-controller.json`.
  3. Animações padrão do tema ativo (`componentAnimations` do tema).
  4. Metadados de `ButtonDefinition.features.animations`.
- Após `fyClick`, o componente chama `triggerByEvent('fy-button.click', this.clickEffect, this.activeEffects)`, permitindo disparar efeitos globais via `effectTriggers` ou usar o efeito da instância como fallback.

Uso básico:

```html
<fy-button label="Salvar" variant="primary"></fy-button>
```

Controlando animações/effects por instância:

```html
<fy-button
  label="Enviar"
  variant="primary"
  size="lg"
  [activeAnimations]="true"
  [activeEffects]="true"
  [hoverAnimation]="'button-hover-glow'"
  [clickAnimation]="'button-click-press'"
  [customStyles]="{ minWidth: '160px' }"
  (fyClick)="onSubmit()"
></fy-button>
```

Usando o contrato do catálogo com callbacks:

```html
<fy-button
  label="Excluir"
  variant="danger"
  [onClick]="handleDelete"  <!-- callback de catálogo -->
></fy-button>
```

```ts
handleDelete = () => {
  // lógica de deleção
};
```

Adicionar ícone sem classes (sem digitar nomes de classes):

```html
<fy-button
  label="Buscar"
  variant="secondary"
  iconName="search"
></fy-button>
```

---

### fy-input (campo de formulário)

Selector:
- `fy-input`

Inputs principais (vindos do catálogo):
- `value?: string`
- `placeholder?: string`
- `type?: 'text' | 'password' | 'email' | 'number' | 'search'`
- `disabled?: boolean`
- `readonly?: boolean`
- `mask?: string` – máscara simples baseada em dígitos (`9`) aplicada no `input`.
- `showPasswordToggle?: boolean` – quando `type="password"`, exibe botão para alternar visibilidade.
- `iconLeft?: string` – classe de ícone aplicada à esquerda.
- `iconRight?: string` – classe de ícone aplicada à direita.
- `size?: 'sm' | 'md' | 'lg'`
- `status?: 'default' | 'success' | 'error'`

Inputs de controle de UI:
- `activeAnimations?: boolean | null`
- `activeEffects?: boolean | null`
- `customStyles?: Record<string, string>`
- `focusAnimation?: InputFocusAnimationName`
- `successAnimation?: InputStateAnimationName`
- `errorAnimation?: InputStateAnimationName`

Outputs:
- `fyInput: EventEmitter<string>`
- `fyChange: EventEmitter<string>`
- `fyFocus: EventEmitter<void>`
- `fyBlur: EventEmitter<void>`

Animações e efeitos:
- Animações de foco/estado são resolvidas na ordem:
  1. Inputs explícitos (`focusAnimation`, `successAnimation`, `errorAnimation`).
  2. `componentAnimationsOverrides["fy-input"]` no `theme-controller.json`.
  3. Animações padrão do tema ativo.
  4. Metadados de `InputDefinition.features.animations`.
- No evento de foco, o componente dispara `triggerEffectForEvent('fy-input.focus')`, permitindo acionar efeitos globais configurados.

Uso controlado por template:

```html
<fy-input
  [(ngModel)]="username"
  placeholder="Usuário"
  iconLeftName="user"
  size="md"
  status="default"
  [activeAnimations]="true"
  [activeEffects]="true"
  (fyInput)="onUsernameInput($event)"
></fy-input>
```

Uso com callbacks do catálogo:

```html
<fy-input
  [value]="email"
  placeholder="E-mail"
  type="email"
  [onInput]="handleEmailInput"
  [onChange]="handleEmailChange"
></fy-input>
```

```ts
handleEmailInput = (value: string) => {
  this.email = value;
};

handleEmailChange = (value: string) => {
  // ex: disparar analytics
};
```

Uso com reactive forms:

```html
<form [formGroup]="form">
  <fy-input
    formControlName="password"
    type="password"
    [showPasswordToggle]="true"
    placeholder="Senha"
    size="md"
    status="default"
  ></fy-input>
</form>
```

```ts
form = new FormGroup({
  password: new FormControl('', { nonNullable: true })
});

---

### fy-nav-link (links com estilo do tema, sem classes)

Selector:
- `fy-nav-link`

Inputs:
- `label: string`
- `to?: string` – URL interna (renderiza `href` com esse valor).
- `href?: string` – URL externa.
- `target?: '_blank' | '_self' | ...'`
- `active?: boolean` – força estado ativo visual independentemente da rota.
- `hoverEnabled?: boolean` – desativa hover visual se precisar.

Uso em header:

```html
<fy-slot name="header">
  <nav class="app-header__nav">
    <fy-nav-link label="Home" to="/"></fy-nav-link>
    <fy-nav-link label="Dashboard" to="/dashboard"></fy-nav-link>
  </nav>
</fy-slot>
```

Uso em sidebar:

```html
<fy-slot name="sidebar">
  <fy-nav-link label="Documentação" href="https://minhaempresa.com/docs" target="_blank"></fy-nav-link>
</fy-slot>
```

## Como o Controle de Animações Funciona

Ordem de decisão:
- Flag global `animationsEnabled` do `theme-controller.json`.
- Lista `disableAnimationsForComponents` (ex: `["fy-button"]`).
- Input `activeAnimations` em cada componente (`fy-button`, `fy-layout`, `fy-slot`, `fy-input`).
- Overrides de `componentAnimationsOverrides` por seletor/evento.

Regra final:
- Se `animationsEnabled` for `false` → tudo fica sem animação.
- Se `animationsEnabled` for `true`:
  - Se o seletor do componente estiver em `disableAnimationsForComponents` → animações desativadas.
  - Senão:
    - `activeAnimations === false` → desativado apenas para aquela instância.
    - `activeAnimations === true` ou `null` → segue configuração global daquele seletor.
- Depois de decidido se anima ou não, o nome da animação é obtido respeitando a ordem descrita em cada componente (inputs → overrides do config → tema → metadados do catálogo).

Tecnicamente:
- Quando animações estão desativadas para um elemento, a classe `.fy-animations-disabled` é aplicada ao host.
- O CSS global garante:

```css
.fy-animations-disabled,
.fy-animations-disabled * {
  transition: none !important;
  animation: none !important;
}
```

## Exemplo Completo de Uso

Template:

```html
<fy-layout name="app-layout" [customStyles]="{ backgroundColor: '#f9fafb' }">
  <fy-slot name="header">
    <!-- header customizado -->
  </fy-slot>

  <fy-slot name="sidebar" [activeAnimations]="false">
    <!-- sidebar sem animações -->
  </fy-slot>

  <fy-slot name="content">
    <fy-button
      label="Salvar"
      variant="primary"
      [activeAnimations]="false"
      [customStyles]="{ borderRadius: '2px', padding: '4px 12px' }"
    ></fy-button>
  </fy-slot>
</fy-layout>
```

Config global:

```json
{
  "theme": "default",
  "animationsEnabled": true,
  "effectsEnabled": true,
  "disableAnimationsForComponents": ["fy-button"],
  "disableEffectsForComponents": [],
  "tokenOverrides": {
    "colors": {
      "primary": "#2563eb"
    },
    "layout": {
      "header": {
        "height": "80px"
      }
    }
  },
  "componentAnimationsOverrides": {
    "fy-button": {
      "hover": "button-hover-soft",
      "click": "button-click-press"
    }
  },
  "effectTriggers": {
    "fy-button.click": "confetti",
    "fy-layout.enter": "window-open",
    "fy-slot:sidebar.open": "sidebar-slide-in",
    "fy-slot:sidebar.close": "sidebar-slide-out"
  }
}
```
