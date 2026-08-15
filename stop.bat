@echo off
setlocal
cd /d "%~dp0"
title Prompt Studio - Stop

echo ========================================
echo   Prompt Studio V0.3 - Stop Servers
echo ========================================
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "$ports = 5173,8000; $stopped = 0; foreach ($port in $ports) { $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue; foreach ($connection in $connections) { $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue; if (-not $process) { continue }; if ($process.ProcessName -in @('node','python','pythonw')) { Write-Host ('[STOP] Port {0}: {1} (PID {2})' -f $port,$process.ProcessName,$process.Id); Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue; $stopped++ } else { Write-Host ('[SKIP] Port {0} is owned by {1} (PID {2}); not stopping it.' -f $port,$process.ProcessName,$process.Id) -ForegroundColor Yellow } } }; if ($stopped -eq 0) { Write-Host '[INFO] No Prompt Studio node/python listeners found on ports 5173/8000.' } else { Write-Host ('[OK] Stopped {0} server process(es).' -f $stopped) -ForegroundColor Green }"

echo.
pause
exit /b 0
