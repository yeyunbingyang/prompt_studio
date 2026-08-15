from __future__ import annotations

from typing import Protocol


class GenerationAdapter(Protocol):
    """Boundary for external generation systems.

    Domain/Application code depends on this interface, never on ComfyUI or
    a specific remote model SDK.
    """

    adapter_id: str

    async def health(self) -> bool: ...

    async def submit(self, payload: dict[str, object]) -> str: ...

    async def get_run(self, run_id: str) -> dict[str, object]: ...
