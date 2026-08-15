# Prompt Studio 文档中心

| 区域 | 说明 | 关键文档 |
|---|---|---|
| Product | 定义做什么、为谁做 | `product/PRD.md` |
| Architecture | 定义系统怎么实现 | `architecture/SYSTEM_ARCHITECTURE.md` |
| Specs | 定义核心对象交换规范 | `specs/CREATION_ASSET_SPEC.md` |
| Development | 定义如何协作、测试、发布 | `development/DEVELOPMENT_GUIDE.md` |
| Research | 保存竞品和外部参考 | `research/COMPETITOR_RESEARCH.md` |
| Decisions | 记录不可逆或高影响技术决策 | `decisions/` |

## 文档维护规则
1. 产品范围变化先更新 PRD，再改实现。
2. 数据结构变化必须同步 `DATA_MODEL.md` 和对应 Spec。
3. 重要架构决策新增 ADR，不直接覆盖历史判断。
4. 原型可以快速试错；进入 `apps/` 的功能必须有验收标准。
