@echo off
setlocal
cd /d "%~dp0"
title Prompt Studio - Check

echo ========================================
echo   Prompt Studio V0.3 - Project Check
echo ========================================
echo.

if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] Environment is not initialized.
    echo Run setup.bat first.
    echo.
    pause
    exit /b 1
)

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\check.ps1"
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if "%EXIT_CODE%"=="0" (
    echo [OK] All checks passed.
) else (
    echo [ERROR] Checks failed with exit code %EXIT_CODE%.
)
echo.
pause
exit /b %EXIT_CODE%
