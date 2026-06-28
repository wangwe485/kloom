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

## 安装与更新

### 方式 A：从 GitHub marketplace（推荐，给使用者）

```bash
# 安装
claude plugin marketplace add wangwe485/kloom
claude plugin install kloom@kloom-marketplace

# 更新（两步缺一不可：先刷缓存，再应用）
claude plugin marketplace update kloom-marketplace   # 从 GitHub 拉最新提交到本地缓存
claude plugin update kloom                            # 应用新版（提示 restart 后重启会话生效）
```

### 方式 B：本地文件夹（给开发 / 试用 / 离线）

```bash
# 安装：挂载本地仓库，仅当前会话有效
git clone git@github.com:wangwe485/kloom.git   # 或直接把整个 kloom 文件夹拷到本地
claude --plugin-dir <本地 kloom 路径>

# 更新
cd <本地 kloom 路径> && git pull                 # clone 来的用 pull；直接拷的则重新覆盖文件夹
# 退出并重启 claude 会话即生效（--plugin-dir 每次启动都重新读取，无需 plugin update）
```

> 两种方式的命令前缀都是 `/kloom:`；版本号见 [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json)，发布点见 git tag `kloom--v*`。

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
├── .claude-plugin/
│   ├── plugin.json              manifest（name: kloom）
│   └── marketplace.json         分发清单（Claude Code 要求置于此目录）
├── commands/                    6 个 slash 命令 → /kloom:*
└── templates/                   生成 wiki 时复制的全部文件（${CLAUDE_PLUGIN_ROOT}/templates）
```

## 更多

- 完整介绍：[PROMO.md](PROMO.md)
- 搭建细节：生成 wiki 后看其 `SETUP.md`
- 方法论出处：见 PROMO.md 底部
