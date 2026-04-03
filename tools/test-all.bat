@echo off
setlocal

echo [fyLib] Iniciando suite completa de testes automatizados...

:: Navegar para a raiz do projeto (um nível acima de tools)
cd /d "%~dp0.."

:: Verificar se as dependências estão instaladas
if not exist "node_modules" (
    echo [fyLib] node_modules não encontrado. Executando pnpm install...
    call pnpm install
)

:: Executar testes via Turbo (incluindo Vitest nos pacotes core e Jasmine/Vitest no Angular)
echo [fyLib] Executando turbo test...
call pnpm turbo test

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Falha em um ou mais testes. Verifique os logs acima.
    exit /b %ERRORLEVEL%
)

echo.
echo [SUCCESS] Todos os testes passaram com sucesso! (A11y e Unitarios)
echo.

endlocal
pause
