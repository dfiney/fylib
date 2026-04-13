# Pipeline CI/CD e Estratégia de Versionamento

Este documento descreve a arquitetura da pipeline de CI/CD do **fyLib**, integrando GitHub Actions para automação de testes, build e publicação no npm.

## 1. Estratégia de Branches

Adotamos um modelo de ramificação focado em estabilidade e suporte a múltiplas versões:

| Branch | Propósito | Ação da Pipeline |
| :--- | :--- | :--- |
| `main` | Versão estável e mais recente (`latest`). | Build, Teste e Publicação automática no npm. |
| `release/X.Y` | Manutenção de versões específicas (ex: `release/1.1`). | Build, Teste e Publicação de patches para a versão X.Y. |
| `hotfix/*` | Correções críticas de emergência. | Build, Teste e Publicação acelerada. |
| `feature/*` | Desenvolvimento de novas funcionalidades. | Apenas Build e Teste (sem publicação). |
| `fix/*` | Correções de bugs menores. | Apenas Build e Teste (sem publicação). |

## 2. Fluxo de Trabalho (Workflow)

### Integração Contínua (CI)
Toda Pull Request (PR) aberta para `main`, `release/*` ou `hotfix/*` dispara o workflow de CI:
1. **Instalação**: Instala dependências usando `pnpm`.
2. **Lint**: Verifica padrões de código e estilo.
3. **Build**: Compila todos os pacotes do monorepo usando `TurboRepo`.
4. **Test**: Executa a suíte de testes unitários e de integração.

### Entrega Contínua (CD)
Após o merge em branches protegidas (`main` ou `release/*`), o workflow de CD é iniciado:
1. **Versionamento**: O sistema utiliza `Changesets` para detectar quais pacotes foram alterados e determinar o próximo número de versão (semântico).
2. **Publicação**: 
   - Se for na `main`, publica com a tag `latest`.
   - Se for em `release/X.Y`, publica o patch correspondente.
3. **Documentação**: Atualiza automaticamente a documentação estática se houver mudanças relevantes.

## 3. Versionamento Semântico (SemVer)

Seguimos o padrão `MAJOR.MINOR.PATCH`:
- **MAJOR**: Mudanças incompatíveis na API.
- **MINOR**: Novas funcionalidades (retrocompatíveis).
- **PATCH**: Correções de bugs (retrocompatíveis).

## 4. Configuração Técnica

### GitHub Actions
Os arquivos de configuração residem em `.github/workflows/`:
- `ci.yml`: Validação de código.
- `release.yml`: Publicação no npm e criação de tags no GitHub.

### Segredos Necessários (GitHub Secrets)

Para que a pipeline funcione, você deve configurar os segredos no seu repositório do GitHub seguindo estes passos:

1. Acesse o seu repositório no **GitHub**.
2. Vá em **Settings** (Configurações) no menu superior.
3. No menu lateral esquerdo, procure por **Secrets and variables** e clique em **Actions**.
4. Clique no botão verde **New repository secret**.

#### 1. NPM_TOKEN
Este token permite que o GitHub publique seus pacotes no npmjs.com.
- **Como gerar**:
  - Faça login no [npmjs.com](https://www.npmjs.com/).
  - Vá em **Access Tokens** > **Generate New Token** > **Classic Token**.
  - Selecione o tipo **Automation** (para que ele ignore o 2FA durante a publicação).
  - Copie o token gerado.
- **No GitHub**: Nomeie como `NPM_TOKEN` e cole o valor.

#### 2. GH_TOKEN
Este token permite que a pipeline crie Pull Requests de versão, faça commits e crie Releases no GitHub.
- **Como gerar**:
  - Vá nas suas configurações pessoais do GitHub (**Settings** do seu perfil, não do repo).
  - Vá em **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
  - Clique em **Generate new token (classic)**.
  - Selecione os escopos: `repo` (total) e `workflow`.
  - Copie o token gerado.
- **No GitHub**: Nomeie como `GH_TOKEN` e cole o valor.

---
## 5. Como usar o sistema de versões (Changesets)

Para gerenciar as versões, utilizamos o `Changesets`. Siga este fluxo:

1. **Ao criar uma feature/fix**:
   - Após finalizar as mudanças, execute `npx changeset`.
   - Escolha quais pacotes foram alterados (use as setas e espaço).
   - Escolha o tipo de mudança (patch, minor, major).
   - Escreva uma descrição curta da mudança.
   - Um arquivo será criado na pasta `.changeset/`. Adicione-o ao seu commit.

2. **Ao fazer o Merge na `main` ou `release/*`**:
   - A pipeline de CD detectará o novo arquivo de changeset.
   - Ela criará automaticamente uma PR chamada "Version Packages".
   - Quando esta PR for mergeada, a pipeline publicará os pacotes no npm e criará as tags no GitHub.

3. **Branches de Versão (`release/X.Y`)**:
   - Para manter uma versão antiga, crie uma branch `release/1.1` a partir da tag correspondente.
   - Mudanças mergeadas nesta branch também dispararão o fluxo de publicação do Changesets.

---
*Documentação atualizada em 03/04/2026 – Equipe fyLib.*
