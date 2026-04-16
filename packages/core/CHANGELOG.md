# @fylib/core

## 0.3.0

### Minor Changes

- d716809: feat: adicionado suporte a estilos por variante de componente (`componentVariants`) diretamente na `ThemeDefinition`.
  feat: todos os temas padrão foram atualizados com estilos específicos para variantes de botões, cards e outros componentes, reforçando a identidade visual de cada tema (XP, Win7, Puffy, Nexus, etc.).
  feat: todos os componentes do adapter Angular agora respeitam as variações de estilo definidas pelo tema ativo, permitindo customização profunda sem alteração de código.

## 0.2.2

### Patch Changes

- 5a1591a: fix: campos das interfaces de configuração (AppConfig, LoggingConfig, ThemeConfig, SSEConfig, CryptoConfig) e Design Tokens tornados opcionais para maior flexibilidade e suporte a configurações parciais.

## 0.2.1

### Patch Changes

- afb59d8: fix: tornados opcionais diversos campos nas interfaces de configuração (AppConfig, LoggingConfig, ThemeConfig, SSEConfig, CryptoConfig) e nos Design Tokens para aumentar a flexibilidade e evitar erros de validação em configurações parciais.

## 0.2.0

### Minor Changes

- b004b68: schematics for angular
