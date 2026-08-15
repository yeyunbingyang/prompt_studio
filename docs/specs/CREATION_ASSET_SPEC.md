# Creation Asset Spec v0.1

## 定义
Creation Asset 是 Prompt Studio 的顶层可复用创作对象。它描述“**这个效果/方法是什么，以及如何复现或继续修改**”。

## 最小结构

```json
{
  "schemaVersion": "0.1",
  "id": "uuid",
  "title": "Cinematic Character Turnaround",
  "modality": "image",
  "description": "...",
  "tags": ["character", "turnaround"],
  "promptVariants": [],
  "parameters": {},
  "references": [],
  "outputs": [],
  "modelBindings": [],
  "workflow": null,
  "lineage": {"forkedFrom": null}
}
```

## 规则
1. Asset ID 稳定，不随标题变化。
2. `parameters` 保存用户意图；`promptVariants` 保存具体模型表达，不混为一体。
3. Media 使用相对引用或 Pack URI，不嵌入大段 Base64。
4. Fork 创建新 ID，并保留 lineage。
5. 未知扩展字段导入时应尽量保留，以提高前后兼容性。
