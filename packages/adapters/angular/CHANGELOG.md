# @fylib/adapter-angular

## 0.2.9

### Patch Changes

- Updated dependencies [afb59d8]
  - @fylib/config@0.2.2
  - @fylib/core@0.2.1
  - @fylib/crypto@0.2.1
  - @fylib/animation@0.2.1
  - @fylib/catalog@0.2.1
  - @fylib/logger@0.2.1
  - @fylib/theme@0.2.1

## 0.2.8

### Patch Changes

- Updated dependencies [8f16cc6]
  - @fylib/config@0.2.1

## 0.2.7

### Patch Changes

- feace8f: fix: corrigido build do adapter-angular para usar o Angular Compiler (ngc) em modo partial, garantindo suporte a componentes standalone em projetos externos (Angular 17+)

## 0.2.5

### Patch Changes

- 03f8c00: fix: corrigido imports duplicados do angular/core no app.ts, corrigido erro de standalone imports no ng-add, implementada lógica inteligente para não sobrescrever html customizado do usuário (suportando app.component.html e app.html) e adicionada rota de boas-vindas fylib-welcome

## 0.2.3

### Patch Changes

- df6eca8: fix: corrige erro de standalone imports no app.component e adiciona página de boas-vindas temática no ng-add

## 0.2.2

### Patch Changes

- ec51708: fix: corrigido ng-add schematic para evitar duplicação de pasta, remover extensão .template e usar ThemeConfig no tema

## 0.2.1

### Patch Changes

- 92eef71: fix: corrige ng-add schematic para criar arquivos de config na pasta fylib e instalar dependências automaticamente

## 0.2.0

### Minor Changes

- b004b68: schematics for angular

### Patch Changes

- Updated dependencies [b004b68]
  - @fylib/animation@0.2.0
  - @fylib/catalog@0.2.0
  - @fylib/config@0.2.0
  - @fylib/core@0.2.0
  - @fylib/crypto@0.2.0
  - @fylib/logger@0.2.0
  - @fylib/theme@0.2.0
