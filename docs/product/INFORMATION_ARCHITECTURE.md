# 信息架构与页面规划

## 一级导航

1. **发现** `/discover`
2. **构建器** `/builder/:modality`
3. **模板库** `/templates`
4. **模型库** `/models`
5. **工作流** `/workflows`
6. **我的资产** `/library`
7. **导入 / 分享** `/share`
8. **设置** `/settings`

## 二级页面

### 发现
- 推荐 / 最近使用
- 图片 / 视频 / 3D / 音频
- 本地收藏
- 后续：社区内容

### Asset Detail
- Preview
- Prompt Variants
- Parameters
- References
- Model Profile
- Workflow
- Outputs
- Versions / Notes
- 操作：编辑、Fork、导出

### Builder
统一外壳：左侧参数 / 中间视觉参考或案例 / 右侧 Prompt Inspector。

图片专用：主体、视图、构图、镜头、灯光、材质、风格、Negative。  
视频专用：主体、动作、Camera Motion、Lens、Speed、Duration、Scene Motion、Start/End、Audio、Dialogue、Continuity。

### Template Detail / Editor
- 基本信息
- 参数组
- 选项与效果图
- Prompt Fragment
- 模型覆盖规则
- Preview
- Version

### Workflow Editor
- 节点画布
- Inspector
- Inputs / Outputs
- Run History
- Adapter / Execution Target

## 页面状态约定
每个列表页至少定义：Loading、Empty、Error、Normal、Search-empty。  
编辑页面至少定义：Clean、Dirty、Autosaving、Saved、Conflict、Validation error。
