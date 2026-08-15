# Workflow Spec v0.1

## 核心对象

```text
Workflow
├─ Nodes[]
├─ Edges[]
├─ Inputs[]
├─ Outputs[]
└─ AdapterBinding?
```

## 节点类别
- Input / Reference
- Prompt Compose
- Model Execute
- Transform
- Review / Select
- Output
- External Workflow

## 设计原则
- Core Workflow 不绑定 ComfyUI node class。
- Adapter 可保存 vendor payload，例如 `comfyui.workflow`。
- Node 参数允许引用 Asset Parameter：`${asset.parameters.camera}`。
- Run 时生成不可变 Run Snapshot，避免执行中编辑资产导致结果无法复现。

## V0.4 编辑器要求
- 拖拽节点
- 连线
- Inspector
- 输入验证
- 保存/复制
- Run History
- Adapter 状态
