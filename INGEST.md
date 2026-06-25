---
type: playbook
title: Ingest 操作手册
description: 批量摄取 raw/ 资料进 wiki 的标准流程与可粘贴指令（.md / PDF / PPT 三阶段）。
tags: [playbook, ingest, okf, llm-wiki]
timestamp: 2026-06-25T00:00:00Z
---

# Ingest 操作手册

拿一批新 `raw/` 资料、要批量进 wiki 时用本手册。
Claude Code 启动后自动读 `CLAUDE.md`；本手册只补充**批量场景**的 specifics（顺序、去重、checkpoint、PDF/PPT 处理）。

## 0. 开始前必读

- `CLAUDE.md` —— 维护纪律（三层架构、三操作、v2 字段、OKF 合规）
- `wiki/index.md` —— **已有哪些实体/概念**；后续 ingest **优先巩固这些页，避免重复建**
- `log.md` 末尾几条 —— 最近做了什么、有无 supersession / 待确认项

## 预检：raw 更新处理（re-ingest）

每次开工先检测 `raw/` 是否被人改过（修正 / 补充 / 删除）。机制：source 页 frontmatter 的
`raw_hash`（`git hash-object` 值）对比当前值，不一致 = 该 raw 被改。详见 CLAUDE.md §8。

可粘贴指令：

```
任务：检测 raw/ 人工更新并 re-ingest。开工前读 CLAUDE.md、wiki/index.md、log.md。

1. 找出变化的 raw：
   - git status --porcelain -- raw/   看 working tree 改动
   - 对每个 source 页，对比 frontmatter 的 raw_hash 与当前值：
       当前: git hash-object <ingested_from 指向的 raw>
       记录: 该 source 页的 raw_hash
     不一致 → 该 raw 已更新。缺 raw_hash 字段的旧页视为"版本未知"，补填当前 hash（不误判）。

2. 标记受影响页：变化的 raw → 对应 source 页 → 巩固过它的 entity/concept（按 relations/sources 反查）；
   标 status: stale，confidence 暂降 0.1。

3. 增量 re-ingest（只处理变化的 raw），按变化类型：
   · 新增信息   → source 补摘要；entity/concept 补内容 + last_confirmed 更新（source_count 不增）
   · 修正/矛盾 → 按 CLAUDE.md §6 supersession，不静默改写；严重矛盾等我裁决
   · 删除信息   → 对应主张标 stale，注明"源已移除该段"
   · 文件增删移 → 更新 ingested_from；删除则 source 标 status: archived
   处理完：更新 source 的 raw_hash（=新值）+ last_confirmed，相关页 status 回 active，confidence 重算。

4. log.md 记一条：`* **Re-ingest**: <raw文件> 人工更新 → 影响 N 页，<有无 supersession>`

5. 汇总：哪些 raw 变了、影响哪些页、有哪些需我裁决的矛盾。
```

## 1. 通用 ingest 流程（任何批次）

三步：

1. **计划**（先别写页）：通读全部待 ingest 文件，产出 (a) 实体清单+type (b) 概念清单
   (c) 跨篇共享项（只建一次，多篇都 link）(d) 预计 synthesis 页。**给用户确认**再执行。
2. **执行**：按「框架 → 具体 → 对比 → 细节」顺序逐篇 ingest。每篇：
   源文件加 OKF frontmatter → 写 `source` 摘要页 → 巩固/新建 `entity`/`concept` 页
   → 补 v2 字段（confidence/source_count/last_confirmed/status）与 `relations`
   → 更新 `wiki/index.md` + 根 `log.md`。
3. **跨篇 lint**：查重复实体（同一公司多叫法）、矛盾、孤儿页、断链；
   矛盾标 `superseded` 或等用户裁决，**不要静默改写**。

## 2. 阶段 1：`.md` 资料（纯文本）—— 可粘贴指令

```
任务：批量 ingest raw/articles/ 下的资料，建立知识图谱。
开工前先读 CLAUDE.md、wiki/index.md（看已有实体/概念）、log.md 末尾几条。

== 第 1 步：通读 + ingest 计划（不急着写页）==
通读 raw/articles/ 下待 ingest 的文件（大文件分段读），列出：
  (a) 实体清单 + type
  (b) 概念清单
  (c) 跨篇共享项（哪些已在 wiki/index.md 存在——这些只巩固，不重建）
  (d) 预计 synthesis 页
给我确认后再执行。

== 第 2 步：逐篇 ingest（框架→具体→对比→细节）==
按 wiki/index.md 已有页判断：命中已有实体/概念 → source_count+1、last_confirmed 更新、confidence 上调；
确为新知识 → 新建页。每篇：
  - 给 raw 源文件顶部加 frontmatter（只加元数据，正文不动）：
      ---
      type: source-material
      title: <标题>
      timestamp: <今日 ISO 8601>
      ---
  - 在 wiki/sources/ 写 type: source 摘要页（用 _templates/source.md），frontmatter 含 v2：
      confidence / source_count / last_confirmed / status: active
      / ingested_from / raw_hash(=git hash-object 当前值)
      / relations（指向触及的实体/概念，bundle-relative 绝对路径，优先强谓词）
  - 巩固/新建 wiki/entities/、wiki/concepts/ 页（用 _templates）；补 relations（强谓词，见 CLAUDE.md §7）
  - 更新 wiki/index.md（各分类加条目）与根 log.md（每篇一条 `* **Ingest**: ...`）
  - 每篇结束一句话简报：新建/巩固了哪些页、confidence 变化、有无矛盾

== 第 3 步：跨篇 lint ==
查重复实体（同一对象多叫法）、跨篇矛盾、孤儿页、断链。矛盾标 superseded 或等我裁决。

硬约束（CLAUDE.md 复述防漂移）：
  · OKF：每个 .md 非空 type；正文链接标准 markdown /wiki/...，不用 [[ ]]
  · v2：每页 frontmatter 带 confidence/source_count/last_confirmed/status/relations
  · raw：只加 frontmatter，不改正文
  · 需新 type（领域专属）直接用，并在 log 说明

完成后汇总：新建/巩固各多少页、wiki 总页数、index.md 与 log.md 状态。
```

## 3. 阶段 2：PDF（分页读取）—— 可粘贴指令

```
继续 ingest raw/papers/ 下的 PDF。先对每个用 Read 看 pages="1-3" 探明总页数与目录，
再按章节分批读（单次最多 20 页）；大书按章节拆成多个 source 页。
扫描件若 Read 取不到文本，提示需 OCR。其余流程同阶段 1（巩固优先 + v2 字段 + relations）。
```

## 4. 阶段 3：PPT（先转换）—— 可粘贴指令

`.ppt` Read 不直接支持，先转 PDF：

```
先转换 raw/papers/xxx.ppt：
  soffice --headless --convert-to pdf --outdir raw/papers "raw/papers/xxx.ppt"
若本机没装 LibreOffice，改用 python-pptx 抽文本，或提示手动转。转成 PDF 后按阶段 2 流程 ingest。
```

## 5. 当前批次进度

> 实例化后在此记录本批资料的 ingest 进度（文件 / 状态）。模板此处留空。
