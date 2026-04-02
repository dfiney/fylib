@echo off
setlocal

set ROOT=%~dp0..\..
set CRYPTO_DIR=%ROOT%\test-servers\crypto-server
if not exist "%CRYPTO_DIR%" goto FAIL
pushd "%CRYPTO_DIR%"

title "fyLib - Crypto Test Server - foreground"
echo [fyLib] Iniciando Crypto Server - foreground...

where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 goto NONPM

echo [fyLib] Pasta atual: %CD%
echo [fyLib] Node: 
node -v
echo [fyLib] NPM: 
npm -v

if not exist "node_modules" goto INSTALL
goto RUN

:RUN
echo [fyLib] Iniciando servidor diretamente (node server.js)...
node server.js
echo [fyLib] Processo finalizado com codigo %ERRORLEVEL%
pause
exit /b %ERRORLEVEL%

:INSTALL
echo [fyLib] Instalando dependencias...
call npm install
goto RUN

:NONPM
echo [Erro] npm nao encontrado. Por favor, instale o Node.js (inclui npm).
pause
exit /b 1

:FAIL
echo [Erro] Nao foi possivel acessar a pasta do Crypto Server: %CRYPTO_DIR%
pause
exit /b 1
