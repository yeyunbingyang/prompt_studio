from fastapi.testclient import TestClient

from prompt_studio_api.main import app


def test_asset_lifecycle():
    with TestClient(app) as client:
        created = client.post(
            "/api/v1/assets",
            json={
                "title": "Test Asset",
                "modality": "image",
                "positive_prompt": "cinematic portrait"
            },
        )
        assert created.status_code == 201
        asset_id = created.json()["id"]

        listed = client.get("/api/v1/assets?q=Test")
        assert listed.status_code == 200
        assert any(item["id"] == asset_id for item in listed.json())

        updated = client.patch(
            f"/api/v1/assets/{asset_id}",
            json={"status": "active", "description": "ready"},
        )
        assert updated.status_code == 200
        assert updated.json()["status"] == "active"

        deleted = client.delete(f"/api/v1/assets/{asset_id}")
        assert deleted.status_code == 204

        missing = client.get(f"/api/v1/assets/{asset_id}")
        assert missing.status_code == 404


def test_structured_parameters_round_trip():
    structured = {
        "schema": "prompt-studio.visual-parameters.v1",
        "subject": "adult portrait",
        "visual_parameters": {
            "view": ["three-quarter"],
            "lens": ["85mm"],
            "lighting": ["cinematic-side"],
        },
        "visual_parameter_count": 3,
    }

    with TestClient(app) as client:
        created = client.post(
            "/api/v1/assets",
            json={
                "title": "Structured Visual Asset",
                "modality": "image",
                "positive_prompt": "portrait, three-quarter view, 85mm portrait lens",
                "structured_parameters": structured,
            },
        )
        assert created.status_code == 201
        payload = created.json()
        asset_id = payload["id"]
        assert payload["prompt_variants"][0]["structured_parameters"] == structured

        fetched = client.get(f"/api/v1/assets/{asset_id}")
        assert fetched.status_code == 200
        assert fetched.json()["prompt_variants"][0]["structured_parameters"] == structured

        deleted = client.delete(f"/api/v1/assets/{asset_id}")
        assert deleted.status_code == 204
