---
description: 查询本 wiki 知识库（OKF + 卡帕西 LLM Wiki）
argument-hint: <你的问题>
---
按 CLAUDE.md §5 的 Query 操作回答用户问题。流程：

1. 先读 `wiki/index.md` 定位相关页（实体 / 概念 / synthesis），再深入读取命中的页面。
2. 给出**带引用**的答案：每个关键结论标注来自哪个 wiki 页、可追溯到哪个 `raw/` 源文件。
3. **按 confidence 表态**：高置信项肯定陈述，低置信项明确标"不确定 / 待确认"。
4. 若问题是"X 会影响 / 依赖什么"类，沿 frontmatter `relations` 的 `depends-on`/`uses`/`regulates` 边遍历，不只做关键词匹配。
5. 答完若发现有价值的新对比 / 分析 / 连接，**主动问我要不要存成新页回填进 wiki**（让探索也复利）。

约束：正文链接用标准 markdown `/wiki/...`；不要静默改写已有页；只读不写（除非我确认回填）。

问题：$ARGUMENTS
