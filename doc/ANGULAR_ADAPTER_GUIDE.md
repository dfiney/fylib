# 🅰️ Guia do Adapter Angular: Integrando Componentes do Catálogo

Este guia detalha como transformar uma definição de componente do `@fylib/catalog` em um componente Angular funcional dentro do pacote `@fylib/adapter-angular`.

## 🏗️ Estrutura do Adapter

O adapter está organizado para separar as responsabilidades:
- `base/`: Classes base e utilitários.
- `components/`: Implementações visuais dos componentes (ex: `fy-button`).
- `directives/`: Lógica de manipulação de DOM (Temas, Animações).
- `services/`: Singleton para controle de estado global (ThemeEngine, AnimationEngine).

## 🧱 Classe Base de Componentes

Todos os componentes do adapter devem herdar de `BaseFyComponent`. Essa classe concentra:
- Resolução de animações por instância/tema/config (`resolveAnim`).
- Composição de classes de animação (`composeAnimClasses`).
- Ativação/desativação de animações por instância (`isAnimationsActive`).
- Resolução de estilos inline via tokens/overrides (`getHostStyles`).
- Disparo de efeitos com prioridade correta (`triggerByEvent` e `triggerDirect`).

Assinaturas relevantes:
```ts
protected resolveAnim(event: string, instanceOverride?: string, definitionFallback?: string): string | undefined;
protected composeAnimClasses(...names: Array<string | undefined>): string;
protected isAnimationsActive(instanceFlag: boolean | null | undefined): boolean;
protected getHostStyles(style: Record<string, string> | null | undefined): string;
protected triggerByEvent(eventKey: UIEventKey, effectName?: EffectName, instanceFlag?: boolean | null): void;
protected triggerDirect(effectName?: EffectName, instanceFlag?: boolean | null): void;
```

## 🚀 Integrando um Novo Componente

Siga estes passos para adicionar um componente que já existe no catálogo:

### 1. Criar o Arquivo do Componente
Crie o arquivo em `src/components/nome-do-componente.component.ts`.

### 2. Importar a Definição e Props
Importe os contratos definidos no catálogo:

```typescript
import { MyComponentProps, MyComponentDefinition } from '@fylib/catalog';
```

### 3. Implementar a Lógica Angular
O componente deve:
1. Usar o seletor com prefixo `fy-`.
2. Implementar a interface de Props do catálogo.
3. Usar `ViewEncapsulation.None` para permitir que os temas globais afetem o componente.
4. Aplicar a diretiva `fyThemeVars` para injetar os CSS Variables do tema.
5. Expor, sempre que fizer sentido, as propriedades padrão de UI:
   - `activeAnimations?: boolean | null` para controlar animações daquela instância.
   - `customStyles?: Record<string, string>` para sobrescrever estilos via `[ngStyle]`.

