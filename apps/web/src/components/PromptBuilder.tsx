import { useEffect, useMemo, useState } from "react";
import type { CreationAssetDetail } from "@prompt-studio/core";
import { api } from "../api/client";
import { MODE_DATA, VISUAL, type StudioMode, type TemplatePreset } from "../data/catalog";
import { readSettings } from "./SettingsPanel";

type BuilderProps = {
  template: TemplatePreset | null;
  initialModel?: string | null;
  initialMode?: StudioMode | null;
  assetSeed?: CreationAssetDetail | null;
  onSaved?: () => void;
};

type RefImage = { id: string; name: string; dataUrl: string };

type BuilderDraft = {
  mode: StudioMode;
  model: string;
  preset: string;
  subject: string;
  negative: string;
  extra: string;
  assetName: string;
  language: "zh" | "en";
  composition: string[];
  lighting: string[];
  style: string[];
  motionSubject: string;
  cameraMotion: string;
  lens: string;
  motionSpeed: string;
  duration: string;
  aspect: string;
  envMotion: string;
  firstState: string;
  lastState: string;
  audioDesc: string;
  meshType: string;
  topology: string;
  material: string;
  audioType: string;
  audioMood: string;
  audioPace: string;
};

const DRAFT_KEY = "promptStudioCN.builderDraft.v03";
const cameras = ["固定镜头", "Dolly In 推镜", "Dolly Out 拉镜", "Pan 横摇", "Tilt 俯仰", "Orbit 环绕", "Crane 升降", "Tracking 跟拍", "Handheld 手持"];
const lenses = ["24mm", "35mm", "50mm", "85mm", "100mm"];
const durations = ["5s", "8s", "10s", "15s"];
const aspects = ["16:9", "9:16", "1:1", "2.39:1"];

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function readDraft(): BuilderDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) as BuilderDraft : null;
  } catch {
    return null;
  }
}

function resolveCatalogModel(name: string | null | undefined) {
  if (!name) return null;
  for (const candidateMode of Object.keys(MODE_DATA) as StudioMode[]) {
    const matched = MODE_DATA[candidateMode].models.find(
      (candidate) => candidate === name || candidate.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(candidate.toLowerCase())
    );
    if (matched) return { mode: candidateMode, model: matched };
  }
  return null;
}

