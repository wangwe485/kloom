---
type: playbook
title: 从零搭建一个 kloom 知识库
description: 从本模板实例化一个新 LLM Wiki 的完整步骤（约 30 分钟）。
tags: [playbook, setup]
timestamp: 2026-06-25T00:00:00Z
---

# 从零搭建一个 kloom 知识库（约 30 分钟）

前提：本模板已在 `E:\ai\kloom`（或你 clone 的位置）。

## 1. 实例化（5 分钟，二选一）

**A. 用 `/init-wiki` 命令（推荐，智能定制）**

把 `.claude/commands/init-wiki.md` 复制到全局命令目录（任意目录都能调）：

```bash
cp /e/ai/kloom/.claude/commands/init-wiki.md ~/.claude/commands/
```

然后在任意目录启动 `claude`，运行：

```
/init-wiki E:\ai\my-new-wiki <主题描述，如"医疗合规">
```

agent 会：复制模板 → 按主题生成领域 type → 改 `CLAUDE.md §2`/示例 → `git init`。

**B. 手动复制 + 改**

```bash
cp -r /e/ai/kloom /e/ai/my-new-wiki
rm -rf /e/ai/my-new-wiki/.git
cd /e/ai/my-new-wiki && git init -q && git branch -M main
```

然后手动改 `CLAUDE.md §2`（填领域 type）、§4 示例、`README.md`/`index.md` 主题描述。

## 2. 装 Obsidian 并打开 vault（10 分钟）

- 下载 [obsidian.md](https://obsidian.md) 并安装
- `Open folder as vault` → 选新 wiki 目录
- Settings → Files and links：
  - **关闭** `Use [[Wikilinks]]`（改用标准 markdown 链接，OKF 合规）
  - `Attachment folder path` → `raw/assets`
- 装浏览器扩展 **Obsidian Web Clipper**，剪藏目标设为 `raw/articles/`

## 3. 装 Claude Code（3 分钟）

需先装 Node.js，然后：

```bash
npm install -g @anthropic-ai/claude-code
cd /e/ai/my-new-wiki
claude
```

它会自动读 `CLAUDE.md`，进入 wiki 维护者角色。

## 4. 首次 commit（2 分钟）

若 `/init-wiki` 没自动提交：

```bash
git add -A && git commit -m "init <主题> wiki"
```

## 5. 首次 ingest（10 分钟）

- 用 Web Clipper 剪一篇文章到 `raw/articles/`
- 在 Claude Code 里：
  ```
  /add-source raw/articles/xxx.md
  ```
  或按 `INGEST.md` 阶段 1 批量
- 观察 `wiki/sources/` 生成摘要页、`entities/`/`concepts/` 巩固或新建

## 6. 日常运维

| 动作 | 命令 |
|---|---|
| 查询 | `/ask-wiki <问题>` |
| 新增资料 | `/add-source <raw路径>` |
| 更新资料 | `/update-raw <raw路径>` |
| 建基线/检测 drift | `/sync-raw` |
| 体检 | 对 agent 说 `lint` |
