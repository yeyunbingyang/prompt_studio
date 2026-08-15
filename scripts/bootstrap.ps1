$ErrorActionPreference = "Stop"
$Repo = Split-Path -Parent $PSScriptRoot
Set-Location $Repo

Write-Host "== Prompt Studio V0.3 bootstrap ==" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js not found. Install Node 20.19+ or 22.12+ first."
}
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  throw "Python not found. Install Python 3.10+ first."
}

$NodeParts = (node -p "process.versions.node").Split(".")
$NodeMajor = [int]$NodeParts[0]
$NodeMinor = [int]$NodeParts[1]
$NodeOk = (($NodeMajor -eq 20 -and $NodeMinor -ge 19) -or
           ($NodeMajor -eq 22 -and $NodeMinor -ge 12) -or
           ($NodeMajor -gt 22))
if (-not $NodeOk) {
  throw "Vite 8 requires Node.js 20.19+ or 22.12+."
}

Write-Host "[1/3] Installing locked web/core dependencies..."
npm ci

if (-not (Test-Path ".venv")) {
  Write-Host "[2/3] Creating Python virtual environment..."
  python -m venv .venv
} else {
  Write-Host "[2/3] Python virtual environment already exists."
}

Write-Host "[3/3] Installing API dependencies..."
& ".\.venv\Scripts\python.exe" -m pip install --upgrade pip
& ".\.venv\Scripts\python.exe" -m pip install -r "apps\api\requirements.txt"

Write-Host ""
Write-Host "Bootstrap complete." -ForegroundColor Green
Write-Host "Run: powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1"
