from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import __version__
from .config import settings
from .database import initialize_database
from .routers.assets import router as assets_router
from .routers.health import router as health_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


app = FastAPI(
    title="Prompt Studio Local API",
    version=__version__,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_origins),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1", tags=["system"])
app.include_router(assets_router, prefix="/api/v1/assets", tags=["assets"])


@app.get("/")
def root() -> dict[str, str]:
    return {
        "name": "Prompt Studio Local API",
        "version": __version__,
        "docs": "/docs",
    }
