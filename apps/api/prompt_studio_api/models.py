from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field

Modality = Literal["image", "video", "3d", "audio", "text"]
AssetStatus = Literal["draft", "active", "archived"]


class PromptVariantOut(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    asset_id: str
    name: str
    language: str
    model_family: str | None = None
    positive_prompt: str
    negative_prompt: str | None = None
    structured_parameters: dict[str, Any] = Field(default_factory=dict)
    revision: int


class AssetCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=200)
    modality: Modality
    description: str = ""
    status: AssetStatus = "draft"
    template_id: str | None = None
    positive_prompt: str = ""
    negative_prompt: str | None = None
    language: str = "zh-CN"


class AssetUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = None
    status: AssetStatus | None = None


class AssetSummary(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    title: str
    modality: Modality
    description: str
    status: AssetStatus
    template_id: str | None = None
    cover_media_id: str | None = None
    forked_from: str | None = None
    created_at: datetime
    updated_at: datetime


class AssetDetail(AssetSummary):
    prompt_variants: list[PromptVariantOut] = Field(default_factory=list)
