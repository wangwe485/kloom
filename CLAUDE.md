---
type: schema
title: LLM Wiki — Agent Schema（通用模板）
description: OKF v0.1 合规 + 卡帕西 LLM Wiki（v2 生命周期、类型化关系、raw 更新处理）的维护规则。通用模板，实例化时按主题定制 §2。
okf_version: "0.1"
tags: [schema, okf, llm-wiki, template]
timestamp: 2026-06-25T00:00:00Z
---

# LLM Wiki — Agent Schema

本仓库同时是一个 **OKF v0.1 合规 bundle** 和一个 **卡帕西 LLM Wiki**，
并吸收了 **LLM Wiki v2**（社区扩展）的三层高价值增量：
**记忆生命周期**、**类型化关系**、**raw 更新处理**。

> 这是**通用模板**。实例化（`/init-wiki`）时，§2「领域 type」会按你的主题生成；
> 其余规则主题无关，原样适用。

你是这个 wiki 的维护者。下面是你必须遵守的规则。

> 一句话定位：Obsidian 是 IDE；你是程序员；wiki 是代码库。
> raw/ 是真相来源；wiki/ 是你的产物；本文件是纪律。

## 0. 双重身份 + v2 增量

- **OKF 合规**：每个 `.md` 必须有可解析 YAML frontmatter 且含非空 `type`。
  断链被容忍（= 尚未写的知识）。链接用标准 markdown（见 §3）。
- **卡帕西 LLM Wiki**：三层架构 + 三操作 + schema 驱动（§1、§5）。
- **v2 增量**：知识有生命周期 —— 用 `confidence`/`status`/`superseded_by`（§6）
  和类型化 `relations`（§7）；raw 被人改后走 re-ingest 同步（§8）。

## 1. 三层架构（不可违反）

- `raw/` — 原始资料，**对 agent 只读**（你不改正文）；人类可改（修正/补充/更新），
  改后走 §8 re-ingest。真相来源。
  - `raw/articles/` — 剪藏的文章、调研报告
  - `raw/papers/` — 白皮书 / 论文 / 书籍 PDF、PPT
  - `raw/notes/` — 人类手写笔记、记录
  - `raw/assets/` — 图片等附件
- `raw/` 的 OKF 合规：raw/ 里的 `.md` 资料文件也应带最小 frontmatter
  `type: source-material`，由 ingest / Web Clipper 流程添加 —— **只加元数据，正文保持原样**。
  非 markdown 文件（PDF / 图片）不受 OKF 约束。
- `wiki/` — 你完全拥有。**只有你能创建和修改**这里的 concept 文档。人类只读。
- `CLAUDE.md`（本文件）— 规则，你和人类共同演进。

## 2. 页面类型（`type` 值）

OKF 不注册 type、consumer 要容忍未知 type。本 wiki 的 type 分两层：

**通用 type（所有 wiki 都有，主题无关）**：

- `concept` — 抽象概念 / 理论 / 方法 / 术语
- `source` — 原始资料的摘要页（每个 `raw/` 资料 ↔ 一个 source 页）
- `synthesis` — 综合 / 对比 / 分析（跨多个 source/entity/concept）
- `playbook` — 操作手册 / 教程 / 流程（反复验证的工作流）
- `schema` — 规则文档（本文件）
- `index` — 目录文件（`wiki/index.md`）

**领域 type（本 wiki 主题专属，`/init-wiki` 时生成）**：

> 实例化时由 agent 根据主题生成实体类型，填入下方。下面是跨领域示例，**实例化时替换**：
> - 金融 / Web3：`protocol` / `project` / `person` / `token` / `organization`
> - 医疗合规：`regulation` / `hospital` / `device` / `drug-trial` / `authority`
> - 客户 / CRM：`customer` / `account` / `contact` / `deal` / `interaction`
> - 技术 / 工程：`service` / `library` / `api` / `team` / `incident`

<!-- /init-wiki 在此插入本主题的领域 type 清单 -->

约定：type 用小写 kebab-case；需要新 type 直接用并在 `log.md` 说明。

## 3. 链接与引用（OKF 合规）

- **用标准 markdown 链接**，优先 bundle-relative 绝对路径：
  `[某概念](/wiki/concepts/xxx.md)`。
- **不要用** Obsidian 的 `[[ ]]` 双链 —— OKF consumer 无法解析，会变断链。
- 断链 OK（指向尚未创建的页面），代表待写知识，不要刻意删除。
- 引用原始资料或外部来源：页面底部 `# Citations` 区块，编号。

