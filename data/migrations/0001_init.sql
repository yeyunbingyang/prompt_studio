PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS app_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT OR IGNORE INTO app_meta (key, value) VALUES ('schema_version', '1');

CREATE TABLE IF NOT EXISTS creation_assets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    modality TEXT NOT NULL CHECK (modality IN ('image', 'video', '3d', 'audio', 'text')),
    description TEXT NOT NULL DEFAULT '',
    template_id TEXT,
    cover_media_id TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    forked_from TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_creation_assets_updated_at
    ON creation_assets(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_creation_assets_modality
    ON creation_assets(modality);

CREATE TABLE IF NOT EXISTS prompt_variants (
    id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES creation_assets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'zh-CN',
    model_family TEXT,
    positive_prompt TEXT NOT NULL DEFAULT '',
    negative_prompt TEXT,
    structured_parameters TEXT NOT NULL DEFAULT '{}',
    revision INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_prompt_variants_asset
    ON prompt_variants(asset_id);

CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    asset_id TEXT REFERENCES creation_assets(id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (kind IN ('cover', 'reference', 'output', 'thumbnail')),
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'audio')),
    relative_path TEXT NOT NULL,
    sha256 TEXT,
    width INTEGER,
    height INTEGER,
    duration_seconds REAL,
    metadata TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY,
    version INTEGER NOT NULL,
    title TEXT NOT NULL,
    modality TEXT NOT NULL,
    definition_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id, version)
);

CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    graph_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workflow_bindings (
    asset_id TEXT PRIMARY KEY REFERENCES creation_assets(id) ON DELETE CASCADE,
    workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS model_bindings (
    id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES creation_assets(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    model_id TEXT NOT NULL,
    profile_json TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS asset_versions (
    id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES creation_assets(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    snapshot_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS asset_tags (
    asset_id TEXT NOT NULL REFERENCES creation_assets(id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (asset_id, tag_id)
);

CREATE TABLE IF NOT EXISTS run_records (
    id TEXT PRIMARY KEY,
    asset_id TEXT REFERENCES creation_assets(id) ON DELETE SET NULL,
    adapter_id TEXT NOT NULL,
    external_run_id TEXT,
    status TEXT NOT NULL,
    request_json TEXT NOT NULL DEFAULT '{}',
    response_json TEXT,
    error_text TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
