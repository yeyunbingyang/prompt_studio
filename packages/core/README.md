# @prompt-studio/core

UI 与第三方无关的领域层。

当前包含：

- Creation Asset / Prompt Variant / Template TypeScript 类型
- Prompt Fragment composer
- Core tests

约束：

- 不 import React。
- 不 import FastAPI / ComfyUI / 模型 SDK。
- 不直接读写 SQLite 或文件系统。
- 可被 Web、未来桌面壳和测试复用。
