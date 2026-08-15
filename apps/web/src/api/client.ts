import type {
  CreationAssetDetail,
  CreationAssetSummary,
  Modality
} from "@prompt-studio/core";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

export type Health = {
  status: "ok";
  version: string;
  database: string;
};

export type CreateAssetInput = {
  title: string;
  modality: Modality;
  description?: string;
  positive_prompt?: string;
  negative_prompt?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<Health>("/health"),
  listAssets: (query = "") =>
    request<CreationAssetSummary[]>(
      `/assets${query ? `?q=${encodeURIComponent(query)}` : ""}`
    ),
  getAsset: (id: string) => request<CreationAssetDetail>(`/assets/${id}`),
  createAsset: (payload: CreateAssetInput) =>
    request<CreationAssetDetail>("/assets", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
