import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { CreationAssetSummary, Modality } from "@prompt-studio/core";
import { api, type Health } from "./api/client";

const modalities: Modality[] = ["image", "video", "3d", "audio", "text"];

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [assets, setAssets] = useState<CreationAssetSummary[]>([]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [modality, setModality] = useState<Modality>("image");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const refreshAssets = useCallback(async (search: string) => {
    try {
      setError("");
      setAssets(await api.listAssets(search));
    } catch (err) {
      setError(err instanceof Error ? err.message : "读取资产失败");
    }
  }, []);

  useEffect(() => {
    api.health()
      .then(setHealth)
      .catch(() => setHealth(null));
    refreshAssets("");
  }, [refreshAssets]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      setError("");
      await api.createAsset({
        title: title.trim(),
        modality,
        positive_prompt: prompt.trim()
      });
      setTitle("");
      setPrompt("");
      await refreshAssets("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建失败");
    }
  }

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    await refreshAssets(query);
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PS</div>
          <div>
            <strong>Prompt Studio</strong>
            <span>V0.3 Engineering</span>
          </div>
        </div>

        <nav>
          <button className="nav-item active">◫ 工作台</button>
          <button className="nav-item">✦ 发现 <em>后续</em></button>
          <button className="nav-item">⚡ 构建器 <em>后续</em></button>
          <button className="nav-item">▤ 模板 <em>后续</em></button>
          <button className="nav-item">⌘ 工作流 <em>后续</em></button>
        </nav>

        <div className="sidebar-status">
          <span className={health ? "dot online" : "dot"} />
          <div>
            <strong>{health ? "Local API 已连接" : "Local API 未连接"}</strong>
            <small>{health ? `API ${health.version}` : "请启动 apps/api"}</small>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <span className="eyebrow">LOCAL-FIRST CREATION ASSET STUDIO</span>
            <h1>工程底座已接通</h1>
          </div>
          <div className="status-pill">
            SQLite · {health ? "Ready" : "Offline"}
          </div>
        </header>

        {error && <div className="error-banner">{error}</div>}

        <section className="hero-grid">
          <article className="panel create-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">QUICK CREATE</span>
                <h2>新建 Creation Asset</h2>
              </div>
              <span className="badge">P0</span>
            </div>

            <form onSubmit={handleCreate}>
              <label>
                标题
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="例如：电影感雨夜人像"
                />
              </label>

              <label>
                模态
                <select
                  value={modality}
                  onChange={(event) =>
                    setModality(event.target.value as Modality)
                  }
                >
                  {modalities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Base Prompt
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="先写一个基础 Prompt，后续 Template Builder 会接管结构化参数。"
                  rows={5}
                />
              </label>

              <button className="primary" type="submit">
                创建并写入 SQLite
              </button>
            </form>
          </article>

          <article className="panel architecture-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">BOUNDARIES</span>
                <h2>V0.3 分层</h2>
              </div>
            </div>
            <div className="flow">
              <div><strong>React UI</strong><span>apps/web</span></div>
              <b>→</b>
              <div><strong>FastAPI</strong><span>apps/api</span></div>
              <b>→</b>
              <div><strong>SQLite</strong><span>.prompt-studio</span></div>
            </div>
            <div className="flow secondary">
              <div><strong>Domain Core</strong><span>packages/core</span></div>
              <b>→</b>
              <div><strong>Adapters</strong><span>integrations</span></div>
            </div>
            <p className="muted">
              ComfyUI、远端模型、媒体处理都从 Adapter 接入，不反向污染 Creation Asset 核心模型。
            </p>
          </article>
        </section>

        <section className="panel library-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">LOCAL LIBRARY</span>
              <h2>Creation Assets</h2>
            </div>
            <form className="search" onSubmit={handleSearch}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索标题或说明"
              />
              <button type="submit">搜索</button>
            </form>
          </div>

          {assets.length === 0 ? (
            <div className="empty">
              <strong>还没有本地资产</strong>
              <span>从上面的 Quick Create 建一个，数据会真正写进 SQLite。</span>
            </div>
          ) : (
            <div className="asset-grid">
              {assets.map((asset) => (
                <article className="asset-card" key={asset.id}>
                  <div className={`asset-cover modality-${asset.modality}`}>
                    <span>{asset.modality.toUpperCase()}</span>
                  </div>
                  <div className="asset-body">
                    <span className="eyebrow">{asset.status}</span>
                    <h3>{asset.title}</h3>
                    <p>{asset.description || "暂无说明"}</p>
                    <small>{new Date(asset.updated_at).toLocaleString()}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
