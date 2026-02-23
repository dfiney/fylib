---
Copyright (c) 2026 Finey. Todos os direitos reservados.
---

# 🚀 fyLib – Arquitetura Técnica

## 📋 Visão Geral

O **fyLib** é uma plataforma modular de UI de última geração, projetada para ser independente de framework, altamente configurável e pronta para o mercado corporativo. Diferente de bibliotecas de componentes tradicionais, o fyLib separa a **definição** da **renderização**, permitindo uma flexibilidade sem precedentes.

### Foco da Plataforma
- 🧩 **Componentes Reutilizáveis:** Baseados em contratos, não em implementações.
- ⚙️ **Configuração Dinâmica:** Controle total via JSON ou Remote Config.
- 🎨 **Sistema de Temas:** Design Tokens de alto nível.
- 🎬 **Engine de Animações:** Microinterações e efeitos globais desacoplados.
- 🔐 **Licenciamento:** Controle granular de funcionalidades por cliente.
- 🌐 **Multiplataforma:** Suporte nativo para Angular e React.

---

## 🏗️ Princípios Arquiteturais

A arquitetura foi desenhada com uma separação clara de responsabilidades:

1.  **Separação de Responsabilidade:** Cada módulo tem um propósito único e bem definido.
2.  **Baseada em Contratos:** O comportamento é definido por interfaces, facilitando a extensibilidade.
3.  **Core Framework-Agnostic:** O núcleo não conhece Angular ou React.
4.  **Adapters:** Camadas específicas que traduzem contratos para a realidade de cada framework.
5.  **Modularidade:** Estrutura de mono-repo que permite o uso parcial da biblioteca.

---

## 📁 Estrutura de Módulos

### Organização de Pastas
```text
packages/
├── core/           # Contratos e utilitários base
├── catalog/        # Definições de componentes (Definitions)
├── config/         # Engine de configuração declarativa
├── theme/          # Design Tokens e gestão de temas
├── animation/      # Sistema de efeitos e transições
├── license/        # Validação e controle de features
└── adapters/       # Renderizadores específicos
    ├── angular/    # Implementação para Angular
    └── react/      # Implementação para React
```

### Resumo de Camadas
| Camada | Função Principal |
| :--- | :--- |
| **Core** | Base, contratos globais e utilitários. |
| **Catalog** | Define o "que" é o componente (propriedades, variantes). |
| **Config** | Resolve a configuração ativa em runtime. |
| **Theme** | Gerencia a aparência visual (Design Tokens). |
| **Animation** | Controla o movimento e efeitos sazonais. |
| **License** | Valida permissões e acesso a funcionalidades. |
| **Adapter** | Transforma o contrato em UI real (DOM/Componente). |

---

## 🛠️ Detalhamento dos Módulos

### 1️⃣ @fylib/core
O coração da biblioteca. Contém as tipagens fundamentais e o sistema de ciclo de vida interno.
- **Funções:** Definir contratos base, centralizar interfaces e fornecer abstrações reutilizáveis.

### 2️⃣ @fylib/catalog
O repositório de definições. **Não contém HTML ou CSS.**
Um **Contrato (Definition)** descreve: Nome, Versão, Propriedades, Variantes e Features Requeridas.

**Exemplo de Definição:**
```typescript
export const ButtonDefinition: UIComponentDefinition<ButtonProps> = {
  name: 'button',
  version: '1.0.0',
  defaultProps: {
    variant: 'primary',
    size: 'md'
  },
  variants: ['primary', 'secondary', 'ghost'],
  features: {
    requiresLicenseFeature: 'basic-components',
    animations: {
      hover: 'button-hover-soft',
      click: 'button-click-press'
    },
    effects: {
      onSuccess: 'confetti'
    }
  }
};
```

