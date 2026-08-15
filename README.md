# Prompt Studio CN

> 本地优先的多模态 AI 创作资产工作台。  
> 当前阶段：**V0.3 Prototype Parity**

Prompt Studio CN 不把 Prompt 当作孤立文本，而是把 Prompt、参数、模型、参考图、效果图、Workflow、输出结果和版本统一组织为 **Creation Asset**。

V0.3 已经把 `prototype/v0.2` 的主要页面与交互迁移到正式 React + FastAPI + SQLite 工程。原型继续保留用于视觉和产品对照，但日常开发入口是 `apps/`。

## 当前结构

- `prototype/v0.2/`：保留的 V0.2 产品/UI 原型
- `apps/web/`：React + TypeScript + Vite 正式前端
- `apps/api/`：FastAPI 本地服务
- `packages/core/`：领域模型与 Prompt 组合逻辑
- `packages/integrations/`：外部模型/ComfyUI Adapter 边界
- `data/migrations/`：SQLite migration
- `data/schemas/`：Creation Asset / Template / Workflow / Share Pack JSON Schema
- `docs/`：PRD、架构、规格、研究和开发文档

## Windows 一键运行

环境要求：

- Node.js `20.19+`（或 `22.12+`）
- npm `10+`
- Python `3.10+`
- Windows 10/11

首次使用可以直接双击：

```text
setup.bat
```

日常使用通常只需要：

```text
start.bat
```

停止：

```text
stop.bat
```

完整检查：

```text
check.bat
```

`start.bat` 会检测 `.venv`，首次运行时自动调用安装流程；也会检测 5173 / 8000 端口，避免重复启动。

启动地址：

- Web: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:8000`
- OpenAPI: `http://127.0.0.1:8000/docs`

## V0.3 已实现

### 9 个正式页面

1. 发现
2. 效果图库
3. 提示词构建器
4. 模板库
5. 工作流
6. 模型目录
7. 我的资产
8. 导入 / 分享
9. 设置

### 多模态 Prompt Builder

- 图片 / 视频 / 3D / 音频四种模式
- 模型与预设选择
- 主效果图 / 主参考图
- Ref A–D 辅助参考图
- Negative Prompt
- 补充参数与约束
- 中文 / English 实时 Prompt
- Prompt 一键复制
- `.aipack.json` 导出
- SQLite Creation Asset 保存
- 轻量草稿自动保存/恢复
- 设置默认语言和默认 Builder 模态

图片模式包含构图、光线、风格视觉卡片；视频模式包含主体动作、Camera Motion、Lens、速度、时长、画幅、环境运动、开始/结束状态与声音/对白；3D 与音频模式也有各自结构化参数。

### Catalog

- 12 套内置模板
- 18 个模型档案
- 8 个效果示例
- 6 个工作流预设
- 模板 → Builder
- 效果 → 模板 → Builder
- 模型 → Builder

### Creation Asset

- 创建 / 列表 / 搜索 / 筛选
- Grid / List 浏览
- 查看详情
- Prompt Variant 查看
- 归档 / 恢复
- 删除
- 重新载入 Builder 作为副本继续编辑
- 单资产 JSON 导出

### 导入 / 分享

- `.aipack.json` 导出
- JSON 导入
- 离线 Share Code 生成 / 复制 / 导入
- 全部 Creation Asset JSON 备份
- Backup JSON 恢复导入

### 设置

- Local First
- 自动保存草稿
- 保存预览图选项（媒体持久化能力仍在演进）
- 默认 Prompt 语言
- 默认 Builder 模态
- 清除浏览器设置 / 草稿
- 清空本地 SQLite Creation Assets

## 数据位置

正式资产 metadata 默认写到：

```text
.prompt-studio/
├── prompt_studio.db
└── media/
    ├── covers/
    ├── references/
    ├── outputs/
    └── thumbnails/
```

可以通过 `PS_DATA_DIR` 修改。

当前 Builder 的参考图会在浏览器会话中预览；大媒体的正式持久化仍按架构计划迁入 `.prompt-studio/media/`，不会把大图片塞进 SQLite。

## Prototype Parity 的边界

“Prototype Parity”表示 V0.2 **已经能操作的页面和核心交互**已经迁到正式 V0.3。以下能力在 V0.2 本身也是概念/后续规划，因此不属于这次 parity 的完成条件：

- 可拖拽 Workflow Graph Editor
- 真正执行 ComfyUI Queue
- 直接调用 GPT Image / Kling / Veo / Runway 等模型
- 可视化 Template Editor
- 在线账号、社区、点赞、Fork、在线分享 URL
- 完整媒体文件管理与缩略图流水线

详细逐项对照见：`docs/development/PROTOTYPE_PARITY_CHECKLIST.md`。

## 项目原则

1. Local-first。
2. SQLite 存 metadata，大媒体放文件系统。
3. Domain Core 不依赖 UI、FastAPI、ComfyUI 或具体模型。
4. 外部服务通过 Adapter 接入。
5. Token / Secret 不写入 Creation Pack。
6. 原型与正式代码分离。
7. 新功能逐步提交，并保持 CI 可验证。

## 下一阶段

Prototype parity 完成后，V0.3 后续重点转向“正式能力增强”：

1. Template CRUD + 可视化 Template Editor
2. 本地媒体导入、持久化与缩略图
3. Creation Asset Version Checkpoint
4. Workflow Graph CRUD / Editor
5. ComfyUI 本地连接与 Run Record
6. 正式 `.creationpack` 打包导入/导出

详见 `docs/product/ROADMAP.md` 与 `docs/product/PRD.md`。
