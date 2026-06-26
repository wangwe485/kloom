---
description: 处理某个 raw 文件的人工更新（增量 re-ingest）
argument-hint: <raw 文件路径>
---
我更新了一个**已 ingest** 的 raw：`$ARGUMENTS`。按 CLAUDE.md §8 处理：

1. 找到 `ingested_from` 指向该 raw 的 source 页；对比其 `raw_hash` 与当前 `git hash-object`，确认变化。
   - 若该 source 页缺 `raw_hash` → 提示我先 `/sync-raw` 建基线，否则无法检测本次变化。
2. 读更新后的 raw，diff 出变化（新增 / 修正 / 删除了什么）。
3. 增量 re-ingest，按变化类型：
   - 新增信息  → source 页补摘要；相关 entity/concept 补内容 + `last_confirmed`（**source_count 不增**，同来源修订）
   - 修正/矛盾 → 按 §6 supersession，**不静默改写**，严重矛盾等我裁决
   - 删除信息  → 对应主张标 stale，注明"源已移除该段"
4. 更新 source 页 `raw_hash`（= 新值）+ `last_confirmed`；受影响页 `status` 回 active、`confidence` 重算。
5. log.md 记一条 `* **Re-ingest**: <raw> 人工更新 → 影响 N 页，<有无 supersession>`。

汇总：变了什么、影响哪些页、有无需我裁决的矛盾。
