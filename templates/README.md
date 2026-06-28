---
type: reference
title: kloom（通用模板）
description: OKF v0.1 + 卡帕西 LLM Wiki（v2）通用模板。/init-wiki 或 clone 实例化成任意主题的知识库。
okf_version: "0.1"
tags: [reference, okf, llm-wiki, template]
timestamp: 2026-06-25T00:00:00Z
---

# kloom（通用模板）

一个**主题无关**、由 LLM 维护的个人知识库模板。双重身份：

- **OKF v0.1 合规 bundle** —— 可被 Google Knowledge Catalog、OKF visualizer 及任何 OKF 工具消费。
- **卡帕西 LLM Wiki（含 v2 扩展）** —— 三层架构 + 三操作 + 记忆生命周期 + 类型化关系 + raw 更新处理。

实例化成任意主题：金融研究、医疗合规、客户 CRM、技术工程……

## 三层架构

| 层 | 目录 | 谁写 | 性质 |
|---|---|---|---|
| Raw sources | `raw/` | 人类（收集） | 不可变（对 agent），真相来源 |
| The wiki | `wiki/` | LLM（专属） | 人类只读 |
| The schema | `CLAUDE.md` | 人 + LLM 共同演进 | 维护纪律 |

核心边界：`raw/` 只往里丢、永不改（agent 视角）；`wiki/` 只用眼看、不用手写。

## 开始使用

本 wiki 已由 `/kloom:init-wiki` 生成。详见 [SETUP.md](SETUP.md)（约 15 分钟）。三步：

1. **打开**：Obsidian → `Open folder as vault` → 选本目录（OKF 合规默认值已写入 `.obsidian/`）。
2. **启动 agent**：`cd <本目录> && claude`（自动读 `CLAUDE.md`，进入维护者角色）。
3. **首次 ingest**：`/kloom:add-source raw/articles/xxx.md` 开始摄取。

## 内置命令

| 命令 | 用途 |
|---|---|
| `/kloom:ask-wiki <问题>` | 查询知识库 |
| `/kloom:add-source <raw路径>` | ingest 新增源文件 |
| `/kloom:update-raw <raw路径>` | 处理 raw 更新（增量 re-ingest） |
| `/kloom:sync-raw [文件]` | 建/刷新 raw_hash 基线、检测 drift |
| `/kloom:wiki-status` | 显示 wiki 当前状态 |

> 这些命令由 kloom 插件提供（`claude plugin install kloom`），在任意已安装会话中以 `/kloom:` 前缀可用。

## OKF 合规要点

- 每个 `.md` 都有 YAML frontmatter 且含非空 `type`（合规唯一硬要求）。
- 链接用标准 markdown（bundle-relative 绝对路径优先），不用 `[[ ]]`。
- 根 `index.md` 声明 `okf_version: "0.1"`；断链被容忍。

## 来源

- 模式定义：[Karpathy — LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- v2 扩展：[LLM Wiki v2（rohitg00）](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
- 格式规范：[OKF v0.1 SPEC](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
