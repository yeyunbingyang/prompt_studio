# ADR-0003 — V0.3 工程技术栈

- Status: Accepted
- Date: 2026-08-15

## Decision

V0.3 使用：

- Web: React + TypeScript + Vite
- Local API: Python FastAPI
- Database: SQLite
- Media: managed local filesystem
- Tests: Vitest + Pytest
- External generation: Adapter boundary

## Why

当前目标是先验证 local-first Creation Asset 数据闭环，并为图片、视频、Workflow 和 ComfyUI 保留稳定边界。Web local server 的开发迭代速度高于立即引入桌面壳；等本地服务和资产模型稳定后再评估 Tauri/Electron。

## Consequences

- 需要 Node 与 Python 两套运行时。
- 前后端领域类型需要通过 JSON Schema/API contract 保持一致。
- SQLite 和媒体文件目录是用户本地数据的事实来源。
- 第三方模型不进入 Domain Core。
