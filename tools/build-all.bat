@echo off
setlocal enabledelayedexpansion

set ROOT=%~dp0..

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
if exist node_modules (
  call npm run build
) else (
  call npm ci && call npm run build
)
set ERR=%ERRORLEVEL%
popd >nul
if not %ERR%==0 (
  echo Falha no build em %PKG% (%ERR%)
  exit /b %ERR%
)
goto :eof
