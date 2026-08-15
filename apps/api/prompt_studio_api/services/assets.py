from __future__ import annotations

import json
import sqlite3

from fastapi import HTTPException, status

from ..models import (
    AssetCreate,
    AssetDetail,
    AssetSummary,
    AssetUpdate,
    PromptVariantOut,
)
from ..repositories import assets as repository


def _summary(row: sqlite3.Row) -> AssetSummary:
    return AssetSummary(**dict(row))


def _prompt(row: sqlite3.Row) -> PromptVariantOut:
    data = dict(row)
    data["structured_parameters"] = json.loads(
        data.get("structured_parameters") or "{}"
    )
    data.pop("created_at", None)
    return PromptVariantOut(**data)


def create(payload: AssetCreate) -> AssetDetail:
    asset_id = repository.create_asset(payload)
    return get(asset_id)


def list_all(q: str | None, limit: int) -> list[AssetSummary]:
    return [_summary(row) for row in repository.list_assets(q=q, limit=limit)]


def get(asset_id: str) -> AssetDetail:
    row = repository.get_asset(asset_id)
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creation Asset not found",
        )

    prompts = [
        _prompt(prompt)
        for prompt in repository.get_prompt_variants(asset_id)
    ]
    return AssetDetail(**dict(row), prompt_variants=prompts)


def update(asset_id: str, payload: AssetUpdate) -> AssetDetail:
    if not repository.update_asset(asset_id, payload):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creation Asset not found",
        )
    return get(asset_id)


def delete(asset_id: str) -> None:
    if not repository.delete_asset(asset_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Creation Asset not found",
        )
