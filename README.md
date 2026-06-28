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

> 更新命令统一用**限定名** `kloom@kloom-marketplace`（裸 `kloom` 在部分版本会报 "not found"）。

### 安装（三选一）

**方式 A — GitHub marketplace（推荐）**

```bash
claude plugin marketplace add wangwe485/kloom
claude plugin install kloom@kloom-marketplace
```

**方式 B — 本地目录持久安装（离线 / 内网；装上后跨会话保留）**

```bash
git clone git@github.com:wangwe485/kloom.git    # 或直接把整个 kloom 文件夹拷到本地
claude plugin marketplace add <本地 kloom 路径>   # 把本地目录当 marketplace
claude plugin install kloom@kloom-marketplace
```

**方式 C — `--plugin-dir`（仅当前会话，开发 / 临时试用）**

```bash
claude --plugin-dir <本地 kloom 路径>             # 不写入配置，退出即失效
```

### 更新

**方式 A / B（marketplace 安装）** —— 两步缺一不可：先刷源，再应用：

```bash
claude plugin marketplace update kloom-marketplace      # A 从 GitHub 拉、B 重读本地目录
claude plugin update kloom@kloom-marketplace            # 应用新版（提示 restart 后重启会话生效）
```

> 方式 B 若是 `git clone` 来的，先 `cd <本地 kloom 路径> && git pull` 拉到最新，再跑上面两步。

**方式 C（`--plugin-dir`）** —— 改文件后**退出并重启会话**即生效，无需 `plugin update`。

> 命令前缀均为 `/kloom:`；版本号见 [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json)，发布点见 git tag `kloom--v*`。

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
