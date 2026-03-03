@echo off
setlocal enabledelayedexpansion

:: Cores simples para o terminal Windows (se suportado)
set "GREEN=[32m"
set "RED=[31m"
set "YELLOW=[33m"
set "RESET=[0m"

echo [fyLib] Iniciando limpeza profunda (Clean Install)...

:: Volta para a raiz do projeto a partir da pasta tools
cd ..

echo [1/4] Removendo node_modules, dist e caches...

:: Remove pastas da raiz
for %%p in (node_modules .angular .turbo dist) do (
    if exist "%%p" (
        echo Removendo pasta da raiz: "%%p"...
        rmdir /s /q "%%p"
    )
)

:: Remove node_modules, dist e .tsbuildinfo recursivamente
echo Limpando subpastas (packages e examples)...
for /d /r %%i in (node_modules dist .angular) do (
    if exist "%%i" (
        echo Removendo "%%i"...
        rmdir /s /q "%%i"
    )
)

:: Remove node_modules e dist em test-servers e subpastas
if exist "test-servers" (
    echo Limpando test-servers...
    for /d /r "test-servers" %%i in (node_modules dist) do (
        if exist "%%i" (
            echo Removendo "%%i"...
            rmdir /s /q "%%i"
        )
    )
)

:: Remove arquivos .tsbuildinfo
del /s /q /f *.tsbuildinfo >nul 2>&1

echo [2/4] Limpando cache do pnpm...
call pnpm store prune

echo [3/4] Removendo pnpm-lock.yaml...
if exist pnpm-lock.yaml (
    del /f /q pnpm-lock.yaml
)

echo [4/4] Instalando dependencias via pnpm...
call pnpm install

if %ERRORLEVEL% equ 0 (
    echo.
    echo %GREEN%[fyLib] Clean Install concluido com sucesso!%RESET%
    echo.
    echo %YELLOW%IMPORTANTE:%RESET%
    echo 1. Feche sua IDE (Trae, VS Code, etc) para evitar conflitos de cache e tipos.
    echo 2. Execute o script %GREEN%tools\build-all.bat%RESET% para recompilar todos os modulos.
    echo.
) else (
    echo.
    echo %RED%[fyLib] Ocorreu um erro durante a instalacao.%RESET%
)

pause
