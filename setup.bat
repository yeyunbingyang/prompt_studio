@echo off
setlocal
cd /d "%~dp0"
title Prompt Studio - Setup

echo ========================================
echo   Prompt Studio V0.3 - First-time Setup
echo ========================================
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\bootstrap.ps1"
if errorlevel 1 (
    echo.
    echo [ERROR] Setup failed. Check the message above.
    if /I not "%~1"=="--no-pause" pause
    exit /b 1
)

echo.
echo [OK] Setup complete.
echo You can now run start.bat.
echo.
if /I not "%~1"=="--no-pause" pause
exit /b 0
