# Changelog

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
