# 开发指南

## 当前阶段
`prototype/v0.2` 只做参考。正式功能从 `apps/` 与 `packages/` 开始。

## 建议开发分层
- `apps/web`：页面、路由、状态、UI
- `packages/core`：领域类型、Prompt composition、validation
- `packages/integrations`：ComfyUI / remote model adapters
- 本地 service：数据库、文件、搜索、任务运行

## 分支与提交
- 功能：`feat/...`
- 修复：`fix/...`
- 文档：`docs/...`
- 原型实验：`prototype/...`

提交信息使用简洁语义前缀：`feat:`, `fix:`, `docs:`, `refactor:`, `test:`。

## Definition of Done
- 功能有对应 PRD/Spec 依据。
- 数据结构变更有 migration。
- 核心逻辑有测试。
- UI 处理 empty/error/loading 状态。
- 不提交用户媒体、数据库、token。
- 文档与实现一致。
