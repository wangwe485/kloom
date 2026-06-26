---
type: reference
title: LLM Wiki 模板 · 推广介绍
description: 一个会自己维护的个人知识库——开箱即用的 LLM Wiki 模板，面向推广介绍。
okf_version: "0.1"
tags: [reference, promo, llm-wiki]
timestamp: 2026-06-26T00:00:00Z
---

# LLM Wiki 模板
### 一个会自己维护的个人知识库

> **你只管收集资料和提问，LLM 负责所有枯燥的维护**——总结、交叉引用、更新、查矛盾、防过期。
> 30 分钟，从一堆散落的文章/笔记/论文，变成一个**越用越聪明、处处可追溯**的知识库。

---

## 🤔 为什么你需要它

| 痛点 | 现状 |
|---|---|
| 知识散落 | 收藏夹 / Notion / 邮件 / 脑子各一份，要用时找不到 |
| RAG / 上传文件 | **问一次忘一次**，每个问题都从原始文档重新推导，不积累 |
| 手写 wiki / 笔记 | 维护太累（更新链接、保持一致、处理矛盾），最终放弃 |
| 直接问 LLM | 答案**不可追溯**，不知道它从哪推的，也无法沉淀成你的资产 |

**核心矛盾**：维护一个知识库最累的不是读和想，而是**记账**——更新交叉引用、保持摘要新鲜、标注矛盾。人类因此放弃 wiki；而 LLM 不会累、不会忘、一次能改十几个文件。

---

## ✨ 它是什么

一个**开箱即用的模板**，基于三个权威方法论搭建：

- 🧠 **卡帕西 LLM Wiki**（Andrej Karpathy, 2026）—— "停止重新推导，开始编译"：不走 RAG（查询时捞片段），而是让 LLM 增量**编译**一个持久化、复利的知识库。
- 📦 **OKF v0.1**（Google Cloud 开源）—— markdown + frontmatter 的开放标准，你的知识**不锁死**，任何工具都能读。
- ⏳ **LLM Wiki v2**（agentmemory 实战经验）—— 给知识加**生命周期**：置信度、矛盾取代、遗忘曲线，防止 wiki 腐烂成垃圾堆。

---

## 🎯 五个核心卖点

1. **编译式，不重新推导** —— 知识预编译进 wiki，**复利积累**。问第 100 次和第 1 次一样快，且越来越丰富。
2. **LLM 全自动维护** —— 你几乎不写 wiki。LLM 做总结、交叉引用、归档、记账（卡帕西模式核心洞察）。
3. **OKF 开放标准** —— 纯 markdown + YAML，可移植、可 diff、可被任何 OKF 工具消费。**你的知识永远属于你**。
4. **知识有生命周期** —— 每条主张带置信度；新资料与旧结论矛盾时**显式取代**（不静默改写，旧版可追溯）；久未确认的自动降权。wiki 不会越用越脏。
5. **类型化知识图谱** —— 不只关键词搜索。实体间用强类型关系（`depends-on` / `enables` / `regulates` ...）连接，能回答"升级 X 会影响什么"这类**连锁问题**。

---

## 🧰 开箱即用的能力

- **三层架构**：`raw/`（不可变真相来源）→ `wiki/`（LLM 维护的知识）→ `CLAUDE.md`（规则），边界清晰。
- **三个操作**：`ingest`（摄取）/ `query`（查询）/ `lint`（体检）。
- **6 个 slash 命令**：`/init-wiki` `/ask-wiki` `/add-source` `/update-raw` `/sync-raw` `/wiki-status`。
- **SessionStart hook**：每次开会话**自动注入** wiki 状态简报——哪些资料没 ingest、哪些 raw 被改过（drift）、近期动态，不用手动翻。
- **v2.1 谓词表**：17 个强类型关系动词，告别 `related-to` 偷懒。
- **溯源 + drift 检测**：每个结论可追溯到 `raw/` 原文；你改了 raw，下次自动发现并增量更新。

---

## 📊 实证：30 分钟搭一个 CRM 知识库

