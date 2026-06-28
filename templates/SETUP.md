---
type: playbook
title: 配置你的 kloom 知识库
description: 你的 wiki 已由 /kloom:init-wiki 生成。本手册带你配好 Obsidian + Claude Code 并完成首次 ingest（约 15 分钟）。
tags: [playbook, setup]
timestamp: 2026-06-25T00:00:00Z
---

# 配置你的 kloom 知识库（约 15 分钟）

你的 wiki 已经由 `/kloom:init-wiki` 生成好了：三层架构、`CLAUDE.md` schema、页面模板、
SessionStart hook、领域 type 都已就位。下面把它接上工具链。

> 下文 `<你的 wiki 路径>` 指本目录（生成时你传给 `/kloom:init-wiki` 的路径）。

## 1. Obsidian 打开 vault（10 分钟）

- 下载 [obsidian.md](https://obsidian.md) 并安装
- `Open folder as vault` → 选 `<你的 wiki 路径>`
- Settings → Files and links（**OKF 合规默认值已由 `/kloom:init-wiki` 写入 `.obsidian/app.json`**，
  打开后确认一下即可）：
  - `Use [[Wikilinks]]` **关闭**（改用标准 markdown 链接，OKF 合规）
  - `New link format` → `Absolute path in vault`
  - `Attachment folder path` → `raw/assets`
- 装浏览器扩展 **Obsidian Web Clipper**，剪藏目标设为 `raw/articles/`

## 2. 启动 Claude Code（2 分钟）

需先装 Node.js 与 kloom 插件，然后：

```bash
cd <你的 wiki 路径>
claude
```

它会自动读 `CLAUDE.md`，进入 wiki 维护者角色；SessionStart hook 会注入状态简报。

## 3. 首次 ingest（5 分钟）

- 用 Web Clipper 剪一篇文章到 `raw/articles/`（或把已有资料拷进去）
- 在 Claude Code 里：

  ```
  /kloom:add-source raw/articles/xxx.md
  ```

  或按 `INGEST.md` 批量摄取
- 观察 `wiki/sources/` 生成摘要页、`entities/`/`concepts/` 巩固或新建

## 4. 日常运维

| 动作 | 命令 |
|---|---|
| 查询 | `/kloom:ask-wiki <问题>` |
| 新增资料 | `/kloom:add-source <raw路径>` |
| 更新资料 | `/kloom:update-raw <raw路径>` |
| 建基线/检测 drift | `/kloom:sync-raw` |
| 查看状态 | `/kloom:wiki-status` |
| 体检 | 对 agent 说 `lint` |
| OKF 合规自检 | `node .claude/hooks/lib/conformance.mjs` |
