# 🎨 Sistema de Temas e Efeitos

Este documento descreve como funciona o sistema de temas, animações e efeitos do fyLib, e como você pode estendê-lo usando plugins.

## Sistema de Temas (@fylib/theme)

O sistema de temas é baseado em **Design Tokens** e permite a customização total da aparência da biblioteca.

### Ícones Externos

O fyLib utiliza bibliotecas de ícones externas (ex.: Phosphor, Font Awesome, MDI). A escolha do set e o estilo global são controlados por tokens:
- `icons.defaultSet`: `'ph' | 'fa' | 'mdi'` (definição do set padrão)
- `icons.variant`: `'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'`
- `icons.size.sm|md|lg`, `icons.strokeWidth`, `icons.color`

Observação: para que os ícones sejam renderizados, a aplicação precisa incluir o CSS do set escolhido. Exemplo (Phosphor Web):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/duotone/style.css" />
```

### Criando um Novo Tema

Para criar um novo tema, você deve definir um objeto que siga a interface `ThemeDefinition`:

```typescript
import { ThemeDefinition } from '@fylib/core';

export const myCustomTheme: ThemeDefinition = {
  name: 'my-custom-theme',
  tokens: {
    colors: {
      primary: '#ff0000',
      background: '#ffffff',
      text: '#000000'
    }
  },
  darkTokens: {
    colors: {
      primary: '#ff4444',
      background: '#000000',
      text: '#ffffff'
    }
  }
};
```

### Temas Disponíveis

- `default`: tema neutro, baseado em escala de cinza/azul, com efeitos simples em `effects.button`, `effects.window` e `effects.input`.
- `christmas`: tema sazonal (Natal), com cores e tokens próprios e `effects.card` ajustado para um visual festivo.
- `windows-xp`: tema inspirado no Windows XP, com:
  - Gradientes fortes em `effects.button.background` e `effects.window.background`.
  - Sombras mais marcadas para criar efeito de janela flutuante.
  - `effects.input` configurado para caixas de texto claras com borda mais escura.
- `windows-7`: tema inspirado no Windows 7, com:
  - Gradientes suaves azulados em botões.
  - `effects.window` com glow mais difuso.
  - `effects.input` com leve relevo interno.
- `finey-workbench-1`: tema inspirado no macOS (geração 2015/2016), com:
  - Cores baseadas no design system do macOS (accent azul `primary`, superfícies cinza-claro e texto escuro).
  - Janela com aparência de “workbench” usando `effects.window.background` em gradiente suave e sombra mais profunda.
  - Botões com gradientes discretos, borda fina e `effects.button.textColor` alinhado ao texto macOS.
  - Inputs com radius levemente maior, placeholder em cinza médio e ícones internos com `effects.input.icons`.
  - Cartões com sombras mais pronunciadas em `effects.card.shadow`, lembrando janelas flutuantes do macOS.
  - Tabelas com `effects.table` seguindo o visual clean do Finder/macOS.
- `finey-workbench-2`: tema inspirado no macOS Mojave (2018), com:
  - Cores sóbrias e tipografia San Francisco.
  - Suporte nativo a Dark Mode com superfícies em cinza escuro (`#2d2d2d`).
  - Botões com gradientes sutis e bordas cinzas, inspirados no estilo pré-Big Sur.
  - Inputs com sombras internas leves e cantos levemente arredondados (`5px`).
  - Layout mais compacto e funcional, ideal para ferramentas de produtividade.
- `finey-workbench-3`: tema inspirado no macOS Sonoma/Sequoia (2024), com:
  - Estética ultra-moderna baseada em **Glassmorphism** (transparências e desfoque).
  - Uso extensivo de cores vibrantes e gradientes suaves.
  - Cantos muito arredondados (`10px` a `16px`) para um visual amigável.
  - Efeitos de profundidade e elevação usando sombras suaves e camadas translúcidas.
  - Dark Mode profundo, otimizado para telas OLED, mantendo o efeito de vidro.
- `finey-nexus-1`: tema focado em alta tecnologia e conexões:
  - Estética baseada em grids cibernéticos e cores neon sutis.
  - Papel de parede padrão: `cyber-grid` otimizado.
- `finey-hub-1`: tema inspirado na UI do GitHub:
  - Clean, profissional e com suporte nativo a Light/Dark mode.
  - Mistura de elementos modernos com ícones sutis em 8-bit.
