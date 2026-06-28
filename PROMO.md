---
type: reference
title: kloom · 推广介绍
description: 一个会自己维护的个人知识库——开箱即用的 LLM Wiki 模板，面向推广介绍。
okf_version: "0.1"
tags: [reference, promo, llm-wiki]
timestamp: 2026-06-26T00:00:00Z
---

# kloom
### 一个会自己维护的知识库 · _Weave your knowledge_

> **你只管收集资料和提问，LLM 负责所有枯燥的维护**——总结、交叉引用、更新、查矛盾、防过期。
> 30 分钟，把一堆散落的文章/笔记/论文，变成一个**越用越聪明、处处可追溯**的知识库。

---

## 🤔 为什么你需要它

| 痛点 | 现状 |
|---|---|
| 知识散落 | 收藏夹 / Notion / 邮件 / 脑子各一份，要用时找不到 |
| RAG / 上传文件 | **问一次忘一次**，每个问题都从原始文档重新推导，不积累 |
| 手写 wiki / 笔记 | 维护太累（更新链接、保持一致、处理矛盾），最终放弃 |
| 直接问 LLM | 答案**不可追溯**，不知从哪推的，也无法沉淀成你的资产 |

**核心矛盾**：维护知识库最累的不是读和想，而是**记账**——更新交叉引用、保持摘要新鲜、标注矛盾。人类因此放弃 wiki；而 LLM 不会累、不会忘、一次能改十几个文件。

---

## ✨ 它是什么

一个**开箱即用的模板**，基于三个权威方法论：

- 🧠 **卡帕西 LLM Wiki**（Karpathy, 2026）—— "停止重新推导，开始编译"：不走 RAG，而是让 LLM 增量**编译**一个持久化、复利的知识库。
- 📦 **OKF v0.1**（Google Cloud 开源）—— markdown + frontmatter 开放标准，知识**不锁死**。
- ⏳ **LLM Wiki v2**（agentmemory 实战）—— 给知识加**生命周期**，防腐烂。

---

## 🎯 五个核心卖点

1. **编译式，不重新推导** —— 知识预编译进 wiki，**复利积累**。问第 100 次和第 1 次一样快，且越来越丰富。
2. **LLM 全自动维护** —— 你几乎不写 wiki，LLM 做总结、交叉引用、归档、记账。
3. **OKF 开放标准** —— 纯 markdown + YAML，可移植、可 diff、可被任何 OKF 工具消费。**知识永远属于你**。
4. **知识有生命周期** —— 置信度、矛盾取代、遗忘曲线，wiki 不会越用越脏。
5. **类型化知识图谱** —— 实体间用强类型关系连接，能回答"升级 X 会影响什么"这类**连锁问题**。

---

## 🧰 功能亮点全景

### 🔍 可追溯 & 版本控制

- 🔒 **git 原生** —— 整个 wiki 是 git 仓库，每次 ingest 一个 commit，知识演进可 **diff / 回滚 / 分支**；supersession 不删旧版，知识自带时间线。
- 🔢 **内容 hash 溯源** —— 每个 raw 文件用 `git hash-object` 算指纹（`raw_hash`），**你改了资料，下次自动发现**（drift）。
- 🏷️ **结构化 frontmatter** —— 每页 YAML 元数据（`type` / `confidence` / `timestamp` / `sources` / `relations`…），可查询、agent 可解析、Dataview 可报表。
- 🔗 **全链证据** —— 任何结论 → source 页 → raw 原文 → git commit，问"这结论哪来的"一路追到根。

### ⏳ 知识不腐烂（v2 生命周期）

- 📈 **置信度评分** —— 每条主张带 0–1 置信度（按来源数 / 新近度 / 是否被矛盾），回答时"对 X 较确定，对 Y 存疑"。
- 🔄 **supersession 取代** —— 新结论推翻旧的不删除，标 `superseded` + 横幅 + 指向新版，**旧版完整保留可追溯**（知识的版本控制）。
- 📉 **遗忘曲线** —— 久未访问的主张 confidence 衰减、标 `stale`（降权不删），像人脑。
- 🧠 **巩固层级** —— 工作记忆 → 情景 → 语义 → 程序，映射到目录，证据积累时逐级提纯。

### 🗺️ 类型化关系图谱

- 🎯 **17 个强谓词** —— `depends-on` / `enables` / `regulates` / `part-of` / `issued-by` / `competes-with` / `provides-evidence-for` … 告别 `related-to` 偷懒，**关系有语义、有方向**。
- 🌐 **连锁查询** —— "升级 X 影响什么"沿 `depends-on` / `uses` 边遍历，不只关键词匹配。

### ⚡ 自动化 & 自愈

- 🚀 **会话状态注入** —— SessionStart hook 开会话即注入 wiki 简报（未 ingest / drift / 近期动态），不用手动翻。
- 🩺 **lint 体检** —— 查矛盾、孤儿页、断链、过时主张、OKF 合规，能自愈的直接修。
- 🔧 **drift 增量 re-ingest** —— raw 改了按"新增 / 修正 / 删除"分类处理，不重做，`source_count` 不虚增。

### 🤖 智能 & 可控

- 🧩 **agent 自主扩展 type** —— 实例化时按主题生成领域 type；遇到新类型自主新增（实证：CRM wiki 自动加了 `vendor`）。
- ⚠️ **批判性标注** —— 识别资料偏见（如厂商导购段），相关数据标"厂商自述、需交叉验证"。
- 🪝 **断链即待办** —— OKF 容忍断链，断链 = 还没写的知识，hook 提醒你补。

### 📦 开放 & 隐私

