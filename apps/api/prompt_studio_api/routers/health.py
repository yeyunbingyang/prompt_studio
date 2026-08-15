from fastapi import APIRouter

from .. import __version__
from ..config import settings

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "version": __version__,
        "database": str(settings.database_path),
    }
