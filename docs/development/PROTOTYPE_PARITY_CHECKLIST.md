# V0.2 → V0.3 Prototype Parity Checklist

本文用于区分三件事：

1. V0.2 原型中已经能操作的功能；
2. V0.3 正式程序已经迁移的对应能力；
3. V0.2 中本来就是占位/未来规划的能力。

状态：

- ✅ 已在正式 V0.3 实现
- △ 已迁移交互，但正式底层能力仍会继续增强
- ○ V0.2 本身就是概念/未来规划，不属于 parity 缺口

## 页面

| V0.2 页面 | V0.3 | 说明 |
|---|---:|---|
| 发现 | ✅ | Hero、快速入口、统计、Featured Assets |
| 效果图库 | ✅ | 搜索、模态筛选、效果 → 模板 → Builder |
| 提示词构建器 | ✅ | 正式 React Builder |
| 模板库 | ✅ | 12 套模板、搜索、筛选、详情、使用模板 |
| 工作流 | ✅ | 6 套工作流与 Concept Graph |
| 模型目录 | ✅ | 18 个模型档案、搜索、筛选、带模型进入 Builder |
| 我的资产 | ✅ | SQLite 资产库，不再使用 LocalStorage 作为资产真源 |
| 导入 / 分享 | ✅ | JSON、Share Code、Backup |
| 设置 | ✅ | 默认值、草稿、本地数据管理 |

## Prompt Builder

| 能力 | V0.3 | 说明 |
|---|---:|---|
| 图片 / 视频 / 3D / 音频 Tab | ✅ | 四种正式模式 |
| Model | ✅ | 按模态切换模型列表 |
| Preset | ✅ | 按模态切换预设 |
| 主体 / 核心描述 | ✅ | 实时参与 Prompt |
| Negative Prompt | ✅ | 保存进 Prompt Variant |
| 补充参数 | ✅ | 实时参与 Prompt |
| 中文 / English | ✅ | 双语实时输出 |
| Copy Prompt | ✅ | Clipboard API |
| Reset | ✅ | 同时清理轻量草稿 |
| Save Asset | ✅ | 写入 SQLite |
| Export `.aipack.json` | ✅ | 浏览器下载 |
| 主效果图 / 主参考图 | △ | 已支持上传与会话预览；正式媒体持久化后续写入媒体目录 |
| Ref A–D | △ | 已支持最多 4 张上传与会话预览；不把大图写进 SQLite |
| 自动草稿 | ✅ | 文本与结构化参数进入 LocalStorage，不保存图片 Base64 |
| 模板加载 | ✅ | Template → Builder |
| 模型加载 | ✅ | Model Profile → Builder |
| SQLite 资产重新编辑 | ✅ | 以副本形式载入 Builder |

## 图片模式

- ✅ 构图：正面 / 严格侧面 / 三视图 / 全身 / 半身 / 特写 / 低机位 / 俯拍
- ✅ 光线：棚拍 / 电影侧光 / 窗光 / 逆光 / 轮廓光 / 霓虹 / 体积光 / 低调光
- ✅ 风格：真实 / 半写实 / 3D 国漫 / 概念艺术 / 产品渲染 / 极简 / 复古胶片 / 赛博朋克

## 视频模式

- ✅ 主体动作
- ✅ Camera Motion
- ✅ 24 / 35 / 50 / 85 / 100mm Lens
- ✅ 运动速度
- ✅ 5 / 8 / 10 / 15 秒
- ✅ 16:9 / 9:16 / 1:1 / 2.39:1
- ✅ 环境 / 时间变化
- ✅ 开始状态 / 结束状态
- ✅ 声音 / 对白

## 3D / 音频

- ✅ 3D 输出类型 / topology / material
- ✅ Audio type / mood / pace

## Creation Asset

| 能力 | V0.3 |
|---|---:|
| 搜索 | ✅ |
| 模态筛选 | ✅ |
| Grid / List | ✅ |
| 详情 | ✅ |
| Prompt Variant | ✅ |
| 归档 / 恢复 | ✅ |
| 删除 | ✅ |
| 载入 Builder | ✅ |
| 单资产导出 | ✅ |
| 全部备份 | ✅ |
| Backup 恢复导入 | ✅ |

## 设置

| V0.2 设计 | V0.3 |
|---|---:|
| Local First | ✅ |
| Autosave Draft | ✅，并真正接入 Builder |
| Save Preview Images | △，保留设置入口；正式媒体存储下一阶段完成 |
| Default Prompt Language | ✅ |
| Default Builder Modality | ✅ |
| Backup All | ✅，放在导入 / 分享页 |
| Restore Backup | ✅，通过 JSON Import |
| Clear Local Data | ✅，区分浏览器设置/草稿与 SQLite Creation Assets |

## 不属于 parity 缺口

以下项目在 V0.2 中本身就是概念、Toast 或未来规划，因此本次不把它们伪装成“已经完成”：

- ○ New Template → 真正的可视化 Template Editor
- ○ New Workflow → 真正可编辑的 Workflow Graph
- ○ 拖拽节点 / 连线
- ○ ComfyUI workflow.json 导入导出与 Queue 执行
- ○ GPT Image / Kling / Veo / Runway 等真实模型 API 执行
- ○ 在线账号 / 社区 / Like / Fork / 在线 URL
- ○ 大规模媒体目录、缩略图生成与媒体去重

## 正式 V0.3 相比原型的改进

V0.3 并不是把 V0.2 代码直接搬过去：

- Creation Asset 真源从 LocalStorage 改为 SQLite；
- API 有真实 CRUD 和 pytest；
- Web 使用 React + TypeScript；
- npm 使用 lockfile + `npm ci`；
- 每个功能切片经过 GitHub Actions 的 typecheck / test / build；
- 大媒体不会被塞进 SQLite；
- V0.2 继续保留，可随时对照视觉与交互。

## 下一验收节点

Prototype parity 完成后，下一阶段应优先做：

1. Media API + `.prompt-studio/media/` 持久化；
2. Template CRUD + Visual Template Editor；
3. Workflow Graph CRUD；
4. ComfyUI Adapter 真执行；
5. Creation Asset Version；
6. 正式 `.creationpack` 打包格式。
