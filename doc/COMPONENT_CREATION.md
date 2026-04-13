# 🧩 Criação de Componentes no Catálogo

O catálogo (`@fylib/catalog`) é onde definimos o comportamento e as propriedades dos componentes, sem nos preocuparmos com a implementação visual final (que fica nos Adapters).

## 🚀 Passo a Passo (Duas Etapas)

### 1. Reserva de Processo (Catálogo)
Nesta etapa você "reserva" o componente no catálogo para que outros times possam implementar adapters em paralelo sem conflitos:
- Defina as Props e a Definition no `@fylib/catalog`.
- Atualize tipos centrais em `@fylib/config` caso o componente participe de controles globais (selectors/eventos).
- Opcional: crie tipos de animação em `@fylib/animation` se houver conjunto estável.

#### 1.1 Definir as Propriedades (Props)

Crie uma interface que descreva todas as propriedades que o componente aceita.

```typescript
export interface MyComponentProps {
  title: string;
  variant: 'primary' | 'secondary';
}
```

#### 1.2 Criar a Definição (Definition)

Use a interface `UIComponentDefinition` do `@fylib/core` para criar a definição do componente.

```typescript
import { UIComponentDefinition } from '@fylib/core';

export const MyComponentDefinition: UIComponentDefinition<MyComponentProps> = {
  name: 'my-component',
  version: '1.0.0',
  defaultProps: {
    variant: 'primary'
  },
  variants: ['primary', 'secondary'],
  features: {
    requiresLicenseFeature: 'premium-pack',
    animations: {
      focus: 'input-focus-glow',
      error: 'input-error-shake'
    },
    effects: {
      onSuccess: 'confetti'
    }
  }
};
```

### 3. Registrar no Index

Exporte a definição no arquivo `index.ts` do pacote `@fylib/catalog`.

---

### 2. Implementação no Adapter (Angular)
Com a reserva criada, implemente o componente visual no adapter seguindo o padrão da classe base:
- Use `BaseFyComponent` para herdar utilitários comuns.
- Utilize a sintaxe moderna de controle de fluxo (`@if`, `@for`).
- Utilize `resolveAnim` e `composeAnimClasses` para montar classes de animação.
- Use `isAnimationsActive`/`getHostStyles` para comportamento e estilos.
- Dispare efeitos via `triggerByEvent(eventKey, effectName?, activeEffects)` respeitando a prioridade AppConfig→instância.

Exemplo (fy-card):
```ts
@Component({ /* ... */ })
export class FyCardComponent extends BaseFyComponent<'fy-card'> implements CardProps, FyComponentBaseInputs {
  constructor() { super(inject(require('../services/fylib.service').FyLibService), 'fy-card'); }
  @Input() submitEffect?: EffectName;

  get animationClassSuffix(): string {
    const anim = this.resolveAnim('enter', undefined, (CardDefinition.features as any)?.animations?.enter);
    return animationClasses(anim);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.mode === 'form' && this.isAnimationsActive(this.activeAnimations)) {
      this.triggerByEvent('fy-card.submit', this.submitEffect, this.activeEffects);
    }
    if (this.mode === 'form') this.fySubmit.emit();
  }
}
```
## ♿ Acessibilidade (A11y)
Todos os componentes do adapter devem ser acessíveis (padrão WCAG 2.1 AA):
- **ARIA Attributes**: Use `aria-expanded`, `aria-controls`, `aria-label`, `aria-busy`, etc.
- **Keyboard Support**: Adicione listeners para `Enter` e `Space` em elementos interativos que não são nativos (`role="button"`).
- **Focus Management**: Garanta que o `tabindex` seja gerenciado corretamente (0 para focável, -1 para desativado).

## 🧪 Testes Automatizados
Todo novo componente ou funcionalidade deve ser acompanhado de testes:
- **Pacotes Core**: Use Vitest (`*.test.ts`) para lógica agnóstica.
- **Adapters**: Use ferramentas de teste do framework (ex.: `ng test` no Angular) com arquivos `*.spec.ts`.
- **Foco dos Testes**: Renderização inicial, interações do usuário, mudanças de estado e acessibilidade.

---

## 🎨 Variações (Variants)

As variações são strings que os Adapters usam para aplicar estilos diferentes. Elas devem ser listadas no campo `variants` da definição.

## ⚡ Features, Animações e Efeitos

Você pode adicionar metadados no campo `features` para indicar comportamentos especiais, como animações padrão ou efeitos que devem ser disparados em certos eventos. Esses metadados podem ser lidos pelos Adapters para:
- Escolher animações padrão quando o tema ou o arquivo de configuração não definirem nada para aquele evento.
- Sugerir animações e efeitos em ferramentas de design/low-code.

Sempre que possível, utilize **tipos fortes** vindos de `@fylib/animation` para garantir que os nomes das animações são válidos:

