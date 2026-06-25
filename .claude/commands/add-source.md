---
description: ingest 一个新增的源文件（全量建页）
argument-hint: <raw 文件路径>
---
我**新增**了一个源文件：`$ARGUMENTS`。按 CLAUDE.md §5 + INGEST.md 阶段 1 ingest：

1. 先读 `wiki/index.md`，列出它涉及哪些**已有**实体/概念（将巩固）+ 哪些是**新的**（将新建）。给我计划，确认后再执行。
2. 确认后：
   - 给该 raw 加 frontmatter（`type: source-material` + `title` + `timestamp`），正文不动
   - 在 `wiki/sources/` 建新 source 页（含 `ingested_from` + `raw_hash` = 当前 `git hash-object` + v2 字段）
   - 巩固已有 entity/concept（`source_count` +1、`last_confirmed`、`confidence` 上调）+ 新建缺失的
   - 补 `relations`（强谓词，见 CLAUDE.md §7）；更新 `wiki/index.md` + 根 `log.md`

汇总：新建 / 巩固各多少页、wiki 总页数。