- 🌐 **OKF 标准** —— 纯 markdown + YAML，不锁死，任何 OKF 工具能消费。
- 💻 **本地优先** —— 全本地运行，资料不出机器（vs 云端知识库）。
- 🧪 **测试套件** —— hook 带单元测试，工程质量可验证。

---

## 📊 实证：30 分钟搭一个 CRM 知识库

用本模板真实跑通（非演示数据）：

```
/kloom:init-wiki ~/wiki/crm 客户CRM
  → agent 自动生成 7 个 CRM 领域 type（customer/account/contact/lead/deal/interaction/campaign）

/kloom:add-source raw/articles/CRM_简介.md
  → LLM 自动产出 13 个页面：
     • 1 source（摘要 + 溯源 raw_hash）
     • 7 concept（CRM / 运营型 / 分析型 / 协作型 / SFA / RFM / 选型）
     • 3 vendor（Salesforce / 飞书 / 超兔）—— agent 自主判断需新增 type「vendor」
     • 2 synthesis（三大类型对比 / Gartner vs IBM 定义）
```

**产出质量**（抽查）：OKF 合规 ✓ / v2 字段齐全（置信度 0.8–0.85）✓ / 关系用**强谓词**（`enables` / `provides-evidence-for`）✓ / 溯源完整（`raw_hash` 就绪）✓ / **批判性标注**（识别导购偏见）✓

> 一篇资料 → 一个连通、可追溯、带置信度的小型知识图谱。**复利的起点。**

---

## ⚖️ 和主流知识库对比

| 维度 | Notion | Obsidian | NotebookLM / ChatGPT | Logseq / Roam | **本模板** |
|---|:---:|:---:|:---:|:---:|:---:|
| 形态 | 云·块 | 本地 md·双链 | 上传 RAG | 本地大纲·双链 | 本地 md·**LLM 维护** |
| 知识复利积累 | 🟡 靠人 | 🟡 靠人 | ❌ 即问即忘 | 🟡 靠人 | ✅ **编译复利** |
| 维护负担 | 🔴 手动 | 🔴 手动 | — | 🔴 手动 | ✅ **LLM 自动** |
| 可追溯 | 🟡 弱 | 🟡 弱 | ❌ | 🟡 中 | ✅ **raw→commit 全链** |
| 版本控制 | 🟡 有限历史 | 🟡 需自配 git | ❌ | 🟡 需配 | ✅ **git 原生** |
| 关系类型化 | 🟡 标签 | 🟡 双链(无类型) | ❌ | 🟡 双链(无类型) | ✅ **17 谓词** |
| 知识生命周期 | ❌ | ❌ | ❌ | ❌ | ✅ **置信/取代/遗忘** |
| 资料更新检测 | ❌ | ❌ | ❌ | ❌ | ✅ **raw_hash drift** |
| 格式开放 | ❌ 私有 | 🟡 md | ❌ 私有 | 🟡 md | ✅ **OKF 标准** |
| 跨工具可用 | ❌ | 🟡 部分 | ❌ | 🟡 部分 | ✅ **任意 OKF 工具** |
| 隐私 | 🔴 云端 | ✅ 本地 | 🔴 云端 | ✅ 本地 | ✅ **本地** |
| LLM 原生 | 🟡 附加 | 🟡 插件 | ✅ | ❌ | ✅ **LLM 即维护者** |

> ✅ 原生支持　🟡 需配置/较弱　❌ 不支持/缺失

**一句话差异**：其他工具要么"人维护 + 私有格式"（Notion/Obsidian/Logseq），要么"LLM 回答但不积累"（NotebookLM/ChatGPT）。本模板是**唯一同时做到「LLM 自动维护」+「知识复利」+「开放可移植」**的。

---

## 👥 适合谁

任何**长期积累某个领域知识**的人：

- 🎓 **研究者**：论文 / 报告 → 主题知识图谱，随读随巩固
- 📚 **读书党**：每本书一个伴读 wiki（人物 / 主题 / 线索互联）
- 🏢 **项目 / 团队**：决策 / 会议 / 文档 → 团队共享大脑
- 💼 **客户 / CRM、技术调研、合规审计、竞品分析……**

---

## 🚀 3 步上手（约 20 分钟）

```bash
# 1. 实例化（agent 按你的主题生成领域结构，5 分钟）
/kloom:init-wiki <路径> <主题，如"医疗合规">

# 2. 配 Obsidian + Claude Code（10 分钟，见生成的 SETUP.md）

# 3. 喂资料，LLM 自动建知识图谱
/kloom:add-source raw/articles/你的资料.md
```

日常：`/kloom:ask-wiki <问题>` 查询、`/kloom:update-raw` 处理资料更新、定期 `lint` 体检。

---

## 📥 获取

打包为 **Claude Code plugin**，一行装好，任意主题开箱即用，模板更新全员同步：

```bash
claude plugin marketplace add wangwe485/kloom
claude plugin install kloom@kloom-marketplace
```

装好后在任意目录运行 `/kloom:init-wiki <路径> <主题>` 即可。含完整 schema / 页面模板 / 6 命令 / SessionStart hook / 合规 linter / 测试。

---

## 📚 方法论出处

- [Karpathy · LLM Wiki 原版 gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [LLM Wiki v2（rohitg00 / agentmemory 实战扩展）](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
- [OKF v0.1 SPEC（Google Cloud）](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

> 站在巨人肩膀上：卡帕西定义"编译式 wiki"范式，Google OKF 给开放格式标准，v2 补"规模化不腐烂"运维层。本模板把它们整合成一个**即取即跑的成品**。

---

**一句话**：把"维护知识库"这件最让人放弃的事交给 LLM，你只做人类该做的——收集、思考、提问。
