import { useEffect, useState } from "react";
import type { StudioMode } from "../data/catalog";

export type LocalSettings = {
  localFirst: boolean;
  autosaveDraft: boolean;
  savePreviewImages: boolean;
  defaultLanguage: "zh" | "en";
  defaultMode: StudioMode;
};

const KEY = "promptStudioCN.settings.v03";

const defaults: LocalSettings = {
  localFirst: true,
  autosaveDraft: true,
  savePreviewImages: false,
  defaultLanguage: "zh",
  defaultMode: "image"
};

export function readSettings(): LocalSettings {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return defaults;
  }
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<LocalSettings>(readSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings));
    setMessage("设置已保存到当前浏览器。");
    const timer = window.setTimeout(() => setMessage(""), 1200);
    return () => window.clearTimeout(timer);
  }, [settings]);

  return (
    <div className="settings-grid">
      <section className="panel settings-card">
        <span className="eyebrow">PRIVACY</span>
        <h2>本地优先</h2>
        <SettingSwitch
          title="Local First"
          text="Creation Asset 元数据写入本地 SQLite，不自动上传。"
          value={settings.localFirst}
          disabled
          onChange={() => undefined}
        />
        <SettingSwitch
          title="自动保存草稿"
          text="允许 Builder 在浏览器 LocalStorage 中保存轻量草稿。"
          value={settings.autosaveDraft}
          onChange={(value) => setSettings((current) => ({ ...current, autosaveDraft: value }))}
        />
        <SettingSwitch
          title="保存预览图"
          text="预留给正式媒体管理；当前仅在 Builder 会话中预览参考图。"
          value={settings.savePreviewImages}
          onChange={(value) => setSettings((current) => ({ ...current, savePreviewImages: value }))}
        />
      </section>

      <section className="panel form-panel">
        <span className="eyebrow">DEFAULTS</span>
        <h2>创作默认值</h2>
        <label>
          默认 Prompt 语言
          <select
            value={settings.defaultLanguage}
            onChange={(event) => setSettings((current) => ({ ...current, defaultLanguage: event.target.value as "zh" | "en" }))}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </label>
        <label>
          默认 Builder 模态
          <select
            value={settings.defaultMode}
            onChange={(event) => setSettings((current) => ({ ...current, defaultMode: event.target.value as StudioMode }))}
          >
            <option value="image">图片</option>
            <option value="video">视频</option>
            <option value="3d">3D</option>
            <option value="audio">音频</option>
          </select>
        </label>
        <button
          className="danger"
          onClick={() => {
            localStorage.removeItem(KEY);
            localStorage.removeItem("promptStudioCN.builderDraft.v03");
            setSettings(defaults);
            setMessage("浏览器侧设置与草稿已清除。");
          }}
        >
          清除浏览器侧数据
        </button>
        {message && <div className="builder-message">{message}</div>}
      </section>
    </div>
  );
}

function SettingSwitch({
  title,
  text,
  value,
  disabled,
  onChange
}: {
  title: string;
  text: string;
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className={`setting-row ${disabled ? "disabled" : ""}`}>
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <button
        className={value ? "toggle on" : "toggle"}
        disabled={disabled}
        onClick={() => onChange(!value)}
        aria-pressed={value}
      >
        <i />
      </button>
    </div>
  );
}
