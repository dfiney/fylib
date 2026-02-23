# 🏗️ Níveis de UI e Arquitetura de Layouts

O fyLib utiliza uma abordagem profissional de separação de responsabilidades na UI, dividindo os componentes em três níveis lógicos. Esta separação garante que o sistema seja escalável, independente de framework e altamente orquestrável.

## 🧱 Os Três Níveis de UI

### Nível 1: Primitive Components (Unidades Visuais)
São os blocos básicos de construção. Eles não possuem dependências de outros componentes e focam em uma única funcionalidade atômica.
- **Características**: Altamente reutilizáveis, baseados em props, estilo próprio.
- **Exemplos**: `button`, `badge`, `input`, `spinner`.

### Nível 2: Composite Components (Componentes de Negócio)
Componentes que agrupam primitivos para formar uma unidade funcional mais complexa.
- **Características**: Possuem lógica interna, podem conter estados e compõem múltiplos componentes do Nível 1.
- **Exemplos**: `card`, `accordion`, `modal`, `navbar`.

Exemplo prático: `fy-card`
- Responsivo, integra-se com temas, animações e efeitos.
- Slots: header (`[fy-card-header]`), conteúdo (default), ações (`[fy-card-actions]`), footer (`[fy-card-footer]`).
- Modo `form`: envolve o conteúdo em `<form>` e emite `fySubmit` ao enviar.
- Opções: `mutedHeader`, `mutedFooter`, `scrollContent`, `footerText`.

### Nível 3: Layout Structures (Unidades Estruturais)
É onde a mágica da orquestração acontece. Layouts não são apenas "divs"; eles são componentes estruturais declarativos.
- **Características**: Definem regiões (slots), controlam a responsividade global e orquestram a posição dos filhos.
- **Exemplos**: `app-layout`, `grid-system`, `sidebar-layout`.

---

## 🧭 O que é um Layout no fyLib?

Um Layout é um **Structural Component**. Sua responsabilidade principal é a **composição** e a **orquestração** do espaço.

### Diferença Crítica:
| Componente Comum (Nível 1/2) | Layout (Nível 3) |
| :--- | :--- |
| Renderiza a si mesmo | Organiza os filhos |
| Focado em props e estados | Focado em slots e regiões |
| Tem estilo visual próprio | Define o comportamento responsivo |

---

## 🛠️ Implementação Técnica

### Definição Declarativa (`UILayoutDefinition`)
No catálogo, os layouts são definidos por contratos que especificam quais regiões (slots) estão disponíveis.

```typescript
export const AppLayoutDefinition: UILayoutDefinition = {
  name: 'app-layout',
  version: '1.0.0',
  slots: [
    { name: 'header', required: false },
    { name: 'sidebar', required: false },
    { name: 'content', required: true },
    { name: 'footer', required: false }
  ]
};
```

### Uso no Framework (Exemplo Angular)
O fyLib fornece componentes orquestradores que traduzem a definição para o DOM.

```html
<fy-layout name="app-layout">
  <fy-slot name="header">
    <my-navbar></my-navbar>
  </fy-slot>

  <fy-slot name="content">
    <router-outlet></router-outlet>
  </fy-slot>
</fy-layout>
```

---

## 🚀 Visão Estratégica
Ao tratar Layouts como cidadãos de primeira classe, o fyLib habilita:
1. **Schema-Driven UI**: Geração de páginas inteiras via JSON.
2. **Page Builders**: Facilidade para criar ferramentas drag-and-drop.
3. **Temas Sazonais**: Mudança não apenas de cores, mas de estrutura (ex: layout de Natal com decorações específicas).

---

## 🧠 Hierarquia de Responsabilidades
1. **Layout** → Define a **Estrutura**.
2. **Theme** → Define a **Aparência**.
3. **Animation** → Define o **Movimento**.
4. **Component** → Define o **Conteúdo**.

Na prática:
- Layouts e slots utilizam seletores tipados como `'fy-layout'`, `'fy-slot'` e `'fy-slot:sidebar'` (via `ComponentSelector` em `@fylib/config`).
- As animações de entrada (`'enter'`) e as transições de sidebar (`'open'`/`'close'`) podem ser configuradas por tema e sobrescritas via `componentAnimationsOverrides` no `AppConfig`.
- Eventos de alto nível como `'fy-layout.enter'` e `'fy-slot:sidebar.open'`/`'fy-slot:sidebar.close'` são mapeados para efeitos globais através de `effectTriggers`, usando os tipos fortes `UIEventKey` e `EffectName`.
