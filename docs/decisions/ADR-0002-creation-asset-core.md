# ADR-0002 — Creation Asset 而非 Prompt 作为核心对象

- Status: Accepted

## Context
图片/视频创作的可复现性依赖 Prompt 之外的模型、参数、参考素材、Workflow 和输出案例。

## Decision
以 `CreationAsset` 作为顶层领域对象；Prompt 是 `PromptVariant` 子对象。

## Consequences
+ 可以自然支持多模态、Workflow、Fork 与分享。  
+ UI 可在 Gallery/Prompt/Workflow 三种视角间切换。  
- 数据模型比简单 Prompt Library 更复杂。  
- 需要清晰管理依赖和版本。
