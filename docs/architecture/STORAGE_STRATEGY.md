# 本地存储策略

## 默认目录

```text
PromptStudioData/
├── prompt-studio.sqlite3
├── assets/
│   └── <asset-id>/
│       ├── refs/
│       ├── outputs/
│       ├── thumbnails/
│       └── attachments/
├── templates/
├── workflows/
├── cache/
├── exports/
└── backups/
```

## 原则
- SQLite 保存元数据、关系、搜索索引和小型 JSON。
- 图片/视频/音频保持为普通文件。
- DB 中保存相对于数据根目录的路径，避免 Windows 盘符变化导致失效。
- 导入媒体时可选择“复制到受管目录”或“外部引用”；V0.3 默认复制，更安全。
- Thumbnail 与 Cache 可重建，不进入核心备份强依赖。
- 用户数据目录永远不提交 Git。

## 备份
备份应包含 DB + assets + templates + workflows；写入前先 SQLite checkpoint，再创建一致性快照。
