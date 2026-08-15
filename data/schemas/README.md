# JSON Schemas

V0.3 交换格式源：

- `creation-asset.schema.json`
- `template.schema.json`
- `workflow.schema.json`
- `share-pack.schema.json`

原则：数据库结构可以演进，但导入/导出必须通过显式 `schema_version` / `pack_version` 做兼容处理。