## 4. Frontmatter 约定

- **必填**：`type`
- **推荐（OKF）**：`title`、`description`、`resource`(规范 URI)、`tags`、`timestamp`(ISO 8601)
- **扩展（本 wiki）**：`sources`(引用的 raw 路径列表)、`aliases`、`created`
- **记忆生命周期（v2）**：`confidence`(0.0–1.0)、`last_confirmed`(ISO 8601)、
  `source_count`(整数)、`status`(`active`/`stale`/`superseded`)、
  `superseded_by`(被取代页路径)、`relations`(类型化关系，见 §7)
- **source 页特有（溯源）**：`ingested_from`(对应 raw 路径)、`raw_hash`
  (ingest 时 `git hash-object <raw>` 的值；lint 检测 raw 是否被改，见 §8)

示例（一个领域实体页，实例化后替换为你的主题内容）：

```
---
type: {{domain-type}}        # 如 protocol / regulation / customer ...
title: {{实体名}}
description: {{一句话}}
resource: {{规范 URI / 官网 / 合约地址}}
tags: []
aliases: []
timestamp: 2026-06-25T00:00:00Z
sources: [/raw/articles/xxx.md]
confidence: 0.85
last_confirmed: 2026-06-25T00:00:00Z
source_count: 3
status: active
superseded_by:
relations:
  - type: uses
    target: /wiki/concepts/xxx.md
    confidence: 0.9
---
```

## 5. 三个操作

### Ingest（摄取）
当我说"摄取 `<资料>`"时：
1. 读取 `raw/` 下该资料（文本优先；含图则先读文字再单独看关键图）。
2. 先和我讨论 3–5 个关键要点，确认重点。
3. 在 `wiki/sources/` 写 `type: source` 摘要页，填 `ingested_from` 与 `raw_hash`
   （`git hash-object <raw>` 当前值）。
4. 更新相关 entity / concept 页（一个资料通常触及 8–15 个页面）。
   每个被触及的页面：`source_count`+1、`last_confirmed` 更新、`confidence` 重算、补全 `relations`。
5. 更新 `wiki/index.md` 与根 `index.md`。
6. 在根 `log.md` 追加 OKF §7 格式条目。

### Query（查询）
1. 先读 `wiki/index.md` 定位相关页，再深入读取。
2. 给出带引用的答案（标注 wiki 页 / raw 文件）；**按 confidence 表态**（高置信项肯定，低置信项标不确定）。
3. "X 会影响什么"类问题 → 沿 `relations` 的 `depends-on`/`uses` 边遍历。
4. 有价值的答案 → 主动问我要不要存成新页回填。

### Lint（体检）
当我说"lint"时，检查并报告：
- 页面间矛盾、过时主张 → **按 §6 supersession 流程处理**
- `status: stale` 或 `last_confirmed` 过老的页面 → 标记或提示重新确认
- **raw 更新检测**：对比每个 source 页 `raw_hash` 与当前 `git hash-object`，
  不一致 → 该 raw 被人改过，按 §8 re-ingest
- 无入链的孤儿页、被提及但缺页的重要概念（断链）
- 缺失的交叉引用 / 未补全的 `relations`
- 可用网络搜索填补的数据缺口
- **OKF conformance**：知识层每个 `.md`（根知识文档 + `wiki/` + `raw/*.md`）是否有合法 frontmatter 与非空 `type`（合规硬要求）；`.claude/` 是工具配置，不计入

质量自愈（v2）：对每页打 0–1 `quality` 判断（结构 / 引源 / 一致性），<0.6 标记待修；
可自动修的（孤儿页补链、断链修复、stale 标记）直接修，修完记进 log。

## 6. 引用与知识生命周期（v2）

**溯源**：每个事实性主张要能在 `raw/` 追溯；LLM 综合不是真相，`raw/` 才是。

**置信度**：写/更新主张时打 `confidence`（0–1），随支持来源数、最近确认时间、是否被矛盾而定。
回答时可据 confidence 表态"对 X 较确定，对 Y 不确定"。

