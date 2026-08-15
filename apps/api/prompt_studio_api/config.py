from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Settings:
    repo_root: Path
    data_dir: Path
    database_path: Path
    media_dir: Path
    cors_origins: tuple[str, ...]


def load_settings() -> Settings:
    repo_root = Path(__file__).resolve().parents[3]
    configured_data_dir = Path(os.getenv("PS_DATA_DIR", ".prompt-studio"))
    data_dir = (
        configured_data_dir
        if configured_data_dir.is_absolute()
        else repo_root / configured_data_dir
    )
    media_dir = data_dir / "media"

    origins = tuple(
        item.strip()
        for item in os.getenv(
            "PS_CORS_ORIGINS",
            "http://127.0.0.1:5173,http://localhost:5173",
        ).split(",")
        if item.strip()
    )

    return Settings(
        repo_root=repo_root,
        data_dir=data_dir,
        database_path=data_dir / "prompt_studio.db",
        media_dir=media_dir,
        cors_origins=origins,
    )


settings = load_settings()
