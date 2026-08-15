$ErrorActionPreference = "Stop"
$Repo = Split-Path -Parent $PSScriptRoot
Set-Location $Repo

$Python = Join-Path $Repo ".venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
  throw ".venv not found. Run scripts/bootstrap.ps1 first."
}

Write-Host "[1/3] TypeScript checks" -ForegroundColor Cyan
npm run typecheck

Write-Host "[2/3] Core tests" -ForegroundColor Cyan
npm test

Write-Host "[3/3] API tests" -ForegroundColor Cyan
& $Python -m pytest apps/api/tests

Write-Host "All checks passed." -ForegroundColor Green
