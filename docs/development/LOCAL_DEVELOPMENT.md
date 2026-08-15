# V0.3 本地开发

## 运行边界

- Web：`apps/web`，React + TypeScript + Vite
- Local API：`apps/api`，FastAPI
- Domain Core：`packages/core`
- Runtime DB / media：`.prompt-studio/`，不提交 Git

## 首次启动

Windows：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\bootstrap.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```

## API 设计

V0.3 所有正式本地 API 统一挂在 `/api/v1`。

当前提供 Creation Asset 基础 CRUD。Template、Workflow、Media、Run Record 会沿同一版本前缀增加。

## 数据迁移

API 启动时执行 `data/migrations/0001_init.sql`。迁移必须幂等；后续新增结构只能新增 `0002_*`，不能静默修改已发布 migration 的语义。

## Adapter 原则

任何 ComfyUI / 云模型 SDK 细节只能进入 `prompt_studio_api/integrations/`。Application/Domain 不允许直接 import 第三方模型 SDK。

## Definition of Done

每个 V0.3 工程切片至少满足：

1. 能在干净环境安装。
2. `scripts/check.ps1` 通过。
3. 数据库变更有 migration。
4. API 变更有至少一个测试。
5. JSON 导入导出格式变更同步 Schema。
6. 不把媒体、Token、数据库文件提交 Git。
