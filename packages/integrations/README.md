# Integrations

第三方集成边界。

V0.3 实际运行时 Adapter 先放在 `apps/api/prompt_studio_api/integrations/`，等接口稳定后再评估是否拆成独立 Python package。

当前：
- `GenerationAdapter` Protocol
- `ComfyUIAdapter` contract placeholder

规则：第三方 Payload、鉴权、SDK、网络重试逻辑不得进入 `packages/core`。
