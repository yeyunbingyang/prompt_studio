@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Prompt Studio - Launcher

echo ========================================
echo   Prompt Studio V0.3 - One-click Start
echo ========================================
echo.

if not exist ".venv\Scripts\python.exe" (
    echo [INFO] First run detected. Running setup...
    call "%~dp0setup.bat"
    if errorlevel 1 exit /b 1
)

powershell.exe -NoLogo -NoProfile -Command "$web = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue; $api = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue; if ($web -and $api) { exit 0 } else { exit 1 }"
if not errorlevel 1 (
    echo [INFO] Prompt Studio is already running.
    start "" "http://127.0.0.1:5173"
    exit /b 0
)

echo [INFO] Starting API and Web development servers...
start "Prompt Studio Dev" powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\dev.ps1"

echo [INFO] Waiting for the Web server...
powershell.exe -NoLogo -NoProfile -Command "$deadline=(Get-Date).AddSeconds(30); do { if (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue) { exit 0 }; Start-Sleep -Milliseconds 500 } while ((Get-Date) -lt $deadline); exit 1"
if errorlevel 1 (
    echo [WARN] Web server did not become ready within 30 seconds.
    echo        Check the Prompt Studio Dev window for errors.
    pause
    exit /b 1
)

echo [OK] Prompt Studio is ready.
start "" "http://127.0.0.1:5173"
exit /b 0
