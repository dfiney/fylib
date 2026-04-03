@echo off
setlocal enabledelayedexpansion

:: Cores simples para o terminal Windows (se suportado)
set "GREEN=[32m"
set "RED=[31m"
set "CYAN=[36m"
set "RESET=[0m"

echo [fyLib] Iniciando Build do Workspace...

:: Garante que estamos na raiz do projeto (um nível acima da pasta tools)
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%.."

:: Verifica se o pnpm está disponível
where pnpm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%[Erro] pnpm nao encontrado. Por favor, instale o pnpm.%RESET%
    pause
    exit /b 1
)

:: Verifica se o Turbo Repo está disponível para um build mais inteligente
where turbo >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [fyLib] Usando Turbo Repo para build otimizado...
    call pnpm exec turbo run build
) else (
    echo [fyLib] Turbo nao encontrado. Usando pnpm recursive build...
    echo [fyLib] Build deterministico via TypeScript Project References...
    call pnpm exec tsc -b packages/core packages/logger packages/crypto packages/animation packages/config packages/theme packages/catalog packages/adapters/angular
)

:: Instala dependências dos servidores de teste
if exist "test-servers\sse-server\package.json" (
    echo [fyLib] Instalando dependencias do SSE server...
    pushd test-servers\sse-server
    call npm install
    popd
)

if exist "test-servers\crypto-server\package.json" (
    echo [fyLib] Instalando dependencias do Crypto server...
    pushd test-servers\crypto-server
    call npm install
    popd
)

:: Build do Playground Angular (opcional, se presente)
where pnpm >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo [fyLib] Build do Playground Angular...
  call pnpm --filter playground build
)

if %ERRORLEVEL% equ 0 (
    echo.
    echo %GREEN%[fyLib] Todos os modulos foram compilados com sucesso!%RESET%
) else (
    echo.
    echo %RED%[fyLib] Ocorreu um erro durante o build de um ou mais modulos.%RESET%
    echo Verifique os logs acima para identificar o erro.
)

pause