```typescript
import {
  InputFocusAnimationName,
  InputStateAnimationName
} from '@fylib/animation';

features: {
  animations: {
    focus: 'input-focus-glow' as InputFocusAnimationName,
    error: 'input-error-shake' as InputStateAnimationName,
    success: 'input-success-pulse' as InputStateAnimationName
  },
  effects: {
    onSuccess: 'confetti'
  }
}
```

## 🧩 Exemplo Completo: fy-card (Componente de Negócio)

Props:
- `title?: string`
- `variant?: 'default' | 'elevated' | 'outlined'`
- `mode?: 'default' | 'form'`
- `mutedHeader?: boolean`
- `mutedFooter?: boolean`
- `footerText?: string`
- `scrollContent?: boolean`
- `activeAnimations?: boolean | null`
- `activeEffects?: boolean | null`
- `customStyles?: Record<string, string> | null`

Definition:

```typescript
import { UIComponentDefinition } from '@fylib/core';

export interface CardProps { /* props acima */ }

export const CardDefinition: UIComponentDefinition<CardProps> = {
  name: 'fy-card',
  version: '1.0.0',
  defaultProps: {
    variant: 'default',
    mode: 'default',
    mutedHeader: true,
    mutedFooter: true,
    scrollContent: false,
    activeAnimations: null,
    activeEffects: null,
    customStyles: null
  },
  variants: ['default', 'elevated', 'outlined'],
  features: {
    animations: {
      enter: 'card-fade-in'
    },
    effects: {
      onSubmit: 'confetti'
    }
  }
};
```

## ✅ Check-list ao Criar um Novo Componente

Quando você cria um novo componente no catálogo (por exemplo, `fy-toast`), considere também:
- **Tipagens centrais em `@fylib/config`:**
  - Adicionar o seletor em `ComponentSelector` se quiser que ele participe de `disableAnimationsForComponents`/`disableEffectsForComponents` e de `componentAnimationsOverrides`.
  - Adicionar novos eventos em `UIEventKey` se o componente disparar efeitos globais (`'fy-toast.show'`, por exemplo).
- **Animações em `@fylib/animation`:**
  - Criar tipos específicos (`ToastAnimationName`, por exemplo) em [`packages/animation/src/types.ts`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/animation/src/types.ts) se houver um conjunto estável de animações.
  - Registrar as animações via `animationEngine.registerAnimation`.
- **Temas em `@fylib/theme`:**
  - Atualizar os temas em [`packages/theme`](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/packages/theme) para incluir tokens/efeitos específicos se necessário (ex: `effects.toast`, `effects.table`, `effects.chart`).
- **Adapter (Angular/React):**
  - Implementar o componente visual no adapter correspondente, herdando da base.
  - Integrar com `FyLibService` usando seletores/eventos tipados ao disparar efeitos e buscar animações.
  - Respeitar a prioridade de efeitos: AppConfig global > prop da instância.
  - **Ícones e Cores:** Se o componente usa ícones, resolva a cor via tokens de efeito (ex: `effects.<componente>.iconColor`) e passe explicitamente para o `fy-icon` para evitar conflitos de herança.
- **Acessibilidade (A11y) - Obrigatório:**
  - Implementar atributos ARIA (`aria-expanded`, `aria-controls`, `role="button"`, etc).
  - Garantir navegação completa por teclado (suporte a `Enter` e `Space` em elementos interativos).
  - Gerenciar `tabindex` corretamente para focagem sequencial.
- **Testes Automatizados - Obrigatório:**
  - **Unitários (Core/Utils):** Criar arquivos `*.test.ts` usando Vitest para qualquer lógica de utilitário ou serviço.
  - **Componente (Adapter):** Criar arquivos `*.spec.ts` (ex: `accordion-a11y.spec.ts`) para validar renderização, estados e conformidade A11y.
  - **Verificação Local:** Executar `tools/test-all.bat` e garantir que 100% dos testes passem antes do commit.

---

## 🛠️ Nota: Componentes Utilitários no Adapter (ex.: fy-badge)

Além dos componentes definidos no catálogo, o adapter pode expor componentes utilitários simples que dependem apenas de tokens, sem definição no `@fylib/catalog`. Exemplo: `fy-badge` — um selo leve para rótulos como “BETA”/“NEW”:

- Estilos controlados por tokens em `effects.badge`:
  - `background`, `textColor`, `borderRadius`, `animation` (`'shine' | 'none'`).
- Uso típico junto à logo nos slots de layout:
  - Header: `[fy-header-logo]`, `[fy-header-links]`, `[fy-header-meta]`.
  - Sidebar: `[fy-sidebar-logo]`, `[fy-sidebar-header]`, `[fy-sidebar-links]`, `[fy-sidebar-footer]`.

Esses utilitários mantêm a arquitetura limpa: comportamento agnóstico no núcleo e estilização guiada por tokens no adapter.

Uso no adapter Angular:
- Slots nativos:
  - `[fy-card-header]` para conteúdo de header (opcional)
  - `[fy-card-actions]` para área de botões dentro do conteúdo
  - `[fy-card-footer]` para conteúdo do footer (opcional)
- Modo `form` envolve o conteúdo em `<form>` e emite `fySubmit`.
