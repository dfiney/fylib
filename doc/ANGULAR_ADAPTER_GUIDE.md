# 🅰️ Guia do Adapter Angular: Integrando Componentes do Catálogo

Este guia detalha como transformar uma definição de componente do `@fylib/catalog` em um componente Angular funcional dentro do pacote `@fylib/adapter-angular`.

## 🏗️ Estrutura do Adapter

O adapter está organizado para separar as responsabilidades:
- `base/`: Classes base e utilitários.
- `components/`: Implementações visuais dos componentes (ex: `fy-button`).
- `directives/`: Lógica de manipulação de DOM (Temas, Animações, Wallpapers).
- `services/`: Singleton para controle de estado global (ThemeEngine, AnimationEngine).
- `schematics/`: Automações de instalação e configuração (`ng add`).
- `providers.ts`: Definição de `provideFyLib` para inicialização via framework.

## 🚀 Instalação Automatizada (ng add)

O adapter Angular fornece um schematic `ng-add` que facilita a integração da biblioteca em novos projetos.

### O que o `ng add` faz:
1.  **Instalação**: Adiciona `@fylib/adapter-angular` e suas dependências internas ao `package.json`.
2.  **Configuração**: Cria a pasta `src/fylib/` contendo arquivos de configuração base (`theme`, `sse`, `crypto`, `logging`).
3.  **Bootstrapping**:
    - Adiciona `provideFyLib` ao `app.config.ts`.
    - Injeta e inicializa o `FyLibService` no `app.component.ts`.

### Como rodar:
```bash
ng add @fylib/adapter-angular
```

## ⚙️ Inicialização e Configuração (provideFyLib)

A forma recomendada de inicializar o fyLib em uma aplicação Angular (v17+) é através do provider de ambiente `provideFyLib`. Ele permite injetar a configuração inicial (`AppConfig`) diretamente no ciclo de vida do framework.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideFyLib } from '@fylib/adapter-angular';
import { myAppConfig } from './fylib.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFyLib(myAppConfig)
  ]
};
```

O `provideFyLib` aceita um objeto parcial de `AppConfig`. Se não for fornecido, a biblioteca utilizará os valores padrão definidos no `ConfigManager`.

### ⚖️ Regras de Precedência de Configuração

O fyLib no Angular trabalha com a seguinte prioridade para evitar conflitos:

1.  **Provider (`provideFyLib`)**: Se você passar um objeto de configuração no `app.config.ts`, ele será a fonte de verdade absoluta. O polling automático do arquivo JSON é desativado para garantir que a configuração estática (vinda dos arquivos `.config.ts` do seu projeto) não seja sobrescrita acidentalmente em tempo de execução.
2.  **Remote JSON (`theme-controller.json`)**: Se o provider **não** for utilizado (ou for passado um objeto vazio `{}`), o adapter tentará detectar e monitorar o arquivo `/fylib/theme-control/theme-controller.json` via HTTP a cada 3 segundos.
3.  **Default Config**: Caso nenhuma das opções acima seja encontrada, o `ConfigManager` utiliza os valores padrão da biblioteca (tema 'default', animações ligadas, logs 'info', efeitos de tema desligados, wallpapers desligados). Ambas as flags `themeEffectsEnabled` e `wallpaperEnabled` são `false` por padrão na engine.

Essa estratégia permite que você utilize arquivos como `theme-controller.config.ts`, `sse.config.ts` e `crypto.config.ts` localmente no seu projeto (como feito no playground) e os injete via provider, mantendo total controle sobre o comportamento da biblioteca.

## 🧱 Classe Base de Componentes

Todos os componentes do adapter devem herdar de `BaseFyComponent`. Essa classe concentra a lógica agnóstica e é **segura para SSR** (Server-Side Rendering), realizando verificações de plataforma antes de qualquer manipulação direta do DOM.

Assinaturas relevantes:
```ts
protected resolveAnim(event: string, instanceOverride?: string, definitionFallback?: string): string | undefined;
protected composeAnimClasses(...names: Array<string | undefined>): string;
protected isAnimationsActive(instanceFlag: boolean | null | undefined): boolean;
protected getHostStyles(style: Record<string, string> | null | undefined): string;
protected triggerByEvent(eventKey: UIEventKey, effectName?: EffectName, instanceFlag?: boolean | null): void;
protected triggerDirect(effectName?: EffectName, instanceFlag?: boolean | null): void;
```

## 📡 Serviço de Real-time (SSE)

O `FySSEService` é inicializado automaticamente se `tokens.sse.enabled` estiver ativado no `AppConfig`. Ele gerencia a conexão com o servidor e despacha eventos para os callbacks definidos nos tokens.

Para usá-lo em seu componente (ex.: para garantir que a conexão está pronta):

```typescript
import { inject } from '@angular/core';
import { FySSEService } from '@fylib/adapter-angular';

export class MyComponent {
  private sse = inject(FySSEService);
  // O serviço já conecta automaticamente baseado na config.
}
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
5. Utilizar a sintaxe moderna de controle de fluxo (`@if`, `@for`, `@switch`).
6. Expor, sempre que fizer sentido, as propriedades padrão de UI:
   - `activeAnimations?: boolean | null` para controlar animações daquela instância.
   - `customStyles?: Record<string, string>` para sobrescrever estilos via `[ngStyle]`.

```typescript
@Component({
  selector: 'fy-my-component',
  standalone: true,
  imports: [CommonModule, FyThemeVarsDirective],
  template: `
    <div [class]="'fy-my-comp fy-my-comp--' + variant" fyThemeVars>
      @if (label) {
        {{ label }}
      }
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

## 🖼️ Módulo de Papéis de Parede (Wallpapers)

