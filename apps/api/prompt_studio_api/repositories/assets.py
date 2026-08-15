from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from uuid import uuid4

from ..database import connection
from ..models import AssetCreate, AssetUpdate


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def create_asset(payload: AssetCreate) -> str:
    asset_id = str(uuid4())
    prompt_id = str(uuid4())
    timestamp = _now()

    with connection() as db:
        db.execute(
            """
            INSERT INTO creation_assets (
                id, title, modality, description, template_id, status,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                asset_id,
                payload.title,
                payload.modality,
                payload.description,
                payload.template_id,
                payload.status,
                timestamp,
                timestamp,
            ),
        )
        db.execute(
            """
            INSERT INTO prompt_variants (
                id, asset_id, name, language, positive_prompt,
                negative_prompt, structured_parameters, revision
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                prompt_id,
                asset_id,
                "Base",
                payload.language,
                payload.positive_prompt,
                payload.negative_prompt,
                json.dumps(payload.structured_parameters, ensure_ascii=False),
                1,
            ),
        )
        db.commit()

    return asset_id


def list_assets(q: str | None = None, limit: int = 100) -> list[sqlite3.Row]:
    sql = """
        SELECT *
        FROM creation_assets
    """
    params: list[object] = []
    if q:
        sql += " WHERE title LIKE ? OR description LIKE ?"
        needle = f"%{q}%"
        params.extend([needle, needle])
    sql += " ORDER BY updated_at DESC LIMIT ?"
    params.append(limit)

    with connection() as db:
        return list(db.execute(sql, params).fetchall())


def get_asset(asset_id: str) -> sqlite3.Row | None:
    with connection() as db:
        return db.execute(
            "SELECT * FROM creation_assets WHERE id = ?",
            (asset_id,),
        ).fetchone()


def get_prompt_variants(asset_id: str) -> list[sqlite3.Row]:
    with connection() as db:
        return list(
            db.execute(
                """
                SELECT *
                FROM prompt_variants
                WHERE asset_id = ?
                ORDER BY revision DESC
                """,
                (asset_id,),
            ).fetchall()
        )


def update_asset(asset_id: str, payload: AssetUpdate) -> bool:
    changes = payload.model_dump(exclude_none=True)
    if not changes:
        return get_asset(asset_id) is not None

    allowed = {"title", "description", "status"}
    changes = {key: value for key, value in changes.items() if key in allowed}
    if not changes:
        return False

    changes["updated_at"] = _now()
    assignments = ", ".join(f"{key} = ?" for key in changes)
    values = [*changes.values(), asset_id]

    with connection() as db:
        cursor = db.execute(
            f"UPDATE creation_assets SET {assignments} WHERE id = ?",
            values,
        )
        db.commit()
        return cursor.rowcount > 0


def delete_asset(asset_id: str) -> bool:
    with connection() as db:
        cursor = db.execute(
            "DELETE FROM creation_assets WHERE id = ?",
            (asset_id,),
        )
        db.commit()
        return cursor.rowcount > 0
