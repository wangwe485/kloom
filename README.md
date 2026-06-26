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

## 快速开始

详见 [SETUP.md](SETUP.md)（从零搭建，约 30 分钟）。最简三步：

1. **实例化**：`/init-wiki <新路径> <主题>`（推荐，按主题智能生成领域 type）
   或 `git clone` 本模板后手动改 `CLAUDE.md §2`。
2. **打开**：Obsidian → `Open folder as vault` → 选新 wiki 目录。
3. **启动 agent**：`cd <新 wiki> && claude`，然后 `/add-source raw/articles/xxx.md` 开始 ingest。

## 内置命令

| 命令 | 用途 |
|---|---|
| `/ask-wiki <问题>` | 查询知识库 |
| `/add-source <raw路径>` | ingest 新增源文件 |
| `/update-raw <raw路径>` | 处理 raw 更新（增量 re-ingest） |
| `/sync-raw [文件]` | 建/刷新 raw_hash 基线、检测 drift |

> `/init-wiki` 是元命令（从本模板生成新 wiki），使用前需复制到全局 `~/.claude/commands/`，见 SETUP.md。

## OKF 合规要点

- 每个 `.md` 都有 YAML frontmatter 且含非空 `type`（合规唯一硬要求）。
- 链接用标准 markdown（bundle-relative 绝对路径优先），不用 `[[ ]]`。
- 根 `index.md` 声明 `okf_version: "0.1"`；断链被容忍。

## 来源

- 模式定义：[Karpathy — LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- v2 扩展：[LLM Wiki v2（rohitg00）](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
- 格式规范：[OKF v0.1 SPEC](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