export function PromptBuilder({ template, initialModel, initialMode, assetSeed, onSaved }: BuilderProps) {
  const settings = useMemo(readSettings, []);
  const [mode, setMode] = useState<StudioMode>(settings.defaultMode);
  const [model, setModel] = useState(MODE_DATA[settings.defaultMode].models[0]);
  const [preset, setPreset] = useState(MODE_DATA[settings.defaultMode].presets[0]);
  const [subject, setSubject] = useState("");
  const [negative, setNegative] = useState("");
  const [extra, setExtra] = useState("");
  const [assetName, setAssetName] = useState("未命名 Creation Asset");
  const [language, setLanguage] = useState<"zh" | "en">(settings.defaultLanguage);
  const [composition, setComposition] = useState<string[]>([]);
  const [lighting, setLighting] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<RefImage | null>(null);
  const [refs, setRefs] = useState<RefImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [draftReady, setDraftReady] = useState(false);

  const [motionSubject, setMotionSubject] = useState("");
  const [cameraMotion, setCameraMotion] = useState(cameras[1]);
  const [lens, setLens] = useState("50mm");
  const [motionSpeed, setMotionSpeed] = useState("缓慢");
  const [duration, setDuration] = useState("5s");
  const [aspect, setAspect] = useState("16:9");
  const [envMotion, setEnvMotion] = useState("");
  const [firstState, setFirstState] = useState("");
  const [lastState, setLastState] = useState("");
  const [audioDesc, setAudioDesc] = useState("");

  const [meshType, setMeshType] = useState("完整模型");
  const [topology, setTopology] = useState("medium");
  const [material, setMaterial] = useState("PBR");

  const [audioType, setAudioType] = useState("music");
  const [audioMood, setAudioMood] = useState("mysterious");
  const [audioPace, setAudioPace] = useState("medium");

  useEffect(() => {
    if (!settings.autosaveDraft || template || assetSeed || initialModel || initialMode) {
      setDraftReady(true);
      return;
    }
    const draft = readDraft();
    if (draft) {
      setMode(draft.mode);
      setModel(draft.model);
      setPreset(draft.preset);
      setSubject(draft.subject);
      setNegative(draft.negative);
      setExtra(draft.extra);
      setAssetName(draft.assetName);
      setLanguage(draft.language);
      setComposition(draft.composition ?? []);
      setLighting(draft.lighting ?? []);
      setStyle(draft.style ?? []);
      setMotionSubject(draft.motionSubject ?? "");
      setCameraMotion(draft.cameraMotion ?? cameras[1]);
      setLens(draft.lens ?? "50mm");
      setMotionSpeed(draft.motionSpeed ?? "缓慢");
      setDuration(draft.duration ?? "5s");
      setAspect(draft.aspect ?? "16:9");
      setEnvMotion(draft.envMotion ?? "");
      setFirstState(draft.firstState ?? "");
      setLastState(draft.lastState ?? "");
      setAudioDesc(draft.audioDesc ?? "");
      setMeshType(draft.meshType ?? "完整模型");
      setTopology(draft.topology ?? "medium");
      setMaterial(draft.material ?? "PBR");
      setAudioType(draft.audioType ?? "music");
      setAudioMood(draft.audioMood ?? "mysterious");
      setAudioPace(draft.audioPace ?? "medium");
      setMessage("已恢复上次草稿。");
    }
    setDraftReady(true);
  }, [settings.autosaveDraft, template, assetSeed, initialModel, initialMode]);

  useEffect(() => {
    if (!template) return;
    setMode(template.type);
    setModel(MODE_DATA[template.type].models[0]);
    setPreset(template.preset || MODE_DATA[template.type].presets[0]);
    setSubject(template.subject);
    setNegative(template.negative);
    setAssetName(template.name);
    setComposition(template.composition ?? []);
    setLighting(template.lighting ?? []);
    setStyle(template.style ?? []);
    setMessage(`已载入模板：${template.name}`);
  }, [template]);

  useEffect(() => {
    if (!initialMode) return;
    setMode(initialMode);
    setModel(MODE_DATA[initialMode].models[0]);
    setPreset(MODE_DATA[initialMode].presets[0]);
  }, [initialMode]);

  useEffect(() => {
    const resolved = resolveCatalogModel(initialModel);
    if (!resolved) return;
    setMode(resolved.mode);
    setModel(resolved.model);
    setPreset(MODE_DATA[resolved.mode].presets[0]);
    setMessage(`已选择模型：${resolved.model}`);
  }, [initialModel]);

  useEffect(() => {
    if (!assetSeed) return;
    const nextMode: StudioMode = assetSeed.modality === "text" ? "image" : assetSeed.modality;
    const variant = assetSeed.prompt_variants[0];
    setMode(nextMode);
    const descriptionParts = assetSeed.description.split(" · ");
    const resolved = resolveCatalogModel(descriptionParts[0]);
    if (resolved && resolved.mode === nextMode) setModel(resolved.model);
    if (descriptionParts[1] && MODE_DATA[nextMode].presets.includes(descriptionParts[1])) setPreset(descriptionParts[1]);
    setSubject(variant?.positive_prompt || assetSeed.description || "");
    setNegative(variant?.negative_prompt || "");
    setAssetName(`${assetSeed.title} 副本`);
    setMessage(`已从 SQLite 载入「${assetSeed.title}」，保存时将创建新资产。`);
  }, [assetSeed]);

  useEffect(() => {
    if (!MODE_DATA[mode].models.includes(model)) setModel(MODE_DATA[mode].models[0]);
    if (!MODE_DATA[mode].presets.includes(preset)) setPreset(MODE_DATA[mode].presets[0]);
  }, [mode, model, preset]);

  useEffect(() => {
    if (!draftReady || !settings.autosaveDraft) return;
    const draft: BuilderDraft = {
      mode, model, preset, subject, negative, extra, assetName, language,
      composition, lighting, style, motionSubject, cameraMotion, lens, motionSpeed,
      duration, aspect, envMotion, firstState, lastState, audioDesc, meshType,
      topology, material, audioType, audioMood, audioPace
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draftReady, settings.autosaveDraft, mode, model, preset, subject, negative, extra, assetName, language, composition, lighting, style, motionSubject, cameraMotion, lens, motionSpeed, duration, aspect, envMotion, firstState, lastState, audioDesc, meshType, topology, material, audioType, audioMood, audioPace]);

  const promptZh = useMemo(() => {
    const pieces: string[] = [];
    if (subject.trim()) pieces.push(subject.trim());
    if (mainImage) pieces.push("已提供主效果图 / 主参考图，以其作为主要视觉参考");
    if (mode === "image") {
      if (composition.length) pieces.push(`构图：${composition.join("、")}`);
      if (lighting.length) pieces.push(`光线：${lighting.join("、")}`);
      if (style.length) pieces.push(`风格：${style.join("、")}`);
      pieces.push(`生成预设：${preset}`);
    }
    if (mode === "video") {
      if (motionSubject.trim()) pieces.push(`主体动作：${motionSubject.trim()}`);
      pieces.push(`摄影机：${cameraMotion}`, `镜头：${lens}`, `运动速度：${motionSpeed}`, `时长：${duration}`, `画幅：${aspect}`);
      if (envMotion.trim()) pieces.push(`环境运动：${envMotion.trim()}`);
      if (firstState.trim()) pieces.push(`开始状态：${firstState.trim()}`);
      if (lastState.trim()) pieces.push(`结束状态：${lastState.trim()}`);
      if (audioDesc.trim()) pieces.push(`声音 / 对白：${audioDesc.trim()}`);
    }
    if (mode === "3d") pieces.push(`输出：${meshType}`, `拓扑：${topology}`, `材质：${material}`);
    if (mode === "audio") pieces.push(`音频类型：${audioType}`, `情绪：${audioMood}`, `节奏：${audioPace}`);
    if (refs.length) pieces.push(`辅助参考图：${refs.length} 张，保持参考结构与身份连续性`);
    if (extra.trim()) pieces.push(extra.trim());
    return pieces.filter(Boolean).join("；");
  }, [subject, mainImage, mode, composition, lighting, style, preset, motionSubject, cameraMotion, lens, motionSpeed, duration, aspect, envMotion, firstState, lastState, audioDesc, meshType, topology, material, audioType, audioMood, audioPace, refs.length, extra]);

  const promptEn = useMemo(() => {
    const pieces: string[] = [];
    if (subject.trim()) pieces.push(subject.trim());
    if (mainImage) pieces.push("use the provided main effect/reference image as the primary visual reference");
    if (mode === "image") {
      if (composition.length) pieces.push(`composition: ${composition.join(", ")}`);
      if (lighting.length) pieces.push(`lighting: ${lighting.join(", ")}`);
      if (style.length) pieces.push(`style: ${style.join(", ")}`);
      pieces.push(`preset: ${preset}`);
    }
    if (mode === "video") {
      if (motionSubject.trim()) pieces.push(`subject motion: ${motionSubject.trim()}`);
      pieces.push(`camera motion: ${cameraMotion}`, `lens: ${lens}`, `motion speed: ${motionSpeed}`, `duration: ${duration}`, `aspect ratio: ${aspect}`);
      if (envMotion.trim()) pieces.push(`environment motion: ${envMotion.trim()}`);
      if (firstState.trim()) pieces.push(`initial state: ${firstState.trim()}`);
      if (lastState.trim()) pieces.push(`ending state: ${lastState.trim()}`);
      if (audioDesc.trim()) pieces.push(`audio/dialogue: ${audioDesc.trim()}`);
    }
    if (mode === "3d") pieces.push(`output: ${meshType}`, `topology: ${topology}`, `material: ${material}`);
    if (mode === "audio") pieces.push(`audio type: ${audioType}`, `mood: ${audioMood}`, `pace: ${audioPace}`);
    if (refs.length) pieces.push(`${refs.length} auxiliary reference images, preserve structural and identity continuity`);
    if (extra.trim()) pieces.push(extra.trim());
    return pieces.filter(Boolean).join(", ");
  }, [subject, mainImage, mode, composition, lighting, style, preset, motionSubject, cameraMotion, lens, motionSpeed, duration, aspect, envMotion, firstState, lastState, audioDesc, meshType, topology, material, audioType, audioMood, audioPace, refs.length, extra]);

  const prompt = language === "zh" ? promptZh : promptEn;

  async function addMainImage(file: File | undefined) {
    if (!file) return;
    setMainImage({ id: `${file.name}-${file.lastModified}`, name: file.name, dataUrl: await fileToDataUrl(file) });
  }

  async function addReferenceFiles(files: FileList | null) {
    if (!files?.length) return;
    const next = await Promise.all(Array.from(files).slice(0, Math.max(0, 4 - refs.length)).map(async (file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      dataUrl: await fileToDataUrl(file)
    })));
    setRefs((current) => [...current, ...next].slice(0, 4));
  }

  async function saveAsset() {
    if (!assetName.trim()) {
      setMessage("请先填写资产名称。");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await api.createAsset({
        title: assetName.trim(),
        modality: mode,
        description: `${model} · ${preset}`,
        positive_prompt: promptZh,
        negative_prompt: negative.trim()
      });
      setMessage("已保存到本地 SQLite。");
      onSaved?.();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setMessage("Prompt 已复制。");
  }

  function exportAsset() {
    const payload = {
      schema: "prompt-studio.creation-asset.export.v0.3",
      exported_at: new Date().toISOString(),
      asset: {
        name: assetName,
        modality: mode,
        model,
        preset,
        prompt_zh: promptZh,
        prompt_en: promptEn,
        negative_prompt: negative,
        main_reference: mainImage ? { name: mainImage.name } : null,
        references: refs.map((item) => ({ name: item.name })),
        structured_parameters: {
          composition, lighting, style,
          video: { motionSubject, cameraMotion, lens, motionSpeed, duration, aspect, envMotion, firstState, lastState, audioDesc },
          three_d: { meshType, topology, material },
          audio: { audioType, audioMood, audioPace }
        }
      }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assetName.trim() || "creation-asset"}.aipack.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("已导出 .aipack.json。");
  }

  function reset() {
    setSubject("");
    setNegative("");
    setExtra("");
    setComposition([]);
    setLighting([]);
    setStyle([]);
    setMainImage(null);
    setRefs([]);
    setMotionSubject("");
    setEnvMotion("");
    setFirstState("");
    setLastState("");
    setAudioDesc("");
    setAssetName("未命名 Creation Asset");
    localStorage.removeItem(DRAFT_KEY);
    setMessage("已重置 Builder 和草稿。");
  }

  return (
    <section className="builder-shell">
      <div className="builder-tabs">
        {(Object.keys(MODE_DATA) as StudioMode[]).map((item) => (
          <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>
            <strong>{MODE_DATA[item].label}</strong><span>{item}</span>
          </button>
        ))}
      </div>

      <div className="builder-grid">
        <div className="builder-controls">
          <section className="panel form-panel">
            <div className="section-heading compact-heading"><div><span className="eyebrow">BASE</span><h2>基础设置</h2></div><span className="badge">{mode}</span></div>
            <div className="field-grid two">
              <label>模型<select value={model} onChange={(event) => setModel(event.target.value)}>{MODE_DATA[mode].models.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>预设<select value={preset} onChange={(event) => setPreset(event.target.value)}>{MODE_DATA[mode].presets.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <label>主体 / 核心描述<textarea rows={4} value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="描述主体、场景和必须保持的核心特征" /></label>
            <label>Negative Prompt<textarea rows={2} value={negative} onChange={(event) => setNegative(event.target.value)} placeholder="不希望出现的内容" /></label>
          </section>

          {mode === "image" && (
            <section className="panel form-panel">
              <span className="eyebrow">VISUAL CONTROLS</span><h2>图片视觉参数</h2>
              <VisualGroup title="构图" values={VISUAL.composition} selected={composition} setSelected={setComposition} />
              <VisualGroup title="光线" values={VISUAL.lighting} selected={lighting} setSelected={setLighting} />
              <VisualGroup title="风格" values={VISUAL.style} selected={style} setSelected={setStyle} />
            </section>
          )}

          {mode === "video" && (
            <section className="panel form-panel">
              <span className="eyebrow">MOTION</span><h2>视频结构</h2>
              <label>主体动作<textarea rows={2} value={motionSubject} onChange={(event) => setMotionSubject(event.target.value)} placeholder="人物/产品做什么，动作如何连续" /></label>
              <div className="field-grid three">
                <label>Camera Motion<select value={cameraMotion} onChange={(event) => setCameraMotion(event.target.value)}>{cameras.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Lens<select value={lens} onChange={(event) => setLens(event.target.value)}>{lenses.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>运动速度<select value={motionSpeed} onChange={(event) => setMotionSpeed(event.target.value)}><option>缓慢</option><option>中等</option><option>快速</option></select></label>
                <label>时长<select value={duration} onChange={(event) => setDuration(event.target.value)}>{durations.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>画幅<select value={aspect} onChange={(event) => setAspect(event.target.value)}>{aspects.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>
              <label>环境 / 时间变化<input value={envMotion} onChange={(event) => setEnvMotion(event.target.value)} placeholder="微风、雨水、光线变化、背景运动…" /></label>
              <div className="field-grid two"><label>开始状态<textarea rows={2} value={firstState} onChange={(event) => setFirstState(event.target.value)} /></label><label>结束状态<textarea rows={2} value={lastState} onChange={(event) => setLastState(event.target.value)} /></label></div>
              <label>声音 / 对白<textarea rows={2} value={audioDesc} onChange={(event) => setAudioDesc(event.target.value)} /></label>
            </section>
          )}

          {mode === "3d" && (
            <section className="panel form-panel">
              <span className="eyebrow">3D ASSET</span><h2>3D 参数</h2>
              <div className="field-grid three">
                <label>输出类型<select value={meshType} onChange={(event) => setMeshType(event.target.value)}><option>完整模型</option><option>角色灰模</option><option>产品硬表面</option><option>雕塑 / 手办</option></select></label>
                <label>拓扑<select value={topology} onChange={(event) => setTopology(event.target.value)}><option>auto</option><option>low</option><option>medium</option><option>high</option></select></label>
                <label>材质<select value={material} onChange={(event) => setMaterial(event.target.value)}><option>PBR</option><option>gray model</option><option>hand-painted</option><option>none</option></select></label>
              </div>
            </section>
          )}

          {mode === "audio" && (
            <section className="panel form-panel">
              <span className="eyebrow">AUDIO</span><h2>音频参数</h2>
              <div className="field-grid three">
                <label>类型<select value={audioType} onChange={(event) => setAudioType(event.target.value)}><option>music</option><option>score</option><option>ambience</option><option>SFX</option><option>narration</option></select></label>
                <label>情绪<select value={audioMood} onChange={(event) => setAudioMood(event.target.value)}><option>calm</option><option>epic</option><option>mysterious</option><option>warm</option><option>tense</option></select></label>
                <label>节奏<select value={audioPace} onChange={(event) => setAudioPace(event.target.value)}><option>slow</option><option>medium</option><option>fast</option></select></label>
              </div>
            </section>
          )}

          <section className="panel form-panel">
            <span className="eyebrow">REFERENCES</span><h2>参考图</h2>
            {mainImage ? (
              <figure className="main-reference-preview"><img src={mainImage.dataUrl} alt={mainImage.name} /><div><strong>主效果图 / 主参考图</strong><span>{mainImage.name}</span><button className="ghost compact" onClick={() => setMainImage(null)}>移除</button></div></figure>
            ) : (
              <label className="upload-zone main-upload"><input type="file" accept="image/*" onChange={(event) => addMainImage(event.target.files?.[0])} /><strong>插入主效果图 / 主参考图</strong><span>用于确定主要视觉方向；当前版本只在本次 Builder 会话内预览。</span></label>
            )}
            <label className="upload-zone"><input type="file" accept="image/*" multiple onChange={(event) => addReferenceFiles(event.target.files)} /><strong>添加 Ref A–D</strong><span>最多 4 张。草稿不会把图片 Base64 写进 LocalStorage，避免浏览器容量膨胀。</span></label>
            {refs.length > 0 && <div className="reference-grid">{refs.map((ref) => <figure key={ref.id}><img src={ref.dataUrl} alt={ref.name} /><button onClick={() => setRefs((current) => current.filter((item) => item.id !== ref.id))}>×</button><figcaption>{ref.name}</figcaption></figure>)}</div>}
            <label>补充参数 / 约束<textarea rows={3} value={extra} onChange={(event) => setExtra(event.target.value)} placeholder="模型特定参数、连续性规则、备注等" /></label>
          </section>
        </div>

        <aside className="builder-output">
          <section className="panel sticky-output">
            <div className="section-heading compact-heading"><div><span className="eyebrow">LIVE OUTPUT</span><h2>Prompt</h2></div><div className="language-switch"><button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div></div>
            <div className="prompt-preview">{prompt || "填写左侧参数后，这里实时组合 Prompt。"}</div>
            <div className="negative-preview"><strong>Negative</strong><span>{negative || "—"}</span></div>
            <label>资产名称<input value={assetName} onChange={(event) => setAssetName(event.target.value)} /></label>
            <div className="output-actions"><button className="primary" disabled={saving} onClick={saveAsset}>{saving ? "保存中…" : "保存到 SQLite"}</button><button className="ghost" onClick={copyPrompt}>复制 Prompt</button><button className="ghost" onClick={exportAsset}>导出 .aipack.json</button><button className="ghost" onClick={reset}>重置</button></div>
            {message && <div className="builder-message">{message}</div>}
            <div className="builder-meta"><span>{model}</span><span>{preset}</span><span>{mainImage ? "主参考图 ✓" : "无主参考图"}</span><span>{refs.length} refs</span><span>{settings.autosaveDraft ? "草稿自动保存" : "草稿关闭"}</span></div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function VisualGroup({ title, values, selected, setSelected }: { title: string; values: readonly (readonly [string, string])[]; selected: string[]; setSelected: (value: string[]) => void }) {
  return <div className="visual-group"><strong>{title}</strong><div className="visual-options">{values.map(([label, icon]) => <button key={label} className={selected.includes(label) ? "selected" : ""} onClick={() => setSelected(toggleValue(selected, label))}><span>{icon}</span><em>{label}</em></button>)}</div></div>;
}
