# 系统架构

## 目标形态

```text
┌─────────────────────────────────────┐
│ UI: Web App / Desktop Shell         │
│ Discover · Builder · Library · Flow │
└──────────────────┬──────────────────┘
                   │ local API / IPC
┌──────────────────▼──────────────────┐
│ Application Service                 │
│ Asset · Template · Search · Import  │
│ Workflow · Media · Version          │
└───────┬───────────────┬─────────────┘
        │               │
┌───────▼──────┐  ┌─────▼────────────┐
│ SQLite       │  │ Managed Storage  │
│ metadata     │  │ images/videos    │
└──────────────┘  └──────────────────┘
        │
┌───────▼─────────────────────────────┐
│ Integration Adapters               │
│ ComfyUI · Remote Model APIs · etc. │
└─────────────────────────────────────┘
```

## 推荐技术方向（待 ADR 最终确认）
- UI：TypeScript + React/Vite
- 本地服务：Python FastAPI 或桌面 IPC 层
- 数据库：SQLite
- 媒体：受管本地目录
- 桌面：先 Web local server，稳定后评估 Tauri/Electron

## 分层

### Domain Core
不感知 UI 和第三方模型：CreationAsset、Template、PromptVariant、Workflow、ModelProfile。

### Application Services
提供 CRUD、搜索、导入导出、媒体复制、版本、运行编排。

### Adapters
第三方变化隔离在这里。ComfyUI、模型 API、文件格式转换都不能反向侵入 Domain Core。

## 数据流原则
1. UI 永远通过服务层修改持久化数据。
2. 数据库存 metadata，不存大媒体 Blob。
3. 外部 API Token 不进入 Creation Pack。
4. 每个异步生成任务有 Run Record，输出完成后再绑定 Asset。
