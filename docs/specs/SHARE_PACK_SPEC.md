# Creation Pack / Share Pack Spec v0.1

## 建议扩展名
临时使用：`.aipack.zip`。最终扩展名在 V0.5 决定。

## 目录

```text
pack.zip
├── manifest.json
├── asset.json
├── prompts/
├── templates/
├── workflows/
├── refs/          # 可选
├── examples/      # 可选
└── thumbnails/
```

## manifest 必须包含
- packVersion
- exportedAt
- appVersion
- rootAssetId
- dependencies
- includedMedia
- checksums

## 安全过滤
永不导出：
- API keys / tokens
- cookies
- 本机用户名
- 绝对私有路径
- `.env`
- 第三方服务 secrets

导入时必须先预览文件清单，再允许安装/Fork。