- `finey-puffy-1`: linha temática "Puffy", com foco em estética 100% feminina:
  - Paleta de cores em tons de rosa blush, vibrante e lavanda.
  - Bordas extremamente arredondadas (`16px`) e tipografia suave.
  - Animações de "Bounce" e efeitos de brilho rosa ("Sparkle").
  - Dark Mode elegante com fundo cinza-escuro e toques de rosa vibrante.
  - Efeitos de fundo automáticos: corações caindo (`hearts`) em loop.
  - Papel de parede padrão: padrão de corações animados flutuando na diagonal.

Todos os temas registram animações específicas em `componentAnimations` para `fy-button`, `fy-input`, `fy-layout`, `fy-slot:sidebar`, `fy-card` e `fy-table`. Temas como `finey-workbench-1`, `finey-workbench-2` e `finey-workbench-3` utilizam nomes de animação próprios (`layout-macos-window-enter`, `sidebar-macos-slide-in`, `input-focus-macos-glow`, `card-macos-fade-in`, etc.), que são registrados em `@fylib/animation`.
Além disso, `fy-card` utiliza `effects.card` (background, borderColor, shadow, dividerColor) e animação `card-fade-in` como padrão.

### Efeitos de Fundo do Tema (`backgroundEffect`)

Os temas podem pré-definir efeitos de fundo globais que são ativados automaticamente quando o tema é selecionado.

```typescript
export const fineyPuffy1Theme: ThemeDefinition = {
  name: 'finey-puffy-1',
  backgroundEffect: {
    name: 'hearts',
    intensity: 40,
    speed: 1,
    loop: true
  },
  // ... tokens
};
```

**Regras de Ativação:**
Para que o efeito seja renderizado, as seguintes condições devem ser atendidas:
1.  **Habilitação Global**: A flag `themeEffectsEnabled` deve estar como `true` no seu `AppConfig` (ex: `theme.config.ts`).
2.  **Uso no Template**: A propriedade `bgEffect` deve ser adicionada explicitamente ao componente (ex: `<fy-layout bgEffect>`). Se o valor for omitido ou for `"auto"`, o sistema buscará o efeito padrão do tema.

### Papéis de Parede (`wallpaper`)

O módulo de Wallpapers permite aplicar padrões de fundo (estáticos ou animados) a qualquer componente.

```typescript
export const fineyPuffy1Theme: ThemeDefinition = {
  name: 'finey-puffy-1',
  // ... backgroundEffect
  wallpaper: {
    name: 'hearts',
    type: 'pattern',
    opacity: 0.1
  },
  tokens: {
    // Definição de tokens...
  }
};
```

**Regras de Ativação:**
Assim como os efeitos, os wallpapers seguem uma lógica de dupla confirmação:
1.  **Habilitação Global**: A flag `wallpaperEnabled` deve estar como `true` no `AppConfig`.
2.  **Uso da Diretiva**: A diretiva `fyWallpaper` deve estar presente no elemento HTML.

**Exemplos com a diretiva `fyWallpaper`**:
- `<fy-layout fyWallpaper> ... </fy-layout>` (Aplica o wallpaper padrão do tema ao layout).
- `<div fyWallpaper="hearts" [wallpaperOpacity]="0.3"> ... </div>` (Aplica um padrão específico, ignorando o do tema).
- `<div fyWallpaper [wallpaperOpacity]="0.5"> ... </div>` (Usa o padrão do tema com opacidade customizada).

*Nota: O padrão `cyber-grid` foi otimizado para uma aparência mais sutil (opacidade padrão reduzida de 0.4 para 0.15).*

#### Efeitos Paramétricos

Efeitos globais (`confetti`, `hearts`) podem ser disparados com parâmetros:

```typescript
themeEngine.triggerEffect('hearts', {
  intensity: 200,
  speed: 1.5,
  loop: true,
  id: 'meu-id-unico'
});
```

- `intensity`: Quantidade de partículas.
- `speed`: Velocidade da queda/movimento.
- `loop`: Se o efeito deve reiniciar ao terminar.
- `id`: Usado para identificar o loop de animação e permitir o seu encerramento.

Para parar um efeito em loop:
```typescript
themeEngine.triggerEffect('hearts', { id: 'meu-id-unico', stop: true });
```

### Alternando entre Modos (Light/Dark)

A engine suporta nativamente a troca de modos, o que automaticamente mescla os `darkTokens` sobre os tokens base.

