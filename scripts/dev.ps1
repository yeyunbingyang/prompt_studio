$ErrorActionPreference = "Stop"
$Repo = Split-Path -Parent $PSScriptRoot
Set-Location $Repo

$Python = Join-Path $Repo ".venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
  throw ".venv not found. Run scripts/bootstrap.ps1 first."
}

$ApiCommand = "& '$Python' -m uvicorn prompt_studio_api.main:app --app-dir '$Repo\apps\api' --reload --host 127.0.0.1 --port 8000"
Start-Process powershell -WorkingDirectory $Repo -ArgumentList "-NoExit", "-Command", $ApiCommand

Write-Host "API started in a new PowerShell window." -ForegroundColor Green
Write-Host "Starting Vite at http://127.0.0.1:5173 ..." -ForegroundColor Cyan
npm run dev:web