用本模板真实跑通（非演示数据）：

```
/init-wiki E:\ai\test-wiki 客户CRM
  → agent 自动生成 7 个 CRM 领域 type（customer/account/contact/lead/deal/interaction/campaign）

/add-source raw/articles/CRM_简介.md
  → LLM 自动产出 13 个页面：
     • 1 source（摘要 + 溯源 raw_hash）
     • 7 concept（CRM / 运营型 / 分析型 / 协作型 / SFA / RFM / 选型）
     • 3 vendor（Salesforce / 飞书 / 超兔）—— agent 自主判断需新增 type「vendor」
     • 2 synthesis（三大类型对比 / Gartner vs IBM 定义）
```

**产出质量**（抽查）：
- ✅ OKF 合规（每个页面有 `type`、标准链接）
- ✅ v2 字段齐全（置信度 0.8–0.85、source_count、status）
- ✅ 关系用**强谓词**（`enables` / `provides-evidence-for`，非 `related-to` 兜底）
- ✅ 溯源完整（`ingested_from` + `raw_hash`，drift 检测就绪）
- ✅ **批判性标注**：识别出资料含厂商导购段，相关数据已标"厂商自述、需交叉验证"

> 一篇资料 → 一个连通的、可追溯的、带置信度的小型知识图谱。**这就是复利的起点。**

---

## ⚖️ 和常见方案对比

| | 手写笔记 | RAG / 上传文件 | 直接问 LLM | **本模板** |
|---|---|---|---|---|
| 知识积累 | 靠人，慢 | ❌ 不积累 | ❌ 不积累 | ✅ 复利 |
| 维护负担 | 🔴 重 | 无 | 无 | ✅ LLM 自动 |
| 可追溯 | 弱 | 弱 | ❌ 不可追溯 | ✅ raw→wiki 全链 |
| 防"过期腐烂" | ❌ | — | — | ✅ 生命周期 |
| 格式标准 | 私有 | 私有 | 无 | ✅ OKF 开放 |
| 跨工具可用 | ❌ | ❌ | — | ✅ 任意 OKF 工具 |

---

## 👥 适合谁

任何**长期积累某个领域知识**的人：

- 🎓 **研究者**：论文 / 报告 → 主题知识图谱，随读随巩固
- 📚 **读书党**：每本书一个伴读 wiki（人物 / 主题 / 线索互联）
- 🏢 **项目 / 团队**：决策 / 会议 / 文档 → 团队共享大脑
- 💼 **客户 / CRM、技术调研、合规审计、竞品分析……**

---

## 🚀 3 步上手（约 30 分钟）

```bash
# 1. 实例化（agent 按你的主题生成领域结构，5 分钟）
/init-wiki <路径> <主题，如"医疗合规">

# 2. 配 Obsidian + Claude Code（10 分钟，见 SETUP.md）

# 3. 喂资料，LLM 自动建知识图谱
/add-source raw/articles/你的资料.md
```

之后日常：`/ask-wiki <问题>` 查询、`/update-raw` 处理资料更新、定期 `lint` 体检。

---

## 📥 获取

- **当前**：本地模板，`git clone` 即用（含完整 schema / 模板 / 命令 / hook / 测试）。
- **即将**：打包为 **Claude Code plugin**——同事 `claude plugin install` 一行装好，`/llm-wiki:init-wiki` 任意主题开箱即用，模板更新全员同步。

---

## 📚 方法论出处（不是凭空造的）

- [Karpathy · LLM Wiki 原版 gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [LLM Wiki v2（rohitg00 / agentmemory 实战扩展）](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
- [OKF v0.1 SPEC（Google Cloud）](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

> 站在巨人肩膀上：卡帕西定义了"编译式 wiki"的范式，Google OKF 给了开放格式标准，v2 补上了"规模化不腐烂"的运维层。本模板把它们整合成一个开箱即用、即取即跑的成品。

---

**一句话**：把"维护知识库"这件最让人放弃的事交给 LLM，你只做人类该做的——收集、思考、提问。
