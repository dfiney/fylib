@echo off
setlocal

:: Cores simples para o terminal Windows
set "GREEN=[32m"
set "RED=[31m"
set "CYAN=[36m"
set "RESET=[0m"

echo [fyLib] Iniciando Playground Angular...

set "ROOT=%~dp0.."
cd /d "%ROOT%"

:: Pergunta se deseja iniciar os servidores de teste
set /p START_SERVERS="Deseja iniciar os servidores locais de teste? (S/N): "
if /i "%START_SERVERS%"=="S" goto START_TEST_SERVERS
goto START_PLAYGROUND

:START_TEST_SERVERS
echo [fyLib] Iniciando servidores de teste em background...
call "%~dp0start-all-test-servers.bat" BG
echo [fyLib] Aguardando servidores iniciarem...
timeout /t 5 /nobreak >nul
goto START_PLAYGROUND

:: Verifica se o pnpm está disponível
where pnpm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%[Erro] pnpm nao encontrado. Por favor, instale o pnpm.%RESET%
    pause
    exit /b 1
)

:START_PLAYGROUND
where pnpm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%[Erro] pnpm nao encontrado. Por favor, instale o pnpm.%RESET%
    pause
    exit /b 1
)
echo [fyLib] Executando: pnpm --filter playground start
call pnpm --filter playground start

if %ERRORLEVEL% neq 0 (
    echo.
    echo %RED%[fyLib] O Playground parou inesperadamente (Erro: %ERRORLEVEL%).%RESET%
    echo [fyLib] Encerrando servidores locais de teste por segurança...
    call "%~dp0stop-test-servers.bat"
    pause
)

:: Encerrar servidores locais de teste por segurança (quando não houve erro também)
echo [fyLib] Encerrando servidores locais de teste...
call "%~dp0stop-test-servers.bat"
