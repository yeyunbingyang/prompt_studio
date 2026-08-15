#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -x ".venv/bin/python" ]]; then
  echo ".venv not found. Create it and install apps/api/requirements.txt first."
  exit 1
fi

.venv/bin/python -m uvicorn prompt_studio_api.main:app \
  --app-dir apps/api --reload --host 127.0.0.1 --port 8000 &
API_PID=$!
trap 'kill $API_PID 2>/dev/null || true' EXIT

npm run dev:web
