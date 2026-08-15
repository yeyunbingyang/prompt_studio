from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from typing import Iterator

from .config import settings


def _ensure_runtime_directories() -> None:
    settings.data_dir.mkdir(parents=True, exist_ok=True)
    for folder in ("covers", "references", "outputs", "thumbnails"):
        (settings.media_dir / folder).mkdir(parents=True, exist_ok=True)


def initialize_database() -> None:
    _ensure_runtime_directories()
    migration = settings.repo_root / "data" / "migrations" / "0001_init.sql"
    if not migration.exists():
        raise RuntimeError(f"Database migration is missing: {migration}")

    with sqlite3.connect(settings.database_path) as connection:
        connection.executescript(migration.read_text(encoding="utf-8"))
        connection.commit()


@contextmanager
def connection() -> Iterator[sqlite3.Connection]:
    db = sqlite3.connect(settings.database_path)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys = ON")
    try:
        yield db
    finally:
        db.close()