A diretiva `fyWallpaper` permite aplicar padrões de fundo animados ou estáticos. Para que o papel de parede seja renderizado, as seguintes condições devem ser atendidas:

1.  **Habilitação Global**: A flag `wallpaperEnabled` deve estar como `true` no seu `AppConfig` (ex: `theme.config.ts`).
2.  **Presença da Diretiva**: A diretiva `fyWallpaper` deve ser adicionada explicitamente ao elemento HTML.

**Exemplos de Uso:**

- **Usar o wallpaper padrão do tema**:
  ```html
  <div fyWallpaper> Conteúdo com fundo do tema </div>
  ```
  *(O uso sem valor ou com `"auto"`/`""` busca automaticamente a definição no tema corrente).*

- **Forçar um padrão específico (Override)**:
  ```html
  <div fyWallpaper="hearts" [wallpaperOpacity]="0.3">
    Conteúdo com fundo de corações (mesmo que o tema defina outro)
  </div>
  ```

O `FyLayoutComponent` integra esta diretiva internamente, mas ela só será ativada se as regras acima forem respeitadas.

## 🎨 Temas, Variáveis e Overrides
Sempre utilize as variáveis CSS injetadas pela engine de tema. Elas seguem o padrão:
- `var(--fy-colors-primary)`
- `var(--fy-spacing-md)`
- `var(--fy-layout-header-height)`
- `var(--fy-effects-toast-background)`
- `var(--fy-effects-table-headerBackground)`
- `var(--fy-effects-chart-gridColor)`

Os tokens são derivados do tema ativo e podem ser sobrescritos pelo arquivo `theme-controller.json` através do campo `tokenOverrides`. Esses overrides são mesclados sobre os tokens do tema antes de chegarem aos componentes.

## ⚡ Animações e Efeitos
Componentes do adapter devem respeitar a seguinte hierarquia de controle:
- `animationsEnabled` global no `AppConfig` (seja vindo de JSON ou de um objeto TypeScript).
- `themeEffectsEnabled` para habilitar/desabilitar efeitos automáticos de fundo dos temas (ex: corações caindo). **Importante**: Assim como o wallpaper, os efeitos de fundo (`bgEffect`) no `fy-layout` só são ativados se esta flag for `true` E a propriedade `bgEffect` estiver presente no componente.
- Lista `disableAnimationsForComponents` para desligar animações de um seletor inteiro (`fy-button`, `fy-layout`, `fy-input`, `fy-toast`, etc).
- Propriedade `activeAnimations` em cada instância, permitindo desligar animações apenas para aquele elemento.

Além disso:
- O tema pode definir animações padrão por componente via `componentAnimations` (ex: `'fy-button'.hover`, `'fy-input'.focus`, `'fy-layout'.enter`, `'fy-toast'.open`).
- O tema pode definir um `backgroundEffect` padrão (ex: `hearts` em loop).
- O `AppConfig` (JSON ou objeto) pode sobrescrever essas animações com `componentAnimationsOverrides`.
- O componente ainda pode receber inputs específicos para ajustar animações por instância.

Para o componente **FyIconComponent**, as cores agora são resolvidas de forma robusta:
- Se uma prop `[color]` for passada, ela é usada.
- Caso contrário, ele busca `tokens.icons.color`.
- Fallback para `currentColor`.
- Nota: O `FyToastComponent` agora passa explicitamente a cor resolvida do token `effects.toast.iconColor` para o ícone, garantindo fidelidade ao tema mesmo em fundos complexos.

## 🖼️ Padrões Atuais de Logo e Slots

- Recolorização de logo por modo:
  - Inputs: `[headerLogoColorDark]`, `[headerLogoColorLight]`, `[sidebarLogoColorDark]`, `[sidebarLogoColorLight]`
  - Aceitam `'white'`/`'black'` (e equivalentes hex). O adapter aplica filtros CSS somente à imagem (`fy-logo__image`), preservando o badge.
- Filtro direto:
  - Inputs: `[headerLogoFilter]`, `[sidebarLogoFilter]` aceitam qualquer string `filter` CSS e também atuam apenas em `fy-logo__image`.
- Badge:
  - Inputs: `*LogoBadgeText`, `*LogoBadgeBG`, `*LogoBadgeTextColor`, `*LogoBadgeRadius`, `*LogoBadgeShine`
- Copyright:
  - Inputs: `[copyrightText]`, `[copyrightShineDuration]` (ex: `'15s'`)
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
// Exemplo: dentro de um componente Angular
onSubmit() {
  if (this.mode === 'form' && this.isAnimationsActive(this.activeAnimations)) {
    this.triggerByEvent('fy-card.submit', this.submitEffect, this.activeEffects);
  }
}

// Exemplo: Toast disparando efeito ao abrir
ngOnInit() {
  this.triggerByEvent('fy-toast.open', undefined, this.activeEffects);
}
```

No playground Angular, a configuração global é feita via um objeto `AppConfig`:

```ts
import { AppConfig } from '@fylib/config';

export const themeControllerConfig: AppConfig = {
  theme: 'christmas',
  animationsEnabled: true,
  effectsEnabled: true,
  themeEffectsEnabled: false,
  wallpaperEnabled: false,
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
- `register-all.ts` registra `confetti`, `hearts` e outros efeitos de UI.
- O `FyLibService` executa esse registro no `constructor` (em ambiente de browser) e antes de qualquer chamada de `triggerEffect`.
- Componentes que disparam efeitos por props ou evento também se beneficiam desse registro.

## 🛠️ Testando no Playground
Para testar localmente:
1. Faça o build do adapter: `pnpm build`.
2. No projeto playground, adicione o adapter como dependência via `file:` ou link simbólico.
3. Importe o componente no seu `AppModule` ou componente standalone.