**Supersession（取代，核心）**：新信息与旧主张矛盾时——
1. **不要静默改写旧页**。
2. 新主张写入正确概念页：`source_count`+1、`last_confirmed` 更新。
3. 旧页 frontmatter 改 `status: superseded`，加 `superseded_by: /wiki/.../new.md`；
   正文顶部加横幅 `> ⚠️ 已被取代（YYYY-MM-DD），见 /wiki/.../new.md`，旧内容保留。
4. log.md 记一条 supersession 事件。
旧版不删、可追溯、显式标注 —— 知识的版本控制。

**遗忘（retention）**：久未访问/强化的页面 `confidence` 随时间衰减；
lint 时把 `last_confirmed` 过老的标 `status: stale`（降权，不删）。

**巩固层级（consolidation）** —— 映射到本 wiki 目录：
- 工作记忆 ≈ `raw/notes/`（原始观察，未加工）
- 情景记忆 ≈ `wiki/sources/`（单次会话/资料的摘要）
- 语义记忆 ≈ `wiki/concepts/` + `wiki/entities/`（跨资料沉淀的事实）
- 程序记忆 ≈ `type: playbook` 页（反复验证的工作流）
证据累积时沿 sources → concepts/entities → synthesis/playbook 向上提升
（更压缩、更高置信、更持久）。

**矛盾仲裁**：旧主张与新来源无法共存时，**主动提议**哪个更可能正确
（依据来源新近度、权威性、支持观察数），但默认**等我裁决**，除非 schema 明确授权自动 supersede。

## 7. 类型化关系（v2）

OKF §5.3 规定正文链接**无类型**；为合规，正文继续用标准 markdown 链接 `[text](/path.md)`。
**类型化关系**用 frontmatter `relations` 字段承载（OKF 允许任意扩展 key，合规）：

```
relations:
  - type: depends-on      # uses / depends-on / contradicts / caused / fixed / supersedes / related-to / part-of / competes-with / regulated-by
    target: /wiki/entities/xxx.md   # bundle-relative 绝对路径
    confidence: 0.9
    note: 
```

ingest / query / lint 时维护 `relations`：抽取实体间关系、补全缺失关系、发现矛盾时加
`type: contradicts` 边。"X 影响什么"类查询沿 `depends-on`/`uses` 边遍历，而非仅关键词搜索。

## 8. raw 更新处理（re-ingest）

**原则**：raw 对**agent**只读（你不改正文），但**人类**可改（修正 / 补充 / 更新 / 删除）。
人改 raw 是正常的，问题是让 wiki 跟上 —— 这正是 v2 生命周期 + git 的用武之地。

**版本追踪**：每个 source 页 frontmatter 记 `ingested_from`（对应 raw 路径）+ `raw_hash`
（ingest 时 `git hash-object <raw>` 的值）。lint / re-ingest 时重算当前 raw hash 与记录值对比，
不一致 = 该 raw 被改过。

**流程**（5 步）：
1. **检测**：`git status --porcelain -- raw/` + 对比每个 source 页 `raw_hash` 与当前 `git hash-object`。
2. **标记受影响页**：变化的 raw → 对应 source 页 → 巩固过它的 entity/concept（按 relations/sources 反查）；
   标 `status: stale`、confidence 暂降。
3. **增量 re-ingest**（只处理变化的 raw），按变化类型：
   - 新增信息 → source 补摘要、entity/concept 补内容、`last_confirmed` 更新（**source_count 不增**，同来源修订版）
   - 修正 / 矛盾 → 按 §6 supersession 流程，不静默改写，严重矛盾等裁决
   - 删除信息 → 对应主张标 stale 并注明"源已移除该段"
   - 文件重命名 / 移动 → 更新 `ingested_from`；文件删除 → source 标 `status: archived`
4. **传播**：处理完相关页 `status` 回 active，confidence 重算；更新 source 的 `raw_hash` + `last_confirmed`。
5. **记录**：log.md 记一条 `* **Re-ingest**: <raw> 人工更新 → 影响 N 页，<有无 supersession>`。

**缺字段兼容**：旧 source 页若没有 `raw_hash`，视为"版本未知"，re-ingest 时补填当前 hash（不误判为已改）。

## 9. 工作流备忘

- 我（人类）负责：收集资料（Web Clipper → raw/）、探索、问对的问题、修正 raw。
- 你（LLM）负责：总结、交叉引用、归档、记账、raw 更新后的同步 —— 一切让人放弃维护 wiki 的枯燥工作。
- 每次会话开始，先读本文件 + `wiki/index.md` + `log.md` 末尾若干条，了解当前状态。
