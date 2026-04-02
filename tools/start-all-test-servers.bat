@echo off
setlocal

set ROOT=%~dp0..
cd /d "%ROOT%"

echo [fyLib] Iniciando todos os servidores de teste em background...

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 goto NONPM

set "MODE=%~1"
if /I "%MODE%"=="BG" goto START_BG
goto START_VISIBLE

:START_BG
:: SSE Server (background minimizado)
start "SSE Server (BG)" /min cmd /c "cd /d %ROOT%\test-servers\sse-server && npm install && npm start"

:: Crypto Server (background minimizado)
start "Crypto Server (BG)" /min cmd /c "cd /d %ROOT%\test-servers\crypto-server && npm install && npm start"

:: Health-check: tenta detectar portas 3000 e 3002 abertas (até 10 tentativas)
powershell -NoProfile -Command "for ($i=0; $i -lt 10; $i++) { $p1 = Test-NetConnection -ComputerName 'localhost' -Port 3000 -InformationLevel Quiet; $p2 = Test-NetConnection -ComputerName 'localhost' -Port 3002 -InformationLevel Quiet; if ($p1 -and $p2) { Write-Host '[fyLib] SSE Server (3000) e Crypto Server (3002) estão UP'; exit 0 } Start-Sleep -Seconds 1 }; Write-Host '[fyLib] Aviso: Alguns servidores podem não ter respondido ainda'"

echo [fyLib] Comandos de inicializacao enviados. Aguarde alguns segundos para os servidores subirem.
exit /b 0

:START_VISIBLE
:: SSE Server (janela visivel, permanece aberta)
start "SSE Server" cmd /k "cd /d %ROOT%\test-servers\sse-server && npm install && npm start"

:: Crypto Server (janela visivel, permanece aberta)
start "Crypto Server" cmd /k "cd /d %ROOT%\test-servers\crypto-server && npm install && npm start"

echo [fyLib] Janelas dos servidores foram abertas. Pressione qualquer tecla para sair deste launcher.
pause
exit /b 0

:NONPM
echo [Erro] npm nao encontrado. Por favor, instale o Node.js (inclui npm).
pause
exit /b 1
