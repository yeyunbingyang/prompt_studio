# Template Spec v0.1

## 目标
模板把 Prompt 从“字符串”变为“可视化参数 + 组合规则”。

## Parameter 类型
- `single_select`
- `multi_select`
- `text`
- `textarea`
- `number`
- `range`
- `toggle`
- `media_reference`
- `color`
- `duration`

## Option
每个选项可包含：
- label_zh / label_en
- value
- help
- preview_media
- prompt_fragment
- negative_fragment
- model_overrides
- incompatible_with

## Composition
模板声明片段顺序，而不是把 UI 顺序偷偷当 Prompt 顺序。

示例：
`subject → anatomy → composition → camera → lighting → style → quality → constraints`

视频模板可定义：
`subject → initial_state → subject_motion → camera_motion → environment_motion → timing → audio → final_state → continuity`
