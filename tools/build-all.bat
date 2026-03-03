@echo off
setlocal enabledelayedexpansion

set ROOT=%~dp0..

where pnpm >nul 2>&1
if errorlevel 1 (
  echo pnpm nao encontrado. Habilite com "corepack enable" e "corepack prepare pnpm@latest --activate"
  exit /b 1
)

pushd "%ROOT%" >nul
if exist node_modules (
  echo Dependencias do workspace ja instaladas
) else (
  call pnpm install --frozen-lockfile
  if not %ERRORLEVEL%==0 (
    echo Falha ao instalar dependencias do workspace (%ERRORLEVEL%)
    popd >nul
    exit /b %ERRORLEVEL%
  )
)
popd >nul

call :build "%ROOT%\packages\core"
call :build "%ROOT%\packages\config"
call :build "%ROOT%\packages\animation"
call :build "%ROOT%\packages\theme"
call :build "%ROOT%\packages\catalog"
call :build "%ROOT%\packages\adapters\angular"

echo Build concluido
exit /b 0

:build
set PKG=%~1
if not exist "%PKG%\package.json" goto :eof
pushd "%PKG%" >nul
call pnpm run build
set ERR=%ERRORLEVEL%
popd >nul
if not %ERR%==0 (
  echo Falha no build em %PKG% (%ERR%)
  exit /b %ERR%
)
goto :eof