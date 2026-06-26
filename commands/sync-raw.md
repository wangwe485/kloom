---
description: 给 source 页补 ingested_from + raw_hash 基线（建基线 / 检测 raw drift）
argument-hint: [可选：单个 source 页或 raw 文件]
---
按 CLAUDE.md §8 给 source 页建立 / 刷新 `raw_hash` 基线。

处理范围：wiki/sources/ 下每个 source 页（若 `$ARGUMENTS` 指定了某个文件，只处理它）。对每个：

1. 确定对应的 raw 路径（正文"对应原始资料"链接 / 现有 `ingested_from` / 标题），写入 frontmatter 的 `ingested_from`
2. 运行 `git hash-object <raw 路径>`，得到当前值
3. 若该页**已有** `raw_hash` 且与当前值不同 → 报告 **drift**（该 raw 被人改过，建议改走 `/update-raw`）
4. 若该页**没有** `raw_hash` → 写入当前值作为基线

不改 raw、不改 source 正文，只动这两个 frontmatter 字段。

完成后报告：处理了哪些页、各自的 `ingested_from` 与 hash 前 8 位、检测到几个 drift。
