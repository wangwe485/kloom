---
type: reference
title: kloom · Claude Code Plugin
description: kloom——一个会自己维护的知识库，打包为 Claude Code plugin。/kloom:init-wiki 任意主题开箱即用。
okf_version: "0.1"
tags: [reference, plugin, kloom]
timestamp: 2026-06-26T00:00:00Z
---

# kloom

> _Weave your knowledge_ —— 把 raw 资料自动织成有组织、可追溯、带生命周期的知识图谱。

一个会自己维护的知识库，打包为 **Claude Code plugin**。基于 OKF v0.1 + 卡帕西 LLM Wiki + v2 生命周期。
完整介绍见 [PROMO.md](PROMO.md)。

## 安装

```bash
# 方式 1：从 marketplace（内部分发推荐）
claude plugin marketplace add <本仓库 git 地址或本地路径>
claude plugin install kloom

# 方式 2：本地开发/试用
claude --plugin-dir <本地 kloom 仓库路径>
```

## 命令

| 命令 | 用途 |
|---|---|
| `/kloom:init-wiki <新路径> <主题>` | 从模板生成新 wiki（agent 按主题定制领域 type） |
| `/kloom:ask-wiki <问题>` | 查询 wiki |
| `/kloom:add-source <raw路径>` | ingest 新资料 |
| `/kloom:update-raw <raw路径>` | 处理 raw 更新（增量 re-ingest） |
| `/kloom:sync-raw [文件]` | 建/刷新 raw_hash 基线、检测 drift |
| `/kloom:wiki-status` | 显示 wiki 当前状态 |

## 3 步上手

```bash
# 1. 任意目录生成新 wiki（agent 按主题定制领域 type）
/kloom:init-wiki ~/my-wiki 客户CRM

# 2. Obsidian 打开 ~/my-wiki + 配 Claude Code（见生成的 SETUP.md）

# 3. 喂资料，LLM 自动建知识图谱
/kloom:add-source raw/articles/xxx.md
```

生成的 wiki **自带**：三层架构、`CLAUDE.md` schema、页面模板、SessionStart hook（自动注入状态简报）、OKF 合规。

## 结构

```
kloom/
├── .claude-plugin/plugin.json   manifest（name: kloom）
├── commands/                     6 个 slash 命令 → /kloom:*
├── templates/                    生成 wiki 时复制的全部文件（${CLAUDE_PLUGIN_ROOT}/templates）
└── marketplace.json              内部分发清单
```

## 更多

- 完整介绍：[PROMO.md](PROMO.md)
- 搭建细节：生成 wiki 后看其 `SETUP.md`
- 方法论出处：见 PROMO.md 底部