```typescript
@Component({
  selector: 'fy-my-component',
  standalone: true,
  imports: [CommonModule, FyThemeVarsDirective],
  template: `
    <div [class]="'fy-my-comp fy-my-comp--' + variant" fyThemeVars>
      {{ label }}
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class FyMyComponent implements MyComponentProps {
  // Use os valores default do catálogo
  @Input() label: string = MyComponentDefinition.defaultProps!.label;
  @Input() variant: MyComponentProps['variant'] = MyComponentDefinition.defaultProps!.variant;
}
```

### 4. Registrar no Index
Não esqueça de exportar o componente em `src/index.ts`.

## 🎨 Temas, Variáveis e Overrides
Sempre utilize as variáveis CSS injetadas pela engine de tema. Elas seguem o padrão:
- `var(--fy-colors-primary)`
- `var(--fy-spacing-md)`
- `var(--fy-layout-header-height)`
- `var(--fy-layout-header-toggle-background)`
- `var(--fy-layout-sidebar-toggle-borderRadius)`
 - `var(--fy-layout-header-toggle-borderColor)`
 - `var(--fy-layout-sidebar-toggle-borderColor)`

Os tokens são derivados do tema ativo e podem ser sobrescritos pelo arquivo `theme-controller.json` através do campo `tokenOverrides`. Esses overrides são mesclados sobre os tokens do tema antes de chegarem aos componentes.

## ⚡ Animações e Efeitos
Componentes do adapter devem respeitar a seguinte hierarquia de controle:
- `animationsEnabled` global no `AppConfig` (seja vindo de JSON ou de um objeto TypeScript).
- Lista `disableAnimationsForComponents` para desligar animações de um seletor inteiro (`fy-button`, `fy-layout`, `fy-input`, etc).
- Propriedade `activeAnimations` em cada instância, permitindo desligar animações apenas para aquele elemento.

Além disso:
- O tema pode definir animações padrão por componente via `componentAnimations` (ex: `'fy-button'.hover`, `'fy-input'.focus`, `'fy-layout'.enter`, `'fy-slot:sidebar'.open`).
- O `AppConfig` (JSON ou objeto) pode sobrescrever essas animações com `componentAnimationsOverrides`, usando seletores tipados (`ComponentSelector`) e nomes de animações fortes vindos de `@fylib/animation` (ex: `ButtonHoverAnimationName`, `InputFocusAnimationName`, `LayoutAnimationName`).
- O componente ainda pode receber inputs específicos (ex: `hoverAnimation`, `clickAnimation`, `focusAnimation`) para ajustar animações por instância, também usando esses tipos.

Para casos manuais, ainda é possível usar a diretiva:

```html
<div [fyAnimation]="'pulse'">Conteúdo</div>
```

## 🖼️ Padrões Atuais de Logo e Slots

- Recolorização de logo por modo:
  - Inputs: `[headerLogoColorDark]`, `[headerLogoColorLight]`, `[sidebarLogoColorDark]`, `[sidebarLogoColorLight]`
  - Aceitam `'white'`/`'black'` (e equivalentes hex). O adapter aplica filtros CSS somente à imagem (`fy-logo__image`), preservando o badge.
- Filtro direto:
  - Inputs: `[headerLogoFilter]`, `[sidebarLogoFilter]` aceitam qualquer string `filter` CSS e também atuam apenas em `fy-logo__image`.
- Badge:
  - Inputs: `*LogoBadgeText`, `*LogoBadgeBG`, `*LogoBadgeTextColor`, `*LogoBadgeRadius`, `*LogoBadgeShine`
- Slots recomendados:
  - Header: `[fy-header-logo]`, `[fy-header-links]` / `[fy-header-links-center]`, `[fy-header-links-right]`, `[fy-header-meta]`
  - Sidebar: `[fy-sidebar-logo]`, `[fy-sidebar-header]`, `[fy-sidebar-links]`, `[fy-sidebar-footer]`
- Customização de região de logo:
  - A região `[fy-sidebar-logo]` pode receber qualquer conteúdo HTML (ex.: avatar, nome e role), substituindo a logo padrão quando os props de logo não são usados.

## 🧬 Integração com Config Tipado (AppConfig) e Prioridade de Efeitos

No adapter Angular, o serviço central [`FyLibService`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/services/fylib.service.ts) trabalha diretamente com o contrato tipado de configuração e aplica a seguinte regra de prioridade para efeitos:
- Se existir `effectTriggers[eventKey]` no AppConfig, ele prevalece para TODOS os componentes do seletor correspondente.
- Caso contrário, se um componente passar um `EffectName` pela instância (prop), esse nome é usado apenas para o seletor corrente.
- Se nenhum existir, nenhum efeito é disparado.

```ts
import {
  AppConfig,
  ComponentSelector,
  UIEventKey
} from '@fylib/config';

isAnimationsEnabledFor(componentSelector: ComponentSelector): boolean;
isEffectsEnabledFor(componentSelector: ComponentSelector, instanceFlag: boolean | null | undefined): boolean;
getComponentAnimation(componentSelector: ComponentSelector, event: string): string | undefined;
triggerEffectForEvent(eventKey: UIEventKey, effectName?: EffectName, componentSelector?: ComponentSelector, instanceFlag?: boolean | null): void;
```

Quando você dispara animações/efeitos a partir de um componente Angular, use sempre os seletores/eventos tipados e delegue a resolução de prioridade para o serviço/base:

```ts
// Exemplo: dentro de um componente Angular
onSubmit() {
  if (this.mode === 'form' && this.isAnimationsActive(this.activeAnimations)) {
    this.triggerByEvent('fy-card.submit', this.submitEffect, this.activeEffects);
  }
}
```

No playground Angular, a configuração global é feita via um objeto `AppConfig`:

```ts
import { AppConfig } from '@fylib/config';

export const themeControllerConfig: AppConfig = {
  theme: 'christmas',
  animationsEnabled: true,
  effectsEnabled: true,
  disableAnimationsForComponents: [],
  disableEffectsForComponents: [],
  tokenOverrides: {},
  componentAnimationsOverrides: {},
  effectTriggers: {
    'fy-button.click': 'confetti'
  }
};
```

Isso garante IntelliSense completo para nomes de tema, seletores, eventos, efeitos e árvores de tokens quando você estiver integrando o adapter em um projeto Angular.

## 🔌 Registro de Plugins de Efeito
O adapter Angular registra todos os plugins de efeito necessários em um único ponto, garantindo que o `animationEngine` esteja pronto antes de qualquer trigger:
- `register-all.ts` registra `confetti` e outros efeitos de UI.
- O `FyLibService` executa esse registro no `constructor` (em ambiente de browser) e antes de qualquer chamada de `triggerEffect`.
- Componentes que disparam efeitos por props ou evento também se beneficiam desse registro.

## 🛠️ Testando no Playground
Para testar localmente:
1. Faça o build do adapter: `pnpm build`.
2. No projeto playground, adicione o adapter como dependência via `file:` ou link simbólico.
3. Importe o componente no seu `AppModule` ou componente standalone.
