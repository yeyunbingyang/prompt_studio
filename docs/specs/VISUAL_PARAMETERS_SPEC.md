# Visual Parameters Specification

> Status: V0.3.2

The image Builder no longer treats visual controls as three hard-coded arrays. Visual parameters are reusable data records that bind UI labels, explanations and prompt fragments to stable IDs.

## Goals

1. Keep visual controls understandable for users who do not know prompt terminology.
2. Persist selections as structured data instead of relying on prompt-text parsing.
3. Allow templates, model adapters and workflows to bind to stable parameter IDs.
4. Allow the catalog to grow from 100 options to hundreds without rewriting the Builder component.
5. Preserve compatibility with V0.3.1 built-in templates.

## V1 catalog

The first catalog contains 10 groups and 100 options.

| Tier | Group | Selection |
|---|---|---|
| Basic | View | single |
| Basic | Shot Size | single |
| Basic | Composition | multiple |
| Basic | Lighting | multiple |
| Basic | Visual Medium | single |
| Advanced | Camera Height | single |
| Advanced | Lens / Focal Length | single |
| Advanced | Depth of Field | single |
| Advanced | Color Palette | multiple |
| Professional | Environment / Atmosphere | multiple |

The source of truth is `apps/web/src/data/visualParameters.ts`.

## Option shape

```ts
{
  id: "85mm",
  labelZh: "85mm 人像",
  labelEn: "85mm portrait",
  icon: "85",
  descriptionZh: "轻微空间压缩和自然人脸比例。",
  promptZh: "85mm人像镜头，轻微空间压缩，自然面部比例",
  promptEn: "85mm portrait lens, gentle compression and natural facial proportions"
}
```

`id` is the stable machine key. Display labels and prompt fragments may improve over time without breaking saved Creation Assets.

## Persisted structure

Image assets store selections in the Base Prompt Variant `structured_parameters` JSON column.

```json
{
  "schema": "prompt-studio.visual-parameters.v1",
  "subject": "一位成年人物",
  "model": "GPT Image",
  "preset": "人像摄影",
  "visual_parameters": {
    "view": ["three-quarter"],
    "shot": ["head-shoulders"],
    "composition": ["thirds", "negative-space"],
    "lighting": ["cinematic-side"],
    "lens": ["85mm"]
  },
  "visual_parameter_count": 6
}
```

SQLite remains metadata storage. Visual parameter values are IDs only; preview images and large media must not be embedded as Base64 in `structured_parameters`.

## Prompt composition

For image mode the Builder resolves each selected option ID to the catalog and appends its language-specific prompt fragment in stable group order.

The rendered Prompt is an output of structured state, not the canonical source of parameter selections.

## Selection semantics

- `single`: at most one option in the group. Clicking the active option again clears the group.
- `multiple`: zero or more options. Each option toggles independently.
- Empty groups are valid.

## Compatibility

V0.3.1 templates still expose legacy arrays (`composition`, `lighting`, `style`). When a template loads, labels are looked up across the V1 catalog and mapped to stable option IDs.

Examples:

- `三视图` -> `view.three-view`
- `全身` -> `shot.full-body`
- `电影侧光` -> `lighting.cinematic-side`
- `照片级真实` -> `medium.photo-real`
- `3D 国漫` -> `medium.guoman-3d`

Old Builder drafts are migrated the same way when possible.

## UI behavior

The Visual Parameters panel provides:

- Basic / Advanced / Professional tiers
- selected / total counter
- selected-parameter summary chips
- collapsible parameter groups
- single/multiple-selection indicators
- option explanation text
- Chinese and English prompt composition
- one-click clearing of visual selections

## Future extension

A later schema revision can add, without changing the Builder interaction model:

- thumbnail / preview media IDs
- recommended models
- model-specific prompt fragments
- strength / intensity
- incompatibility rules
- parameter dependencies
- effect examples
- Template Editor bindings
- ComfyUI node bindings

Do not hard-code new visual buttons in `PromptBuilder.tsx`; add catalog records or introduce a schema-compatible renderer instead.
