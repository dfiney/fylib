@echo off
setlocal enabledelayedexpansion

echo [fyLib] Finalizando servidores locais de teste...

:: Encerrar processos Node iniciados dentro da pasta test-servers
powershell -NoProfile -Command ^
  "Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'node.exe' -and $_.CommandLine -match 'test-servers\\\\' } | ForEach-Object { Write-Host ('[fyLib] Matando PID ' + $_.ProcessId + ' - ' + $_.CommandLine); try { Stop-Process -Id $_.ProcessId -Force } catch {} }"

:: Opcional: liberar portas comuns (ex.: 3000, 3001, 3002)
powershell -NoProfile -Command ^
  "$ports = @(3000, 3001, 3002); foreach ($port in $ports) { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue; if ($conns) { $conns | ForEach-Object { try { Stop-Process -Id $_.OwningProcess -Force } catch {} } } }"

echo [fyLib] Servidores de teste finalizados.
exit /b 0

