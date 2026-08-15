# ADR-0001 — Local-first 是默认架构

- Status: Accepted

## Context
用户将保存大量 Prompt、人物参考、图片、视频和工作流，其中可能包含私人或高容量素材。浏览器 LocalStorage 无法承担正式资产管理。

## Decision
核心产品无账号可用；元数据放 SQLite，大媒体放本地文件系统。云同步和社区是可选层。

## Consequences
+ 隐私与容量更可控。  
+ 离线可用。  
+ 更适合 ComfyUI。  
- 需要处理本地安装、迁移、备份和路径问题。  
- 多端同步后续复杂度更高。
