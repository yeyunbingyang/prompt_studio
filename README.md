# Prompt Studio CN / 提示工坊

**本地优先的多模态 AI 创作资产工作台。**

Prompt Studio CN 的目标不是只保存几段提示词，而是把 **Prompt、参数、参考图、效果图、模型配置、工作流、输出案例和版本历史** 组织成可复用、可分享的 `Creation Asset`。

> 当前仓库状态：**产品定义 / 架构奠基阶段**。现有 V0.2 为交互原型，不代表最终技术实现。

## 产品方向

- **70% 本地 AI 创作工作台**：隐私、本地资产、模板、工作流、模型适配。
- **30% 分享与社区能力**：导入导出、Fork、Creation Pack，后续再扩展在线发布。
- 多模态：图片、视频、3D、音频，未来可扩展 LLM Prompt、Agent 与 Skill。
- 本地优先：核心资产默认留在用户设备，云服务是可选增强而非前置条件。

## 仓库结构

```text
.
├── apps/                     # 正式应用（V0.3+）
│   └── web/                  # Web/桌面壳前端
├── packages/                 # 可复用核心包
│   ├── core/                 # Creation Asset / Template / Prompt Engine
│   └── integrations/         # ComfyUI / 模型服务适配
├── prototype/
│   └── v0.2/                 # 当前可运行静态原型
├── data/
│   └── schemas/              # 数据交换 Schema
└── docs/
    ├── product/              # PRD、信息架构、页面、用户流、路线图
    ├── architecture/         # 系统架构、数据模型、存储与集成
    ├── specs/                # Creation Asset / Template / Workflow / Share Pack
    ├── development/          # 开发、测试、发布规范
    ├── research/             # 竞品和参考资料
    └── decisions/            # Architecture Decision Records
```

## 快速预览 V0.2 原型

```bash
python -m http.server 8080
```

打开：`http://localhost:8080/prototype/v0.2/`

也可以直接双击 `prototype/v0.2/index.html`。

## 文档入口

- [PRD](docs/product/PRD.md)
- [产品愿景](docs/product/PRODUCT_VISION.md)
- [页面与信息架构](docs/product/INFORMATION_ARCHITECTURE.md)
- [系统架构](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [数据模型](docs/architecture/DATA_MODEL.md)
- [Creation Asset 规范](docs/specs/CREATION_ASSET_SPEC.md)
- [开发指南](docs/development/DEVELOPMENT_GUIDE.md)
- [路线图](docs/product/ROADMAP.md)

## 当前里程碑

**M0 — Foundation**：完成产品定义、Schema、目录和开发规范。  
**M1 — V0.3 Local Core**：SQLite + 本地文件资产 + 模板编辑器。  
**M2 — V0.4 Workflow**：节点工作流 + ComfyUI 集成。  
**M3 — V0.5 Share Pack**：Creation Pack 导出、导入和 Fork。  
**M4 — V1.0**：稳定本地工作台。
