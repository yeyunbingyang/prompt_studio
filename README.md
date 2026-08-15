# Prompt Studio CN / 提示工坊

本地优先的 AI 创作资产工作台原型。当前版本为 **V0.2**。

## 当前能力

- 图片 / 视频 / 3D / 音频 Prompt Builder
- 中文 / 英文 Prompt 输出
- 模板库与模型目录
- 本地 Creation Asset 保存与再次载入
- 效果图、Ref A-D 参考图
- JSON / `.aipack.json` 导入导出
- 工作流结构预览
- 浏览器 LocalStorage 本地存储

## 运行

无需构建环境。克隆仓库后直接打开 `index.html`，或使用任意静态 HTTP Server。

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 项目结构

```text
.
├── index.html
├── styles.css
├── data.js
├── core.js
├── library.js
└── README.md
```

## 下一阶段

V0.3 计划加入 SQLite / 本地文件资产管理、可视化模板编辑器、工作流数据结构以及 ComfyUI API 接口预留。