**Componente de Negócio (Composite) – fy-card:**
Define props, variantes e integrações com animações/efeitos:
```typescript
export const CardDefinition: UIComponentDefinition<CardProps> = {
  name: 'fy-card',
  version: '1.0.0',
  variants: ['default', 'elevated', 'outlined'],
  defaultProps: { mode: 'default', mutedHeader: true, mutedFooter: true },
  features: {
    animations: { enter: 'card-fade-in' },
    effects: { onSubmit: 'confetti' }
  }
};
```
### 3️⃣ @fylib/config
Permite a customização do comportamento da biblioteca sem alterar o código-fonte através do `ConfigManager`.
- **Suporte:** JSON, arquivos locais ou monitoramento dinâmico (Polling/Watch).
- **Configuração Tipada:** Expõe o contrato `AppConfig` com tipagens fortes para todos os campos em [`packages/config/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/config/src/types.ts).
- **Controle Externo:** A biblioteca pode monitorar o diretório `/fylib/theme-control/theme-controller.json` para atualizações de tema em tempo real sem necessidade de rebuild, ou receber um objeto `AppConfig` diretamente (como no playground Angular via `theme-controller.config.ts`).
- **Campos Principais (tipados):**
  - `theme: ThemeName` – union de nomes de tema (`'default'`, `'finey-workbench-1'`, `'windows-xp'`, `'windows-7'`, `'christmas'`).
  - `animationsEnabled: boolean` – liga/desliga animações globalmente.
  - `disableAnimationsForComponents?: ComponentSelector[]` – lista tipada com seletores válidos (`'fy-button'`, `'fy-input'`, `'fy-layout'`, `'fy-slot'`, `'fy-slot:sidebar'`, `'fy-card'`).
  - `tokenOverrides?: DeepPartial<DesignTokens>` – árvore de tokens fortemente tipada para sobrescrever parcialmente o tema ativo (ex.: apenas `colors.primary`, `layout.header.height`, `effects.card.shadow`, etc.).
  - `componentAnimationsOverrides?: ComponentAnimationsOverrides` – mapa tipado de animações por componente/evento que sobrescreve as animações definidas no tema (ex.: `'fy-button'.hover`, `'fy-input'.focus`, `'fy-layout'.enter`, `'fy-slot:sidebar'.open`, `'fy-card'.enter`).
  - `effectsEnabled?: boolean` – controle global de efeitos.
  - `disableEffectsForComponents?: ComponentSelector[]` – desativa efeitos por seletor de componente.
  - `effectTriggers?: Partial<Record<UIEventKey, EffectName>>` – mapa tipado de eventos de UI (`'fy-button.click'`, `'fy-input.focus'`, `'fy-layout.enter'`, `'fy-slot:sidebar.open'`, `'fy-slot:sidebar.close'`, `'fy-card.submit'`) para nomes de efeitos globais (`'confetti'`, `'window-open'`, `'sidebar-slide-in'`, `'sidebar-slide-out'`, `'window-macos-sheet-open'`, `'window-macos-sheet-close'`).

### 4️⃣ @fylib/theme
Sistema de Design Tokens. Fornece variáveis, escalas e temas sem depender de uma engine de CSS específica.
- **Modos:** Suporte nativo a Light e Dark Mode com mesclagem inteligente de tokens.
- **Plugins:** Suporta plugins para modificação dinâmica de tokens (ex: filtros de acessibilidade, temas sazonais). O adapter Angular registra um plugin que aplica automaticamente os `tokenOverrides` vindos da camada de config.
- **Tokens Estruturais e de Efeito:** Além de cores, espaçamentos e tipografia, o tema expõe tokens de layout como `layout.header.height`, `layout.sidebar.width`, `layout.content.padding`, e também tokens de efeitos como `effects.button`, `effects.window`, `effects.input`, `effects.card`, que são convertidos em variáveis CSS (`--fy-layout-header-height`, `--fy-effects-button-background`, `--fy-effects-input-borderColor`, `--fy-effects-card-shadow`, etc.).
  - Componente `fy-card` utiliza `effects.card` para `background`, `borderColor`, `shadow`, `dividerColor` e ícones (`effects.card.icons.header`/`footer`).
  - Layouts e toggles utilizam tokens `layout.header.toggle` e `layout.sidebar.toggle` para controlar aparência e posicionamento de botões de abertura (incluindo modos `floating` e `tongue`).
  - Temas como `windows-xp`, `windows-7`, `christmas` e `finey-workbench-1` demonstram como o mesmo conjunto de componentes pode assumir identidades visuais de sistemas operacionais completos (Windows/macOS) apenas ajustando tokens.

### 5️⃣ @fylib/animation
Gerencia microinterações e efeitos globais (como neve ou fade) de forma isolada do tema e do componente.
- **Tipagens Fortes de Animações:** Tipos como `ButtonHoverAnimationName`, `ButtonClickAnimationName`, `LayoutAnimationName`, `SidebarAnimationName`, `CardAnimationName` concentram os nomes válidos de animações por componente/evento em [`packages/animation/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/animation/src/types.ts).
- **Plugins:** Sistema de plugins para estender animações e renderizar efeitos globais (ex: sistema de partículas).
- **Triggers de Efeito:** Integração com `@fylib/config` via `effectTriggers`, permitindo disparar efeitos globais configurados (JSON ou objeto `AppConfig`) a partir de eventos de componentes (`'fy-button.click'`, `'fy-input.focus'`, `'fy-layout.enter'`, `'fy-slot:sidebar.open'`, `'fy-slot:sidebar.close'`, `'fy-card.submit'`).
- **Efeitos padrão registrados:** `confetti`, `window-open`, `sidebar-slide-in`, `sidebar-slide-out`, `window-macos-sheet-open`, `window-macos-sheet-close`.
- **Animações registradas:** inclui `card-fade-in` e animações específicas de temas (`layout-macos-window-enter`, `sidebar-macos-slide-in`, `input-focus-macos-glow`, etc.).
 - **Registro centralizado de plugins:** o adapter Angular expõe um ponto único [`register-all.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/adapters/angular/src/effects/register-all.ts) para registrar plugins de efeito (confetti e UI overlays) antes de qualquer trigger.

### 6️⃣ @fylib/license
Sistema central de validação criptográfica para controle de planos e validade da assinatura.

---

## 🔄 Fluxo de Renderização (Exemplo)

Quando o desenvolvedor utiliza um componente no framework (ex: Angular):

1.  **Identificação:** O Adapter identifica o componente solicitado (ex: `<fy-button>`).
2.  **Consulta:** Busca a definição no `Catalog`.
3.  **Validação:** O `License` verifica se o cliente tem acesso a este componente.
4.  **Resolução:** O `Config` aplica overrides de propriedades.
5.  **Estilização:** O `Theme` fornece os tokens e o `Animation` prepara os efeitos.
6.  **Entrega:** O framework renderiza o template final com todos os dados injetados.

```text
Framework Adapter -> Catalog -> License -> Config -> Theme -> Animation -> Render
```

### Fluxo de Efeitos e Prioridade
- Componentes disparam eventos tipados (`UIEventKey`) via `BaseFyComponent.triggerByEvent`.
- O `FyLibService` resolve o `EffectName` a partir do `AppConfig.effectTriggers[eventKey]`.
- Se não houver mapping no AppConfig, usa `EffectName` passado por props de instância como fallback.
- `AppConfig` prevalece para TODOS os componentes de um seletor; props afetam apenas a instância corrente.
- Plugins são registrados automaticamente pelo adapter antes de qualquer trigger.

---

## 🚀 Evolução Futura

O fyLib está sendo preparado para se tornar mais do que uma biblioteca:
- 🌐 **Runtime UI:** Interfaces 100% configuráveis via JSON remoto.
- 🏪 **Marketplaces:** Ecossistema de temas e animações de terceiros.
- 🏗️ **Visual Builder:** Ferramenta low-code para montagem de interfaces usando os contratos do fyLib.

## 📚 Documentação Adicional

Para mais detalhes sobre como utilizar e estender a plataforma, consulte:
- [THEMES_AND_EFFECTS.md](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/doc/THEMES_AND_EFFECTS.md): Guia detalhado sobre o sistema de temas, animações e criação de plugins.
- [COMPONENT_CREATION.md](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/doc/COMPONENT_CREATION.md): Tutorial de como adicionar novos componentes ao catálogo e definir suas variações.

---

> **Finey 2026** - Construindo o futuro das interfaces modulares.

---

## 🔗 Ícones Externos e Slots de Navegação

- **Ícones Externos**: o adapter Angular não embute um set proprietário; ele delega a bibliotecas externas (Phosphor, Font Awesome, MDI). O set padrão e o estilo são definidos por tokens (`icons.defaultSet`, `icons.variant`, `icons.size`, `icons.strokeWidth`, `icons.color`). É necessário incluir o CSS do set escolhido na aplicação.

- **Componente `fy-icon`**: resolve classes ou SVG via providers, honrando os tokens do tema. Permite overrides por instância (cor, tamanho, variante).

- **`fy-nav-link` com ícones**: aceita `iconName`/`iconSet` para renderizar um ícone antes do label, integrando com o mesmo sistema de providers.

## 🧭 Layout: Header/Sidebar e Logos com Badge

- **`fy-slot` (header)**:
  - Propriedade `[headerLinksAlign]` (deprecado): prefira grupos por slots.
  - Slots padronizados:
    - `[fy-header-logo]` – região de logo (quando props de logo não forem usadas).
    - `[fy-header-links]`/`[fy-header-links-center]` – grupo central de navegação.
    - `[fy-header-links-right]` – grupo direito de navegação/ações.
    - `[fy-header-meta]` – região utilitária (ex.: usuário, ações rápidas).
  - Props de logo: `[headerLogoImgSrc]`, `[headerLogoSvgSrc]`, `[headerLogoAlt]`.
  - Recolorização de logo por modo: `[headerLogoColorDark]`, `[headerLogoColorLight]` aceitam `'white'` ou `'black'` (e equivalentes hex), aplicadas como filtros CSS. O filtro atua apenas no bloco de imagem da logo (`fy-logo__image`), não afetando o badge.
  - Filtro direto: `[headerLogoFilter]` aceita qualquer string CSS `filter` e é aplicado somente em `fy-logo__image`.
  - Props de badge: `[headerLogoBadgeText]`, `[headerLogoBadgeBG]`, `[headerLogoBadgeTextColor]`, `[headerLogoBadgeRadius]`, `[headerLogoBadgeShine]`.
  - Boas práticas: use sempre os atributos padronizados para projetar conteúdo; evite nós soltos (ex.: `<nav>` sem `[fy-header-links]`).
  - Toggle do menu usa `fy-icon` e alterna o ícone quando aberto/fechado; tokens `layout.header.toggle.icon` e opcional `layout.header.toggle.openIcon`.

- **`fy-slot` (sidebar)**:
  - Slots padronizados:
    - `[fy-sidebar-logo]` – região de logo.
    - `[fy-sidebar-header]` – região de cabeçalho da sidebar (opcional).
    - `[fy-sidebar-links]` – região de navegação da sidebar.
    - `[fy-sidebar-footer]` – rodapé da sidebar.
  - Props de logo: `[sidebarLogoImgSrc]`, `[sidebarLogoSvgSrc]`, `[sidebarLogoAlt]`.
  - Recolorização de logo por modo: `[sidebarLogoColorDark]`, `[sidebarLogoColorLight]` aceitam `'white'` ou `'black'` e são aplicadas via filtros CSS apenas na imagem (`fy-logo__image`), preservando o badge.
  - Filtro direto: `[sidebarLogoFilter]` aceita qualquer `filter` CSS e também se aplica somente em `fy-logo__image`.
  - Props de badge: `[sidebarLogoBadgeText]`, `[sidebarLogoBadgeBG]`, `[sidebarLogoBadgeTextColor]`, `[sidebarLogoBadgeRadius]`, `[sidebarLogoBadgeShine]`.
  - Boas práticas: utilize `[fy-sidebar-links]` para a navegação e `[fy-sidebar-footer]` para ações/rodapé; mantenha consistência com o header.
  - Toggle móvel usa `fy-icon` com alternância; tokens `layout.sidebar.toggle.icon` e opcional `layout.sidebar.toggle.openIcon`, além de `mode` e `tonguePosition`.

## 🏷️ Componente Utilitário: fy-badge

- Selo leve para rótulos como “BETA”/“NEW”, estilizado por tokens:
  - `effects.badge.background`, `effects.badge.textColor`, `effects.badge.borderRadius`, `effects.badge.animation` (`'shine' | 'none'`).
- Pode ser usado junto à logo no header e sidebar.
