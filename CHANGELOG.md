# Changelog

## 0.3.2 - Visual Parameters System

### Added
- 图片 Builder 升级为数据驱动的 Visual Parameters System。
- 首批 10 个参数组 / 100 个图片视觉参数。
- Basic / Advanced / Professional 三层参数导航。
- 参数组折叠、单选 / 多选语义、已选统计与组合摘要。
- 每个视觉选项绑定稳定 ID、中文 / 英文名称、说明与双语 Prompt Fragment。
- `structured_parameters` 通过 FastAPI 写入 SQLite Prompt Variant，并可完整读取恢复。
- V0.3.1 模板与旧草稿参数自动映射到稳定 Visual Parameter ID。
- 结构化参数 Round Trip API 测试。
- `docs/specs/VISUAL_PARAMETERS_SPEC.md` 参数规范。

### Changed
- 图片 Prompt 不再依赖 `composition / lighting / style` 三个硬编码数组。
- Prompt 文本改为 Visual Parameter 结构化状态的派生输出。
- `.aipack.json` 导出版本升级为 V0.3.2，并携带结构化视觉参数。

### Architecture
- SQLite 继续只存 metadata / JSON；图片预览和大型媒体不写入 `structured_parameters`。
- 后续效果缩略图、模型兼容性、强度、Template Editor 和 ComfyUI 节点绑定均基于稳定参数 ID 扩展。

## 0.3.1 - Prototype Parity

### Added
- 正式 React 应用迁入 V0.2 的 9 页面信息架构。
- 发现页、效果图库、模板库、模型目录和工作流目录。
- 图片 / 视频 / 3D / 音频多模态 Prompt Builder。
- 图片构图 / 光线 / 风格视觉参数卡。
- 视频 Camera Motion、Lens、速度、时长、画幅、开始/结束状态、声音/对白控制。
- 主效果图 / 主参考图与 Ref A–D 会话预览。
- 中文 / English 实时 Prompt、复制、重置和 `.aipack.json` 导出。
- Creation Asset SQLite 保存、详情、筛选、Grid/List、归档、恢复、删除和重新载入 Builder。
- 离线 Share Code、JSON 导入、全部资产备份与恢复导入。
- 设置页默认语言 / 默认模态 / 自动草稿恢复 / 本地数据清理。

### Changed
- V0.3 从 Engineering Skeleton 进入 Prototype Parity 阶段。
- V0.2 的 LocalStorage 资产保存改为正式 SQLite Creation Asset。
- 参考图不再作为大块 Base64 数据写入 SQLite；正式媒体持久化继续按 `.prompt-studio/media/` 架构推进。

### Validation
- 每个功能切片独立提交并触发 GitHub Actions。
- Web/Core：`npm ci`、TypeScript typecheck、Vitest、production build 均通过。
- API：依赖安装与 pytest 均通过。

## 0.3.0 - Engineering Skeleton

### Added
- React + TypeScript + Vite 正式 Web 应用骨架。
- FastAPI 本地服务与 `/api/v1` API。
- SQLite 自动初始化与首个 migration。
- Creation Asset 基础 CRUD / 搜索。
- `packages/core` 领域类型与 Prompt Composer。
- Creation Asset / Template / Workflow / Share Pack JSON Schema。
- Windows PowerShell bootstrap / dev / check 脚本。
- Windows `setup.bat` / `start.bat` / `check.bat` / `stop.bat` 一键脚本。
- API 与 Core 基础测试。
- ComfyUI Adapter 边界接口。

### Changed
- 正式开发入口从 `prototype/v0.2` 迁移到 `apps/`。
- Windows 日常运行方式优先使用根目录 BAT，PowerShell 脚本保留为底层实现和排错入口。
- V0.2 继续作为 UI/产品验证参考，不作为生产代码继续堆功能。

## 0.2.0
- Prompt Studio CN 单页产品原型。
