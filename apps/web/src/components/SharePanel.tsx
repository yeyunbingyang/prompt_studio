import { useMemo, useState } from "react";
import type { CreationAssetDetail, CreationAssetSummary } from "@prompt-studio/core";
import { api } from "../api/client";

function encodeShare(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decodeShare(value: string) {
  const binary = atob(value.trim());
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

function unwrapAsset(value: any): any {
  return value?.asset ?? value;
}

async function importOne(raw: any) {
  const asset = unwrapAsset(raw);
  const variants = asset.prompt_variants ?? [];
  const primary = variants[0] ?? {};
  return api.createAsset({
    title: asset.title ?? asset.name ?? "Imported Creation Asset",
    modality: asset.modality ?? asset.type ?? "image",
    description: asset.description ?? `${asset.model ?? ""} ${asset.preset ?? ""}`.trim(),
    positive_prompt: primary.positive_prompt ?? asset.prompt_zh ?? asset.prompt ?? "",
    negative_prompt: primary.negative_prompt ?? asset.negative_prompt ?? ""
  });
}

export function SharePanel({
  assets,
  onImported
}: {
  assets: CreationAssetSummary[];
  onImported: () => void;
}) {
  const [selectedId, setSelectedId] = useState(assets[0]?.id ?? "");
  const [shareCode, setShareCode] = useState("");
  const [message, setMessage] = useState("");
  const canSelect = useMemo(() => assets.length > 0, [assets.length]);

  async function getSelected(): Promise<CreationAssetDetail> {
    const id = selectedId || assets[0]?.id;
    if (!id) throw new Error("还没有可分享的资产。");
    return api.getAsset(id);
  }

  async function exportSelected() {
    try {
      const asset = await getSelected();
      const blob = new Blob([JSON.stringify({
        schema: "prompt-studio.creation-asset.v0.3",
        exported_at: new Date().toISOString(),
        asset
      }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${asset.title}.aipack.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage("已导出选中资产。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "导出失败");
    }
  }

  async function makeShareCode() {
    try {
      const asset = await getSelected();
      const code = encodeShare({ schema: "prompt-studio.share-code.v0.3", asset });
      setShareCode(code);
      setMessage("已生成离线 Share Code。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "生成失败");
    }
  }

  async function copyShareCode() {
    if (!shareCode) return;
    await navigator.clipboard.writeText(shareCode);
    setMessage("Share Code 已复制。");
  }

  async function importShareCode() {
    try {
      if (!shareCode.trim()) throw new Error("请粘贴 Share Code。");
      await importOne(decodeShare(shareCode));
      onImported();
      setMessage("Share Code 已导入 SQLite。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Share Code 无效");
    }
  }

  async function importFile(file: File | undefined) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (Array.isArray(data.assets)) {
        for (const item of data.assets) await importOne(item);
      } else {
        await importOne(data);
      }
      onImported();
      setMessage("JSON 已导入 SQLite。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "JSON 导入失败");
    }
  }

  async function backupAll() {
    try {
      const details = await Promise.all(assets.map((item) => api.getAsset(item.id)));
      const blob = new Blob([JSON.stringify({
        schema: "prompt-studio.backup.v0.3",
        exported_at: new Date().toISOString(),
        assets: details
      }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prompt-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage(`已备份 ${details.length} 个资产。`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "备份失败");
    }
  }

  return (
    <div className="share-grid">
      <section className="panel form-panel">
        <span className="eyebrow">EXPORT / SHARE</span>
        <h2>导出与分享</h2>
        <label>选择资产
          <select value={selectedId} disabled={!canSelect} onChange={(event) => setSelectedId(event.target.value)}>
            {!canSelect && <option>暂无资产</option>}
            {assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.title}</option>)}
          </select>
        </label>
        <div className="output-actions">
          <button className="primary" disabled={!canSelect} onClick={exportSelected}>下载 .aipack.json</button>
          <button className="ghost" disabled={!canSelect} onClick={makeShareCode}>生成 Share Code</button>
          <button className="ghost" disabled={!shareCode} onClick={copyShareCode}>复制 Share Code</button>
          <button className="ghost" onClick={backupAll}>备份全部资产</button>
        </div>
        <label>Share Code
          <textarea rows={9} value={shareCode} onChange={(event) => setShareCode(event.target.value)} placeholder="生成或粘贴 Base64 Share Code" />
        </label>
        <button className="ghost wide" onClick={importShareCode}>导入 Share Code</button>
      </section>

      <section className="panel form-panel">
        <span className="eyebrow">IMPORT</span>
        <h2>导入 JSON</h2>
        <label className="upload-zone">
          <input type="file" accept=".json,application/json" onChange={(event) => importFile(event.target.files?.[0])} />
          <strong>选择 .json / .aipack.json</strong>
          <span>支持单个 Creation Asset、Builder 导出和 Prompt Studio Backup。</span>
        </label>
        <div className="package-tree">
          <strong>未来完整 Creation Pack</strong>
          <pre>{`asset.aipack/
├─ manifest.json
├─ cover.webp
├─ prompts/
├─ parameters.json
├─ refs/
├─ examples/
├─ workflow/
└─ versions/`}</pre>
        </div>
        {message && <div className="builder-message">{message}</div>}
      </section>
    </div>
  );
}
