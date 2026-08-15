from fastapi import APIRouter, Query, Response, status

from ..models import AssetCreate, AssetDetail, AssetSummary, AssetUpdate
from ..services import assets as service

router = APIRouter()


@router.get("", response_model=list[AssetSummary])
def list_assets(
    q: str | None = Query(default=None, max_length=200),
    limit: int = Query(default=100, ge=1, le=500),
) -> list[AssetSummary]:
    return service.list_all(q=q, limit=limit)


@router.post("", response_model=AssetDetail, status_code=status.HTTP_201_CREATED)
def create_asset(payload: AssetCreate) -> AssetDetail:
    return service.create(payload)


@router.get("/{asset_id}", response_model=AssetDetail)
def get_asset(asset_id: str) -> AssetDetail:
    return service.get(asset_id)


@router.patch("/{asset_id}", response_model=AssetDetail)
def update_asset(asset_id: str, payload: AssetUpdate) -> AssetDetail:
    return service.update(asset_id, payload)


@router.delete("/{asset_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_asset(asset_id: str) -> Response:
    service.delete(asset_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
