# Prompt Studio CN

> 本地优先的多模态 AI 创作资产工作台。  
> 当前阶段：**V0.3 Engineering Skeleton**

Prompt Studio CN 不把 Prompt 当作孤立文本，而是把 Prompt、参数、模型、参考图、效果图、Workflow、输出结果和版本统一组织为 **Creation Asset**。

## 当前状态

- `prototype/v0.2/`：保留的产品/UI 原型
- `apps/web/`：V0.3 React + TypeScript + Vite 正式前端
- `apps/api/`：V0.3 FastAPI 本地服务
- `packages/core/`：与 UI/第三方无关的领域模型与 Prompt 组合逻辑
- `data/migrations/`：SQLite 数据库迁移
- `data/schemas/`：Creation Asset / Template / Workflow / Share Pack JSON Schema
- `docs/`：PRD、架构、规格、研究和开发文档

V0.3 已经是可启动工程，不再只是静态页面：Web 会连接本地 API，API 自动初始化 SQLite，并支持 Creation Asset 的基础 CRUD 与搜索。

## 环境要求

- Node.js `20.19+`（或 `22.12+`）
- npm `10+`
- Python `3.10+`
- Windows 10/11、macOS 或 Linux

## Windows 快速启动

首次：

```powershell
git pull origin main
powershell -ExecutionPolicy Bypass -File .\scripts\bootstrap.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```

然后打开：

- Web: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:8000`
- OpenAPI: `http://127.0.0.1:8000/docs`

以后开发只需要：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```

## 手动启动

### API

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r apps\api\requirements.txt
.\.venv\Scripts\python.exe -m uvicorn prompt_studio_api.main:app --app-dir apps/api --reload --host 127.0.0.1 --port 8000
```

### Web

```powershell
npm install
npm run dev:web
```

## V0.3 可用能力

- API 健康检查
- SQLite 首次运行自动建库
- Creation Asset：创建、列表、搜索、读取、编辑、删除
- Prompt Variant 随资产保存
- React Dashboard 显示 API / 数据库状态
- Web 快速创建图片/视频资产
- Creation Asset JSON Schema
- Template / Workflow / Share Pack Schema 基础版
- Prompt Core：Prompt Fragment 组合与去空值
- Core 单元测试
- API 基础测试
- Windows bootstrap/dev/check 脚本
- ComfyUI Adapter 接口占位，不侵入 Domain Core

## 数据位置

默认用户数据不会写进 Git：

```text
.prompt-studio/
├── prompt_studio.db
└── media/
    ├── covers/
    ├── references/
    ├── outputs/
    └── thumbnails/
```

可以通过 `PS_DATA_DIR` 修改。

## 项目原则

1. Local-first。
2. SQLite 存 metadata，大媒体放文件系统。
3. Domain Core 不依赖 UI、FastAPI、ComfyUI 或具体模型。
4. 外部服务通过 Adapter 接入。
5. Token / Secret 不写入 Creation Pack。
6. 原型与正式代码分离。

## 下一阶段

V0.3 后续优先补齐：

1. Template Editor
2. 媒体导入与缩略图
3. Creation Asset 版本点
4. Workflow Graph CRUD
5. ComfyUI 本地连接与 Run Record
6. `.creationpack` 导入导出

详见 `docs/product/ROADMAP.md` 与 `docs/product/PRD.md`。
