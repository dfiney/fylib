# FyLib

<p align="center">
  <img src="assets/fylib-logo-icone.png" alt="FyLib Icon" height="96" />
  <img src="assets/fylib-logo-texto.png" alt="FyLib Logo Text" height="96" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
</p>

Plataforma modular de UI, corporativa, focada em interfaces configuráveis, tematizáveis e animadas para Angular e React — com licenciamento e controle de features integrados.

## Visão Geral
- Separação de definição (contratos) e renderização (adapters)
- Sistema de temas com Design Tokens e suporte a Light/Dark
- Motor de animações e efeitos desacoplado
- Configuração dinâmica por JSON/objeto tipado
- Suporte a licenças e validação de features

Consulte a visão técnica em [ARCHITECTURE.md](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/doc/ARCHITECTURE.md).

## Instalação (Colaboradores)
Passo a passo do zero, no Windows:

1. Instale o Node.js (LTS)
   - Baixe em: https://nodejs.org
2. Habilite o pnpm
   - PowerShell:
     - corepack enable
     - corepack prepare pnpm@latest --activate
   - Alternativa: npm install -g pnpm
3. Clone o repositório
   - git clone https://github.com/finey/fylib.git
   - cd fylib
4. Opcional: TypeScript global
   - Não é obrigatório (projeto usa TypeScript local)
   - Se preferir: npm install -g typescript
5. Build de todos os módulos
   - Execute: tools/build-all.bat
   - Esse script roda em cada pacote: npm ci (se necessário) e npm run build

Após o build, os pacotes em packages/ estarão compilados. O playground Angular em examples/angular/playground pode ser usado para testar as integrações do adapter.

## Tecnologias
- TypeScript, Node.js
- Angular (Adapter), React (Adapter)
- Design Tokens (Theme Engine)
- Animation/Efffects Engine
- pnpm (gerenciador de pacotes recomendado)

## Documentação
- Arquitetura: [ARCHITECTURE.md](file:///c:/Users/victo/Documents/victor/projetos/finey/fylib/doc/ARCHITECTURE.md)
- Em breve: guia completo da biblioteca, padrões de componentes, temas e efeitos.

## Contribuição
- Abra issues e pull requests com descrições objetivas
- Siga os contratos do catálogo ao propor novos componentes
- Mantenha consistência com tokens e animações por tema

## Direitos Autorais
© Finey 2026 — Todos os direitos reservados.
