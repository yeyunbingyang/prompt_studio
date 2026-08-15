from __future__ import annotations


class ComfyUIAdapter:
    """V0.3 contract placeholder.

    Network calls are intentionally not implemented yet. The class exists to
    freeze the adapter boundary before ComfyUI payload details enter the app.
    """

    adapter_id = "comfyui"

    async def health(self) -> bool:
        return False

    async def submit(self, payload: dict[str, object]) -> str:
        raise NotImplementedError("ComfyUI execution lands in the next V0.3 slice")

    async def get_run(self, run_id: str) -> dict[str, object]:
        raise NotImplementedError("Run polling is not implemented yet")
