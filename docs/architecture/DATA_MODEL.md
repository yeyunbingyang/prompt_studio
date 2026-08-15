# 数据模型

## Entity Overview

```text
CreationAsset
 ├─ 1..n PromptVariant
 ├─ 0..n MediaReference
 ├─ 0..n Output
 ├─ 0..n ModelBinding
 ├─ 0..1 WorkflowBinding
 ├─ 0..n Version
 └─ n..n Tag

Template
 ├─ ParameterGroup
 │   └─ ParameterOption
 └─ PromptCompositionRule

Workflow
 ├─ Node
 └─ Edge
```

## CreationAsset

| 字段 | 类型 | 说明 |
|---|---|---|
| id | UUID | 稳定标识 |
| title | string | 用户标题 |
| modality | enum | image/video/3d/audio/text/... |
| description | text | 说明 |
| template_id | UUID? | 来源模板 |
| cover_media_id | UUID? | 封面 |
| status | enum | active/archived/draft |
| forked_from | UUID? | Fork 来源 |
| created_at | datetime | 创建时间 |
| updated_at | datetime | 修改时间 |

## PromptVariant
- id
- asset_id
- name
- language
- model_family?
- positive_prompt
- negative_prompt?
- structured_parameters JSON
- revision

## Media
- id
- kind: cover/reference/output/thumbnail
- media_type: image/video/audio
- relative_path
- sha256
- width/height/duration?
- metadata JSON

## Template
模板 Schema 本身是版本化资产。参数字段不能直接硬编码到数据库列，使用定义表 + JSON 实例组合。

## Workflow
Workflow 只保存中立节点图；ComfyUI JSON 等属于 Adapter Payload/Export，而不是核心模型。

## Version Strategy
用户每次普通编辑不必生成完整快照；重要保存点生成 Version，版本记录 metadata diff + prompt snapshot + dependency refs。
