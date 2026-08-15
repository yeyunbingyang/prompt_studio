# Prompt Studio Local API

FastAPI local service for V0.3.

Run from repository root:

```powershell
.\.venv\Scripts\python.exe -m uvicorn prompt_studio_api.main:app --app-dir apps/api --reload
```

Endpoints:

- `GET /api/v1/health`
- `GET /api/v1/assets`
- `POST /api/v1/assets`
- `GET /api/v1/assets/{asset_id}`
- `PATCH /api/v1/assets/{asset_id}`
- `DELETE /api/v1/assets/{asset_id}`
