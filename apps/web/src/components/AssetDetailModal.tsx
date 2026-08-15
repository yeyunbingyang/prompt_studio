import { useEffect, useState } from "react";
import type { CreationAssetDetail } from "@prompt-studio/core";
import { api } from "../api/client";

type Props = {
  assetId: string | null;
  onClose: () => void;
  onDeleted: () => void;
  onLoad: (asset: CreationAssetDetail) => void;
};

export function AssetDetailModal({ assetId, onClose, onDeleted, onLoad }: Props) {
  const [asset, setAsset] = useState<CreationAssetDetail | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!assetId) {
      setAsset(null);
      return;
    }
    setError("");
    api.getAsset(assetId)
      .then(setAsset)
      .catch((err) => setError(err instanceof Error ? err.message : "读取资产失败"));
  }, [assetId]);

  if (!assetId) return null;

  async function archive() {
    if (!asset) return;
    setBusy(true);
    try {
      const next = await api.updateAsset(asset.id, { status: asset.status === "archived" ? "active" : "archived" });
      setAsset(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新失败");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!asset || !window.confirm(`删除「${asset.title}」？此操作不可撤销。`)) return;
    setBusy(true);
    try {
      await api.deleteAsset(asset.id);
      onDeleted();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败");
      setBusy(false);
    }
  }

  function exportJson() {
    if (!asset) return;
    const blob = new Blob([JSON.stringify({
      schema: "prompt-studio.creation-asset.v0.3",
      exported_at: new Date().toISOString(),
      asset
    }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${asset.title}.creation.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="modal asset-detail-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {!asset && !error && <div className="empty"><strong>读取资产中…</strong></div>}
        {error && <div className="error-banner">{error}</div>}
        {asset && (
          <>
            <div className={`asset-cover detail-cover modality-${asset.modality}`}><span>{asset.modality.toUpperCase()}</span></div>
            <span className="eyebrow">{asset.status} · {asset.id.slice(0, 8)}</span>
            <h2>{asset.title}</h2>
            <p>{asset.description || "暂无说明"}</p>
            <div className="detail-grid">
              <div><strong>创建时间</strong><span>{new Date(asset.created_at).toLocaleString()}</span></div>
              <div><strong>更新时间</strong><span>{new Date(asset.updated_at).toLocaleString()}</span></div>
            </div>
            <div className="prompt-variants">
              <span className="eyebrow">PROMPT VARIANTS</span>
              {asset.prompt_variants.length === 0 ? (
                <p>暂无 Prompt Variant。</p>
              ) : asset.prompt_variants.map((variant) => (
                <article key={variant.id}>
                  <div><strong>{variant.name}</strong><span>{variant.language}</span></div>
                  <p>{variant.positive_prompt}</p>
                  {variant.negative_prompt && <small>Negative: {variant.negative_prompt}</small>}
                </article>
              ))}
            </div>
            <div className="card-actions">
              <button className="primary compact" onClick={() => { onLoad(asset); onClose(); }}>载入 Builder（副本）</button>
              <button className="ghost" onClick={exportJson}>导出 JSON</button>
              <button className="ghost" disabled={busy} onClick={archive}>{asset.status === "archived" ? "恢复 Active" : "归档"}</button>
              <button className="danger" disabled={busy} onClick={remove}>删除</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
