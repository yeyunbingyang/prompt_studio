# 测试计划

## Unit
- Prompt composition
- Template validation
- Pack manifest validation
- Path normalization
- Migration functions

## Integration
- SQLite repository
- Media import / thumbnail
- Search index
- Import/export round trip
- ComfyUI Adapter mock

## E2E
1. 新建图片 Asset → 保存 → 重启 → 搜索 → 再编辑。
2. 创建模板 → Builder 使用 → 导出 → 新环境导入。
3. 视频 Asset 添加参考图和输出视频。
4. Fork Asset，源对象保持不变。
5. 备份 → 删除本地数据 → 恢复。

## 性能基线
建立 10k Asset + 100k tag/link 的合成库，验证搜索、列表和启动时间。
