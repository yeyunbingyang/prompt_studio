import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CreationAssetDetail, CreationAssetSummary } from "@prompt-studio/core";
import { api, type Health } from "./api/client";
import { AssetDetailModal } from "./components/AssetDetailModal";
import { PromptBuilder } from "./components/PromptBuilder";
import { SettingsPanel } from "./components/SettingsPanel";
import { SharePanel } from "./components/SharePanel";
import {
  FEATURED,
  MODELS,
  NAV_ITEMS,
  TEMPLATES,
  WORKFLOWS,
  type StudioMode,
  type TemplatePreset
} from "./data/catalog";

type PageId = (typeof NAV_ITEMS)[number][0];
type AssetFilter = "all" | StudioMode;

const QUICK_ENTRIES: Array<{ label: string; mode: StudioMode; templateId?: string }> = [
  { label: "图片生成", mode: "image" },
  { label: "视频生成", mode: "video" },
  { label: "3D 资产", mode: "3d" },
  { label: "音频", mode: "audio" },
  { label: "人物设定", mode: "image", templateId: "character-sheet" },
  { label: "视频分镜", mode: "video", templateId: "storyboard" },
  { label: "灰模 / 人体比例", mode: "image", templateId: "graymodel" }
];

function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<PageId>("discover");
  const [health, setHealth] = useState<Health | null>(null);
  const [assets, setAssets] = useState<CreationAssetSummary[]>([]);
  const [assetQuery, setAssetQuery] = useState("");
  const [assetType, setAssetType] = useState<AssetFilter>("all");
  const [assetView, setAssetView] = useState<"grid" | "list">("grid");
  const [galleryType, setGalleryType] = useState<"all" | StudioMode>("all");
  const [templateType, setTemplateType] = useState<"all" | StudioMode>("all");
  const [modelType, setModelType] = useState<"all" | StudioMode>("all");
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplatePreset | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [builderModel, setBuilderModel] = useState<string | null>(null);
  const [builderMode, setBuilderMode] = useState<StudioMode | null>(null);
  const [builderAsset, setBuilderAsset] = useState<CreationAssetDetail | null>(null);
  const [error, setError] = useState("");

  const refreshAssets = useCallback(async (query = "") => {
    try {
      setError("");
      setAssets(await api.listAssets(query));
    } catch (err) {
      setError(err instanceof Error ? err.message : "读取资产失败");
    }
  }, []);

  useEffect(() => {
    api.health().then(setHealth).catch(() => setHealth(null));
    refreshAssets();
  }, [refreshAssets]);

  const filteredFeatured = useMemo(
    () => FEATURED.filter(
      (item) =>
        (galleryType === "all" || item.type === galleryType) &&
        `${item.name} ${item.desc} ${item.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())
    ),
    [galleryType, search]
  );

  const filteredTemplates = useMemo(
    () => TEMPLATES.filter(
      (item) =>
        (templateType === "all" || item.type === templateType) &&
        `${item.name} ${item.desc} ${item.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase())
    ),
    [templateType, search]
  );

  const filteredModels = useMemo(
    () => MODELS.filter(
      (item) =>
        (modelType === "all" || item.type === modelType) &&
        `${item.name} ${item.desc} ${item.abilities.join(" ")}`.toLowerCase().includes(search.toLowerCase())
    ),
    [modelType, search]
  );

  const filteredAssets = useMemo(
    () => assets.filter((asset) => assetType === "all" || asset.modality === assetType),
    [assets, assetType]
  );

  function clearBuilderSeed() {
    setSelectedTemplate(null);
    setBuilderModel(null);
    setBuilderMode(null);
    setBuilderAsset(null);
  }

  function openTemplate(template: TemplatePreset) {
    setSelectedTemplate(template);
  }

  function useTemplate(template: TemplatePreset) {
    setBuilderModel(null);
    setBuilderMode(template.type);
    setBuilderAsset(null);
    setSelectedTemplate(template);
    setPage("builder");
  }

  function useModel(name: string, mode: StudioMode) {
    setSelectedTemplate(null);
    setBuilderAsset(null);
    setBuilderMode(mode);
    setBuilderModel(name);
    setPage("builder");
  }

  function useQuickEntry(entry: { label: string; mode: StudioMode; templateId?: string }) {
    if (entry.templateId) {
      const template = TEMPLATES.find((item) => item.id === entry.templateId);
      if (template) {
        useTemplate(template);
        return;
      }
    }
    setSelectedTemplate(null);
    setBuilderAsset(null);
    setBuilderModel(null);
    setBuilderMode(entry.mode);
    setPage("builder");
  }

  function loadAssetIntoBuilder(asset: CreationAssetDetail) {
    setSelectedTemplate(null);
    setBuilderModel(null);
    setBuilderMode(asset.modality === "text" ? "image" : asset.modality);
    setBuilderAsset(asset);
    setPage("builder");
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PS</div>
          <div>
            <strong>Prompt Studio</strong>
            <span>V0.3 · Prototype Parity</span>
          </div>
        </div>

        <nav>
          {NAV_ITEMS.map(([id, icon, label]) => (
            <button
              key={id}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => {
                setPage(id);
                setSearch("");
              }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-status">
          <span className={health ? "dot online" : "dot"} />
          <div>
            <strong>{health ? "Local API 已连接" : "Local API 未连接"}</strong>
            <small>{health ? `API ${health.version}` : "双击 start.bat 启动"}</small>
          </div>
        </div>
      </aside>

      <main>
        <div className="topline">
          <div className="breadcrumbs">Prompt Studio / {NAV_ITEMS.find(([id]) => id === page)?.[2]}</div>
          <div className="status-pill">SQLite · {health ? "Ready" : "Offline"}</div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {page === "discover" && (
          <>
            <PageHeader
              eyebrow="LOCAL-FIRST AI CREATION WORKBENCH"
              title="从效果出发，保存完整创作方法"
              description="Prompt、参数、模型、参考图、Workflow 和输出案例统一组织为 Creation Asset。"
              action={<button className="primary compact" onClick={() => { clearBuilderSeed(); setPage("builder"); }}>开始创作</button>}
            />
            <section className="hero-card">
              <div className="hero-copy">
                <span className="badge">V0.3 正式应用</span>
                <h2>不是 Prompt 收藏夹，而是可复用的 AI 创作资产库。</h2>
                <p>沿用 V0.2 原型的信息架构，同时把资产保存真正接入 SQLite，本地优先、不依赖云端账号。</p>
                <div className="quick-links">
                  {QUICK_ENTRIES.map((entry) => (
                    <button key={entry.label} onClick={() => useQuickEntry(entry)}>{entry.label}</button>
                  ))}
                </div>
              </div>
              <div className="stats-grid">
                <div><strong>{TEMPLATES.length}</strong><span>内置模板</span></div>
                <div><strong>{MODELS.length}</strong><span>模型档案</span></div>
                <div><strong>{WORKFLOWS.length}</strong><span>工作流</span></div>
                <div><strong>{assets.length}</strong><span>本地资产</span></div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><span className="eyebrow">FEATURED CREATION ASSETS</span><h2>从效果图进入</h2></div>
                <button className="ghost" onClick={() => setPage("gallery")}>查看全部</button>
              </div>
              <div className="card-grid">
                {FEATURED.slice(0, 4).map((item) => (
                  <article className="feature-card" key={item.id} onClick={() => setPage("gallery")}>
                    <div className={`feature-cover cover-${item.cover}`}><span>{item.emoji}</span><em>{item.type}</em></div>
                    <div className="card-body">
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                      <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "gallery" && (
          <>
            <PageHeader eyebrow="EFFECT FIRST" title="效果图库" description="先看结果，再进入模板或 Builder 复用生成方法。" />
            <div className="toolbar">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索效果、标签或说明" />
              <select value={galleryType} onChange={(event) => setGalleryType(event.target.value as "all" | StudioMode)}>
                <option value="all">全部模态</option><option value="image">图片</option><option value="video">视频</option><option value="3d">3D</option><option value="audio">音频</option>
              </select>
            </div>
            <div className="card-grid">
              {filteredFeatured.map((item) => (
                <article className="feature-card" key={item.id}>
                  <div className={`feature-cover cover-${item.cover}`}><span>{item.emoji}</span><em>{item.time || item.type}</em></div>
                  <div className="card-body">
                    <span className="eyebrow">{item.model}</span>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <small>模板：{item.template}</small>
                    <div className="card-actions">
                      <button className="primary compact" onClick={() => {
                        const template = TEMPLATES.find((candidate) => candidate.name === item.template);
                        if (template) useTemplate(template);
                      }}>用此效果创作</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {page === "builder" && (
          <>
            <PageHeader eyebrow="VISUAL PROMPT BUILDER" title="提示词构建器" description="图片 / 视频 / 3D / 音频共用一个 Creation Asset Builder，参数会实时组合为 Prompt。" />
            <PromptBuilder
              template={selectedTemplate}
              initialModel={builderModel}
              initialMode={builderMode}
              assetSeed={builderAsset}
              onSaved={() => refreshAssets()}
            />
          </>
        )}

        {page === "templates" && (
          <>
            <PageHeader eyebrow="REUSABLE STRUCTURES" title="模板库" description="12 套 V0.2 内置模板已经迁入正式应用。" />
            <div className="toolbar">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索模板或标签" />
              <select value={templateType} onChange={(event) => setTemplateType(event.target.value as "all" | StudioMode)}>
                <option value="all">全部模态</option><option value="image">图片</option><option value="video">视频</option><option value="3d">3D</option><option value="audio">音频</option>
              </select>
            </div>
            <div className="card-grid">
              {filteredTemplates.map((template) => (
                <article className="catalog-card" key={template.id}>
                  <div className="catalog-icon">{template.icon}</div>
                  <span className="eyebrow">{template.type}</span>
                  <h3>{template.name}</h3>
                  <p>{template.desc}</p>
                  <div className="tag-row">{template.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="card-actions">
                    <button className="ghost" onClick={() => openTemplate(template)}>详情</button>
                    <button className="primary compact" onClick={() => useTemplate(template)}>使用模板</button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {page === "workflows" && (
          <>
            <PageHeader eyebrow="CREATION PIPELINES" title="工作流" description="把 Prompt Asset 接到生成、评审和输出保存流程。" />
            <div className="workflow-grid">
              {WORKFLOWS.map((workflow) => (
                <article className="workflow-card" key={workflow.name}>
                  <div className="workflow-meta"><span className="badge">{workflow.type}</span></div>
                  <h3>{workflow.name}</h3>
                  <p>{workflow.desc}</p>
                  <div className="workflow-nodes">
                    {workflow.nodes.map((node, index) => (
                      <span key={node}>{node}{index < workflow.nodes.length - 1 ? <b>→</b> : null}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <section className="panel workflow-canvas">
              <span className="eyebrow">CONCEPT GRAPH</span>
              <div className="node-line">
                {["Reference Input", "Prompt Asset", "Image Generation", "Review / Select", "Image → Video"].map((node, index) => (
                  <span key={node}><strong>{node}</strong>{index < 4 && <b>→</b>}</span>
                ))}
              </div>
              <p>与 V0.2 原型保持一致：当前是工作流概念视图；真正拖拽节点和执行 ComfyUI 属于后续 Workflow Editor。</p>
            </section>
          </>
        )}

        {page === "models" && (
          <>
            <PageHeader eyebrow="MODEL PROFILES" title="模型目录" description="模型档案用于决定 Prompt 结构和能力提示，不直接等同于 API 连接状态。" />
            <div className="toolbar">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索模型或能力" />
              <select value={modelType} onChange={(event) => setModelType(event.target.value as "all" | StudioMode)}>
                <option value="all">全部模态</option><option value="image">图片</option><option value="video">视频</option><option value="3d">3D</option><option value="audio">音频</option>
              </select>
            </div>
            <div className="model-grid">
              {filteredModels.map((model) => (
                <article className="catalog-card" key={model.id}>
                  <div className="model-title"><span className={`type-dot type-${model.type}`} /><h3>{model.name}</h3><em>{model.vendor}</em></div>
                  <p>{model.desc}</p>
                  <div className="tag-row">{model.abilities.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <button className="ghost wide" onClick={() => useModel(model.name, model.type)}>用此模型创作</button>
                </article>
              ))}
            </div>
          </>
        )}

        {page === "assets" && (
          <>
            <PageHeader eyebrow="SQLITE LOCAL LIBRARY" title="我的资产" description="搜索、筛选并重新载入已经写入本地 SQLite 的 Creation Asset。" />
            <div className="toolbar">
              <input value={assetQuery} onChange={(event) => setAssetQuery(event.target.value)} placeholder="搜索标题或说明" />
              <select value={assetType} onChange={(event) => setAssetType(event.target.value as AssetFilter)}>
                <option value="all">全部模态</option><option value="image">图片</option><option value="video">视频</option><option value="3d">3D</option><option value="audio">音频</option>
              </select>
              <button className="ghost" onClick={() => refreshAssets(assetQuery)}>搜索</button>
              <div className="view-switch"><button className={assetView === "grid" ? "active" : ""} onClick={() => setAssetView("grid")}>▦</button><button className={assetView === "list" ? "active" : ""} onClick={() => setAssetView("list")}>☷</button></div>
              <button className="primary compact" onClick={() => { clearBuilderSeed(); setPage("builder"); }}>新建资产</button>
            </div>
            {filteredAssets.length === 0 ? (
              <EmptyState title="没有匹配的本地资产" text="进入 Builder 保存一个，数据会写入 SQLite。" />
            ) : (
              <div className={`asset-grid ${assetView === "list" ? "list-view" : ""}`}>
                {filteredAssets.map((asset) => (
                  <article className="asset-card" key={asset.id} onClick={() => setSelectedAssetId(asset.id)}>
                    <div className={`asset-cover modality-${asset.modality}`}><span>{asset.modality.toUpperCase()}</span></div>
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
          </>
        )}

        {page === "share" && (
          <>
            <PageHeader eyebrow="PORTABLE CREATION ASSETS" title="导入 / 分享" description="通过 JSON、Share Code 和本地备份迁移 Creation Asset。" />
            <SharePanel assets={assets} onImported={() => refreshAssets()} />
          </>
        )}

        {page === "settings" && (
          <>
            <PageHeader eyebrow="LOCAL PREFERENCES" title="设置" description="默认 Prompt 语言和 Builder 模态会在下一次打开空白 Builder 时生效。" />
            <SettingsPanel />
          </>
        )}
      </main>

      {selectedTemplate && page !== "builder" && (
        <div className="modal-backdrop" onClick={() => setSelectedTemplate(null)}>
          <section className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTemplate(null)}>×</button>
            <div className="catalog-icon large">{selectedTemplate.icon}</div>
            <span className="eyebrow">{selectedTemplate.type} · {selectedTemplate.preset}</span>
            <h2>{selectedTemplate.name}</h2>
            <p>{selectedTemplate.desc}</p>
            <div className="detail-block"><strong>默认主体</strong><span>{selectedTemplate.subject}</span></div>
            <div className="detail-block"><strong>Negative Prompt</strong><span>{selectedTemplate.negative}</span></div>
            <div className="tag-row">{selectedTemplate.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <button className="primary wide" onClick={() => useTemplate(selectedTemplate)}>使用此模板</button>
          </section>
        </div>
      )}

      <AssetDetailModal
        assetId={selectedAssetId}
        onClose={() => setSelectedAssetId(null)}
        onDeleted={() => refreshAssets()}
        onLoad={loadAssetIntoBuilder}
      />
    </div>
  );
}