```typescript
import { themeEngine } from '@fylib/theme';

// Mudar para modo escuro
themeEngine.setMode('dark');

// Obter tokens (agora com overrides de dark mode aplicados)
const tokens = themeEngine.getTokens();
```

### Usando Plugins de Tema

Plugins permitem interceptar e modificar os tokens em tempo de execução. Isso é útil para aplicar filtros globais, como modo escuro automático ou temas sazonais.

```typescript
import { ThemePlugin, themeEngine } from '@fylib/theme';

const myPlugin: ThemePlugin = {
  name: 'grayscale-plugin',
  apply(tokens) {
    // Lógica para transformar cores em escala de cinza
    return modifiedTokens;
  }
};

themeEngine.registerPlugin(myPlugin);
```

### Controle Dinâmico por Arquivo ou Objeto (Config System)

O fyLib pode ser configurado dinamicamente através de:
- Um arquivo JSON externo (`/fylib/theme-control/theme-controller.json`).
- Um objeto TypeScript que implemente o contrato `AppConfig` de `@fylib/config`.

**Dica**: O comando `ng add @fylib/adapter-angular` automatiza a criação destes arquivos na pasta `src/fylib/` e configura o bootstrapping da aplicação.

O contrato completo (`AppConfig`, `ComponentSelector`, `UIEventKey`, `EffectName`, `ThemeName`, `DeepPartial`) está em [`packages/config/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/config/src/types.ts) e é totalmente tipado.

#### Via JSON

1.  **Estrutura do Arquivo:** Crie um arquivo em `/fylib/theme-control/theme-controller.json`.
2.  **Formato (expandido):**
    ```json
    {
      "theme": "windows-xp",
      "animationsEnabled": true,
      "effectsEnabled": true,
      "disableAnimationsForComponents": ["fy-button", "fy-input"],
      "disableEffectsForComponents": ["fy-slot:sidebar"],
      "tokenOverrides": {
        "colors": {
          "primary": "#3a6ea5"
        },
        "layout": {
          "header": {
            "height": "32px"
          }
        }
      },
      "componentAnimationsOverrides": {
        "fy-button": {
          "hover": "button-hover-glow",
          "click": "button-click-press"
        },
        "fy-input": {
          "focus": "input-focus-glow",
          "error": "input-error-shake"
        },
        "fy-slot:sidebar": {
          "open": "sidebar-macos-slide-in",
          "close": "sidebar-macos-slide-out"
        },
        "fy-card": {
          "enter": "card-macos-fade-in"
        }
      },
      "effectTriggers": {
        "fy-button.click": "confetti",
        "fy-input.focus": "confetti",
        "fy-layout.enter": "window-open",
        "fy-slot:sidebar.open": "sidebar-slide-in",
        "fy-slot:sidebar.close": "sidebar-slide-out",
        "fy-card.submit": "confetti",
        "fy-toast.open": "confetti"
      }
    }
    ```
3.  **Funcionamento:** O `FyLibService` pode monitorar este arquivo e aplicar o tema automaticamente se ele estiver registrado na engine. Se o tema informado não existir, um erro será logado no console e o tema anterior será mantido. Quaisquer `tokenOverrides` são mesclados sobre os tokens do tema ativo antes de serem expostos para os componentes. Os campos `componentAnimationsOverrides` e `effectTriggers` são lidos a cada atualização para controlar animações por componente/evento e disparo de efeitos globais.

#### Via Objeto TypeScript (AppConfig)

Em aplicações TypeScript (como o playground Angular), você pode declarar um objeto `AppConfig` com tipagens fortes para todos os campos:

```ts
import { AppConfig } from '@fylib/config';

export const themeControllerConfig: AppConfig = {
  theme: 'finey-workbench-1',
  animationsEnabled: true,
  effectsEnabled: true,
  disableAnimationsForComponents: ['fy-input'],
  disableEffectsForComponents: ['fy-slot:sidebar'],
  tokenOverrides: {
    colors: { primary: '#0a84ff' }
  },
  componentAnimationsOverrides: {
    'fy-button': {
      hover: 'button-hover-soft',
      click: 'button-click-press'
    },
    'fy-slot:sidebar': {
      open: 'sidebar-macos-slide-in',
      close: 'sidebar-macos-slide-out'
    }
  },
  effectTriggers: {
    'fy-button.click': 'confetti',
    'fy-layout.enter': 'window-open',
    'fy-slot:sidebar.open': 'sidebar-slide-in',
    'fy-slot:sidebar.close': 'sidebar-slide-out',
    'fy-card.submit': 'confetti',
    'fy-toast.open': 'confetti'
  }
};
```

Ao usar `AppConfig`, você ganha IntelliSense completo para:
- Nomes de tema (`ThemeName`).
- Seletores de componentes (`ComponentSelector`).
- Eventos de UI (`UIEventKey`).
- Nomes de efeitos (`EffectName`).
- Árvore de tokens (`DesignTokens` via `DeepPartial`).

### Tokens de Layout e Toggles

Além de cores, espaçamento e tipografia, os temas expõem tokens estruturais:

- `layout.app.gap`: espaçamento entre regiões do layout.
- `layout.header.height`, `layout.header.padding`, `layout.header.background`, `layout.header.shadow`.
- `layout.sidebar.width`, `layout.sidebar.padding`, `layout.sidebar.background`.
- `layout.content.padding`.

Controles de toggle do header e sidebar:

 - `layout.header.toggle.background`, `layout.header.toggle.textColor`, `layout.header.toggle.borderColor`, `layout.header.toggle.borderRadius`, `layout.header.toggle.icon`.
 - `layout.sidebar.toggle.background`, `layout.sidebar.toggle.textColor`, `layout.sidebar.toggle.borderColor`, `layout.sidebar.toggle.borderRadius`, `layout.sidebar.toggle.icon`.
- `layout.sidebar.toggle.mode`: controla se o botão de toggle aparece como:
  - `floating`: botão arredondado flutuando no canto da tela.
  - `tongue`: lingueta acoplada à borda do sidebar.
- `layout.sidebar.toggle.tonguePosition`: posição da lingueta (`top`, `middle`, `bottom`).

Esses tokens são convertidos em variáveis CSS, por exemplo:

- `layout.header.toggle.background` → `--fy-layout-header-toggle-background`
- `layout.sidebar.toggle.borderRadius` → `--fy-layout-sidebar-toggle-borderRadius`
 - `layout.header.toggle.borderColor` → `--fy-layout-header-toggle-borderColor`
 - `layout.sidebar.toggle.borderColor` → `--fy-layout-sidebar-toggle-borderColor`

Campos adicionais suportados nos toggles:
- `layout.header.toggle.openIcon` (opcional): ícone exibido quando o menu do header está aberto.
- `layout.sidebar.toggle.openIcon` (opcional): ícone exibido quando o sidebar móvel está aberto.
 
 ### Configuração de SSE (Real-time)
 
 O fyLib suporta nativamente a integração com Server-Sent Events (SSE) através da propriedade `sse` no objeto global `AppConfig`. Isso permite que a aplicação reaja a eventos do servidor em tempo real (ex.: notificações, atualizações de sistema).
 
 - `sse.enabled`: `boolean` (habilita/desabilita o serviço).
 - `sse.endpoint`: `string` (URL do servidor SSE).
 - `sse.reconnectDelay`: `number` (tempo em ms para tentativa de reconexão).
 - `sse.events`: objeto mapeando nomes de eventos vindos do servidor para funções de callback.
 
 No playground Angular, recomenda-se criar um arquivo separado `sse.config.ts`:

 ```typescript
 import { SSEConfig } from '@fylib/core';

 export const sseConfig: SSEConfig = {
   enabled: true,
   endpoint: 'http://localhost:3000/events',
   reconnectDelay: 5000,
   events: {
     'new-notification': (data, services) => {
       services.notification.show({ message: data.text });
     }
   }
 };
 ```

 E integrá-lo ao `AppConfig`:

 ```typescript
 import { AppConfig } from '@fylib/config';
 import { sseConfig } from './sse.config';

 export const themeControllerConfig: AppConfig = {
   theme: 'default',
   sse: sseConfig,
   // ...
 };
 ```

 Exemplo via JSON (`theme-controller.json`):
 ```json
 {
   "theme": "default",
   "sse": {
     "enabled": true,
     "endpoint": "http://localhost:3000/events",
     "reconnectDelay": 5000
   }
 }
 ```
 
 ### Intensidade de Recolorização de Logo no Dark Mode
 
 Para suavizar o branco quando logos são recoloridas no modo escuro, o tema pode expor:
 - `layout.header.logoFilterDarkOpacity`: opacidade aplicada ao filtro de recolor da logo no header durante o dark mode.
 - `layout.sidebar.logoFilterDarkOpacity`: opacidade aplicada ao filtro de recolor da logo no sidebar durante o dark mode.
 
 Esses valores são lidos pelo adapter Angular e aplicados somente sobre o bloco de imagem da logo (`fy-logo__image`), preservando badges e demais conteúdos.
 
 ### Animações Padrão Atualizadas
 
 Alguns temas podem configurar animações padrão para menus e overlays:
 - Header: `'header-menu-dropdown-in'`, `'header-menu-dropdown-out'` (substituem variantes antigas como `slide-in/out`).
 - Sidebar: `'sidebar-slide-in'`, `'sidebar-slide-out'`.
 - Layout: `'window-open'` (efeito global), `'layout-enter'`.
 
 Todos os nomes devem estar registrados em `@fylib/animation` e podem ser sobrescritos via `componentAnimationsOverrides` no `AppConfig`.

### Tokens de Efeitos por Componente

Grupo `effects.button`:
- `background`, `borderColor`, `shadow`, `textColor`.

Grupo `effects.window`:
- `background`, `shadow`.

Grupo `effects.input`:
- `background`, `borderColor`, `shadow`, `placeholderColor`, `borderWidth`, `borderRadius`.
- `effects.input.icons`:
  - `mode`: `'inside' | 'inside-static' | 'outside'` (contrato para adapters).
  - `name`: nome do ícone sugerido.
  - `position`: `'left' | 'right'`.
  - `outsideGap`: espaçamento quando `mode="outside"`.
  - `color`: cor base do ícone.

Grupo `effects.card`:
- `background`, `borderColor`, `shadow`, `dividerColor`.
- `effects.card.icons.header` e `effects.card.icons.footer`: ícones padrão sugeridos para header/footer de `fy-card`.

Grupo `effects.table`:
- `background`, `borderColor`, `headerBackground`, `rowHoverBackground`, `stripedBackground`, `textColor`, `headerTextColor`.

Grupo `effects.chart`:
- `background`, `gridColor`, `labelColor`, `colors` (paleta de cores para séries).

Grupo `effects.toast`:
- `background`, `borderColor`, `textColor`, `shadow`, `borderRadius`, `padding`, `gap`, `iconSize`, `closeIcon`, `iconColor` (mapeamento de cores por tipo), `icons` (mapeamento de ícones por tipo).

Grupo `effects.badge`:
- `background`, `textColor`, `borderRadius`
- `animation`: `'shine' | 'none'` – animação de brilho em loop para chamar atenção (ex.: rótulos “BETA”/“NEW”).

Grupo `effects.notificationMenu`:
- `button.background`, `button.textColor`, `button.icon`, `button.badgeBackground`, `button.badgeTextColor`.
- `dropdown.background`, `dropdown.borderColor`, `dropdown.shadow`, `dropdown.borderRadius`, `dropdown.maxHeight`.
- `item.background`, `item.hoverBackground`, `item.textColor`, `item.descriptionColor`, `item.dividerColor`, `item.unreadIndicator`.
- `config.showAll`, `config.limit`, `config.allowClear`, `config.accordionMode`, `config.showViewAll`, `config.viewAllPosition`, `config.markAllAsReadOnOpen`, `config.markAsReadOnClick`, `config.readApiEndpoint`.

Grupo `icons`:
- `icons.defaultSet`: set padrão de ícones (ex.: `'ph'`, `'fa'`, `'mdi'`).
- `icons.size.sm|md|lg`: tamanhos sugeridos.
- `icons.color`, `icons.strokeWidth`, `icons.variant`.

### Desativação Global e por Componente de Animações

A flag `animationsEnabled` no arquivo de configuração controla se as transições e animações CSS serão executadas globalmente.

- **Mecanismo Global:** Quando `false`, a diretiva `fyThemeVars` adiciona a classe CSS `.fy-animations-disabled` ao elemento. Quando `true`, cada componente ainda pode desativar animações localmente.
- **Desativação por Componente:** A lista `disableAnimationsForComponents` recebe seletores como `"fy-button"`, `"fy-layout"` ou `"fy-slot"` e faz com que todos os componentes daquele tipo sejam marcados como sem animação.
- **Override por Instância:** Além disso, componentes expõem a propriedade `activeAnimations`. Quando `false`, as animações são desativadas apenas para aquela instância, mesmo que globalmente estejam habilitadas.
- **Efeito:** A classe `.fy-animations-disabled` aplica `transition: none !important` e `animation: none !important` a todos os descendentes, garantindo que o comportamento seja respeitado por todos os componentes do fyLib de forma padronizada.

---

## 🎬 Sistema de Animações e Efeitos (@fylib/animation)

O sistema de animações gerencia microinterações e efeitos visuais globais.

### Criando Novas Animações

Animações são definidas por contratos que descrevem o comportamento desejado:

```typescript
import { AnimationDefinition, animationEngine } from '@fylib/animation';

const pulseAnimation: AnimationDefinition = {
  name: 'pulse',
  duration: 300,
  easing: 'ease-in-out'
};

animationEngine.registerAnimation(pulseAnimation);
```

### Criando Plugins de Efeitos (Plugins)

Você pode criar plugins que reagem a eventos de animação ou renderizam efeitos globais (como confetes ou neve).

```typescript
import { GlobalEffectPlugin, animationEngine } from '@fylib/animation';

const confettiPlugin: GlobalEffectPlugin = {
  name: 'confetti-renderer',
  renderEffect(effect) {
    if (effect.name === 'confetti') {
      // Lógica para disparar confetes na tela
    }
  }
};

animationEngine.registerGlobalEffectPlugin(confettiPlugin);
```

### Disparando Efeitos

```typescript
animationEngine.triggerEffect('confetti', { intensity: 50, loop: true });
```

Em aplicações Angular usando o adapter do fyLib, o fluxo recomendado é configurar `effectTriggers` no `theme-controller.json` e deixar que os componentes disparem eventos sem conhecer o motor de efeitos. A regra de prioridade é:
- Se existir `effectTriggers[eventKey]` no AppConfig, ele prevalece para TODOS os componentes daquele seletor.
- Caso contrário, se o componente fornecer um `EffectName` por props (instância), ele será usado apenas para o seletor corrente.
- Se nenhum existir, nenhum efeito é disparado.

#### Parâmetros de Efeitos
Efeitos como `confetti` e `hearts` agora aceitam parâmetros de customização:
- `intensity`: Quantidade de partículas.
- `speed`: Velocidade da animação.
- `loop`: Se deve repetir infinitamente.
- `id`: ID único para controle (parar/atualizar).

- `fy-button` dispara `fy-button.click`.
- `fy-input` dispara `fy-input.focus`.
- `fy-layout` dispara `fy-layout.enter`.
- `fy-slot` com `name="sidebar"` dispara `fy-slot:sidebar.open` e `fy-slot:sidebar.close`.
- `fy-card.submit` dispara o evento de submissão do card.
- `fy-table.rowClick` dispara o evento de clique na linha da tabela.
- `fy-toast` dispara `fy-toast.open` ao ser exibido.

O `FyLibService` converte esses eventos em chamadas `animationEngine.triggerEffect` usando o mapa configurado e o nome passado por instância como fallback.

### Efeitos Disponíveis por Padrão

- `confetti`: partículas coloridas sobre a tela (plugin Canvas).
- `hearts`: corações coloridos caindo (plugin Canvas - cores do tema Puffy).
- `window-open`: flash suave branco em toda a janela (plugin DOM overlay).
- `sidebar-slide-in`: glow azul na borda esquerda (plugin DOM overlay).
- `sidebar-slide-out`: glow vermelho na borda esquerda (plugin DOM overlay).
  
Animações padrão adicionais:
- `card-fade-in`: entrada suave para cartões do tipo `fy-card`.
- `table-fade-in`: animação de entrada da tabela.
- `table-row-enter`: animação de entrada de novas linhas.

### Registro dos Efeitos

Os efeitos acima são registrados automaticamente via:
- [default-effects.ts](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/animation/src/effects/default-effects.ts)
- Registradores de plugins no adapter Angular:
  - [confetti.plugin.ts](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/effects/confetti.plugin.ts)
  - [hearts.plugin.ts](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/effects/hearts.plugin.ts)
  - [ui-effects.plugin.ts](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/effects/ui-effects.plugin.ts)
  - [register-all.ts](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/effects/register-all.ts) – ponto único para registrar todos os plugins.

Para desativar globalmente:
```json
{
  "effectsEnabled": false,
  "themeEffectsEnabled": false,
  "wallpaperEnabled": false
}
```

Para desativar por componente:
```json
{
  "disableEffectsForComponents": ["fy-button", "fy-input"]
}
```

Para desativar por instância:
```html
<fy-button [activeEffects]="false"></fy-button>
```
