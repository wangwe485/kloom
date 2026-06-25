---
okf_version: "0.1"
---

# {{Wiki 名称}}

OKF v0.1 合规 bundle + 卡帕西 LLM Wiki（v2）。用 Web Clipper 收集原始资料到 `raw/`，由 LLM 维护 `wiki/`。

## 入口

* [Agent Schema (CLAUDE.md)](CLAUDE.md) - agent 维护规则：三层架构、页面类型、三操作
* [Wiki 内容目录](wiki/index.md) - 实体 / 概念 / 综合页总览（LLM 查询入口）
* [更新日志](log.md) - ingest / query / lint 时间线
* [搭建手册](SETUP.md) - 从零搭建步骤
* [Ingest 手册](INGEST.md) - 批量摄取流程

## 目录

* [raw/](raw/) - 原始资料（不可变，真相来源）
* [wiki/](wiki/) - LLM 维护的概念文档（人类只读）
  * [entities/](wiki/entities/) - 领域实体（实例化时定义类型）
  * [concepts/](wiki/concepts/) - 抽象概念
  * [sources/](wiki/sources/) - 原始资料摘要页
  * [synthesis/](wiki/synthesis/) - 综合 / 对比
  * [_templates/](wiki/_templates/) - 页面模板

## 如何使用

1. 实例化：`/init-wiki <本路径> <主题>`（或手动 clone 模板，见 SETUP.md）。
2. Obsidian 打开本目录为 vault（关闭 `[[Wikilinks]]`，附件目录设 `raw/assets`）。
3. `cd <本路径> && claude`，然后 `/add-source raw/articles/xxx.md` 开始 ingest。
