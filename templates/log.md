---
type: changelog
title: 更新日志
description: OKF §7 格式的 ingest/query/lint 时间线。
timestamp: 2026-06-25T00:00:00Z
---

# kloom — 更新日志

> OKF §7 格式：日期分组（ISO 8601 `YYYY-MM-DD`），新到旧；条目以 `**动词**` 开头。

## 2026-06-26

* **Lint**: 修复模板自带的 OKF conformance 疏漏 —— 根 `index.md` 补 `type: index`（原 frontmatter 仅 `okf_version`）、`log.md` 补最小 frontmatter `type: changelog`（原无 frontmatter）。源自 `test-wiki`（客户 CRM）实例首次 lint 发现并回填。

## 2026-06-25

* **Initialization**: 创建通用模板 `kloom`（OKF v0.1 + 卡帕西 LLM Wiki v2）。实例化时由 `/init-wiki` 填入主题与领域 type。
